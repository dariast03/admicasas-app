import { View, Text, RefreshControl } from "react-native";
import React, { useEffect, useState } from "react";

import DefaultLayout from "@/layout/DefaultLayout";
import { FlatList } from "react-native-gesture-handler";
import Loader from "@/components/Loader";
import { useCharges } from "@/hooks/useCharges";

import { ICharge } from "@/types/charges/charges";
import { router } from "expo-router";
import { ButtonLoader } from "@/components/ButtonLoader";

import Icon, { IconType } from "@/components/Icon";
import { useAppContext } from "@/hooks/useAppContext";
import SubTitle from "@/components/SubTitle";

import GlobalStyles from "@/constants/GlobalStyle";

const PaymentCard = () => {
  const [isRefreshing, setIsRefreshing] = useState(false);

  const { selectedHousing, tutorialPayment } = useAppContext();

  const { chargesPaginatedQuery } = useCharges({
    params: { idhousing: selectedHousing, type: "Payments" },
  });

  const dataChargesPaginated =
    chargesPaginatedQuery.data?.pages?.flatMap((page: any) => page.data) ?? [];

  const onRefresh = () => {
    setIsRefreshing(true);
    chargesPaginatedQuery.refetch();
  };

  useEffect(() => {
    if (isRefreshing && !chargesPaginatedQuery.isRefetching)
      setIsRefreshing(false);
  }, [chargesPaginatedQuery.isRefetching]);

  const RenderCardItem = ({ item }: { item: ICharge }) => {
    if (!item) return null;

    let routeView: any = "/payment/" + item.id;

    if (!tutorialPayment) {
      routeView = "/tutorialpayment/" + item.id;
    }

    return (
      <View
        className="p-5 m-3 rounded-lg bg-white dark:bg-primario-800 border border-primario-600 "
        style={GlobalStyles()}
      >
        <Text className="text-xl font-bold text-primario-600 dark:text-white">
          {item.name}
        </Text>

        <Text className="text-base text-gray-600 dark:text-white">
          {item.description}
        </Text>
        <View className="border-b border-stone-400 dark:border-white my-5"></View>
        <Text className="text-base text-gray-600 dark:text-white font-semibold">
          Fecha limite
        </Text>
        <View className="flex-row items-center mt-2">
          {new Date(item.end) < new Date() ? (
            <Icon
              icon={{
                type: IconType.FontAweomseIcon,
                name: "calendar-times-o",
              }}
              color={"red"}
            />
          ) : (
            <Icon
              icon={{
                type: IconType.FontAweomseIcon,
                name: "calendar",
              }}
            />
          )}

          <Text
            className={`text-red-600 font-black ${
              new Date(item.end) < new Date()
                ? "text-red-600 font-black"
                : "text-stone-400 dark:text-white"
            }`}
          >
            {item?.end?.toLocaleDateString("es-ES")}
          </Text>
        </View>

        <Text className="text-lg text-gray-700 dark:text-white mt-2 mb-4">
          Monto a pagar: {item.amount}
        </Text>
        <ButtonLoader onPress={() => router.push(routeView)}>
          <Text className="text-center font-bold text-white">PAGAR</Text>
        </ButtonLoader>
      </View>
    );
  };

  const renderCharge = ({ item }: { item: ICharge }) => (
    <RenderCardItem item={item} />
  );

  return (
    <DefaultLayout>
      {!chargesPaginatedQuery.isLoading ? (
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
          contentContainerClassName="p-4"
          onEndReachedThreshold={0.01}
          ListFooterComponent={
            chargesPaginatedQuery.isFetchingNextPage ? (
              <Text className="text-center text-primario-600">Cargado...</Text>
            ) : null
          }
          data={dataChargesPaginated}
          renderItem={renderCharge}
          keyExtractor={(item, index) => `${item.id}-${index}`}
          ListEmptyComponent={() => (
            <>
              <SubTitle text="No hay pagos pendientes en este momento." />
            </>
          )}
        />
      ) : (
        <Loader name="Pagos" />
      )}
    </DefaultLayout>
  );
};

export default PaymentCard;
