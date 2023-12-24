import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import incidentService from "@/services/insidentService";
import { IIncident } from "@/types/Incidents/incidents";
import storageService, { TFile } from "@/services/storageService";
import Toast from "react-native-toast-message";

type QueryType = "incidentsQuery" | "incidentQuery";

type Props = {
  id?: string;
  params?: {
    idhousing: string;
    q?: string;
    limitResults?: number;
  };
  query?: QueryType[];
};

type PropsCreate = {
  data: IIncident;
  file?: TFile;
};

type PropsUpdate = {
  data: Partial<IIncident>;
  file: TFile;
};

export const useIncidents = ({ id, params, query }: Props = {}) => {
  const client = useQueryClient();

  const incidentsQuery = useQuery({
    queryKey: ["incidents", params],
    queryFn: () => {
      return incidentService.getAllDataQuery({
        ...params,
        idhousing: params?.idhousing || "",
      });
    },
    enabled: query?.includes("incidentsQuery"),
  });

  const incidentQuery = useQuery({
    queryKey: ["incidents", id],
    queryFn: () => incidentService.getData(id || ""),
    enabled: !!id,
  });

  const incidentCreateMutation = useMutation({
    mutationFn: (data: PropsCreate) => {
      const creation = async () => {
        if (data.file?.uri) {
          const urlimg = await storageService.onUploadFile(
            data.file,
            [data.file.name],
            "images"
          );
          await incidentService.insertData({
            ...data.data,
            urlimg,
            state: "Pendiente",
          });
        } else {
          await incidentService.insertData({
            ...data.data,
            urlimg: "",
            state: "Pendiente",
          });
        }
      };

      return creation();
    },
    onSuccess: () => {
      client.invalidateQueries({
        queryKey: ["incidents"],
      });
    },
    onError: (error: any) => {
      console.log(error);
    },
  });

  const incidentUpdateMutation = useMutation({
    mutationFn: (data: PropsCreate) => {
      const update = async () => {
        if (data.file?.uri) {
          const urlimg = await storageService.onUploadFile(
            data.file,
            [data.file.name],
            "images"
          );
          await incidentService.updateData({ ...data.data, urlimg });
        } else {
          await incidentService.updateData(data.data);
        }
      };

      return update();
    },
    onSuccess: () => {
      Toast.show({
        type: "success",
        text1: "Exito",
        text2: "Se ha registrado con exito",
      });
      client.invalidateQueries({
        queryKey: ["incidents"],
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

  const incidentDeleteMutation = useMutation({
    mutationFn: (id: string) => {
      return incidentService.deleteData("xddd");
    },
    onSuccess: () => {
      client.invalidateQueries({
        queryKey: ["incidents"],
      });
    },
    onError: (error: any) => {
      console.log(error);
    },
  });

  return {
    incidentsQuery,
    incidentQuery,
    incidentCreateMutation,
    incidentUpdateMutation,
    incidentDeleteMutation,
  };
};
