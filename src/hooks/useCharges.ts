import chargerService from "@/services/chargerService";
import {
  useInfiniteQuery,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

type HookProps = {
  id?: string;
  params?: {
    idhousing: string;
    idreservation?: string;
    state?: string;
    // q?: string;
    limitResults?: number;
    type?: "History" | "Payments";
  };
};
export const useCharges = (props: HookProps) => {
  if (!props?.id && !props?.params) {
    throw new Error("Id or idcondominium is missing");
  }

  const { params, id } = props;

  // const chargesQuery = useQuery({
  //   queryKey: ["charges", params?.idhousing],
  //   queryFn: () =>
  //     chargerService.getAllData({
  //       idhousing: params?.idhousing || "",
  //     }),
  // });

  const chargesPaginatedQuery = useInfiniteQuery({
    queryKey: ["charges", "infinite", params],
    queryFn: chargerService.getAllDataByPage,
    initialPageParam: null,
    getNextPageParam: (lastPage, pages) => {
      if (!lastPage?.lastDoc?.id) return;

      return lastPage.lastDoc;
    },
  });

  const chargeQuery = useQuery({
    queryKey: ["charges", id, params?.idhousing],
    queryFn: () =>
      chargerService.getData(id || "", { idhousing: params?.idhousing || "" }),
    enabled: !!id,
  });

  const chargeQueryByReservation = useQuery({
    queryKey: [
      "charges",
      params?.idhousing,
      params?.idreservation,
      params?.state,
    ],
    queryFn: () =>
      chargerService.getDataByReservation({
        idhousing: params?.idhousing || "",
        idreservation: params?.idreservation,
      }),
    enabled:
      (!!params?.idhousing &&
        !!params?.idreservation &&
        params?.state === "Aprobado") ||
      params?.state === "Rechazado",
  });

  return {
    // chargesQuery,
    chargeQuery,
    chargeQueryByReservation,
    chargesPaginatedQuery,
  };
};
