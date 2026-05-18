import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AuthState {
  accessToken: string | null;
  refreshToken: string | null;
  username: string | null;
  role: string | null;
  isAuthenticated: boolean;
  setAuth: (data: {
    accessToken: string;
    refreshToken: string;
    username: string;
    role: string;
  }) => void;
  setTokens: (accessToken: string, refreshToken: string) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      accessToken: null,
      refreshToken: null,
      username: null,
      role: null,
      isAuthenticated: false,
      setAuth: (data) =>
        set({
          ...data,
          isAuthenticated: true,
        }),
      setTokens: (accessToken, refreshToken) =>
        set({ accessToken, refreshToken }),
      logout: () =>
        set({
          accessToken: null,
          refreshToken: null,
          username: null,
          role: null,
          isAuthenticated: false,
        }),
    }),
    {
      name: "auth-storage",
      // Only persist refresh token and user info; access token stays in memory
      partialize: (state) => ({
        refreshToken: state.refreshToken,
        username: state.username,
        role: state.role,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);
