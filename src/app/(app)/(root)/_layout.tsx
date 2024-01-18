import { Redirect, Stack } from "expo-router";
import { useSessionContext } from "../../../hooks/useSessionContext";
import { useStorageState } from "../../../hooks/useStorageState";
import { SafeAreaView } from "react-native-safe-area-context";
import { Text } from "react-native";

export default function UnprotectedLayout() {
  const { status, isLoadingShowWelcomeScreen, showWelcomeScreen, user } =
    useSessionContext();

  if (status == "pending" || isLoadingShowWelcomeScreen) {
    return <Text>Loading...</Text>;
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
