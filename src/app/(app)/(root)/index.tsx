import { Text, View } from "react-native";
import { useSessionContext } from "../../../hooks/useSessionContext";
import { Link, Redirect } from "expo-router";
import { useStorageState } from "../../../hooks/useStorageState";

export default function Index() {
  const { signOut } = useSessionContext();

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text
        onPress={() => {
          // The `app/(app)/_layout.tsx` will redirect to the sign-in screen.
          signOut();
        }}
      >
        Sign Out
      </Text>
    </View>
  );
}
