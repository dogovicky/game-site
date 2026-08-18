import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";

export function useAuthRedirect() {
  const { state } = useAuthContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (state.user) {
      navigate("/", { replace: true });
    }
  }, [state.user, navigate]);
}
