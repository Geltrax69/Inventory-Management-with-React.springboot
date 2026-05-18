import api from "@/lib/axios";
import type { DashboardStats } from "@/types";

export const analyticsService = {
  getDashboard: () => api.get<DashboardStats>("/api/analytics/dashboard"),
};
