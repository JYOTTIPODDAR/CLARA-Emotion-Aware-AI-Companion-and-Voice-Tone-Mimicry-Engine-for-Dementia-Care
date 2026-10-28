
import { useEffect, useRef, useState } from "react";
import {
  Flower2,
  Wind,
  Heart,
  Play,
  Pause,
  Music,
  Upload,
  Mic,
  Square,
  Trash2,
  Volume2,
  Smile,
  Cloud,
  Image as ImageIcon,
  Plus,
  X,
} from "lucide-react";
import "./CalmCorner.css";

const getPatientId = () =>
  localStorage.getItem("clara_patient_id") || "demo";

const audioStorageKey = () => `clara_comfort_audio_${getPatientId()}`;
const moodStorageKey = () => `clara_calm_moods_${getPatientId()}`;

const readStorage = (key, fallback) => {
  try {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : fallback;
  } catch {
    return fallback;
  }
};

const moodOptions = [
  { label: "Happy", emoji: "😊" },
  { label: "Calm", emoji: "😌" },
  { label: "Worried", emoji: "😟" },
  { label: "Restless", emoji: "😣" },
];

export default function CalmCorner() {
  const [running, setRunning] = useState(false);
  const [phase, setPhase] = useState("Ready when you are");
  const [breathDuration, setBreathDuration] = useState(60);

  const [audioItems, setAudioItems] = useState([]);
  const [audioName, setAudioName] = useState("");
  const [audioCategory, setAudioCategory] = useState("Family voice");
  const [uploadError, setUploadError] = useState("");
  const [activeAudioId, setActiveAudioId] = useState(null);

  const [recording, setRecording] = useState(false);
  const [recordingSupported, setRecordingSupported] = useState(true);

  const [selectedMood, setSelectedMood] = useState("");
  const [savedMood, setSavedMood] = useState(null);
  const [showUploadForm, setShowUploadForm] = useState(false);

  const fileInputRef = useRef(null);
  const audioRef = useRef(null);
  const recorderRef = useRef(null);
  const streamRef = useRef(null);
  const chunksRef = useRef([]);
  const breathingTimerRef = useRef(null);
  const breathingStartRef = useRef(0);
  const breathingElapsedRef = useRef(0);

  useEffect(() => {
    setAudioItems(readStorage(audioStorageKey(), []));
    const moods = readStorage(moodStorageKey(), []);
    setSavedMood(moods.length ? moods[moods.length - 1] : null);

    return () => {
      clearInterval(breathingTimerRef.current);

      if (recorderRef.current?.state === "recording") {
        recorderRef.current.ondataavailable = null;
        recorderRef.current.onstop = null;
        recorderRef.current.stop();
      }

      streamRef.current?.getTracks().forEach((track) => track.stop());
    };
  }, []);

  useEffect(() => {
    if (!running) {
      clearInterval(breathingTimerRef.current);
      breathingTimerRef.current = null;
      setPhase("Ready when you are");
      return;
    }

    breathingStartRef.current = Date.now();
    setPhase("Breathe in gently");

    breathingTimerRef.current = setInterval(() => {
      const elapsed =
        breathingElapsedRef.current +
        (Date.now() - breathingStartRef.current);

      if (elapsed >= breathDuration * 1000) {
        clearInterval(breathingTimerRef.current);
        breathingTimerRef.current = null;
        breathingElapsedRef.current = 0;
        setRunning(false);
        setPhase("Beautifully done. Take a gentle rest.");
        return;
      }

      const cyclePosition = Math.floor(elapsed / 4000) % 2;
      setPhase(cyclePosition === 0 ? "Breathe in gently" : "Breathe out slowly");
    }, 1000);

    return () => clearInterval(breathingTimerRef.current);
  }, [running, breathDuration]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleEnded = () => setActiveAudioId(null);
    const handleError = () => {
      setUploadError("This audio could not be played. Please choose another file.");
      setActiveAudioId(null);
    };

    audio.addEventListener("ended", handleEnded);
    audio.addEventListener("error", handleError);

    return () => {
      audio.removeEventListener("ended", handleEnded);
      audio.removeEventListener("error", handleError);
    };
  }, []);

  const persistAudio = (items) => {
    try {
      localStorage.setItem(audioStorageKey(), JSON.stringify(items));
      setAudioItems(items);
      return true;
    } catch {
      setUploadError(
        "Storage is full. Please use a smaller audio file or clear some saved recordings."
      );
      return false;
    }
  };

  const addAudioFile = async (file) => {
    if (!file) return;

    setUploadError("");

    if (!file.type.startsWith("audio/")) {
      setUploadError("Please select a valid audio file.");
      return;
    }

    // Keep localStorage usage manageable. IndexedDB can be added for larger libraries.
    const maxSize = 5 * 1024 * 1024;

    if (file.size > maxSize) {
      setUploadError(
        "This file is larger than 5 MB. Please choose a smaller audio file."
      );
      return;
    }

    const name = audioName.trim() || file.name.replace(/\.[^/.]+$/, "");

    try {
      const dataUrl = await new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.onerror = () => reject(new Error("File could not be read."));
        reader.readAsDataURL(file);
      });

      const item = {
        id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
        name,
        category: audioCategory,
        dataUrl,
        fileType: file.type,
        size: file.size,
        createdAt: new Date().toISOString(),
      };

      const updated = [item, ...audioItems];
      if (persistAudio(updated)) {
        setAudioName("");
        setShowUploadForm(false);
        if (fileInputRef.current) fileInputRef.current.value = "";
      }
    } catch {
      setUploadError("The audio file could not be saved. Please try again.");
    }
  };

  const playAudio = async (item) => {
    const audio = audioRef.current;
    if (!audio) return;

    setUploadError("");

    if (activeAudioId === item.id && !audio.paused) {
      audio.pause();
      setActiveAudioId(null);
      return;
    }

    audio.pause();
    audio.src = item.dataUrl;
    audio.currentTime = 0;
    setActiveAudioId(item.id);

    try {
      await audio.play();
    } catch {
      setActiveAudioId(null);
      setUploadError("Audio playback failed. Please try again.");
    }
  };

  const deleteAudio = (item) => {
    if (activeAudioId === item.id) {
      audioRef.current?.pause();
      setActiveAudioId(null);
    }

    persistAudio(audioItems.filter((audio) => audio.id !== item.id));
  };

  const toggleBreathing = () => {
    if (running) {
      breathingElapsedRef.current +=
        Date.now() - breathingStartRef.current;
      setRunning(false);
      setPhase("Paused. Take your time.");
      return;
    }

    if (breathingElapsedRef.current >= breathDuration * 1000) {
      breathingElapsedRef.current = 0;
    }

    setRunning(true);
  };

  const stopBreathing = () => {
    setRunning(false);
    breathingElapsedRef.current = 0;
    setPhase("Ready when you are");
  };

  const startRecording = async () => {
    setUploadError("");

    if (!navigator.mediaDevices?.getUserMedia || !window.MediaRecorder) {
      setRecordingSupported(false);
      setUploadError(
        "Voice recording is not supported in this browser. Try an updated browser over HTTPS or localhost."
      );
      return;
    }

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;
      chunksRef.current = [];

      const recorder = new MediaRecorder(stream);
      recorderRef.current = recorder;

      recorder.ondataavailable = (event) => {
        if (event.data.size > 0) chunksRef.current.push(event.data);
      };

      recorder.onerror = () => {
        setUploadError("Recording failed. Please try again.");
        setRecording(false);
      };

      recorder.onstop = async () => {
        stream.getTracks().forEach((track) => track.stop());
        streamRef.current = null;

        const mimeType = recorder.mimeType || "audio/webm";
        const blob = new Blob(chunksRef.current, { type: mimeType });

        if (!blob.size) {
          setUploadError("No audio was recorded. Please try again.");
          return;
        }

        const extension = mimeType.includes("mp4") ? "m4a" : "webm";
        const file = new File([blob], `Voice recording.${extension}`, {
          type: mimeType,
        });

        setAudioName((current) => current.trim() || "My voice recording");
        await addAudioFile(file);
      };

      recorder.start();
      setRecording(true);
    } catch {
      setUploadError(
        "Microphone permission was denied or unavailable. Please allow microphone access in your browser."
      );
      setRecording(false);
    }
  };

  const stopRecording = () => {
    if (recorderRef.current?.state === "recording") {
      recorderRef.current.stop();
    }
    setRecording(false);
  };

  const saveMood = (mood) => {
    setSelectedMood(mood.label);

    const entry = {
      ...mood,
      createdAt: new Date().toISOString(),
    };

    const history = readStorage(moodStorageKey(), []);
    const updated = [entry, ...history].slice(0, 30);

    try {
      localStorage.setItem(moodStorageKey(), JSON.stringify(updated));
      setSavedMood(entry);
    } catch {
      setSavedMood(entry);
      setUploadError("Mood selected, but it could not be saved.");
    }
  };

  const moodSuggestion = {
    Happy: "Enjoy your favorite song or share a happy memory.",
    Calm: "You can enjoy a gentle breathing exercise or relaxing sound.",
    Worried: "Try slow, comfortable breathing or listen to a familiar voice.",
    Restless: "Choose a comforting recording or sit quietly for a moment.",
  };

  return (
    <section className="feature-page calm-page">
      <div className="feature-heading calm-heading">
        <span className="feature-icon calm-heading-icon">
          <Flower2 size={27} />
        </span>
        <div>
          <h1>Calm Corner</h1>
          <p>A peaceful place to pause, listen and feel connected.</p>
        </div>
      </div>

      <div className="calm-welcome">
        <div className="calm-welcome-orb">
          <Heart size={34} />
        </div>
        <div>
          <h2>You deserve a peaceful moment</h2>
          <p>
            Breathe gently, listen to a familiar voice, or enjoy something that
            makes you feel at home.
          </p>
        </div>
      </div>

      <div className="calm-section-heading">
        <div>
          <h2><Wind size={22} /> Gentle breathing</h2>
          <p>Follow the circle at a comfortable pace.</p>
        </div>
      </div>

      <div className="feature-card feature-centered calm-breathing-card">
        <div
          className={`calm-breathing-circle ${
            running ? "calm-breathing-active" : ""
          }`}
        >
          <Wind size={42} />
        </div>

        <h2 aria-live="polite">{phase}</h2>
        <p>
          There is no rush. If breathing exercises feel uncomfortable, stop and
          rest.
        </p>

        <label className="calm-duration-label" htmlFor="calm-duration">
          Exercise duration
        </label>
        <select
          id="calm-duration"
          className="calm-duration-select"
          value={breathDuration}
          disabled={running}
          onChange={(event) => setBreathDuration(Number(event.target.value))}
        >
          <option value={30}>30 seconds</option>
          <option value={60}>1 minute</option>
          <option value={120}>2 minutes</option>
          <option value={180}>3 minutes</option>
        </select>

        <div className="calm-button-row">
          <button className="feature-button" onClick={toggleBreathing}>
            {running ? <Pause size={18} /> : <Play size={18} />}
            {running ? "Pause exercise" : "Start breathing"}
          </button>
          <button className="calm-secondary-button" onClick={stopBreathing}>
            Stop
          </button>
        </div>
      </div>

      <div className="calm-section-heading calm-audio-heading">
        <div>
          <h2><Music size={22} /> My Comfort Audio</h2>
          <p>Save music and familiar voices you want to hear again.</p>
        </div>
        <button
          className="calm-add-button"
          onClick={() => {
            setUploadError("");
            setShowUploadForm((value) => !value);
          }}
        >
          {showUploadForm ? <X size={18} /> : <Plus size={18} />}
          {showUploadForm ? "Cancel" : "Add audio"}
        </button>
      </div>

      {showUploadForm && (
        <div className="calm-upload-card">
          <h3>Add your own audio</h3>
          <p>Upload a song or a recording from someone you love.</p>

          <label htmlFor="calm-audio-name">Audio name</label>
          <input
            id="calm-audio-name"
            value={audioName}
            onChange={(event) => setAudioName(event.target.value)}
            placeholder="e.g. My daughter's voice"
            maxLength={80}
          />

          <label htmlFor="calm-audio-category">Category</label>
          <select
            id="calm-audio-category"
            value={audioCategory}
            onChange={(event) => setAudioCategory(event.target.value)}
          >
            <option>Family voice</option>
            <option>Favorite music</option>
            <option>Prayer or bhajan</option>
            <option>Nature sounds</option>
            <option>My recording</option>
            <option>Other</option>
          </select>

          <input
            ref={fileInputRef}
            className="calm-file-input"
            type="file"
            accept="audio/*"
            aria-label="Choose an audio file"
            onChange={(event) => addAudioFile(event.target.files?.[0])}
          />

          <button
            className="calm-upload-button"
            onClick={() => fileInputRef.current?.click()}
          >
            <Upload size={19} /> Choose audio file
          </button>

          <p className="calm-small-note">
            Audio files up to 5 MB are supported in this version.
          </p>

          <div className="calm-record-area">
            <div>
              <strong><Mic size={18} /> Record a voice</strong>
              <p>Record a personal message using your microphone.</p>
            </div>

            {recording ? (
              <button className="calm-record-button is-recording" onClick={stopRecording}>
                <Square size={17} /> Stop recording
              </button>
            ) : (
              <button
                className="calm-record-button"
                onClick={startRecording}
                disabled={!recordingSupported}
              >
                <Mic size={17} /> Start recording
              </button>
            )}
          </div>
        </div>
      )}

      {uploadError && (
        <div className="calm-error" role="alert">
          {uploadError}
        </div>
      )}

      <audio ref={audioRef} preload="none" />

      {audioItems.length === 0 ? (
        <div className="calm-empty-audio">
          <div className="calm-empty-icon"><Volume2 size={30} /></div>
          <h3>Your comfort library starts here</h3>
          <p>
            Add your favorite music or a family voice recording. You can play
            your saved audio whenever you want.
          </p>
          <button className="calm-add-button" onClick={() => setShowUploadForm(true)}>
            <Plus size={18} /> Add your first audio
          </button>
        </div>
      ) : (
        <div className="calm-audio-grid">
          {audioItems.map((item) => (
            <article className="calm-audio-item" key={item.id}>
              <div className="calm-audio-art">
                {item.category === "Family voice" || item.category === "My recording"
                  ? <Heart size={26} />
                  : <Music size={26} />}
              </div>
              <div className="calm-audio-details">
                <h3>{item.name}</h3>
                <p>{item.category}</p>
                <span>{(item.size / (1024 * 1024)).toFixed(2)} MB</span>
              </div>
              <div className="calm-audio-actions">
                <button
                  className="calm-play-button"
                  onClick={() => playAudio(item)}
                  aria-label={`${activeAudioId === item.id ? "Pause" : "Play"} ${item.name}`}
                >
                  {activeAudioId === item.id && audioRef.current && !audioRef.current.paused
                    ? <Pause size={20} />
                    : <Play size={20} />}
                </button>
                <button
                  className="calm-delete-button"
                  onClick={() => deleteAudio(item)}
                  aria-label={`Delete ${item.name}`}
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </article>
          ))}
        </div>
      )}

      <div className="calm-section-heading">
        <div>
          <h2><Smile size={22} /> How are you feeling?</h2>
          <p>Choose whichever feels closest to your mood right now.</p>
        </div>
      </div>

      <div className="calm-mood-grid">
        {moodOptions.map((mood) => (
          <button
            key={mood.label}
            className={`calm-mood-button ${
              selectedMood === mood.label ? "selected" : ""
            }`}
            onClick={() => saveMood(mood)}
            aria-pressed={selectedMood === mood.label}
          >
            <span>{mood.emoji}</span>
            {mood.label}
          </button>
        ))}
      </div>

      {selectedMood && (
        <div className="calm-mood-suggestion">
          <Heart size={22} />
          <div>
            <strong>A gentle suggestion for you</strong>
            <p>{moodSuggestion[selectedMood]}</p>
          </div>
        </div>
      )}

      {savedMood && (
        <p className="calm-last-mood">
          Last saved mood: {savedMood.emoji} {savedMood.label}
        </p>
      )}

      <div className="feature-card feature-info-card calm-kind-reminder">
        <Heart size={23} />
        <div>
          <strong>A kind reminder</strong>
          <p>
            It is okay to take a break. You can stop any activity whenever you
            want.
          </p>
        </div>
      </div>
    </section>
  );
}
