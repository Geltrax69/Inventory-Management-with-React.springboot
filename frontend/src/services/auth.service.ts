import api from "@/lib/axios";
import type { AuthResponse } from "@/types";

export const authService = {
  login: (username: string, password: string) =>
    api.post<AuthResponse>("/api/auth/login", { username, password }),

  register: (username: string, password: string, email: string) =>
    api.post<AuthResponse>("/api/auth/register", { username, password, email }),

  refresh: (refreshToken: string) =>
    api.post<AuthResponse>("/api/auth/refresh", { refreshToken }),
};
