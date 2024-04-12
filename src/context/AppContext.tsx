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
  updateTutorialView: () => void;
  updateTutorialPayment: (state: string) => void;
  tutorialAnnouncement: boolean;
  tutorialPayment: boolean;
};

export const AppContext = createContext<TAppContext>({} as TAppContext);

export function AppProvider(props: PropsWithChildren) {
  const { user } = useAuth();
  const { acountUpdateMutation } = useUsers();
  const [[isLoadingSelectedHousing, selectedHousing], setSelectedHousing] =
    useStorageState(keysStorage.SELECTER_HOUSING);
  const [
    [isTutorialAnnouncement, tutorialAnnouncement],
    setTutorialAnnouncement,
  ] = useStorageState(keysStorage.TUTORIALANNOUNCEMENT);
  const [[isTutorialPayment, tutorialPayment], setTutorialPayment] =
    useStorageState(keysStorage.TUTORIALPAYMENT);

  const updateHousing = (id: string) => {
    if (id) {
      acountUpdateMutation.mutateAsync({
        userAcount: { idhousing: id, id: user.id },
      });
    }
    setSelectedHousing(id);
  };

  const updateTutorialView = () => {
    setTutorialAnnouncement("true");
  };
  const updateTutorialPayment = (state: string) => {
    setTutorialPayment(state);
  };

  return (
    <AppContext.Provider
      value={{
        selectedHousing: selectedHousing || "",
        isLoadingSelectedHousing,
        updateHousing,
        updateTutorialView,
        updateTutorialPayment,
        tutorialAnnouncement: tutorialAnnouncement === "true",
        tutorialPayment: tutorialPayment === "true",
      }}
    >
      {props.children}
    </AppContext.Provider>
  );
}
