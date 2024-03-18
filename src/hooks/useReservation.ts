import {
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import Toast from "react-native-toast-message";
import reservationService from "../services/reservationService";
import { IReservation } from "../types/reserve/reserve";

type QueryType = "reservationsQuery" | "reservationQuery";

type Props = {
  enabled?: boolean;
  id?: string;
  params?: {
    idhousing?: string;
    idcondominium: string;
    selectedDate?: Date;
    limitResults?: number;
  };
};

// const defaultProps: Props = {
//   params: {
//     selectedDate: new Date(),
//     idcondominium: "",
//   },
// };

type PropsCreate = {
  data: IReservation;
  file?: File[];
  requiredPayment: boolean;
};
type PropsUpdate = {
  data: Partial<IReservation>;
  file?: File[];
  requiredPayment: boolean;
};

export const useReserve = ({ id, params }: Props = {}) => {
  const client = useQueryClient();

  // const reservationsQuery = useQuery({
  //   queryKey: ["reservations", params?.idcondominium],
  //   queryFn: () => reservationService.getAllData(params),
  // });

  // const reservationsQuery = useInfiniteQuery(
  //   ["reservations", "infinite", params],
  //    reservationService.getAllData,{
  //     getNextPageParam: (lastPage, pages) => {
  //       if (!lastPage?.lastDoc?.id) return;

  //       return lastPage.lastDoc;
  //     }
  //   }
  // );

  const reservationsHousingQuery = useInfiniteQuery({
    queryKey: ["reservations", "infinite", params],
    queryFn: reservationService.getAllDataByHousing,
    initialPageParam: null,
    getNextPageParam: (lastPage, pages) => {
      if (!lastPage?.lastDoc?.id) return;

      return lastPage.lastDoc;
    },
  });

  const reservationsCondominiumQuery = useQuery({
    queryKey: ["reservations", params?.idcondominium],
    queryFn: () => reservationService.getAllDataByCondominium(params),
    enabled: !!params,
  });

  const reservationQuery = useQuery({
    queryKey: ["reservations", id],
    queryFn: () => reservationService.getData(id || ""),
    enabled: !!id,
  });

  const reservationCreateMutation = useMutation({
    mutationFn: async (data: PropsCreate) => {
      // if (data.requiredPayment && !data.file?.length)
      //   throw new Error("No se ha subido un comprobante");

      //  if (data.requiredPayment && data.file?.length) {
      //   const id = await reservationService.insertData({
      //     ...data.data,
      //     idcondominium: params?.idcondominium || "",
      //   });
      //   // const urlPayment = await onUploadFile(data.file[0], [id], "payments");
      //   // await reservationService.updateData(
      //   //   {
      //   //     id,
      //   //     urlPayment,
      //   //     filename: data.file[0].name,
      //   //     idcondominium: params?.idcondominium || "",
      //   //   },
      //   //   true
      //   // );
      // } else {
      //   await reservationService.insertData({
      //     ...data.data,
      //     idcondominium: params?.idcondominium || "",
      //   });
      // }
      return reservationService.insertData({
        ...data.data,
      });

      // try {
      //   return await toast.promise(creacion(), {
      //     loading: "Creando reserva....",
      //     error: (e: any) =>
      //       firebaseError[e.message] ||
      //       e.message ||
      //       "Hubo un error al crear la reserva",
      //     success: "Reserva creada con éxito",
      //   });
      // } catch (e: any) {
      //   throw new Error(
      //     firebaseError[e.message] ||
      //     e.message ||
      //     "Hubo un error al crear la reserva"
      //   );
      // }
    },
    onSuccess: () => {
      Toast.show({
        type: "success",
        text1: "Exito",
        text2: "¡Reserva registrada exitosamente!",
      });
      client.invalidateQueries({
        queryKey: ["reservations"],
      });
    },
    onError: (e: any) => {
      console.log("🚀 ~ useReserve ~ e:", e);
      Toast.show({
        type: "error",
        text1: "Error",
        text2: e.message || "Hubo un error",
      });
    },
  });

  const reservationUpdateMutation = useMutation({
    mutationFn: (data: Partial<PropsUpdate>) => {
      const creacion = async () => {
        if (!data.data) throw new Error("Informacion invalida");

        if (data.data && !data.data.id)
          throw new Error("Informacion invalida. No se encontrol el id");

        if (data.requiredPayment && !data.data.urlPayment && !data.file?.length)
          throw new Error("No se ha subido un comprobante");

        await reservationService.updateData({
          ...data.data,
          idcondominium: data.data.idcondominium,
        });
      };

      return creacion();
    },
    onSuccess: () => {
      Toast.show({
        type: "success",
        text1: "Exito",
        text2: "¡Reserva actualizada con éxito!",
      });

      client.invalidateQueries({
        queryKey: ["reservations"],
      });
    },
    onError: (error: any) => {
      console.log(error.message, "ERROR UPDATE");
      return error.message;
    },
  });

  const reservationDeleteMutation = useMutation({
    mutationFn: (id: string) => {
      return reservationService.deleteData(id);
    },
    onSuccess: () => {
      Toast.show({
        type: "success",
        text1: "Exito",
        text2: "¡La reserva se ha eliminado correctamente!",
      });

      client.invalidateQueries({
        queryKey: ["reservations"],
      });
    },
    onError: (error: any) => {
      console.log(error);
    },
  });

  // const reservationDeleteMutation = useMutation({
  //   mutationFn: (id: string) => {
  //     return toast.promise(reservationService.deleteData(id), {
  //       loading: "Eliminando reserva....",
  //       error: "Hubo un error al eliminar la reserva",
  //       success: "Reserva eliminada con éxito",
  //     });
  //   },
  //   onSuccess: () => {
  //     client.invalidateQueries({
  //       queryKey: ["reservations"],
  //     });
  //   },
  //   onError: (error: any) => {
  //     console.log(error);
  //   },
  // });

  return {
    reservationsHousingQuery,
    //reservationsDayQuery,
    reservationsCondominiumQuery,
    reservationQuery,
    reservationCreateMutation,
    reservationUpdateMutation,
    reservationDeleteMutation,
  };
};
