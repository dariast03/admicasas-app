import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import userService from "../services/userService";
import { IAccount, IUserAccount } from "../types/user";
import Toast from "react-native-toast-message";

type Props = {
  enabled?: boolean;
  id?: string;
  params?: {
    idcondominium?: string;
    q?: string;
    limitResults?: number;
  };
  params1?: {
    idcompany?: string;
    rol?: string;
  };
};

type PropsUpdate = {
  data: Partial<IUserAccount>;
  userAcount: Partial<IAccount>;
};

export const useUsers = ({ id = undefined, params, params1 }: Props = {}) => {
  const client = useQueryClient();

  const userUpdateMutation = useMutation({
    mutationFn: (data: PropsUpdate) => {
      const creacion = async () => {
        await userService.updateData({ ...data.data });
      };
      return creacion();
    },
    onSuccess: () => {
      Toast.show({
        type: "success",
        text1: "Exito",
        text2: "Se ha registrado con exito",
      });
      client.invalidateQueries({
        queryKey: ["user"],
      });
    },
    onError: (error: any) => {
      console.log(error);
    },
  });
  const acountUpdateMutation = useMutation({
    mutationFn: (data: PropsUpdate) => {
      const creacion = async () => {
        await userService.updateData({ ...data.data });
      };
      return creacion();
    },
    onSuccess: () => {
      Toast.show({
        type: "success",
        text1: "Exito",
        text2: "Se ha registrado con exito",
      });
      client.invalidateQueries({
        queryKey: ["user"],
      });
    },
    onError: (error: any) => {
      console.log(error);
    },
  });

  return {
    userUpdateMutation,
    acountUpdateMutation,
  };
};
