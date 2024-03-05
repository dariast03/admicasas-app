import { StatusBar } from "expo-status-bar";
import { MaterialIcons } from "@expo/vector-icons";
import { Animated, useColorScheme } from "react-native";
import { MaterialTopTabs } from "@/navigator/top-tabs";
// import TopBar from "../../../../../layout/TopBar";
// import DefaultLayout from "../../../../../layout/DefaultLayout";
// import LayoutWithTopBar from "../../../../../layout/LayoutWithTopBar";

import Colors from "@/constants/Colors";
import { useCharges } from "@/hooks/useCharges";
import { useAppContext } from "@/hooks/useAppContext";

const av = new Animated.Value(0);
av.addListener(() => {
  return;
});

export default function Layout() {
  const { selectedHousing } = useAppContext();
  const { chargesQuery } = useCharges({
    params: { idhousing: selectedHousing },
  });
  return (
    <>
      <StatusBar
        backgroundColor={
          /*  isDarkMode ? COLORS.dark.secondary : COLORS.light.background */
          Colors.primario[600]
        }
        style="light"
      />

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
          //   lazy: true,
          //tabBarItemStyle: { padding: 6 },

          /*  tabBarStyle: {
               backgroundColor: isDarkMode ? COLORS.dark.secondary : '#FFF',
             }, */
          tabBarLabelStyle: { margin: 0, padding: 0, fontSize: 12 },

          /*  tabBarActiveTintColor: isDarkMode
               ? '#FFF'
               : COLORS.light.background, */

          // API Reference: https://reactnavigation.org/docs/material-top-tab-navigator#options
        }}
      >
        <MaterialTopTabs.Screen
          name="paymentsMain"
          listeners={{
            focus: () => {
              chargesQuery.refetch();
            },
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
