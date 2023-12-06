import { Slot, Stack } from "expo-router";
import { onAuthStateChanged } from "firebase/auth";
import { View, Text } from "react-native";
import { FirebaseAuth } from "../../config/firebase";
import { useEffect } from "react";
import useAuth from "../../hooks/useAuth";
import auth, { FirebaseAuthTypes } from "@react-native-firebase/auth";

const Layout = () => {
  const { onLogin, onLogout, onRefresh } = useAuth();

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
    return subscriber; // unsubscribe on unmount
  }, []);

  return <Slot />;
};
export default Layout;
