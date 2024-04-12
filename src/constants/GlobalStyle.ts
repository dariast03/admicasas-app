import { useColorScheme } from "nativewind";
import { StyleSheet } from "react-native";
import Colors from "./Colors";

const GlobalStyles = () => {
  const isDark = useColorScheme().colorScheme == "dark";
  const styles = StyleSheet.create({
    shadowCard: {
      shadowColor: isDark ? Colors.primario[600] : Colors.primario[800],
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.23,
      shadowRadius: 2.62,
      elevation: 4,
    },
  });

  return styles.shadowCard;
  //return isDark ? "#000" : Colors.primario[800];
};

export default GlobalStyles;
