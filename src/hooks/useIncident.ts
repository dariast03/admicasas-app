import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import incidentService from "@/services/insidentService";
import { IIncident } from "@/types/Incidents/incidents";
import storageService, { TFile } from "@/services/storageService";

type Props = {
  enabled?: boolean;
  id?: string;
  idcondominium?: string;
  params?: {
    idcondominium: string;
    q?: string;
    limitResults?: number;
  };
};

type PropsCreate = {
  data: IIncident;
  file?: TFile;
};

type PropsUpdate = {
  data: Partial<IIncident>;
  file: TFile;
};

export const useIncidents = ({
  id = undefined,
  idcondominium = "",
  params,
}: Props = {}) => {
  const client = useQueryClient();

  const incidentsAllQuery = useQuery({
    queryKey: ["incidents"],
    queryFn: () => incidentService.getAllData(),
  });

  const incidentsQueryV2 = useQuery({
    queryKey: ["incidents", params],
    queryFn: () => {
      return incidentService.getDataQuery({
        ...params,
        idcondominium: params?.idcondominium || "",
      });
    },
    enabled: !!params?.idcondominium,
  });

  const incidentsCondominiumQuery = useQuery({
    queryKey: ["incidents", idcondominium],
    queryFn: () =>
      incidentService.getDataQuery({
        ...params,
        idcondominium: params?.idcondominium || "",
      }),
    enabled: !!idcondominium,
  });

  const incidentQuery = useQuery({
    queryKey: ["incidents", id],
    queryFn: () => incidentService.getData(id || ""),
    enabled: !!id,
  });

  const incidentCreateMutation = useMutation({
    mutationFn: (data: PropsCreate) => {
      const creation = async () => {
        /*         if (!data.file?.length) {
          throw new Error("No se ha seleccionado una imagen");
        } */

        if (data.file) {
          const urlimg = await storageService.onUploadFile(
            data.file,
            [""],
            "images"
          );
          await incidentService.insertData({ ...data.data, urlimg });
        } else {
          await incidentService.insertData({ ...data.data, urlimg: "" });
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
        if (data.file) {
          const urlimg = await storageService.onUploadFile(
            data.file,
            [""],
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
      client.invalidateQueries({
        queryKey: ["incidents"],
      });
    },
    onError: (error: any) => {
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
    incidentsAllQuery,
    incidentsQueryV2,
    incidentsCondominiumQuery,
    incidentQuery,
    incidentCreateMutation,
    incidentUpdateMutation,
    incidentDeleteMutation,
  };
};
