import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import DefaultLayout from "@/layout/DefaultLayout";
import { FontAwesome } from "@expo/vector-icons";
import { Link } from "expo-router";
import { useIncidents } from "@/hooks/useIncident";
import { FlatList } from "react-native-gesture-handler";
import Tag from "@/components/Tag";
import { IIncident } from "@/types/Incidents/incidents";
import { useAppContext } from "@/hooks/useAppContext";
import { useHousing } from "@/hooks/useHousing";
import { useSessionContext } from "@/hooks/useSessionContext";
import { statusColorIncident } from "@/data/statusColorIncident";

const Incidents = () => {
  const { selectedHousing } = useAppContext();
  const { user } = useSessionContext();

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
      <FlatList
        data={incidentsQuery.data}
        ListHeaderComponent={() => (
          <>
            <Text className="text-center font-bold text-xl p-4">
              TUS INCIDENTES
            </Text>
          </>
        )}
        contentContainerClassName="p-2"
        renderItem={({ item }) => (
          <>
            <Link href={`/incidents/form/${item.id}`} asChild>
              <TouchableOpacity activeOpacity={0.6}>
                <View className="bg-primario-50 dark:bg-primario-400 p-4 flex-row justify-between">
                  <Text className="dark:text-white">{item.description}</Text>
                  <View>
                    <Tag
                      value={item.state}
                      severity={statusColorIncident[item.state]}
                    />
                  </View>
                </View>
              </TouchableOpacity>
            </Link>
          </>
        )}
        ItemSeparatorComponent={() => <View className="mb-1" />}
        ListEmptyComponent={() => (
          <Text>
            Aun no tienes incidentes en la vivienda{" "}
            {
              housingsByPropietaryQuery.data?.find(
                (x) => x.id == selectedHousing
              )?.code
            }
          </Text>
        )}
      />

      <View className="absolute bottom-10 right-10">
        <Link href={"/incidents/form/create"} asChild>
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

export default Incidents;
