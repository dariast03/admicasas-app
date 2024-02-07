import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Button,
  ImageBackground,
  StyleSheet,
} from "react-native";

import { useForm, Controller } from "react-hook-form";
import useAuth from "../../../../../hooks/useAuth";
import { IFormLogin } from "../../../../../types/user";
import { useState } from "react";
import { GoogleSignin } from "@react-native-google-signin/google-signin";

GoogleSignin.configure({
  webClientId:
    "302500073375-qvu5740gtmlec06ai8f13di0fgjl37sd.apps.googleusercontent.com",
});

import auth from "@react-native-firebase/auth";
import { Link, Stack } from "expo-router";
import SvgComponent from "@/components/SvgComponent";

async function onGoogleButtonPress() {
  // Check if your device supports Google Play
  await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
  // Get the users ID token

  console.log("xddd");
  const { idToken } = await GoogleSignin.signIn();
  console.log(idToken);

  // Create a Google credential with the token
  const googleCredential = auth.GoogleAuthProvider.credential(idToken);

  // Sign-in the user with the credential
  return auth().signInWithCredential(googleCredential);
}

const Login = () => {
  const { onLogin, isLoading, onLoginWithEmail } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const {
    control,
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<IFormLogin>({
    mode: "onChange",
  });

  const onSubmit = (data: IFormLogin) => {
    onLogin({ ...data, rememberEmail: false });
  };

  return (
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
            <Text className="text-4xl font-bold mb-2 text-white">
              Bienvenido
            </Text>
            {/* <Image source={logo} className="h-24 w-24 mb-2" /> */}
            <Text className="text-lg font-bold text-white">
              Inicia sesión con tu cuenta
            </Text>
          </View>

          <View className="p-2">
            <Text className="text-xl font-bold mb-1 text-white">Email:</Text>
            <Controller
              name="email"
              control={control}
              rules={{
                required: "Email requerido",
              }}
              render={({ field, formState }) => (
                <>
                  <TextInput
                    {...field}
                    placeholder="Ingrese su email"
                    placeholderClassName="text-primario-400"
                    value={field.value}
                    onChangeText={(e) => field.onChange(e)}
                    className="text-white border border-primario-200 rounded py-2 px-4 mb-2 w-full"
                  />
                </>
              )}
            />

            {errors?.email && (
              <Text style={{ color: "red" }}>{errors.email?.message}</Text>
            )}
          </View>

          <View className="mb-2 p-2">
            <Text className="text-xl font-bold mb-1 text-white">
              Contraseña:
            </Text>
            <Controller
              name="password"
              control={control}
              rules={{
                required: "Contraseña requerida",
              }}
              render={({ field, formState }) => (
                <>
                  <TextInput
                    {...field}
                    placeholder="Ingrese su contraseña"
                    placeholderClassName="text-primario-400"
                    value={field.value}
                    secureTextEntry
                    onChangeText={(e) => field.onChange(e)}
                    className="text-white border border-primario-200 rounded py-2 px-4 mb-2 w-full"
                  />
                </>
              )}
            />
            {errors?.password && (
              <Text style={{ color: "red" }}>{errors.password?.message}</Text>
            )}
          </View>

          {/* <TouchableOpacity onPress={handleSubmit(onSubmit)}>
            <View className="bg-blue-500 p-3 rounded-md items-center">
              <Text className="text-white text-xl">Login</Text>
            </View>
          </TouchableOpacity> */}
          <View className="p-2">
            <TouchableOpacity onPress={handleSubmit(onSubmit)}>
              <View className="border border-primario-200 p-3 rounded-md items-center">
                <Text className="text-primario-100 text-xl">Login</Text>
              </View>
            </TouchableOpacity>
          </View>
          <View className="flex-row items-center justify-end p-4">
            <TouchableOpacity>
              <Text className="font-bold text-blue-500 ">
                Olvidaste tu contraseña?
              </Text>
            </TouchableOpacity>
          </View>
          {/* <TouchableOpacity
            //     onPress={promptAsync}
            //onPress={() => promptAsync()}
            //   disabled={isLoading}
            onPress={() =>
              onGoogleButtonPress().then(() =>
                console.log("Signed in with Google!")
              )
            }
          >
            <View className="bg-white mt-2 p-3 border-2 border-gray-500 rounded-md flex-row items-center justify-center">
              <Text>Login with Google</Text>
            </View>
          </TouchableOpacity> */}

          {/* <View className="items-center justify-center m-10">
            <View className="flex-row gap-2">
              <Text>No tienes una cuenta?</Text>
              <Link href={"/auth/register/"} asChild>
                <TouchableOpacity>
                  <Text className="text-green-400 font-bold">Registrate</Text>
                </TouchableOpacity>
              </Link>
            </View>
          </View> */}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  shadowCard: {
    shadowColor: "#4f46e5",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.2,
    shadowRadius: 5.62,
    elevation: 7,
  },
});

export default Login;
