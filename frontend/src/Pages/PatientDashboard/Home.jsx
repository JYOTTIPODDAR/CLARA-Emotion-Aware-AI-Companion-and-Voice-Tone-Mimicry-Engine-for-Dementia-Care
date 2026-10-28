import { useCallback, useEffect, useRef, useState } from "react";
import { useOutletContext } from "react-router-dom";
import {
  Heart,
  Mic,
  MicOff,
  Volume2,
  VolumeX,
  Power,
  Send,
  Sparkles,
  MessageCircle,
  Clock3,
  ShieldCheck,
  AlertCircle,
  Bot,
  UserRound,
} from "lucide-react";
import "./Home.css";

const SpeechRecognitionAPI =
  window.SpeechRecognition || window.webkitSpeechRecognition;

const starterPrompts = [
  "Tell me a story",
  "How will my day be?",
  "I feel lonely",
  "Help me relax",
];

function getReply(message, patientName) {
  const text = message.toLowerCase();

  if (/\b(hello|hi|hey|good morning|good evening)\b/.test(text)) {
    return `Hello, ${patientName}! It is lovely to talk with you. How are you feeling today?`;
  }

  if (text.includes("story")) {
    return "Of course! Once upon a time, there was a beautiful garden filled with colourful flowers and cheerful birds. Every morning, the sunlight made the garden sparkle. A kind person visited it every day and discovered that even small moments could bring great happiness. Would you like to hear another story?";
  }

  if (text.includes("lonely") || text.includes("alone")) {
    return `I'm here with you, ${patientName}. You don't have to talk about anything you don't want to. We can chat about your favourite memories, listen to something calming, or simply take a quiet moment together.`;
  }

  if (
    text.includes("sad") ||
    text.includes("upset") ||
    text.includes("worried") ||
    text.includes("anxious")
  ) {
    return "I'm sorry you're feeling this way. Let's take a gentle breath together. Breathe in slowly, and then breathe out. There is no rush. Would you like to tell me what's on your mind?";
  }

  if (
    text.includes("relax") ||
    text.includes("calm") ||
    text.includes("breath")
  ) {
    return "Let's relax together. Sit comfortably, relax your shoulders, and breathe in slowly through your nose. Now breathe out gently. Let's do that one more time. You're doing well. Take all the time you need.";
  }

  if (
    text.includes("day") ||
    text.includes("today") ||
    text.includes("schedule") ||
    text.includes("plan")
  ) {
    return "Let's make today gentle and comfortable. You could have a little water, enjoy some movement if you feel up to it, spend time with someone you care about, and do something you enjoy. Your caregiver can help you check today's plans.";
  }

  if (
    text.includes("remember") ||
    text.includes("memory") ||
    text.includes("forgot")
  ) {
    return "It's okay if remembering something feels difficult. We can take our time. Would you like to talk about a favourite person, a special place, or a happy moment from your life?";
  }

  if (
    text.includes("caregiver") ||
    text.includes("family") ||
    text.includes("call")
  ) {
    return "Your caregiver may be able to help. You can open the Call Caregiver section on your dashboard to reach out to them.";
  }

  if (
    text.includes("thank") ||
    text.includes("thanks")
  ) {
    return "You're very welcome! I'm happy to spend this time with you.";
  }

  if (
    text.includes("who are you") ||
    text.includes("your name")
  ) {
    return "I'm CLARA, your caring companion. I'm here to chat with you, help you feel comfortable, and support you through your day.";
  }

  return `I'm listening, ${patientName}. Thank you for sharing that with me. Could you tell me a little more so I can understand what you need?`;
}

