import { useState } from "react";
//import authService from "../services/authService";
import authService2 from "../services/authService2";
import { IFormLogin } from "../types/user";
import { User } from "firebase/auth";
import { useSessionContext } from "./useSessionContext";
import { FirebaseAuthTypes } from "@react-native-firebase/auth";

const useAuth = () => {
  // const { setLogin, user, status, setLogout, setCondominium } = useAuthStore();
  const { signIn, signOut } = useSessionContext()
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

      const response = await authService2.login(data);

      if (!response) return;
      signIn(response)
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
    const user = await authService2.refresh(data);
    signIn(user)
  };

  const onLogout = async () => {
    signOut();
    await authService2.logout();
  };

  return {
    //  user,
    //  status,
    isLoading,
    onLogin,
    onRefresh,
    onLogout,
    onLoginWithEmail,
    // setCondominium,
  };
};

export default useAuth;
