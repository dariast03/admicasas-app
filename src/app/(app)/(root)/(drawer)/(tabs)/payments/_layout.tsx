import { StatusBar } from "expo-status-bar";
import { MaterialIcons } from "@expo/vector-icons";
import { Animated } from "react-native";
import { MaterialTopTabs } from "@/navigator/top-tabs";
// import TopBar from "../../../../../layout/TopBar";
// import DefaultLayout from "../../../../../layout/DefaultLayout";
// import LayoutWithTopBar from "../../../../../layout/LayoutWithTopBar";

import Colors from "@/constants/Colors";
import { useCharges } from "@/hooks/useCharges";
import { useAppContext } from "@/hooks/useAppContext";
import { useColorScheme } from "nativewind";
import { usePayments } from "@/hooks/usePayments";
import { useQueryClient } from "@tanstack/react-query";

const av = new Animated.Value(0);
av.addListener(() => {
  return;
});

export default function Layout() {
  const { selectedHousing } = useAppContext();
  const isDark = useColorScheme().colorScheme === "dark";

  const client = useQueryClient();

  const invalidateCharges = () => {
    client.invalidateQueries({
      queryKey: ["charges"],
    });
  };

  const invalidatePayments = () => {
    client.invalidateQueries({
      queryKey: ["payments"],
    });
  };

  /*   const { chargesQuery } = useCharges({
    params: { idhousing: selectedHousing },
  });

  const { paymentsQuery } = usePayments({
    params: { idhousing: selectedHousing },
  }); */

  return (
    <>
      {/* <StatusBar
        backgroundColor={isDark ? Colors.primario[800] : Colors.primario[600]}
        style="light"
      />  */}

      <MaterialTopTabs
        screenListeners={{
          focus: () => {
            Animated.timing(av, {
              toValue: 1,
              duration: 200,
              useNativeDriver: true,
            }).start();
          },
        }}
        tabBarPosition="top"
        screenOptions={{
          lazy: true,
          // tabBarItemStyle: {
          //   backgroundColor: "#fff",
          // },
          tabBarStyle: {
            backgroundColor: isDark ? Colors.primario[800] : "#fff",
          },
          tabBarLabelStyle: {
            fontSize: 12,
            color: isDark ? "#fff" : Colors.primario[600],
          },
          // tabBarActiveTintColor: "#000",
          tabBarIndicatorStyle: {
            backgroundColor: isDark ? "#fff" : Colors.primario[600],
          },
          // API Reference: https://reactnavigation.org/docs/material-top-tab-navigator#options
        }}
      >
        <MaterialTopTabs.Screen
          name="paymentsMain"
          listeners={{
            focus: () => invalidateCharges(),
          }}
          options={{
            title: "Pagos",

            // tabBarIcon: ({ color }) => (
            //   <MaterialIcons name="donut-small" color={color} size={20} />
            // ),
          }}
        />
        <MaterialTopTabs.Screen
          name="paymentsHistory"
          listeners={{
            focus: () => invalidatePayments(),
          }}
          options={{
            title: "Historial",
            // tabBarIcon: ({ color }) => (
            //   <MaterialIcons name="unarchive" color={color} size={20} />
            // ),
          }}
        />
      </MaterialTopTabs>
    </>
  );
}
