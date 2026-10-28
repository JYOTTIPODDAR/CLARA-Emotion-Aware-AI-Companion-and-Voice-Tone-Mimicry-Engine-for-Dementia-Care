
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search, Bell, ChevronDown } from "lucide-react";

export default function Navbar() {
  const [search, setSearch] = useState("");
  const [showProfile, setShowProfile] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("clara_logged_in");
    localStorage.removeItem("clara_user_role");
    localStorage.removeItem("clara_patient_id");
    navigate("/login", { replace: true });
  };

  return (
    <header className="clara-topbar">
      <div className="topbar-search">
        <Search size={19} />
        <input
          type="search"
          placeholder="Search anything..."
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          aria-label="Search dashboard"
        />
      </div>

      <div className="topbar-actions">
        <button
          type="button"
          className="icon-button"
          aria-label="Notifications"
          onClick={() => navigate("/dashboard/alerts")}
        >
          <Bell size={22} />
          <span className="notification-dot">3</span>
        </button>

        <div className="profile-menu">
          <button
            type="button"
            className="profile-trigger"
            onClick={() => setShowProfile((previous) => !previous)}
            aria-expanded={showProfile}
            aria-haspopup="true"
          >
            <span className="avatar">JA</span>

            <span className="profile-text">
              <strong>Caregiver</strong>
              <small>CLARA Account</small>
            </span>

            <ChevronDown size={17} />
          </button>

          {showProfile && (
            <div className="profile-dropdown">
              <button
                type="button"
                onClick={() => {
                  setShowProfile(false);
                  navigate("/dashboard/settings");
                }}
              >
                Account Settings
              </button>

              <button type="button" onClick={handleLogout}>
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
