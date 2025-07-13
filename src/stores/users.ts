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
  userId?: number;
}

export interface UserStore {
  user: User | null;
  setUser: (user: User | null) => void;
  isAuthenticated: boolean;
  setIsAuthenticated: (isAuthenticated: boolean) => void;
  logout: (navigateToLogin?: boolean) => void;
}

export const useUser = create<UserStore>()(
  persist(
    (set) => ({
      user: null,
      setUser: (user) => set({ user }),
      isAuthenticated: false,
      setIsAuthenticated: (isAuthenticated) => set({ isAuthenticated }),
      logout: (navigateToLogin = true) => {
        set({ user: null, isAuthenticated: false });
        // clear api default headers
        localStorage.removeItem("access-token");
        localStorage.removeItem("refresh-token");
        // delete api.defaults.headers.common["Authorization"];
        if (navigateToLogin) {
          // Redirect to login page if needed
          window.location.href = "/signin";
        }
      },
    }),
    {
      name: "user-store",
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
