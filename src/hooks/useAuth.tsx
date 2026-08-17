import { useMemo } from "react";
import { useAuthContext } from "../context/AuthContext";

export function useAuth() {
  const ctx = useAuthContext();

  // expose a small API surface and memoize derived values
  return useMemo(
    () => ({
      user: ctx.state.user,
      token: ctx.state.token,
      loading: ctx.loading,
      error: ctx.error,
      login: ctx.login,
      logout: ctx.logout,
    }),
    [ctx.state, ctx.loading, ctx.error]
  );
}
