import { useEffect } from "react";
import { View, Text, Button } from "react-native";
import { useSessionContext } from "../../../../hooks/useSessionContext";
import { Entypo } from "@expo/vector-icons";

const WelcomeScreen = () => {
  const { handleShowWelcomeScreen } = useSessionContext();

  return (
    <View className="flex-1 items-center justify-center">
      <Text>SplashScreen Demo! 👋</Text>
      <Entypo name="rocket" size={30} />
    </View>
  );
};
export default WelcomeScreen;
