import { Navigate } from "react-router-dom";

import DashboardLayout from "../components/DashboardLayout";
import ProtectedRoute from "../components/ProtectedRoute";

import Dashboard from "../Pages/Dashboard/Dashboard";
import PatientProfile from "../Pages/Dashboard/PatientProfile";
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
      <ProtectedRoute>
        <DashboardLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        element: <Dashboard />,
      },
      {
        path: "patient",
        element: <PatientProfile />,
      },
      {
        path: "conversations",
        element: <Conversations />,
      },
      {
        path: "voice",
        element: <VoiceAssistant />,
      },
      {
        path: "memory",
        element: <MemoryPreferences />,
      },
      {
        path: "alerts",
        element: <Alerts />,
      },
      {
        path: "resources",
        element: <CaregiverResources />,
      },
      {
        path: "settings",
        element: <Settings />,
      },
      {
        path: "*",
        element: <Navigate to="/dashboard" replace />,
      },
    ],
  },
];

export default DashboardRouting;
