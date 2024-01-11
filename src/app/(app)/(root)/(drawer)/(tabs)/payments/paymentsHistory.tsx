import { View, Text } from "react-native";
import React from "react";
import LayoutWithTopBar from "../../../../../../layout/LayoutWithTopBar";
import { FlatList } from "react-native-gesture-handler";
import { usePayments } from "@/hooks/usePayments";

const paymentsHistory = () => {
  // const { paymentQuery,  } = usePayments();

  const payments = [
    { name: "Pago 1", status: "Completado" },
    { name: "Pago 2", status: "Pendiente" },
    // Agrega más pagos aquí
  ];
  const renderItem = ({ item }) => (
    <View className="p-4 border-b border-gray-200">
      <Text className="text-lg font-bold">{item.name}</Text>
      <Text className="text-sm text-gray-500">{item.status}</Text>
    </View>
  );
  return (
    <FlatList
      data={payments}
      renderItem={renderItem}
      keyExtractor={(item) => item.name}
    />
  );
};

export default paymentsHistory;
