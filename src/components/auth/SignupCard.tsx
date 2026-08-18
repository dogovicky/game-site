import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2, Gamepad2, ShieldCheck } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { useAuthForm } from "../../hooks/useAuthForm";
import { Button } from "../ui/Button";
import { Input } from "../ui/Input";
import { signupSchema, type SignupFormValues } from "../../lib/authValidation";

const defaultValues: SignupFormValues = {
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
};

export const SignupCard = () => {
  const { signup, loading } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
    submitError,
    isSuccess,
  } = useAuthForm<SignupFormValues>({
    defaultValues,
    schema: signupSchema,
    onSubmit: async (values) => {
      await signup({
        name: values.name,
        email: values.email,
        password: values.password,
        confirmPassword: values.confirmPassword,
      });
    },
    onError: (error) => {
      if (error instanceof Error) {
        return error.message;
      }

      return "Unable to create your account right now.";
    },
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="w-full max-w-xl rounded-2xl border border-border/70 bg-card/80 p-6 shadow-[0_18px_50px_rgba(15,23,42,0.25)] backdrop-blur-xl md:p-8"
    >
      <div className="mb-6 flex items-center gap-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
          <Gamepad2 className="h-5 w-5" />
        </div>
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">Join the club</p>
          <h2 className="text-2xl font-bold">Create your account</h2>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="signup-name" className="mb-1.5 block text-sm font-medium text-foreground">Full name</label>
          <Input id="signup-name" placeholder="Alex Carter" {...register("name")} />
          {errors.name && <p className="mt-1 text-xs text-red-500">{errors.name.message}</p>}
        </div>

        <div>
          <label htmlFor="signup-email" className="mb-1.5 block text-sm font-medium text-foreground">Email</label>
          <Input id="signup-email" type="email" placeholder="you@example.com" {...register("email")} />
          {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email.message}</p>}
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <label htmlFor="signup-password" className="mb-1.5 block text-sm font-medium text-foreground">Password</label>
            <Input id="signup-password" type="password" placeholder="••••••••" {...register("password")} />
            {errors.password && <p className="mt-1 text-xs text-red-500">{errors.password.message}</p>}
          </div>

          <div>
            <label htmlFor="signup-confirm-password" className="mb-1.5 block text-sm font-medium text-foreground">Confirm password</label>
            <Input id="signup-confirm-password" type="password" placeholder="••••••••" {...register("confirmPassword")} />
            {errors.confirmPassword && (
              <p className="mt-1 text-xs text-red-500">{errors.confirmPassword.message}</p>
            )}
          </div>
        </div>

        <div className="rounded-xl border border-border bg-muted/40 p-3 text-sm text-muted-foreground">
          <div className="flex items-center gap-2 text-foreground">
            <ShieldCheck className="h-4 w-4 text-green-500" />
            <span className="font-medium">Secure setup</span>
          </div>
          <p className="mt-1">Your account is protected with encrypted session handling and safe local persistence.</p>
        </div>

        {submitError && (
          <div className="rounded-lg border border-red-500/20 bg-red-500/5 px-3 py-2 text-sm text-red-500">
            {submitError}
          </div>
        )}

        {isSuccess && (
          <div className="flex items-center gap-2 rounded-lg border border-emerald-500/30 bg-emerald-500/10 px-3 py-2 text-sm text-emerald-500">
            <CheckCircle2 className="h-4 w-4" />
            Account created successfully.
          </div>
        )}

        <Button type="submit" className="w-full gap-2" disabled={loading}>
          {loading ? "Creating account..." : "Create account"}
          {!loading && <ArrowRight className="h-4 w-4" />}
        </Button>
      </form>

      <p className="mt-5 text-center text-sm text-muted-foreground">
        Already have an account?{" "}
        <Link to="/login" className="font-medium text-primary underline-offset-4 hover:underline">
          Sign in
        </Link>
      </p>
    </motion.div>
  );
};
