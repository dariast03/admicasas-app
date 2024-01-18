import { createContext, PropsWithChildren, useState } from "react";
import { useStorageState } from "../hooks/useStorageState";
import { keysStorage } from "../data";

import { IUser } from "../types/user";
import { set } from "date-fns";

type TSessionContext = {
  signIn: (user: IUser) => void;
  signOut: () => void;
  user: IUser;
  status: StatusAuth;
  showWelcomeScreen?: string | null;
  isLoadingShowWelcomeScreen: boolean;
  handleShowWelcomeScreen: (value: string | null) => void;
  updateCompanyCondominium: (idcompany: string, idcondominium: string) => void;
};

export const SessionContext = createContext<TSessionContext>(
  {} as TSessionContext
);

type StatusAuth = "no-authenticated" | "authenticated" | "pending";

export function SessionProvider(props: PropsWithChildren) {
  const [status, setStatus] = useState<StatusAuth>("pending");

  const [
    [isLoadingShowWelcomeScreen, showWelcomeScreen],
    setShowWelcomeScreen,
  ] = useStorageState(keysStorage.SAW_WELCOME_SCREEN);

  const [[isLoadingSelectedHousing, selectedHousing], setSelectedHousing] =
    useStorageState(keysStorage.SELECTER_HOUSING);

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
          setUser(user);
          setStatus("authenticated");
        },
        signOut: () => {
          //
          setStatus("no-authenticated");
          setUser({} as IUser);
        },
        status,
        handleShowWelcomeScreen: (value) => {
          setShowWelcomeScreen(value);
        },
        isLoadingShowWelcomeScreen,
        showWelcomeScreen,
        updateCompanyCondominium,
      }}
    >
      {props.children}
    </SessionContext.Provider>
  );
}
