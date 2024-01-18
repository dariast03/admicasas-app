import { View, Text } from "react-native";
import React from "react";
import LayoutWithTopBar from "../../../../../../layout/LayoutWithTopBar";
import { FlatList } from "react-native-gesture-handler";
import { usePayments } from "@/hooks/usePayments";

import DefaultLayout from "@/layout/DefaultLayout";
import { IPayments } from "@/types/payments/payments";
import { useCharges } from "@/hooks/useCharges";
import { useSessionContext } from "@/hooks/useSessionContext";

const PaymentItem = ({ item }: { item: IPayments }) => {
  const { chargeQuery } = useCharges({ id: item.idcharge || "" });

  return (
    <View className="p-4 border-b border-primario-600">
      <Text>{chargeQuery.data?.name}</Text>
      <Text className="text-sm text-primario-500">{item.state}</Text>
    </View>
  );
};

const PaymentsHistory = () => {
  const { user } = useSessionContext();
  const { paymentsQuery } = usePayments({
    params: { idhousing: user.account.idhousing },
  });

  const renderItem = ({ item }: { item: IPayments }) => (
    <PaymentItem item={item} />
  );

  return (
    <DefaultLayout>
      <FlatList
        data={paymentsQuery.data}
        renderItem={renderItem}
        keyExtractor={(item) => item.id || ""}
      />
    </DefaultLayout>
  );
};

export default PaymentsHistory;
