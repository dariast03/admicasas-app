import Colors from "@/constants/Colors";
import {
  ActivityIndicatorProps,
  DimensionValue,
  useColorScheme,
} from "react-native";
import { View, Text, ActivityIndicator, ViewProps } from "react-native";

interface Props {
  height?: DimensionValue;
  containerProps?: ViewProps;
  activityIndicator?: ActivityIndicatorProps;
  name?: string;
}

const Loader: React.FC<Props> = ({
  activityIndicator,
  containerProps,
  height = "auto",
  name = "",
}) => {
  const isDark = useColorScheme() === "dark";
  return (
    <View
      className="flex-1 items-center justify-center"
      style={{ height }}
      {...containerProps}
    >
      <ActivityIndicator
        color={isDark ? "white" : Colors.primario[600]}
        size={40}
        {...activityIndicator}
      />
      {name !== "" ? (
        <Text className="text-sm  text-primario-600 dark:text-white">
          Cargando {name}...
        </Text>
      ) : (
        <Text className="text-sm text-primario-600 dark:text-white">
          Cargando...
        </Text>
      )}
    </View>
  );
};
export default Loader;
