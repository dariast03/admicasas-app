import { useAnnouncement } from "@/hooks/useAnnouncement";
import DefaultLayout from "@/layout/DefaultLayout";
import { Image } from "expo-image";
import { Redirect, useLocalSearchParams } from "expo-router";
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from "react-native";
import { useSessionContext } from "@/hooks/useSessionContext";

import Icon, { IconType } from "@/components/Icon";

const DetailAnnocenment = () => {
  const { id } = useLocalSearchParams();
  if (!id) return <Redirect href={"/404"} />;

  const { width } = useWindowDimensions();
  const { user } = useSessionContext();

  const { announcementQuery } = useAnnouncement({
    id: id + "",
    params: {
      idcondominium: user?.account?.idcondominium,
      iduser: user.id,
      idhousing: user.account.idhousing,
    },
  });

  if (announcementQuery.isLoading)
    return (
      <View className="p-5">
        <ActivityIndicator color={"#4648E5"} size={20} />
        <Text className="text-center text-primario-600">Cargando Anuncio</Text>
      </View>
    );
  if (announcementQuery.isError) return <Text>ERROR AREA</Text>;

  return (
    <DefaultLayout>
      <ScrollView>
        <View className=" p-5">
          <View
            className="bg-white rounded-t-2xl overflow-hidden "
            style={styles.shadowCard}
          >
            <Image
              style={{ width, height: 200 }}
              source={announcementQuery.data?.urlimg}
            />

            <View className="flex-row justify-start px-4 py-3 bg-indigo-600">
              <Icon
                color={"white"}
                icon={{
                  type: IconType.MaterialIcon,
                  name: "announcement",
                }}
              />
              <Text className="mx-3 text-white font-semibold text-lg">
                ANUNCIO
              </Text>
            </View>
            <View className="py-4 px-6 ">
              <Text className="font-semibold text-xl my-2">
                Detalle del Anuncio
              </Text>
              <View className="bg-white border border-gray-300 rounded-md p-5">
                <Text className="text-stone-500 mt-2">
                  {announcementQuery.data?.title}
                </Text>
                <Text className="text-stone-400 my-2">
                  {announcementQuery.data?.description}
                </Text>
                <View className="flex-row items-center">
                  <Icon
                    icon={{
                      type: IconType.AntDesign,
                      name: "calendar",
                    }}
                  />
                  <Text className="text-stone-400 my-2">
                    {announcementQuery.data?.start?.toLocaleDateString()}
                  </Text>
                </View>

                <View className="border-b border-stone-400 my-5"></View>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </DefaultLayout>
  );
};

const styles = StyleSheet.create({
  shadowCard: {
    shadowColor: "#4f46e5",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.2,
    shadowRadius: 5.62,
    elevation: 7,
  },
});

export default DetailAnnocenment;
