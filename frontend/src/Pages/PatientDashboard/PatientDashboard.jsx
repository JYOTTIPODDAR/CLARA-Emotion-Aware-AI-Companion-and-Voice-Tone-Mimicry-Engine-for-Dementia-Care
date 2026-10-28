
import { useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import {
  Heart,
  House,
  Images,
  CalendarDays,
  Phone,
  Flower2,
  Settings as SettingsIcon,
  LogOut,
  Menu,
  X,
  Sparkles,
} from "lucide-react";
import "./PatientDashboard.css";

const navItems = [
  { label: "Home", path: "/patient-dashboard", icon: House, end: true },
  { label: "My Memories", path: "/patient-dashboard/memories", icon: Images },
  { label: "My Day", path: "/patient-dashboard/day", icon: CalendarDays },
  { label: "Call Caregiver", path: "/patient-dashboard/caregiver", icon: Phone },
  { label: "Calm Corner", path: "/patient-dashboard/calm", icon: Flower2 },
  { label: "Settings", path: "/patient-dashboard/settings", icon: SettingsIcon },
];

export default function PatientDashboard() {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const patientId = localStorage.getItem("clara_patient_id") || "demo";

  const [mood, setMood] = useState(
    () => localStorage.getItem(`clara_patient_mood_${patientId}`) || ""
  );

  const [activities, setActivities] = useState(() => {
    try {
      return JSON.parse(
        localStorage.getItem(`clara_activities_${patientId}`) || "{}"
      );
    } catch {
      return {};
    }
  });

  const patientName = (() => {
    try {
      const patients = JSON.parse(
        localStorage.getItem("clara_demo_patients") || "[]"
      );
      const patient = patients.find(
        (item) => String(item.id) === String(patientId)
      );
      return patient?.name?.trim().split(/\s+/)[0] || "Friend";
    } catch {
      return "Friend";
    }
  })();

  function updateMood(value) {
    setMood(value);
    localStorage.setItem(`clara_patient_mood_${patientId}`, value);
  }

  function toggleActivity(id) {
    const updated = { ...activities, [id]: !activities[id] };
    setActivities(updated);
    localStorage.setItem(
      `clara_activities_${patientId}`,
      JSON.stringify(updated)
    );
  }

  function logout() {
    localStorage.removeItem("clara_logged_in");
    localStorage.removeItem("clara_user_role");
    localStorage.removeItem("clara_patient_id");
    navigate("/login", { replace: true });
  }

  return (
    <div className="pd-app">
      {menuOpen && (
        <button
          className="pd-overlay"
          aria-label="Close navigation menu"
          onClick={() => setMenuOpen(false)}
        />
      )}

      <aside className={`pd-sidebar ${menuOpen ? "pd-sidebar-open" : ""}`}>
        <div className="pd-brand">
          <div className="pd-brand-icon">
            <Heart size={25} fill="currentColor" />
          </div>
          <div>
            <h2>CLARA</h2>
            <span>Your caring companion</span>
          </div>
          <button
            className="pd-close-menu"
            onClick={() => setMenuOpen(false)}
            aria-label="Close menu"
          >
            <X size={22} />
          </button>
        </div>

        <div className="pd-profile">
          <div className="pd-avatar">{patientName.charAt(0).toUpperCase()}</div>
          <div>
            <strong>{patientName}</strong>
            <span>Patient account</span>
          </div>
          <span className="pd-online-dot" title="Dashboard active" />
        </div>

        <p className="pd-nav-heading">YOUR SPACE</p>

        <nav className="pd-nav">
          {navItems.map(({ label, path, icon: Icon, end }) => (
            <NavLink
              key={path}
              to={path}
              end={end}
              onClick={() => setMenuOpen(false)}
              className={({ isActive }) =>
                `pd-nav-link ${isActive ? "pd-nav-active" : ""}`
              }
            >
              <Icon size={21} strokeWidth={1.8} />
              <span>{label}</span>
            </NavLink>
          ))}
        </nav>

        <div className="pd-sidebar-help">
          <div className="pd-help-icon">
            <Sparkles size={21} />
          </div>
          <strong>You are not alone</strong>
          <p>CLARA is here to help you feel comfortable and supported.</p>
        </div>

        <button className="pd-logout" onClick={logout}>
          <LogOut size={19} />
          <span>Log out</span>
        </button>
      </aside>

      <main className="pd-main">
        <header className="pd-topbar">
          <button
            className="pd-menu-button"
            onClick={() => setMenuOpen(true)}
            aria-label="Open navigation menu"
          >
            <Menu size={24} />
          </button>

          <div className="pd-topbar-message">
            <span className="pd-topbar-dot" />
            Your personal care space
          </div>

          <div className="pd-topbar-right">
            <span>{new Date().toLocaleDateString("en-IN", {
              weekday: "short",
              day: "numeric",
              month: "short",
            })}</span>
            <div className="pd-small-avatar">
              {patientName.charAt(0).toUpperCase()}
            </div>
          </div>
        </header>

        <div className="pd-page-content">
          <Outlet
            context={{
              patientName,
              mood,
              updateMood,
              activities,
              toggleActivity,
            }}
          />
          <footer className="pd-footer">
            <Heart size={15} /> Made with care by CLARA
          </footer>
        </div>
      </main>
    </div>
  );
}
