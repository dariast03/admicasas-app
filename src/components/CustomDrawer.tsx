import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import {
  DrawerContentScrollView,
  DrawerContentComponentProps,
  DrawerItemList,
} from "@react-navigation/drawer";
import DefaultLayout from "@/layout/DefaultLayout";
import Icon, { IconType } from "@/components/Icon";
import useAuth from "@/hooks/useAuth";

const CustomDrawer: React.FC<DrawerContentComponentProps> = (props) => {
  const { onLogout } = useAuth();

  return (
    <DefaultLayout>
      <DrawerContentScrollView>
        <DrawerItemList {...props}></DrawerItemList>
      </DrawerContentScrollView>
      <View className="p-4 border-t  border-t-white">
        <TouchableOpacity activeOpacity={0.6} onPress={onLogout}>
          <View className="flex-row justify-center items-center mb-2 ">
            <Icon
              icon={{
                type: IconType.Ionicon,
                name: "exit-outline",
              }}
            />
            <Text className="text-stone-400 dark:text-white my-2">
              Cerrar Sesion
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </DefaultLayout>
  );
};

export default CustomDrawer;
