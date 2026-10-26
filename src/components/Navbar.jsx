
import { useState } from "react";
import { Search, Bell, ChevronDown } from "lucide-react";

export default function Navbar() {
  const [search, setSearch] = useState("");
  const [showProfile, setShowProfile] = useState(false);

  return (
    <header className="clara-topbar">
      <div className="topbar-search">
        <Search size={19} />
        <input
          type="search"
          placeholder="Search anything..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          aria-label="Search dashboard"
        />
      </div>

      <div className="topbar-actions">
        <button
          className="icon-button"
          aria-label="Notifications"
          onClick={() => window.location.assign("/dashboard/alerts")}
        >
          <Bell size={22} />
          <span className="notification-dot">3</span>
        </button>

        <div className="profile-menu">
          <button
            className="profile-trigger"
            onClick={() => setShowProfile(!showProfile)}
          >
            <span className="avatar">JK</span>
            <span className="profile-text">
              <strong>Caregiver</strong>
              <small>CLARA Account</small>
            </span>
            <ChevronDown size={17} />
          </button>

          {showProfile && (
            <div className="profile-dropdown">
              <button onClick={() =>
                window.location.assign("/dashboard/settings")
              }>
                Account Settings
              </button>
              <button onClick={() => {
                localStorage.removeItem("clara_logged_in");
                window.location.assign("/login");
              }}>
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
