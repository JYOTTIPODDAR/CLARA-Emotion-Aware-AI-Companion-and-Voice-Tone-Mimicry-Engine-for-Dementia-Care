import { Search, Bell, ChevronDown, Menu } from "lucide-react";

export default function DashboardNavbar({ onMenuClick }) {
  return (
    <header className="dashboard-topbar">
      <button
        type="button"
        className="dashboard-mobile-menu"
        onClick={onMenuClick}
        aria-label="Toggle dashboard menu"
      >
        <Menu size={22} />
      </button>

      <label className="dashboard-search">
        <Search size={19} />
        <input type="search" placeholder="Search anything..." />
      </label>

      <div className="dashboard-topbar-actions">
        <button
          className="dashboard-notification"
          type="button"
          aria-label="Notifications"
          onClick={() => window.location.assign("/dashboard/alerts")}
        >
          <Bell size={21} />
          <span>3</span>
        </button>

        <div className="dashboard-user">
          <div className="dashboard-avatar">JA</div>
          <div className="dashboard-user-info">
            <strong>Caregiver</strong>
            <small>Caregiver Account</small>
          </div>
          <ChevronDown size={17} />
        </div>
      </div>
    </header>
  );
}
