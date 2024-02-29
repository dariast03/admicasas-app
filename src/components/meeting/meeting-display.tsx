import { cn } from "@/lib/utils";
import { IMeeting } from "@/types/meeting/meeting";
import { Link } from "expo-router";
import { View, Text } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

type Props = {
  meeting: IMeeting;
  detail?: boolean;
};

const MeetingDisplay: React.FC<Props> = ({ meeting, detail }) => {
  const { id, name, date, description, topics } = meeting;

  const formatDate = date.toLocaleDateString("es-Es", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });

  return (
    <Link href={`/meeting/${id}`} asChild>
      <TouchableOpacity activeOpacity={0.8}>
        <View className="bg-primario-500 p-5 rounded-xl ">
          <Text
            className={cn(["text-gray-200 mb-2 text-xs", detail && "text-sm"])}
          >
            {formatDate}
          </Text>
          <Text className="text-white font-bold text-xl mb-2">{name}</Text>
          <Text
            className="text-white mb-4"
            numberOfLines={!detail ? 4 : undefined}
          >
            {description}
          </Text>

          <View className="flex-row gap-2 flex-wrap">
            {topics.map((topic) => (
              <View
                key={topic.name}
                className="bg-primario-100 rounded-full px-2 py-1"
              >
                <Text className={cn(["text-xs", detail && "text-sm"])}>
                  {topic.name}
                </Text>
              </View>
            ))}
          </View>
        </View>
      </TouchableOpacity>
    </Link>
  );
};

export default MeetingDisplay;
