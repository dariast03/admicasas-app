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
  const { width, height } = useWindowDimensions();
  return (
    <View className="justify-center items-center">
      <OnboardFlow
        pages={[
          {
            title: " ¡Bienvenido a Admicasas!",
            subtitle:
              " Explora, descubre y disfruta de todas las funcionalidades que hemos preparado para ti.",
            imageComponent: (
              <View className="justify-center items-center p-5">
                <Image
                  resizeMode="contain"
                  style={{
                    padding: 10,
                    height: height * 0.3,
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
              <View className="justify-center items-center p-5">
                <Image
                  resizeMode="contain"
                  style={{
                    height: height * 0.3,
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
            style: {
              backgroundColor: "red",
              justifyContent: "center",
              alignItems: "center",
            },

            title: "Reversas",
            subtitle:
              "Haz tus reservas de forma sencilla y rápida con nuestra aplicación. Elige fechas y servicios, y confirma con solo unos pocos pasos.",
            primaryButtonTitle: "Iniciemos",
            imageComponent: (
              <View className="justify-center items-center p-5">
                <Image
                  resizeMode="contain"
                  style={{
                    height: height * 0.3,
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
        pageStyle={{
          flex: 1,
          backgroundColor: "red",
          justifyContent: "center",
          alignItems: "center",
        }}
      />
    </View>
  );
};
export default WelcomeScreen;
