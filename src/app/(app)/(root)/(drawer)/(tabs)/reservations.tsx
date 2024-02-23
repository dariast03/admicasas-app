import { useColorScheme } from "nativewind";
import React, { useEffect, useMemo, useRef } from "react";
import { Calendar, LocaleConfig } from "@/components/ui/calendar";
import DefaultLayout from "@/layout/DefaultLayout";
import { useSessionContext } from "@/hooks/useSessionContext";
import { useReserve } from "@/hooks/useReservation";
import {
  FlatList,
  ListRenderItem,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
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

import { Button } from "@/components/ui/button";

import { useNavigation } from "@react-navigation/native";
import { useRouter } from "expo-router";
import { IReservation } from "@/types/reserve/reserve";
import { useAreas } from "@/hooks/useAreas";
import Tag from "@/components/Tag";

LocaleConfig.defaultLocale = "es";
const Reservations = () => {
  const router = useRouter();
  const { user } = useSessionContext();
  const { reservationsQuery } = useReserve({
    params: { idcondominium: user.account.idcondominium },
  });
  const visible = useRef<BottomSheetContentRef>(null);

  const handleDayPress = (date: Date) => {
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
      <Text>{item.id}</Text>
    </View>
  );

  const handlePress = () => {
    router.push("/(app)/(root)/(screens)/reservation");
  };

  const RenderItemReservation = ({ item }: { item: IReservation }) => {
    const { areaCommonQuery } = useAreas({
      id: item.idarea,
    });
    return (
      <TouchableOpacity>
        <View className="mx-6" style={styles.shadowCard}>
          <View className="flex-row justify-between border-b border-primario-600 p-4">
            <Text className="text-black">{areaCommonQuery.data?.name}</Text>
            <View className="flex-row">
              <Tag severity="info" value={item.state} />
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  };
  const renderReservation = ({ item }: { item: IReservation }) => (
    <RenderItemReservation item={item} />
  );

  return (
    <DefaultLayout>
      <BottomSheet>
        <BottomSheetContent ref={visible}>
          <BottomSheetHeader>
            <Text className="text-foreground text-xl font-bold text-center pb-1 text-primario-600">
              Reservas
            </Text>
          </BottomSheetHeader>

          <BottomSheetView className="gap-5 pt-6">
            <View className="pb-2 gap-6">
              <View className="flex-row justify-around">
                <View className="flex-row">
                  <Icon
                    icon={{
                      type: IconType.FontAweomseIcon,
                      name: "check-square-o",
                    }}
                  />
                  <Text className={"pb-2.5"}>Piscina</Text>
                </View>
                <Text>{new Date(Date.now()).toDateString()}</Text>
              </View>
              <View className="flex-row justify-around">
                <View className="flex-row">
                  <Icon
                    icon={{
                      type: IconType.FontAweomseIcon,
                      name: "check-square-o",
                    }}
                  />
                  <Text>Parrillero</Text>
                </View>

                <Text>{new Date(Date.now()).toDateString()}</Text>
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

      <View className="flex-row justify-between items-center p-2 mx-4 mt-2">
        <View className="flex-1 justify-center items-center">
          <Text className="text-primario-600 text-2xl">Reservas</Text>
        </View>
        <Button size={"sm"} className="bg-primario-600" onPress={handlePress}>
          <Icon
            color={"white"}
            size={12}
            icon={{
              type: IconType.FontAweomseIcon,
              name: "plus",
            }}
          />
          <Text className="text-white">Nuevo</Text>
        </Button>
      </View>

      <Calendar
        style={{
          borderRadius: 10,
          margin: 20,
          ...styles.shadowCard,
        }}
        onDayPress={(day) => handleDayPress(new Date(day.dateString))}
        markingType="multi-dot"
        markedDates={markedDates}
      />
      <FlatList
        data={reservationsQuery.data}
        renderItem={renderReservation}
        keyExtractor={(item) => item.id || ""}
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
