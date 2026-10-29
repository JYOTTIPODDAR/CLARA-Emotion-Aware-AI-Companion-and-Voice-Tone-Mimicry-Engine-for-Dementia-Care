
import { useMemo, useState } from "react";
import "./Dashboard.css";

const initialAlerts = [
  {
    id: 1,
    title: "Patient may be feeling anxious",
    description:
      "Savitri Devi's conversation showed signs of distress. Consider checking in with her.",
    patient: "Savitri Devi",
    severity: "High",
    type: "Emotional wellbeing",
    time: "10 minutes ago",
    icon: "💜",
    unread: true,
  },
  {
    id: 2,
    title: "Medication reminder",
    description:
      "The scheduled medication reminder has not been acknowledged.",
    patient: "Ramesh Kumar",
    severity: "Medium",
    type: "Daily care",
    time: "35 minutes ago",
    icon: "💊",
    unread: true,
  },
  {
    id: 3,
    title: "Routine check-in completed",
    description:
      "Kamla Sharma completed her scheduled morning conversation.",
    patient: "Kamla Sharma",
    severity: "Low",
    type: "Activity",
    time: "1 hour ago",
    icon: "✓",
    unread: false,
  },
  {
    id: 4,
    title: "Caregiver follow-up suggested",
    description:
      "Om Prakash may benefit from a familiar voice or a reassuring conversation.",
    patient: "Om Prakash",
    severity: "Medium",
    type: "Emotional wellbeing",
    time: "2 hours ago",
    icon: "🫶",
    unread: true,
  },
  {
    id: 5,
    title: "Daily summary is ready",
    description:
      "The latest care activity summary is available to review.",
    patient: "Savitri Devi",
    severity: "Low",
    type: "Report",
    time: "Yesterday",
    icon: "📋",
    unread: false,
  },
];

const filters = ["All", "High", "Medium", "Low"];

export default function Alerts() {
  const [alerts, setAlerts] = useState(initialAlerts);
  const [activeFilter, setActiveFilter] = useState("All");
  const [patientFilter, setPatientFilter] = useState("All patients");

  const filteredAlerts = useMemo(() => {
    return alerts.filter((alert) => {
      const matchesSeverity =
        activeFilter === "All" || alert.severity === activeFilter;

      const matchesPatient =
        patientFilter === "All patients" ||
        alert.patient === patientFilter;

      return matchesSeverity && matchesPatient;
    });
  }, [alerts, activeFilter, patientFilter]);

  const markAsRead = (id) => {
    setAlerts((previous) =>
      previous.map((alert) =>
        alert.id === id ? { ...alert, unread: false } : alert
      )
    );
  };

  const markAllAsRead = () => {
    setAlerts((previous) =>
      previous.map((alert) => ({ ...alert, unread: false }))
    );
  };

  const unreadCount = alerts.filter((alert) => alert.unread).length;
  const highCount = alerts.filter(
    (alert) => alert.severity === "High"
  ).length;
  const mediumCount = alerts.filter(
    (alert) => alert.severity === "Medium"
  ).length;

  return (
    <div className="care-dashboard">
      <div className="care-page-heading">
        <div>
          <p className="care-eyebrow">PATIENT MONITORING</p>
          <h1>Alerts & Notifications</h1>
          <p className="care-muted">
            Review care updates and follow up when a patient may need support.
          </p>
        </div>

        <button
          className="care-primary-button"
          onClick={markAllAsRead}
          disabled={unreadCount === 0}
        >
          ✓ Mark all as read
        </button>
      </div>

      <div className="care-stats-grid">
        <div className="care-stat-card">
          <span className="care-stat-icon">🔔</span>
          <div>
            <p>Unread alerts</p>
            <h2>{unreadCount}</h2>
          </div>
        </div>

        <div className="care-stat-card">
          <span className="care-stat-icon">⚠️</span>
          <div>
            <p>High priority</p>
            <h2>{highCount}</h2>
          </div>
        </div>

        <div className="care-stat-card">
          <span className="care-stat-icon">🫶</span>
          <div>
            <p>Needs attention</p>
            <h2>{mediumCount}</h2>
          </div>
        </div>
      </div>

      <div className="care-main-card care-alert-toolbar">
        <div className="care-memory-categories">
          {filters.map((filter) => (
            <button
              key={filter}
              className={`care-memory-category ${
                activeFilter === filter ? "active" : ""
              }`}
              onClick={() => setActiveFilter(filter)}
            >
              {filter}
            </button>
          ))}
        </div>

        <select
          className="care-memory-patient-filter"
          value={patientFilter}
          onChange={(event) => setPatientFilter(event.target.value)}
          aria-label="Filter alerts by patient"
        >
          <option>All patients</option>
          <option>Savitri Devi</option>
          <option>Ramesh Kumar</option>
          <option>Kamla Sharma</option>
          <option>Om Prakash</option>
        </select>
      </div>

      <div className="care-alert-list">
        {filteredAlerts.map((alert) => (
          <article
            key={alert.id}
            className={`care-main-card care-alert-item ${
              alert.unread ? "care-alert-unread" : ""
            }`}
          >
            <div className={`care-alert-icon care-severity-${alert.severity.toLowerCase()}`}>
              {alert.icon}
            </div>

            <div className="care-alert-content">
              <div className="care-alert-title-row">
                <h3>{alert.title}</h3>
                <span
                  className={`care-severity-tag care-severity-tag-${alert.severity.toLowerCase()}`}
                >
                  {alert.severity}
                </span>
              </div>

              <p>{alert.description}</p>

              <div className="care-alert-meta">
                <span>👤 {alert.patient}</span>
                <span>{alert.type}</span>
                <span>{alert.time}</span>
              </div>
            </div>

            <div className="care-alert-actions">
              {alert.unread ? (
                <button
                  className="care-secondary-button"
                  onClick={() => markAsRead(alert.id)}
                >
                  Mark as read
                </button>
              ) : (
                <span className="care-alert-read-label">✓ Read</span>
              )}
            </div>
          </article>
        ))}
      </div>

      {filteredAlerts.length === 0 && (
        <div className="care-main-card care-memory-empty">
          <span>🔔</span>
          <h3>No alerts found</h3>
          <p>Try changing the severity or patient filter.</p>
        </div>
      )}

      <div className="care-memory-privacy">
        <span>ⓘ</span>
        <p>
          <strong>Important</strong>
          <br />
          These are sample alerts for the interface. They are not generated
          from live patient monitoring and should not be used for medical
          decisions.
        </p>
      </div>
    </div>
  );
}
