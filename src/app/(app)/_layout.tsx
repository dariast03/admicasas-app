import { Slot, Stack } from "expo-router";
import { onAuthStateChanged } from "firebase/auth";
import { View, Text } from "react-native";
import { FirebaseAuth } from "../../config/firebase";
import { useEffect } from "react";
import useAuth from "../../hooks/useAuth";

const Layout = () => {
  const { onLogin, onLogout, onRefresh } = useAuth();

  useEffect(() => {
    onAuthStateChanged(FirebaseAuth, async (user) => {
      console.log(user, "auth");
      if (!user) return onLogout();
      onRefresh(user);
    });
  }, []);

  return <Slot />;
};
export default Layout;
