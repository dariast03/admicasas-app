import {
  View,
  Text,
  Button,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  StyleSheet,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { useLocalSearchParams } from "expo-router";
import { Controller, useForm } from "react-hook-form";
import { IIncident } from "@/types/Incidents/incidents";
import DefaultLayout from "@/layout/DefaultLayout";
import { TouchableOpacity } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { Image } from "expo-image";

import Icon, { IconType } from "@/components/Icon";
import * as ImagePicker from "expo-image-picker";
import * as DocumentPicker from "expo-document-picker";
import {
  InputCustom,
  InputDatePicker,
  InputText,
} from "@/components/CustomInput";
import Dropdown from "@/components/DropDown";
import { IHousing } from "@/types/housing/housing";
import { IDropdownRef } from "react-native-element-dropdown";
import { useIncidents } from "@/hooks/useIncident";

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

  const isCreate = id == "create";

  const { incidentCreateMutation } = useIncidents();
  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<IIncident>({
    mode: "onChange",
    defaultValues: {
      date: new Date(),
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
      console.log(result.assets[0].fileName);
      setImage({
        ...result.assets[0],
        fileName: result.assets[0].uri.substring(
          result.assets[0].uri.lastIndexOf("/") + 1,
          result.assets[0].uri.length
        ),
      });
    }
  };

  const pickDoc = async () => {
    // No permissions request is necessary for launching the image library
    /* await ImagePicker.getCameraPermissionsAsync(); */
    let result = await DocumentPicker.getDocumentAsync({
      copyToCacheDirectory: true,
      multiple: false,
      type: "image/*",
    });
    console.log(result.assets);
  };

  const onSubmit = async (data: any) => {
    console.log({
      data,
      file: {
        name: image?.fileName || "",
        uri: image?.uri || "",
      },
    });

    return;

    await incidentCreateMutation.mutateAsync({
      data,
      file: {
        name: image?.fileName || "",
        uri: image?.uri || "",
      },
    });
  };

  return (
    <>
      <DefaultLayout>
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
                    <Text className="text-2xl font-bold mb-2  ">
                      Registra un incidente
                    </Text>
                    <Text className="text-lg  text-center  ">
                      Por favor, completa el formulario para reportar un
                      incidente
                    </Text>
                  </View>

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
                                data={housings}
                                onChange={(e) => field.onChange(e.id)}
                                icon={{
                                  type: IconType.AntDesign,
                                  name: "home",
                                }}
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
                              value={field.value.toLocaleDateString()}
                              onChangeText={(e) => field.onChange(e)}
                              withAsterisk
                              icon={{
                                type: IconType.MaterialCommunityIcons,
                                name: "clock-outline",
                              }}
                              label="Fecha:"
                              placeholder="Enter your password"
                              error={error?.message}
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

                      {image && (
                        <View className="items-center justify-center p-4">
                          <Image
                            source={image}
                            style={{ width: 200, height: 200 }}
                            contentFit="cover"
                          />
                        </View>
                      )}
                    </View>

                    {/* <View>
                      <TouchableOpacity onPress={pickDoc}>
                        <View className="rounded-xl bg-primario-600 py-4">
                          <Text className="text-center text-xl text-white ">
                            Seleccionar Imagen
                          </Text>
                        </View>
                      </TouchableOpacity>

                      {image && (
                        <View className="items-center justify-center p-4">
                          <Image
                            source={image}
                            style={{ width: 200, height: 200 }}
                            contentFit="cover"
                          />
                        </View>
                      )}
                    </View> */}

                    <TouchableOpacity onPress={handleSubmit(onSubmit)}>
                      <View className="rounded-xl bg-primario-800 p-3">
                        <Text className="text-center text-xl text-white ">
                          REGISTRAR
                        </Text>
                      </View>
                    </TouchableOpacity>
                  </View>

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

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  inner: {
    padding: 24,
    flex: 1,
    justifyContent: "space-around",
  },
  header: {
    fontSize: 36,
    marginBottom: 48,
  },
  textInput: {
    height: 40,
    borderColor: "#000000",
    borderBottomWidth: 1,
    marginBottom: 36,
  },
  btnContainer: {
    backgroundColor: "white",
    marginTop: 12,
  },
});

export default FormIncident;
