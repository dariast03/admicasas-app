import { View, Text, TouchableOpacity, RefreshControl } from "react-native";
import React from "react";
import DefaultLayout from "@/layout/DefaultLayout";
import { FontAwesome } from "@expo/vector-icons";
import { Link, Stack, router } from "expo-router";
import { useVisits } from "@/hooks/useVisits";
import { FlatList } from "react-native-gesture-handler";
import Tag from "@/components/Tag";
import { useAppContext } from "@/hooks/useAppContext";
import { useSessionContext } from "@/hooks/useSessionContext";
import clsx from "clsx";
import Colors from "@/constants/Colors";
import Icon, { IconType } from "@/components/Icon";
import SubTitle from "@/components/SubTitle";
import { useHousing } from "@/hooks/useHousing";
import { useColorScheme } from "nativewind";

const Visits = () => {
  const { selectedHousing } = useAppContext();
  const { user } = useSessionContext();

  const { visitsQuery } = useVisits({
    params: {
      idhousing: selectedHousing,
    },
    query: ["visitsQuery"],
  });

  const { housingsByPropietaryQuery } = useHousing({
    params: {
      idproprietary: user.id,
    },
  });

  const isDark = useColorScheme().colorScheme === "dark";

  if (visitsQuery.isPending) return;
  {
    <DefaultLayout>
      <Text className="dark:text-white">A LA ESPERA.</Text>;
    </DefaultLayout>;
  }
  if (visitsQuery.isLoading) return <Text>CARGANDO..</Text>;
  if (visitsQuery.isError) return <Text>ERROR..</Text>;

  const visits = visitsQuery.data;

  return (
    <DefaultLayout>
      <FlatList
        data={visits}
        ListHeaderComponent={() => (
          <>
            <Text className="text-center text-primario-600 dark:text-white text-lg p-5">
              Mis Visitas
            </Text>
          </>
        )}
        refreshControl={
          <RefreshControl
            refreshing={visitsQuery.isRefetching}
            onRefresh={visitsQuery.refetch}
          />
        }
        contentContainerClassName="p-2"
        renderItem={({ item, index }) => (
          <>
            <Link href={`/visits/form/${item.id}`} asChild>
              <TouchableOpacity activeOpacity={0.6}>
                <View
                  className={clsx([
                    " p-4 flex-row justify-between",
                    {
                      "bg-primario-100  dark:bg-primario-600 ": index % 2 == 0,
                      "bg-primario-50  dark:bg-primario-500 ": index % 2 != 0,
                    },
                  ])}
                >
                  <Text className="dark:text-white">
                    {item.name.toLocaleUpperCase()}
                  </Text>

                  <Text className="dark:text-white">
                    {item.datevisit.toLocaleDateString()}
                  </Text>
                </View>
              </TouchableOpacity>
            </Link>
          </>
        )}
        ItemSeparatorComponent={() => <View className="mb-2" />}
        ListEmptyComponent={() => (
          <SubTitle
            text={`No hay visistas registradas hasta el momento para la vivienda ${
              housingsByPropietaryQuery.data?.find(
                (x) => x.id == selectedHousing
              )?.code
            }`}
          />
        )}
      />

      <View className="absolute bottom-10 right-10">
        <Link href={"/visits/form/create"} asChild>
          <TouchableOpacity activeOpacity={0.8}>
            <View className="bg-primario-400 dark:bg-primario-600 w-16 h-16 rounded-full items-center justify-center">
              <FontAwesome name="plus" size={20} color="#fff" />
            </View>
          </TouchableOpacity>
        </Link>
      </View>
    </DefaultLayout>
  );
};

export default Visits;
