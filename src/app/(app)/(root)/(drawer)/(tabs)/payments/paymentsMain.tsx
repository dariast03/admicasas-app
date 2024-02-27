import { View, Text, Button, StyleSheet } from "react-native";
import React from "react";

import DefaultLayout from "@/layout/DefaultLayout";
import { FlatList } from "react-native-gesture-handler";
import Loader from "@/components/Loader";
import { useCharges } from "@/hooks/useCharges";

import { ICharge } from "@/types/charges/charges";
import { router } from "expo-router";
import { ButtonLoader } from "@/components/ButtonLoader";
import { useSessionContext } from "@/hooks/useSessionContext";
import Icon, { IconType } from "@/components/Icon";
import { useAppContext } from "@/hooks/useAppContext";

type Props = {
  data: ICharge;
};

const PaymentCard = () => {
  const { user } = useSessionContext();
  const { selectedHousing } = useAppContext();
  const { chargesQuery } = useCharges({
    params: { idhousing: selectedHousing },
  });

  const Card = ({ data }: Props) => {
    const routeView: any = "/payment/" + data.id;
    return (
      <View className="p-5 m-3 rounded-lg bg-white" style={styles.shadowCard}>
        <Text className="text-xl font-bold">{data.name}</Text>
        <Text className="text-base text-gray-600">{data.description}</Text>
        <View className="border-b border-stone-400 my-5"></View>
        <Text className="text-base text-gray-600">Fecha limite</Text>
        <View className="flex-row items-center">
          <Icon
            icon={{
              type: IconType.AntDesign,
              name: "calendar",
            }}
          />
          <Text className="text-stone-400 my-2">
            {/* {data?.start?.toLocaleDateString()} */}
            30/03/2024
          </Text>
        </View>

        <Text className="text-lg text-gray-700 my-3">
          Monto a pagar: {data.amount}
        </Text>
        <ButtonLoader onPress={() => router.push(routeView)}>
          <Text className="text-center font-bold text-white">PAGAR</Text>
        </ButtonLoader>
      </View>
    );
  };

  return (
    <DefaultLayout>
      <FlatList
        data={null}
        renderItem={() => null}
        contentContainerClassName="p-5"
        ListHeaderComponent={
          <>
            <FlatList
              data={chargesQuery.data}
              renderItem={({ item }) => <Card data={item} />}
              ItemSeparatorComponent={() => <View className="mb-5" />}
              keyExtractor={(item) => item.id || ""}
              ListEmptyComponent={() => (
                <>
                  {chargesQuery.isLoading ? (
                    <Loader />
                  ) : (
                    <Text className="text-center flex-row p-2 text-gray-400">
                      No hay pagos pendientes
                    </Text>
                  )}
                </>
              )}
            />
          </>
        }
      />
    </DefaultLayout>

    // <View
    //   className="p-5 m-3 rounded bg-white shadow-md"
    //   style={styles.cardShadow}
    // >
    //   <Text className="text-xl font-bold">{paymentName}</Text>
    //   <Text className="text-base text-gray-600">{paymentDetail}</Text>
    //   <Text className="text-lg text-gray-700 my-3">
    //     Monto a pagar: {amountToPay}
    //   </Text>
    //   <Button title="Pagar" onPress={() => console.log("Pago realizado")} />
    // </View>
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

export default PaymentCard;
