import AlertCard from "@/components/AlertCard";
import {
  InputCustom,
  InputDatePicker,
  InputText,
} from "@/components/CustomInput";
import Dropdown from "@/components/DropDown";
import { IDropdownRef } from "react-native-element-dropdown";

import Icon, { IconType } from "@/components/Icon";
import Loader from "@/components/Loader";
import DefaultLayout from "@/layout/DefaultLayout";
import { IReservation } from "@/types/reserve/reserve";
import { format } from "date-fns";
import React, { useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import {
  View,
  Text,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  ScrollView,
  Keyboard,
  TouchableOpacity,
  Image,
} from "react-native";
import { useAreas } from "@/hooks/useAreas";
import { useSessionContext } from "@/hooks/useSessionContext";
import * as ImagePicker from "expo-image-picker";
import { Stack, router } from "expo-router";
import Colors from "@/constants/Colors";
import { ButtonLoader } from "@/components/ButtonLoader";
import { useReserve } from "@/hooks/useReservation";

const Reservation = () => {
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

  const ref = useRef<IDropdownRef>(null);

  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
    watch,
    getValues,
  } = useForm<IReservation>({
    mode: "onChange",
    defaultValues: {
      start: new Date(),
      end: new Date(),
    },
  });
  const { user } = useSessionContext();

  const { areaCommonsAllQuery } = useAreas({
    idcondominium: user.account.idcondominium,
    params: { idcondominium: user.account.idcondominium },
  });

  const { reservationCreateMutation } = useReserve({
    params: { idcondominium: user.account.idcondominium },
  });

  const [image, setImage] = useState<ImagePicker.ImagePickerAsset | null>(null);

  const pickImage = async () => {
    let result;

    const configImagePicker: ImagePicker.ImagePickerOptions = {
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      cameraType: ImagePicker.CameraType.back,
      quality: 1,
    };

    result = await ImagePicker.launchImageLibraryAsync(configImagePicker);

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

  const onSubmit = async (data: IReservation) => {
    delete data.area;
    delete data.reservedBy;

    // const file = uploadRef.current?.getFiles();

    // if (reservation?.id) {
    //   await reservationUpdateMutation.mutateAsync({
    //     data,
    //     file,
    //     requiredPayment: needPay,
    //   });

    // } else {
    //   await reservationCreateMutation.mutateAsync({
    //     data,
    //     file,
    //     requiredPayment: needPay,
    //   });

    //  }
    await reservationCreateMutation.mutateAsync({
      data,
      //file,
      requiredPayment: needPay,
    });
  };

  // const onSubmit = async (data: any) => {
  //   if (isEdit) {
  //     await incidentUpdateMutation.mutateAsync({
  //       data,
  //       file: {
  //         name: image?.fileName || "",
  //         uri: image?.uri || "",
  //       },
  //     });
  //   } else {
  //     await reservationCreateMutation.mutateAsync({
  //       data,
  //       file: {
  //         name: image?.fileName || "",
  //         uri: image?.uri || "",
  //       },
  //     });
  //   }

  //   router.push("/incidents/");
  // };
  const needPay = (watch("area")?.price || 0) > 0;
  return (
    <DefaultLayout>
      <Stack.Screen
        options={{
          headerShadowVisible: false,
          headerTitleAlign: "center",

          title: "Reservar Area",
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
                  <Text className="text-2xl font-bold mb-2  ">
                    Crear Reserva
                  </Text>
                  <Text className="text-sm  text-center  ">
                    Por favor, completa el formulario para crear una reserva
                  </Text>
                </View>

                <View className="mb-4">
                  <AlertCard
                    value={
                      "Tu solicitud se encuentra en revisión. Aun puedes editar la informacion proporcionada"
                    }
                    severity={"warning"}
                  />
                </View>

                <View className="gap-2">
                  <View>
                    <Controller
                      name="title"
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
                            placeholder="Descripcion de la reserva"
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
                      name="start"
                      control={control}
                      rules={{
                        required: "La fecha de inicio es requerida",
                      }}
                      render={({ field, fieldState: { error } }) => (
                        <>
                          <InputDatePicker
                            ref={field.ref}
                            value={format(field.value, "dd/MM/yyyy HH:mm a")}
                            onChangeText={(e) => field.onChange(e)}
                            withAsterisk
                            icon={{
                              type: IconType.MaterialCommunityIcons,
                              name: "clock-outline",
                            }}
                            label="Fecha Inicio:"
                            error={error?.message}
                          />
                        </>
                      )}
                    />
                  </View>
                  <View>
                    <Controller
                      name="end"
                      control={control}
                      rules={{
                        required: "La fecha de fin es requerida",
                      }}
                      render={({ field, fieldState: { error } }) => (
                        <>
                          <InputDatePicker
                            ref={field.ref}
                            value={format(field.value, "dd/MM/yyyy HH:mm a")}
                            onChangeText={(e) => field.onChange(e)}
                            withAsterisk
                            icon={{
                              type: IconType.MaterialCommunityIcons,
                              name: "clock-outline",
                            }}
                            label="Fecha Fin:"
                            error={error?.message}
                          />
                        </>
                      )}
                    />
                  </View>
                  <View>
                    <Controller
                      name="idarea"
                      control={control}
                      rules={{
                        required: "La area es requerida",
                      }}
                      render={({ field, fieldState: { error } }) => {
                        return (
                          <>
                            <Dropdown
                              withAsterisk
                              placeholder="Selecciona una area"
                              dropdownRef={ref}
                              label="Area Común"
                              valueField={"id"}
                              error={error?.message}
                              labelField={"name"}
                              value={field.value}
                              data={areaCommonsAllQuery.data || []}
                              onChange={(e) => field.onChange(e.id)}
                              icon={{
                                type: IconType.MaterialCommunityIcons,
                                name: "account-group-outline",
                              }}
                            />
                          </>
                        );
                      }}
                    />
                  </View>

                  <View className="w-full">
                    <InputCustom
                      icon={{
                        type: IconType.MaterialCommunityIcons,
                        name: "clock-outline",
                      }}
                      label="Cargar Comprobante:"
                      value={image ? "Comprobante Seleccionado" : ""}
                      placeholder="Selecciona una imagen"
                      editable={false}
                      rightContent={
                        <View className="flex-row">
                          <Icon
                            onPress={() => pickImage()}
                            icon={{
                              type: IconType.MaterialCommunityIcons,
                              name: "folder-multiple-image",
                            }}
                          />
                        </View>
                      }
                    />
                  </View>
                  <View className="mt-2">
                    <ButtonLoader
                      className="items-center"
                      onPress={handleSubmit(onSubmit)}
                      // disabled={paymentQuery.data?.state === "Pendiente"}

                      // style={{
                      //   opacity:
                      //     paymentQuery.data?.state === "Pendiente" ||
                      //     paymentQuery.data?.state === "Aprobado"
                      //       ? 0.5
                      //       : 1,
                      // }}
                      // loading={paymentCreateMutation.isPending}
                    >
                      <Text className="text-white text-center text-xl font-bold">
                        {/* {paymentCreateMutation.isPending ? "Guardando.." : "Pagar"} */}
                        Guardar
                      </Text>
                    </ButtonLoader>
                  </View>
                </View>
              </View>
            </View>
          </ScrollView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </DefaultLayout>
  );
};

export default Reservation;
