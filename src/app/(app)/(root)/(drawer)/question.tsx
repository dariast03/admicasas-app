import DefaultLayout from "@/layout/DefaultLayout";
import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Text } from "@/components/ui/text";

const question = () => {
  return (
    <DefaultLayout>
      <Accordion
        type="multiple"
        collapsible
        defaultValue={["item-1"]}
        className="w-full max-w-sm native:max-w-md"
      >
        <AccordionItem value="item-1">
          <AccordionTrigger>
            <Text>Is it accessible?</Text>
          </AccordionTrigger>
          <AccordionContent>
            <Text>Yes. It adheres to the WAI-ARIA design pattern.</Text>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger>
            <Text>What are universal components?</Text>
          </AccordionTrigger>
          <AccordionContent>
            <Text>
              In the world of React Native, universal components are components
              that work on both web and native platforms.
            </Text>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </DefaultLayout>
  );
};

export default question;
