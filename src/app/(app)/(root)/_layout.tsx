import { Redirect, Stack } from "expo-router";
import { useSessionContext } from "../../../hooks/useSessionContext";

import { StyleSheet, Text, View } from "react-native";

import Loader from "@/components/Loader";
import DefaultLayout from "@/layout/DefaultLayout";
import SvgLoader from "@/components/SvgLoader";

export default function UnprotectedLayout() {
  const { status, isLoadingShowWelcomeScreen, showWelcomeScreen, user } =
    useSessionContext();

  if (status == "pending" || isLoadingShowWelcomeScreen) {
    return (
      <View className="flex-1 justify-center items-center">
        <Loader />
      </View>
    );
  }

  if (!showWelcomeScreen) {
    return <Redirect href="/welcome/" />;
  }
  if (status == "no-authenticated") {
    return <Redirect href="/auth/login/" />;
  }

  if (!user.account?.idcondominium) {
    return <Redirect href="/configurationcondominium/" />;
  }

  return (
    <>
      <Stack>
        <Stack.Screen
          name="(drawer)"
          options={{
            headerShown: false,
          }}
        />

        <Stack.Screen
          name="(screens)"
          options={{
            headerShown: false,
          }}
        />
      </Stack>
    </>
  );
}
