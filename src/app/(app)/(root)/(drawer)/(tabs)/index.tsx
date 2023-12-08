import React from "react";
import { View, Text, FlatList } from "react-native";
import { useAnnouncement } from "../../../../../hooks/useAnnouncement";
import { useSessionContext } from "../../../../../hooks/useSessionContext";

type Props = {
  text: string;
};

const Card = ({ text }: Props) => (
  <View className={`bg-white p-5 m-2 rounded-lg`}>
    <Text>{text}</Text>
  </View>
);
const { user } = useSessionContext();
const { announcementsQuery } = useAnnouncement({
  params: {
    idcondominium: "HV2WHtWT2yeZm2QeQp6b",
  },
});
const Home = () => {
  return (
    <FlatList
      data={announcementsQuery.data}
      renderItem={({ item }) => <Card text={item.description} />}
      keyExtractor={(item) => item.id || ""}
    />
  );
};

export default Home;
