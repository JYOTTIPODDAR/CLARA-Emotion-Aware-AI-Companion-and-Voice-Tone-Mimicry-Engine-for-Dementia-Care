
import { Routes, Route, Navigate } from "react-router-dom";

import CaregiverChoice from "../Pages/Authentication/CaregiverChoice";
import CaregiverSignup from "../Pages/Authentication/CaregiverSignup";
import CaregiverLogin from "../Pages/Authentication/CaregiverLogin";
import PatientLogin from "../Pages/Authentication/PatientLogin";

export default function AuthenticationRouting() {
  return (
    <Routes>
      <Route
        path="caregiver-choice"
        element={<CaregiverChoice />}
      />

      <Route
        path="caregiver-signup"
        element={<CaregiverSignup />}
      />

      <Route
        path="caregiver-login"
        element={<CaregiverLogin />}
      />

      <Route
        path="patient"
        element={<PatientLogin />}
      />

      <Route
        path="*"
        element={<Navigate to="caregiver-choice" replace />}
      />
    </Routes>
  );
}
