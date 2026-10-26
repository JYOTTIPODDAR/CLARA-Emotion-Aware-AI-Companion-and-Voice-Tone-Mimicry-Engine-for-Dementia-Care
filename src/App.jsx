import { createBrowserRouter, RouterProvider } from "react-router-dom";

import LandingRouting from "./router/LandingRouting";
import AuthenticationRouting from "./router/AuthenticationRouting";
import DashboardRouting from "./router/DashboardRouting";

import "./App.css";

const router = createBrowserRouter([
  ...LandingRouting,
  ...AuthenticationRouting,
  ...DashboardRouting,
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
