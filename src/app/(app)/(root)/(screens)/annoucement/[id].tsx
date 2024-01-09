import { useAnnouncement } from "@/hooks/useAnnouncement";
import DefaultLayout from "@/layout/DefaultLayout";
import { Image } from "expo-image";
import { Redirect, useLocalSearchParams } from "expo-router";
import {
  ScrollView,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from "react-native";
import { useSessionContext } from "../../../../../hooks/useSessionContext";
import { MaterialIcons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";
import Icon, { IconType } from "@/components/Icon";
import * as ImagePicker from "expo-image-picker";
import * as DocumentPicker from "expo-document-picker";
import * as FileSystem from "expo-file-system";
import { useState } from "react";
import { fi } from "date-fns/locale";
import RNFetchBlob from "rn-fetch-blob";
import { usePayments } from "@/hooks/usePayments";
import { IPayments } from "@/types/payments/payments";
import { InputCustom } from "@/components/CustomInput";
import { ButtonLoader } from "@/components/ButtonLoader";

const DetailAnnocenment = () => {
  const { id } = useLocalSearchParams();
  if (!id) return <Redirect href={"/404"} />;

  const { width } = useWindowDimensions();
  const { user } = useSessionContext();

  const { announcementQuery } = useAnnouncement({
    id: id + "",
    params: { idcondominium: user?.account?.idcondominium, iduser: user.id },
  });

  const { paymentCreateMutation, paymentQuery } = usePayments({
    id: id + "",
    params: {
      idcharge: announcementQuery.data?.idcharge || "",
      iduser: user.id,
    },
  });

  const [image, setImage] = useState<ImagePicker.ImagePickerAsset | null>(null);

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
    data.iduser = user.id;
    data.idcharge = announcementQuery.data?.charge?.id;
    data.state = "Pendiente";

    // if (isEdit) {
    //   // await paymentUpdateMutation.mutateAsync({
    //   //   data,
    //   //   file: {
    //   //     name: image?.fileName || "",
    //   //     uri: image?.uri || "",
    //   //   },
    //   // });
    // } else {
    //   await paymentCreateMutation.mutateAsync({
    //     data,
    //     file: {
    //       name: image?.fileName || "",
    //       uri: image?.uri || "",
    //     },
    //   });
    // }
    await paymentCreateMutation.mutateAsync({
      data,
      file: {
        name: image?.fileName || "",
        uri: image?.uri || "",
      },
    });

    //router.push("/incidents/");
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

  if (announcementQuery.isLoading) return <Text>CARGANDO AREA</Text>;
  if (announcementQuery.isError) return <Text>ERROR AREA</Text>;

  return (
    <DefaultLayout>
      <ScrollView>
        <View className=" p-5">
          <View
            className="bg-white rounded-t-2xl overflow-hidden "
            style={styles.shadowCard}
          >
            <Image
              style={{ width, height: 200 }}
              source={announcementQuery.data?.urlimg}
            />

            <View className="flex-row justify-start px-4 py-3 bg-indigo-600">
              <Icon
                color={"white"}
                icon={{
                  type: IconType.MatetrialIcon,
                  name: "payment",
                }}
              />
              <Text className="mx-3 text-white font-semibold text-lg">
                COBRO
              </Text>
            </View>
            <View className="py-4 px-6 ">
              <View
                className="bg-white  rounded-md p-5"
                style={styles.shadowCard}
              >
                <Text className="text-6xl text-primario-600 mt-2">
                  Bs {announcementQuery.data?.charge?.amount}
                </Text>
                <Text className="text-stone-500 mt-2">
                  {announcementQuery.data?.charge?.name}
                </Text>
                <Text className="text-stone-400 my-2">
                  {announcementQuery.data?.charge?.description}
                </Text>
                <View className="border-b border-stone-400 my-5"></View>
                <View className="items-center">
                  {paymentQuery.data?.urlimg && (
                    <Image
                      style={{ width: 200, height: 200 }}
                      source={paymentQuery.data?.urlimg}
                    />
                  )}
                </View>

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
              {/* <View className="flex-row items-center mt-4 text-gray-700">
                <Icon
                  icon={{
                    type: IconType.MaterialCommunityIcons,
                    name: "clock-time-three-outline",
                  }}
                />
                <Text className="text-sm">
                  {announcementQuery.data?.start?.toLocaleDateString()}
                </Text>
                <Icon
                  icon={{
                    type: IconType.MaterialCommunityIcons,
                    name: "clock-time-nine-outline",
                  }}
                />
                <Text className="text-sm">
                  {announcementQuery.data?.end?.toLocaleDateString()}
                </Text>
              </View> */}
              <View
                className="bg-white mt-2 items-center rounded-md p-5"
                style={styles.shadowCard}
              >
                <Image
                  style={{ width: 200, height: 200 }}
                  source={announcementQuery.data?.charge?.urlimg}
                />
                <Text
                  onPress={() =>
                    downloadFile(announcementQuery.data?.charge?.urlimg || "")
                  }
                >
                  {" "}
                  Descargar
                </Text>
              </View>
            </View>

            <View className="p-5">
              {/* <TouchableOpacity className="items-center">
                  <Text
                    className="text-white text-center text-xl font-bold"
                    onPress={() => pickImage()}
                  >
                    Cargar
                  </Text>
                </TouchableOpacity> */}
              {/* <TouchableOpacity
                className="items-center"
                disabled={true}
                onPress={() => {
                  if (!paymentCreateMutation.isPending) {
                    onSubmit({} as IPayments);
                  }
                }}
                style={{
                  opacity: paymentQuery.data?.state === "Pendiente" ? 0.5 : 1,
                }}
              >
                <View className="rounded-xl bg-indigo-600 p-3">
                  <Text className="text-white text-center text-xl font-bold">
                    {paymentCreateMutation.isPending ? "Guardando.." : "Pagar"}
                  </Text>
                </View>
              </TouchableOpacity> */}
              <ButtonLoader
                className="items-center"
                disabled={paymentQuery.data?.state === "Pendiente"}
                onPress={() => {
                  if (!paymentCreateMutation.isPending) {
                    onSubmit({} as IPayments);
                  }
                }}
                style={{
                  opacity: paymentQuery.data?.state === "Pendiente" ? 0.5 : 1,
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
