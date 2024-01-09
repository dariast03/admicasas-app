import { useState } from "react";
//import authService from "../services/authService";
import authService from "../services/authService";
import { IFormLogin, IFormRegister } from "../types/user";
import { useSessionContext } from "./useSessionContext";
import { FirebaseAuthTypes } from "@react-native-firebase/auth";

const useAuth = () => {
  // const { setLogin, user, status, setLogout, setCondominium } = useAuthStore();
  const { signIn, signOut, user } = useSessionContext();
  const [isLoading, setIsLoading] = useState(false);

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

      console.log("LOGIN");
      const response = await authService.login(data);
      console.log(response);
      if (!response) return;
      signIn(response);
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
    signOut();
    await authService.logout();
  };

  return {
    user,
    //  status,
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
