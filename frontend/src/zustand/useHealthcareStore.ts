import { AuthData } from "@/types/types";
import { create } from "zustand";

interface HealthcareStoreInterface {
  authData: AuthData;
  setAuthData: (data: AuthData) => void;
  loggedIn: boolean;
  setLoggedIn: (loggedIn: boolean) => void;
}

export const useHealthcareStore = create<HealthcareStoreInterface>((set) => ({
  authData: { token: null, userId: null, doctorId: null, role: null , userName: null},
  setAuthData: (data) => set({ authData: data }),
  loggedIn: false,
  setLoggedIn: (loggedIn) => set({ loggedIn }),
}));
