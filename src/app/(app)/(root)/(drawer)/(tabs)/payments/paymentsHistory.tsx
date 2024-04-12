import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Platform,
  RefreshControl,
} from "react-native";
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
    params: { idhousing: selectedHousing, limitResults: 10 },
  });

  const dataChargesPaginated =
    chargesPaginatedQuery.data?.pages?.flatMap((page: any) => page.data) ?? [];

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

                    <Text className="dark:text-white">
                      {item.date.toLocaleDateString()}
                    </Text>
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
