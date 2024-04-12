import { View, Text } from "react-native";
import React, { useState } from "react";
import DefaultLayout from "@/layout/DefaultLayout";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { TouchableOpacity } from "react-native";
import Icon, { IconType } from "@/components/Icon";
import { useAppContext } from "@/hooks/useAppContext";
import useAuth from "@/hooks/useAuth";

const Settings = () => {
  const [checkedAnnoucement, setCheckedAnnoucemet] = useState(false);
  const [checkedPayment, setCheckedPayment] = useState(false);
  const { updateTutorialPayment, tutorialPayment } = useAppContext();

  const updateTutorial = () => {
    checkedPayment
      ? updateTutorialPayment("true")
      : updateTutorialPayment("false");
  };

  return (
    <DefaultLayout>
      <View className="flex-1 items-center mt-4">
        <Card className="w-full max-w-sm bg-white dark:bg-primario-800 border border-primario-600">
          <CardHeader>
            <CardTitle>Configuración</CardTitle>
            <CardDescription>Seleccione las opciones que desea</CardDescription>
          </CardHeader>
          <CardContent className="gap-4">
            <View className="flex-row items-center gap-2">
              <Switch
                checked={checkedAnnoucement}
                onCheckedChange={setCheckedAnnoucemet}
                nativeID="notification-mode"
                onPress={updateTutorial}
              />
              <Label
                nativeID="notification-mode"
                onPress={() => {
                  setCheckedAnnoucemet((prev) => !prev);
                }}
              >
                {checkedAnnoucement
                  ? "Desactivar Notificaciones"
                  : "Activar Notificaciones"}
              </Label>
            </View>
            <View className="flex-row items-center gap-2">
              <Switch
                checked={checkedPayment}
                onCheckedChange={setCheckedPayment}
                nativeID="tutorial-mode"
              />
              <Label
                nativeID="tutorial-mode"
                onPress={() => {
                  setCheckedPayment((prev) => !prev);
                }}
              >
                {checkedPayment
                  ? "Desactivar Tutoriales"
                  : "Activar Tutoriales"}
              </Label>
            </View>
            <View className="flex-row items-center gap-2">
              <TouchableOpacity activeOpacity={0.6}>
                <View className="flex-row justify-center items-center bg-primario-600 p-2 px-4 rounded-lg">
                  <Icon
                    icon={{
                      type: IconType.FontAweomseIcon,
                      name: "trash",
                    }}
                  />
                  <Text className="text-stone-400 dark:text-white my-2">
                    Borrar Datos
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          </CardContent>
        </Card>
      </View>
    </DefaultLayout>
  );
};

export default Settings;
