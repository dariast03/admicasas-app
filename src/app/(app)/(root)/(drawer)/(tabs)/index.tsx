import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  useWindowDimensions,
  TouchableOpacity,
  StyleSheet,
  RefreshControl,
  Button,
  Image,
  Dimensions,
  PixelRatio,
} from "react-native";
//import { Image } from "expo-image";
import { useSessionContext } from "@/hooks/useSessionContext";
import { useAnnouncement } from "@/hooks/useAnnouncement";
import { IAnnouncement } from "@/types/announcement/announcement";
import { Link } from "expo-router";
import { useHousing } from "@/hooks/useHousing";
import Dropdown from "@/components/DropDown";
import { useAppContext } from "@/hooks/useAppContext";
import Loader from "@/components/Loader";
import DefaultLayout from "@/layout/DefaultLayout";
import SubTitle from "@/components/SubTitle";
import Colors from "@/constants/Colors";
import { TourGuideZone, useTourGuideController } from "rn-tourguide";
import Constants from "expo-constants";

type Props = {
  data: IAnnouncement;
};

const Home = () => {
  const Card = ({ data }: Props) => {
    let routeView: any;
    if (data.type === "charge") {
      routeView = "/payment/" + data.idcharge;
    } else if (data.type === "meeting") {
      routeView = "/meeting/" + data.id;
    } else {
      routeView = "/annoucement/" + data.id;
    }

    return (
      <View
        style={styles.shadowCard}
        className="w-full bg-white dark:bg-primario-800 rounded-2xl  overflow-hidden"
      >
        <Link href={routeView} asChild>
          <TouchableOpacity>
            <Image
              source={{
                uri: data.urlimg,
              }}
              style={{
                width: "100%",
                height: 200,
                backgroundColor: "#0553",
              }}
              resizeMode="contain"
            />

            {/* <Image
              source={data.urlimg}
              style={{
                maxWidth: width,
                height: 200,
              }}
              contentFit="contain"
            /> */}

            <View className="p-5">
              <View>
                <Text className="mb-1 text-xl font-bold  text-primario-800 dark:text-white">
                  {data.title}
                </Text>
                <Text className=" font-light  text-primario-800 dark:text-gray-100">
                  {data.description}
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        </Link>
      </View>
    );
  };
  const { user } = useSessionContext();
  const {
    isLoadingSelectedHousing,
    selectedHousing,
    updateHousing,
    updateTutorialView,
    tutorialAnnouncement,
  } = useAppContext();
  const [isRefreshing, setIsRefreshing] = useState(false);

  const { announcementsQuery } = useAnnouncement({
    query: ["announcementsQuery"],
    params: {
      idcondominium: user?.account?.idcondominium,
      idhousing: selectedHousing ? selectedHousing : user?.account?.idhousing,
    },
  });

  const { housingsByPropietaryQuery } = useHousing({
    params: {
      idproprietary: user.id,
    },
  });

  const onRefresh = () => {
    setIsRefreshing(true);
    announcementsQuery.refetch();
  };

  useEffect(() => {
    if (isRefreshing && !announcementsQuery.isRefetching)
      setIsRefreshing(false);
  }, [announcementsQuery.isRefetching]);

  useEffect(() => {
    if (!selectedHousing) updateHousing(user?.account?.idhousing);
  }, [isLoadingSelectedHousing]);

  const iconProps = { size: 40, color: "#888" };

  // Use Hooks to control!
  const {
    canStart, // a boolean indicate if you can start tour guide
    start, // a function to start the tourguide
    stop, // a function  to stopping it
    eventEmitter, // an object for listening some events
  } = useTourGuideController();

  // Can start at mount 🎉
  // you need to wait until everything is registered 😁
  useEffect(() => {
    console.log(tutorialAnnouncement);
    if (!tutorialAnnouncement && canStart) {
      // 👈 test if you can start otherwise nothing will happen
      start();
    }
  }, [canStart]); // 👈 don't miss it!

  const handleOnStart = () => console.log("start");
  const handleOnStop = () => {
    console.log("stop");
    updateTutorialView();
  };
  const handleOnStepChange = () => console.log(`stepChange`);

  useEffect(() => {
    eventEmitter?.on("start", handleOnStart);
    eventEmitter?.on("stop", handleOnStop);
    eventEmitter?.on("stepChange", handleOnStepChange);

    return () => {
      eventEmitter?.off("start", handleOnStart);
      eventEmitter?.off("stop", handleOnStop);
      eventEmitter?.off("stepChange", handleOnStepChange);
    };
  }, []);

  return (
    <DefaultLayout>
      <Text className="bg-primario-600 dark:bg-primario-800 p-6 rounded-b-3xl text-white font-black">
        ADMICASAS
      </Text>
      <FlatList
        data={null}
        renderItem={() => null}
        contentContainerClassName="p-5"
        refreshControl={
          <RefreshControl
            refreshing={isRefreshing && announcementsQuery.isRefetching}
            onRefresh={onRefresh}
          />
        }
        ListHeaderComponent={
          <>
            <View className="flex-1 mb-5">
              <TourGuideZone
                zone={1}
                text={"Seleccione una vivienda con la que desea interactuar"}
                borderRadius={16}
              >
                <Dropdown
                  placeholder="Seleccionar vivienda"
                  label="Seleccionar Vivienda:"
                  valueField={"id"}
                  value={selectedHousing}
                  labelField={"code"}
                  data={housingsByPropietaryQuery.data || []}
                  onChange={(e) => updateHousing(e.id)}
                  disabled={
                    isLoadingSelectedHousing ||
                    housingsByPropietaryQuery.isLoading
                  }
                  disable={housingsByPropietaryQuery.isLoading}
                />
              </TourGuideZone>
            </View>
            <TourGuideZone
              zone={2}
              text={
                "Dezliza para poder ver todos los anuncios y asi mantenerte al día"
              }
              borderRadius={16}
            >
              <FlatList
                data={announcementsQuery.data}
                renderItem={({ item }) => <Card data={item} />}
                ItemSeparatorComponent={() => <View className="mb-5" />}
                keyExtractor={(item) => item.id || ""}
                ListEmptyComponent={() => (
                  <>
                    {announcementsQuery.isLoading ? (
                      <Loader name="Anuncios" />
                    ) : (
                      <SubTitle text="No hay anuncios" />
                    )}
                  </>
                )}
              />
            </TourGuideZone>
          </>
        }
      />
    </DefaultLayout>
  );
};

const styles = StyleSheet.create({
  shadowCard: {
    //   shadowColor: "#fff",
    //   shadowOffset: {
    //     width: 0,
    //     height: 5,
    //   },
    //   shadowOpacity: 0.2,
    //   shadowRadius: 5.62,
    //   elevation: 7,
    // },
    shadowColor: Colors.primario[800],
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },
});

export default Home;
