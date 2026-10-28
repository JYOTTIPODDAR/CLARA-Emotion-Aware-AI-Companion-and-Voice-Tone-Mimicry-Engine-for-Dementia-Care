
import React, { useEffect, useState } from "react";
import "./Settings.css";

const patientId = localStorage.getItem("clara_patient_id") || "demo";
const settingsKey = `clara_settings_${patientId}`;

const defaultSettings = {
  name: localStorage.getItem("clara_patient_name") || "",
  fontSize: "medium",
  speechRate: "normal",
  voiceURI: "",
  voiceName: "",
  voiceLang: "",
  reminders: true,
  sound: true,
  highContrast: false,
  reduceMotion: false,
};

function getSavedSettings() {
  try {
    const saved = localStorage.getItem(settingsKey);

    return saved
      ? { ...defaultSettings, ...JSON.parse(saved) }
      : { ...defaultSettings };
  } catch {
    return { ...defaultSettings };
  }
}

export default function Settings() {
  const [settings, setSettings] = useState(getSavedSettings);
  const [message, setMessage] = useState("");
  const [voices, setVoices] = useState([]);
  const [isSpeaking, setIsSpeaking] = useState(false);

  // Load voices available on the current device/browser.
  useEffect(() => {
    if (!("speechSynthesis" in window)) {
      return undefined;
    }

    const loadVoices = () => {
      const availableVoices = window.speechSynthesis.getVoices();
      setVoices(availableVoices);
    };

    loadVoices();

    window.speechSynthesis.addEventListener(
      "voiceschanged",
      loadVoices
    );

    return () => {
      window.speechSynthesis.removeEventListener(
        "voiceschanged",
        loadVoices
      );

      window.speechSynthesis.cancel();
    };
  }, []);

  // Apply accessibility preferences.
  useEffect(() => {
    const root = document.documentElement;

    root.dataset.claraFontSize = settings.fontSize;
    root.dataset.claraHighContrast = String(settings.highContrast);
    root.dataset.claraReduceMotion = String(settings.reduceMotion);

    return () => {
      delete root.dataset.claraFontSize;
      delete root.dataset.claraHighContrast;
      delete root.dataset.claraReduceMotion;
    };
  }, [
    settings.fontSize,
    settings.highContrast,
    settings.reduceMotion,
  ]);

  const updateSetting = (key, value) => {
    setSettings((previous) => ({
      ...previous,
      [key]: value,
    }));

    setMessage("");
  };

  const handleVoiceChange = (event) => {
    const selectedURI = event.target.value;

    const selectedVoice = voices.find(
      (voice) => voice.voiceURI === selectedURI
    );

    setSettings((previous) => ({
      ...previous,
      voiceURI: selectedVoice?.voiceURI || "",
      voiceName: selectedVoice?.name || "",
      voiceLang: selectedVoice?.lang || "",
    }));

    setMessage("");
  };

  const getSpeechRate = () => {
    if (settings.speechRate === "slow") return 0.75;
    if (settings.speechRate === "fast") return 1.1;
    return 0.9;
  };

  const previewVoice = () => {
    if (!("speechSynthesis" in window)) {
      setMessage(
        "Speech playback is not supported in this browser."
      );
      return;
    }

    window.speechSynthesis.cancel();

    const speech = new SpeechSynthesisUtterance(
      "Hello. I am CLARA. I am here to make your day a little easier. We can talk, remember happy moments, and take things one step at a time."
    );

    const selectedVoice = voices.find(
      (voice) => voice.voiceURI === settings.voiceURI
    );

    if (selectedVoice) {
      speech.voice = selectedVoice;
      speech.lang = selectedVoice.lang;
    } else {
      speech.lang = "en-IN";
    }

    speech.rate = getSpeechRate();

    speech.onstart = () => {
      setIsSpeaking(true);
      setMessage("");
    };

    speech.onend = () => {
      setIsSpeaking(false);
    };

    speech.onerror = () => {
      setIsSpeaking(false);
      setMessage("Could not play the voice preview. Please try again.");
    };

    window.speechSynthesis.speak(speech);
  };

  const stopPreview = () => {
    if ("speechSynthesis" in window) {
      window.speechSynthesis.cancel();
    }

    setIsSpeaking(false);
  };

  const saveSettings = () => {
    try {
      localStorage.setItem(settingsKey, JSON.stringify(settings));

      if (settings.name.trim()) {
        localStorage.setItem(
          "clara_patient_name",
          settings.name.trim()
        );
      } else {
        localStorage.removeItem("clara_patient_name");
      }

      setMessage("Your preferences have been saved successfully.");
    } catch {
      setMessage(
        "Could not save settings. Please check browser storage."
      );
    }
  };

  const resetSettings = () => {
    const confirmed = window.confirm(
      "Reset your preferences to the default settings?"
    );

    if (!confirmed) return;

    stopPreview();

    const resetValues = { ...defaultSettings };

    setSettings(resetValues);

    try {
      localStorage.removeItem(settingsKey);

      if (resetValues.name) {
        localStorage.setItem(
          "clara_patient_name",
          resetValues.name
        );
      } else {
        localStorage.removeItem("clara_patient_name");
      }

      setMessage("Your preferences have been reset.");
    } catch {
      setMessage(
        "Preferences were reset on screen, but browser storage could not be updated."
      );
    }
  };

  return (
    <main className="feature-page settings-page">
      {/* Hero */}
      <section className="settings-hero">
        <div>
          <span className="settings-eyebrow">
            ⚙ YOUR PERSONAL SPACE
          </span>

          <h1>Settings</h1>

          <p>
            Make CLARA feel comfortable for you. Adjust your
            preferences whenever you need to.
          </p>
        </div>

        <div className="settings-hero-art" aria-hidden="true">
          <span>☼</span>
          <div className="settings-hero-orbit" />
        </div>
      </section>

      {/* Introduction */}
      <section className="settings-welcome">
        <h2>Your comfort comes first</h2>

        <p>
          These preferences are saved in this browser on this device.
          You can change them at any time.
        </p>
      </section>

      <div className="settings-layout">
        {/* Personal information */}
        <section className="settings-card">
          <div className="settings-card-heading">
            <div className="settings-icon settings-icon-purple">
              ♙
            </div>

            <div>
              <h3>Personal information</h3>
              <p>Set the name you would like CLARA to use.</p>
            </div>
          </div>

          <div className="settings-field">
            <label htmlFor="patientName">Preferred name</label>

            <input
              id="patientName"
              type="text"
              placeholder="Enter your preferred name"
              value={settings.name}
              onChange={(event) =>
                updateSetting("name", event.target.value)
              }
              maxLength={80}
            />
          </div>

          <p className="settings-help">
            Your preferred name is saved on this device when you
            save your settings.
          </p>
        </section>

        {/* Voice and speech */}
        <section className="settings-card">
          <div className="settings-card-heading">
            <div className="settings-icon settings-icon-peach">
              ♫
            </div>

            <div>
              <h3>Voice &amp; speech</h3>
              <p>
                Choose how CLARA sounds when speaking.
              </p>
            </div>
          </div>

          <div className="settings-field">
            <label htmlFor="claraVoice">CLARA&apos;s voice</label>

            <select
              id="claraVoice"
              value={settings.voiceURI || ""}
              onChange={handleVoiceChange}
            >
              <option value="">Default browser voice</option>

              {voices.map((voice, index) => (
                <option
                  key={`${voice.voiceURI}-${index}`}
                  value={voice.voiceURI}
                >
                  {voice.name} ({voice.lang})
                  {voice.default ? " — Default" : ""}
                </option>
              ))}
            </select>

            <p className="settings-help">
              The available voices depend on your device and browser.
              Voice names and languages may vary.
            </p>

            {voices.length === 0 && (
              <p className="settings-help">
                No voices are available yet. Wait a moment and reopen
                this page, or check your browser's speech settings.
              </p>
            )}
          </div>

          <div className="settings-field">
            <label htmlFor="speechRate">Speech speed</label>

            <select
              id="speechRate"
              value={settings.speechRate}
              onChange={(event) =>
                updateSetting("speechRate", event.target.value)
              }
            >
              <option value="slow">Slow and gentle</option>
              <option value="normal">Normal</option>
              <option value="fast">A little faster</option>
            </select>
          </div>

          <div className="settings-field">
            <label>Listen to a sample</label>

            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "10px",
              }}
            >
              <button
                type="button"
                className="settings-outline-btn"
                onClick={previewVoice}
                disabled={isSpeaking}
              >
                ▶ Preview selected voice
              </button>

              {isSpeaking && (
                <button
                  type="button"
                  className="settings-outline-btn"
                  onClick={stopPreview}
                >
                  ■ Stop preview
                </button>
              )}
            </div>

            <p className="settings-help">
              Save your settings to keep your selected voice preference.
              This preview uses your browser's speech engine.
            </p>
          </div>
        </section>

        {/* Reminders and sound */}
        <section className="settings-card">
          <div className="settings-card-heading">
            <div className="settings-icon settings-icon-yellow">
              ♧
            </div>

            <div>
              <h3>Reminders &amp; sound</h3>
              <p>
                Choose the preferences you would like to keep.
              </p>
            </div>
          </div>

          <div className="settings-toggle-row">
            <div>
              <strong>Gentle reminders</strong>
              <p>Save your preference for reminders.</p>
            </div>

            <button
              type="button"
              role="switch"
              aria-label="Gentle reminders"
              aria-checked={settings.reminders}
              className={`settings-switch ${
                settings.reminders ? "active" : ""
              }`}
              onClick={() =>
                updateSetting("reminders", !settings.reminders)
              }
            >
              <span />
            </button>
          </div>

          <div className="settings-toggle-row">
            <div>
              <strong>Sound preference</strong>
              <p>Save whether you prefer sound enabled.</p>
            </div>

            <button
              type="button"
              role="switch"
              aria-label="Sound preference"
              aria-checked={settings.sound}
              className={`settings-switch ${
                settings.sound ? "active" : ""
              }`}
              onClick={() =>
                updateSetting("sound", !settings.sound)
              }
            >
              <span />
            </button>
          </div>

          <p className="settings-help">
            Automatic reminders and app-wide sound control need to be
            connected to these preferences separately.
          </p>
        </section>

        {/* Accessibility */}
        <section className="settings-card">
          <div className="settings-card-heading">
            <div className="settings-icon settings-icon-pink">
              Aa
            </div>

            <div>
              <h3>Accessibility</h3>
              <p>
                Adjust the display to make it easier to use.
              </p>
            </div>
          </div>

          <div className="settings-field">
            <label htmlFor="fontSize">Text size</label>

            <select
              id="fontSize"
              value={settings.fontSize}
              onChange={(event) =>
                updateSetting("fontSize", event.target.value)
              }
            >
              <option value="small">Small</option>
              <option value="medium">Medium</option>
              <option value="large">Large</option>
            </select>
          </div>

          <div className="settings-toggle-row">
            <div>
              <strong>Higher contrast</strong>
              <p>Use stronger colours for easier reading.</p>
            </div>

            <button
              type="button"
              role="switch"
              aria-label="Higher contrast"
              aria-checked={settings.highContrast}
              className={`settings-switch ${
                settings.highContrast ? "active" : ""
              }`}
              onClick={() =>
                updateSetting(
                  "highContrast",
                  !settings.highContrast
                )
              }
            >
              <span />
            </button>
          </div>

          <div className="settings-toggle-row">
            <div>
              <strong>Reduce animations</strong>
              <p>Reduce movement and visual effects.</p>
            </div>

            <button
              type="button"
              role="switch"
              aria-label="Reduce animations"
              aria-checked={settings.reduceMotion}
              className={`settings-switch ${
                settings.reduceMotion ? "active" : ""
              }`}
              onClick={() =>
                updateSetting(
                  "reduceMotion",
                  !settings.reduceMotion
                )
              }
            >
              <span />
            </button>
          </div>
        </section>

        {/* Privacy */}
        <section className="settings-card settings-privacy-card">
          <div className="settings-card-heading">
            <div className="settings-icon settings-icon-green">
              ♡
            </div>

            <div>
              <h3>Privacy &amp; data</h3>
              <p>
                Understand where your preferences are stored.
              </p>
            </div>
          </div>

          <div className="settings-privacy-note">
            <span>✓</span>

            <p>
              Your settings are currently stored locally in this
              browser. They are not automatically synced with a
              caregiver account or backend.
            </p>
          </div>

          <p className="settings-help">
            Avoid storing sensitive medical information in these
            settings. Signing out does not automatically erase
            saved preferences.
          </p>
        </section>
      </div>

      {/* Feedback */}
      {message && (
        <div className="settings-message" role="status">
          {message}
        </div>
      )}

      {/* Actions */}
      <div className="settings-footer-actions">
        <button
          type="button"
          className="settings-reset-btn"
          onClick={resetSettings}
        >
          Reset preferences
        </button>

        <button
          type="button"
          className="settings-save-btn"
          onClick={saveSettings}
        >
          ✓ Save settings
        </button>
      </div>
    </main>
  );
}
