import { useEffect } from "react";
import { View, Text, Button } from "react-native";
import { useSessionContext } from "../../../../hooks/useSessionContext";

const WelcomeScreen = () => {
  const { handleShowWelcomeScreen } = useSessionContext();

  return (
    <View>
      <Text>WelcomeScreen</Text>

      <Button
        title="VER WELCOME"
        onPress={() => handleShowWelcomeScreen("true")}
      />
    </View>
  );
};
export default WelcomeScreen;
