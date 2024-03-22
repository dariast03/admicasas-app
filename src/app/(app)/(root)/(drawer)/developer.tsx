import useAuth from "@/hooks/useAuth";
import { Text } from "@/components/ui/text";
const Developer = () => {
  const { user } = useAuth();
  return <Text>{JSON.stringify(user)}</Text>;
};
export default Developer;
