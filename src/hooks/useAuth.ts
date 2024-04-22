import { useState } from "react";
//import authService from "../services/authService";
import authService from "../services/authService";
import { IFormLogin, IFormRegister } from "../types/user";
import { useSessionContext } from "./useSessionContext";
import { FirebaseAuthTypes } from "@react-native-firebase/auth";
import Toast from "react-native-toast-message";
import { useAppContext } from "./useAppContext";

const useAuth = () => {
  // const { setLogin, user, status, setLogout, setCondominium } = useAuthStore();
  const { signIn, signOut, user, status } = useSessionContext();
  const [isLoading, setIsLoading] = useState(false);
  const { updateHousing } = useAppContext();
  const onLogin = async (data: IFormLogin) => {
    setIsLoading(true);

    /*     if (data.rememberEmail) {
          localStorage.setItem("user-email", data.email);
        } else {
          localStorage.removeItem("user-email");
        } */

    try {
      /* const response = await toast.promise(authService.login(data), {
        loading: "Autenticando",
        success: "Has iniciado sesion correctamente!",
        error: (e: any) => {
          return authError[e.message] || "Hubo un error. Contacta con soporte";
        },
      }); */

      const response = await authService.login(data);

      if (response && !response.error) {
        signIn(response);
        Toast.show({
          type: "success",
          text1: "Éxito",
          text2: "Has iniciado sesión correctamente",
        });
      } else if (response.error) {
        Toast.show({
          type: "error",
          text1: "Mensaje",
          text2: response.error,
        });
      } else {
        Toast.show({
          type: "error",
          text1: "Error",
          text2: "Hubo un error. Contacta con soporte",
        });
      }

      //signIn(response);
    } finally {
      setIsLoading(false);
    }
  };

  const onRegister = async (data: IFormRegister) => {
    setIsLoading(true);

    /*     if (data.rememberEmail) {
          localStorage.setItem("user-email", data.email);
        } else {
          localStorage.removeItem("user-email");
        } */

    try {
      /* const response = await toast.promise(authService.login(data), {
        loading: "Autenticando",
        success: "Has iniciado sesion correctamente!",
        error: (e: any) => {
          return authError[e.message] || "Hubo un error. Contacta con soporte";
        },
      }); */

      const response = await authService.register(data);

      if (!response) return;
      signIn(response);
    } finally {
      setIsLoading(false);
    }
  };

  const onLoginWithEmail = async () => {
    //setIsLoading(true);

    try {
      /*  const response = await toast.promise(authService2.loginWithEmail(), {
         loading: "Autenticando",
         success: "Has iniciado sesion correctamente!",
         error: (e: any) => {
           return authError[e.message] || "Hubo un error. Contacta con soporte";
         },
       }); */
      /*      const response = await authService2.loginWithEmail()
     
           if (!response) return;
           signIn(response) */
    } finally {
      setIsLoading(false);
    }
  };

  const onRefresh = async (data: FirebaseAuthTypes.User) => {
    const user = await authService.refresh(data);
    signIn(user);
  };

  const onLogout = async () => {
    updateHousing("");
    signOut();
    await authService.logout();
  };

  return {
    user,
    status,
    isLoading,
    onLogin,
    onRegister,
    onRefresh,
    onLogout,
    onLoginWithEmail,
    // setCondominium,
  };
};

export default useAuth;
