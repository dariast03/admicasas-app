import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Platform,
  RefreshControl,
} from "react-native";
import { Image } from "expo-image";
import { usePayments } from "@/hooks/usePayments";
import { useCharges } from "@/hooks/useCharges";
import { useSessionContext } from "@/hooks/useSessionContext";
import DefaultLayout from "@/layout/DefaultLayout";
import { IPayments } from "@/types/payments/payments";

import { useAppContext } from "@/hooks/useAppContext";

import Tag from "@/components/Tag";
import {
  BottomSheet,
  BottomSheetCloseTrigger,
  BottomSheetContent,
  BottomSheetHeader,
  BottomSheetOpenTrigger,
  BottomSheetTextInput,
  BottomSheetView,
} from "@/components/ui/bottom-sheet";

import Icon, { IconType } from "@/components/Icon";
import { Skeleton } from "@/components/ui/skeleton";
import SkeletonFlatList from "@/components/SkeletonFlatList";
import { cn } from "@/lib/utils";
import { ICharge } from "@/types/charges/charges";
import { isValid, format } from "date-fns";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import RNFetchBlob from "rn-fetch-blob";

interface typePayments {
  id?: string | undefined;
  idcharge?: string;
  state: string;
}

const PaymentsHistory = () => {
  const { selectedHousing } = useAppContext();
  const [isRefreshing, setIsRefreshing] = useState(false);

  const { paymentsQuery } = usePayments({
    params: { idhousing: selectedHousing },
  });

  const { chargesPaginatedQuery } = useCharges({
    params: { idhousing: selectedHousing, limitResults: 5, type: "History" },
  });

  const dataChargesPaginated =
    chargesPaginatedQuery.data?.pages?.flatMap((page: any) => page.data) ?? [];

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

  const PaymentItem = ({ item }: { item: ICharge }) => {
    // const { selectedHousing } = useAppContext();

    // const { chargeQuery } = useCharges({
    //   id: item.idcharge || "",
    //   params: { idhousing: selectedHousing },
    // });

    return (
      <View className="p-4">
        <TouchableOpacity className="cursor-pointer">
          <BottomSheet>
            <BottomSheetOpenTrigger asChild>
              <TouchableOpacity>
                <View className="flex-row justify-between items-center">
                  {/* {item.isLoading ? (
                    <Skeleton className="bg-gray-200 dark:bg-primario-600 h-4 w-32" />
                  ) : (
                   
                  )} */}

                  <Text className="text-black dark:text-white text-sm">
                    {item.name.toLocaleUpperCase()}
                  </Text>
                  <View className="flex-row">
                    <Tag
                      severity={
                        item.paymentstatus === "Aprobado"
                          ? "success"
                          : item.paymentstatus === "Pendiente"
                          ? "warning"
                          : item.paymentstatus === "Rechazado"
                          ? "error"
                          : "info"
                      }
                      value={item.paymentstatus}
                    />
                  </View>
                </View>
              </TouchableOpacity>
            </BottomSheetOpenTrigger>
            <BottomSheetContent>
              <BottomSheetHeader>
                <Text className="text-foreground text-xl font-bold text-center pb-1 text-primario-600 dark:text-white">
                  Detalle de Pago
                </Text>
              </BottomSheetHeader>
              <BottomSheetView className="gap-5 pt-6">
                <View className="pb-2 gap-6">
                  <View className="flex-row justify-around">
                    <View className="flex-row">
                      <Icon
                        icon={{
                          type: IconType.FontAweomseIcon,
                          name: "money",
                        }}
                      />
                      <Text className={"pb-2.5 dark:text-white"}>Monto</Text>
                    </View>
                    <Text className={"pb-2.5 dark:text-white"}>
                      Bs. {item.amount}
                    </Text>
                  </View>
                  <View className="flex-row justify-around">
                    <View className="flex-row">
                      <Icon
                        icon={{
                          type: IconType.AntDesign,
                          name: "calendar",
                        }}
                      />
                      <Text className="dark:text-white">Fecha Registro</Text>
                    </View>
                    <Text>
                      {item.date
                        ? isValid(item.date)
                          ? format(item.date, "dd/MM/yyyy")
                          : "Sin Fecha"
                        : "Sin Fecha"}
                    </Text>
                  </View>
                  <View className="flex-row justify-center items-center gap-2">
                    {item.urlimg ? (
                      <View className="border border-primario-600 justify-center items-center rounded-lg w-52 h-52 ">
                        <Text className="font-bold uppercase text-primario-600 text-sm">
                          QR
                        </Text>

                        <Image
                          style={{ height: 120, width: 120, marginBottom: 2 }}
                          source={item.urlimg}
                          contentFit="contain"
                        />
                        <TouchableOpacity
                          activeOpacity={0.6}
                          onPress={() => downloadFile(item.urlimg || "")}
                        >
                          <View className="mb-4 rounded-full bg-primario-600 flex-row p-1 justify-center items-center">
                            <Text className="text-white mx-2 text-center text-sm">
                              Descargar
                            </Text>
                            <Icon
                              icon={{
                                type: IconType.Feather,
                                name: "download",
                              }}
                              size={10}
                              color={"white"}
                            />
                          </View>
                        </TouchableOpacity>
                      </View>
                    ) : null}
                    {item.payment?.urlimg ? (
                      <View className="border  border-primario-600 justify-center items-center rounded-lg w-52 h-52 ">
                        <Text className="font-bold uppercase text-primario-600 text-sm">
                          Comprobante
                        </Text>

                        <Image
                          style={{ height: 120, width: 120, marginBottom: 2 }}
                          source={item.payment?.urlimg}
                          contentFit="contain"
                        />
                        <TouchableOpacity
                          activeOpacity={0.6}
                          onPress={() =>
                            downloadFile(item.payment?.urlimg || "")
                          }
                        >
                          <View className="mb-4 rounded-full bg-primario-600 flex-row p-1 justify-center items-center">
                            <Text className="text-white mx-2 text-center text-sm">
                              Descargar
                            </Text>
                            <Icon
                              icon={{
                                type: IconType.Feather,
                                name: "download",
                              }}
                              size={10}
                              color={"white"}
                            />
                          </View>
                        </TouchableOpacity>
                      </View>
                    ) : null}
                  </View>
                </View>
                <View className={cn(Platform.OS === "android" && "pb-2 pr-2")}>
                  <BottomSheetCloseTrigger>
                    <Text className=" text-red-500 text-right text-lg font-bold ">
                      Cerrar
                    </Text>
                  </BottomSheetCloseTrigger>
                </View>
              </BottomSheetView>
            </BottomSheetContent>
          </BottomSheet>
        </TouchableOpacity>
      </View>
    );
  };

  const renderItem = ({ item }: { item: ICharge }) => (
    <PaymentItem item={item} />
  );
  const itemSeparator = () => {
    return (
      <View className="border-b border-primario-600 dark:border-white"></View>
    );
  };

  const onRefresh = () => {
    setIsRefreshing(true);
    chargesPaginatedQuery.refetch();
  };

  useEffect(() => {
    if (isRefreshing && !chargesPaginatedQuery.isRefetching)
      setIsRefreshing(false);
  }, [chargesPaginatedQuery.isRefetching]);

  return (
    <DefaultLayout>
      {chargesPaginatedQuery.isLoading ? (
        <SkeletonFlatList />
      ) : (
        // <FlatList
        //   ListHeaderComponent={() => (
        //     <Text className="text-center text-primario-600 dark:text-white mt-6">
        //       Mis Pagos
        //     </Text>
        //   )}
        //   data={paymentsQuery.data}
        //   renderItem={renderItem}
        //   keyExtractor={(item) => item.id || ""}
        //   ItemSeparatorComponent={itemSeparator}
        //   refreshControl={
        //     <RefreshControl
        //       refreshing={isRefreshing && paymentsQuery.isRefetching}
        //       onRefresh={onRefresh}
        //     />
        //   }
        // />
        <FlatList
          onEndReached={() => {
            chargesPaginatedQuery.fetchNextPage();
          }}
          refreshControl={
            <RefreshControl
              refreshing={isRefreshing && chargesPaginatedQuery.isRefetching}
              onRefresh={onRefresh}
            />
          }
          onEndReachedThreshold={0.1}
          ListFooterComponent={
            chargesPaginatedQuery.isFetchingNextPage ? (
              <Text className="text-center text-primario-600">Cargado...</Text>
            ) : null
          }
          ListHeaderComponent={() => (
            <Text className="text-center text-primario-600 dark:text-white mt-6">
              Mis Pagos
            </Text>
          )}
          data={dataChargesPaginated}
          renderItem={renderItem}
          keyExtractor={(item) => item.id || ""}
          ItemSeparatorComponent={itemSeparator}
        />
      )}
    </DefaultLayout>
  );
};

export default PaymentsHistory;
