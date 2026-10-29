
import { useMemo, useState } from "react";
import {
  Search,
  MessagesSquare,
  Clock3,
  ArrowRight,
  MessageCircle,
} from "lucide-react";
import "./Dashboard.css";

const conversationData = [
  {
    id: 1,
    patient: "Savitri Devi",
    patientId: "PT1023",
    message: "Where is my daughter?",
    reply: "Your daughter is safe. Would you like to look at a family photo?",
    time: "10:30 AM",
    status: "Needs attention",
    mood: "Anxious",
    moodClass: "anxious",
  },
  {
    id: 2,
    patient: "Ramesh Kumar",
    patientId: "PT1045",
    message: "Tell me about my family.",
    reply: "Of course. Let's talk about your favourite family memories.",
    time: "09:45 AM",
    status: "Positive",
    mood: "Calm",
    moodClass: "calm",
  },
  {
    id: 3,
    patient: "Kamla Sharma",
    patientId: "PT1067",
    message: "Can we play some music?",
    reply: "Certainly. Would you like to hear a familiar song?",
    time: "09:15 AM",
    status: "Positive",
    mood: "Neutral",
    moodClass: "neutral",
  },
  {
    id: 4,
    patient: "Om Prakash",
    patientId: "PT1089",
    message: "I want to go home.",
    reply: "You are safe here. Would you like to sit together for a moment?",
    time: "Yesterday",
    status: "Support provided",
    mood: "Calm",
    moodClass: "calm",
  },
];

export default function Conversations() {
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState(null);

  const filtered = useMemo(() => {
    const query = search.toLowerCase().trim();

    return conversationData.filter((item) =>
      `${item.patient} ${item.patientId} ${item.message} ${item.status}`
        .toLowerCase()
        .includes(query)
    );
  }, [search]);

  return (
    <div className="care-dashboard">
      <section className="care-page-top">
        <div>
          <p className="care-eyebrow">PATIENT INTERACTIONS</p>
          <h1>Conversations</h1>
          <p className="care-muted">
            Review recent conversations and supportive responses from Clara.
          </p>
        </div>
      </section>

      <section className="care-stat-grid">
        <article className="care-stat-card stat-lilac">
          <span className="care-stat-icon">
            <MessagesSquare size={23} />
          </span>
          <div>
            <strong>12</strong>
            <p>Conversations Today</p>
            <small>Demo data</small>
          </div>
        </article>

        <article className="care-stat-card stat-blue">
          <span className="care-stat-icon">
            <MessageCircle size={23} />
          </span>
          <div>
            <strong>2</strong>
            <p>Active Conversations</p>
            <small>Demo data</small>
          </div>
        </article>

        <article className="care-stat-card stat-rose">
          <span className="care-stat-icon">
            <Clock3 size={23} />
          </span>
          <div>
            <strong>3</strong>
            <p>Repeated Questions</p>
            <small>Illustrative count</small>
          </div>
        </article>

        <article className="care-stat-card stat-mint">
          <span className="care-stat-icon">
            <MessagesSquare size={23} />
          </span>
          <div>
            <strong>85%</strong>
            <p>Positive Mood</p>
            <small>Illustrative value</small>
          </div>
        </article>
      </section>

      <section className="care-card">
        <div className="care-card-heading">
          <div>
            <h2>Recent Conversations</h2>
            <p>Search and review patient interactions</p>
          </div>
        </div>

        <label className="care-search-box">
          <Search size={19} />
          <input
            type="search"
            placeholder="Search patient, ID or message..."
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />
        </label>

        <div className="care-conversation-list">
          {filtered.map((item) => (
            <article className="care-conversation-card" key={item.id}>
              <div className="care-conversation-card-top">
                <span className="care-conversation-icon">
                  <MessagesSquare size={20} />
                </span>

                <div className="care-row-copy">
                  <strong>{item.patient}</strong>
                  <small>Patient ID: {item.patientId}</small>
                </div>

                <span className={`care-mood-pill mood-${item.moodClass}`}>
                  {item.mood}
                </span>

                <time>{item.time}</time>
              </div>

              <div className="care-message-preview">
                <p>
                  <strong>Patient:</strong> {item.message}
                </p>
                <p>
                  <strong>Clara:</strong> {item.reply}
                </p>
              </div>

              <div className="care-conversation-card-bottom">
                <span className="care-conversation-status">
                  {item.status}
                </span>

                <button
                  className="care-text-btn"
                  onClick={() =>
                    setSelected(selected === item.id ? null : item.id)
                  }
                >
                  {selected === item.id ? "Hide details" : "View details"}
                  <ArrowRight size={15} />
                </button>
              </div>

              {selected === item.id && (
                <div className="care-conversation-expanded">
                  <strong>Conversation summary</strong>
                  <p>{item.reply}</p>
                  <small>
                    This is a sample conversation for UI demonstration.
                    No live patient conversation is connected.
                  </small>
                </div>
              )}
            </article>
          ))}

          {filtered.length === 0 && (
            <p className="care-empty-state">
              No conversations found. Try another search.
            </p>
          )}
        </div>
      </section>

      <p className="care-demo-disclaimer">
        Conversation text is illustrative demo data, not a real patient record.
      </p>
    </div>
  );
}
