import { View, Text } from "react-native";
import { Drawer } from "expo-router/drawer";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import { useSessionContext } from "../../../../hooks/useSessionContext";
import { Redirect } from "expo-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Colors from "@/constants/Colors";
import { useColorScheme } from "nativewind";

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
          : Colors.primario[300],
        drawerLabelStyle: {
          marginLeft: -25,
          fontFamily: "LatoRegular",
          fontSize: 15,
        },
        headerTintColor: Colors.primario[600],
        drawerContentStyle: {
          backgroundColor: isDark ? Colors.primario[800] : "white",
        },
      }}

      // drawerContent={(x) => <CustomDrawer {...x} />}
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

      {/* <Drawer.Screen
        name="perfil"

        options={{

          title: 'Perfil',
          headerStyle: { backgroundColor: "red" },
          drawerIcon: ({ color }) => (
            <Ionicons name='person-outline' size={20} color={color} />
          ),
        }}
      /> */}
      <Drawer.Screen
        name="settings"
        //@ts-ignore
        options={{
          title: "Ajustes",
          headerShown: true,
          /* headerStyle: {
            backgroundColor: isDark
              ? COLORS.dark.secondary
              : COLORS.light.background,

          }, */
          headerTintColor: "red",
          headerTitleStyle: {
            textTransform: "uppercase",
          },

          drawerIcon: ({ color }) => (
            <Ionicons name="settings-outline" size={20} color={color} />
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
