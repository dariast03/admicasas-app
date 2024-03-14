import { StatusBar } from "expo-status-bar";
import { MaterialIcons } from "@expo/vector-icons";
import { Animated } from "react-native";
import { MaterialTopTabs } from "../../../../../navigator/top-tabs";
import LayoutWithTopBar from "../../../../../layout/LayoutWithTopBar";
import Colors from "@/constants/Colors";
import { Platform } from "react-native";
import { useColorScheme } from "nativewind";

const av = new Animated.Value(0);
av.addListener(() => {
  return;
});

export default function Layout() {
  const isDark = useColorScheme().colorScheme === "dark";
  return (
    <>
      <StatusBar
        backgroundColor={isDark ? Colors.primario[800] : Colors.primario[600]}
        style={Platform.select({
          ios: "dark",
          android: "light",
        })}
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
            lazy: true,
            //tabBarItemStyle: { padding: 6 },

            tabBarStyle: {
              backgroundColor: isDark ? Colors.primario[800] : "white",
            },
            tabBarLabelStyle: { margin: 0, padding: 0, fontSize: 12 },
            //tabBarActiveTintColor: Colors.primario[700],
            tabBarActiveTintColor: isDark ? "#FFF" : Colors.primario[800],

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
              title: "Cargos",
              tabBarIcon: ({ color }) => (
                <MaterialIcons name="payments" color={color} size={20} />
              ),
            }}
          />

          <MaterialTopTabs.Screen
            name="reservations"
            options={{
              title: "Reservas",
              tabBarIcon: ({ color }) => (
                <MaterialIcons name="calendar-today" color={color} size={20} />
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
    </>
  );
}
