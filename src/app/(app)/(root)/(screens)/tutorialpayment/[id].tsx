import Icon, { IconType } from "@/components/Icon";
import { Image } from "expo-image";
import React, { useEffect } from "react";
import { Text, TouchableOpacity, useWindowDimensions } from "react-native";
import { ScrollView, View } from "react-native";
import { InputCustom } from "@/components/CustomInput";
import { ButtonLoader } from "@/components/ButtonLoader";
import GlobalStyles from "@/constants/GlobalStyle";
import { TourGuideZone, useTourGuideController } from "rn-tourguide";
import { router, useLocalSearchParams } from "expo-router";
import DefaultLayout from "@/layout/DefaultLayout";
import { useAppContext } from "@/hooks/useAppContext";

const TutorialPayment = () => {
  const { width, height } = useWindowDimensions();

  const { id } = useLocalSearchParams();

  const { tutorialPayment, updateTutorialPayment } = useAppContext();

  const {
    canStart, // a boolean indicate if you can start tour guide
    start, // a function to start the tourguide
    stop, // a function  to stopping it
    eventEmitter, // an object for listening some events
    tourKey,
  } = useTourGuideController("Payment");

  // Can start at mount 🎉
  // you need to wait until everything is registered 😁
  useEffect(() => {
    console.log("🚀 ~ useEffect ~ tutorialPayment:", tutorialPayment);
    console.log("canstart", canStart);
    if (!tutorialPayment && canStart) {
      start();
    }
  }, [canStart]); // 👈 don't miss it!

  const handleOnStart = () => console.log("start");
  const handleOnStop = () => {
    //const routerView="/payment/"+id
    updateTutorialPayment();
    router.replace(`/payment/${id}`);
  };
  const handleOnStepChange = () => {
    console.log();
  };

  useEffect(() => {
    if (canStart) {
      eventEmitter?.off("start", handleOnStart);
      eventEmitter?.off("stop", handleOnStop);
      eventEmitter?.off("stepChange", handleOnStepChange);
    }
    eventEmitter?.on("start", handleOnStart);
    eventEmitter?.on("stop", handleOnStop);
    eventEmitter?.on("stepChange", handleOnStepChange);

    return () => {
      eventEmitter?.off("start", handleOnStart);
      eventEmitter?.off("stop", handleOnStop);
      eventEmitter?.off("stepChange", handleOnStepChange);
    };
  }, [canStart]);

  return (
    <DefaultLayout>
      <ScrollView>
        <View className=" p-5">
          <View
            className="bg-white dark:bg-primario-800 rounded-2xl overflow-hidden "
            style={GlobalStyles()}
          >
            <View className="justify-center, items-center p-2">
              <Image
                style={{ width: 200, height: height * 0.15 }}
                source={require("@/assets/images/resource/payment.png")}
                contentFit="contain"
              />
            </View>

            <View className="flex-row justify-start px-2 py-2 bg-primario-600 items-center">
              <Icon
                icon={{
                  type: IconType.MaterialIcon,
                  name: "payment",
                }}
              />
              <Text className="mx-3 text-white font-semibold ">COBRO</Text>
            </View>
            <TourGuideZone
              zone={1}
              text={
                "Aquí encontrarás información más detallada sobre el pago, incluyendo el monto y la descripción del cobro que seleccionaste"
              }
              borderRadius={16}
              tourKey={tourKey}
            >
              <View className="py-2 px-6 ">
                <Text className="font-semibold text-xl my-2 dark:text-white">
                  Detalle del Cobro
                </Text>
                <View className="bg-white dark:bg-primario-800 border border-gray-300 rounded-md p-2">
                  <Text className="text-4xl text-primario-600 dark:text-white mt-2">
                    Bs 999.00
                  </Text>
                  <Text className="text-stone-500 dark:text-white mt-2">
                    Expensas
                  </Text>
                  <Text className="text-stone-400 dark:text-white my-2">
                    Pago de expensas mes de Diciembre.
                  </Text>
                  <View className="border-b border-stone-400 dark:text-white my-2"></View>
                  <TourGuideZone
                    zone={3}
                    text={
                      "Después de completar el pago, sube tu comprobante haciendo clic y seleccionando la imagen desde tu galería."
                    }
                    borderRadius={16}
                    tourKey={tourKey}
                  >
                    <View className="items-center">
                      <View className="w-full">
                        <InputCustom
                          icon={{
                            type: IconType.MaterialCommunityIcons,
                            name: "clock-outline",
                          }}
                          label="Cargar Comprobante:"
                          value={"Comprobante Seleccionado"}
                          placeholder="Selecciona una imagen"
                          editable={false}
                          rightContent={
                            <View className="flex-row">
                              <Icon
                                icon={{
                                  type: IconType.MaterialCommunityIcons,
                                  name: "folder-multiple-image",
                                }}
                              />
                            </View>
                          }
                        />
                      </View>
                    </View>
                  </TourGuideZone>
                </View>
                <Text className="font-semibold dark:text-white text-xl my-2">
                  Medio de pago
                </Text>
                <TouchableOpacity>
                  <TourGuideZone
                    zone={2}
                    text={
                      "Primero, descarga el código QR del cobro en tu dispositivo haciendo clic en la imagen."
                    }
                    borderRadius={16}
                    tourKey={tourKey}
                  >
                    <View className="border border-gray-300 mt-2 items-center rounded-md ">
                      <Image
                        style={{ width: 200, height: height * 0.15 }}
                        source={require("@/assets/images/resource/Barcode.png")}
                        contentFit="contain"
                      />
                    </View>
                  </TourGuideZone>
                </TouchableOpacity>
              </View>
            </TourGuideZone>
            <TourGuideZone
              zone={4}
              text={
                "Una vez que hayas subido el comprobante, solo resta hacer clic en 'Pagar' y esperar la aprobación del pago."
              }
              borderRadius={16}
              tourKey={tourKey}
            >
              <View className="px-5 pb-5">
                <ButtonLoader>
                  <Text className="text-white text-center text-xl font-bold">
                    {"Pagar"}
                  </Text>
                </ButtonLoader>
              </View>
            </TourGuideZone>
          </View>
        </View>
      </ScrollView>
    </DefaultLayout>
  );
};

export default TutorialPayment;
