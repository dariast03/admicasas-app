import { useEffect } from "react";
import { View, Text, Button } from "react-native";
import { useSessionContext } from "../../../../hooks/useSessionContext";
import SvgResource from "@/components/SvgResource";

import { Stack } from "expo-router";

const WelcomeScreen = () => {
  const { handleShowWelcomeScreen } = useSessionContext();

  return (
    // <View>
    //   <Text>WelcomeScreen</Text>

    //   <Button
    //     title="VER WELCOME"
    //     onPress={() => handleShowWelcomeScreen("true")}
    //   />
    // </View>
    <View className="flex-1 items-center justify-center bg-white">
      <Stack.Screen options={{ headerShown: false }} />
      <View className="h-80 w-80">
        <SvgResource />
      </View>
      <View className="p-10">
        <Text className="text-lg text-center">
          ¡Bienvenido a Admicasas! Explora, descubre y disfruta de todas las
          funcionalidades que hemos preparado para ti.
        </Text>
      </View>
    </View>
  );
};
export default WelcomeScreen;
