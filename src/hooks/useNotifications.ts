import notificationService from "@/services/notificationService";
import { useQuery } from "@tanstack/react-query";

type QueryType = "notificationsQuery" | "notificationQuery";

type HookProps = {
  id?: string;
  params?: {
    idcondominium: string;
    iduser: string;
  };
  query?: QueryType[];
};
export const useNotifications = (props: HookProps) => {
  if (!props?.id && !props?.params) {
    throw new Error("Id or idcondominium is missing");
  }

  const { params, id } = props;

  const notificationsQuery = useQuery({
    queryKey: ["notifications", params],
    queryFn: () =>
      notificationService.getAllData(props.params ? params : undefined),
    enabled: !!props.query?.includes("notificationsQuery"),
  });

  const notificationQuery = useQuery({
    queryKey: ["notifications", id],
    queryFn: () => notificationService.getData(id || ""),
    enabled: !!id && !!props.query?.includes("notificationQuery"),
  });

  return {
    notificationsQuery,
    notificationQuery,
  };
};
