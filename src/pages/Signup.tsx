import { AuthProvider, useAuthContext } from "../context/AuthContext";
import { useAuthRedirect } from "../hooks/useAuthRedirect";
import { SignupCard } from "../components/auth/SignupCard";

const SignupWrapper = () => {
  useAuthContext();
  useAuthRedirect();

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/80">
      <div className="mx-auto grid min-h-screen max-w-7xl items-center gap-10 px-6 py-10 lg:grid-cols-[1.15fr_0.85fr]">
        <div className="hidden flex-col justify-center space-y-6 lg:flex">
          <div className="inline-flex w-fit items-center gap-2 rounded-full border border-primary/30 bg-primary/5 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-primary">
            Game Hub
          </div>

          <div className="space-y-5">
            <h1 className="text-5xl font-black tracking-tight text-foreground">
              Level up your
              <span className="bg-gradient-primary bg-clip-text text-transparent"> gaming journey</span>
            </h1>
            <p className="max-w-lg text-lg text-muted-foreground">
              Track the games you play, build your collection, and stay on top of your progress with a profile designed for serious players.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            {[
              { label: "Library", value: "120+" },
              { label: "Achievements", value: "3.2k" },
              { label: "Joined", value: "Weekly" },
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
            <SignupCard />
          </div>
        </div>
      </div>
    </div>
  );
};

const SignupPage = () => {
  return (
    <AuthProvider>
      <SignupWrapper />
    </AuthProvider>
  );
};

export default SignupPage;
