
import { useNavigate, useParams } from "react-router-dom";
import {
  ArrowLeft, ArrowRight, CalendarDays, UserRound, HeartPulse,
  Phone, Pencil, ChevronDown, MessageCircle, Smile, Frown,
  Clock3, AlertTriangle, Heart, Info, Plus, Mic, FileText,
  ChartNoAxesColumnIncreasing, Play, MoreVertical, Copy,
} from "lucide-react";
import "./PatientDetail.css";

const patientData = {
  PT1023: {
    name: "Savitri Devi",
    age: 78,
    initials: "SD",
    gender: "Female",
    relationship: "Grandmother",
    condition: "Alzheimer's (Early Stage)",
    mood: "Anxious",
    active: "2 min ago",
    color: "rose",
  },
  PT1045: {
    name: "Ramesh Kumar",
    age: 82,
    initials: "RK",
    gender: "Male",
    relationship: "Father",
    condition: "Dementia",
    mood: "Calm",
    active: "15 min ago",
    color: "blue",
  },
  PT1067: {
    name: "Kamla Sharma",
    age: 76,
    initials: "KS",
    gender: "Female",
    relationship: "Mother",
    condition: "Alzheimer's",
    mood: "Neutral",
    active: "1 hour ago",
    color: "peach",
  },
  PT1089: {
    name: "Om Prakash",
    age: 80,
    initials: "OP",
    gender: "Male",
    relationship: "Grandfather",
    condition: "Dementia",
    mood: "Calm",
    active: "3 hours ago",
    color: "mint",
  },
};

const alertData = [
  {
    title: "High Anxiety Detected",
    description: "Repeated questions about going home (6 times in 20 minutes)",
    time: "10:24 AM",
    type: "danger",
    Icon: AlertTriangle,
  },
  {
    title: "Confusion Detected",
    description: "Asked about a deceased family member",
    time: "09:15 AM",
    type: "rose",
    Icon: HeartPulse,
  },
  {
    title: "Unusual Activity",
    description: "Was active later than usual",
    time: "Yesterday",
    type: "blue",
    Icon: Info,
  },
];

function MoodTimeline() {
  return (
    <div className="pd-chart">
      <div className="pd-chart-legend">
        <span><i className="pd-dot calm" /> Calm</span>
        <span><i className="pd-dot neutral" /> Neutral</span>
        <span><i className="pd-dot anxious" /> Anxious</span>
      </div>

      <div className="pd-chart-plot">
        <div className="pd-chart-y-labels">
          <span>Calm</span>
          <span>Neutral</span>
          <span>Anxious</span>
        </div>
        <svg viewBox="0 0 600 125" preserveAspectRatio="none" role="img" aria-label="Illustrative mood timeline">
          <defs>
            <linearGradient id="pdMoodFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#8b5cf6" stopOpacity=".20" />
              <stop offset="100%" stopColor="#8b5cf6" stopOpacity=".01" />
            </linearGradient>
          </defs>
          {[18, 53, 88, 120].map((y) => (
            <line key={y} x1="4" y1={y} x2="596" y2={y} stroke="#ebe5fa" strokeDasharray="4 5" />
          ))}
          <path
            d="M4 72 C24 68 28 57 45 65 S70 50 90 59 S115 78 135 56 S160 61 180 58 S205 105 225 91 S252 75 270 85 S294 107 315 73 S340 66 360 58 S382 30 400 49 S425 22 444 43 S467 55 487 72 S514 84 534 65 S564 53 596 67 L596 120 L4 120 Z"
            fill="url(#pdMoodFill)"
          />
          <path
            d="M4 72 C24 68 28 57 45 65 S70 50 90 59 S115 78 135 56 S160 61 180 58 S205 105 225 91 S252 75 270 85 S294 107 315 73 S340 66 360 58 S382 30 400 49 S425 22 444 43 S467 55 487 72 S514 84 534 65 S564 53 596 67"
            fill="none"
            stroke="#8655ef"
            strokeWidth="2.8"
            strokeLinecap="round"
          />
          {[45, 90, 135, 180, 225, 270, 315, 360, 400, 444, 487, 534, 570].map((x, i) => {
            const ys = [65, 59, 56, 58, 91, 85, 73, 58, 49, 43, 72, 65, 58];
            return <circle key={x} cx={x} cy={ys[i]} r="3.2" fill={i >= 4 && i <= 6 ? "#e64b9a" : "#8655ef"} />;
          })}
        </svg>
      </div>

      <div className="pd-chart-times">
        <span>6 AM</span><span>10 AM</span><span>2 PM</span>
        <span>6 PM</span><span>10 PM</span>
      </div>
      <p className="pd-chart-footnote">Illustrative demo data · Not a clinical assessment</p>
    </div>
  );
}

