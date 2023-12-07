import { Slot } from "expo-router";
import { useEffect } from "react";
import useAuth from "../../hooks/useAuth";
import auth, { FirebaseAuthTypes } from "@react-native-firebase/auth";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";


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
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  }, []);

  useEffect(() => {
    const subscriber = () => {
      console.log("object");
    }
    return subscriber;
  }, []);

  return <>
    <QueryClientProvider client={queryClient}>
      <Slot />
    </QueryClientProvider>
  </>
};
export default Layout;
