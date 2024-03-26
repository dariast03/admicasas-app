import Colors from "@/constants/Colors";

import { Stack, router } from "expo-router";

import Icon, { IconType } from "@/components/Icon";
import { useColorScheme } from "nativewind";

export default function UnprotectedLayout() {
  const isDark = useColorScheme().colorScheme === "dark";
  const colorHeader = isDark ? Colors.primario[800] : Colors.primario[600];
  const config: any = {
    headerShadowVisible: false,
    headerTitleAlign: "center",
    headerStyle: {
      backgroundColor: colorHeader,
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
  };

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
              backgroundColor: colorHeader,
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
              backgroundColor: colorHeader,
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
          name="tutorialpayment/[id]"
          options={{
            headerShadowVisible: false,
            headerTitleAlign: "center",
            title: "Detalle Pago",
            headerStyle: {
              backgroundColor: colorHeader,
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
              backgroundColor: colorHeader,
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
          name="meeting/index"
          options={{
            headerShadowVisible: false,
            headerTitleAlign: "center",
            title: "Reuniones",
            headerStyle: {
              backgroundColor: colorHeader,
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
          name="notifications/index"
          options={{
            ...config,
            title: "Notificaciones",
          }}
        />

        <Stack.Screen name="areas/index" options={{}} />

        <Stack.Screen name="profile/index" />

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
