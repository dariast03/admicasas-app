import { useAnnouncement } from "@/hooks/useAnnouncement";
import DefaultLayout from "@/layout/DefaultLayout";
import { Image } from "expo-image";
import { Redirect, useLocalSearchParams } from "expo-router";
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from "react-native";
import { useSessionContext } from "../../../../../hooks/useSessionContext";
import { MaterialIcons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";
import Icon, { IconType } from "@/components/Icon";

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
                  type: IconType.MatetrialIcon,
                  name: "payment",
                }}
              />
              <Text className="mx-3 text-white font-semibold text-lg">
                COBRO
              </Text>
            </View>
            <View className="py-4 px-6">
              <Text className="text-2xl font-semibold text-gray-800">
                {announcementQuery.data?.title}
              </Text>
              <Text className="py-2 text-lg text-gray-700">
                {announcementQuery.data?.description}
              </Text>
              <View className="flex-row items-center mt-4 text-gray-700">
                <Icon
                  icon={{
                    type: IconType.MaterialCommunityIcons,
                    name: "clock-time-three-outline",
                  }}
                />
                <Text className="px-2 text-sm">
                  {announcementQuery.data?.start?.toLocaleDateString()}
                </Text>
              </View>
              <View className="flex-row  items-center mt-4 text-gray-700">
                <Icon
                  icon={{
                    type: IconType.MaterialCommunityIcons,
                    name: "clock-time-nine-outline",
                  }}
                />
                <Text className="px-2 text-sm">
                  {announcementQuery.data?.start?.toLocaleDateString()}
                </Text>
              </View>
            </View>
            <View className="p-5">
              <View className="rounded-xl bg-indigo-600 p-3">
                <TouchableOpacity className="items-center">
                  <Text className="text-white text-center text-xl font-bold">
                    PAGAR
                  </Text>
                </TouchableOpacity>
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
    shadowColor: "#000000",
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
