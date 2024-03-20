import { View, Text, TouchableOpacity, RefreshControl } from "react-native";
import React from "react";
import DefaultLayout from "@/layout/DefaultLayout";
import { FontAwesome } from "@expo/vector-icons";
import { Link, Stack, router } from "expo-router";
import { useIncidents } from "@/hooks/useIncident";
import { FlatList } from "react-native-gesture-handler";
import Tag from "@/components/Tag";
import { IIncident } from "@/types/Incidents/incidents";
import { useAppContext } from "@/hooks/useAppContext";
import { useHousing } from "@/hooks/useHousing";
import { useSessionContext } from "@/hooks/useSessionContext";
import { statusColorIncident } from "@/data/statusColor";
import Colors from "@/constants/Colors";
import Icon, { IconType } from "@/components/Icon";
import SubTitle from "@/components/SubTitle";
import { useColorScheme } from "nativewind";

const Incidents = () => {
  const { selectedHousing } = useAppContext();
  const { user } = useSessionContext();
  const isDark = useColorScheme().colorScheme === "dark";
  const { incidentsQuery } = useIncidents({
    params: {
      idhousing: selectedHousing,
    },
    query: ["incidentsQuery"],
  });

  const { housingsByPropietaryQuery } = useHousing({
    params: {
      idproprietary: user.id,
    },
  });

  if (incidentsQuery.isLoading) return <Text>CARGANDO..</Text>;

  return (
    <DefaultLayout>
      <Stack.Screen
        options={{
          headerShadowVisible: false,
          headerTitleAlign: "center",

          title: "Incidentes",
          headerStyle: {
            backgroundColor: isDark
              ? Colors.primario[800]
              : Colors.primario[600],
          },
          headerTintColor: "white",
          headerLeft: () => (
            <Icon
              color={"white"}
              icon={{
                type: IconType.Ionicon,
                name: "chevron-back-outline",
              }}
              onPress={() => router.back()}
            />
          ),
        }}
      />
      <FlatList
        data={incidentsQuery.data}
        ListHeaderComponent={() => (
          <>
            <Text className="text-center text-primario-600 dark:text-white text-lg p-5">
              Historial de Incidentes
            </Text>
          </>
        )}
        refreshControl={
          <RefreshControl
            refreshing={incidentsQuery.isRefetching}
            onRefresh={incidentsQuery.refetch}
          />
        }
        contentContainerClassName="p-2"
        renderItem={({ item }) => (
          <>
            <Link href={`/incidents/form/${item.id}`} asChild>
              <TouchableOpacity activeOpacity={0.6}>
                <View className="bg-primario-50 dark:bg-primario-600 p-4 flex-row justify-between px-3">
                  <Text className="dark:text-white">
                    {item.description.length > 40
                      ? `${item.description.substring(0, 40)}...`
                      : item.description}
                  </Text>

                  <Tag
                    value={item.state}
                    severity={statusColorIncident[item.state]}
                  />
                </View>
              </TouchableOpacity>
            </Link>
          </>
        )}
        ItemSeparatorComponent={() => <View className="mb-1" />}
        ListEmptyComponent={() => (
          <SubTitle
            text={`No hay incidentes reportados hasta el momento para la vivienda:  ${
              housingsByPropietaryQuery.data?.find(
                (x) => x.id == selectedHousing
              )?.code
            }`}
          />
        )}
      />

      <View className="absolute bottom-10 right-10">
        <Link href={"/incidents/form/create"} asChild>
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

export default Incidents;
