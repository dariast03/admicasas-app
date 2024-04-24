import React, { useEffect, useMemo, useRef, useState } from "react";
import { Calendar, LocaleConfig } from "@/components/ui/calendar";
import DefaultLayout from "@/layout/DefaultLayout";
import { useSessionContext } from "@/hooks/useSessionContext";
import { useReserve } from "@/hooks/useReservation";
import {
  FlatList,
  Platform,
  RefreshControl,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import {
  BottomSheet,
  BottomSheetCloseTrigger,
  BottomSheetContent,
  BottomSheetContentRef,
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
import { startOfDay } from "date-fns";
import { DateData } from "react-native-calendars";
import { Skeleton } from "@/components/ui/skeleton";
import { useColorScheme } from "nativewind";
import { AppContext } from "@/context/AppContext";
import { useAppContext } from "@/hooks/useAppContext";
import SubTitle from "@/components/SubTitle";
LocaleConfig.defaultLocale = "es";

const Reservations = () => {
  const router = useRouter();
  const { user } = useSessionContext();
  const { selectedHousing } = useAppContext();

  const isDark = useColorScheme().colorScheme === "dark";

  const [selectedDate, setSelectedDate] = useState<Date>();
  const [selectedMonth, setSelectedMonth] = useState<Date>(new Date());

  const { reservationsHousingQuery, reservationsCondominiumQuery } = useReserve(
    {
      params: {
        idcondominium: user.account.idcondominium,
        idhousing: selectedHousing,
        selectedDate: selectedMonth,
      },
    }
  );

  const dataReservations =
    reservationsHousingQuery.data?.pages?.flatMap((page: any) => page.data) ??
    [];

  // console.log(reservationsHousingQuery.data?.pages.length);

  const filteredReservationsByMe =
    reservationsHousingQuery.data?.pages?.flatMap((page: any) => page.data) ??
    [];

  const visible = useRef<BottomSheetContentRef>(null);

  //const [reservationsData, setReservationsData] = useState<IReservation[]>([]);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleDayPress = (date: DateData) => {
    const { year, month, day } = date;
    setSelectedDate(new Date(year, month - 1, day));
    visible.current?.present();
  };

  const filterReservation = reservationsCondominiumQuery.data?.filter((x) => {
    if (!selectedDate) return [];

    const { start, end } = x;

    const selectedDateUTC = startOfDay(selectedDate);
    const startUTC = startOfDay(start);
    const endUTC = startOfDay(end);

    const isSameDayStart = selectedDateUTC.getTime() === startUTC.getTime();
    const isSameDayEnd = selectedDateUTC.getTime() === endUTC.getTime();

    return isSameDayStart || isSameDayEnd;
  });

  const reservationCalendar = useMemo(() => {
    const markedDates: { [key: string]: any } = {};
    reservationsCondominiumQuery.data?.forEach((reservation, index) => {
      //dataReservations.forEach((reservation, index) => {
      const dateString = new Date(reservation.start)
        .toISOString()
        .split("T")[0];

      if (!markedDates[dateString]) {
        markedDates[dateString] = {
          dots: [
            {
              key: dateString,
              color: reservation.idhousing === selectedHousing ? "red" : "blue",
            },
          ],
        };
        //E4EA60 E4EA60
      } else {
        markedDates[dateString].dots.push({
          key: `${dateString}-${index}`,
          color: reservation.idhousing === selectedHousing ? "red" : "blue",
        });
      }
    });
    return markedDates;
  }, [selectedMonth, selectedHousing, reservationsCondominiumQuery.data]);

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
            <Text className="font-semibold mr-2 text-primario-600 dark:text-white">
              Area:
            </Text>
          </View>
          <Text className={"pb-2.5 dark:text-white"}>
            {item.areaName.toLocaleUpperCase()}
          </Text>
        </View>
        <View className="flex-row">
          <View className="flex-row">
            <Icon
              icon={{
                type: IconType.FontAweomseIcon,
                name: "calendar",
              }}
            />
            <Text className="font-semibold mr-2 text-primario-600 dark:text-white">
              Fecha Inicio:
            </Text>
          </View>
          <Text className={"pb-2.5 dark:text-white"}>
            {item.start.toLocaleString()}
          </Text>
        </View>
        <View className="flex-row">
          <View className="flex-row">
            <Icon
              icon={{
                type: IconType.FontAweomseIcon,
                name: "calendar",
              }}
            />
            <Text className="font-semibold mr-2 text-primario-600 dark:text-white">
              Fecha Fin:
            </Text>
          </View>
          <Text className={"pb-2.5 dark:text-white"}>
            {item.end.toLocaleString()}
          </Text>
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
        <View className="flex-row justify-between border-b items-center border-primario-600 p-2">
          {areaCommonQuery.isLoading ? (
            <Skeleton className="bg-gray-200 dark:bg-primario-600 h-4 w-32" />
          ) : (
            <View>
              <Text className="text-black dark:text-white text-sm ">
                {areaCommonQuery.data?.name.toLocaleUpperCase()}
              </Text>
              <Text className="text-black dark:text-white text-sm font-light">
                {item.start.toLocaleDateString()} -{" "}
                {item.end.toLocaleDateString()}
              </Text>
            </View>
          )}

          <Tag
            severity={
              item.state === "Aprobado"
                ? "success"
                : item.state === "Pendiente"
                ? "warning"
                : item.state === "Rechazado"
                ? "error"
                : item.state === "PorPagar"
                ? "primary"
                : "info"
            }
            value={item.state}
          />
        </View>
      </TouchableOpacity>
    );
  };
  const renderReservation = ({ item }: { item: IReservation }) => (
    <RenderItemReservation item={item} />
  );
  const itemSeparator = () => {
    return (
      <View className="border-b-[0.5] border-primario-600 dark:border-white"></View>
    );
  };

  const onRefresh = () => {
    setIsRefreshing(true);
    reservationsHousingQuery.refetch();
    reservationsCondominiumQuery.refetch();
  };

  useEffect(() => {
    if (isRefreshing && !reservationsHousingQuery.isRefetching)
      setIsRefreshing(false);
  }, [reservationsHousingQuery.isRefetching]);

  return (
    <DefaultLayout>
      <BottomSheet>
        <BottomSheetOpenTrigger>
          <View></View>
        </BottomSheetOpenTrigger>
        <BottomSheetContent ref={visible}>
          <BottomSheetHeader>
            <Text className="text-foreground text-xl font-bold text-center pb-1 text-primario-600 dark:text-white">
              Reservas
            </Text>
          </BottomSheetHeader>
          <BottomSheetView className="gap-5 pt-6">
            <View className="pb-2 gap-6">
              <FlatList
                data={filterReservation}
                renderItem={renderItem}
                keyExtractor={(item) => item.id || ""}
                ItemSeparatorComponent={() => (
                  <View className="border-primario-600 dark:border-white border-b" />
                )}
              />
              <View className={cn(Platform.OS === "android" && "pb-2 pr-2")}>
                <BottomSheetCloseTrigger>
                  <Text className="text-red-500 text-right font-bold">
                    Cerrar
                  </Text>
                </BottomSheetCloseTrigger>
              </View>
            </View>
          </BottomSheetView>
        </BottomSheetContent>
      </BottomSheet>

      <FlatList
        className="p-2"
        onEndReached={() => {
          reservationsHousingQuery.fetchNextPage();
        }}
        refreshControl={
          <RefreshControl
            refreshing={isRefreshing && reservationsHousingQuery.isRefetching}
            onRefresh={onRefresh}
          />
        }
        onEndReachedThreshold={0.1}
        ListFooterComponent={
          reservationsHousingQuery.isFetchingNextPage ? (
            <Text className="text-center text-primario-600">Cargado...</Text>
          ) : null
        }
        ListHeaderComponent={
          <>
            <View className="flex-row justify-around items-center p-2  mt-2">
              <View className="items-center">
                <Text className="text-primario-600 dark:text-white text-xl font-bold">
                  RESERVAS
                </Text>
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

            <View className="px-6">
              <Text className="dark:text-white text-xs">
                Mis reservas{" "}
                <View
                  className="w-2 h-2 rounded-full"
                  style={{
                    backgroundColor: "red",
                  }}
                ></View>
              </Text>
            </View>

            <View className="px-6">
              <Text className="dark:text-white text-xs">
                Reservas{" "}
                <View
                  className="w-2 h-2 rounded-full"
                  style={{
                    backgroundColor: "blue",
                  }}
                ></View>
              </Text>
            </View>

            <Calendar
              style={{
                borderRadius: 10,
                margin: 20,
                ...styles.shadowCard,
              }}
              onDayPress={handleDayPress}
              markingType="multi-dot"
              markedDates={reservationCalendar}
              displayLoadingIndicator={reservationsCondominiumQuery.isLoading}
              onMonthChange={(date) => {
                setSelectedMonth(new Date(date.dateString));
              }}
            />
            {reservationsHousingQuery.isLoading ? (
              <SkeletonFlatList title="Mis Reservas" />
            ) : (
              <Text className="text-center text-primario-600 dark:text-white mb-2">
                MIS RESERVAS
              </Text>
            )}
          </>
        }
        data={filteredReservationsByMe}
        renderItem={renderReservation}
        keyExtractor={(item) => item.id || ""}
        ItemSeparatorComponent={() => itemSeparator()}
        ListEmptyComponent={() => (
          <SubTitle
            text={"No se han registrado reservas durante el mes actual"}
          />
        )}
      />

      {/* </View> */}
    </DefaultLayout>
  );
};
const styles = StyleSheet.create({
  shadowCard: {
    shadowColor: "#000",
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
