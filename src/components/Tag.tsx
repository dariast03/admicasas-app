import clsx from "clsx";
import { View, Text } from "react-native";

interface Props {
  value: any;
  severity?: "success" | "error" | "warning" | "primary" | "info" | "help";
  containerProps?: any;
  labelProps?: any;
}
const Tag: React.FC<Props> = ({ severity = "primary", value }) => {
  return (
    <View
      className={clsx([
        "px-2 rounded-full py-0.5",
        {
          "bg-green-500": severity === "success",
          "bg-red-500": severity === "error",
          "bg-yellow-500 dark:bg-yellow-400": severity === "warning",
          "bg-primario-500 dark:bg-primario-700": severity === "primary",
          "bg-blue-500": severity === "info",
          "bg-orange-500": severity === "help",
        },
      ])}
    >
      <Text
        className={clsx([
          "text-sm",
          {
            "text-white": [
              "success",
              "error",
              "warning",
              "primary",
              "info",
              "help",
            ].includes(severity),
          },
        ])}
      >
        {value}
      </Text>
    </View>
  );
};
export default Tag;