export default function Home() {
  const outletContext = useOutletContext() || {};
  const patientName = outletContext.patientName || "Friend";

  const [claraOn, setClaraOn] = useState(false);
  const [listening, setListening] = useState(false);
  const [speaking, setSpeaking] = useState(false);
  const [voiceEnabled, setVoiceEnabled] = useState(true);
  const [draft, setDraft] = useState("");
  const [error, setError] = useState("");
  const [messages, setMessages] = useState([]);
  const [sessionMinutes, setSessionMinutes] = useState(0);

  const recognitionRef = useRef(null);
  const restartTimerRef = useRef(null);
  const onRef = useRef(false);
  const listeningRef = useRef(false);
  const speakingRef = useRef(false);
  const voiceRef = useRef(true);
  const mountedRef = useRef(false);
  const startListeningRef = useRef(null);
  const processMessageRef = useRef(null);
  const welcomeSpokenRef = useRef(false);
  const messageIdRef = useRef(0);

  const addMessage = useCallback((role, text) => {
    messageIdRef.current += 1;

    setMessages((previous) => [
      ...previous,
      {
        id: messageIdRef.current,
        role,
        text,
        time: new Date().toLocaleTimeString("en-IN", {
          hour: "2-digit",
          minute: "2-digit",
        }),
      },
    ]);
  }, []);

  const stopRecognition = useCallback(() => {
    listeningRef.current = false;
    setListening(false);

    const recognition = recognitionRef.current;

    if (recognition) {
      try {
        recognition.stop();
      } catch {
        // Recognition may already be stopped.
      }
    }
  }, []);

  const clearRestart = useCallback(() => {
    if (restartTimerRef.current) {
      clearTimeout(restartTimerRef.current);
      restartTimerRef.current = null;
    }
  }, []);

  const startListening = useCallback(() => {
    if (!onRef.current || !mountedRef.current) return;
    if (!recognitionRef.current || speakingRef.current) return;

    clearRestart();

    try {
      recognitionRef.current.start();
    } catch (err) {
      // InvalidStateError commonly means recognition is already starting.
      if (err?.name !== "InvalidStateError") {
        setError("Listening could not start. Please try turning CLARA off and on again.");
      }
    }
  }, [clearRestart]);

  useEffect(() => {
    startListeningRef.current = startListening;
  }, [startListening]);

  const scheduleRestart = useCallback(
    (delay = 700) => {
      clearRestart();

      if (!onRef.current || !mountedRef.current) return;

      restartTimerRef.current = setTimeout(() => {
        restartTimerRef.current = null;

        if (!onRef.current || !mountedRef.current) return;

        if (speakingRef.current || window.speechSynthesis?.speaking) {
          scheduleRestart(700);
          return;
        }

        startListeningRef.current?.();
      }, delay);
    },
    [clearRestart]
  );

  const speak = useCallback(
    (text, afterSpeech) => {
      if (!voiceRef.current || !("speechSynthesis" in window)) {
        speakingRef.current = false;
        setSpeaking(false);
        afterSpeech?.();
        return;
      }

      window.speechSynthesis.cancel();

      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = "en-IN";
      utterance.rate = 0.92;
      utterance.pitch = 1.03;

      const voices = window.speechSynthesis.getVoices();
      const preferredVoice =
        voices.find((voice) => /en-IN/i.test(voice.lang)) ||
        voices.find((voice) => /en-GB/i.test(voice.lang)) ||
        voices.find((voice) => /en-US/i.test(voice.lang));

      if (preferredVoice) utterance.voice = preferredVoice;

      utterance.onstart = () => {
        if (!mountedRef.current) return;
        speakingRef.current = true;
        setSpeaking(true);
        listeningRef.current = false;
        setListening(false);
      };

      utterance.onend = () => {
        speakingRef.current = false;

        if (!mountedRef.current) return;

        setSpeaking(false);
        afterSpeech?.();

        if (onRef.current) scheduleRestart(500);
      };

      utterance.onerror = () => {
        speakingRef.current = false;

        if (!mountedRef.current) return;

        setSpeaking(false);
        afterSpeech?.();

        if (onRef.current) scheduleRestart(700);
      };

      speakingRef.current = true;
      setSpeaking(true);

      try {
        window.speechSynthesis.speak(utterance);
      } catch {
        speakingRef.current = false;
        setSpeaking(false);
        afterSpeech?.();

        if (onRef.current) scheduleRestart(700);
      }
    },
    [scheduleRestart]
  );

  const processMessage = useCallback(
    (rawMessage) => {
      const message = rawMessage.trim();

      if (!message || !onRef.current) return;

      clearRestart();
      stopRecognition();
      setError("");

      addMessage("patient", message);

      const reply = getReply(message, patientName);

      window.setTimeout(() => {
        if (!mountedRef.current || !onRef.current) return;

        addMessage("clara", reply);
        speak(reply);
      }, 350);
    },
    [
      addMessage,
      clearRestart,
      patientName,
      speak,
      stopRecognition,
    ]
  );

  useEffect(() => {
    processMessageRef.current = processMessage;
  }, [processMessage]);

  const turnOn = useCallback(() => {
    if (!SpeechRecognitionAPI) {
      setError(
        "Voice recognition is not supported by this browser. Please use a supported browser or type your message below."
      );
      return;
    }

    clearRestart();
    setError("");

    if (!recognitionRef.current) {
      const recognition = new SpeechRecognitionAPI();

      recognition.lang = "en-IN";
      recognition.continuous = true;
      recognition.interimResults = false;
      recognition.maxAlternatives = 1;

      recognition.onstart = () => {
        if (!mountedRef.current || !onRef.current) return;

        listeningRef.current = true;
        setListening(true);
        setError("");
      };

      recognition.onresult = (event) => {
        if (!onRef.current) return;

        const lastResult = event.results[event.results.length - 1];
        const transcript = lastResult?.[0]?.transcript?.trim();

        if (transcript && lastResult.isFinal) {
          processMessageRef.current?.(transcript);
        }
      };

      recognition.onerror = (event) => {
        if (!onRef.current || !mountedRef.current) return;

        listeningRef.current = false;
        setListening(false);

        if (
          event.error === "not-allowed" ||
          event.error === "service-not-allowed"
        ) {
          setError(
            "Microphone permission is blocked. Allow microphone access in your browser settings, then turn CLARA on again."
          );
          return;
        }

        if (event.error === "audio-capture") {
          setError("No microphone detected. Please check your microphone.");
        } else if (event.error === "network") {
          setError("The voice service has a connection issue. Retrying...");
        } else if (event.error === "no-speech") {
          // Silence is normal. The listener will restart below.
        } else if (event.error !== "aborted") {
          setError(`Voice recognition issue: ${event.error}. Retrying...`);
        }

        if (event.error !== "aborted") {
          scheduleRestart(1400);
        }
      };

      recognition.onend = () => {
        listeningRef.current = false;

        if (!mountedRef.current) return;

        setListening(false);

        if (onRef.current && !speakingRef.current) {
          scheduleRestart(600);
        }
      };

      recognitionRef.current = recognition;
    }

    onRef.current = true;
    setClaraOn(true);

    if (!welcomeSpokenRef.current) {
      welcomeSpokenRef.current = true;

      const welcome = `Hello, ${patientName}! I'm CLARA, your caring companion. I'm happy to be here with you. You can talk to me whenever you like.`;

      addMessage("clara", welcome);
      speak(welcome);
    } else {
      startListeningRef.current?.();
    }
  }, [
    addMessage,
    clearRestart,
    patientName,
    scheduleRestart,
    speak,
  ]);

  const turnOff = useCallback(() => {
    onRef.current = false;
    listeningRef.current = false;
    speakingRef.current = false;

    clearRestart();

    setClaraOn(false);
    setListening(false);
    setSpeaking(false);
    setError("");

    if (recognitionRef.current) {
      try {
        recognitionRef.current.stop();
      } catch {
        // Recognition may already be stopped.
      }
    }

    if ("speechSynthesis" in window) {
      window.speechSynthesis.cancel();
    }
  }, [clearRestart]);

  const handleSend = (event) => {
    event.preventDefault();

    const message = draft.trim();
    if (!message) return;

    setDraft("");

    if (!onRef.current) {
      addMessage("patient", message);
      addMessage(
        "clara",
        "I received your message. Turn CLARA on if you'd like to continue our voice conversation."
      );
      return;
    }

    processMessageRef.current?.(message);
  };

  const handlePrompt = (prompt) => {
    if (!onRef.current) {
      setDraft(prompt);
      return;
    }

    processMessageRef.current?.(prompt);
  };

  const toggleVoice = () => {
    setVoiceEnabled((previous) => {
      const next = !previous;
      voiceRef.current = next;

      if (!next && "speechSynthesis" in window) {
        window.speechSynthesis.cancel();
        speakingRef.current = false;
        setSpeaking(false);

        if (onRef.current) scheduleRestart(300);
      }

      return next;
    });
  };

  useEffect(() => {
    mountedRef.current = true;

    // Greet automatically when the patient Home page opens.
    if (!welcomeSpokenRef.current) {
      welcomeSpokenRef.current = true;

      const welcome = `Hello, ${patientName}! Welcome back. I'm CLARA, your caring companion. I'm here to spend time with you. When you're ready, press Turn on CLARA and we can talk together.`;

      addMessage("clara", welcome);
      speak(welcome);
    }

    return () => {
      mountedRef.current = false;
      onRef.current = false;
      listeningRef.current = false;
      speakingRef.current = false;

      if (restartTimerRef.current) {
        clearTimeout(restartTimerRef.current);
      }

      try {
        recognitionRef.current?.stop();
      } catch {
        // Ignore cleanup errors.
      }

      if ("speechSynthesis" in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, [addMessage, patientName, speak]);

  useEffect(() => {
    if (!claraOn) return undefined;

    const interval = setInterval(() => {
      setSessionMinutes((minutes) => minutes + 1);
    }, 60000);

    return () => clearInterval(interval);
  }, [claraOn]);

  const statusText = !claraOn
    ? "CLARA is resting"
    : speaking
      ? "CLARA is speaking"
      : listening
        ? "I'm listening to you"
        : "Getting ready to listen";

  return (
    <div className="ch-home">
      <section className="ch-welcome-scene">
        <div className="ch-scene-decoration ch-cloud-one" />
        <div className="ch-scene-decoration ch-cloud-two" />
        <div className="ch-scene-sun" />
        <div className="ch-scene-hill ch-hill-back" />
        <div className="ch-scene-hill ch-hill-front" />

        <div className="ch-welcome-copy">
          <span className="ch-eyebrow">
            <Sparkles size={15} /> YOUR CARING COMPANION
          </span>
          <h1>Hello, {patientName}!</h1>
          <p>
            Every day is a new chance for a little joy. I'm here to listen,
            talk, and spend time with you.
          </p>

          <div className="ch-status-pill">
            <span
              className={`ch-status-dot ${claraOn ? "is-active" : ""}`}
            />
            {statusText}
          </div>

          <div className="ch-main-controls">
            {!claraOn ? (
              <button className="ch-button-primary" onClick={turnOn}>
                <Power size={18} />
                Turn on CLARA
              </button>
            ) : (
              <button className="ch-button-stop" onClick={turnOff}>
                <Power size={18} />
                Turn off CLARA
              </button>
            )}

            <button
              className="ch-button-secondary"
              onClick={toggleVoice}
              title={voiceEnabled ? "Mute CLARA voice" : "Enable CLARA voice"}
            >
              {voiceEnabled ? <Volume2 size={18} /> : <VolumeX size={18} />}
              {voiceEnabled ? "Voice on" : "Voice off"}
            </button>
          </div>
        </div>

        <div className={`ch-character ${speaking ? "is-speaking" : ""}`}>
          <div className="ch-character-glow" />
          <div className="ch-character-halo">
            <Heart size={22} fill="currentColor" />
          </div>
          <div className="ch-character-head">
            <div className="ch-character-hair" />
            <div className="ch-character-face">
              <span className="ch-eye ch-eye-left" />
              <span className="ch-eye ch-eye-right" />
              <span className="ch-cheek ch-cheek-left" />
              <span className="ch-cheek ch-cheek-right" />
              <span className="ch-character-smile" />
            </div>
          </div>
          <div className="ch-character-body">
            <Heart size={27} fill="currentColor" />
          </div>
          <div className="ch-character-shadow" />
          <div className="ch-character-caption">
            <Sparkles size={15} />
            <span>Here for you</span>
          </div>
        </div>

        <div className="ch-scene-flower ch-flower-one">✿</div>
        <div className="ch-scene-flower ch-flower-two">✿</div>
      </section>

      <section className="ch-content-grid">
        <div className="ch-main-column">
          <section className="ch-conversation-card">
            <div className="ch-card-heading">
              <div className="ch-heading-icon">
                <MessageCircle size={21} />
              </div>
              <div>
                <h2>Let's talk together</h2>
                <p>A friendly space to share whatever is on your mind.</p>
              </div>
              <span className="ch-secure-label">
                <ShieldCheck size={15} /> Your space
              </span>
            </div>

            <div className="ch-conversation-status">
              <div className={`ch-listening-orb ${listening ? "active" : ""}`}>
                {speaking ? (
                  <Volume2 size={22} />
                ) : listening ? (
                  <Mic size={22} />
                ) : (
                  <Bot size={22} />
                )}
              </div>
              <div>
                <strong>{statusText}</strong>
                <p>
                  {!claraOn
                    ? "Turn on CLARA when you're ready to talk."
                    : speaking
                      ? "Listen to my reply. I'll listen again afterward."
                      : listening
                        ? "Go ahead. I'm paying attention."
                        : "Please wait a moment..."}
                </p>
              </div>
              {claraOn && (
                <span className="ch-live-label">
                  <span /> ON
                </span>
              )}
            </div>

            {error && (
              <div className="ch-error-message" role="alert">
                <AlertCircle size={19} />
                <span>{error}</span>
                <button
                  onClick={() => setError("")}
                  aria-label="Dismiss error"
                >
                  ×
                </button>
              </div>
            )}

            <div className="ch-messages" aria-live="polite">
              {messages.length === 0 && (
                <div className="ch-empty-chat">
                  <div className="ch-empty-icon">
                    <Heart size={25} />
                  </div>
                  <strong>Your conversation starts here</strong>
                  <p>Turn on CLARA or type a message below.</p>
                </div>
              )}

              {messages.map((message) => (
                <div
                  className={`ch-message-row ${
                    message.role === "patient" ? "from-patient" : "from-clara"
                  }`}
                  key={message.id}
                >
                  <div className="ch-message-avatar">
                    {message.role === "patient" ? (
                      <UserRound size={18} />
                    ) : (
                      <Heart size={18} />
                    )}
                  </div>
                  <div className="ch-message-content">
                    <div className="ch-message-meta">
                      <strong>
                        {message.role === "patient" ? "You" : "CLARA"}
                      </strong>
                      <span>{message.time}</span>
                    </div>
                    <p>{message.text}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="ch-prompt-area">
              <span className="ch-prompt-title">TRY SAYING</span>
              <div className="ch-prompt-list">
                {starterPrompts.map((prompt) => (
                  <button
                    key={prompt}
                    className="ch-prompt-button"
                    onClick={() => handlePrompt(prompt)}
                  >
                    {prompt}
                  </button>
                ))}
              </div>
            </div>

            <form className="ch-message-form" onSubmit={handleSend}>
              <input
                type="text"
                value={draft}
                onChange={(event) => setDraft(event.target.value)}
                placeholder="Type a message to CLARA..."
                aria-label="Type a message to CLARA"
              />
              <button
                type="submit"
                disabled={!draft.trim()}
                aria-label="Send message"
              >
                <Send size={19} />
              </button>
            </form>
            <p className="ch-input-hint">
              {claraOn
                ? "You can speak or type. CLARA will continue listening while ON."
                : "Typing is available even when voice mode is OFF."}
            </p>
          </section>
        </div>

        <aside className="ch-side-column">
          <section className="ch-side-card ch-care-card">
            <div className="ch-side-card-icon">
              <Heart size={22} />
            </div>
            <h3>A gentle reminder</h3>
            <p>
              You matter. Take things one step at a time, and remember that
              it's always okay to ask for help.
            </p>
            <div className="ch-reminder-footer">
              <Sparkles size={16} /> You are not alone
            </div>
          </section>

          <section className="ch-side-card ch-session-card">
            <div className="ch-side-title">
              <Clock3 size={19} />
              <h3>Today's session</h3>
            </div>
            <div className="ch-session-stat">
              <span className="ch-session-stat-icon">
                <MessageCircle size={18} />
              </span>
              <div>
                <strong>{messages.length}</strong>
                <span>Conversation messages</span>
              </div>
            </div>
            <div className="ch-session-stat">
              <span className="ch-session-stat-icon">
                <Clock3 size={18} />
              </span>
              <div>
                <strong>{sessionMinutes} min</strong>
                <span>Time with CLARA while ON</span>
              </div>
            </div>
            <div className="ch-session-note">
              <ShieldCheck size={16} />
              This is a friendly companion, not an emergency service.
            </div>
          </section>

          <section className="ch-side-card ch-help-card">
            <div className="ch-side-title">
              <Heart size={19} />
              <h3>Need your caregiver?</h3>
            </div>
            <p>You can reach out to your caregiver whenever you need support.</p>
            <button
              className="ch-caregiver-link"
              onClick={() =>
                (window.location.href = "/patient-dashboard/caregiver")
              }
            >
              <MessageCircle size={17} />
              Call caregiver
            </button>
          </section>
        </aside>
      </section>

      <footer className="ch-home-footer">
        <Heart size={15} fill="currentColor" />
        Made with care by CLARA
        <span>Small moments, meaningful connections.</span>
      </footer>
    </div>
  );
}