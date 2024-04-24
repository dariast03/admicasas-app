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

const Question = () => {
  const { questionsQuery } = useQuestions();

  const AccordionList = ({ item }: { item: IQuestions }) => {
    return (
      <Accordion className="w-full max-w-xl">
        <AccordionItem>
          <AccordionTrigger>
            <Text className="text-foreground text-xl pb-1.5">
              {item.question}
            </Text>
            <Text className="text-foreground opacity-90">Subtext example</Text>
          </AccordionTrigger>
          <AccordionContent>
            <View className="p-20 bg-blue-500"></View>
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
        ListFooterComponent={
          questionsQuery.isLoading ? (
            <Text className="text-center text-primario-600">Cargado...</Text>
          ) : null
        }
        ListHeaderComponent={() => (
          <Text className="text-center text-primario-600 dark:text-white mt-6">
            Mis Pagos
          </Text>
        )}
        data={questionsQuery.data}
        renderItem={renderItem}
        keyExtractor={(item) => item.id || ""}
      />
    </DefaultLayout>
  );
};

export default Question;
