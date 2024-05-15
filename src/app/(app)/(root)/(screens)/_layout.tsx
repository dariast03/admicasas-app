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
      <Stack screenOptions={config}>
        <Stack.Screen
          name="annoucement/[id]"
          options={{
            ...config,
            title: "Detalle Anuncio".toUpperCase(),
          }}
        />
        <Stack.Screen
          name="payment/[id]"
          options={{
            ...config,
            title: "Detalle Pago".toUpperCase(),
          }}
        />
        <Stack.Screen
          name="tutorialpayment/[id]"
          options={{
            ...config,
            title: "Detalle Pago".toUpperCase(),
          }}
        />

        <Stack.Screen
          name="meeting/[id]"
          options={{
            ...config,
            title: "Detalle Reunion".toUpperCase(),
          }}
        />

        <Stack.Screen
          name="meeting/index"
          options={{
            ...config,
            title: "Reuniones".toUpperCase(),
          }}
        />

        <Stack.Screen
          name="notifications/index"
          options={{
            ...config,
            title: "Notificaciones".toUpperCase(),
          }}
        />
        <Stack.Screen
          name="incidents/index"
          options={{
            ...config,
            title: "Incidentes".toUpperCase(),
          }}
        />
        <Stack.Screen
          name="visits/index"
          options={{
            ...config,
            title: "Libro de Visitas".toUpperCase(),
          }}
        />

        <Stack.Screen name="areas/index" options={{}} />

        <Stack.Screen name="profile/index" />
      </Stack>
    </>
  );
}
