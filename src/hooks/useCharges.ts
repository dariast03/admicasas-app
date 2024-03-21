import chargerService from "@/services/chargerService";
import { useQuery, useQueryClient } from "@tanstack/react-query";

type HookProps = {
  id?: string;
  params?: {
    idhousing: string;
    idreservation?: string;
    // q?: string;
    // limitResults?: number;
  };
};
export const useCharges = (props: HookProps) => {
  if (!props?.id && !props?.params) {
    throw new Error("Id or idcondominium is missing");
  }

  const { params, id } = props;

  const chargesQuery = useQuery({
    queryKey: ["charges", params?.idhousing],
    queryFn: () =>
      chargerService.getAllData({
        idhousing: params?.idhousing || "",
      }),
  });
  const chargeQuery = useQuery({
    queryKey: ["charges", id, params?.idhousing],
    queryFn: () =>
      chargerService.getData(id || "", { idhousing: params?.idhousing || "" }),
    enabled: !!id,
  });
  const chargeQueryByReservation = useQuery({
    queryKey: ["charges", params?.idhousing, params?.idreservation],
    queryFn: () =>
      chargerService.getDataByReservation({
        idhousing: params?.idhousing || "",
        idreservation: params?.idreservation,
      }),
    enabled: !!id,
  });

  return {
    chargesQuery,
    chargeQuery,
  };
};
