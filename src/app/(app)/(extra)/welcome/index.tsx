import { useEffect } from "react";
import { View, Text, Button, Image } from "react-native";
import { useSessionContext } from "../../../../hooks/useSessionContext";

import { Stack } from "expo-router";

import { OnboardFlow } from "react-native-onboard";
import Colors from "@/constants/Colors";

import Icon, { IconType } from "@/components/Icon";
import { useWindowDimensions } from "react-native";
import { auth } from "firebase-admin";

const WelcomeScreen = () => {
  const { handleShowWelcomeScreen } = useSessionContext();
  const { width } = useWindowDimensions();
  return (
    <>
      {/* 
   <View>
       <Text>WelcomeScreen</Text>

    //   <Button
    //     title="VER WELCOME"
    //     onPress={() => handleShowWelcomeScreen("true")}
    //   />
    // </View>

   <OnboardFlow
      pages={[
        {
          title: " ¡Bienvenido a Admicasas!",
          subtitle:
            " Explora, descubre y disfruta de todas las funcionalidades que hemos preparado para ti.",
          imageComponent: (
            <View className="justify-center items-center p-20">
              <Image
                resizeMode="contain"
                style={{
                  padding: 10,
                  height: 250,
                  width: width,
                  justifyContent: "center",
                  alignItems: "center",
                }}
                source={require("../../../../assets/images/Recurso_1.png")}
              />
            </View>
          ),
          primaryButtonTitle: "Siguiente",
        },
        {
          title: "Cobranza",
          subtitle:
            "Realiza tus pagos de forma segura y sencilla con nuestra plataforma de cobranza. Simplifica tus pagos y disfruta de una experiencia sin preocupaciones.",
          // imageUri: Image.resolveAssetSource(
          //   require("../../../../assets/images/Recurso_4.png")
          // ).uri,
          primaryButtonTitle: "Siguiente",
          imageComponent: (
            <View className="justify-center items-center p-10">
              <Image
                resizeMode="contain"
                style={{
                  height: 300,
                  width: width,
                  justifyContent: "center",
                  alignItems: "center",
                }}
                source={require("../../../../assets/images/Recurso_4.png")}
              />
            </View>
          ),
        },
        {
          title: "Reversas",
          subtitle:
            "Haz tus reservas de forma sencilla y rápida con nuestra aplicación. Elige fechas y servicios, y confirma con solo unos pocos pasos.",
          primaryButtonTitle: "Iniciemos",
          imageComponent: (
            <View className="justify-center items-center p-20">
              <Image
                resizeMode="contain"
                style={{
                  height: 250,
                  width: width,
                  justifyContent: "center",
                  alignItems: "center",
                }}
                source={require("../../../../assets/images/Recurso_2.png")}
              />
            </View>
          ),
        },
      ]}
      type={"fullscreen"}
      titleStyle={{
        color: Colors.primario[600],
      }}
      subtitleStyle={{
        fontSize: 15,
      }}
      primaryButtonStyle={{
        backgroundColor: Colors.primario[600],
      }}
      onDone={() => handleShowWelcomeScreen("true")}
    />
    // <View className="flex-1 items-center justify-center bg-white">
    //   <Stack.Screen options={{ headerShown: false }} />
    //   <View className="h-80 w-80">
    //     <SvgResource />
    //   </View>
    //   <View className="p-10">
    //     <Text className="text-lg text-center">
    //
    //     </Text>
    //   </View>
    // </View>
  );
};
export default WelcomeScreen;
