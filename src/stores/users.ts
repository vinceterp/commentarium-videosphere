import api from "@/lib/axios";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export interface User {
  username?: string;
  email?: string;
  firstName?: string;
  lastName?: string;
  id?: string;
  image?: string;
  token: string;
  refreshToken: string;
}

export interface UserStore {
  user: User | null;
  setUser: (user: User | null) => void;
  isAuthenticated: boolean;
  setIsAuthenticated: (isAuthenticated: boolean) => void;
  logout: () => void;
}

export const useUser = create<UserStore>()(
  persist(
    (set) => ({
      user: null,
      setUser: (user) => set({ user }),
      isAuthenticated: false,
      setIsAuthenticated: (isAuthenticated) => set({ isAuthenticated }),
      logout: () => {
        set({ user: null, isAuthenticated: false });
        // clear api default headers
        delete api.defaults.headers.common["Authorization"];
      },
    }),
    {
      name: "user-store",
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
