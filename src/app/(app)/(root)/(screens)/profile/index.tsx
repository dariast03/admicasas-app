import { View, Text, Button } from "react-native";
import React from "react";
import { useSessionContext } from "@/hooks/useSessionContext";

const Profile = () => {
  const { signOut, user } = useSessionContext();
  return (
    <View>
      <Text>{JSON.stringify(user)}</Text>
      <Button onPress={signOut} title="LOGOUT" />
    </View>
  );
};

export default Profile;
