
import { useState } from "react";
import "./Dashboard.css";

export default function Settings() {
  const [profile, setProfile] = useState({
    name: "Jyoti Poddar",
    email: "caregiver@example.com",
    phone: "",
    role: "Primary Caregiver",
  });

  const [notifications, setNotifications] = useState({
    urgentAlerts: true,
    dailySummary: true,
    conversationUpdates: false,
    reminders: true,
  });

  const [preferences, setPreferences] = useState({
    patient: "Savitri Devi",
    language: "English",
    voice: "Warm and gentle",
    sound: true,
    privacy: true,
  });

  const [savedMessage, setSavedMessage] = useState("");

  const updateProfile = (event) => {
    const { name, value } = event.target;

    setProfile((previous) => ({
      ...previous,
      [name]: value,
    }));

    setSavedMessage("");
  };

  const toggleNotification = (key) => {
    setNotifications((previous) => ({
      ...previous,
      [key]: !previous[key],
    }));

    setSavedMessage("");
  };

  const togglePreference = (key) => {
    setPreferences((previous) => ({
      ...previous,
      [key]: !previous[key],
    }));

    setSavedMessage("");
  };

  const handleSave = (event) => {
    event.preventDefault();
    setSavedMessage(
      "Settings updated in this demo. Connect the backend to persist changes."
    );
  };

  return (
    <div className="care-dashboard">
      <div className="care-page-heading">
        <div>
          <p className="care-eyebrow">YOUR ACCOUNT</p>
          <h1>Settings</h1>
          <p className="care-muted">
            Manage your caregiver profile, CLARA preferences, and notifications.
          </p>
        </div>
      </div>

      {savedMessage && (
        <div className="care-settings-message" role="status">
          <span>✓</span>
          {savedMessage}
        </div>
      )}

      <form onSubmit={handleSave} className="care-settings-layout">
        <div className="care-settings-main">
          <section className="care-main-card care-settings-card">
            <div className="care-settings-section-heading">
              <div className="care-settings-heading-icon">👤</div>
              <div>
                <h2>Caregiver profile</h2>
                <p>Update your personal information.</p>
              </div>
            </div>

            <div className="care-settings-profile">
              <div className="care-settings-avatar">
                {profile.name.trim().charAt(0).toUpperCase() || "C"}
              </div>
              <div>
                <h3>{profile.name || "Caregiver"}</h3>
                <p>{profile.role}</p>
              </div>
            </div>

            <div className="care-settings-form-grid">
              <label>
                Full name
                <input
                  name="name"
                  value={profile.name}
                  onChange={updateProfile}
                  placeholder="Enter your name"
                  required
                />
              </label>

              <label>
                Email address
                <input
                  name="email"
                  type="email"
                  value={profile.email}
                  onChange={updateProfile}
                  placeholder="Enter your email"
                  required
                />
              </label>

              <label>
                Phone number
                <input
                  name="phone"
                  type="tel"
                  value={profile.phone}
                  onChange={updateProfile}
                  placeholder="Enter phone number"
                />
              </label>

              <label>
                Caregiver role
                <select
                  name="role"
                  value={profile.role}
                  onChange={updateProfile}
                >
                  <option>Primary Caregiver</option>
                  <option>Family Member</option>
                  <option>Professional Caregiver</option>
                </select>
              </label>
            </div>
          </section>

          <section className="care-main-card care-settings-card">
            <div className="care-settings-section-heading">
              <div className="care-settings-heading-icon">🔔</div>
              <div>
                <h2>Notifications</h2>
                <p>Choose which updates you want to receive.</p>
              </div>
            </div>

            <div className="care-settings-options">
              <div className="care-settings-option">
                <div>
                  <h3>Urgent alerts</h3>
                  <p>Notifications for important patient care events.</p>
                </div>
                <button
                  type="button"
                  role="switch"
                  aria-checked={notifications.urgentAlerts}
                  className={`care-settings-switch ${
                    notifications.urgentAlerts ? "enabled" : ""
                  }`}
                  onClick={() => toggleNotification("urgentAlerts")}
                  aria-label="Toggle urgent alerts"
                >
                  <span />
                </button>
              </div>

              <div className="care-settings-option">
                <div>
                  <h3>Daily care summary</h3>
                  <p>A summary of patient activities and interactions.</p>
                </div>
                <button
                  type="button"
                  role="switch"
                  aria-checked={notifications.dailySummary}
                  className={`care-settings-switch ${
                    notifications.dailySummary ? "enabled" : ""
                  }`}
                  onClick={() => toggleNotification("dailySummary")}
                  aria-label="Toggle daily care summary"
                >
                  <span />
                </button>
              </div>

              <div className="care-settings-option">
                <div>
                  <h3>Conversation updates</h3>
                  <p>Updates about CLARA conversations.</p>
                </div>
                <button
                  type="button"
                  role="switch"
                  aria-checked={notifications.conversationUpdates}
                  className={`care-settings-switch ${
                    notifications.conversationUpdates ? "enabled" : ""
                  }`}
                  onClick={() => toggleNotification("conversationUpdates")}
                  aria-label="Toggle conversation updates"
                >
                  <span />
                </button>
              </div>

              <div className="care-settings-option">
                <div>
                  <h3>Care reminders</h3>
                  <p>Reminders for routines and scheduled activities.</p>
                </div>
                <button
                  type="button"
                  role="switch"
                  aria-checked={notifications.reminders}
                  className={`care-settings-switch ${
                    notifications.reminders ? "enabled" : ""
                  }`}
                  onClick={() => toggleNotification("reminders")}
                  aria-label="Toggle care reminders"
                >
                  <span />
                </button>
              </div>
            </div>
          </section>

          <section className="care-main-card care-settings-card">
            <div className="care-settings-section-heading">
              <div className="care-settings-heading-icon">💜</div>
              <div>
                <h2>CLARA preferences</h2>
                <p>Personalise the companion experience.</p>
              </div>
            </div>

            <div className="care-settings-form-grid">
              <label>
                Selected patient
                <select
                  value={preferences.patient}
                  onChange={(event) => {
                    setPreferences((previous) => ({
                      ...previous,
                      patient: event.target.value,
                    }));
                    setSavedMessage("");
                  }}
                >
                  <option>Savitri Devi</option>
                  <option>Ramesh Kumar</option>
                  <option>Kamla Sharma</option>
                  <option>Om Prakash</option>
                </select>
              </label>

              <label>
                Preferred language
                <select
                  value={preferences.language}
                  onChange={(event) => {
                    setPreferences((previous) => ({
                      ...previous,
                      language: event.target.value,
                    }));
                    setSavedMessage("");
                  }}
                >
                  <option>English</option>
                  <option>Hindi</option>
                  <option>Hinglish</option>
                </select>
              </label>

              <label>
                Voice style
                <select
                  value={preferences.voice}
                  onChange={(event) => {
                    setPreferences((previous) => ({
                      ...previous,
                      voice: event.target.value,
                    }));
                    setSavedMessage("");
                  }}
                >
                  <option>Warm and gentle</option>
                  <option>Calm and reassuring</option>
                  <option>Friendly and cheerful</option>
                </select>
              </label>
            </div>

            <div className="care-settings-options care-settings-preference-options">
              <div className="care-settings-option">
                <div>
                  <h3>Sound effects</h3>
                  <p>Enable sounds for supported interface interactions.</p>
                </div>
                <button
                  type="button"
                  role="switch"
                  aria-checked={preferences.sound}
                  className={`care-settings-switch ${
                    preferences.sound ? "enabled" : ""
                  }`}
                  onClick={() => togglePreference("sound")}
                  aria-label="Toggle sound effects"
                >
                  <span />
                </button>
              </div>

              <div className="care-settings-option">
                <div>
                  <h3>Privacy preference</h3>
                  <p>
                    Prefer keeping patient information private on shared screens.
                  </p>
                </div>
                <button
                  type="button"
                  role="switch"
                  aria-checked={preferences.privacy}
                  className={`care-settings-switch ${
                    preferences.privacy ? "enabled" : ""
                  }`}
                  onClick={() => togglePreference("privacy")}
                  aria-label="Toggle privacy preference"
                >
                  <span />
                </button>
              </div>
            </div>
          </section>
        </div>

        <aside className="care-settings-sidebar">
          <div className="care-main-card care-settings-help-card">
            <span className="care-settings-help-icon">🌿</span>
            <h2>Your care, your way</h2>
            <p>
              CLARA is designed to support familiar, reassuring interactions.
              Preferences should reflect the patient's comfort and needs.
            </p>
          </div>

          <div className="care-main-card care-settings-info-card">
            <h3>Account information</h3>
            <div>
              <span>Account type</span>
              <strong>Caregiver</strong>
            </div>
            <div>
              <span>Platform</span>
              <strong>CLARA Companion</strong>
            </div>
            <div>
              <span>Environment</span>
              <strong>Demo</strong>
            </div>
          </div>

          <div className="care-settings-save-area">
            <button type="submit" className="care-primary-button">
              Save changes
            </button>
            <p>Your changes are not persisted until backend integration.</p>
          </div>
        </aside>
      </form>
    </div>
  );
}
