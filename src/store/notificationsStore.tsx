import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

import AsyncStorage from "@react-native-async-storage/async-storage";

type NotificationsStore = {
  readNotifications: string[];
  addReadNotification: (id: string) => void;
};

export const useNotificationsStore = create<NotificationsStore>()(
  persist(
    (set) => ({
      readNotifications: [],
      addReadNotification: (id) =>
        set((state) => ({
          readNotifications: [...state.readNotifications, id],
        })),
    }),
    {
      name: "notifications-store",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);

export default useNotificationsStore;
