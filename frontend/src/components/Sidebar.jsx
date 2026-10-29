
import { NavLink, useNavigate } from "react-router-dom";
import {
  HeartPulse,
  LayoutDashboard,
  Users,
  MessagesSquare,
  Mic,
  Brain,
  Bell,
  BookOpen,
  Settings,
  LogOut,
  Headset,
} from "lucide-react";
import "./Sidebar.css";

const links = [
  { to: "/dashboard", label: "Dashboard", Icon: LayoutDashboard, end: true },
  { to: "/dashboard/patient", label: "My Patients", Icon: Users },
  { to: "/dashboard/conversations", label: "Conversations", Icon: MessagesSquare },
  { to: "/dashboard/voice", label: "Voice Profiles", Icon: Mic },
  { to: "/dashboard/memory", label: "Memory Library", Icon: Brain },
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
        <span className="clara-brand-symbol">
          <HeartPulse size={29} strokeWidth={2.1} />
        </span>

        <span className="clara-brand-text">
          <strong>CLARA</strong>
          <small>A Familiar Voice, A Calmer Day</small>
        </span>
      </NavLink>

      <nav className="sidebar-links" aria-label="Caregiver navigation">
        {links.map(({ to, label, Icon, end }) => (
          <NavLink
            key={to}
            to={to}
            end={end}
            className={({ isActive }) =>
              `sidebar-link ${isActive ? "active" : ""}`
            }
          >
            <Icon size={20} strokeWidth={1.8} />
            <span>{label}</span>

            {label === "Alerts" && (
              <span className="alert-count">3</span>
            )}
          </NavLink>
        ))}
      </nav>

      <div className="sidebar-bottom">
        <div className="sidebar-help">
          <Headset size={22} />
          <div>
            <strong>Need Help?</strong>
            <small>Get support anytime.</small>
          </div>
        </div>

        <div className="sidebar-caregiver">
          <div className="sidebar-caregiver-avatar">JP</div>
          <div className="sidebar-caregiver-info">
            <strong>Jyoti Poddar</strong>
            <small>Caregiver</small>
          </div>
        </div>

        <button className="sidebar-logout" onClick={logout}>
          <LogOut size={19} />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
}
