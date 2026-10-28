import { useEffect, useMemo, useState } from "react";
import {
  Images, Plus, Users, MapPin, Heart, Star, Search, Play,
  Pencil, Trash2, Mic, Sparkles, X, Upload, CalendarDays,
  ImagePlus, Volume2, Flower2, Check, ZoomIn
} from "lucide-react";
import "./Memories.css";

const DEFAULT_MEMORIES = [
  {
    id: "family-1",
    title: "My Family",
    category: "Family",
    date: "2024-01-12",
    description: "My children and grandchildren. They always make me happy.",
    image: "https://images.unsplash.com/photo-1511895426328-dc8714191300?auto=format&fit=crop&w=1000&q=85",
    favorite: true,
  },
  {
    id: "place-1",
    title: "Our Trip to Amritsar",
    category: "Places",
    date: "2023-11-18",
    description: "A beautiful visit to the Golden Temple with my family.",
    image: "https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&w=1000&q=85",
    favorite: true,
  },
  {
    id: "wedding-1",
    title: "My Wedding Day",
    category: "Special Moments",
    date: "1985-04-22",
    description: "A very special day in my life. We were so happy.",
    image: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1000&q=85",
    favorite: true,
  },
  {
    id: "garden-1",
    title: "My Garden",
    category: "Places",
    date: "2023-08-08",
    description: "I love these flowers. They make me feel calm and happy.",
    image: "https://images.unsplash.com/photo-1490750967868-88aa4486c946?auto=format&fit=crop&w=1000&q=85",
    favorite: false,
  },
  {
    id: "pet-1",
    title: "Our Pet Buddy",
    category: "Special Moments",
    date: "2022-05-05",
    description: "Buddy was such a good dog. I loved playing with him.",
    image: "https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&w=1000&q=85",
    favorite: false,
  },
  {
    id: "holiday-1",
    title: "Holidays in Manali",
    category: "Places",
    date: "2020-02-10",
    description: "The snowy mountains made this a wonderful holiday.",
    image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1000&q=85",
    favorite: true,
  },
  {
    id: "birthday-1",
    title: "My Birthday",
    category: "Special Moments",
    date: "2021-08-03",
    description: "My family surprised me with a lovely cake.",
    image: "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?auto=format&fit=crop&w=1000&q=85",
    favorite: false,
  },
  {
    id: "childhood-1",
    title: "My Childhood",
    category: "Family",
    date: "1960-01-01",
    description: "This reminds me of my childhood and happy times.",
    image: "https://images.unsplash.com/photo-1516627145497-ae6968895b74?auto=format&fit=crop&w=1000&q=85",
    favorite: false,
  },
];

const CATEGORIES = [
  { label: "All Memories", value: "All", icon: Images },
  { label: "Family", value: "Family", icon: Users },
  { label: "Places", value: "Places", icon: MapPin },
  { label: "Special Moments", value: "Special Moments", icon: Heart },
  { label: "Favorites", value: "Favorites", icon: Star },
];

const EMPTY_FORM = {
  title: "",
  category: "Family",
  date: new Date().toISOString().slice(0, 10),
  description: "",
  image: "",
};

