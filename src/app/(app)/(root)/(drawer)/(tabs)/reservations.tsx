import { useColorScheme } from "nativewind";
import React from "react";
import { ScrollView } from "react-native";
import { Calendar, LocaleConfig } from "@/components/ui/calendar";

LocaleConfig.defaultLocale = "en";
const Reservations = () => {
  const { colorScheme } = useColorScheme();
  const [selectedDate, setSelectedDate] = React.useState("");
  const [selectedDates, setSelectedDates] = React.useState<string[]>([]);

  return (
    <ScrollView contentContainerStyle={{ flex: 1, padding: 16, gap: 32 }}>
      <Calendar
        onDayPress={(day) => {
          setSelectedDate(day.dateString);
        }}
        markedDates={{
          [selectedDate]: {
            selected: true,
            disableTouchEvent: true,
            selectedColor: colorScheme === "dark" ? "#0ea5e9" : "#0284c7",
          },
        }}
      />
    </ScrollView>
  );
};

export default Reservations;
