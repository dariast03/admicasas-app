import { StatusBar } from "expo-status-bar";
import { MaterialIcons } from "@expo/vector-icons";
import { Animated, useColorScheme } from "react-native";
import { MaterialTopTabs } from "../../../../../navigator/top-tabs";
import TopBar from "../../../../../layout/TopBar";
import DefaultLayout from "../../../../../layout/DefaultLayout";
import LayoutWithTopBar from "../../../../../layout/LayoutWithTopBar";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Colors from "@/constants/Colors";

const av = new Animated.Value(0);
av.addListener(() => {
  return;
});
const queryClient = new QueryClient();
export default function Layout() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <StatusBar
          backgroundColor={
            /*  isDarkMode ? COLORS.dark.secondary : COLORS.light.background */
            Colors.primario[600]
          }
          style="light"
        />

        <LayoutWithTopBar>
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
            tabBarPosition="bottom"
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
              name="index"
              options={{
                title: "Inicio",
                tabBarIcon: ({ color }) => (
                  <MaterialIcons name="home" color={color} size={20} />
                ),
              }}
            />
            {/* 
                <MaterialTopTabs.Screen
                    name="two"
                    options={{
                        title: 'Estudiante',
                        tabBarIcon: ({ color }) => <MaterialIcons name="school" color={color} size={20} />,
                    }}
                />

                <MaterialTopTabs.Screen
                    name="perfil"
                    options={{
                        title: 'Perfil',
                        tabBarIcon: ({ color }) => <FontAwesome name="user-circle" color={color} size={20} />,

                    }}
                />
 */}
            <MaterialTopTabs.Screen
              name="community"
              options={{
                title: "Comunidad",
                tabBarIcon: ({ color }) => (
                  <MaterialIcons name="unarchive" color={color} size={20} />
                ),
              }}
            />

            <MaterialTopTabs.Screen
              name="payments"
              options={{
                title: "Pagos",
                tabBarIcon: ({ color }) => (
                  <MaterialIcons name="donut-small" color={color} size={20} />
                ),
              }}
            />

            <MaterialTopTabs.Screen
              name="reservations"
              options={{
                title: "Reservas",
                tabBarIcon: ({ color }) => (
                  <MaterialIcons name="no-drinks" color={color} size={20} />
                ),
              }}
            />
            {/**
           <MaterialTopTabs.Screen
            name="perfil"
            options={{
              title: 'Perfil',
              tabBarIcon: ({color}) => (
                <MaterialIcons name="verified-user" color={color} size={20} />
              ),
            }}
          /> 

        */}
          </MaterialTopTabs>
        </LayoutWithTopBar>
      </QueryClientProvider>
    </>
  );
}
