import { createContext, PropsWithChildren } from "react";
import { useStorageState } from "../hooks/useStorageState";
import { keysStorage } from "../data";

type TAppContext = {
  selectedHousing: string;
  isLoadingSelectedHousing: boolean;
  updateHousing: (id: string) => void;
};

export const AppContext = createContext<TAppContext>({} as TAppContext);

export function AppProvider(props: PropsWithChildren) {
  const [[isLoadingSelectedHousing, selectedHousing], setSelectedHousing] =
    useStorageState(keysStorage.SELECTER_HOUSING);

  const updateHousing = (id: string) => {
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
