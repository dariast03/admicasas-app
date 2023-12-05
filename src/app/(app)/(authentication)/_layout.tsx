import { Redirect, Stack } from "expo-router";
import { useSessionContext } from "../../../hooks/useSessionContext";
import { useStorageState } from "../../../hooks/useStorageState";
import { Text } from "../../../components/Themed";

export default function UnprotectedLayout() {
  const { session, isLoading, isLoadingShowWelcomeScreen, showWelcomeScreen } =
    useSessionContext();

  if (isLoading || isLoadingShowWelcomeScreen) {
    return <Text>Loading...</Text>;
  }

  if (session && showWelcomeScreen == "true") {
    return <Redirect href="/" />;
  }

  if (!showWelcomeScreen) {
    return <Redirect href="/welcome/" />;
  }

  return <Stack />;
}
