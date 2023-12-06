import { useQuery, useQueryClient } from "@tanstack/react-query";
import areaService from "../services/areaService";


type Props = {
    enabled?: boolean;
    id?: string;
    idcondominium?: string;
    params?: {
        idcondominium: string;
        q?: string,
        limitResults?: number
    }
};


export const useAreas = ({ id = undefined, idcondominium = '', params }: Props = {}) => {
    const client = useQueryClient();

    const areaCommonsAllQuery = useQuery({
        queryKey: ["areas",],
        queryFn: () => areaService.getAllData(),
    });

    const areaCommonsQueryV2 = useQuery({
        queryKey: ["areas", params],
        queryFn: () => {
            //  console.log(params);
            return areaService.getDataQuery({ ...params, idcondominium: params?.idcondominium || "" })
        },
        enabled: !!params?.idcondominium,
    });

    const areaCommonsCondominiumQuery = useQuery({
        queryKey: ["areas", idcondominium],
        queryFn: () => areaService.getDataQuery({ ...params, idcondominium: params?.idcondominium || "" }),
        enabled: !!idcondominium,
    });


    const areaCommonQuery = useQuery({
        queryKey: ["areas", id],
        queryFn: () => areaService.getData(id || ""),
        enabled: !!id,
    });

    /* const areaCommonCreateMutation = useMutation({
      mutationFn: (data: PropsCreate) => {
        const creacion = async () => {
          if (!data.file?.length)
            throw new Error("No se ha seleccionado una imagen");
          const urlimg = await onUploadImage(data.file[0]);
          await areaService.insertData({ ...data.data, urlimg });
        };
        return toast.promise(creacion(), {
          loading: "Creando registro....",
          error: (e: any) => e.message || "Hubo un error al crear",
          success: "Creado con exito",
        });
      },
      onSuccess: () => {
        client.invalidateQueries({
          queryKey: ["areas"],
        });
      },
      onError: (error: any) => {
        console.log(error);
      },
    });
  
    const areaCommonUpdateMutation = useMutation({
      mutationFn: (data: PropsCreate) => {
        const creacion = async () => {
          if (data.file?.length) {
            const urlimg = await onUploadImage(data.file[0]);
            await areaService.updateData({ ...data.data, urlimg });
          } else await areaService.updateData({ ...data.data });
        };
  
        return toast.promise(creacion(), {
          loading: "Actualizando registro....",
          error: "Hubo un error al actualizar",
          success: "Actualizado con exito",
        });
      },
      onSuccess: () => {
        client.invalidateQueries({
          queryKey: ["areas"],
        });
      },
      onError: (error: any) => {
        console.log(error);
      },
    });
  
    const areaCommonDeleteMutation = useMutation({
      mutationFn: (id: string) => {
        return toast.promise(areaService.deleteData(id), {
          loading: "Eliminando registro....",
          error: "Hubo un error al eliminar",
          success: "Eliminado con exito",
        });
      },
      onSuccess: () => {
        client.invalidateQueries({
          queryKey: ["areas"],
        });
      },
      onError: (error: any) => {
        console.log(error);
      },
    }); */

    return {
        areaCommonsAllQuery,
        areaCommonsQueryV2,
        areaCommonsCondominiumQuery,
        areaCommonQuery,
        /*  areaCommonCreateMutation,
         areaCommonUpdateMutation,
         areaCommonDeleteMutation, */
    };
};