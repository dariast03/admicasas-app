import { useAnnouncement } from "@/hooks/useAnnouncement";
import DefaultLayout from "@/layout/DefaultLayout";
import { Image } from "expo-image";
import { Redirect, Stack, useLocalSearchParams } from "expo-router";
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
import Colors from "@/constants/Colors";
import { useAppContext } from "@/hooks/useAppContext";
import GlobalStyles from "@/constants/GlobalStyle";

const DetailAnnocenment = () => {
  const { id } = useLocalSearchParams();
  if (!id) return <Redirect href={"/404"} />;

  const { width } = useWindowDimensions();
  const { user } = useSessionContext();
  const { selectedHousing } = useAppContext();

  const shadowStyle = GlobalStyles();

  const { announcementQuery } = useAnnouncement({
    id: id + "",
    params: {
      idcondominium: user?.account?.idcondominium,
      iduser: user.id,
      idhousing: selectedHousing,
    },
  });

  if (announcementQuery.isLoading)
    return (
      <View className="p-5">
        <ActivityIndicator color={Colors.primario[600]} size={20} />
        <Text className="text-center text-primario-600">Cargando Anuncio</Text>
      </View>
    );
  if (announcementQuery.isError) return <Text>ERROR AREA</Text>;

  return (
    <DefaultLayout>
      <Stack.Screen
        options={{
          title: announcementQuery.data?.title,
        }}
      />
      <ScrollView>
        <View className="p-7">
          <View
            className="bg-white dark:bg-primario-800 rounded-2xl overflow-hidden "
            style={shadowStyle}
          >
            <Image
              style={{
                width: "100%",
                height: 200,

                backgroundColor: "#0553",
              }}
              contentFit="contain"
              source={announcementQuery.data?.urlimg}
            />

            <View className="flex-row justify-start items-center px-4 py-3 bg-primario-600 dark:bg-primario-600">
              <Icon
                icon={{
                  type: IconType.MaterialIcon,
                  name: "announcement",
                }}
              />
              <Text className="mx-3 text-white font-semibold text-lg">
                ANUNCIO
              </Text>
            </View>
            <View className="p-6">
              <Text className="font-semibold text-xl my-2 dark:text-white">
                Detalle del Anuncio
              </Text>
              <View className="bg-white dark:bg-primario-800 border border-gray-300 rounded-md p-5">
                <Text className="font-bold text-lg text-stone-500 dark:text-white">
                  {announcementQuery.data?.title}
                </Text>
                <Text className="text-stone-400 dark:text-white  my-2">
                  {announcementQuery.data?.description}
                </Text>
                <View className="flex-row items-center">
                  <Icon
                    icon={{
                      type: IconType.AntDesign,
                      name: "calendar",
                    }}
                  />
                  <Text className="text-stone-400 dark:text-white my-2">
                    {announcementQuery.data?.start?.toLocaleDateString()}
                  </Text>
                </View>

                <View className="border-b border-stone-400 dark:border-white my-5"></View>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </DefaultLayout>
  );
};

// const styles = StyleSheet.create({
//   shadowCard: {
//     shadowColor: "#4f46e5",
//     shadowOffset: {
//       width: 0,
//       height: 5,
//     },
//     shadowOpacity: 0.2,
//     shadowRadius: 5.62,
//     elevation: 7,
//   },
// });

export default DetailAnnocenment;
