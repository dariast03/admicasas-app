import Colors from "@/constants/Colors";
import { Stack } from "expo-router";

export default function UnprotectedLayout() {
  return (
    <>
      <Stack>
        <Stack.Screen
          name="areas/[id]"
          options={{
            headerShown: false,
          }}
        />

        <Stack.Screen
          name="annoucement/[id]"
          options={{
            headerShadowVisible: false,
            title: "Anuncios",
            headerStyle: {
              backgroundColor: Colors.primario[600],
            },
            headerTintColor: "white",
          }}
        />

        <Stack.Screen name="areas/index" options={{}} />

        <Stack.Screen name="profile/index" />

        <Stack.Screen name="notifications/index" />
        {/*   <Stack.Screen
        name="index"
        options={{
          headerShown: false
        }}
      /> */}
      </Stack>
    </>
  );
}
