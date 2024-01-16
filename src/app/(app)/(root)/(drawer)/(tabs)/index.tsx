import React from "react";
import {
  View,
  Text,
  FlatList,
  useWindowDimensions,
  TouchableOpacity,
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
import { Route } from "expo-router";
import { da } from "date-fns/locale";

type Props = {
  data: IAnnouncement;
};

const Card = ({ data }: Props) => {
  const { width } = useWindowDimensions();
  let routeView: any;
  if (data.type === "charge") {
    routeView = "/payment/" + data.id;
  } else if (data.type === "meeting") {
    routeView = "/meeting/" + data.id;
  } else {
    routeView = "/annoucement/" + data.id;
  }

  return (
    <Link href={routeView} asChild>
      <TouchableOpacity>
        <View className="w-full bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-lg dark:bg-gray-800 dark:border-gray-700">
          <View>
            <Image
              source={data.urlimg}
              style={{
                maxWidth: width,
                height: 200,
              }}
            />
          </View>
          <View className="p-5">
            <View>
              <Text>{data.id + data.type}</Text>
              <Text className="mb-1 text-xl font-bold tracking-tight text-gray-900 dark:text-white">
                {data.title}
              </Text>
              <Text className="text-sm font-light tracking-tight text-gray-700 dark:text-gray-300">
                {data.description}
              </Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    </Link>
  );
};

const Home = () => {
  const { user } = useSessionContext();
  const { isLoadingSelectedHousing, selectedHousing, updateHousing } =
    useAppContext();

  const { announcementsQuery } = useAnnouncement({
    query: ["announcementsQuery"],
    params: {
      idcondominium: user?.account?.idcondominium,
      idhousing: selectedHousing,
    },
  });

  const { housingsByPropietaryQuery } = useHousing({
    params: {
      idproprietary: user.id,
    },
  });

  return (
    <>
      <FlatList
        data={null}
        renderItem={() => null}
        contentContainerClassName="p-5"
        ListHeaderComponent={
          <>
            <View className="mb-5">
              <Dropdown
                placeholder="Seleccionar vivienda"
                label="Selector global de vivienda para ir probando"
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
                    <Loader />
                  ) : (
                    <Text>No hay anuncios</Text>
                  )}
                </>
              )}
            />
          </>
        }
      />
    </>
  );
};

export default Home;
