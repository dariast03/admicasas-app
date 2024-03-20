import React from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { Avatar } from "react-native-elements";
import useAuth from "@/hooks/useAuth";
import { Stack, router } from "expo-router";
import Colors from "@/constants/Colors";
import Icon, { IconType } from "@/components/Icon";

import { useCondominiums } from "@/hooks/useCondominiums";
import { useHousing } from "@/hooks/useHousing";
import { IHousing } from "@/types/housing/housing";
import { ButtonLoader } from "@/components/ButtonLoader";
import DefaultLayout from "@/layout/DefaultLayout";
import { Skeleton } from "@/components/ui/skeleton";
import { useColorScheme } from "nativewind";

const Profile = () => {
  const { onLogout, user } = useAuth();
  const { condominiumQuery } = useCondominiums({
    id: user.account.idcondominium,
  });
  const { housingsQuery } = useHousing({
    params: {
      idcondominium: user.account.idcondominium,
      idproprietary: user.id,
    },
  });

  const isDark = useColorScheme().colorScheme === "dark";

  const renderItem = ({ item }: { item: IHousing }) => (
    <View className="flex-row p-2 items-center ">
      <Icon
        color={isDark ? "#fff" : Colors.primario[600]}
        icon={{
          type: IconType.MaterialCommunityIcons,
          name: "warehouse",
        }}
      />
      <Text className="dark:text-white">{item.code}</Text>
    </View>
  );
  return (
    <DefaultLayout>
      <View className="flex-1">
        <Stack.Screen
          options={{
            headerShown: false,
          }}
        />

        <View className="flex-row bg-primario-600 w-full mt-6">
          <TouchableOpacity onPress={() => router.back()} activeOpacity={0.6}>
            <View className="h-10 w-10 justify-center items-center rounded-full mt-2 ml-2">
              <Icon
                color={"#fff"}
                icon={{
                  type: IconType.Ionicon,
                  name: "arrow-back",
                }}
              />
            </View>
          </TouchableOpacity>
          <View className="flex-row items-center h-full  py-7">
            <Avatar
              rounded
              size="large"
              source={{
                uri: "https://th.bing.com/th/id/OIP.l0brqMrdiKjD2t5Ab4ZkCAHaHa?rs=1&pid=ImgDetMain",
              }}
            />
            <View className="p-2 gap-2">
              <Text className="text-xl  text-white">{user.account.name}</Text>
              <Text className="text-white">{user.email}</Text>
            </View>
          </View>
        </View>
        <View>
          <View className="px-6 pt-4">
            <View className="flex-row p-2">
              <Icon
                color={isDark ? "#fff" : Colors.primario[600]}
                icon={{
                  type: IconType.FontAweomseIcon,
                  name: "building-o",
                }}
              />
              {condominiumQuery.isLoading ? (
                <Skeleton className="h-4 w-full bg-white dark:bg-primario-600" />
              ) : (
                <Text className="dark:text-white">
                  {condominiumQuery.data?.name}
                </Text>
              )}
            </View>
            <View className="w-full border-b-2 border-b-primario-300"></View>
          </View>
          <View className="p-4 px-6">
            {housingsQuery.isLoading ? (
              <View className="flex-row gap-2">
                <Icon
                  color={isDark ? "#fff" : Colors.primario[600]}
                  icon={{
                    type: IconType.MaterialCommunityIcons,
                    name: "warehouse",
                  }}
                />
                <Skeleton className="h-4 w-full bg-white dark:bg-primario-600" />
              </View>
            ) : (
              <FlatList
                data={housingsQuery.data}
                renderItem={renderItem}
                keyExtractor={(item) => item.id || ""}
              />
            )}

            <View className="w-full border-b-2 border-b-primario-300"></View>
          </View>
        </View>
        <View className="flex-1 flex-row justify-end items-end p-4">
          <ButtonLoader onPress={onLogout}>
            <Text className="text-white p-2">Cerrar Sesión</Text>
          </ButtonLoader>
        </View>
      </View>
    </DefaultLayout>
  );
};

export default Profile;
