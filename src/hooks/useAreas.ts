import { useQuery, useQueryClient } from "@tanstack/react-query";
import areaService from "../services/areaService";

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

export const useAreas = ({
  id = undefined,
  idcondominium = "",
  params,
}: Props = {}) => {
  const client = useQueryClient();

  // const areaCommonsAllQuery = useQuery({
  //     queryKey: ["areas",],
  //     queryFn: () => areaService.getAllData(),
  // });

  const areaCommonsAllQuery = useQuery({
    queryKey: ["areas", params],
    queryFn: () => {
      //  console.log(params);
      return areaService.getDataQuery({
        ...params,
        idcondominium: params?.idcondominium || "",
      });
    },
    enabled: !!params?.idcondominium,
  });

  const areaCommonsCondominiumQuery = useQuery({
    queryKey: ["areas", idcondominium],
    queryFn: () =>
      areaService.getDataQuery({
        ...params,
        idcondominium: params?.idcondominium || "",
      }),
    enabled: !!idcondominium,
  });

  const areaCommonQuery = useQuery({
    queryKey: ["areas", id],
    queryFn: () => areaService.getData(id || ""),
    enabled: !!id,
  });

  return {
    areaCommonsAllQuery,

    areaCommonsCondominiumQuery,
    areaCommonQuery,
    /*  areaCommonCreateMutation,
         areaCommonUpdateMutation,
         areaCommonDeleteMutation, */
  };
};
