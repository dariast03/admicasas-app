import { View, Text, useWindowDimensions, StyleSheet } from "react-native";
import React from "react";
import { Redirect, useLocalSearchParams } from "expo-router";
import { useAreas } from "../../../../../hooks/useAreas";
import { Image } from "expo-image";
import DefaultLayout from "../../../../../layout/DefaultLayout";

import DetailAnnocenment from "../payment/[id]";

const DetailArea = () => {
  const { id } = useLocalSearchParams();
  if (!id) return <Redirect href={"/404"} />;

  const { width } = useWindowDimensions();
  const { areaCommonQuery } = useAreas({ id: id + "" });

  if (areaCommonQuery.isLoading) return <Text>CARGANDO AREA</Text>;
  if (areaCommonQuery.isError) return <Text>ERROR AREA</Text>;
  return (
    <DefaultLayout>
      <View>
        <Image
          source={areaCommonQuery.data?.urlimg}
          style={{ width, height: 300 }}
        />
      </View>

      <View className="bg-white flex-1 rounded-3xl -mt-10 p-4">
        <Text className="font-bold uppercase text-2xl">
          {areaCommonQuery.data?.name}
        </Text>
        <Text className="">{areaCommonQuery.data?.description}</Text>
        <Text className="font-bold text-4xl">
          Bs. {areaCommonQuery.data?.price || 0}
        </Text>
      </View>
    </DefaultLayout>
  );
};

export default DetailAnnocenment;
