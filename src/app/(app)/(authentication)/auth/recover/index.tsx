import React, { useState } from "react";
import {
  View,
  TextInput,
  Button,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import auth from "@react-native-firebase/auth";
import { router, Stack } from "expo-router";
import SvgComponent from "@/components/SvgComponent";
import { TouchableOpacity } from "react-native";
import { Image } from "react-native";
import { Text } from "react-native";
import useAuth from "@/hooks/useAuth";
import { IAccount } from "@/types/user";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

const ForgotPasswordScreen = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [showDialog, setShowDialog] = useState(false);
  const { isEmail } = useAuth();

  const handleResetPassword = async () => {
    setError("");
    const exist: IAccount | null = await isEmail(email);
    if (exist) {
      auth()
        .sendPasswordResetEmail(email)
        .then(() => {
          setShowDialog(true);
          setError(
            "Se ha enviado un correo electrónico para restablecer su contraseña. Por favor, verifique su bandeja de entrada."
          );
        })
        .catch((error) => {
          Alert.alert("Error", error.message);
        });
    } else {
      setError("El email ingresado no existe");
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 20}
    >
      <View className="flex-1 bg-white">
        <Stack.Screen
          options={{
            headerShown: false,
          }}
        />

        <View
          style={{
            position: "absolute",
            width: "100%",
            height: "100%",
            bottom: 0,
            zIndex: -1,
          }}
        >
          <SvgComponent />
        </View>

        <View className="flex-1  justify-center p-4">
          <View className="p-6 rounded-3xl border border-white">
            <View className=" items-center mb-4">
              <Text className="text-3xl font-bold mb-2 text-white">
                Restablecer Contraseña
              </Text>
              <View className="justify-center items-center ">
                <Image
                  style={{
                    height: 100,
                    width: 100,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                  source={require("../../../../../assets/images/logoblanco.png")}
                  resizeMode="contain"
                />
              </View>
              <Text className="text-lg font-bold text-white">
                Restablecer Contraseña
              </Text>
            </View>

            <View className="p-2">
              <Text className="text-xl font-bold mb-1 text-white">Email:</Text>
              <TextInput
                placeholder="Ingrese su email"
                placeholderClassName="text-primario-400"
                value={email}
                onChangeText={setEmail}
                className="text-white border border-primario-200 rounded py-2 px-4 mb-2 w-full"
              />
              {error ? <Text className="text-red-400">{error}</Text> : null}
            </View>

            <View className="p-2">
              <TouchableOpacity onPress={handleResetPassword}>
                <View className="border border-primario-200 p-3 rounded-md items-center">
                  <Text className="text-white">Restablecer contraseña</Text>
                </View>
              </TouchableOpacity>
              {showDialog && (
                <AlertDialog>
                  <AlertDialogTrigger asChild></AlertDialogTrigger>

                  <AlertDialogContent className="bg-white">
                    <AlertDialogHeader>
                      <AlertDialogTitle>Alertas</AlertDialogTitle>
                      <AlertDialogDescription>{error}</AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>
                        <Text>Cancelar</Text>
                      </AlertDialogCancel>
                      <AlertDialogAction onPress={() => {}}>
                        <Text>Continuar</Text>
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              )}
            </View>
            <View className="flex-row items-center justify-end pt-2 mr-4">
              <TouchableOpacity onPress={() => router.back()}>
                <Text className="font-bold text-white">Volver al inicio</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

export default ForgotPasswordScreen;
