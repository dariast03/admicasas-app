import { Slot } from "expo-router";
import { useEffect } from "react";
import useAuth from "../../hooks/useAuth";
import auth, { FirebaseAuthTypes } from "@react-native-firebase/auth";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Toast from "react-native-toast-message";
import { SafeAreaView } from "react-native-safe-area-context";
import { AppProvider } from "@/context/AppContext";

const queryClient = new QueryClient();

const Layout = () => {
  const { onLogout, onRefresh } = useAuth();

  /*   useEffect(() => {
    onAuthStateChanged(FirebaseAuth, async (user) => {
      console.log(user, "auth");
      if (!user) return onLogout();
      onRefresh(user);
    });
  }, []); */

  function onAuthStateChanged(user: FirebaseAuthTypes.User | null) {
    if (!user) return onLogout();
    onRefresh(user);
  }

  useEffect(() => {
    try {
      const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
      return subscriber;
    } catch {
      console.log("error");
    }
  }, []);

  useEffect(() => {
    const subscriber = () => {
      console.log("object");
    };
    return subscriber;
  }, []);

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <AppProvider>
          <Slot />
        </AppProvider>
      </QueryClientProvider>
    </>
  );
};
export default Layout;
