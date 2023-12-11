import { View, Text, FlatList, TouchableOpacity } from "react-native";
import React from "react";
import DefaultLayout from "@/layout/DefaultLayout";
import { FontAwesome } from "@expo/vector-icons";
import { ScrollView } from "react-native-gesture-handler";
import { Link } from "expo-router";

type Menu = {
  icon: any;
  title: string;
  to: any;
};
const menu: Menu[] = [
  {
    icon: <FontAwesome name="deafness" size={50} color="#FFF" />,
    title: "INCIDENTES",
    to: "/incidents",
  },
  {
    icon: <FontAwesome name="diamond" size={50} color="#FFF" />,
    title: "ALGO MAS",
    to: "/algomas",
  },
  {
    icon: <FontAwesome name="ticket" size={50} color="#FFF" />,
    title: "OTRO MAS",
    to: "/otromas",
  },
];
const Community = () => {
  return (
    <DefaultLayout withSafeArea={false}>
      <FlatList
        data={null}
        contentContainerClassName="p-4"
        renderItem={() => null}
        ListHeaderComponent={() => (
          <View className="flex-row flex-wrap gap-2 justify-center">
            {menu.map((option, i) => (
              <Link href={option.to} key={option.title + i} asChild>
                <TouchableOpacity activeOpacity={0.8}>
                  <Card {...option} />
                </TouchableOpacity>
              </Link>
            ))}
          </View>
        )}
      />
    </DefaultLayout>
  );
};

type CardProps = {
  title: string;
  icon: any;
};
const Card: React.FC<CardProps> = ({ icon, title }) => {
  return (
    <View className="bg-primario-400 p-5 items-center  justify-center gap-3 rounded-2xl w-40 h-40">
      {icon}
      <Text className="text-white">{title}</Text>
    </View>
  );
};

export default Community;
