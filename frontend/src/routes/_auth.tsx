import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import AuthLayout from "@/layouts/AuthLayout";
import { useAuthStore } from "@/store/authStore";

export const Route = createFileRoute("/_auth")({
  beforeLoad: () => {
    const isAuthenticated = useAuthStore.getState().isAuthenticated;
    if (isAuthenticated) {
      throw redirect({ to: "/dashboard" });
    }
  },
  component: AuthLayout,
});
