
import { useNavigate } from "react-router-dom";
import {
  Users,
  MessagesSquare,
  BellRing,
  Smile,
  ArrowRight,
  Plus,
  Heart,
  Activity,
  Mic,
  Brain,
  FileText,
  Music,
  AlertTriangle,
  CalendarDays,
} from "lucide-react";

import "./Dashboard.css";

const patients = [
  {
    id: "PT1023",
    name: "Savitri Devi",
    age: 78,
    mood: "Anxious",
    moodClass: "anxious",
    active: "2 min ago",
    initials: "SD",
    color: "rose",
  },
  {
    id: "PT1045",
    name: "Ramesh Kumar",
    age: 82,
    mood: "Calm",
    moodClass: "calm",
    active: "15 min ago",
    initials: "RK",
    color: "blue",
  },
  {
    id: "PT1067",
    name: "Kamla Sharma",
    age: 76,
    mood: "Neutral",
    moodClass: "neutral",
    active: "1 hour ago",
    initials: "KS",
    color: "peach",
  },
  {
    id: "PT1089",
    name: "Om Prakash",
    age: 80,
    mood: "Calm",
    moodClass: "calm",
    active: "3 hours ago",
    initials: "OP",
    color: "green",
  },
];

const alerts = [
  {
    title: "High Anxiety Detected",
    patient: "Savitri Devi",
    description: "Repeated questions about going home",
    time: "10:24 AM",
    type: "danger",
  },
  {
    title: "Unusual Sleep Time",
    patient: "Leela Singh",
    description: "Active later than usual",
    time: "Yesterday",
    type: "info",
  },
  {
    title: "Low Mood Detected",
    patient: "Leela Singh",
    description: "Sounded sad during conversation",
    time: "06:15 PM",
    type: "info",
  },
];

