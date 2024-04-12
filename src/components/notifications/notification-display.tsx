import { formatDateForDisplay } from "@/helpers/formatDateForDisplay";
import { cn } from "@/lib/utils";
import useNotificationsStore from "@/store/notificationsStore";
import { INotification } from "@/types/notification/notification";
import { Link } from "expo-router";
import { Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

interface Props {
  notification: INotification;
}

const NotificationDisplay: React.FC<Props> = ({ notification }) => {
  const { id, title, body, date, to } = notification;

  const { readNotifications, addReadNotification } = useNotificationsStore();

  const isRead = readNotifications.includes(id);

  const handlePress = () => {
    addReadNotification(id);
  };

  return (
    <Link href={to as any} asChild>
      <TouchableOpacity activeOpacity={0.7} onPress={handlePress}>
        <View
          className={cn([
            "flex flex-row gap-2 justify-between p-4 bg-gray-200 dark:bg-primario-800 ",
            isRead && "bg-white dark:bg-primario-600",
          ])}
        >
          <View className="flex-1">
            <Text className="font-bold dark:text-white">{title}</Text>
            <Text className="dark:text-white">{body}</Text>
          </View>

          <View className="  items-center justify-center">
            <Text className="text-sm dark:text-white">
              {formatDateForDisplay(date)}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    </Link>
  );
};

export default NotificationDisplay;
