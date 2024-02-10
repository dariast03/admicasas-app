// import { View, Text } from "react-native";
// import React, { useState } from "react";

// import DefaultLayout from "@/layout/DefaultLayout";
// import { Agenda, AgendaSchedule, LocaleConfig } from "react-native-calendars";
// import { format } from "date-fns";
// import Colors from "@/constants/Colors";
// import { useReserve } from "@/hooks/useReservation";
// import { useSessionContext } from "@/hooks/useSessionContext";

// const Reservations = () => {
//   const { user } = useSessionContext();

//   const { reservationsQuery } = useReserve({
//     params: { idcondominium: user.account.idcondominium },
//   });
//   console.log(reservationsQuery.data);

//   const [items, setItems] = useState<{
//     [date: string]: { name: string; time: string }[];
//   }>({
//     "2024-01-26": [{ name: "Reunión de trabajo", time: "10:00 AM" }],
//     "2024-01-27": [{ name: "Cita con el médico", time: "03:30 PM" }],
//   });

//   const renderItem = (item: any) => {
//     return (
//       <View
//         style={{
//           padding: 20,
//           borderBottomWidth: 1,
//           borderBottomColor: Colors.primario[600],
//         }}
//       >
//         <Text>{item.name}</Text>
//         <Text>{item.time}</Text>
//       </View>
//     );
//   };

//   const loadItems = (day: any) => {
//     setItems({
//       ...items,
//       [day.dateString]: [
//         { name: "Reunión de trabajo", time: "10:00 AM" },
//         { name: "Almuerzo", time: "12:30 PM" },
//         { name: "Llamada con el cliente", time: "03:00 PM" },
//       ],
//     });
//   };

//   LocaleConfig.locales["es"] = {
//     monthNames: [
//       "Enero",
//       "Febrero",
//       "Marzo",
//       "Abril",
//       "Mayo",
//       "Junio",
//       "Julio",
//       "Agosto",
//       "Septiembre",
//       "Octubre",
//       "Noviembre",
//       "Diciembre",
//     ],
//     monthNamesShort: [
//       "Ene.",
//       "Feb.",
//       "Mar.",
//       "Abr.",
//       "May.",
//       "Jun.",
//       "Jul.",
//       "Ago.",
//       "Sep.",
//       "Oct.",
//       "Nov.",
//       "Dic.",
//     ],
//     dayNames: [
//       "Domingo",
//       "Lunes",
//       "Martes",
//       "Miércoles",
//       "Jueves",
//       "Viernes",
//       "Sábado",
//     ],
//     dayNamesShort: ["Dom.", "Lun.", "Mar.", "Mié.", "Jue.", "Vie.", "Sáb."],
//   };

//   LocaleConfig.defaultLocale = "es";

//   return (
//     <DefaultLayout>
//       <View className="flex-1">
//         <Agenda
//           items={items as any}
//           loadItemsForMonth={loadItems}
//           selected={format(new Date(), "yyyy-MM-dd")}
//           renderItem={renderItem}
//         />
//       </View>
//     </DefaultLayout>
//   );
// };

// export default Reservations;

import { View, Text } from "react-native";
import React, { useState, useEffect } from "react";

import DefaultLayout from "@/layout/DefaultLayout";
import { Agenda, LocaleConfig } from "react-native-calendars";
import { format } from "date-fns";
import Colors from "@/constants/Colors";
import { useReserve } from "@/hooks/useReservation";
import { useSessionContext } from "@/hooks/useSessionContext";
import { IReservation } from "@/types/reserve/reserve";

const Reservations2 = () => {
  const { user } = useSessionContext();
  const { reservationsQuery } = useReserve({
    params: { idcondominium: user.account.idcondominium },
  });
  const [items, setItems] = useState<{ [date: string]: any[] }>({});

  useEffect(() => {
    if (reservationsQuery.data) {
      const formattedReservations = formatReservations(reservationsQuery.data);
      setItems(formattedReservations);
    }
  }, [reservationsQuery.data]);

  const formatReservations = (data: any) => {
    console.log(data);
    const formattedItems: { [date: string]: any[] } = {};
    data.forEach((reservation: any) => {
      if (reservation.end) {
        const date = format(new Date(reservation.end), "yyyy-MM-dd");

        if (!formattedItems[date]) {
          formattedItems[date] = [];
        }
        formattedItems[date].push({
          title: reservation.title,
          date: date,
        });
      }
    });
    return formattedItems;
  };

  const renderItem = (item: any) => {
    return (
      <View
        style={{
          padding: 20,
          borderBottomWidth: 1,
          borderBottomColor: Colors.primario[600],
        }}
      >
        <Text>{item.end}</Text>
        <Text>{item.title}</Text>
      </View>
    );
  };

  const loadItems = (day: any) => {
    // Esta función ya no se usa para cargar los elementos, ya que se cargan en useEffect
  };

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
          items={items}
          selected={format(new Date(), "yyyy-MM-dd")}
          renderItem={renderItem}
        />
      </View>
    </DefaultLayout>
  );
};

export default Reservations2;