export default function Dashboard() {
  const navigate = useNavigate();

  return (
    <div className="care-dashboard">
      {/* Welcome Section */}
      <section className="care-welcome">
        <div>
          <p className="care-eyebrow">CAREGIVER OVERVIEW</p>

          <h1>
            Welcome back, Jyoti! <span>💜</span>
          </h1>

          <p className="care-muted">
            Here’s how your patients are doing today.
          </p>
        </div>

        <button
          className="care-primary-btn"
          onClick={() => navigate("/dashboard/patient")}
        >
          <Plus size={18} />
          Manage Patients
        </button>
      </section>

      {/* Summary Cards */}
      <section className="care-stat-grid">
        <article className="care-stat-card stat-lilac">
          <span className="care-stat-icon">
            <Users size={23} />
          </span>
          <div>
            <strong>4</strong>
            <p>Total Patients</p>
            <small>Under your care</small>
          </div>
        </article>

        <article className="care-stat-card stat-blue">
          <span className="care-stat-icon">
            <MessagesSquare size={23} />
          </span>
          <div>
            <strong>2</strong>
            <p>Active Conversations</p>
            <small>Right now</small>
          </div>
        </article>

        <article className="care-stat-card stat-rose">
          <span className="care-stat-icon">
            <AlertTriangle size={23} />
          </span>
          <div>
            <strong>1</strong>
            <p>Urgent Alerts</p>
            <small>Needs attention</small>
          </div>
        </article>

        <article className="care-stat-card stat-mint">
          <span className="care-stat-icon">
            <Smile size={23} />
          </span>
          <div>
            <strong>3</strong>
            <p>Stable Patients</p>
            <small>Doing well today</small>
          </div>
        </article>
      </section>

      {/* Patients Section */}
      <section className="care-card care-patients-card">
        <div className="care-card-heading">
          <div>
            <h2>Your Patients</h2>
            <p>Quick overview of the people in your care</p>
          </div>

          <button
            className="care-text-btn"
            onClick={() => navigate("/dashboard/patient")}
          >
            View All <ArrowRight size={16} />
          </button>
        </div>

        <div className="care-patient-cards">
          {patients.map((patient) => (
            <article
              className="care-patient-tile"
              key={patient.id}
            >
              <div
                className={`care-patient-avatar avatar-${patient.color}`}
              >
                {patient.initials}
              </div>

              <h3>{patient.name}</h3>

              <p>
                {patient.age} years
              </p>

              <small>ID: {patient.id}</small>

              <span
                className={`care-mood-pill mood-${patient.moodClass}`}
              >
                {patient.mood}
              </span>

              <small className="care-last-active">
                Last active: {patient.active}
              </small>

              <button
                className="care-outline-btn"
                onClick={() =>
                  navigate(`/dashboard/patient/${patient.id}`)
                }
              >
                View Details <ArrowRight size={14} />
              </button>
            </article>
          ))}
        </div>
      </section>

      {/* Alerts and Conversations */}
      <section className="care-home-grid">
        <article className="care-card">
          <div className="care-card-heading">
            <div>
              <h2>Recent Alerts</h2>
              <p>Items that may need your attention</p>
            </div>

            <button
              className="care-text-btn"
              onClick={() => navigate("/dashboard/alerts")}
            >
              View All <ArrowRight size={15} />
            </button>
          </div>

          {alerts.map((alert) => (
            <div className="care-alert-row" key={alert.title}>
              <span
                className={`care-alert-icon alert-${alert.type}`}
              >
                <BellRing size={19} />
              </span>

              <div className="care-row-copy">
                <strong>{alert.title}</strong>
                <small>{alert.patient} · {alert.description}</small>
              </div>

              <time>{alert.time}</time>
            </div>
          ))}
        </article>

        <article className="care-card">
          <div className="care-card-heading">
            <div>
              <h2>Recent Conversations</h2>
              <p>Recent activity from Clara</p>
            </div>

            <button
              className="care-text-btn"
              onClick={() => navigate("/dashboard/conversations")}
            >
              View All <ArrowRight size={15} />
            </button>
          </div>

          {[
            ["Savitri Devi", "Where is my daughter?", "10:30 AM"],
            ["Ramesh Kumar", "Tell me about my family", "09:45 AM"],
            ["Kamla Sharma", "Can we play some music?", "09:15 AM"],
          ].map(([name, message, time]) => (
            <div className="care-conversation-row" key={name}>
              <span className="care-conversation-icon">
                <MessagesSquare size={19} />
              </span>

              <div className="care-row-copy">
                <strong>{name}</strong>
                <small>“{message}”</small>
              </div>

              <time>{time}</time>
            </div>
          ))}
        </article>

        {/* Clara Assistant */}
        <article className="care-card">
          <div className="care-card-heading">
            <div>
              <h2>CLARA AI Assistant</h2>
              <p>Personalized support for your patients</p>
            </div>

            <span className="care-live-pill">
              <span /> Ready
            </span>
          </div>

          <div className="care-assistant-banner">
            <span className="care-assistant-mark">
              <Heart size={27} />
            </span>

            <div>
              <strong>A calmer moment starts here</strong>
              <p>
                Familiar voices and memories can help patients
                feel safe and supported.
              </p>
            </div>
          </div>

          <div className="care-action-grid">
            <button onClick={() => navigate("/dashboard/voice")}>
              <Mic size={21} />
              <span>Voice Profile</span>
            </button>

            <button onClick={() => navigate("/dashboard/memory")}>
              <Brain size={21} />
              <span>Add Memory</span>
            </button>

            <button onClick={() => navigate("/dashboard/conversations")}>
              <FileText size={21} />
              <span>View Report</span>
            </button>

            <button onClick={() => navigate("/dashboard/resources")}>
              <Music size={21} />
              <span>Calming Activity</span>
            </button>
          </div>
        </article>

        {/* Today's Overview */}
        <article className="care-card">
          <div className="care-card-heading">
            <div>
              <h2>Today’s Overview</h2>
              <p>Care with compassion</p>
            </div>

            <CalendarDays size={24} color="#7045df" />
          </div>

          <div className="care-overview-content">
            <div className="care-overview-icon">
              <Activity size={24} />
            </div>

            <div>
              <strong>Small moments matter</strong>
              <p>
                Keep track of conversations, patient moods,
                and important care reminders throughout the day.
              </p>
            </div>
          </div>

          <button
            className="care-full-btn"
            onClick={() => navigate("/dashboard/alerts")}
          >
            Review Care Alerts <ArrowRight size={16} />
          </button>
        </article>
      </section>

      <p className="care-demo-disclaimer">
        Demo interface · Patient activity and mood information are illustrative.
      </p>
    </div>
  );
}
