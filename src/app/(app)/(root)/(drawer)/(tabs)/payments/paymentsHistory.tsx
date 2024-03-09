import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  FlatList,
  Platform,
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

interface typePayments {
  id?: string | undefined;
  idcharge?: string;
  state: string;
}

const PaymentItem = ({ item }: { item: IPayments }) => {
  const { selectedHousing } = useAppContext();

  const { chargeQuery } = useCharges({
    id: item.idcharge || "",
    params: { idhousing: selectedHousing },
  });

  return (
    <View className="p-4">
      <TouchableOpacity className="cursor-pointer">
        <BottomSheet>
          <BottomSheetOpenTrigger asChild>
            <TouchableOpacity>
              <View className="flex-row justify-between items-center">
                {chargeQuery.isLoading ? (
                  <Skeleton className="bg-primario-100 h-4 w-32" />
                ) : (
                  <Text className="text-black text-sm">
                    {chargeQuery.data?.name.toLocaleUpperCase()}
                  </Text>
                )}
                <View className="flex-row">
                  <Tag severity="info" value={item.state} />
                </View>
              </View>
            </TouchableOpacity>
          </BottomSheetOpenTrigger>
          <BottomSheetContent>
            <BottomSheetHeader>
              <Text className="text-foreground text-xl font-bold text-center pb-1 text-primario-600">
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
                    <Text className={"pb-2.5"}>Monto</Text>
                  </View>
                  <Text className={"pb-2.5"}>
                    Bs. {chargeQuery.data?.amount}
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
                    <Text>Fecha Registro</Text>
                  </View>

                  <Text>{item.date.toLocaleDateString()}</Text>
                </View>
              </View>
              {/* <View className={cn(Platform.OS === "android" && "pb-2")}>
                <BottomSheetCloseTrigger>
                  <Text>Save Changes</Text>
                </BottomSheetCloseTrigger>
              </View> */}
            </BottomSheetView>
          </BottomSheetContent>
        </BottomSheet>
      </TouchableOpacity>
    </View>
  );
};

const PaymentsHistory = () => {
  const { user } = useSessionContext();
  const { selectedHousing } = useAppContext();

  const { paymentsQuery } = usePayments({
    params: { idhousing: selectedHousing },
  });

  const renderItem = ({ item }: { item: IPayments }) => (
    <PaymentItem item={item} />
  );
  const itemSeparator = () => {
    return <View className="border-b border-primario-600"></View>;
  };

  return (
    <DefaultLayout>
      {paymentsQuery.isLoading ? (
        <SkeletonFlatList />
      ) : (
        <FlatList
          ListHeaderComponent={() => (
            <Text className="text-center text-primario-600 text-sm mt-6">
              MIS PAGOS
            </Text>
          )}
          data={paymentsQuery.data}
          renderItem={renderItem}
          keyExtractor={(item) => item.id || ""}
          ItemSeparatorComponent={() => itemSeparator()}
        />
      )}
    </DefaultLayout>
  );
};

export default PaymentsHistory;
