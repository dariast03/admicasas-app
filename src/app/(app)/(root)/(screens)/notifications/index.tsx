import { View, Text } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { useNotifications } from "@/hooks/useNotifications";
import useAuth from "@/hooks/useAuth";
import Loader from "@/components/Loader";
import NotificationDisplay from "@/components/notifications/notification-display";
import DefaultLayout from "@/layout/DefaultLayout";
import { useAppContext } from "@/hooks/useAppContext";

const Notifications = () => {
  const { user } = useAuth();

  const { selectedHousing } = useAppContext();

  const { notificationsQuery } = useNotifications({
    params: {
      idcondominium: user.account.idcondominium,
      iduser: user?.account.id || "",
      idhousing: selectedHousing,
    },
    query: ["notificationsQuery"],
  });

  if (notificationsQuery.isLoading) return <Loader />;
  if (notificationsQuery.isPending) return <Loader />;
  if (notificationsQuery.isError || !user?.account?.id)
    return <Text>HUBO UN ERROR :(</Text>;

  const notifications = notificationsQuery.data;

  return (
    <DefaultLayout>
      <FlatList
        //contentContainerClassName="p-2"
        data={notifications}
        ItemSeparatorComponent={() => (
          <View className=" border-[0.5px] border-primario-200" />
        )}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <NotificationDisplay notification={item} />}
      />
    </DefaultLayout>
  );
};

export default Notifications;
