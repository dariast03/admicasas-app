import Colors from "@/constants/Colors";

import { Stack, router } from "expo-router";
import Icon, { IconType } from "@/components/Icon";

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
            headerTitleAlign: "center",

            title: "Detalle",
            headerStyle: {
              backgroundColor: Colors.primario[600],
            },
            headerTintColor: "white",
            headerLeft: () => (
              <Icon
                color={"white"}
                icon={{
                  type: IconType.Ionicon,
                  name: "chevron-back-outline",
                }}
                onPress={() => router.back()}
              />
            ),
          }}
        />
        <Stack.Screen
          name="payment/[id]"
          options={{
            headerShadowVisible: false,
            headerTitleAlign: "center",
            title: "Detalle",
            headerStyle: {
              backgroundColor: Colors.primario[600],
            },
            headerTintColor: "white",
            headerLeft: () => (
              <Icon
                color={"white"}
                icon={{
                  type: IconType.Ionicon,
                  name: "chevron-back-outline",
                }}
                onPress={() => router.back()}
              />
            ),
          }}
        />
        <Stack.Screen
          name="meeting/[id]"
          options={{
            headerShadowVisible: false,
            headerTitleAlign: "center",
            title: "Detalle",
            headerStyle: {
              backgroundColor: Colors.primario[600],
            },
            headerTintColor: "white",
            headerLeft: () => (
              <Icon
                color={"white"}
                icon={{
                  type: IconType.Ionicon,
                  name: "chevron-back-outline",
                }}
                onPress={() => router.back()}
              />
            ),
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
