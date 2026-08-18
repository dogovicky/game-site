import { useState } from "react";
import { ArrowLeft, CheckCircle2, Mail } from "lucide-react";
import { Link } from "react-router-dom";
import { z } from "zod";
import { useAuth } from "../hooks/useAuth";
import { Button } from "../components/ui/Button";
import { Input } from "../components/ui/Input";

const resetSchema = z.object({
  email: z.string().trim().email("Enter a valid email address"),
});

const ForgotPasswordPage = () => {
  const { resetPassword, loading, error } = useAuth();
  const [email, setEmail] = useState("");
  const [fieldError, setFieldError] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const parsed = resetSchema.safeParse({ email });

    if (!parsed.success) {
      setFieldError(parsed.error.issues[0]?.message ?? "Please enter a valid email");
      setIsSubmitted(false);
      return;
    }

    setFieldError(null);
    try {
      await resetPassword(parsed.data.email);
      setIsSubmitted(true);
    } catch {
      setIsSubmitted(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-background via-background to-muted/60 px-6 py-12">
      <div className="w-full max-w-md rounded-2xl border border-border bg-card/80 p-6 shadow-[0_18px_45px_rgba(15,23,42,0.25)] backdrop-blur-xl md:p-8">
        <div className="mb-6 flex items-center justify-between">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
            <Mail className="h-5 w-5" />
          </div>
          <Link to="/login" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
            <ArrowLeft className="h-4 w-4" />
            Back to login
          </Link>
        </div>

        <div className="mb-6">
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">Account recovery</p>
          <h1 className="mt-2 text-3xl font-bold text-foreground">Forgot password?</h1>
        </div>

        {!isSubmitted ? (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="mb-1.5 block text-sm font-medium text-foreground">Email address</label>
              <Input
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="you@example.com"
              />
              {fieldError && <p className="mt-1 text-xs text-red-500">{fieldError}</p>}
            </div>

            {error && (
              <div className="rounded-lg border border-red-500/20 bg-red-500/5 px-3 py-2 text-sm text-red-500">
                {error}
              </div>
            )}

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Sending reset link..." : "Send reset link"}
            </Button>
          </form>
        ) : (
          <div className="space-y-4">
            <div className="flex items-center gap-2 rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-3 py-3 text-sm text-emerald-500">
              <CheckCircle2 className="h-4 w-4" />
              A reset link has been sent to {email}.
            </div>

            <Button asChild className="w-full">
              <Link to="/login">Return to sign in</Link>
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
