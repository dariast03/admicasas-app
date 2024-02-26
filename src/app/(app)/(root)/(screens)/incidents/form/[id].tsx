import {
  View,
  Text,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { Stack, router, useLocalSearchParams } from "expo-router";
import { Controller, useForm } from "react-hook-form";
import { IIncident } from "@/types/Incidents/incidents";
import DefaultLayout from "@/layout/DefaultLayout";
import { TouchableOpacity } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { Image } from "expo-image";

import Icon, { IconType } from "@/components/Icon";
import * as ImagePicker from "expo-image-picker";

import {
  InputCustom,
  InputDatePicker,
  InputText,
} from "@/components/CustomInput";
import Dropdown from "@/components/DropDown";
import { IHousing } from "@/types/housing/housing";
import { IDropdownRef } from "react-native-element-dropdown";
import { useIncidents } from "@/hooks/useIncident";
import { format } from "date-fns";
import Loader from "@/components/Loader";
import { useHousing } from "@/hooks/useHousing";
import { useSessionContext } from "@/hooks/useSessionContext";
import { useAppContext } from "@/hooks/useAppContext";
import AlertCard from "@/components/AlertCard";
import { statusColorIncident } from "@/data/statusColor";
import Colors from "@/constants/Colors";

const shadow = {
  shadowColor: "#000",
  shadowOffset: {
    width: 0,
    height: 7,
  },
  shadowOpacity: 0.41,
  shadowRadius: 9.11,

  elevation: 14,
};

const housings: Partial<IHousing>[] = [
  {
    id: "1231",
    code: "Casas 1",
  },
  {
    id: "12faw31",
    code: "Casa 2",
  },
];

const FormIncident = () => {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { user } = useSessionContext();
  const { selectedHousing } = useAppContext();

  const isEdit = id !== "create";
  const newId = isEdit ? id : "";

  const { incidentCreateMutation, incidentQuery, incidentUpdateMutation } =
    useIncidents({
      id: newId,
    });

  const { housingsByPropietaryQuery } = useHousing({
    params: {
      idproprietary: user.id,
    },
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
    watch,
    getValues,
  } = useForm<IIncident>({
    mode: "onChange",
    defaultValues: {
      date: new Date(),
      state: "Pendiente",
      idhousing: selectedHousing || "",
    },
  });

  const ref = useRef<IDropdownRef>(null);

  const [image, setImage] = useState<ImagePicker.ImagePickerAsset | null>(null);

  const pickImage = async (action: "library" | "camera") => {
    let result;

    const configImagePicker: ImagePicker.ImagePickerOptions = {
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      cameraType: ImagePicker.CameraType.back,
      quality: 1,
    };

    if (action === "camera") {
      result = await ImagePicker.launchCameraAsync(configImagePicker);
    } else {
      result = await ImagePicker.launchImageLibraryAsync(configImagePicker);
    }

    if (!result.canceled) {
      setImage({
        ...result.assets[0],
        fileName: result.assets[0].uri.substring(
          result.assets[0].uri.lastIndexOf("/") + 1,
          result.assets[0].uri.length
        ),
      });
    }
  };

  const onSubmit = async (data: any) => {
    if (isEdit) {
      await incidentUpdateMutation.mutateAsync({
        data,
        file: {
          name: image?.fileName || "",
          uri: image?.uri || "",
        },
      });
    } else {
      await incidentCreateMutation.mutateAsync({
        data,
        file: {
          name: image?.fileName || "",
          uri: image?.uri || "",
        },
      });
    }

    router.push("/incidents/");
  };

  const isStatusDifferentPending =
    isEdit && incidentQuery.data && incidentQuery.data.state !== "Pendiente";

  useEffect(() => {
    if (incidentQuery.data) {
      setValue("date", incidentQuery.data.date);
      reset(incidentQuery.data);
    }
  }, [incidentQuery.data]);

  useEffect(() => {
    const idHousing = getValues("idhousing");
    if (idHousing) {
      const housing = housingsByPropietaryQuery.data?.find(
        (x) => x.id == idHousing
      );
      if (housing) {
        setValue("idcondominium", housing.idcondominium);
      }
    }
  }, [watch("idhousing")]);

  return (
    <>
      <DefaultLayout>
        <Stack.Screen
          options={{
            headerShadowVisible: false,
            headerTitleAlign: "center",

            title: "Nuevo Incidente",
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
        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior={undefined}
          keyboardVerticalOffset={50}
        >
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <ScrollView>
              <View className="flex-1  p-4">
                <View
                  className="bg-white dark:bg-primario-800 p-4 rounded-lg mb-4"
                  style={shadow}
                >
                  <View className="items-center mb-4">
                    <Text className="text-2xl font-bold mb-2 text-primario-600">
                      Registro de Incidente
                    </Text>
                    <Text className="text-md  text-center text-primario-600 ">
                      Por favor, completa el formulario para reportar un
                      incidente.
                    </Text>
                  </View>

                  <View className="mb-4">
                    {incidentQuery.data &&
                      incidentQuery.data.state === "Pendiente" && (
                        <AlertCard
                          value={
                            "Tu solicitud se encuentra en revisión. Aun puedes editar la informacion proporcionada"
                          }
                          severity={"warning"}
                        />
                      )}

                    {incidentQuery.data &&
                      incidentQuery.data.state !== "Pendiente" && (
                        <AlertCard
                          value={incidentQuery.data.message}
                          severity={
                            statusColorIncident[incidentQuery.data.state]
                          }
                        />
                      )}
                  </View>

                  {!incidentQuery.isLoading ? (
                    <View className="gap-2">
                      <View>
                        <Controller
                          name="description"
                          control={control}
                          rules={{
                            required: "La descripcion es requerida",
                          }}
                          render={({ field, fieldState: { error } }) => (
                            <>
                              <InputText
                                ref={field.ref}
                                value={field.value}
                                onChangeText={(e) => field.onChange(e)}
                                withAsterisk
                                label="Descripcion"
                                placeholder="Descripcion del incidente"
                                error={error?.message}
                                multiline
                                numberOfLines={5}
                                disabled={isStatusDifferentPending}
                                editable={!isStatusDifferentPending}
                              />
                            </>
                          )}
                        />
                      </View>

                      <View>
                        <Controller
                          name="idhousing"
                          control={control}
                          rules={{
                            required: "La vivienda es requerida",
                          }}
                          render={({ field, fieldState: { error } }) => {
                            return (
                              <>
                                <Dropdown
                                  withAsterisk
                                  placeholder="Selecciona una vivienda"
                                  dropdownRef={ref}
                                  label="Vivienda"
                                  valueField={"id"}
                                  error={error?.message}
                                  labelField={"code"}
                                  value={field.value}
                                  data={housingsByPropietaryQuery.data || []}
                                  onChange={(e) => field.onChange(e.id)}
                                  icon={{
                                    type: IconType.AntDesign,
                                    name: "home",
                                  }}
                                  disabled={
                                    isStatusDifferentPending ||
                                    housingsByPropietaryQuery.isLoading
                                  }
                                  disable={
                                    isStatusDifferentPending ||
                                    housingsByPropietaryQuery.isLoading
                                  }
                                />
                              </>
                            );
                          }}
                        />
                      </View>

                      <View>
                        <Controller
                          name="date"
                          control={control}
                          rules={{
                            required: "La vivienda es requerida",
                          }}
                          render={({ field, fieldState: { error } }) => (
                            <>
                              <InputDatePicker
                                ref={field.ref}
                                value={format(
                                  field.value,
                                  "dd/MM/yyyy HH:mm a"
                                )}
                                onChangeText={(e) => field.onChange(e)}
                                withAsterisk
                                icon={{
                                  type: IconType.MaterialCommunityIcons,
                                  name: "clock-outline",
                                }}
                                label="Fecha:"
                                placeholder="Enter your password"
                                error={error?.message}
                                disabled={isStatusDifferentPending}
                                editable={!isStatusDifferentPending}
                              />
                            </>
                          )}
                        />
                      </View>

                      <View>
                        <InputCustom
                          icon={{
                            type: IconType.MaterialCommunityIcons,
                            name: "clock-outline",
                          }}
                          label="Imagen:"
                          value={image ? "Imagen Seleccionada" : ""}
                          placeholder="Selecciona una imagen"
                          editable={false}
                          error={errors.urlimg?.message}
                          disabled={isStatusDifferentPending}
                          rightContent={
                            <View className="flex-row">
                              <Icon
                                onPress={() => pickImage("library")}
                                icon={{
                                  type: IconType.MaterialCommunityIcons,
                                  name: "folder-multiple-image",
                                }}
                              />

                              <Icon
                                onPress={() => pickImage("camera")}
                                icon={{
                                  type: IconType.MaterialCommunityIcons,
                                  name: "camera",
                                }}
                              />
                            </View>
                          }
                        />

                        {image ? (
                          <View className="items-center justify-center p-4">
                            <Image
                              source={image}
                              style={{ width: 200, height: 200 }}
                              contentFit="cover"
                            />
                          </View>
                        ) : (
                          <>
                            {incidentQuery.data?.urlimg && (
                              <View className="items-center justify-center p-4">
                                <Image
                                  source={incidentQuery.data?.urlimg}
                                  style={{ width: 200, height: 200 }}
                                  contentFit="cover"
                                />
                              </View>
                            )}
                          </>
                        )}
                      </View>

                      {((isEdit && incidentQuery.data?.state === "Pendiente") ||
                        !isEdit) && (
                        <TouchableOpacity
                          onPress={handleSubmit(onSubmit)}
                          disabled={
                            incidentCreateMutation.isPending ||
                            incidentUpdateMutation.isPending
                          }
                          style={{
                            opacity:
                              incidentCreateMutation.isPending ||
                              incidentUpdateMutation.isPending
                                ? 0.8
                                : 1,
                          }}
                        >
                          <View className="rounded-xl bg-primario-800 p-3">
                            <Text className="text-center text-xl text-white ">
                              {isEdit ? "ACTUALIZAR" : "REGISTRAR"}
                            </Text>
                          </View>
                        </TouchableOpacity>
                      )}
                    </View>
                  ) : (
                    <Loader height={420} />
                  )}

                  {/*  <Button
                    title="Pick an image from camera roll"
                    onPress={pickImage}
                  />
                  {image && (
                    <Image source={image} style={{ width: 200, height: 200 }} />
                  )} */}
                </View>
              </View>
            </ScrollView>
          </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
      </DefaultLayout>
    </>
  );
};

export default FormIncident;
