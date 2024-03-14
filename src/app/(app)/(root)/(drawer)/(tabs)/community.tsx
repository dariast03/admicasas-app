import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import React from "react";
import DefaultLayout from "@/layout/DefaultLayout";
import { FontAwesome } from "@expo/vector-icons";
import { Link } from "expo-router";
import Colors from "@/constants/Colors";
import { useColorScheme } from "nativewind";
import GlobalStyles from "@/constants/GlobalStyle";
type Menu = {
  icon: any;
  title: string;
  to: any;
};

const Community = () => {
  const isDark = useColorScheme().colorScheme === "dark";
  const menu: Menu[] = [
    {
      icon: (
        <FontAwesome
          name="warning"
          size={50}
          color={isDark ? "#fff" : Colors.primario[600]}
        />
      ),
      title: "INCIDENTES",
      to: "/incidents",
    },
    {
      icon: (
        <FontAwesome
          name="group"
          size={50}
          color={isDark ? "#fff" : Colors.primario[600]}
        />
      ),
      title: "LIBRO VISITAS",
      to: "/visits",
    },
    {
      icon: (
        <FontAwesome
          name="group"
          size={50}
          color={isDark ? "#fff" : Colors.primario[600]}
        />
      ),
      title: "REUNIONES",
      to: "/meeting",
    },
  ];
  return (
    <DefaultLayout withSafeArea={false}>
      <Text className="text-center text-primario-600 dark:text-white font-bold text-2xl mt-10">
        COMUNIDAD
      </Text>
      <FlatList
        data={null}
        contentContainerClassName="p-5 flex-1"
        renderItem={() => null}
        ListHeaderComponent={() => (
          <View className=" flex-row flex-wrap gap-10 justify-center ">
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
    <View
      className="bg-white dark:bg-primario-800 p-5 items-center  justify-center gap-3 rounded-2xl w-44 h-44 border border-gray-200 dark:border-primario-800"
      style={GlobalStyles()}
    >
      {icon}
      <Text className="text-primario-600 dark:text-white">{title}</Text>
    </View>
  );
};

export default Community;
