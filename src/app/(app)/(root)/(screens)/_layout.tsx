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
