import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { Input } from "../ui/Input";
import { Button } from "../ui/Button";
import { useAuth } from "../../hooks/useAuth";
import type { AuthCredentials } from "../../types/auth";
import { motion } from "framer-motion";
import { loginSchema, type LoginFormValues } from "../../lib/authValidation";

export const LoginCard = () => {
  const { login, error, loading } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    defaultValues: { email: "", password: "" },
    mode: "onBlur",
  });

  const onSubmit = async (data: LoginFormValues) => {
    const parsed = loginSchema.safeParse(data);
    if (!parsed.success) {
      return;
    }

    await login(data as AuthCredentials);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className="w-full max-w-md mx-auto bg-card/80 backdrop-blur rounded-2xl p-6 shadow-[0_18px_45px_rgba(15,23,42,0.25)] border border-border/70"
    >
      <div className="mb-6">
        <p className="text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">Welcome back</p>
        <h2 className="mt-2 text-3xl font-bold text-foreground">Sign in</h2>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label htmlFor="login-email" className="mb-1.5 block text-sm font-medium text-foreground">Email</label>
          <Input id="login-email" type="email" placeholder="you@example.com" {...register("email", { required: true })} />
          {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email.message}</p>}
        </div>

        <div>
          <label htmlFor="login-password" className="mb-1.5 block text-sm font-medium text-foreground">Password</label>
          <Input id="login-password" type="password" placeholder="••••••••" {...register("password", { required: true })} />
          {errors.password && <p className="mt-1 text-xs text-red-500">{errors.password.message}</p>}
        </div>

        <div className="flex items-center justify-end">
          <Link to="/forgot-password" className="text-sm font-medium text-primary underline-offset-4 hover:underline">
            Forgot password?
          </Link>
        </div>

        {error && (
          <div className="rounded-lg border border-red-500/20 bg-red-500/5 px-3 py-2 text-sm text-red-500">
            {error}
          </div>
        )}

        <div>
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Signing in..." : "Sign in"}
          </Button>
        </div>
      </form>

      <p className="mt-5 text-center text-sm text-muted-foreground">
        New to Game Hub?{" "}
        <Link to="/signup" className="font-medium text-primary underline-offset-4 hover:underline">
          Create an account
        </Link>
      </p>
    </motion.div>
  );
};
