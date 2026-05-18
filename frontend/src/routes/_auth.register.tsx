import { createFileRoute, Link } from "@tanstack/react-router";
import { useForm } from "react-hook-form";
import { useRegister } from "@/hooks/useAuth";

interface RegisterForm {
  username: string;
  email: string;
  password: string;
}

export const Route = createFileRoute("/_auth/register")({
  component: RegisterPage,
});

function RegisterPage() {
  const { register, handleSubmit, formState: { errors } } = useForm<RegisterForm>();
  const registerMutation = useRegister();

  return (
    <div>
      <h2 className="text-xl font-semibold mb-6">Create account</h2>
      <form
        onSubmit={handleSubmit((data) => registerMutation.mutate(data))}
        className="space-y-4"
      >
        <div>
          <label className="block text-sm font-medium mb-1">Username</label>
          <input
            {...register("username", { required: "Username is required", minLength: { value: 3, message: "Min 3 characters" } })}
            className="w-full px-3 py-2 border border-input rounded-md bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring"
          />
          {errors.username && <p className="text-destructive text-xs mt-1">{errors.username.message}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Email</label>
          <input
            type="email"
            {...register("email", { required: "Email is required" })}
            className="w-full px-3 py-2 border border-input rounded-md bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring"
          />
          {errors.email && <p className="text-destructive text-xs mt-1">{errors.email.message}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Password</label>
          <input
            type="password"
            {...register("password", { required: "Password is required", minLength: { value: 6, message: "Min 6 characters" } })}
            className="w-full px-3 py-2 border border-input rounded-md bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring"
          />
          {errors.password && <p className="text-destructive text-xs mt-1">{errors.password.message}</p>}
        </div>
        {registerMutation.error && (
          <p className="text-destructive text-sm">Registration failed. Please try again.</p>
        )}
        <button
          type="submit"
          disabled={registerMutation.isPending}
          className="w-full py-2 px-4 bg-primary text-primary-foreground rounded-md text-sm font-medium hover:opacity-90 disabled:opacity-50"
        >
          {registerMutation.isPending ? "Creating account..." : "Create account"}
        </button>
      </form>
      <p className="text-center text-sm text-muted-foreground mt-4">
        Already have an account?{" "}
        <Link to="/login" className="text-primary hover:underline">
          Sign in
        </Link>
      </p>
    </div>
  );
}
