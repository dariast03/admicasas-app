import { View, Text, Button, StyleSheet } from "react-native";
import React from "react";
import LayoutWithTopBar from "../../../../../../layout/LayoutWithTopBar";
import DefaultLayout from "@/layout/DefaultLayout";
import { FlatList } from "react-native-gesture-handler";
import Loader from "@/components/Loader";
import { useCharges } from "@/hooks/useCharges";
import useAuth from "@/hooks/useAuth";
import { ICharge } from "../../../../../../types/charges/charges";
import { router } from "expo-router";
import { ButtonLoader } from "@/components/ButtonLoader";
import { useSessionContext } from "@/hooks/useSessionContext";

type Props = {
  data: ICharge;
};

const PaymentCard = () => {
  const { user } = useSessionContext();
  const { chargesQuery } = useCharges({
    params: { idhousing: user.account.idhousing },
  });

  const Card = ({ data }: Props) => {
    const routeView: any = "/payment/" + data.id;
    return (
      <View
        className="p-5 m-3 rounded bg-white shadow-md"
        style={styles.cardShadow}
      >
        <Text className="text-xl font-bold">{data.name}</Text>
        <Text className="text-base text-gray-600">{data.description}</Text>
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
                    <Text>No hay cobros</Text>
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
  cardShadow: {
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
});

export default PaymentCard;
