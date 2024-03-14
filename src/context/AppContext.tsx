import { createContext, PropsWithChildren, useEffect } from "react";
import { useStorageState } from "../hooks/useStorageState";
import { keysStorage } from "../data";
import { useUsers } from "@/hooks/useUsers";
import { IUserAccount } from "../types/user/index";
import useAuth from "@/hooks/useAuth";

type TAppContext = {
  selectedHousing: string;
  isLoadingSelectedHousing: boolean;
  updateHousing: (id: string) => void;
};

export const AppContext = createContext<TAppContext>({} as TAppContext);

export function AppProvider(props: PropsWithChildren) {
  const { user } = useAuth();
  const { acountUpdateMutation } = useUsers();
  const [[isLoadingSelectedHousing, selectedHousing], setSelectedHousing] =
    useStorageState(keysStorage.SELECTER_HOUSING);

  const updateHousing = (id: string) => {
    if (id) {
      acountUpdateMutation.mutateAsync({
        userAcount: { idhousing: id, id: user.id },
      });
    }
    setSelectedHousing(id);
  };

  return (
    <AppContext.Provider
      value={{
        selectedHousing: selectedHousing || "",
        isLoadingSelectedHousing,
        updateHousing,
      }}
    >
      {props.children}
    </AppContext.Provider>
  );
}
