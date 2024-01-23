import paymentTypeService from "@/services/paymentTypeService";
import { useQuery, useQueryClient } from "@tanstack/react-query";

type HookProps = {
  id?: string;
  params?: {
    idhousing: string;
    // q?: string;
    // limitResults?: number;
  };
};
export const useCharges = (props: HookProps) => {
  if (!props?.id && !props?.params) {
    throw new Error("Id or idcondominium is missing");
  }

  const { params, id } = props;

  //   const paymentsTypesQuery = useQuery({
  //     queryKey: ["paymentTypes", params],
  //     queryFn: () =>
  //       chargerService.getAllData({
  //         idhousing: params?.idhousing || "",
  //       }),
  //   });
  const paymentTypesQuery = useQuery({
    queryKey: ["paymentTypes", id],
    queryFn: () => paymentTypeService.getData(id || ""),
    enabled: !!id,
  });

  return {
    //paymentsTypesQuery,
    paymentTypesQuery,
  };
};
