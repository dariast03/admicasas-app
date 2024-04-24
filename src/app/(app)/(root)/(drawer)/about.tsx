import { Image, Text, View } from "react-native";
import React from "react";
import DefaultLayout from "@/layout/DefaultLayout";

const about = () => {
  return (
    <DefaultLayout>
      <View className="justify-center items-center ">
        <Image
          style={{
            height: 200,
            width: 200,
            justifyContent: "center",
            alignItems: "center",
          }}
          source={require("../../../../assets/images/logoblanco.png")}
          resizeMode="contain"
        />
        <Text className="text-white font-semibold">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ut magnam
          reprehenderit mollitia et aliquid, amet aliquam ducimus eos? Repellat
          velit, animi libero cupiditate eaque distinctio ad provident itaque
          deserunt corrupti!
        </Text>
      </View>
    </DefaultLayout>
  );
};

export default about;
