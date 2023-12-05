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

  if (!showWelcomeScreen) {
    return <Redirect href="/welcome/" />;
  }
  if (!session) {
    return <Redirect href="/auth/login/" />;
  }

  return <Stack />;
}
