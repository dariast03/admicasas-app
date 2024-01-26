import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { usePayments } from "@/hooks/usePayments";
import { useCharges } from "@/hooks/useCharges";
import { useSessionContext } from "@/hooks/useSessionContext";
import DefaultLayout from "@/layout/DefaultLayout";
import { IPayments } from "@/types/payments/payments";
import { Button } from "react-native";
import { useAppContext } from "@/hooks/useAppContext";
import Tag from "@/components/Tag";

interface typePayments {
  id?: string | undefined;
  idcharge?: string;
  state: string;
}

const PaymentItem = ({
  item,
  openModal,
}: {
  item: typePayments;
  openModal: () => void;
}) => {
  console.log("🚀 ~ item:", item);
  const { chargeQuery } = useCharges({ id: item.idcharge || "" });

  return (
    <View style={styles.itemContainer}>
      <TouchableOpacity onPress={openModal}>
        <Text>{chargeQuery.data?.name}</Text>
        <View className="flex-row items-center">
          <Tag value={item.state} severity="info" />
        </View>
      </TouchableOpacity>
    </View>
  );
};

const PaymentsHistory = () => {
  const { user } = useSessionContext();
  const [modalVisible, setModalVisible] = useState(false);
  const { selectedHousing } = useAppContext();

  const openModal = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  const { paymentsQuery } = usePayments({
    params: { idhousing: selectedHousing },
  });

  const renderItem = ({ item }: { item: IPayments }) => (
    <PaymentItem item={item} openModal={openModal} />
  );

  return (
    <DefaultLayout>
      <FlatList
        data={paymentsQuery.data}
        renderItem={renderItem}
        keyExtractor={(item) => item.id || ""}
      />

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={closeModal}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text>Contenido del modal</Text>
            <Button title="Cerrar Modal" onPress={closeModal} />
          </View>
        </View>
      </Modal>
    </DefaultLayout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
  },
  itemContainer: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(0, 0, 0, 0.1)",
  },
  text: {
    fontSize: 14,
    color: "black",
  },
});

export default PaymentsHistory;
