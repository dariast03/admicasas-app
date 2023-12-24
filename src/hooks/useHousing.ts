import { useQuery, useQueryClient } from "@tanstack/react-query";
import housingService from "../services/housingService";

type Props = {
  enabled?: boolean;
  id?: string;
  params?: {
    idcondominium?: string;
    idproprietary?: string;
    q?: string;
    limitResults?: number;
  };
};

export const useHousing = ({ id = undefined, params }: Props = {}) => {
  const client = useQueryClient();

  const housingsQuery = useQuery({
    queryKey: ["housing", params],
    queryFn: () =>
      housingService.getAllData({
        ...params,
        idcondominium: params?.idcondominium || "",
        idproprietary: params?.idproprietary || "",
      }),
    enabled: !!params?.idcondominium,
  });

  const housingsByPropietaryQuery = useQuery({
    queryKey: ["housing", params?.idproprietary],
    queryFn: () =>
      housingService.getAllData({
        ...params,
        idproprietary: params?.idproprietary || "",
      }),
    enabled: !!params?.idproprietary,
  });
  return {
    housingsQuery,
    housingsByPropietaryQuery,
  };
};
