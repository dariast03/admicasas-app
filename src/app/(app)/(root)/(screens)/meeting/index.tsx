import Loader from "@/components/Loader";
import MeetingDisplay from "@/components/meeting/meeting-display";
import useAuth from "@/hooks/useAuth";
import { useMeetings } from "@/hooks/useMeetings";
import { IMeeting } from "@/types/meeting/meeting";
import { View, FlatList, Text } from "react-native";

const Meeting = () => {
  const { user } = useAuth();

  const { meetingsQuery } = useMeetings({
    params: {
      idcondominium: user.account?.idcondominium || "",
    },
    query: ["meetingsQuery"],
  });

  if (meetingsQuery.isLoading) return <Loader />;
  if (meetingsQuery.isError) return <Text>HUBO UN ERROR :(</Text>;

  const meetings = meetingsQuery.data;

  return (
    <View>
      <FlatList
        contentContainerClassName="p-2"
        data={meetings}
        ItemSeparatorComponent={() => <View className="mb-2" />}
        renderItem={({ item }) => <MeetingDisplay meeting={item} />}
      />
    </View>
  );
};

export const fakeData: IMeeting[] = [
  {
    name: "Reunión Mensual de Condominio",
    description: "Discusión de asuntos importantes del condominio",
    date: new Date("2024-03-05T10:00:00"),
    type: "General",
    state: true,
    idcondominium: "123456789",
    topics: [{ name: "Presupuesto" }, { name: "Seguridad" }],
    notes: [{ text: "Recordar pagar cuota de mantenimiento" }],
    urlAct: "https://fakeurl.com/reunion-condominio",
    filename: "agenda_reunion_condominio.pdf",
    isPublished: true,
    id: "abcdd",
  },
  {
    name: "Asamblea de Emergencia",
    description: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Similique quasi laboriosam quae facilis provident modi omnis sed iure non voluptates aliquam necessitatibus possimus, labore natus. Eligendi, ad. Fugiat, maxime cupiditate.
    Fuga cumque architecto reprehenderit doloremque, praesentium, officia libero enim delectus ea, nulla aliquid dignissimos blanditiis numquam nemo beatae optio aperiam ut. Quo mollitia blanditiis dolores non error sunt saepe laudantium.
    Tempora exercitationem adipisci aspernatur vero, at in corporis saepe facilis ratione rem, maiores, laudantium quod. Perspiciatis sint obcaecati quidem, similique id ex, iusto pariatur est tenetur dolorem, facere quia reprehenderit.
    Reiciendis, nesciunt eos eum laborum minus et dolorem ullam harum maxime iste nisi facere, adipisci dicta sed? Eaque delectus dolor similique accusamus ea, tempora quisquam, ab dicta quam amet voluptas?`,
    date: new Date("2024-03-10T15:30:00"),
    type: "Emergencia",
    state: false,
    idcondominium: "987654321",
    topics: [
      { name: "Inundación en el estacionamiento" },
      { name: "Fallas eléctricas" },
    ],
    notes: [
      { text: "Comprar bombas de agua de emergencia" },
      { text: "Comprar bombas de agua de emergencia5" },
      { text: "Comprar bombas de agua de124 124emergencia5" },
      { text: "Comprar bomba124s de agua de 124emerg5encia" },
      { text: "Comprar bombas d124e agua de emergencia" },
      { text: "Comprar bombas de agua de emerg7encia" },
      { text: "Comprar bombas de a12gua de emerg4376encia" },
      { text: "Comprar bombas de agua de emerg36encia" },
      { text: "Comprar bombas de ag124ua de emerge3ncia" },
      { text: "Comprar bombas12412 d12e a412gua de emergen6cia" },
      { text: "Comprar bombas de agua de emergenc78ia" },
      { text: "Comprar 2bombas de agua de emergencia" },
      { text: "Comprar bombas de agua de emedrgencia" },
      { text: "Comprar bombas de agua d412e emergencia" },
      { text: "Comprar 6bombas de agua de emergencia" },
      { text: "Comprar b3ombas de agua d412e emergencia" },
      { text: "Comprar bo341mbas4 de agua4124 de emergencia" },
      { text: "Comprar bom34bas de agua de emergencia" },
    ],
    urlAct: "https://fakeurl.com/asamblea-emergencia",
    filename: "minutas_asamblea_emergencia.docx",
    isPublished: false,
    id: "abcawe",
  },
  {
    name: "Junta de Vecinos",
    description: "Planificación de actividades comunitarias",
    date: new Date("2024-03-20T18:00:00"),
    type: "Comunidad",
    state: true,
    idcondominium: "456789123",
    topics: [{ name: "Fiesta de Navidad" }, { name: "Torneo de Fútbol" }],
    notes: [{ text: "Buscar patrocinadores para el torneo" }],
    urlAct: "https://fakeurl.com/junta-vecinos",
    filename: "minutas_junta_vecinos.txt",
    isPublished: true,
    id: "abc",
  },
];

export default Meeting;
