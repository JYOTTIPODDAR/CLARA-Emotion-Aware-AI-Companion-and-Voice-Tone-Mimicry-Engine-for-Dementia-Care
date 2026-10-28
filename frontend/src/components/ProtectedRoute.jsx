import { Navigate } from "react-router-dom";

function ProtectedRoute({ children, allowedRole }) {
  const isLoggedIn =
    localStorage.getItem("clara_logged_in") === "true";

  const userRole = localStorage.getItem("clara_user_role");

  // Login nahi hai toh login page par bhejo
  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  // Role allowed nahi hai toh correct dashboard par bhejo
  if (allowedRole && userRole !== allowedRole) {
    if (userRole === "patient") {
      return <Navigate to="/patient-dashboard" replace />;
    }

    if (userRole === "caregiver") {
      return <Navigate to="/dashboard" replace />;
    }

    // Invalid ya missing role
    localStorage.removeItem("clara_logged_in");
    localStorage.removeItem("clara_user_role");
    localStorage.removeItem("clara_patient_id");

    return <Navigate to="/login" replace />;
  }

  return children;
}

export default ProtectedRoute;
