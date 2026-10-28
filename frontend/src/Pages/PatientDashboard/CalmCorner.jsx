
import React, { useEffect, useState } from "react";
import "./CalmCorner.css";

const patientId = localStorage.getItem("clara_patient_id") || "demo";
const settingsKey = `clara_settings_${patientId}`;

const moods = [
  {
    name: "Happy",
    emoji: "😊",
    message: "Enjoy this lovely moment. You deserve happiness.",
  },
  {
    name: "Calm",
    emoji: "😌",
    message: "Take a slow breath and enjoy this peaceful moment.",
  },
  {
    name: "Sad",
    emoji: "😔",
    message: "It is okay to feel sad. You are not alone.",
  },
  {
    name: "Anxious",
    emoji: "😟",
    message: "Take a gentle breath. You can take things one step at a time.",
  },
  {
    name: "Tired",
    emoji: "😴",
    message: "You deserve some rest. Relax and take your time.",
  },
];

function readStorage(key, fallback) {
  try {
    const saved = localStorage.getItem(key);
    return saved ? JSON.parse(saved) : fallback;
  } catch {
    return fallback;
  }
}

export default function CalmCorner() {
  const [duration, setDuration] = useState(60);
  const [secondsLeft, setSecondsLeft] = useState(60);
  const [isRunning, setIsRunning] = useState(false);
  const [breathPhase, setBreathPhase] = useState("Ready to relax");

  const [selectedMood, setSelectedMood] = useState("");
  const [savedMoodMessage, setSavedMoodMessage] = useState("");

  const [audioFiles, setAudioFiles] = useState(() =>
    readStorage(`clara_comfort_audio_${patientId}`, [])
  );

  const [memories, setMemories] = useState(() =>
    readStorage(`clara_memories_${patientId}`, [])
  );

  const [recording, setRecording] = useState(false);
  const [recordingError, setRecordingError] = useState("");

  const [mediaRecorder, setMediaRecorder] = useState(null);
  const [recordingStream, setRecordingStream] = useState(null);

  // Breathing countdown timer.
  useEffect(() => {
    if (!isRunning) return;

    const timer = setInterval(() => {
      setSecondsLeft((previous) => {
        if (previous <= 1) {
          clearInterval(timer);
          setIsRunning(false);
          setBreathPhase(
            "Well done! You completed your breathing exercise."
          );
          return 0;
        }

        return previous - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isRunning]);

  // Breathing instructions.
  useEffect(() => {
    if (!isRunning) return;

    const phases = [
      { text: "Breathe in gently", duration: 4000 },
      { text: "Hold gently", duration: 2000 },
      { text: "Breathe out slowly", duration: 6000 },
    ];

    let index = 0;
    let timeout;

    const changePhase = () => {
      setBreathPhase(phases[index].text);

      timeout = setTimeout(() => {
        index = (index + 1) % phases.length;
        changePhase();
      }, phases[index].duration);
    };

    changePhase();

    return () => clearTimeout(timeout);
  }, [isRunning]);

  // Save uploaded comforting audio.
  useEffect(() => {
    try {
      localStorage.setItem(
        `clara_comfort_audio_${patientId}`,
        JSON.stringify(audioFiles)
      );
    } catch {
      alert(
        "Browser storage is full. Please remove an audio file and try again."
      );
    }
  }, [audioFiles]);

  // Stop speech and release the microphone when leaving this page.
  useEffect(() => {
    return () => {
      window.speechSynthesis?.cancel();
    };
  }, []);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remaining = seconds % 60;

    return `${String(minutes).padStart(2, "0")}:${String(
      remaining
    ).padStart(2, "0")}`;
  };

  const startBreathing = () => {
    if (secondsLeft === 0) {
      setSecondsLeft(duration);
    }

    setBreathPhase("Breathe in gently");
    setIsRunning(true);
  };

  const pauseBreathing = () => {
    setIsRunning(false);
    setBreathPhase("Paused. Take your time.");
  };

  const restartBreathing = () => {
    setIsRunning(false);
    setSecondsLeft(duration);
    setBreathPhase("Ready to relax");
  };

  const handleDurationChange = (value) => {
    setIsRunning(false);
    setDuration(value);
    setSecondsLeft(value);
    setBreathPhase("Ready to relax");
  };

  const handleAudioUpload = (event) => {
    const files = Array.from(event.target.files || []);

    files.forEach((file) => {
      if (!file.type.startsWith("audio/")) {
        alert(`${file.name} is not an audio file.`);
        return;
      }

      if (file.size > 5 * 1024 * 1024) {
        alert(
          `${file.name} exceeds 5 MB. Please select a smaller file.`
        );
        return;
      }

      const reader = new FileReader();

      reader.onload = () => {
        setAudioFiles((previous) => [
          ...previous,
          {
            id: `${Date.now()}-${Math.random()}`,
            name: file.name,
            data: reader.result,
          },
        ]);
      };

      reader.readAsDataURL(file);
    });

    event.target.value = "";
  };

  const deleteAudio = (id) => {
    setAudioFiles((previous) =>
      previous.filter((audio) => audio.id !== id)
    );
  };

  const saveMood = () => {
    if (!selectedMood) {
      alert("Please select your mood first.");
      return;
    }

    const mood = moods.find((item) => item.name === selectedMood);

    const historyKey = `clara_calm_moods_${patientId}`;
    const history = readStorage(historyKey, []);

    history.unshift({
      mood: selectedMood,
      date: new Date().toISOString(),
    });

    try {
      localStorage.setItem(
        historyKey,
        JSON.stringify(history.slice(0, 50))
      );

      setSavedMoodMessage(mood.message);
    } catch {
      setSavedMoodMessage(mood.message);
    }
  };

  // Read the voice preference saved in Settings.
  const speakMemory = (memory) => {
    if (!("speechSynthesis" in window)) {
      alert("Speech playback is not supported by this browser.");
      return;
    }

    window.speechSynthesis.cancel();

    const text = `${memory.title || "A lovely memory"}. ${
      memory.description || "A special moment to remember."
    }`;

    const speech = new SpeechSynthesisUtterance(text);

    // Read the latest saved preferences each time a memory is played.
    const savedSettings = readStorage(settingsKey, {});

    const availableVoices = window.speechSynthesis.getVoices();

    const selectedVoice = availableVoices.find(
      (voice) => voice.voiceURI === savedSettings.voiceURI
    );

    if (selectedVoice) {
      speech.voice = selectedVoice;
      speech.lang = selectedVoice.lang;
    } else {
      speech.lang = savedSettings.voiceLang || "en-IN";
    }

    // Apply the speech speed selected in Settings.
    if (savedSettings.speechRate === "slow") {
      speech.rate = 0.75;
    } else if (savedSettings.speechRate === "fast") {
      speech.rate = 1.1;
    } else {
      speech.rate = 0.9;
    }

    window.speechSynthesis.speak(speech);
  };

  const refreshMemories = () => {
    setMemories(readStorage(`clara_memories_${patientId}`, []));
  };

  const startRecording = async () => {
    setRecordingError("");

    try {
      if (
        !navigator.mediaDevices?.getUserMedia ||
        !window.MediaRecorder
      ) {
        setRecordingError(
          "Voice recording is not supported by this browser."
        );
        return;
      }

      const stream = await navigator.mediaDevices.getUserMedia({
        audio: true,
      });

      const chunks = [];
      const recorder = new MediaRecorder(stream);

      recorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          chunks.push(event.data);
        }
      };

      recorder.onstop = () => {
        const audioBlob = new Blob(chunks, {
          type: recorder.mimeType || "audio/webm",
        });

        const audioUrl = URL.createObjectURL(audioBlob);
        const link = document.createElement("a");

        link.href = audioUrl;
        link.download = `clara-comfort-message-${Date.now()}.webm`;
        link.click();

        setTimeout(() => URL.revokeObjectURL(audioUrl), 1000);

        stream.getTracks().forEach((track) => track.stop());
        setRecordingStream(null);
      };

      recorder.start();

      setMediaRecorder(recorder);
      setRecordingStream(stream);
      setRecording(true);
    } catch {
      setRecordingError(
        "Please allow microphone access to record a message."
      );
    }
  };

  const stopRecording = () => {
    if (mediaRecorder && mediaRecorder.state === "recording") {
      mediaRecorder.stop();
    }

    setRecording(false);
    setMediaRecorder(null);
  };

  // Release microphone resources if the component unmounts.
  useEffect(() => {
    return () => {
      if (recordingStream) {
        recordingStream.getTracks().forEach((track) => track.stop());
      }
    };
  }, [recordingStream]);

  return (
    <main className="feature-page calm-page">
      <section className="calm-hero">
        <div className="calm-hero-content">
          <span className="calm-eyebrow">♡ YOUR PEACEFUL SPACE</span>

          <h1>Welcome to your Calm Corner</h1>

          <p>
            Take a gentle pause. Breathe, listen to comforting sounds,
            and spend a peaceful moment with CLARA.
          </p>

          <div className="calm-hero-note">
            <span>☀</span>
            <span>There is no rush. Take your time.</span>
          </div>
        </div>

        <div className="calm-hero-art" aria-hidden="true">
          <div className="calm-art-circle calm-art-circle-one" />
          <div className="calm-art-circle calm-art-circle-two" />
          <div className="calm-art-moon">☾</div>
          <div className="calm-art-stars">✦　·　✧</div>
          <div className="calm-art-cloud">☁</div>
        </div>
      </section>

      <section className="calm-section-heading">
        <span className="calm-kicker">SLOW DOWN</span>
        <h2>A little peace for you</h2>
        <p>Choose an activity that feels right for you today.</p>
      </section>

      <section className="calm-main-grid">
        {/* Gentle breathing */}
        <article className="calm-card calm-breath-card">
          <div className="calm-card-heading">
            <div className="calm-icon calm-icon-purple">〰</div>
            <div>
              <h3>Gentle breathing</h3>
              <p>Follow the circle and breathe slowly.</p>
            </div>
          </div>

          <div
            className={`calm-breath-visual ${
              isRunning ? "is-breathing" : ""
            }`}
          >
            <div className="calm-breath-ring">
              <div className="calm-breath-center">
                <span className="calm-breath-symbol">☁</span>
                <strong>{formatTime(secondsLeft)}</strong>
                <span>{breathPhase}</span>
              </div>
            </div>
          </div>

          <div className="calm-duration">
            <span>Session length</span>

            <div className="calm-duration-options">
              {[30, 60, 120, 180].map((value) => (
                <button
                  key={value}
                  type="button"
                  className={duration === value ? "selected" : ""}
                  onClick={() => handleDurationChange(value)}
                >
                  {value < 60 ? `${value}s` : `${value / 60} min`}
                </button>
              ))}
            </div>
          </div>

          <div className="calm-actions">
            {!isRunning ? (
              <button
                className="calm-primary-btn"
                onClick={startBreathing}
              >
                ▶ Begin breathing
              </button>
            ) : (
              <button
                className="calm-primary-btn"
                onClick={pauseBreathing}
              >
                Ⅱ Pause
              </button>
            )}

            <button
              className="calm-secondary-btn"
              onClick={restartBreathing}
            >
              ↻ Restart
            </button>
          </div>
        </article>

        {/* Comforting audio */}
        <article className="calm-card calm-audio-card">
          <div className="calm-card-heading">
            <div className="calm-icon calm-icon-peach">♫</div>
            <div>
              <h3>Comforting sounds</h3>
              <p>Listen to a favourite song or recording.</p>
            </div>
          </div>

          <div className="calm-audio-illustration">
            <div className="calm-audio-orb">♫</div>

            <div className="calm-sound-wave">
              {[18, 30, 22, 42, 27, 36, 16, 30, 20, 40, 24, 34, 17].map(
                (height, index) => (
                  <span
                    key={index}
                    style={{ height: `${height}px` }}
                  />
                )
              )}
            </div>

            <p>A familiar sound can bring comfort.</p>
          </div>

          <label className="calm-upload-btn">
            ＋ Add an audio file
            <input
              type="file"
              accept="audio/*"
              multiple
              hidden
              onChange={handleAudioUpload}
            />
          </label>

          <p className="calm-upload-hint">
            Audio files up to 5 MB each.
          </p>

          <div className="calm-audio-list">
            {audioFiles.length === 0 ? (
              <div className="calm-empty-state">
                <span>♫</span>
                <span>Your favourite sounds will appear here.</span>
              </div>
            ) : (
              audioFiles.map((audio) => (
                <div className="calm-audio-item" key={audio.id}>
                  <div className="calm-audio-file-icon">♫</div>

                  <span title={audio.name}>{audio.name}</span>

                  <button
                    className="calm-delete-btn"
                    aria-label={`Delete ${audio.name}`}
                    onClick={() => deleteAudio(audio.id)}
                  >
                    ×
                  </button>

                  <audio controls src={audio.data} />
                </div>
              ))
            )}
          </div>

          <div className="calm-recording-box">
            <div>
              <strong>Record a comforting message</strong>
              <p>Save a short voice message to your device.</p>
            </div>

            {!recording ? (
              <button
                className="calm-record-btn"
                onClick={startRecording}
              >
                <span className="calm-record-dot" /> Record
              </button>
            ) : (
              <button
                className="calm-stop-btn"
                onClick={stopRecording}
              >
                ■ Stop recording
              </button>
            )}
          </div>

          {recordingError && (
            <p className="calm-error-message">{recordingError}</p>
          )}
        </article>
      </section>

      {/* Mood check-in */}
      <section className="calm-card calm-mood-section">
        <div className="calm-card-heading">
          <div className="calm-icon calm-icon-yellow">☺</div>
          <div>
            <h3>How are you feeling?</h3>
            <p>
              Every feeling is welcome. Choose the one that feels closest.
            </p>
          </div>
        </div>

        <div className="calm-mood-options">
          {moods.map((mood) => (
            <button
              key={mood.name}
              className={`calm-mood-option ${
                selectedMood === mood.name ? "selected" : ""
              }`}
              onClick={() => {
                setSelectedMood(mood.name);
                setSavedMoodMessage("");
              }}
            >
              <span>{mood.emoji}</span>
              <strong>{mood.name}</strong>
            </button>
          ))}
        </div>

        <div className="calm-mood-footer">
          <p>
            {savedMoodMessage ||
              "You can share how you feel whenever you are ready."}
          </p>

          <button className="calm-primary-btn" onClick={saveMood}>
            ♡ Save my mood
          </button>
        </div>
      </section>

      {/* Saved memories */}
      <section className="calm-card calm-memories-section">
        <div className="calm-memories-header">
          <div className="calm-card-heading">
            <div className="calm-icon calm-icon-pink">♡</div>
            <div>
              <h3>Little moments, lovely memories</h3>
              <p>Revisit the memories you have saved with CLARA.</p>
            </div>
          </div>

          <button
            className="calm-refresh-btn"
            onClick={refreshMemories}
          >
            ↻ Refresh
          </button>
        </div>

        {memories.length === 0 ? (
          <div className="calm-empty-memories">
            <div className="calm-empty-memory-icon">♡</div>
            <h4>Your memories are waiting here</h4>
            <p>
              Save a memory in My Memories, then come back to see it here.
            </p>
          </div>
        ) : (
          <div className="calm-memory-grid">
            {memories.slice(0, 4).map((memory, index) => (
              <article
                className="calm-memory-item"
                key={memory.id ?? index}
              >
                {memory.image ? (
                  <img
                    src={memory.image}
                    alt={memory.title || "Saved memory"}
                  />
                ) : (
                  <div className="calm-memory-placeholder">♡</div>
                )}

                <div className="calm-memory-info">
                  <span>{memory.category || "A special moment"}</span>
                  <h4>{memory.title || "A lovely memory"}</h4>
                  <p>
                    {memory.description ||
                      "A moment worth remembering."}
                  </p>

                  <button
                    className="calm-listen-btn"
                    onClick={() => speakMemory(memory)}
                  >
                    ♫ Listen
                  </button>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>

      {/* Gentle reminder */}
      <section className="calm-reminder">
        <div className="calm-reminder-icon">☾</div>

        <div>
          <h3>A gentle reminder</h3>
          <p>
            You matter. Take one moment at a time, and remember that
            someone who cares about you is always close by.
          </p>
        </div>

        <span className="calm-reminder-heart">♡</span>
      </section>
    </main>
  );
}
