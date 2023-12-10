import { Stack } from "expo-router";
import { View, Text } from "react-native";
const _layout = () => {
  return (
    <Stack>
      <Stack.Screen name="index" />

      <Stack.Screen name="form/[id]" />
    </Stack>
  );
};
export default _layout;