function formatDate(date) {
  if (!date) return "";
  const parsed = new Date(`${date}T12:00:00`);
  if (Number.isNaN(parsed.getTime())) return date;

  return parsed.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

function makeId() {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

function compressImage(file) {
  return new Promise((resolve, reject) => {
    if (!file.type.startsWith("image/")) {
      reject(new Error("Please select an image file."));
      return;
    }

    const reader = new FileReader();
    reader.onerror = () => reject(new Error("Could not read this image."));

    reader.onload = () => {
      const image = new Image();
      image.onerror = () => reject(new Error("Could not open this image."));

      image.onload = () => {
        const maxSize = 1200;
        const scale = Math.min(1, maxSize / Math.max(image.width, image.height));
        const canvas = document.createElement("canvas");

        canvas.width = Math.max(1, Math.round(image.width * scale));
        canvas.height = Math.max(1, Math.round(image.height * scale));

        const context = canvas.getContext("2d");
        if (!context) {
          reject(new Error("Your browser could not process this image."));
          return;
        }

        context.drawImage(image, 0, 0, canvas.width, canvas.height);
        resolve(canvas.toDataURL("image/jpeg", 0.78));
      };

      image.src = reader.result;
    };

    reader.readAsDataURL(file);
  });
}

export default function Memories() {
  const patientId = localStorage.getItem("clara_patient_id") || "demo";
  const storageKey = `clara_memories_${patientId}`;

  const [memories, setMemories] = useState(() => {
    try {
      const saved = localStorage.getItem(storageKey);
      return saved ? JSON.parse(saved) : DEFAULT_MEMORIES;
    } catch {
      return DEFAULT_MEMORIES;
    }
  });

  const [activeCategory, setActiveCategory] = useState("All");
  const [search, setSearch] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(EMPTY_FORM);
  const [notice, setNotice] = useState("");
  const [error, setError] = useState("");
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [selectedFileName, setSelectedFileName] = useState("");
  const [surpriseId, setSurpriseId] = useState(null);

  useEffect(() => {
    try {
      localStorage.setItem(storageKey, JSON.stringify(memories));
      setError((current) =>
        current.startsWith("Storage is full") ? "" : current
      );
    } catch {
      setError("Storage is full. Try a smaller photo or delete an old memory.");
    }
  }, [memories, storageKey]);

  useEffect(() => {
    if (!selectedPhoto) return undefined;

    const handleKeyDown = (event) => {
      if (event.key === "Escape") setSelectedPhoto(null);
    };

    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [selectedPhoto]);

  useEffect(() => {
    return () => {
      if ("speechSynthesis" in window) window.speechSynthesis.cancel();
      document.body.style.overflow = "";
    };
  }, []);

  const filteredMemories = useMemo(() => {
    const query = search.trim().toLowerCase();

    return memories.filter((memory) => {
      const matchesCategory =
        activeCategory === "All" ||
        (activeCategory === "Favorites"
          ? memory.favorite
          : memory.category === activeCategory);

      const searchable =
        `${memory.title} ${memory.description} ${memory.category}`.toLowerCase();

      return matchesCategory && searchable.includes(query);
    });
  }, [memories, activeCategory, search]);

  const favoriteCount = memories.filter((memory) => memory.favorite).length;

  function openAddMemory(category = "Family") {
    setEditingId(null);
    setForm({ ...EMPTY_FORM, category });
    setSelectedFileName("");
    setError("");
    setModalOpen(true);
  }

  function openEditMemory(memory) {
    setEditingId(memory.id);
    setForm({
      title: memory.title,
      category: memory.category,
      date: memory.date || "",
      description: memory.description,
      image: memory.image || "",
    });
    setSelectedFileName("");
    setError("");
    setModalOpen(true);
  }

  function closeModal() {
    setModalOpen(false);
    setEditingId(null);
    setForm(EMPTY_FORM);
    setSelectedFileName("");
    setError("");
  }

  async function handleImageChange(event) {
    const file = event.target.files?.[0];
    if (!file) return;

    setError("");

    try {
      const image = await compressImage(file);
      setForm((current) => ({ ...current, image }));
      setSelectedFileName(file.name);
    } catch (err) {
      setError(err.message || "Could not upload the image.");
    }

    event.target.value = "";
  }

  function handleSave(event) {
    event.preventDefault();
    setError("");

    if (!form.title.trim()) {
      setError("Please enter a title for this memory.");
      return;
    }

    if (!form.description.trim()) {
      setError("Please add a short story or description.");
      return;
    }

    const memoryData = {
      ...form,
      title: form.title.trim(),
      description: form.description.trim(),
      image:
        form.image ||
        "https://images.unsplash.com/photo-1511895426328-dc8714191300?auto=format&fit=crop&w=1000&q=85",
    };

    if (editingId) {
      setMemories((current) =>
        current.map((memory) =>
          memory.id === editingId ? { ...memory, ...memoryData } : memory
        )
      );
      setNotice("Memory updated successfully.");
    } else {
      setMemories((current) => [
        { ...memoryData, id: makeId(), favorite: false },
        ...current,
      ]);
      setNotice("Your new memory has been saved.");
    }

    closeModal();
  }

  function toggleFavorite(id) {
    setMemories((current) =>
      current.map((memory) =>
        memory.id === id
          ? { ...memory, favorite: !memory.favorite }
          : memory
      )
    );
  }

  function deleteMemory(id) {
    if (!window.confirm("Are you sure you want to delete this memory?")) return;

    setMemories((current) => current.filter((memory) => memory.id !== id));
    if (selectedPhoto?.id === id) setSelectedPhoto(null);
    setNotice("Memory deleted.");
  }

  function listenToMemory(memory) {
    if (!("speechSynthesis" in window)) {
      setNotice("Voice playback is not supported by this browser.");
      return;
    }

    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(
      `${memory.title}. ${memory.description}`
    );
    utterance.lang = "en-IN";
    utterance.rate = 0.88;
    utterance.pitch = 1;

    const voices = window.speechSynthesis.getVoices();
    const voice =
      voices.find((item) => /en-IN/i.test(item.lang)) ||
      voices.find((item) => /en-GB/i.test(item.lang)) ||
      voices.find((item) => /en-US/i.test(item.lang));

    if (voice) utterance.voice = voice;
    window.speechSynthesis.speak(utterance);
    setNotice(`CLARA is reading: ${memory.title}`);
  }

  function surpriseMe() {
    if (!memories.length) {
      setNotice("Add a memory first to use Surprise Me.");
      return;
    }

    const memory = memories[Math.floor(Math.random() * memories.length)];
    setSurpriseId(memory.id);
    setActiveCategory("All");
    setSearch("");
    setNotice(`A special memory for you: ${memory.title}`);

    window.setTimeout(() => {
      document
        .getElementById(`memory-${memory.id}`)
        ?.scrollIntoView({ behavior: "smooth", block: "center" });
    }, 100);
  }

  function askClara() {
    if (!memories.length) {
      setNotice("Add your first memory, then CLARA can read it with you.");
      return;
    }

    listenToMemory(memories[Math.floor(Math.random() * memories.length)]);
  }

  function addFamilyMember() {
    setEditingId(null);
    setForm({
      ...EMPTY_FORM,
      category: "Family",
      title: "Family member memory",
      description: "Write their name, your relationship, and a happy memory together.",
    });
    setSelectedFileName("");
    setError("");
    setModalOpen(true);
  }

  return (
    <div className="mem-page">
      <section className="mem-hero">
        <div className="mem-hero-icon"><Images size={35} /></div>

        <div className="mem-hero-copy">
          <span className="mem-eyebrow"><Sparkles size={14} /> YOUR LIFE, YOUR STORIES</span>
          <h1>My Memories</h1>
          <h2>Your special people, places and moments.</h2>
          <p>Look at your photos, remember happy times, and let CLARA share your memories with you.</p>
        </div>

        <div className="mem-hero-art" aria-hidden="true">
          <div className="mem-photo-stack mem-stack-one">
            <img src={DEFAULT_MEMORIES[0].image} alt="" />
          </div>
          <div className="mem-photo-stack mem-stack-two">
            <img src={DEFAULT_MEMORIES[5].image} alt="" />
          </div>
          <div className="mem-photo-stack mem-stack-three">
            <img src={DEFAULT_MEMORIES[3].image} alt="" />
          </div>
          <div className="mem-handwritten">Every memory<br />has a story<Heart size={28} /></div>
          <Heart className="mem-floating-heart" size={23} fill="currentColor" />
        </div>
      </section>

      <section className="mem-action-grid">
        <button className="mem-action-card mem-action-purple" onClick={() => openAddMemory()}>
          <span className="mem-action-icon"><Plus size={30} /></span>
          <span><strong>Add Memory</strong><small>Upload a photo and tell a story</small></span>
        </button>

        <button className="mem-action-card mem-action-blue" onClick={addFamilyMember}>
          <span className="mem-action-icon"><Users size={27} /></span>
          <span><strong>Add Family Member</strong><small>Save names and relationships</small></span>
        </button>

        <button className="mem-action-card mem-action-green" onClick={askClara}>
          <span className="mem-action-icon"><Mic size={27} /></span>
          <span><strong>Ask CLARA</strong><small>Let CLARA read a memory to you</small></span>
        </button>

        <button className="mem-action-card mem-action-yellow" onClick={surpriseMe}>
          <span className="mem-action-icon"><Star size={28} fill="currentColor" /></span>
          <span><strong>Surprise Me</strong><small>Show a random memory</small></span>
        </button>
      </section>

      {notice && (
        <div className="mem-notice" role="status">
          <Check size={17} />
          <span>{notice}</span>
          <button onClick={() => setNotice("")} aria-label="Dismiss message"><X size={17} /></button>
        </div>
      )}

      {error && !modalOpen && (
        <div className="mem-error" role="alert">
          <span>{error}</span>
          <button onClick={() => setError("")} aria-label="Dismiss error"><X size={17} /></button>
        </div>
      )}

      <section className="mem-toolbar">
        <div className="mem-tabs" role="tablist" aria-label="Memory categories">
          {CATEGORIES.map(({ label, value, icon: Icon }) => (
            <button
              key={value}
              className={`mem-tab ${activeCategory === value ? "active" : ""}`}
              onClick={() => setActiveCategory(value)}
              role="tab"
              aria-selected={activeCategory === value}
            >
              <Icon size={17} />
              {label}
              {value === "Favorites" && <span className="mem-favorite-count">{favoriteCount}</span>}
            </button>
          ))}
        </div>

        <label className="mem-search">
          <Search size={19} />
          <input
            type="search"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search memories..."
            aria-label="Search memories"
          />
          {search && (
            <button type="button" onClick={() => setSearch("")} aria-label="Clear search"><X size={16} /></button>
          )}
        </label>
      </section>

      <div className="mem-results-line">
        <span><strong>{filteredMemories.length}</strong> {filteredMemories.length === 1 ? "memory" : "memories"}</span>
        <span>Every little moment matters 💜</span>
      </div>

      {filteredMemories.length ? (
        <section className="mem-card-grid">
          {filteredMemories.map((memory) => (
            <article
              className={`mem-card ${surpriseId === memory.id ? "mem-card-highlight" : ""}`}
              id={`memory-${memory.id}`}
              key={memory.id}
            >
              <div className="mem-card-image">
                <button
                  type="button"
                  className="mem-photo-open"
                  onClick={() => setSelectedPhoto(memory)}
                  aria-label={`View full-size photo: ${memory.title}`}
                >
                  <img
                    src={memory.image}
                    alt={memory.title}
                    loading="lazy"
                    onError={(event) => {
                      event.currentTarget.onerror = null;
                      event.currentTarget.src = DEFAULT_MEMORIES[0].image;
                    }}
                  />
                  <span className="mem-photo-zoom"><ZoomIn size={15} /> View photo</span>
                </button>

                <span className="mem-category-badge">
                  {memory.category === "Family" ? <Users size={13} /> :
                    memory.category === "Places" ? <MapPin size={13} /> : <Heart size={13} />}
                  {memory.category}
                </span>

                <button
                  className={`mem-heart-button ${memory.favorite ? "is-favorite" : ""}`}
                  onClick={() => toggleFavorite(memory.id)}
                  aria-label={memory.favorite ? "Remove from favorites" : "Add to favorites"}
                  title={memory.favorite ? "Remove from favorites" : "Add to favorites"}
                >
                  <Heart size={20} fill={memory.favorite ? "currentColor" : "white"} />
                </button>
              </div>

              <div className="mem-card-content">
                <div className="mem-card-title-row">
                  <h3>{memory.title}</h3>
                  <time>{formatDate(memory.date)}</time>
                </div>

                <p className="mem-card-description">{memory.description}</p>

                <div className="mem-card-actions">
                  <button className="mem-listen-button" onClick={() => listenToMemory(memory)}>
                    <Play size={15} fill="currentColor" /> Listen to this memory
                  </button>
                  <button className="mem-icon-button" onClick={() => openEditMemory(memory)} aria-label={`Edit ${memory.title}`} title="Edit memory">
                    <Pencil size={17} />
                  </button>
                  <button className="mem-icon-button mem-delete-button" onClick={() => deleteMemory(memory.id)} aria-label={`Delete ${memory.title}`} title="Delete memory">
                    <Trash2 size={17} />
                  </button>
                </div>
              </div>
            </article>
          ))}
        </section>
      ) : (
        <section className="mem-empty-state">
          <div className="mem-empty-icon"><ImagePlus size={35} /></div>
          <h2>No memories found</h2>
          <p>Try another search or category, or add a new memory to your collection.</p>
          <button className="mem-primary-button" onClick={() => openAddMemory()}><Plus size={18} /> Add your first memory</button>
        </section>
      )}

      <section className="mem-bottom-note">
        <div className="mem-bottom-note-icon"><Heart size={22} fill="currentColor" /></div>
        <div>
          <strong>Every memory is a little piece of your story.</strong>
          <p>Take your time. You can revisit these special moments whenever you like.</p>
        </div>
        <Flower2 className="mem-bottom-flower" size={37} />
      </section>

      {modalOpen && (
        <div
          className="mem-modal-backdrop"
          role="presentation"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) closeModal();
          }}
        >
          <section className="mem-modal" role="dialog" aria-modal="true" aria-labelledby="mem-modal-title">
            <div className="mem-modal-header">
              <div className="mem-modal-heading-icon">{editingId ? <Pencil size={22} /> : <ImagePlus size={22} />}</div>
              <div>
                <h2 id="mem-modal-title">{editingId ? "Edit Memory" : "Add a New Memory"}</h2>
                <p>Save a special person, place or moment.</p>
              </div>
              <button className="mem-modal-close" onClick={closeModal} aria-label="Close form"><X size={21} /></button>
            </div>

            <form className="mem-form" onSubmit={handleSave}>
              <label className="mem-upload-area">
                {form.image ? (
                  <img src={form.image} alt="Memory preview" />
                ) : (
                  <div className="mem-upload-placeholder">
                    <Upload size={27} />
                    <strong>Choose a memory photo</strong>
                    <span>Click here to upload an image</span>
                  </div>
                )}
                <input type="file" accept="image/*" onChange={handleImageChange} />
                <span className="mem-upload-overlay"><Upload size={16} /> Change photo</span>
              </label>

              {selectedFileName && <p className="mem-file-name">{selectedFileName}</p>}

              <label className="mem-form-field">
                <span>Memory title *</span>
                <input
                  value={form.title}
                  onChange={(event) => setForm({ ...form, title: event.target.value })}
                  placeholder="e.g. Family picnic"
                  maxLength={80}
                  required
                />
              </label>

              <div className="mem-form-row">
                <label className="mem-form-field">
                  <span>Category *</span>
                  <select value={form.category} onChange={(event) => setForm({ ...form, category: event.target.value })}>
                    <option>Family</option>
                    <option>Places</option>
                    <option>Special Moments</option>
                  </select>
                </label>

                <label className="mem-form-field">
                  <span><CalendarDays size={14} /> Date</span>
                  <input type="date" value={form.date} onChange={(event) => setForm({ ...form, date: event.target.value })} />
                </label>
              </div>

              <label className="mem-form-field">
                <span>Tell the story *</span>
                <textarea
                  value={form.description}
                  onChange={(event) => setForm({ ...form, description: event.target.value })}
                  placeholder="Who is in this photo? What makes this moment special?"
                  rows={4}
                  maxLength={600}
                  required
                />
                <small>{form.description.length}/600 characters</small>
              </label>

              {error && <p className="mem-form-error">{error}</p>}

              <div className="mem-modal-actions">
                <button type="button" className="mem-cancel-button" onClick={closeModal}>Cancel</button>
                <button type="submit" className="mem-save-button"><Check size={17} /> {editingId ? "Save Changes" : "Save Memory"}</button>
              </div>
            </form>
          </section>
        </div>
      )}

      {selectedPhoto && (
        <div className="mem-lightbox" role="presentation" onClick={() => setSelectedPhoto(null)}>
          <div
            className="mem-lightbox-content"
            role="dialog"
            aria-modal="true"
            aria-label={`Full-size photo: ${selectedPhoto.title}`}
            onClick={(event) => event.stopPropagation()}
          >
            <button className="mem-lightbox-close" onClick={() => setSelectedPhoto(null)} aria-label="Close full-size photo">
              <X size={24} />
            </button>

            <img
              className="mem-lightbox-image"
              src={selectedPhoto.image}
              alt={selectedPhoto.title}
            />

            <div className="mem-lightbox-caption">
              <div className="mem-lightbox-caption-heading">
                <div>
                  <h2>{selectedPhoto.title}</h2>
                  <span>{formatDate(selectedPhoto.date)} · {selectedPhoto.category}</span>
                </div>
                <button className="mem-lightbox-listen" onClick={() => listenToMemory(selectedPhoto)}>
                  <Volume2 size={17} /> Listen
                </button>
              </div>
              <p>{selectedPhoto.description}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}