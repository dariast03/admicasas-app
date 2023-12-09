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

type Props = {
  data: IAnnouncement;
};

const Card = ({ data }: Props) => {
  const { width } = useWindowDimensions();
  return (
    <Link href={`/annoucement/${data.id}`} asChild>
      <TouchableOpacity>
        <View className="w-full bg-white border border-gray-200 rounded-2xl overflow-hidden shadow dark:bg-gray-800 dark:border-gray-700">
          <View>
            <Image
              source={data.urlimg}
              style={{ maxWidth: width, height: 200 }}
            />
          </View>
          <View className="p-5">
            <View>
              <Text className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
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
  const { announcementsQuery } = useAnnouncement({
    query: ["announcementsQuery"],
    params: {
      idcondominium: user?.account?.idcondominium,
    },
  });
  return (
    <FlatList
      contentContainerClassName="p-5"
      data={announcementsQuery.data}
      renderItem={({ item }) => <Card data={item} />}
      ItemSeparatorComponent={() => <View className="mb-5" />}
      keyExtractor={(item) => item.id || ""}
      ListEmptyComponent={() => <Text>No hay anuncios</Text>}
    />
  );
};

export default Home;
