import Colors from "@/constants/Colors";
import { ActivityIndicatorProps, DimensionValue } from "react-native";
import { View, Text, ActivityIndicator, ViewProps } from "react-native";

interface Props {
  height?: DimensionValue;
  containerProps?: ViewProps;
  activityIndicator?: ActivityIndicatorProps;
}
const Loader: React.FC<Props> = ({
  activityIndicator,
  containerProps,
  height = "auto",
}) => {
  return (
    <View
      className="flex-1 items-center justify-center"
      style={{ height }}
      {...containerProps}
    >
      <ActivityIndicator
        color={Colors.primario[700]}
        size={40}
        {...activityIndicator}
      />
    </View>
  );
};
export default Loader;
