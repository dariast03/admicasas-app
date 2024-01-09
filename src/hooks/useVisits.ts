import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import visitService from "@/services/visitsService";
import { IVisit } from "@/types/visits/visits";
import Toast from "react-native-toast-message";

type QueryType = "visitsQuery" | "visitQuery";

type Props = {
  id?: string;
  params?: {
    idhousing: string;
    q?: string;
    limitResults?: number;
  };
  query?: QueryType[];
};

export const useVisits = ({ id, params, query }: Props = {}) => {
  // Update the hook name
  const client = useQueryClient();

  const visitsQuery = useQuery({
    queryKey: ["visits", params], // Update the queryKey
    queryFn: () => {
      return visitService.getAllDataQuery({
        ...params,
        idhousing: params?.idhousing || "",
      });
    },
    enabled: query?.includes("visitsQuery"),
  });

  const visitQuery = useQuery({
    queryKey: ["visits", id], // Update the queryKey
    queryFn: () => visitService.getData(id || ""),
    enabled: !!id,
  });

  const visitCreateMutation = useMutation({
    mutationFn: (data: IVisit) => visitService.insertData(data),
    onSuccess: () => {
      client.invalidateQueries({
        queryKey: ["visits"],
      });
    },
    onError: (error: any) => {
      console.log(error);
    },
  });

  const visitUpdateMutation = useMutation({
    mutationFn: (data: Partial<IVisit>) => visitService.updateData(data),
    onSuccess: () => {
      Toast.show({
        type: "success",
        text1: "Exito",
        text2: "Se ha registrado con exito",
      });
      client.invalidateQueries({
        queryKey: ["visits"],
      });
    },
    onError: (error: any) => {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Hubo un error",
      });
      console.log(error);
    },
  });

  const visitDeleteMutation = useMutation({
    mutationFn: (id: string) => visitService.deleteData(id),
    onSuccess: () => {
      client.invalidateQueries({
        queryKey: ["visits"],
      });
    },
    onError: (error: any) => {
      console.log(error);
    },
  });

  return {
    visitsQuery,
    visitQuery,
    visitCreateMutation,
    visitUpdateMutation,
    visitDeleteMutation,
  };
};
