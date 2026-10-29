
import { useState } from "react";
import {
  Mic,
  MicOff,
  Heart,
  Volume2,
  Send,
  Brain,
  MessageCircle,
  Sparkles,
} from "lucide-react";
import "./Dashboard.css";

const suggestions = [
  "Help me feel calm",
  "Tell me a happy memory",
  "Suggest a relaxing activity",
];

export default function VoiceAssistant() {
  const [message, setMessage] = useState("");
  const [response, setResponse] = useState("");
  const [listening, setListening] = useState(false);

  function handleSend(event) {
    event.preventDefault();

    const text = message.trim();
    if (!text) return;

    setResponse(
      `I'm here with you. Let's take a gentle breath together. Would you like to tell me a little more about "${text}"?`
    );
    setMessage("");
  }

  function handleSuggestion(text) {
    setMessage(text);
    setResponse(
      "I'm here for you. Let's take things one step at a time. You are not alone."
    );
  }

  function handleMicrophone() {
    setListening((current) => !current);

    if (!listening) {
      setResponse(
        "Microphone UI activated. Live speech recognition is not connected yet."
      );
    } else {
      setResponse("Microphone UI stopped.");
    }
  }

  return (
    <div className="care-dashboard">
      <section className="care-page-top">
        <div>
          <p className="care-eyebrow">EMOTION-AWARE SUPPORT</p>
          <h1>CLARA Voice Assistant</h1>
          <p className="care-muted">
            A familiar voice, a calmer day. Support your loved one with care.
          </p>
        </div>

        <span className="care-live-pill">
          <span />
          Demo Mode
        </span>
      </section>

      <section className="care-voice-layout">
        <article className="care-card care-voice-main">
          <div className="care-voice-brand">
            <div className="care-voice-orb">
              <Heart size={38} />
              <Sparkles size={17} />
            </div>

            <h2>Hello, I'm Clara</h2>
            <p>
              I'm here to listen, comfort, and help create a peaceful moment.
            </p>
          </div>

          <div className={`care-voice-status ${listening ? "is-listening" : ""}`}>
            <span />
            {listening ? "Microphone UI is active" : "Ready when you are"}
          </div>

          <button
            type="button"
            className={`care-mic-button ${listening ? "is-listening" : ""}`}
            onClick={handleMicrophone}
            aria-label={listening ? "Stop microphone" : "Activate microphone"}
          >
            {listening ? <MicOff size={30} /> : <Mic size={30} />}
          </button>

          <p className="care-mic-caption">
            {listening ? "Tap to stop" : "Tap the microphone to begin"}
          </p>

          <form className="care-voice-input" onSubmit={handleSend}>
            <input
              type="text"
              placeholder="Type a message to Clara..."
              value={message}
              onChange={(event) => setMessage(event.target.value)}
            />

            <button type="submit" aria-label="Send message">
              <Send size={19} />
            </button>
          </form>

          {response && (
            <div className="care-voice-response">
              <span>
                <Heart size={19} />
              </span>
              <div>
                <strong>Clara says</strong>
                <p>{response}</p>
              </div>
            </div>
          )}
        </article>

        <div className="care-voice-side">
          <article className="care-card">
            <div className="care-card-heading">
              <div>
                <h2>Conversation Starters</h2>
                <p>Choose a gentle prompt</p>
              </div>
              <MessageCircle size={22} color="#7045df" />
            </div>

            <div className="care-voice-suggestions">
              {suggestions.map((item) => (
                <button
                  type="button"
                  key={item}
                  onClick={() => handleSuggestion(item)}
                >
                  <span><Sparkles size={17} /></span>
                  {item}
                </button>
              ))}
            </div>
          </article>

          <article className="care-card">
            <div className="care-card-heading">
              <div>
                <h2>Voice & Memory Tools</h2>
                <p>Personalize the experience</p>
              </div>
            </div>

            <button
              className="care-voice-tool"
              onClick={() => setResponse("Voice settings will be connected when the backend is ready.")}
            >
              <span><Volume2 size={21} /></span>
              <div>
                <strong>Voice Preferences</strong>
                <small>Familiar voice and tone settings</small>
              </div>
            </button>

            <button
              className="care-voice-tool"
              onClick={() => setResponse("Memory tools will be connected when the backend is ready.")}
            >
              <span><Brain size={21} /></span>
              <div>
                <strong>Memory Prompts</strong>
                <small>Use familiar stories and moments</small>
              </div>
            </button>
          </article>

          <div className="care-voice-note">
            <Heart size={20} />
            <p>
              <strong>A gentle reminder</strong>
              <br />
              Keep responses calm, simple, and reassuring. If a patient seems
              distressed, check on them directly.
            </p>
          </div>
        </div>
      </section>

      <p className="care-demo-disclaimer">
        Demo interface only. Live microphone capture, speech recognition,
        voice mimicry, and AI responses are not connected yet.
      </p>
    </div>
  );
}
