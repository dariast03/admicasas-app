import { createContext, PropsWithChildren, useState } from "react";
import { useStorageState } from "../hooks/useStorageState";
import { keysStorage } from "../data";

type TSessionContext = {
  signIn: () => void;
  signOut: () => void;
  session?: string | null;
  isLoading: boolean;
  showWelcomeScreen?: string | null;
  isLoadingShowWelcomeScreen: boolean;
  handleShowWelcomeScreen: (value: string | null) => void;
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

  return (
    <SessionContext.Provider
      value={{
        signIn: () => {
          setSession("xxx");
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
      }}
    >
      {props.children}
    </SessionContext.Provider>
  );
}
