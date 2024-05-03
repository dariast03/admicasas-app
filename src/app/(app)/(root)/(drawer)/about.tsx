import {
  FlatList,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import DefaultLayout from "@/layout/DefaultLayout";
import {
  AntDesign,
  FontAwesome,
  FontAwesome5,
  Ionicons,
  MaterialIcons,
} from "@expo/vector-icons";
import { useColorScheme } from "nativewind";
import Colors from "@/constants/Colors";

type Menu = {
  icon: any;
  title: string;
  description: string;
};
type CardProps = {
  title: string;
  icon: any;
  description: string;
};

const About = () => {
  const isDark = useColorScheme().colorScheme === "dark";

  const menu: Menu[] = [
    {
      icon: (
        <AntDesign
          name="home"
          size={50}
          color={isDark ? Colors.primario[300] : Colors.primario[600]}
        />
      ),
      title: "Inicio",
      description:
        "Elige la vivienda con la que deseas interactuar y mantente al día con eventos y noticias importantes a través de nuestros anuncios.",
    },
    {
      icon: (
        <FontAwesome
          name="inbox"
          size={50}
          color={isDark ? Colors.primario[300] : Colors.primario[600]}
        />
      ),
      title: "Comunidad",
      description:
        "Ingresa al apartado de comunidad donde podrás visualizar todas las reuniones programadas, registrar tus visitas y notificar cualquier incidente que puedas tener.",
    },
    {
      icon: (
        <MaterialIcons
          name="payments"
          size={50}
          color={isDark ? Colors.primario[300] : Colors.primario[600]}
        />
      ),
      title: "Cargos",
      description:
        " Permite a los usuarios realizar transacciones de manera segura y conveniente, además de brindar la posibilidad de verificar el estado de los cargos y acceder a un historial detallado de los pagos realizados.",
    },
    {
      icon: (
        <Ionicons
          name="calendar-outline"
          size={50}
          color={isDark ? Colors.primario[300] : Colors.primario[600]}
        />
      ),
      title: "Reservas",
      description:
        " Con nuestra función de registro de reservas, puedes reservar fácilmente espacios para eventos, reuniones o actividades. Visualiza la disponibilidad en tiempo real y confirma tu reserva al instante",
    },
    {
      icon: (
        <Ionicons
          name="notifications-outline"
          size={50}
          color={isDark ? Colors.primario[300] : Colors.primario[600]}
        />
      ),
      title: "Notificaciones",
      description:
        " No te olvides de activar nuestras notificaciones para estar al tanto de eventos importantes, noticias relevantes y exclusivas.",
    },
  ];
  const Card: React.FC<CardProps> = ({ icon, title, description }) => {
    return (
      <View className="items-center  justify-center rounded-2xl w-96 h-60 border border-primario-300 ">
        <View>{icon}</View>
        <Text className="text-primario-600 dark:text-white text-center font-bold text-xl p-2">
          {title}
        </Text>
        <View className="px-8 py-2 border-t-1 border-primario-300">
          <Text className="text-foreground  dark:text-white font-light text-center">
            {description}
          </Text>
        </View>
      </View>
    );
  };
  return (
    <DefaultLayout>
      <ScrollView className="mb-4">
        <View className="justify-center items-center">
          <Image
            className="justify-center items-center h-40 w-40"
            source={
              isDark
                ? require("../../../../assets/images/logoblanco.png")
                : require("../../../../assets/images/logo_admicasas.png")
            }
            resizeMode="contain"
          />

          <View className=" flex-row flex-wrap justify-center px-7 py-2 gap-4">
            {menu.map((option, i) => (
              <TouchableOpacity key={i} activeOpacity={0.8}>
                <Card {...option} />
              </TouchableOpacity>
            ))}
          </View>

          {/* <View className="p-5 bg-red-300 w-full">
          <View className="flex-row">
            <View className="flex-col flex-1">
              <Text>Inicio</Text>
              <Text className="text-white">
                Elige la vivienda con la que deseas interactuar y mantente al
                día con eventos y noticias importantes a través de nuestros
                anuncios.
              </Text>
            </View>
            <View className="flex-col flex-1">
              <Text>Cargos</Text>
              <Text className="text-white">
                Permite a los usuarios realizar transacciones de manera segura y
                conveniente, además de brindar la posibilidad de verificar el
                estado de los cargos y acceder a un historial detallado de los
                pagos realizados.
              </Text>
            </View>
          </View>
          <View className="flex-row">
            <View className="flex-col flex-1">
              <Text>Comunidad</Text>
              <Text className="text-white ">
                Ingresa al apartado de comunidad donde podrás visualizar todas
                las reuniones programadas, registrar tus visitas y notificar
                cualquier incidente que puedas tener.
              </Text>
            </View>
            <View className="flex-col flex-1">
              <Text>Reservas</Text>
              <Text className="text-white">
                Con nuestra función de registro de reservas, puedes reservar
                fácilmente espacios para eventos, reuniones o actividades.
                Visualiza la disponibilidad en tiempo real y confirma tu reserva
                al instante
              </Text>
            </View>
          </View>
          <View className="flex-row">
            <View className="flex-col flex-1">
              <Text>Notificaciones</Text>
              <Text className="text-white">
                No te olvides de activar nuestras notificaciones para estar al
                tanto de eventos importantes, noticias relevantes y exclusivas.
              </Text>
            </View>
          </View>
        </View> */}
        </View>
      </ScrollView>
    </DefaultLayout>
  );
};

export default About;
