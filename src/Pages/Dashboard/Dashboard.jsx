
import { useNavigate } from "react-router-dom";
import {
  MessagesSquare, RefreshCw, Bell, Smile, UserRound,
  Heart, ArrowRight, Mic, FileText, CalendarDays,
  ChartNoAxesColumn, Brain, Music, Image, Leaf
} from "lucide-react";
import "./Dashboard.css";

const stats = [
  { label: "Conversations Today", value: "12", change: "+20%", Icon: MessagesSquare, color: "purple" },
  { label: "Repeated Questions", value: "3", change: "+15%", Icon: RefreshCw, color: "pink" },
  { label: "Alerts Need Attention", value: "2", change: "Review", Icon: Bell, color: "orange" },
  { label: "Positive Mood", value: "85%", change: "Demo data", Icon: Smile, color: "green" },
];

const conversations = [
  ["Where is my daughter?", "Repeated Question", "10:30 AM"],
  ["I want to go home...", "Support provided", "09:15 AM"],
  ["Can you tell me about my family?", "Positive Conversation", "08:45 AM"],
  ["I'm feeling confused today.", "Support provided", "08:20 AM"],
];

const alerts = [
  ["Increased agitation", "Example alert · 2 hours ago"],
  ["Medication reminder", "Example reminder · 4 hours ago"],
  ["Sleep pattern", "Example observation · 6 hours ago"],
  ["Repeated questions", "Example alert · 6 hours ago"],
];

export default function Dashboard() {
  const navigate = useNavigate();

  return (
    <div className="dashboard-home">
      <section className="welcome-row">
        <div>
          <p className="eyebrow">CAREGIVER OVERVIEW</p>
          <h1>Good Morning! <span>☀️</span></h1>
          <p>Here's an overview of your loved one's wellbeing and activity.</p>
        </div>
        <div className="date-card">
          <CalendarDays size={23} />
          <div>
            <strong>Today's Overview</strong>
            <small>Care with compassion</small>
          </div>
        </div>
      </section>

      <section className="stats-grid">
        {stats.map(({ label, value, change, Icon, color }) => (
          <article className={`stat-card ${color}`} key={label}>
            <div className="stat-icon"><Icon size={27} /></div>
            <div className="stat-copy">
              <h2>{value}</h2>
              <p>{label}</p>
              <small>{change}</small>
            </div>
          </article>
        ))}
      </section>

      <section className="dashboard-grid">
        <article className="panel patient-panel">
          <div className="panel-heading">
            <h2>Patient Overview</h2>
            <button className="text-button" onClick={() => navigate("/dashboard/patient")}>
              View Profile <ArrowRight size={16} />
            </button>
          </div>
          <div className="patient-details">
            <div className="patient-avatar"><UserRound size={48} /></div>
            <div className="patient-info">
              <h3>Patient Name</h3>
              <p>Age: Not configured</p>
              <p>Condition: Not configured</p>
              <p>Language: Hindi</p>
              <p>Relationship: Not configured</p>
            </div>
            <div className="patient-note">
              <Heart size={20} />
              <div>
                <strong>Care Note</strong>
                <p>Add patient preferences and helpful conversation notes in the profile.</p>
              </div>
            </div>
          </div>
          <button className="secondary-button" onClick={() => navigate("/dashboard/patient")}>
            Edit Patient Profile
          </button>
        </article>

        <article className="panel mood-panel">
          <div className="panel-heading"><h2>Today's Mood</h2></div>
          <div className="mood-content">
            <div className="mood-ring"><strong>85%</strong><small>Positive</small></div>
            <div className="mood-legend">
              <p><span className="legend-dot positive" /> Positive <b>85%</b></p>
              <p><span className="legend-dot neutral" /> Neutral <b>10%</b></p>
              <p><span className="legend-dot attention" /> Needs attention <b>5%</b></p>
            </div>
          </div>
          <small className="demo-note">Illustrative values only — not clinical assessments.</small>
        </article>

        <article className="panel">
          <div className="panel-heading">
            <h2>Recent Conversations</h2>
            <button className="text-button" onClick={() => navigate("/dashboard/conversations")}>View All <ArrowRight size={15} /></button>
          </div>
          <div className="simple-list">
            {conversations.map(([title, status, time]) => (
              <div className="list-row" key={title}>
                <MessagesSquare size={19} />
                <div><strong>{title}</strong><small>{status}</small></div>
                <time>{time}</time>
              </div>
            ))}
          </div>
        </article>

        <article className="panel">
          <div className="panel-heading">
            <h2>Caregiver Alerts</h2>
            <button className="text-button" onClick={() => navigate("/dashboard/alerts")}>View All <ArrowRight size={15} /></button>
          </div>
          <div className="simple-list">
            {alerts.map(([title, detail]) => (
              <div className="list-row" key={title}>
                <Bell size={19} />
                <div><strong>{title}</strong><small>{detail}</small></div>
              </div>
            ))}
          </div>
        </article>

        <article className="panel assistant-panel">
          <div className="panel-heading">
            <h2>CLARA AI Assistant</h2>
            <button className="secondary-button" onClick={() => navigate("/dashboard/voice")}><Mic size={16} /> Voice Mode</button>
          </div>
          <div className="assistant-greeting">
            <span className="assistant-avatar">💜</span>
            <div><strong>Hi, I'm CLARA!</strong><p>How can I help you today?</p></div>
          </div>
          <div className="assistant-actions">
            <button onClick={() => navigate("/dashboard/voice")}><Heart size={16} /> Calm support</button>
            <button onClick={() => navigate("/dashboard/memory")}><Brain size={16} /> Recall a memory</button>
            <button onClick={() => navigate("/dashboard/resources")}><Leaf size={16} /> Suggest activity</button>
          </div>
          <button className="full-button" onClick={() => navigate("/dashboard/voice")}>Open Voice Assistant</button>
        </article>

        <article className="panel">
          <div className="panel-heading"><h2>Quick Actions</h2></div>
          <div className="quick-grid">
            <button onClick={() => navigate("/dashboard/voice")}><Mic /><span>Voice Assistant</span></button>
            <button onClick={() => navigate("/dashboard/conversations")}><FileText /><span>Conversations</span></button>
            <button onClick={() => navigate("/dashboard/alerts")}><CalendarDays /><span>View Alerts</span></button>
            <button onClick={() => navigate("/dashboard/memory")}><ChartNoAxesColumn /><span>Memory Notes</span></button>
          </div>
        </article>

        <article className="panel">
          <div className="panel-heading"><h2>Patient's Interests</h2></div>
          <div className="interest-grid">
            <div><Heart /><span>Family stories</span></div>
            <div><Leaf /><span>Gardening</span></div>
            <div><Music /><span>Music</span></div>
            <div><Image /><span>Family photos</span></div>
          </div>
        </article>
      </section>
    </div>
  );
}
