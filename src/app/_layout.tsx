import FontAwesome from "@expo/vector-icons/FontAwesome";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Slot, SplashScreen, Stack } from "expo-router";
import { useEffect } from "react";
import { useColorScheme } from "react-native";
import { SessionProvider } from "../context/SessionContext";
//import "../output.css";
import Toast from "react-native-toast-message";
import messaging from "@react-native-firebase/messaging";
import { toastConfig } from "@/components/Toast";
import "../global.css";
import "../output.css";
import { AppProvider } from "@/context/AppContext";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from "expo-router";

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: "(tabs)",
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

messaging().setBackgroundMessageHandler(async (msg) => {
  console.log("NOTIFICATION ON BACKGROUND", msg.data);
});

const queryClient = new QueryClient();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
    ...FontAwesome.font,
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return <RootLayoutNav />;
}

function RootLayoutNav() {
  const colorScheme = useColorScheme();

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <QueryClientProvider client={queryClient}>
        <AppProvider>
          <SessionProvider>
            <BottomSheetModalProvider>
              <Slot />
            </BottomSheetModalProvider>
          </SessionProvider>
        </AppProvider>
      </QueryClientProvider>
    </GestureHandlerRootView>
  );
}

/* import { Redirect, Slot } from "expo-router";
import { SessionProvider } from "../context/SessionContext";
import { useStorageState } from "../hooks/useStorageState";
import { Text } from "../components/Themed";
import messaging from '@react-native-firebase/messaging';

export default function Root() {
  // Set up the auth context and render our layout inside of it.

  return (
    <SessionProvider>
      <Slot />
    </SessionProvider>
  );
}
 */
