import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import DefaultLayout from "@/layout/DefaultLayout";
import { FontAwesome } from "@expo/vector-icons";
import { Link } from "expo-router";

const Incidents = () => {
  return (
    <DefaultLayout>
      <Text>Incidents</Text>

      <View className="absolute bottom-10 right-10">
        <Link href={"/incidents/form/create"} asChild>
          <TouchableOpacity activeOpacity={0.8}>
            <View className="bg-green-400 w-20 h-20 rounded-full items-center justify-center">
              <FontAwesome name="plus" size={20} color="#fff" />
            </View>
          </TouchableOpacity>
        </Link>
      </View>
    </DefaultLayout>
  );
};

export default Incidents;
