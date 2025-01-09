import { AuthData } from "@/types/types";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface HealthcareStoreInterface {
  authData: AuthData;
  setAuthData: (data: AuthData) => void;
  loggedIn: boolean;
  setLoggedIn: (loggedIn: boolean) => void;
}

export const useHealthcareStore = create<HealthcareStoreInterface>()(
  persist(
    (set) => ({
      authData: {
        token: null,
        userId: null,
        doctorId: null,
        role: null,
        userName: null,
      },
      setAuthData: (data) => set({ authData: data }),
      loggedIn: false,
      setLoggedIn: (loggedIn) => set({ loggedIn }),
    }),
    {
      name: "healthcare-storage",
      storage: typeof window !== "undefined"
        ? {
            getItem: (name) => {
              const str = localStorage.getItem(name);
              return str ? JSON.parse(str) : null;
            },
            setItem: (name, value) => {
              localStorage.setItem(name, JSON.stringify(value));
            },
            removeItem: (name) => localStorage.removeItem(name),
          }
        : undefined,
    }
  )
);
