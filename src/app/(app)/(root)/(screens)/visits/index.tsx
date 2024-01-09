import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import DefaultLayout from "@/layout/DefaultLayout";
import { FontAwesome } from "@expo/vector-icons";
import { Link } from "expo-router";
import { useVisits } from "@/hooks/useVisits";
import { FlatList } from "react-native-gesture-handler";
import Tag from "@/components/Tag";
import { useAppContext } from "@/hooks/useAppContext";
import { useSessionContext } from "@/hooks/useSessionContext";
import clsx from "clsx";

const Visits = () => {
  const { selectedHousing } = useAppContext();
  const { user } = useSessionContext();

  const { visitsQuery } = useVisits({
    params: {
      idhousing: selectedHousing,
    },
    query: ["visitsQuery"],
  });

  if (visitsQuery.isPending) return <Text>A LA ESPERA.</Text>;
  if (visitsQuery.isLoading) return <Text>CARGANDO..</Text>;
  if (visitsQuery.isError) return <Text>ERROR..</Text>;

  const visits = visitsQuery.data;

  return (
    <DefaultLayout>
      <FlatList
        data={visits}
        ListHeaderComponent={() => (
          <>
            <Text className="text-center font-bold text-xl p-4">
              TUS VISITAS
            </Text>
          </>
        )}
        contentContainerClassName="p-2"
        renderItem={({ item, index }) => (
          <>
            <Link href={`/visits/form/${item.id}`} asChild>
              <TouchableOpacity activeOpacity={0.6}>
                <View
                  className={clsx([
                    " p-4 flex-row justify-between",
                    {
                      "bg-primario-100  dark:bg-primario-500 ": index % 2 == 0,
                      "bg-primario-50  dark:bg-primario-400 ": index % 2 != 0,
                    },
                  ])}
                >
                  <Text className="dark:text-white">{item.name}</Text>

                  <Text className="dark:text-white">
                    {item.datevisit.toLocaleDateString()}
                  </Text>
                </View>
              </TouchableOpacity>
            </Link>
          </>
        )}
        //     ItemSeparatorComponent={() => <View className="mb-1" />}
        ListEmptyComponent={() => (
          <Text>Aun no tienes visitas en la vivienda</Text>
        )}
      />

      <View className="absolute bottom-10 right-10">
        <Link href={"/visits/form/create"} asChild>
          <TouchableOpacity activeOpacity={0.8}>
            <View className="bg-primario-400 w-16 h-16 rounded-full items-center justify-center">
              <FontAwesome name="plus" size={20} color="#fff" />
            </View>
          </TouchableOpacity>
        </Link>
      </View>
    </DefaultLayout>
  );
};

export default Visits; // Update the component name
