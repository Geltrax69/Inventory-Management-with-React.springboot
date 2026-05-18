import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import DashboardLayout from "@/layouts/DashboardLayout";
import { useAuthStore } from "@/store/authStore";

export const Route = createFileRoute("/_dashboard")({
  beforeLoad: () => {
    const isAuthenticated = useAuthStore.getState().isAuthenticated;
    if (!isAuthenticated) {
      throw redirect({ to: "/login" });
    }
  },
  component: DashboardLayout,
});
