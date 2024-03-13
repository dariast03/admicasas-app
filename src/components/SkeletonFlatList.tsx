import React, { useState } from "react";
import { View, useWindowDimensions } from "react-native";
import { FlatList } from "react-native";
import { Skeleton } from "@/components/ui/skeleton";

type Props = {
  title?: string;
};

const SkeletonFlatList: React.FC<Props> = ({ title }) => {
  return (
    <FlatList
      data={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]}
      className="p-1 m-4"
      keyExtractor={(item) => item.toString()}
      ListHeaderComponent={() => (
        <View className="justify-center items-center p-2">
          <Skeleton className="h-4 w-32 bg-gray-200" />
        </View>
      )}
      renderItem={() => (
        <View className="flex-1 p-2">
          <View className="flex flex-row justify-between gap-4">
            <Skeleton className="h-4 w-32 bg-gray-200" />
            <Skeleton className="h-4 w-32 bg-gray-200" />
          </View>
        </View>
      )}
      ItemSeparatorComponent={() => (
        <View className="p-2">
          <Skeleton className="h-[2px] w-full bg-gray-200" />
        </View>
      )}
    />
  );
};
export default SkeletonFlatList;
