import { useContext } from "react";
import { AppContext } from "@/context/AppContext";

export function useAppContext() {
  const value = useContext(AppContext);

  if (process.env.NODE_ENV !== "production") {
    if (!value) {
      throw new Error("useAppContext must be wrapped in a <AppProvider />");
    }
  }

  return value;
}
