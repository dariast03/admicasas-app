import { useAnnouncement } from "@/hooks/useAnnouncement";
import DefaultLayout from "@/layout/DefaultLayout";
import { Image } from "expo-image";
import { Redirect, useLocalSearchParams } from "expo-router";
import { Text, View, useWindowDimensions } from "react-native";
import { useSessionContext } from "../../../../../hooks/useSessionContext";

const DetailAnnocenment = () => {
  const { id } = useLocalSearchParams();
  if (!id) return <Redirect href={"/404"} />;

  const { width } = useWindowDimensions();
  const { user } = useSessionContext();

  const { announcementQuery } = useAnnouncement({
    id: id + "",
    params: { idcondominium: user?.account?.idcondominium },
  });

  if (announcementQuery.isLoading) return <Text>CARGANDO AREA</Text>;
  if (announcementQuery.isError) return <Text>ERROR AREA</Text>;
  return (
    // <DefaultLayout>
    //   <View style={{ alignItems: "center" }}>
    //     <Image
    //       source={announcementQuery.data?.urlimg}
    //       style={{ width: width * 0.9, height: 300 }}
    //     />
    //   </View>

    //   <View className="bg-white flex-1 rounded-3xl -mt-10 p-4">
    //     <Text className="font-bold uppercase text-2xl">
    //       {announcementQuery.data?.description}
    //     </Text>
    //     <Text className="">{announcementQuery.data?.description}</Text>
    //   </View>
    // </DefaultLayout>
    <DefaultLayout>
      <View className="absolute z-10 flex w-full justify-center items-center">
        <View
          className="rounded-lg overflow-hidden bg-white pt-4"
          style={{
            shadowColor: "#000000",
            shadowOffset: {
              width: 0,
              height: 2,
            },
            shadowOpacity: 0.17,
            shadowRadius: 2.54,
            elevation: 3,
          }}
        >
          <Image
            source={announcementQuery.data?.urlimg}
            style={{ width: width * 0.5, height: 150 }}
          />
          <Text className="text-gray-400 text-center">Toca para ampliar</Text>
        </View>
        <View className="w-full p-2">
          <View className="flex w-full justify-start p-4 bg-green-300 rounded-md">
            <Text className="font-bold text-2xl uppercase ">
              {announcementQuery.data?.description}
            </Text>
            <Text className="">{announcementQuery.data?.description}</Text>
          </View>
        </View>
      </View>

      <View className="mt-10 bg-white flex-1 rounded-t-2xl"></View>
    </DefaultLayout>
  );
};

export default DetailAnnocenment;
