import { useState } from "react";
import authService from "../services/authService";
import { IFormLogin } from "../types/user";
import { User } from "firebase/auth";
import { useSessionContext } from "./useSessionContext";

const useAuth = () => {
  // const { setLogin, user, status, setLogout, setCondominium } = useAuthStore();
  const { signIn, signOut } = useSessionContext()
  const [isLoading, setIsLoading] = useState(false);

  const onLogin = async (data: IFormLogin) => {
    setIsLoading(true);

    if (data.rememberEmail) {
      localStorage.setItem("user-email", data.email);
    } else {
      localStorage.removeItem("user-email");
    }

    try {
      /* const response = await toast.promise(authService.login(data), {
        loading: "Autenticando",
        success: "Has iniciado sesion correctamente!",
        error: (e: any) => {
          return authError[e.message] || "Hubo un error. Contacta con soporte";
        },
      }); */

      const response = await authService.login(data);

      if (!response) return;
      signIn(response)
    } finally {
      setIsLoading(false);
    }
  };

  /*   const onLoginWithEmail = async () => {
      //setIsLoading(true);
  
      try {
        const response = await toast.promise(authService.loginWithEmail(), {
          loading: "Autenticando",
          success: "Has iniciado sesion correctamente!",
          error: (e: any) => {
            return authError[e.message] || "Hubo un error. Contacta con soporte";
          },
        });
  
        if (!response) return;
        setLogin(response);
      } finally {
        setIsLoading(false);
      }
    }; */

  const onRefresh = async (data: User) => {
    const user = await authService.refresh(data);
    signIn(user)
  };

  const onLogout = async () => {
    signOut();
    await authService.logout();
  };

  return {
    //  user,
    //  status,
    isLoading,
    onLogin,
    onRefresh,
    onLogout,
    //  onLoginWithEmail,
    // setCondominium,
  };
};

export default useAuth;
