import { useQuery, useQueryClient } from "@tanstack/react-query";
import { IHousing } from "../types/housing/housing";
import housingService from "../services/housingService";

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
  data: IHousing;
  file?: File[];
};

export const useHousing = ({ id = undefined, params }: Props = {}) => {
  const client = useQueryClient();

  const housingsQuery = useQuery({
    queryKey: ["housing", params],
    queryFn: () =>
      housingService.getDataQuery({
        ...params,
        idcondominium: params?.idcondominium || "",
      }),
    enabled: !!params?.idcondominium,
  });

  const housingQuery = useQuery({
    queryKey: ["housing", id],
    queryFn: () => housingService.getData(id || ""),
    enabled: !!id,
  });

  return {
    housingQuery,
    housingsQuery,
  };
};
