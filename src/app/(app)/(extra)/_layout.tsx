import { Redirect, Stack } from "expo-router";
import { useSessionContext } from "../../../hooks/useSessionContext";
import { useStorageState } from "../../../hooks/useStorageState";
import { Text } from "react-native";

export default function UnprotectedLayout() {
  const { status, isLoadingShowWelcomeScreen, showWelcomeScreen, user } =
    useSessionContext();

  if (status == "pending" || isLoadingShowWelcomeScreen) {
    return <Text>Loading...</Text>;
  }

  if (
    status == "authenticated" &&
    showWelcomeScreen == "true" &&
    user?.account?.idcondominium
  ) {
    //return <Redirect href="/welcome/" />;
    return <Redirect href="/" />;
  }

  if (status == "no-authenticated" && showWelcomeScreen == "true") {
    return <Redirect href="/auth/login/" />;
  }

  return <Stack />;
}
