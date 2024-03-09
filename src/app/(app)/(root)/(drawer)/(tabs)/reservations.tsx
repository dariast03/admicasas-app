import React, { useRef, useState } from "react";
import { Calendar, LocaleConfig } from "@/components/ui/calendar";
import DefaultLayout from "@/layout/DefaultLayout";
import { useSessionContext } from "@/hooks/useSessionContext";
import { useReserve } from "@/hooks/useReservation";
import {
  FlatList,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Colors from "@/constants/Colors";
import {
  BottomSheet,
  BottomSheetCloseTrigger,
  BottomSheetContent,
  BottomSheetContentRef,
  BottomSheetFlatList,
  BottomSheetHeader,
  BottomSheetOpenTrigger,
  BottomSheetView,
} from "@/components/ui/bottom-sheet";

import Icon, { IconType } from "@/components/Icon";

import { Button } from "@/components/ui/button";

import { useRouter } from "expo-router";
import { IReservation } from "@/types/reserve/reserve";
import { useAreas } from "@/hooks/useAreas";
import Tag from "@/components/Tag";
import { cn } from "@/lib/utils";
import SkeletonFlatList from "@/components/SkeletonFlatList";
import { isSameDay, startOfDay } from "date-fns";
import { DateData } from "react-native-calendars";
import { Skeleton } from "@/components/ui/skeleton";
LocaleConfig.defaultLocale = "es";
const Reservations = () => {
  const router = useRouter();
  const { user } = useSessionContext();

  const [selectedDate, setSelectedDate] = useState<Date>();

  const { reservationsQuery } = useReserve({
    params: {
      idcondominium: user.account.idcondominium,
      idhousing: user.account.idhousing,
    },
  });

  const dataReservations =
    reservationsQuery.data?.pages?.flatMap((page) => page.data) ?? [];

  const visible = useRef<BottomSheetContentRef>(null);
  const [reservationsData, setReservationsData] = useState<IReservation[]>([]);

  const handleDayPress = (date: DateData) => {
    const { year, month, day } = date;
    setSelectedDate(new Date(year, month - 1, day));

    visible.current?.present();
  };

  const filterReservation = dataReservations.filter((x) => {
    if (!selectedDate) return [];

    const { start, end } = x;

    const selectedDateUTC = startOfDay(selectedDate);
    const startUTC = startOfDay(start);
    const endUTC = startOfDay(end);

    const isSameDayStart = selectedDateUTC.getTime() === startUTC.getTime();
    const isSameDayEnd = selectedDateUTC.getTime() === endUTC.getTime();

    return isSameDayStart || isSameDayEnd;
  });

  const markedDates: { [key: string]: any } = {};

  dataReservations.forEach((reservation, index) => {
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

  const renderItem = ({ item }: { item: IReservation }) => (
    <View className="flex-1 pb-2 gap-6">
      <View className="p-2">
        <View className="flex-row">
          <View className="flex-row">
            <Icon
              icon={{
                type: IconType.FontAweomseIcon,
                name: "check-square-o",
              }}
            />
            <Text className="font-semibold mr-2 text-primario-600">Area:</Text>
          </View>
          <Text className={"pb-2.5"}>{item.areaName.toLocaleUpperCase()}</Text>
        </View>
        <View className="flex-row">
          <View className="flex-row">
            <Icon
              icon={{
                type: IconType.FontAweomseIcon,
                name: "calendar",
              }}
            />
            <Text className="font-semibold mr-2 text-primario-600">
              Fecha Inicio:
            </Text>
          </View>
          <Text className={"pb-2.5"}>{item.start.toLocaleString()}</Text>
        </View>
        <View className="flex-row">
          <View className="flex-row">
            <Icon
              icon={{
                type: IconType.FontAweomseIcon,
                name: "calendar",
              }}
            />
            <Text className="font-semibold mr-2 text-primario-600">
              Fecha Fin:
            </Text>
          </View>
          <Text className={"pb-2.5"}>{item.end.toLocaleString()}</Text>
        </View>
      </View>
    </View>
  );

  const handlePress = () => {
    router.push("/(app)/(root)/(screens)/reservation/create");
  };

  const RenderItemReservation = ({ item }: { item: IReservation }) => {
    const { areaCommonQuery } = useAreas({
      id: item.idarea,
    });

    const navigateToReservation = () => {
      router.push(`/(app)/(root)/(screens)/reservation/${item.id}`);
    };

    return (
      <TouchableOpacity onPress={navigateToReservation}>
        <View className="flex-row justify-between border-b border-primario-600 p-4">
          {areaCommonQuery.isLoading ? (
            <Skeleton className="bg-primario-100 h-4 w-32" />
          ) : (
            <Text className="text-black text-sm">
              {areaCommonQuery.data?.name.toLocaleUpperCase()}
            </Text>
          )}
          <View className="flex-row">
            <Tag
              severity={
                item.state === "Aprobado"
                  ? "success"
                  : item.state === "Pendiente"
                  ? "warning"
                  : item.state === "Rechazado"
                  ? "error"
                  : "info"
              }
              value={item.state}
            />
          </View>
        </View>
      </TouchableOpacity>
    );
  };
  const renderReservation = ({ item }: { item: IReservation }) => (
    <RenderItemReservation item={item} />
  );
  const itemSeparator = () => {
    return <View className="border-b-[0.5] border-primario-600"></View>;
  };

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
            <FlatList
              data={filterReservation}
              renderItem={renderItem}
              keyExtractor={(item) => item.id || ""}
              ItemSeparatorComponent={() => (
                <View className="border-primario-600 border-b" />
              )}
            />

            <View className={cn(Platform.OS === "android" && "pb-2 pr-2")}>
              <BottomSheetCloseTrigger>
                <Text className="text-red-500 text-right">Cerrar</Text>
              </BottomSheetCloseTrigger>
            </View>
          </BottomSheetView>
        </BottomSheetContent>
      </BottomSheet>
      <FlatList
        className="mb-5"
        data={null}
        renderItem={null}
        onEndReached={() => {
          reservationsQuery.fetchNextPage();
        }}
        onEndReachedThreshold={1}
        ListFooterComponent={
          reservationsQuery.isFetchingNextPage ? (
            <Text className="text-center text-primario-600">Cargado...</Text>
          ) : null
        }
        ListHeaderComponent={
          <>
            <View className="flex-row justify-around items-center p-2  mt-2">
              <View className="items-center">
                <Text className="text-primario-600 text-2xl">Reservas</Text>
              </View>
              <Button
                size={"sm"}
                className="bg-primario-600"
                onPress={handlePress}
              >
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
              onDayPress={handleDayPress}
              markingType="multi-dot"
              markedDates={markedDates}
              displayLoadingIndicator={reservationsQuery.isLoading}
            />

            {reservationsQuery.isLoading ? (
              <SkeletonFlatList title="Mis Reservas" />
            ) : (
              <FlatList
                className="p-1 m-4"
                ListHeaderComponent={
                  <Text className="text-center text-lg text-primario-600 rounded-t-md font-semibold ">
                    Mis Reservas
                  </Text>
                }
                data={dataReservations}
                renderItem={renderReservation}
                keyExtractor={(item) => item.id || ""}
                ItemSeparatorComponent={() => itemSeparator()}
              />
            )}
          </>
        }
      />

      {/* </View> */}
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
