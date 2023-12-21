import { View, Text, Button } from "react-native";
import React from "react";
import { useSessionContext } from "@/hooks/useSessionContext";
import useAuth from "@/hooks/useAuth";

const Profile = () => {
  const { onLogout, user } = useAuth();
  return (
    <View>
      <Text>{JSON.stringify(user)}</Text>
      <Button onPress={onLogout} title="LOGOUT" />
    </View>
  );
};

export default Profile;
