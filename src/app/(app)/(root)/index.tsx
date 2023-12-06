import { Text, View } from "react-native";
import { useSessionContext } from "../../../hooks/useSessionContext";
import { Link, Redirect } from "expo-router";
import { useStorageState } from "../../../hooks/useStorageState";
import useAuth from "../../../hooks/useAuth";

export default function Index() {
  const { onLogout } = useAuth();
  const { user } = useSessionContext()

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>
        {JSON.stringify(user)}
      </Text>
      <Text
        onPress={() => {
          // The `app/(app)/_layout.tsx` will redirect to the sign-in screen.
          onLogout();
        }}
      >
        Sign Out
      </Text>
    </View>
  );
}