export default function PatientDetail() {
  const { patientId } = useParams();
  const navigate = useNavigate();
  const patient = patientData[patientId] || patientData.PT1023;

  const go = (path) => navigate(path);

  return (
    <div className="pd-page">
      <button className="pd-back" onClick={() => go("/dashboard/patient")}>
        <ArrowLeft size={17} /> Back to My Patients
      </button>

      <section className="pd-profile-card">
        <div className="pd-profile-main">
          <div className={`pd-patient-avatar ${patient.color}`}>
            {patient.initials}
            <span className="pd-online-dot" />
          </div>

          <div className="pd-profile-copy">
            <div className="pd-name-line">
              <h1>{patient.name}</h1>
              <span className={`pd-mood-badge ${patient.color}`}>{patient.mood}</span>
            </div>
            <p className="pd-patient-id">
              Patient ID: {patientId || "PT1023"}
              <button
                type="button"
                title="Copy patient ID"
                onClick={() => navigator.clipboard?.writeText(patientId || "PT1023")}
                className="pd-copy-button"
              >
                <Copy size={15} />
              </button>
            </p>
            <div className="pd-meta">
              <span><CalendarDays size={16} /> {patient.age} years</span>
              <span><UserRound size={16} /> {patient.gender}</span>
              <span><Heart size={16} /> Relationship: {patient.relationship}</span>
              <span><HeartPulse size={16} /> {patient.condition}</span>
            </div>
          </div>
        </div>

        <div className="pd-profile-actions">
          <button className="pd-button secondary" onClick={() => go("/dashboard/voice")}>
            <Phone size={16} /> Call Patient
          </button>
          <button className="pd-button secondary" onClick={() => go("/dashboard/settings")}>
            <Pencil size={16} /> Edit Profile
          </button>
          <button className="pd-button primary" onClick={() => go("/dashboard/settings")}>
            More Options <ChevronDown size={16} />
          </button>
        </div>
      </section>

      <nav className="pd-tabs">
        <button className="active">Overview</button>
        <button onClick={() => go("/dashboard/conversations")}>Conversations</button>
        <button onClick={() => go("/dashboard/alerts")}>Daily Report</button>
        <button onClick={() => go("/dashboard/alerts")}>Mood &amp; Insights</button>
        <button onClick={() => go("/dashboard/memory")}>Memories</button>
        <button onClick={() => go("/dashboard/voice")}>Voice Profile</button>
        <button onClick={() => go("/dashboard/alerts")}>Alerts</button>
        <button onClick={() => go("/dashboard/settings")}>Settings</button>
      </nav>

      <div className="pd-main-grid">
        <section className="pd-card pd-summary-card">
          <div className="pd-section-heading">
            <h2>Today's Summary <span>(Oct 29, 2026)</span></h2>
            <button className="pd-link-button" onClick={() => go("/dashboard/conversations")}>
              View Detailed Report <ArrowRight size={15} />
            </button>
          </div>

          <div className="pd-summary-stats">
            <div className="pd-summary-stat lavender">
              <span><MessageCircle size={23} /></span>
              <div><strong>8</strong><small>Conversations</small></div>
            </div>
            <div className="pd-summary-stat mint">
              <span><Smile size={23} /></span>
              <div><strong>5</strong><small>Positive</small></div>
            </div>
            <div className="pd-summary-stat rose">
              <span><Frown size={23} /></span>
              <div><strong>2</strong><small>Anxiety Episodes</small></div>
            </div>
            <div className="pd-summary-stat sky">
              <span><Clock3 size={23} /></span>
              <div><strong>35 min</strong><small>Total Engagement</small></div>
            </div>
          </div>

          <div className="pd-section-heading pd-mood-heading">
            <h2>Mood Timeline</h2>
          </div>
          <MoodTimeline />
        </section>

        <div className="pd-right-column">
          <section className="pd-card">
            <div className="pd-section-heading">
              <h2>Current Status</h2>
              <button className="pd-link-button" onClick={() => go("/dashboard/voice")}>
                Live Activity <ArrowRight size={15} />
              </button>
            </div>

            <div className="pd-current-status">
              <span className="pd-status-icon"><Frown size={26} /></span>
              <div className="pd-status-main">
                <strong>{patient.mood}</strong>
                <small>Detected {patient.active}</small>
              </div>
              <p>Repeated questions about going home.</p>
            </div>
          </section>

          <section className="pd-card pd-alerts-card">
            <div className="pd-section-heading">
              <h2>Recent Alerts for {patient.name}</h2>
              <button className="pd-link-button" onClick={() => go("/dashboard/alerts")}>
                View All <ArrowRight size={15} />
              </button>
            </div>

            {alertData.map(({ title, description, time, type, Icon }) => (
              <div className="pd-alert-row" key={title}>
                <span className={`pd-alert-symbol ${type}`}><Icon size={19} /></span>
                <div className="pd-alert-copy">
                  <strong>{title}</strong>
                  <p>{description}</p>
                </div>
                <small>{time}</small>
                <button className="pd-icon-button" aria-label={`Options for ${title}`}>
                  <MoreVertical size={17} />
                </button>
              </div>
            ))}
          </section>
        </div>
      </div>

      <div className="pd-bottom-grid">
        <section className="pd-card">
          <h2>Quick Actions</h2>
          <div className="pd-quick-actions">
            <button onClick={() => go("/dashboard/memory")} className="lavender">
              <span><MessageCircle size={21} /></span>
              <strong>Add Memory</strong><small>Save a special moment</small>
            </button>
            <button onClick={() => go("/dashboard/voice")} className="rose">
              <span><Mic size={21} /></span>
              <strong>Update Voice</strong><small>Change voice settings</small>
            </button>
            <button onClick={() => go("/dashboard/settings")} className="mint">
              <span><FileText size={21} /></span>
              <strong>Set Responses</strong><small>Customise behaviour</small>
            </button>
            <button onClick={() => go("/dashboard/conversations")} className="sky">
              <span><ChartNoAxesColumnIncreasing size={21} /></span>
              <strong>View Full Report</strong><small>See detailed insights</small>
            </button>
          </div>
        </section>

        <section className="pd-card">
          <div className="pd-section-heading">
            <h2>Personalized Voice</h2>
            <span className="pd-active-badge">● Active</span>
          </div>
          <div className="pd-voice-content">
            <div className="pd-voice-avatar">JA</div>
            <div className="pd-voice-copy">
              <strong>Granddaughter's Voice</strong>
              <p>A familiar and comforting voice for better conversations.</p>
            </div>
          </div>
          <div className="pd-voice-controls">
            <button className="pd-play-button" onClick={() => go("/dashboard/voice")} aria-label="Open voice assistant">
              <Play size={17} fill="currentColor" />
            </button>
            <div className="pd-waveform" aria-hidden="true">
              {Array.from({ length: 35 }, (_, i) => (
                <span key={i} style={{ height: `${8 + ((i * 17) % 25)}px` }} />
              ))}
            </div>
            <button className="pd-button secondary" onClick={() => go("/dashboard/voice")}>Change Voice</button>
          </div>
          <p className="pd-disclaimer">Voice controls are a demo until connected to a voice engine.</p>
        </section>

        <section className="pd-card">
          <div className="pd-section-heading">
            <h2>Caregiver Notes</h2>
            <button className="pd-button primary pd-add-note" onClick={() => go("/dashboard/settings")}>
              <Plus size={15} /> Add Note
            </button>
          </div>
          <div className="pd-note">
            <div className="pd-note-avatar">JP</div>
            <div>
              <div className="pd-note-author">
                <strong>Jyoti Poddar</strong>
                <small>Today, 10:45 AM</small>
              </div>
              <p>Today she was more anxious in the evening. Playing old family songs helped to calm her.</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
