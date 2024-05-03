import React from "react";
import { FlatList, ScrollView, Text, View } from "react-native";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import DefaultLayout from "@/layout/DefaultLayout";
import { useQuestions } from "@/hooks/useQuestions";
import { IQuestions } from "@/types/questions/questions";
import Icon, { IconType } from "@/components/Icon";

const Question = () => {
  const { questionsQuery } = useQuestions();

  const AccordionList = ({ item }: { item: IQuestions }) => {
    return (
      <Accordion className="w-full max-w-xl">
        <AccordionItem>
          <AccordionTrigger>
            <View className="w-full flex-row items-center ">
              <Icon
                icon={{
                  type: IconType.AntDesign,
                  name: "checkcircleo",
                }}
                size={15}
              />
              <Text className="text-foreground dark:text-white text-lg p-1">
                {item.question}
              </Text>
            </View>
          </AccordionTrigger>
          <AccordionContent>
            <View className="p-6 bg-primario-800">
              <Text className="text-white">{item.answer}</Text>
            </View>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    );
  };

  const renderItem = ({ item }: { item: IQuestions }) => (
    <AccordionList item={item} />
  );

  return (
    <DefaultLayout>
      <FlatList
        className="mt-4"
        ListFooterComponent={
          questionsQuery.isLoading ? (
            <Text className="text-center text-primario-600">Cargado...</Text>
          ) : null
        }
        data={questionsQuery.data}
        renderItem={renderItem}
        keyExtractor={(item) => item.id || ""}
      />
    </DefaultLayout>
  );
};

export default Question;
