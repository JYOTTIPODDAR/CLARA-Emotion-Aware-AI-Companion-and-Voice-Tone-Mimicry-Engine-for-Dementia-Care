
import { Navigate, useLocation } from "react-router-dom";

export default function ProtectedRoute({
  children,
  allowedRole,
}) {
  const location = useLocation();

  const isLoggedIn =
    localStorage.getItem("clara_logged_in") === "true";

  const userRole = localStorage.getItem("clara_user_role");

  if (!isLoggedIn) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  if (allowedRole && userRole !== allowedRole) {
    if (userRole === "patient") {
      return <Navigate to="/patient-dashboard" replace />;
    }

    return <Navigate to="/dashboard" replace />;
  }

  return children;
}
