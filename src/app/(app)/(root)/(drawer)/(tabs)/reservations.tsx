import { View, Text } from "react-native";
import React, { useState } from "react";

import DefaultLayout from "@/layout/DefaultLayout";
import { Agenda, AgendaSchedule, LocaleConfig } from "react-native-calendars";

const Reservations = () => {
  const [items, setItems] = useState<{
    [date: string]: { name: string; time: string }[];
  }>({
    "2024-01-26": [{ name: "Reunión de trabajo", time: "10:00 AM" }],
    "2024-01-27": [{ name: "Cita con el médico", time: "03:30 PM" }],
  });

  const renderItem = (item: any) => {
    return (
      <View
        style={{ padding: 20, borderBottomWidth: 1, borderBottomColor: "#ccc" }}
      >
        <Text>{item.name}</Text>
        <Text>{item.time}</Text>
      </View>
    );
  };

  const loadItems = (day: any) => {
    // Simplemente devuelve los elementos para el día especificado, o un objeto vacío si no hay eventos
    setItems({
      ...items,
      [day.dateString]: [
        { name: "Reunión de trabajo", time: "10:00 AM" },
        { name: "Almuerzo", time: "12:30 PM" },
        { name: "Llamada con el cliente", time: "03:00 PM" },
      ],
    });
  };
  // Configura el idioma del calendario
  LocaleConfig.locales["es"] = {
    monthNames: [
      "Enero",
      "Febrero",
      "Marzo",
      "Abril",
      "Mayo",
      "Junio",
      "Julio",
      "Agosto",
      "Septiembre",
      "Octubre",
      "Noviembre",
      "Diciembre",
    ],
    monthNamesShort: [
      "Ene.",
      "Feb.",
      "Mar.",
      "Abr.",
      "May.",
      "Jun.",
      "Jul.",
      "Ago.",
      "Sep.",
      "Oct.",
      "Nov.",
      "Dic.",
    ],
    dayNames: [
      "Domingo",
      "Lunes",
      "Martes",
      "Miércoles",
      "Jueves",
      "Viernes",
      "Sábado",
    ],
    dayNamesShort: ["Dom.", "Lun.", "Mar.", "Mié.", "Jue.", "Vie.", "Sáb."],
  };

  LocaleConfig.defaultLocale = "es";
  return (
    <DefaultLayout>
      <View className="flex-1">
        <Agenda
          items={items as any}
          loadItemsForMonth={loadItems}
          selected={"2024-01-26"}
          renderItem={renderItem}
        />
      </View>
    </DefaultLayout>
  );
};

export default Reservations;
