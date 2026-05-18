import { createFileRoute, Link } from "@tanstack/react-router";
import { useForm } from "react-hook-form";
import { useLogin } from "@/hooks/useAuth";

interface LoginForm {
  username: string;
  password: string;
}

export const Route = createFileRoute("/_auth/login")({
  component: LoginPage,
});

function LoginPage() {
  const { register, handleSubmit, formState: { errors } } = useForm<LoginForm>();
  const login = useLogin();

  return (
    <div>
      <h2 className="text-xl font-semibold mb-6">Sign in</h2>
      <form onSubmit={handleSubmit((data) => login.mutate(data))} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Username</label>
          <input
            {...register("username", { required: "Username is required" })}
            className="w-full px-3 py-2 border border-input rounded-md bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring"
            placeholder="Enter username"
          />
          {errors.username && (
            <p className="text-destructive text-xs mt-1">{errors.username.message}</p>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Password</label>
          <input
            type="password"
            {...register("password", { required: "Password is required" })}
            className="w-full px-3 py-2 border border-input rounded-md bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring"
            placeholder="Enter password"
          />
          {errors.password && (
            <p className="text-destructive text-xs mt-1">{errors.password.message}</p>
          )}
        </div>
        {login.error && (
          <p className="text-destructive text-sm">Invalid credentials. Please try again.</p>
        )}
        <button
          type="submit"
          disabled={login.isPending}
          className="w-full py-2 px-4 bg-primary text-primary-foreground rounded-md text-sm font-medium hover:opacity-90 disabled:opacity-50"
        >
          {login.isPending ? "Signing in..." : "Sign in"}
        </button>
      </form>
      <p className="text-center text-sm text-muted-foreground mt-4">
        Don't have an account?{" "}
        <Link to="/register" className="text-primary hover:underline">
          Register
        </Link>
      </p>
    </div>
  );
}
