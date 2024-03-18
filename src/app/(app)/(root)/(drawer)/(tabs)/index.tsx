import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  useWindowDimensions,
  TouchableOpacity,
  StyleSheet,
  RefreshControl,
  // Image,
} from "react-native";
import { Image } from "expo-image";
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
import { BlurView } from "expo-blur";

type Props = {
  data: IAnnouncement;
};

const Home = () => {
  const Card = ({ data }: Props) => {
    const { width } = useWindowDimensions();
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
              contentFit="contain"
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
  const { isLoadingSelectedHousing, selectedHousing, updateHousing } =
    useAppContext();
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
            <View className="mb-5">
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
            </View>

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
