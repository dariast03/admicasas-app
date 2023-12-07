import { View, Text } from "react-native";
import { Drawer } from "expo-router/drawer";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import { useSessionContext } from "../../../../hooks/useSessionContext";
import { Redirect } from "expo-router";

const LayoutDrawer = () => {
  return (
    <Drawer
      screenOptions={{
        swipeEnabled: false,
        drawerType: "slide",
        drawerActiveTintColor: "#000",
        drawerInactiveTintColor: "#9e9d9d",
        drawerLabelStyle: {
          marginLeft: -25,
          fontFamily: "LatoRegular",
          fontSize: 15,
        },
        headerTintColor: "red",
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
