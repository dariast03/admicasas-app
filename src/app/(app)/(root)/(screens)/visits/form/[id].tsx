import {
  View,
  Text,
  TouchableOpacity,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
} from "react-native";
import React, { useEffect, useRef } from "react";
import { Stack, router, useLocalSearchParams } from "expo-router";
import { Controller, useForm } from "react-hook-form";
import DefaultLayout from "@/layout/DefaultLayout";
import { InputDatePicker, InputText } from "@/components/CustomInput";
import Dropdown from "@/components/DropDown";
import { IDropdownRef } from "react-native-element-dropdown";
import { useVisits } from "@/hooks/useVisits"; // Update the import path
import { format } from "date-fns-tz";
import Loader from "@/components/Loader";
import { useHousing } from "@/hooks/useHousing";
import { useSessionContext } from "@/hooks/useSessionContext";
import { useAppContext } from "@/hooks/useAppContext";
import Icon, { IconType } from "@/components/Icon";
import { IVisit } from "@/types/visits/visits";
import Colors from "@/constants/Colors";
import { is } from "date-fns/locale";
import { useColorScheme } from "nativewind";

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

const FormVisit = () => {
  // Update the component name
  const { id } = useLocalSearchParams<{ id: string }>();
  const { user } = useSessionContext();
  const { selectedHousing } = useAppContext();

  const isEdit = id !== "create";
  const newId = isEdit ? id : "";

  const { visitCreateMutation, visitQuery, visitUpdateMutation } = useVisits({
    id: newId,
  }); // Update the hook name

  const { housingsByPropietaryQuery } = useHousing({
    params: {
      idproprietary: user.id,
    },
  });

  function formatCustomDate(date: Date) {
    const day = String(date.getDate() + 1).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    let hours = date.getHours();
    const ampm = hours >= 12 ? "PM" : "AM";

    hours = hours % 12;
    hours = hours ? hours : 12;

    const minutes = String(date.getMinutes()).padStart(2, "0");

    const formattedDate = `${day}/${month}/${year} ${hours}:${minutes} ${ampm}`;
    return formattedDate;
  }

  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
    watch,
    getValues,
  } = useForm<IVisit>({
    mode: "onChange",
    defaultValues: {
      datevisit: new Date(),
      idhousing: selectedHousing,
      idpropietary: user.id,
      idcondominium: user.account.idcondominium,
      observation: "",
    },
  });

  const isDark = useColorScheme().colorScheme === "dark";

  const ref = useRef<IDropdownRef>(null);

  const isAllowedEdit = visitQuery.data?.datevisit
    ? visitQuery.data.datevisit > new Date()
    : false;

  const onSubmit = async (data: IVisit) => {
    //return console.log(data);
    if (isEdit) {
      await visitUpdateMutation.mutateAsync(data);
    } else {
      await visitCreateMutation.mutateAsync(data);
    }

    router.push("/visits/");
  };

  useEffect(() => {
    if (visitQuery.data) {
      setValue("datevisit", visitQuery.data.datevisit);
      reset(visitQuery.data);
    }
  }, [visitQuery.data]);

  // useEffect(() => {
  //   const idHousing = getValues("idhousing");
  //   if (idHousing) {
  //     const housing = housingsByPropietaryQuery.data?.find(
  //       (x) => x.id == idHousing
  //     );
  //     if (housing) {
  //       setValue("idcondominium", housing.idcondominium);
  //     }
  //   }
  // }, [watch("idhousing")]);

  return (
    <>
      <DefaultLayout>
        <Stack.Screen
          options={{
            headerShadowVisible: false,
            headerTitleAlign: "center",

            title: "Nuevo Registro",
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
                    <Text className="text-xl font-semibold mb-2 text-primario-600 dark:text-white">
                      Registro de Visita
                    </Text>
                    <Text className="text-sm  text-center text-primario-600 dark:text-white">
                      Por favor, completa el formulario para registrar una
                      visita
                    </Text>
                  </View>

                  {!visitQuery.isLoading ? (
                    <View className="gap-2">
                      <View>
                        <Controller
                          name="name"
                          control={control}
                          rules={{
                            required: "El nombre es requerido",
                          }}
                          render={({ field, fieldState: { error } }) => (
                            <>
                              <InputText
                                ref={field.ref}
                                value={field.value}
                                onChangeText={(e) => field.onChange(e)}
                                withAsterisk
                                label="Nombre"
                                placeholder="Nombre de la visita"
                                error={error?.message}
                                // disabled={isStatusDifferentPending}
                                // editable={!isStatusDifferentPending}
                              />
                            </>
                          )}
                        />
                      </View>

                      <View>
                        <Controller
                          name="document"
                          control={control}
                          rules={{
                            required: "El documento de identidad es requerido",
                          }}
                          render={({ field, fieldState: { error } }) => {
                            return (
                              <>
                                <InputText
                                  ref={field.ref}
                                  value={field.value}
                                  onChangeText={(e) => field.onChange(e)}
                                  withAsterisk
                                  label="DNI"
                                  placeholder="Número de Documento"
                                  error={error?.message}
                                  keyboardType="numeric"
                                  // disabled={isStatusDifferentPending}
                                  //editable={!isStatusDifferentPending}
                                />
                              </>
                            );
                          }}
                        />
                      </View>

                      <View>
                        <Controller
                          name="observation"
                          control={control}
                          render={({ field, fieldState: { error } }) => (
                            <>
                              <InputText
                                ref={field.ref}
                                value={field.value}
                                onChangeText={(e) => field.onChange(e)}
                                label="Observación"
                                placeholder="Observaciones de la visita"
                                error={error?.message}
                                multiline
                                numberOfLines={5}
                                //disabled={isStatusDifferentPending}
                                //editable={!isStatusDifferentPending}
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
                                  /*   disabled={
                                    isStatusDifferentPending ||
                                    housingsByPropietaryQuery.isLoading
                                  }
                                  disable={
                                    isStatusDifferentPending ||
                                    housingsByPropietaryQuery.isLoading
                                  } */
                                />
                              </>
                            );
                          }}
                        />
                      </View>

                      <View>
                        <Controller
                          name="datevisit"
                          control={control}
                          rules={{
                            required: "La fecha de visita es requerida",
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
                                label="Fecha de Visita:"
                                placeholder="Enter your password"
                                error={error?.message}
                                //disabled={isStatusDifferentPending}
                                editable={false}
                              />
                            </>
                          )}
                        />
                      </View>

                      {((isEdit && isAllowedEdit) || !isEdit) && (
                        <TouchableOpacity
                          onPress={handleSubmit(onSubmit)}
                          disabled={
                            visitCreateMutation.isPending ||
                            visitUpdateMutation.isPending
                          }
                          style={{
                            opacity:
                              visitCreateMutation.isPending ||
                              visitUpdateMutation.isPending
                                ? 0.8
                                : 1,
                          }}
                        >
                          <View className="rounded-xl bg-primario-800 dark:bg-primario-600 p-3 mt-5">
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
                </View>
              </View>
            </ScrollView>
          </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
      </DefaultLayout>
    </>
  );
};

export default FormVisit;
