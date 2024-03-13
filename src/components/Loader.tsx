import Colors from "@/constants/Colors";
import { ActivityIndicatorProps, DimensionValue } from "react-native";
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
  return (
    <View
      className="flex-1 items-center justify-center"
      style={{ height }}
      {...containerProps}
    >
      <ActivityIndicator
        color={Colors.primario[600]}
        size={40}
        {...activityIndicator}
      />
      {name !== "" ? (
        <Text className="text-sm text-primario-600">Cargando {name}...</Text>
      ) : (
        <Text className="text-sm text-primario-600">Cargando...</Text>
      )}
    </View>
  );
};
export default Loader;
