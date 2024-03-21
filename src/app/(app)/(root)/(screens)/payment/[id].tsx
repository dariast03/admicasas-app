import { useAnnouncement } from "@/hooks/useAnnouncement";
import DefaultLayout from "@/layout/DefaultLayout";
import { Image } from "expo-image";
import { Redirect, Stack, router, useLocalSearchParams } from "expo-router";
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from "react-native";
import { useSessionContext } from "../../../../../hooks/useSessionContext";

import { TouchableOpacity } from "react-native-gesture-handler";
import Icon, { IconType } from "@/components/Icon";
import * as ImagePicker from "expo-image-picker";
import * as DocumentPicker from "expo-document-picker";

import React, { useEffect, useRef, useState } from "react";

import RNFetchBlob from "rn-fetch-blob";
import { usePayments } from "@/hooks/usePayments";
import { IPayments } from "@/types/payments/payments";
import { InputCustom } from "@/components/CustomInput";
import { ButtonLoader } from "@/components/ButtonLoader";
import { useCharges } from "@/hooks/useCharges";
import { useAppContext } from "@/hooks/useAppContext";
import Colors from "@/constants/Colors";
import GlobalStyles from "@/constants/GlobalStyle";

import { Button } from "react-native";

const DetailAnnocenment = () => {
  const { id } = useLocalSearchParams();

  if (!id) return <Redirect href={"/404"} />;

  const { width } = useWindowDimensions();
  const { user } = useSessionContext();
  const { selectedHousing } = useAppContext();
  const { chargeQuery } = useCharges({
    id: id + "",
    params: { idhousing: selectedHousing },
  });
  const shadowStyle = GlobalStyles();
  const { announcementDetailQuery } = useAnnouncement({
    params: {
      idcharge: id + "" || "",
      idcondominium: user.account.idcondominium,
    },
  });

  const ref = useRef<any>();

  // const {
  //   canStart, // a boolean indicate if you can start tour guide
  //   start, // a function to start the tourguide
  //   stop, // a function  to stopping it
  //   eventEmitter, // an object for listening some events
  //   tourKey,
  // } = useTourGuideController("prueba");

  // // Can start at mount 🎉
  // // you need to wait until everything is registered 😁
  // useEffect(() => {
  //   if (canStart) {
  //     start();
  //   }
  // }, [canStart]); // 👈 don't miss it!

  // const handleOnStart = () => console.log("start");
  // const handleOnStop = () => console.log("stop");
  // const handleOnStepChange = (num: any) => {
  //   console.log(num);
  //   if (num.order === 2) ref.current.scrollToEnd({ animated: true });
  // };

  // useEffect(() => {
  //   eventEmitter?.on("start", handleOnStart);
  //   eventEmitter?.on("stop", handleOnStop);
  //   eventEmitter?.on("stepChange", handleOnStepChange);

  //   return () => {
  //     eventEmitter?.off("start", handleOnStart);
  //     eventEmitter?.off("stop", handleOnStop);
  //     eventEmitter?.off("stepChange", handleOnStepChange);
  //   };
  // }, []);

  const { paymentCreateMutation, paymentQuery, paymentUpdateMutation } =
    usePayments({
      id: id + "",
      params: {
        idcharge: id + "",
        idhousing: selectedHousing,
      },
    });

  const [image, setImage] = useState<ImagePicker.ImagePickerAsset | null>(null);

  const [imageError, setImageError] = useState<string | null>(null);

  const isEdit = id !== "create";

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

  const onSubmit = async (data: IPayments) => {
    if (!image) {
      setImageError("Por favor selecciona una imagen.");
      return;
    }

    if (paymentQuery.data?.id) {
      data.id = paymentQuery.data?.id;
      data.state = "Pendiente";
      await paymentUpdateMutation.mutateAsync({
        data,
        file: {
          name: image?.fileName || "",
          uri: image?.uri || "",
        },
      });
    } else {
      data.iduser = user.id;
      data.idhousing = selectedHousing;
      data.idcharge = id + "";
      data.state = "Pendiente";
      data.idcondominium = user.account.idcondominium;
      data.date = new Date();
      await paymentCreateMutation.mutateAsync({
        data,
        file: {
          name: image?.fileName || "",
          uri: image?.uri || "",
        },
      });
    }
    router.push("/(app)/(root)/(drawer)/(tabs)/payments/paymentsHistory");
  };

  const [downloadProgress, setDownloadProgress] = useState(0);

  // const callback = (downloadProgress) => {
  //   const progress =
  //     downloadProgress.totalBytesWritten /
  //     downloadProgress.totalBytesExpectedToWrite;
  //   setDownloadProgress(progress);
  // };

  const downloadFile = async (imageUrl: string) => {
    const { dirs } = RNFetchBlob.fs;
    const path = `${dirs.DownloadDir}/file.png`;

    try {
      const res = await RNFetchBlob.config({
        fileCache: true,
        path,
        addAndroidDownloads: {
          useDownloadManager: true,
          notification: true,
          path: path,
          description: "File downloaded by download manager.",
        },
      }).fetch("GET", imageUrl);

      console.log("File downloaded to: ", res.path());
    } catch (error) {
      console.error(error);
    }
  };

  // const downloadImage = async (imageUrl: string) => {
  //   imageUrl =
  //     "https://buffer.com/cdn-cgi/image/w=1000,fit=contain,q=90,f=auto/library/content/images/size/w600/2023/10/free-images.jpg";
  //   if (imageUrl) {
  //     const downloadResumable = FileSystem.createDownloadResumable(
  //       imageUrl,
  //       `${FileSystem.documentDirectory}free-images.jpg`,
  //       {},
  //       callback
  //     );

  //     try {
  //       const result = await downloadResumable.downloadAsync();
  //       if (result) {
  //         const { uri } = result;
  //         console.log("Finished downloading to ", uri);
  //       }
  //     } catch (e) {
  //       console.error(e);
  //     }
  //   }
  // };

  const pickDoc = async () => {
    let result = await DocumentPicker.getDocumentAsync({
      copyToCacheDirectory: true,
      multiple: false,
      type: "image/*",
    });
    console.log(result.assets);
  };

  if (announcementDetailQuery.isLoading)
    return (
      <View className="p-5">
        <ActivityIndicator color={Colors.primario[600]} size={20} />
        <Text className="text-center text-primario-600">Cargando..</Text>
      </View>
    );
  if (announcementDetailQuery.isError) return <Text>ERROR AREA</Text>;

  return (
    <DefaultLayout>
      <Stack.Screen
        options={{
          title: chargeQuery.data?.name,
        }}
      />

      <ScrollView ref={ref}>
        <View className=" p-5">
          <View
            className="bg-white dark:bg-primario-800 rounded-2xl overflow-hidden "
            style={shadowStyle}
          >
            <Image
              style={{ width, height: 200 }}
              source={
                announcementDetailQuery.data?.urlimg === undefined
                  ? "https://th.bing.com/th/id/OIP.FD_DKax9RQv_s7tizNOL_wHaDo?rs=1&pid=ImgDetMain"
                  : announcementDetailQuery.data.urlimg
              }
            />

            <View className="flex-row justify-start px-4 py-3 bg-primario-600">
              <Icon
                color={"red"}
                icon={{
                  type: IconType.MaterialIcon,
                  name: "payment",
                }}
              />
              <Text className="mx-3 text-white font-semibold text-lg">
                COBRO
              </Text>
            </View>
            <View className="py-4 px-6 ">
              {paymentQuery.data?.message &&
                paymentQuery.data.state !== "Pendiente" && (
                  <View
                    className={`p-5 rounded-md ${
                      paymentQuery.data.state === "Aprobado"
                        ? "bg-green-400"
                        : "bg-yellow-400"
                    }`}
                  >
                    <Text>{paymentQuery.data?.message}</Text>
                  </View>
                )}
              <Text className="font-semibold text-xl my-2 dark:text-white">
                Detalle del Cobro
              </Text>
              <View className="bg-white dark:bg-primario-800 border border-gray-300 rounded-md p-5">
                <Text className="text-6xl text-primario-600 dark:text-white mt-2">
                  Bs {chargeQuery.data?.amount}
                </Text>
                <Text className="text-stone-500 dark:text-white mt-2">
                  {chargeQuery.data?.name}
                </Text>
                <Text className="text-stone-400 dark:text-white my-2">
                  {chargeQuery.data?.description}
                </Text>
                <View className="border-b border-stone-400 dark:text-white my-5"></View>
                <View className="items-center">
                  {paymentQuery.data?.urlimg && !image && (
                    <>
                      <Text className="font-bold dark:text-white">
                        Comprobante
                      </Text>
                      <Image
                        style={{ width: 200, height: 200 }}
                        source={paymentQuery.data?.urlimg}
                      />
                    </>
                  )}
                  {image && (
                    <>
                      <Text className="font-bold">Comprobante</Text>
                      <Image
                        style={{ width: 200, height: 200 }}
                        source={image}
                      />
                    </>
                  )}
                  {(!paymentQuery.data?.state ||
                    paymentQuery.data?.state === "Rechazado") && (
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

                      {!image && imageError && (
                        <Text className="text-red-600 p-2">{imageError}</Text>
                      )}
                    </View>
                  )}
                </View>
              </View>
              <Text className="font-semibold dark:text-white text-xl my-2">
                Medio de pago
              </Text>
              <TouchableOpacity
                onPress={() => downloadFile(chargeQuery.data?.urlimg || "")}
              >
                <View className="border border-gray-300 mt-2 items-center rounded-md p-5">
                  <Image
                    style={{ width: 200, height: 200 }}
                    source={chargeQuery.data?.urlimg}
                  />
                </View>
              </TouchableOpacity>
            </View>

            <View className="px-5 pb-5">
              <ButtonLoader
                className="items-center"
                disabled={paymentQuery.data?.state === "Pendiente"}
                onPress={() => {
                  if (!paymentCreateMutation.isPending) {
                    onSubmit({} as IPayments);
                  }
                }}
                style={{
                  opacity:
                    paymentQuery.data?.state === "Pendiente" ||
                    paymentQuery.data?.state === "Aprobado"
                      ? 0.5
                      : 1,
                }}
                loading={paymentCreateMutation.isPending}
              >
                <Text className="text-white text-center text-xl font-bold">
                  {paymentCreateMutation.isPending ? "Guardando.." : "Pagar"}
                </Text>
              </ButtonLoader>
            </View>
          </View>
        </View>
      </ScrollView>
    </DefaultLayout>
  );
};

const styles = StyleSheet.create({
  shadowCard: {
    shadowColor: "#4f46e5",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.2,
    shadowRadius: 5.62,
    elevation: 7,
  },
});

export default DetailAnnocenment;
