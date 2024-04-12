import { View, Text } from "react-native";
import { Drawer } from "expo-router/drawer";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import { useSessionContext } from "../../../../hooks/useSessionContext";
import { Redirect } from "expo-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Colors from "@/constants/Colors";
import { useColorScheme } from "nativewind";
import CustomDrawer from "@/components/CustomDrawer";

const LayoutDrawer = () => {
  const isDark = useColorScheme().colorScheme === "dark";
  return (
    <Drawer
      screenOptions={{
        swipeEnabled: false,
        drawerType: "slide",
        drawerActiveTintColor: isDark ? "white" : Colors.primario[600],
        drawerInactiveTintColor: isDark
          ? Colors.primario[100]
          : Colors.primario[600],
        drawerLabelStyle: {
          marginLeft: -25,
          fontFamily: "LatoRegular",
          fontSize: 15,
        },
        headerStyle: {
          backgroundColor: isDark ? Colors.primario[800] : "white",
        },
        headerTintColor: isDark ? "white" : Colors.primario[600],
        drawerContentStyle: {
          backgroundColor: isDark ? Colors.primario[800] : "white",
        },
      }}
      drawerContent={(x) => <CustomDrawer {...x} />}
    >
      <Drawer.Screen
        name="(tabs)"
        options={{
          title: "Inicio",
          headerShown: false,
          drawerIcon: ({ color }) => (
            <Ionicons name="home-outline" size={20} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="settings"
        options={{
          title: "Ajustes",
          headerShown: true,
          headerTitleStyle: {
            textTransform: "uppercase",
          },

          drawerIcon: ({ color }) => (
            <Ionicons name="settings-outline" size={20} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="question"
        options={{
          title: "Preguntas Frecuentes",
          headerShown: true,
          headerTitleStyle: {
            textTransform: "uppercase",
          },

          drawerIcon: ({ color }) => (
            <Ionicons name="help-circle-outline" size={22} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="about"
        options={{
          title: "Acerca de",
          headerShown: true,
          headerTitleStyle: {
            textTransform: "uppercase",
          },

          drawerIcon: ({ color }) => (
            <Ionicons
              name="information-circle-outline"
              size={22}
              color={color}
            />
          ),
        }}
      />

      {/* <Drawer.Screen
        name="testing"
        //@ts-ignore
        options={{
         // ...configStack("Testing"),
          drawerItemStyle: {
            display: "none"
          },
          drawerIcon: ({ color }) => (
            <Ionicons name='shield' size={20} color={color} />
          )
        }}
      />
 */}
    </Drawer>
  );
};

export default LayoutDrawer;
