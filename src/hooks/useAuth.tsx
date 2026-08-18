import { useMemo } from "react";
import { useAuthContext } from "../context/AuthContext";

export function useAuth() {
  const ctx = useAuthContext();

  return useMemo(
    () => ({
      user: ctx.state.user,
      token: ctx.state.token,
      loading: ctx.loading,
      error: ctx.error,
      login: ctx.login,
      signup: ctx.signup,
      resetPassword: ctx.resetPassword,
      logout: ctx.logout,
    }),
    [ctx.state, ctx.loading, ctx.error, ctx.login, ctx.signup, ctx.resetPassword, ctx.logout]
  );
}
