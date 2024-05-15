import AlertCard from "@/components/AlertCard";
import {
  InputCustom,
  InputDatePicker,
  InputText,
} from "@/components/CustomInput";
import Dropdown from "@/components/DropDown";
import { IDropdownRef } from "react-native-element-dropdown";
import Animated, { FadeIn } from "react-native-reanimated";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import Icon, { IconType } from "@/components/Icon";
import DefaultLayout from "@/layout/DefaultLayout";
import { IReservation } from "@/types/reserve/reserve";
import { addHours, addMinutes, compareAsc, format, isSameDay } from "date-fns";
import React, { useEffect, useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import {
  View,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  ScrollView,
  Keyboard,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { useAreas } from "@/hooks/useAreas";
import { useSessionContext } from "@/hooks/useSessionContext";
import * as ImagePicker from "expo-image-picker";
import { Stack, router, useLocalSearchParams } from "expo-router";
import Colors from "@/constants/Colors";
import { ButtonLoader } from "@/components/ButtonLoader";
import { useReserve } from "@/hooks/useReservation";
import { detailDate } from "@/helpers/detailDate";
import { useAppContext } from "@/hooks/useAppContext";
import Tag from "@/components/Tag";
import { statusColorReservation } from "@/data/statusColor";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import { useCharges } from "@/hooks/useCharges";
import { useColorScheme } from "nativewind";

const FormReservation = () => {
  const { id } = useLocalSearchParams<{ id: string }>();

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
  const [minDates, setMinDates] = useState({
    start: addMinutes(new Date(), 5),
    end: addMinutes(new Date(), 5),
  });
  const { selectedHousing } = useAppContext();
  const { user } = useSessionContext();

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
      state: "Pendiente",
      idhousing: selectedHousing || "",
      idcondominium: user.account.idcondominium,
      type: "app",
      start: new Date(),
      end: new Date(),
    },
  });

  const [priceSelect, setPriceSelect] = useState<number | null>(null);

  const { areaCommonsAllQuery } = useAreas({
    idcondominium: user.account.idcondominium,
    params: { idcondominium: user.account.idcondominium },
  });

  const isEdit = id !== "create";

  const [newId, setNewId] = useState(isEdit ? id : "");

  const {
    reservationCreateMutation,
    reservationUpdateMutation,
    reservationQuery,
    reservationDeleteMutation,
  } = useReserve({ id: newId });

  const { chargeQueryByReservation } = useCharges({
    params: {
      idhousing: selectedHousing,
      idreservation: reservationQuery.data?.id,
      state: reservationQuery.data?.state,
    },
  });

  const onSubmit = async (data: IReservation) => {
    delete data.area;
    delete data.reservedBy;

    data.idusuario = user.id || "";
    data.idcondominium = user.account.idcondominium;
    // const file = uploadRef.current?.getFiles();

    if (isEdit) {
      await reservationUpdateMutation.mutateAsync({
        data,
        //requiredPayment:needPay
      });
    } else {
      await reservationCreateMutation.mutateAsync({
        data,
        requiredPayment: needPay,
      });
    }
    // await reservationCreateMutation.mutateAsync({
    //   data,
    //   //file,
    //   requiredPayment: needPay,
    // });
    router.back();
  };

  const onDelete = async (id: string) => {
    setNewId("");

    await reservationDeleteMutation.mutateAsync(id);
    router.push("/reservations/");
  };

  const isAllowedEdit = reservationQuery.data?.state === "Pendiente" || !isEdit;

  const PushPayment = () => {
    const routeView: any = "/payment/" + chargeQueryByReservation.data?.id;
    return routeView;
  };

  useEffect(() => {
    if (reservationQuery.data) {
      //setValue("date", reservationsQuery.data.date);
      reset(reservationQuery.data);
    }
  }, [reservationQuery.data]);

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

  useEffect(() => {
    setValue("fullDay", !isSameDay(getValues("start"), getValues("end")));
  }, [watch("start"), watch("end")]);

  useEffect(() => {
    setValue("startDetail", detailDate(getValues("start")));

    if (compareAsc(getValues("start"), getValues("end")) == 1) {
      // * FECHA DE INICIO MAYOR A FECHA DE FIN
      setValue("end", addHours(getValues("start"), 4));
    }

    setMinDates({ ...minDates, end: getValues("start") });
  }, [watch("start")]);

  useEffect(() => {
    setValue("endDetail", detailDate(getValues("end")));
  }, [watch("end")]);

  // useEffect(() => {
  //   if (getValues("state")) {
  //     setValue("color", statusColorIcon[getValues("state")].color);
  //   }
  // }, [watch("state")]);

  const [open, setOpen] = React.useState(false);
  const [openSub, setOpenSub] = React.useState(false);
  const isDark = useColorScheme().colorScheme === "dark";
  const needPay = (watch("area")?.price || 0) > 0;
  return (
    <DefaultLayout>
      <Stack.Screen
        options={{
          headerShadowVisible: false,
          headerTitleAlign: "center",

          title: "Reservar Area",
          headerStyle: {
            backgroundColor: isDark
              ? Colors.primario[800]
              : Colors.primario[600],
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

      <ScrollView>
        <View className="flex-1  p-4">
          <View
            className="bg-white dark:bg-primario-800 p-4 rounded-lg mb-4"
            style={shadow}
          >
            <View>
              <View className="flex-row justify-between items-center">
                <View className="flex-1 ">
                  <Text className="text-xl text-primario-600 dark:text-white font-semibold mb-2 text-center">
                    Crear Reserva
                  </Text>
                </View>

                <View className="self-end">
                  <DropdownMenu
                    open={open}
                    onOpenChange={(newVal) => {
                      if (!newVal) {
                        setOpenSub(false);
                      }
                      setOpen(newVal);
                    }}
                  >
                    <DropdownMenuTrigger asChild>
                      <Button
                        size={"sm"}
                        disabled={!isAllowedEdit}
                        className="border-none dark:bg-primario-800 shadow-none"
                        variant={"link"}
                      >
                        <Icon
                          icon={{
                            type: IconType.Entypo,
                            name: "dots-three-vertical",
                          }}
                        />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                      insets={{
                        right: 20,
                      }}
                      className="w-52 native:w-52 bg-white dark:bg-primario-600 "
                    >
                      <DropdownMenuLabel>
                        {isAllowedEdit && (
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Text className="text-primario-600 dark:text-white font-semibold">
                                Eliminar
                              </Text>
                            </AlertDialogTrigger>

                            <AlertDialogContent className="bg-white">
                              <AlertDialogHeader>
                                <AlertDialogTitle>Alertas</AlertDialogTitle>
                                <AlertDialogDescription>
                                  Esta accion no puede ser revertidad. Estas
                                  seguro de eliminarlo?
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>
                                  <Text>Cancelar</Text>
                                </AlertDialogCancel>
                                <AlertDialogAction onPress={() => onDelete(id)}>
                                  <Text>Continuar</Text>
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        )}
                      </DropdownMenuLabel>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </View>
              </View>

              <Text className="text-sm text-primario-600 dark:text-white  text-center my-2">
                Por favor, completa el formulario para crear una reserva
              </Text>
            </View>
            {reservationQuery.data && (
              <View className="my-2">
                {(() => {
                  switch (reservationQuery.data.state) {
                    case "Pendiente":
                      return (
                        <AlertCard
                          value={
                            "Tu solicitud se encuentra en revisión. Aun puedes editar la información proporcionada"
                          }
                          severity={"warning"}
                        />
                      );
                    case "PorPagar":
                      return (
                        <AlertCard
                          value={
                            "Tu solicitud está pendiente de pago. Por favor, completa el pago."
                          }
                          severity={"primary"}
                        />
                      );
                    case "Rechazado":
                      return (
                        <AlertCard
                          value={reservationQuery.data.message}
                          severity={"error"}
                        />
                      );
                    case "Aprobado":
                      return (
                        <AlertCard
                          value={"¡Tu reserva ha sido aprobada con éxito!"}
                          severity={"success"}
                        />
                      );
                    default:
                      return null; // Manejar otros casos si es necesario
                  }
                })()}
              </View>
            )}

            {/* {reservationQuery.data &&
              reservationQuery.data.state !== "Pendiente" &&
              reservationQuery.data.state !== "Finalizado" && (
                <View className="my-2">
                  <AlertCard
                    value={reservationQuery.data.message}
                    severity={
                      statusColorReservation[reservationQuery.data.state]
                    }
                  />
                </View>
              )} */}

            <View className="gap-2">
              {/* <View>
                <Controller
                  name="title"
                  control={control}
                  render={({ field, fieldState: { error } }) => (
                    <>
                      <InputText
                        ref={field.ref}
                        value={field.value}
                        onChangeText={(e) => field.onChange(e)}
                        label="Descripcion"
                        placeholder="Descripcion de la reserva"
                        error={error?.message}
                        multiline
                        numberOfLines={3}
                        disabled={!isAllowedEdit}
                      />
                    </>
                  )}
                />
              </View> */}

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
                        disabled={!isAllowedEdit}
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
                        disabled={!isAllowedEdit}
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
                          onChange={(e) => {
                            field.onChange(e.id);
                            const selectedArea = areaCommonsAllQuery.data?.find(
                              (area) => area.id === e.id
                            );
                            if (selectedArea) {
                              setValue(
                                "area.price",
                                selectedArea.price.toString()
                              );
                            }
                          }}
                          icon={{
                            type: IconType.MaterialCommunityIcons,
                            name: "account-group-outline",
                          }}
                          disabled={!isAllowedEdit}
                        />
                      </>
                    );
                  }}
                />
              </View>
              <View>
                {watch("area.price") > 0 ? (
                  <Controller
                    name="area.price"
                    control={control}
                    render={({ field, fieldState: { error } }) => (
                      <>
                        <InputText
                          ref={field.ref}
                          value={field.value}
                          onChangeText={(e) => field.onChange(e)}
                          withAsterisk
                          label="Precio"
                          placeholder="precio"
                          error={error?.message}
                          disabled={true}
                        />
                      </>
                    )}
                  />
                ) : null}
              </View>
              {/* <View className="w-full">
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
                  </View> */}
              {/* <View className="mt-2">
                {reservationQuery.data?.state === "PorPagar" && (
                  <ButtonLoader
                    className="items-center"
                    onPress={() => router.push(PushPayment())}
                  >
                    <Text className="text-white text-center text-xl font-bold">
                      Ir a Pagar
                    </Text>
                  </ButtonLoader>
                )}
                {reservationQuery.data?.state === "Rechazado" && null}
                {reservationQuery.data?.state === "Finalizado" && null}
                {reservationQuery.data?.state === "Aprobado" && null}
                {reservationQuery.data?.state !== "PorPagar" &&
                  reservationQuery.data?.state !== "Aprobado" &&
                  reservationQuery.data?.state !== "Rechazado" &&
                  reservationQuery.data?.state !== "Finalizado" && (
                    <ButtonLoader
                      className="items-center"
                      onPress={handleSubmit(onSubmit)}
                    
                    >
                      <Text className="text-white text-center text-xl font-bold">
                        
                        Guardar
                      </Text>
                    </ButtonLoader>
                  )}
              </View> */}
              <View className="mt-2">
                {["PorPagar", "Aprobado", "Rechazado", "Finalizado"].includes(
                  reservationQuery.data?.state ?? ""
                ) ? null : (
                  <ButtonLoader
                    className="items-center"
                    onPress={
                      ["PorPagar"].includes(reservationQuery.data?.state ?? "")
                        ? () => router.push(PushPayment())
                        : handleSubmit(onSubmit)
                    }
                  >
                    <Text className="text-white text-center text-xl font-bold">
                      {["PorPagar"].includes(reservationQuery.data?.state ?? "")
                        ? "Ir a Pagar"
                        : "Guardar"}
                    </Text>
                  </ButtonLoader>
                )}
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </DefaultLayout>
  );
};

export default FormReservation;
