import { View, Text, TextInput, TouchableOpacity, Button } from "react-native";

import { useForm, Controller } from "react-hook-form";
import useAuth from "../../../../../hooks/useAuth";
import { IFormLogin, IFormRegister } from "../../../../../types/user";
import { useState } from "react";
import { GoogleSignin } from "@react-native-google-signin/google-signin";

GoogleSignin.configure({
  webClientId:
    "302500073375-qvu5740gtmlec06ai8f13di0fgjl37sd.apps.googleusercontent.com",
});

import auth from "@react-native-firebase/auth";
import { Link } from "expo-router";

async function onGoogleButtonPress() {
  await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
  const { idToken } = await GoogleSignin.signIn();
  const googleCredential = auth.GoogleAuthProvider.credential(idToken);
  return auth().signInWithCredential(googleCredential);
}

const Login = () => {
  const { onRegister, isLoading } = useAuth();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormRegister>({
    mode: "onChange",
  });

  const onSubmit = (data: IFormRegister) => {
    onRegister({ ...data, rememberEmail: false });
  };

  return (
    <View className="flex-1 justify-center p-4">
      <View className="bg-white p-4 rounded-lg">
        <View className="items-center mb-4">
          <Text className="text-2xl font-bold mb-2">Bienvenido</Text>
          {/* <Image source={logo} className="h-24 w-24 mb-2" /> */}
          <Text className="text-lg font-bold">Inicia sesión con tu cuenta</Text>
        </View>

        <View>
          <Text className="text-xl font-bold mb-1">FullName:</Text>
          <Controller
            name="name"
            control={control}
            rules={{
              required: "Name is required",
            }}
            render={({ field, fieldState: { error } }) => (
              <>
                <TextInput
                  {...field}
                  placeholder="Ingrese su nombre "
                  onChangeText={(e) => field.onChange(e)}
                  className="border-b-2 py-2 px-4 mb-2 w-full"
                />

                {error && <Text style={{ color: "red" }}>{error.message}</Text>}
              </>
            )}
          />
        </View>

        <View>
          <Text className="text-xl font-bold mb-1">Email:</Text>
          <Controller
            name="email"
            control={control}
            rules={{
              required: "Email required",
            }}
            render={({ field, formState }) => (
              <>
                <TextInput
                  {...field}
                  placeholder="Ingrese su email"
                  onChangeText={(e) => field.onChange(e)}
                  className="border-b-2 py-2 px-4 mb-2 w-full"
                />
              </>
            )}
          />
          {errors?.email && (
            <Text style={{ color: "red" }}>{errors.email?.message}</Text>
          )}
        </View>

        <View>
          <Text className="text-xl font-bold mb-1">Contraseña:</Text>
          <Controller
            name="password"
            control={control}
            rules={{
              required: "password required",
            }}
            render={({ field, formState }) => (
              <>
                <TextInput
                  {...field}
                  placeholder="Ingrese su pass"
                  secureTextEntry
                  onChangeText={(e) => field.onChange(e)}
                  className="border-b-2 py-2 px-4 mb-2 w-full"
                />
              </>
            )}
          />
          {errors?.password && (
            <Text style={{ color: "red" }}>{errors.password?.message}</Text>
          )}
        </View>

        <View className="flex-row items-center mb-4">
          <TouchableOpacity>
            <Text className="font-bold text-blue-500">
              Olvidaste tu contraseña?
            </Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity onPress={handleSubmit(onSubmit)} disabled={isLoading}>
          <View className="bg-blue-500 p-3 rounded-md items-center">
            <Text className="text-white text-xl">Login</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
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
        </TouchableOpacity>

        <View className="items-center justify-center m-10">
          <View className="flex-row gap-2">
            <Text>Ya tienes una cuenta?</Text>
            <Link href={"/auth/login/"} asChild>
              <TouchableOpacity>
                <Text className="text-green-400 font-bold">Inicia sesion</Text>
              </TouchableOpacity>
            </Link>
          </View>
        </View>
      </View>
    </View>
  );
};

export default Login;
