import { Navigate, useLocation } from "react-router";
import { useAuthStore } from "../stores/useAuthStore";
import WindowLoader from "../components/loaders/windowLoader/WindowLoader";

export default function PrivateRoute({ children }) {
  const { user, isAuthLoading } = useAuthStore();
  const { pathname } = useLocation();
  if (isAuthLoading) return <WindowLoader />;
  return !user ? <Navigate state={pathname} to={"/auth/login"} /> : children;
}
