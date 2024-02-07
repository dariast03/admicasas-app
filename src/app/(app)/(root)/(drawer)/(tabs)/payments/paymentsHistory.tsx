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
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

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
    <View className="p-4 border-b border-primario-400">
      {/* <TouchableOpacity onPress={openModal} className="cursor-pointer">
        <Text className="text-black">{chargeQuery.data?.name}</Text>
        <View className="flex-row">
          <Tag severity="info" value={item.state} />
        </View>
      </TouchableOpacity> */}
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
      {/* <FlatList
        data={paymentsQuery.data}
        renderItem={renderItem}
        keyExtractor={(item) => item.id || ""}
      /> */}
      <BottomSheet>
        <BottomSheetOpenTrigger asChild>
          <Button>{"Open"}</Button>
        </BottomSheetOpenTrigger>
        <BottomSheetContent>
          <BottomSheetHeader>
            <Text className="text-foreground text-xl font-bold text-center pb-1">
              Edit your profile
            </Text>
          </BottomSheetHeader>
          <BottomSheetView className="gap-5 pt-6">
            <View className="pb-2 gap-6">
              <View>
                <Text
                  className={"pb-2.5"}
                  //onPress={handleOnLabelPress(nameInputRef)}
                >
                  Name
                </Text>
                <BottomSheetTextInput
                  defaultValue="Pedro Duarte"
                  //ref={nameInputRef}
                />
              </View>
              <View>
                <Text
                  className={"pb-2.5"}
                  // onPress={handleOnLabelPress(usernameInputRef)}
                >
                  Username
                </Text>
                <BottomSheetTextInput
                  defaultValue="@peduarte"
                  // ref={usernameInputRef}
                />
              </View>
            </View>
            <View className={cn(Platform.OS === "android" && "pb-2")}>
              <BottomSheetCloseTrigger>
                <Text>Save Changes</Text>
              </BottomSheetCloseTrigger>
            </View>
          </BottomSheetView>
        </BottomSheetContent>
      </BottomSheet>
      {/* {modalVisible && (
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={closeModal}
        >
          <View className="flex items-center justify-center h-full">
            <View className="bg-white p-4 rounded border">
              <Text>Contenido del modal</Text>
              <Button title="Cerrar Modal" onPress={closeModal} />
            </View>
          </View>
        </Modal>
      )} */}
    </DefaultLayout>
  );
};

export default PaymentsHistory;
