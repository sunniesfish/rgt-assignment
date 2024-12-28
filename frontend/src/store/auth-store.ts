import { create } from "zustand";
import { authService } from "@/services/auth";

interface AuthStore {
  isAuthenticated: boolean;
  isLoading: boolean;
  checkAuth: () => Promise<void>;
  setAuthenticated: (value: boolean) => void;
  signOut: () => Promise<void>;
}

export const useAuthStore = create<AuthStore>((set) => ({
  isAuthenticated: false,
  isLoading: true,

  checkAuth: async () => {
    try {
      const result = await authService.checkAuth();
      set({ isAuthenticated: result, isLoading: false });
    } catch {
      set({ isAuthenticated: false, isLoading: false });
    }
  },

  setAuthenticated: (value: boolean) => set({ isAuthenticated: value }),

  signOut: async () => {
    try {
      await authService.signOut();
      set({ isAuthenticated: false });
      window.location.href = "/login";
    } catch (error) {
      console.error("로그아웃 실패:", error);
    }
  },
}));
