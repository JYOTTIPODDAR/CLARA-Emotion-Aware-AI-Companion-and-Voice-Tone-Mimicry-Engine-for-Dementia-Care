import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import DashboardNavbar from "./DashboardNavbar";

export default function DashboardLayout() {
  return (
    <div className="clara-app">
      <Sidebar />

      <div className="clara-main">
        <DashboardNavbar />
        <main className="clara-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
