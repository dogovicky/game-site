import React from "react";
import { LoginCard } from "../components/auth/LoginCard";
import { AuthProvider } from "../context/AuthContext";
import { useAuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const LoginWrapper: React.FC = () => {
  const { state } = useAuthContext();
  const navigate = useNavigate();

  // if user is already logged in, redirect to home
  useEffect(() => {
    if (state.user) {
      navigate("/");
    }
  }, [state.user, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-background to-muted">
      <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-8 p-8">
        <div className="hidden md:flex items-center justify-center">
          <div className="space-y-4 text-center">
            <h1 className="text-4xl font-extrabold bg-gradient-primary bg-clip-text text-transparent">Game Hub</h1>
            <p className="text-muted-foreground max-w-sm mx-auto">Sign in to track your games, sync progress and join the community.</p>
          </div>
        </div>

        <div className="flex items-center">
          <LoginCard />
        </div>
      </div>
    </div>
  );
};

const LoginPage: React.FC = () => {
  return (
    <AuthProvider>
      <LoginWrapper />
    </AuthProvider>
  );
};

export default LoginPage;
