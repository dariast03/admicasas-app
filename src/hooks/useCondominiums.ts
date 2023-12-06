import { useQuery, useQueryClient } from "@tanstack/react-query";
import condominiumService from "../services/condominiumService";


type Props = {
  id?: string;
  idcompany?: string;
};

export const useCondominiums = ({
  id = undefined,
  idcompany = undefined,
}: Props = {}) => {
  const client = useQueryClient();

  const condominiumsQuery = useQuery({
    queryKey: ["condominium", idcompany],
    queryFn: () => condominiumService.getAllData(idcompany || ""),
  });

  const condominiumQuery = useQuery({
    queryKey: ["condominium", id],
    queryFn: () => condominiumService.getData(id || ""),
    enabled: !!id,
  });

  /* const condominiumCreateMutation = useMutation({
    mutationFn: (data: PropsCreate) => {
      const creacion = async () => {
        if (!data.file?.length)
          throw new Error("No se ha seleccionado una imagen");
        const urlimg = await onUploadImage(data.file[0]);
        await condominiumService.insertData({ ...data.data, urlimg });
      };
      return toast.promise(creacion(), {
        loading: "Creando registro....",
        error: (e: any) => e.message || "Hubo un error al crear",
        success: "Creado con exito",
      });
    },
    onSuccess: () => {
      client.invalidateQueries({
        queryKey: ["condominium"],
      });
    },
    onError: (error: any) => {
      console.log(error);
    },
  });
 
  const condominiumUpdateMutation = useMutation({
    mutationFn: (data: PropsCreate) => {
      const creacion = async () => {
        if (data.file?.length) {
          const urlimg = await onUploadImage(data.file[0]);
          await condominiumService.updateData({ ...data.data, urlimg });
        } else await condominiumService.updateData({ ...data.data });
      };
 
      return toast.promise(creacion(), {
        loading: "Actualizando registro....",
        error: "Hubo un error al actualizar",
        success: "Actualizado con exito",
      });
    },
    onSuccess: () => {
      client.invalidateQueries({
        queryKey: ["condominium"],
      });
    },
    onError: (error: any) => {
      console.log(error);
    },
  });
 
  const condominiumDeleteMutation = useMutation({
    mutationFn: (id: string) => {
      return toast.promise(condominiumService.deleteData(id), {
        loading: "Eliminando registro....",
        error: "Hubo un error al eliminar",
        success: "Eliminado con exito",
      });
    },
    onSuccess: () => {
      client.invalidateQueries({
        queryKey: ["condominium"],
      });
    },
    onError: (error: any) => {
      console.log(error);
    },
  }); */

  return {
    condominiumsQuery,
    condominiumQuery,
  };
};