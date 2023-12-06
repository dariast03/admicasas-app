import { View, Text, TextInput, TouchableOpacity } from "react-native";

import { useForm, Controller } from "react-hook-form";
import useAuth from "../../../../../hooks/useAuth";
import { IFormLogin } from "../../../../../types/user";
import { useEffect, useState } from "react";
import * as WebBrowser from 'expo-web-browser'
import * as GoogleProvider from 'expo-auth-session/providers/google'
import { GoogleAuthProvider, signInWithCredential } from "firebase/auth";
import { FirebaseAuth } from "../../../../../config/firebase";
import { makeRedirectUri } from "expo-auth-session";

WebBrowser.maybeCompleteAuthSession()


const Login = () => {
  const { onLogin, isLoading, onLoginWithEmail } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [request, response, promptAsync] = GoogleProvider.useAuthRequest({
    androidClientId: "120549257807-iijnr372hfd885uhf7aksb9nvqia17lb.apps.googleusercontent.com",
    redirectUri: makeRedirectUri({
      scheme: 'admicasas-app',

    }),
  })

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

  useEffect(() => {
    if (response?.type == "success") {
      const { id_token } = response.params
      const credential = GoogleAuthProvider.credential(id_token)
      signInWithCredential(FirebaseAuth, credential)

    }
  }, [response])

  return (
    <View className="flex-1 justify-center p-4">
      <View className="bg-white p-4 rounded-lg">
        <View className="items-center mb-4">
          <Text className="text-2xl font-bold mb-2">Bienvenido</Text>
          {/* <Image source={logo} className="h-24 w-24 mb-2" /> */}
          <Text className="text-lg font-bold">Inicia sesión con tu cuenta</Text>
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
                  value={field.value}
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
                  value={field.value}
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

        <TouchableOpacity
          onPress={handleSubmit(onSubmit)}
        //    disabled={isLoading}
        >
          <View className="bg-blue-500 p-3 rounded-md items-center">
            <Text className="text-white text-xl">Login</Text>
          </View>
        </TouchableOpacity>

        <View className="bg-white mt-2 p-3 border-2 border-gray-500 rounded-md flex-row items-center justify-center">
          <TouchableOpacity
            //     onPress={promptAsync}
            onPress={() => promptAsync()}
          //   disabled={isLoading}
          >
            <Text>Login with Google</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default Login;
