import { Navigate } from "react-router-dom";

import DashboardLayout from "../components/DashboardLayout";
import ProtectedRoute from "../components/ProtectedRoute";

import Dashboard from "../Pages/Dashboard/Dashboard";
import PatientProfile from "../Pages/Dashboard/PatientProfile";
import PatientDetail from "../Pages/Dashboard/PatientDetail";
import Conversations from "../Pages/Dashboard/Conversations";
import VoiceAssistant from "../Pages/Dashboard/VoiceAssistant";
import MemoryPreferences from "../Pages/Dashboard/MemoryPreferences";
import Alerts from "../Pages/Dashboard/Alerts";
import CaregiverResources from "../Pages/Dashboard/CaregiverResources";
import Settings from "../Pages/Dashboard/Settings";

const DashboardRouting = [
  {
    path: "/dashboard",

    element: (
      <ProtectedRoute allowedRole="caregiver">
        <DashboardLayout />
      </ProtectedRoute>
    ),

    children: [
      // Caregiver Home Dashboard
      {
        index: true,
        element: <Dashboard />,
      },

      // My Patients
      {
        path: "patient",
        element: <PatientProfile />,
      },

      // Individual Patient Details
      {
        path: "patient/:patientId",
        element: <PatientDetail />,
      },

      // Conversations
      {
        path: "conversations",
        element: <Conversations />,
      },

      // Voice Assistant
      {
        path: "voice",
        element: <VoiceAssistant />,
      },

      // Memory and Preferences
      {
        path: "memory",
        element: <MemoryPreferences />,
      },

      // Alerts
      {
        path: "alerts",
        element: <Alerts />,
      },

      // Caregiver Resources
      {
        path: "resources",
        element: <CaregiverResources />,
      },

      // Settings
      {
        path: "settings",
        element: <Settings />,
      },

      // Invalid dashboard route
      {
        path: "*",
        element: <Navigate to="/dashboard" replace />,
      },
    ],
  },
];

export default DashboardRouting;