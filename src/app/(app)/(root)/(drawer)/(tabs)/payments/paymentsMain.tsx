import { View, Text, Button, StyleSheet, RefreshControl } from "react-native";
import React, { useEffect, useState } from "react";

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
import SubTitle from "@/components/SubTitle";
import Colors from "@/constants/Colors";
import { useColorScheme } from "nativewind";
import GlobalStyles from "@/constants/GlobalStyle";

type Props = {
  data: ICharge;
};

const PaymentCard = () => {
  const { user } = useSessionContext();
  const [isRefreshing, setIsRefreshing] = useState(false);

  const { selectedHousing } = useAppContext();
  const { chargesQuery } = useCharges({
    params: { idhousing: selectedHousing },
  });

  const onRefresh = () => {
    setIsRefreshing(true);
    chargesQuery.refetch();
  };

  useEffect(() => {
    if (isRefreshing && !chargesQuery.isRefetching) setIsRefreshing(false);
  }, [chargesQuery.isRefetching]);

  const Card = ({ data }: Props) => {
    const routeView: any = "/payment/" + data.id;
    return (
      <View
        className="p-5 m-3 rounded-lg bg-white dark:bg-primario-600"
        style={GlobalStyles()}
      >
        <Text className="text-xl font-bold text-primario-600 dark:text-white">
          {data.name}
        </Text>
        <Text className="text-base text-gray-600 dark:text-white">
          {data.description}
        </Text>
        <View className="border-b border-stone-400 dark:border-white my-5"></View>
        <Text className="text-base text-gray-600 dark:text-white">
          Fecha limite
        </Text>
        <View className="flex-row items-center">
          <Icon
            icon={{
              type: IconType.AntDesign,
              name: "calendar",
            }}
          />
          <Text className="text-stone-400 dark:text-white my-2">
            {data?.end?.toLocaleDateString()}
          </Text>
        </View>

        <Text className="text-lg text-gray-700 dark:text-white my-3">
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
        refreshControl={
          <RefreshControl
            refreshing={isRefreshing && chargesQuery.isRefetching}
            onRefresh={onRefresh}
          />
        }
        ListHeaderComponent={
          <>
            <FlatList
              data={chargesQuery.data}
              renderItem={({ item }) => <Card data={item} />}
              keyExtractor={(item) => item.id || ""}
              ListEmptyComponent={() => (
                <>
                  {chargesQuery.isLoading ? (
                    <Loader name="Pagos" />
                  ) : (
                    <SubTitle text="No hay pagos pendientes en este momento." />
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

export default PaymentCard;
