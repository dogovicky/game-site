import { LoginCard } from "../components/auth/LoginCard";
import { AuthProvider, useAuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const LoginWrapper = () => {
  const { state } = useAuthContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (state.user) {
      navigate("/", { replace: true });
    }
  }, [state.user, navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/80">
      <div className="mx-auto grid min-h-screen max-w-7xl items-center gap-10 px-6 py-10 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="hidden flex-col justify-center space-y-6 lg:flex">
          <div className="inline-flex w-fit items-center gap-2 rounded-full border border-primary/30 bg-primary/5 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-primary">
            Game Hub
          </div>

          <div className="space-y-5">
            <h1 className="text-5xl font-black tracking-tight text-foreground">
              Welcome back to your
              <span className="bg-gradient-primary bg-clip-text text-transparent"> next quest</span>
            </h1>
            <p className="max-w-lg text-lg text-muted-foreground">
              Track your collection, manage saves, and keep your wins in one place with a profile built for serious players.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            {[
              { label: "Games", value: "320" },
              { label: "Achievements", value: "12k" },
              { label: "Progress", value: "92%" },
            ].map((item) => (
              <div key={item.label} className="rounded-2xl border border-border bg-card/60 p-4 shadow-sm">
                <div className="text-2xl font-bold text-foreground">{item.value}</div>
                <div className="text-sm text-muted-foreground">{item.label}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-center">
          <div className="w-full max-w-xl">
            <LoginCard />
          </div>
        </div>
      </div>
    </div>
  );
};

const LoginPage = () => {
  return (
    <AuthProvider>
      <LoginWrapper />
    </AuthProvider>
  );
};

export default LoginPage;
