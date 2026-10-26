
import { NavLink, useNavigate } from "react-router-dom";
import {
  HeartPulse, LayoutDashboard, Users, MessagesSquare,
  Mic, Brain, Bell, BookOpen, Settings, LogOut, Headset
} from "lucide-react";

const links = [
  { to: "/dashboard", label: "Dashboard", Icon: LayoutDashboard, end: true },
  { to: "/dashboard/patient", label: "Patient Profile", Icon: Users },
  { to: "/dashboard/conversations", label: "Conversations", Icon: MessagesSquare },
  { to: "/dashboard/voice", label: "Voice Assistant", Icon: Mic },
  { to: "/dashboard/memory", label: "Memory & Preferences", Icon: Brain },
  { to: "/dashboard/alerts", label: "Alerts", Icon: Bell },
  { to: "/dashboard/resources", label: "Caregiver Resources", Icon: BookOpen },
  { to: "/dashboard/settings", label: "Settings", Icon: Settings },
];

export default function Sidebar() {
  const navigate = useNavigate();

  function logout() {
    localStorage.removeItem("clara_logged_in");
    navigate("/login", { replace: true });
  }

  return (
    <aside className="clara-sidebar">
      <NavLink to="/dashboard" className="clara-brand">
        <span className="brand-symbol"><HeartPulse size={27} /></span>
        <span>
          <strong>CLARA</strong>
          <small>AI Companion for Dementia Care</small>
        </span>
      </NavLink>

      <nav className="sidebar-links">
        {links.map(({ to, label, Icon, end }) => (
          <NavLink
            key={to}
            to={to}
            end={end}
            className={({ isActive }) =>
              `sidebar-link ${isActive ? "active" : ""}`
            }
          >
            <Icon size={20} />
            <span>{label}</span>
            {label === "Alerts" && <span className="alert-count">3</span>}
          </NavLink>
        ))}
      </nav>

      <div className="sidebar-help">
        <Headset size={22} />
        <div>
          <strong>Need Help?</strong>
          <small>Get support anytime.</small>
        </div>
      </div>

      <button className="sidebar-logout" onClick={logout}>
        <LogOut size={20} />
        Logout
      </button>
    </aside>
  );
}
