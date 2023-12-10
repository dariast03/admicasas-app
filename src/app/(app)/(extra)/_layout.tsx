import { Redirect, Stack } from "expo-router";
import { useSessionContext } from "../../../hooks/useSessionContext";
import { useStorageState } from "../../../hooks/useStorageState";
import { Text } from "react-native";

export default function UnprotectedLayout() {
  const {
    session,
    isLoading,
    isLoadingShowWelcomeScreen,
    showWelcomeScreen,
    user,
  } = useSessionContext();

  if (isLoading || isLoadingShowWelcomeScreen) {
    return <Text>Loading...</Text>;
  }

  if (showWelcomeScreen == "true" && user?.account?.idcondominium) {
    return <Redirect href="/" />;
  }

  if (!session && showWelcomeScreen == "true") {
    return <Redirect href="/auth/login/" />;
  }

  return <Stack />;
}
