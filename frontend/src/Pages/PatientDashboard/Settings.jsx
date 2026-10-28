
import { useState } from "react";
import { Settings as SettingsIcon, Languages, Volume2, Type, Check } from "lucide-react";

export default function Settings() {
  const [language, setLanguage] = useState(
    () => localStorage.getItem("clara_patient_language") || "English"
  );
  const [voice, setVoice] = useState(
    () => localStorage.getItem("clara_patient_voice") !== "false"
  );
  const [largeText, setLargeText] = useState(
    () => localStorage.getItem("clara_patient_large_text") === "true"
  );
  const [saved, setSaved] = useState(false);

  function saveSettings() {
    localStorage.setItem("clara_patient_language", language);
    localStorage.setItem("clara_patient_voice", String(voice));
    localStorage.setItem("clara_patient_large_text", String(largeText));
    setSaved(true);
  }

  return (
    <section className="feature-page">
      <div className="feature-heading">
        <span className="feature-icon"><SettingsIcon size={27} /></span>
        <div>
          <h1>Settings</h1>
          <p>Make CLARA feel more comfortable for you.</p>
        </div>
      </div>

      <div className="feature-card feature-settings">
        <label className="feature-setting-row">
          <span className="feature-setting-icon"><Languages size={22} /></span>
          <span className="feature-setting-copy">
            <strong>Preferred language</strong>
            <small>Choose the language you prefer</small>
          </span>
          <select value={language} onChange={(e) => setLanguage(e.target.value)}>
            <option>English</option>
            <option>Hindi</option>
          </select>
        </label>

        <div className="feature-setting-row">
          <span className="feature-setting-icon"><Volume2 size={22} /></span>
          <span className="feature-setting-copy">
            <strong>Voice assistance</strong>
            <small>Allow spoken greetings and messages</small>
          </span>
          <input
            type="checkbox"
            checked={voice}
            onChange={(e) => setVoice(e.target.checked)}
            aria-label="Enable voice assistance"
          />
        </div>

        <div className="feature-setting-row">
          <span className="feature-setting-icon"><Type size={22} /></span>
          <span className="feature-setting-copy">
            <strong>Larger text preference</strong>
            <small>Remember that you prefer larger text</small>
          </span>
          <input
            type="checkbox"
            checked={largeText}
            onChange={(e) => setLargeText(e.target.checked)}
            aria-label="Prefer larger text"
          />
        </div>

        <button className="feature-button" onClick={saveSettings}>
          <Check size={18} /> Save preferences
        </button>

        {saved && (
          <p className="feature-notice" role="status">
            Your preferences have been saved on this device.
          </p>
        )}
      </div>
    </section>
  );
}
