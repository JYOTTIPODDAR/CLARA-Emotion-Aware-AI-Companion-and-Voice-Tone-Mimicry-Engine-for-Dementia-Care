
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import LandingRouting from "./router/LandingRouting";
import AuthenticationRouting from "./router/AuthenticationRouting";
import DashboardRouting from "./router/DashboardRouting";
import WhoAreYouRouting from "./router/WhoAreYouRouting";

import ProtectedRoute from "./components/ProtectedRoute";

import PatientDashboard from "./Pages/PatientDashboard/PatientDashboard";
import Home from "./Pages/PatientDashboard/Home";
import Memories from "./Pages/PatientDashboard/Memories";
import MyDay from "./Pages/PatientDashboard/MyDay";
import CallCaregiver from "./Pages/PatientDashboard/CallCaregiver";
import CalmCorner from "./Pages/PatientDashboard/CalmCorner";
import Settings from "./Pages/PatientDashboard/Settings";

import "./App.css";

const router = createBrowserRouter([
  ...LandingRouting,
  ...WhoAreYouRouting,

  {
    path: "/authentication/*",
    element: <AuthenticationRouting />,
  },

  ...DashboardRouting,

  {
    path: "/patient-dashboard",
    element: (
      <ProtectedRoute allowedRole="patient">
        <PatientDashboard />
      </ProtectedRoute>
    ),
    children: [
      { index: true, element: <Home /> },
      { path: "memories", element: <Memories /> },
      { path: "day", element: <MyDay /> },
      { path: "caregiver", element: <CallCaregiver /> },
      { path: "calm", element: <CalmCorner /> },
      { path: "settings", element: <Settings /> },
    ],
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
