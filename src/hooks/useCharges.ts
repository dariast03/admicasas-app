import chargerService from "@/services/chargerService";
import { useQuery, useQueryClient } from "@tanstack/react-query";

type HookProps = {
  id?: string;
  params: {
    idhousing: string;
    // q?: string;
    // limitResults?: number;
  };
};
export const useCharges = (props: HookProps) => {
  if (!props?.id && !props?.params) {
    throw new Error("Id or idcondominium is missing");
  }

  const { params, id = undefined } = props;

  const chargesQuery = useQuery({
    queryKey: ["charges", params],
    queryFn: () =>
      chargerService.getAllData({
        ...params,
      }),
  });

  return {
    chargesQuery,
  };
};
