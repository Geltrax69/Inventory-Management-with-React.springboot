import { useMutation } from "@tanstack/react-query";
import { authService } from "@/services/auth.service";
import { useAuthStore } from "@/store/authStore";
import { useNavigate } from "@tanstack/react-router";

export const useLogin = () => {
  const setAuth = useAuthStore((s) => s.setAuth);
  const navigate = useNavigate();

  return useMutation({
    mutationFn: ({ username, password }: { username: string; password: string }) =>
      authService.login(username, password).then((r) => r.data),
    onSuccess: (data) => {
      setAuth(data);
      navigate({ to: "/dashboard" });
    },
  });
};

export const useRegister = () => {
  const setAuth = useAuthStore((s) => s.setAuth);
  const navigate = useNavigate();

  return useMutation({
    mutationFn: ({
      username,
      password,
      email,
    }: {
      username: string;
      password: string;
      email: string;
    }) => authService.register(username, password, email).then((r) => r.data),
    onSuccess: (data) => {
      setAuth(data);
      navigate({ to: "/dashboard" });
    },
  });
};

export const useLogout = () => {
  const logout = useAuthStore((s) => s.logout);
  const navigate = useNavigate();

  return () => {
    logout();
    navigate({ to: "/login" });
  };
};
