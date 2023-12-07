import { View, Text, Button } from "react-native";
import { useSessionContext } from "../../../../hooks/useSessionContext";
const ConfigurationCondominium = () => {
  const { signOut, user } = useSessionContext();
  return (
    <View>
      <Text>No tienes un condominio asignado, busca uno</Text>
      <View>
        <Button onPress={signOut} title="LOGOUT" />
      </View>
    </View>
  );
};
export default ConfigurationCondominium;
