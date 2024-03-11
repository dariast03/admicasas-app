import { useEffect } from "react";
import { View, Text, Button, Image } from "react-native";
import { useSessionContext } from "../../../../hooks/useSessionContext";
import SvgResource from "@/components/SvgResource";

import { Stack } from "expo-router";

import SvgComponent from "@/components/SvgComponent";

import { OnboardFlow } from "react-native-onboard";
import he from "date-fns/esm/locale/he/index.js";
import Colors from "@/constants/Colors";
import * as ImagePicker from "expo-image-picker";
import { TouchableOpacity } from "react-native";
import Icon, { IconType } from "@/components/Icon";

const WelcomeScreen = () => {
  const { handleShowWelcomeScreen } = useSessionContext();

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
          imageUri: Image.resolveAssetSource(
            require("../../../../assets/images/Recurso_1.png")
          ).uri,
        },
        {
          title: "Cobranza",
          subtitle:
            "Realiza tus pagos de forma segura y sencilla con nuestra plataforma de cobranza. Simplifica tus pagos y disfruta de una experiencia sin preocupaciones.",
          imageUri: Image.resolveAssetSource(
            require("../../../../assets/images/Recurso_4.png")
          ).uri,
        },
        {
          title: "Reversas",
          subtitle:
            "Haz tus reservas de forma sencilla y rápida con nuestra aplicación. Elige fechas y servicios, y confirma con solo unos pocos pasos.",
          imageUri: Image.resolveAssetSource(
            require("../../../../assets/images/Recurso_2.png")
          ).uri,
        },
      ]}
      type={"fullscreen"}
      titleStyle={{
        color: Colors.primario[600],
      }}
      subtitleStyle={{
        fontSize: 15,
      }}
      PrimaryButtonComponent={() => (
        <TouchableOpacity activeOpacity={0.8}>
          <View className="bg-primario-400 w-16 h-16 rounded-full items-center justify-center">
           
          </View>
        </TouchableOpacity>
      )}
      /> */}
      <View className="flex-1 items-center justify-center bg-white">
        <Button
          title="NEXT WLC"
          onPress={() => handleShowWelcomeScreen("true")}
        />
      </View>
    </>
  );
};
export default WelcomeScreen;
