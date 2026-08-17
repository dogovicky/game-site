import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Input } from "../ui/Input";
import { Button } from "../ui/Button";
import { useAuth } from "../../hooks/useAuth";
import { AuthCredentials } from "../../types/auth";
import { motion } from "framer-motion";

const schema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters" }),
});

type FormData = z.infer<typeof schema>;

export const LoginCard = () => {
  const { login } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    defaultValues: { email: "", password: "" },
  });

  const onSubmit = async (data: FormData) => {
    // validate once with zod for a second safety net
    const parsed = schema.safeParse(data);
    if (!parsed.success) {
      // react-hook-form already shows errors, but short-circuit if zod fails
      return;
    }

    try {
      await login(data as AuthCredentials);
      // Optionally: redirect is handled by the caller (page)
    } catch (e) {
      // login() already sets error in context; nothing else to do here
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className="w-full max-w-md mx-auto bg-card/80 backdrop-blur rounded-xl p-6 shadow-lg border"
    >
      <h2 className="text-2xl font-bold mb-2">Welcome back</h2>
      <p className="text-sm text-muted-foreground mb-6">Log in to access your games and progress.</p>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="text-sm mb-1 block">Email</label>
          <Input type="email" placeholder="you@example.com" {...register("email", { required: true })} />
          {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email.message}</p>}
        </div>

        <div>
          <label className="text-sm mb-1 block">Password</label>
          <Input type="password" placeholder="••••••••" {...register("password", { required: true })} />
          {errors.password && <p className="text-xs text-red-500 mt-1">{errors.password.message}</p>}
        </div>

        <div className="flex items-center justify-between">
          <div className="text-sm">
            <a href="#" className="text-primary underline">Forgot password?</a>
          </div>
        </div>

        <div>
          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? "Signing in..." : "Sign in"}
          </Button>
        </div>
      </form>
    </motion.div>
  );
};
