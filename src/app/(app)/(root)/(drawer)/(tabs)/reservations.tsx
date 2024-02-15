import { useColorScheme } from "nativewind";
import React, { useEffect, useMemo, useRef } from "react";
import { Calendar, LocaleConfig } from "@/components/ui/calendar";
import DefaultLayout from "@/layout/DefaultLayout";
import { useSessionContext } from "@/hooks/useSessionContext";
import { useReserve } from "@/hooks/useReservation";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Colors from "@/constants/Colors";
import {
  BottomSheet,
  BottomSheetContent,
  BottomSheetContentRef,
  BottomSheetFlatList,
  BottomSheetHeader,
  BottomSheetOpenTrigger,
  BottomSheetView,
} from "@/components/ui/bottom-sheet";

import Icon, { IconType } from "@/components/Icon";
import {} from "react-native-calendars";
import { IReservation } from "@/types/reserve/reserve";

LocaleConfig.defaultLocale = "es";
const Reservations = () => {
  const [selectedDates, setSelectedDates] = React.useState<Date[]>([]);
  const { user } = useSessionContext();
  const { reservationsQuery } = useReserve({
    params: { idcondominium: user.account.idcondominium },
  });
  const visible = useRef<BottomSheetContentRef>(null);

  const handleDayPress = (date: any) => {
    // const { reservationsQuery } = useReserve({
    //   params: { idcondominium: user.account.idcondominium, selectedDate: date },
    // });
    visible.current?.present();
  };

  const markedDates: { [key: string]: any } = {};

  reservationsQuery.data?.forEach((reservation, index) => {
    const dateString = new Date(reservation.start).toISOString().split("T")[0];
    if (!markedDates[dateString]) {
      markedDates[dateString] = {
        dots: [{ key: dateString, color: "blue" }],
      };
    } else {
      markedDates[dateString].dots.push({
        key: `${dateString}-${index}`,
        color: "red",
      });
    }
  });

  const renderItem = ({ item }: { item: any }) => (
    <View className="flex-1">
      <Text>{item.idcondominium}</Text>
    </View>
  );

  return (
    <DefaultLayout>
      {/* <BottomSheet>
        <BottomSheetContent ref={visible}>
          <BottomSheetHeader>
            <Text className="text-foreground text-xl font-bold text-center pb-1 text-primario-600">
              Reservas
            </Text>
          </BottomSheetHeader>

          <BottomSheetView className="gap-5 pt-6">
            <BottomSheetFlatList
              data={reservationsQuery.data}
              renderItem={renderItem}
            />
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
                <Text className={"pb-2.5"}>dd</Text>
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
                <Text>ddfda</Text>
              </View>
            </View>
          </BottomSheetView>
        </BottomSheetContent>
      </BottomSheet> */}
      <BottomSheet>
        <BottomSheetContent ref={visible}>
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
                <Text className={"pb-2.5"}>"dfd</Text>
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

                <Text>dfd</Text>
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
      <Calendar
        style={{
          borderRadius: 10,
          margin: 20,
          ...styles.shadowCard,
        }}
        onDayPress={(day) => handleDayPress(day.dateString)}
        markingType="multi-dot"
        markedDates={markedDates}
      />
    </DefaultLayout>
  );
};
const styles = StyleSheet.create({
  shadowCard: {
    shadowColor: Colors.primario[600],
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.2,
    shadowRadius: 5.62,
    elevation: 6,
  },
});
export default Reservations;
