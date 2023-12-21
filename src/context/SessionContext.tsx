import { createContext, PropsWithChildren, useState } from "react";
import { useStorageState } from "../hooks/useStorageState";
import { keysStorage } from "../data";

import { IUser } from "../types/user";

type TSessionContext = {
  signIn: (user: IUser) => void;
  signOut: () => void;
  user: IUser;
  session?: string | null;
  isLoading: boolean;
  showWelcomeScreen?: string | null;
  isLoadingShowWelcomeScreen: boolean;
  handleShowWelcomeScreen: (value: string | null) => void;
  updateCompanyCondominium: (idcompany: string, idcondominium: string) => void;
};

export const SessionContext = createContext<TSessionContext>(
  {} as TSessionContext
);

export function SessionProvider(props: PropsWithChildren) {
  const [[isLoading, session], setSession] = useStorageState(
    keysStorage.AUTH_SESSION
  );

  const [
    [isLoadingShowWelcomeScreen, showWelcomeScreen],
    setShowWelcomeScreen,
  ] = useStorageState(keysStorage.SAW_WELCOME_SCREEN);

  const [user, setUser] = useState({} as IUser);

  const updateCompanyCondominium = (
    idcompany: string,
    idcondominium: string
  ) => {
    setUser((prev) => ({
      ...prev,
      account: { ...prev.account, idcompany, idcondominium },
    }));
  };

  return (
    <SessionContext.Provider
      value={{
        user,
        signIn: (user) => {
          setSession("xxx");
          setUser(user);
        },
        signOut: () => {
          setSession(null);
        },
        handleShowWelcomeScreen: (value) => {
          setShowWelcomeScreen(value);
        },
        session,
        isLoading,
        isLoadingShowWelcomeScreen,
        showWelcomeScreen,
        updateCompanyCondominium,
      }}
    >
      {props.children}
    </SessionContext.Provider>
  );
}
