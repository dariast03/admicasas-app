import { useColorScheme } from "nativewind";
import React, { useEffect } from "react";
import { Calendar, LocaleConfig } from "@/components/ui/calendar";
import DefaultLayout from "@/layout/DefaultLayout";
import { useSessionContext } from "@/hooks/useSessionContext";
import { useReserve } from "@/hooks/useReservation";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Colors from "@/constants/Colors";
import {
  BottomSheet,
  BottomSheetContent,
  BottomSheetHeader,
  BottomSheetOpenTrigger,
} from "@/components/ui/bottom-sheet";
import { BottomSheetView } from "@gorhom/bottom-sheet";
import Icon, { IconType } from "@/components/Icon";

LocaleConfig.defaultLocale = "es";
const Reservations = () => {
  const [selectedDates, setSelectedDates] = React.useState<Date[]>([]);
  const { user } = useSessionContext();
  const { reservationsQuery } = useReserve({
    params: { idcondominium: user.account.idcondominium },
  });
  const [bottomSheetVisible, setBottomSheetVisible] = React.useState(false);

  const handleDayPress = (day: any) => {
    const dateString = day.dateString;
    let newSelectedDates = [...selectedDates];
    if (newSelectedDates.includes(dateString)) {
      newSelectedDates = newSelectedDates.filter((date) => date !== dateString);
    } else {
      newSelectedDates.push(dateString);
    }

    setSelectedDates(newSelectedDates);
    setBottomSheetVisible(true);
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

  return (
    <DefaultLayout>
      <BottomSheet>
        <BottomSheetOpenTrigger asChild>
          <TouchableOpacity onPress={() => setBottomSheetVisible(true)}>
            <Calendar
              style={{
                borderRadius: 10,
                margin: 20,
                ...styles.shadowCard,
              }}
              onDayPress={handleDayPress}
              markingType="multi-dot"
              markedDates={markedDates}
            />
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
      </BottomSheet>
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
