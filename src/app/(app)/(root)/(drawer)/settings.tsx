import { View, Text } from "react-native";
import React from "react";
import { useColorScheme } from "nativewind";
import { Button } from "@/components/ui/button";

const Settings = () => {
  const { toggleColorScheme } = useColorScheme();
  return (
    <View>
      <Text>Settings</Text>
      <Button
        size={"sm"}
        onPress={toggleColorScheme}
        className="dark:bg-red-600"
      >
        Cambiar Tema
      </Button>
    </View>
  );
};

export default Settings;
