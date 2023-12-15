import { View, Text } from "react-native";

import { Link } from "expo-router";
import { FontAwesome, MaterialIcons } from "@expo/vector-icons";
import DrawerToggleButton from "../components/DrawerToggleButton";

const TopBar = () => {
  return (
    <View className="bg-primario-600 flex-row justify-between items-center">
      <DrawerToggleButton tintColor="#fff" pressColor="red" />

      <Link href={"/notifications/"}>
        <Text>BOTIFCACIONS</Text>
      </Link>

      <View className="flex-row items-center">
        <Link href="/notifications">
          <View className="p-2 ">
            <MaterialIcons name="notifications" color={"#FFF"} size={23} />
          </View>
        </Link>

        <Link href="/profile/">
          <View className="mr-4 p-2 ">
            <FontAwesome name="user-circle-o" size={20} color="#fff" />
          </View>
        </Link>
      </View>
    </View>
  );
};

export default TopBar;
