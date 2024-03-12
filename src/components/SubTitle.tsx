import React from "react";
import { Text } from "react-native";

type Props = {
  text: string;
};

const SubTitle = ({ text }: Props) => {
  return <Text className="text-center p-2 text-gray-400">{text}</Text>;
};

export default SubTitle;
