
import { useMemo, useState } from "react";
import "./Dashboard.css";

const initialMemories = [
  {
    id: 1,
    title: "Family members",
    description: "Her daughter Priya visits every evening.",
    category: "Family",
    patient: "Savitri Devi",
    date: "Oct 24, 2026",
    icon: "👨‍👩‍👧",
  },
  {
    id: 2,
    title: "Favourite music",
    description: "She enjoys old Hindi songs, especially Lata Mangeshkar.",
    category: "Preferences",
    patient: "Savitri Devi",
    date: "Oct 23, 2026",
    icon: "🎵",
  },
  {
    id: 3,
    title: "Daily routine",
    description: "Prefers morning tea around 7:30 AM.",
    category: "Routine",
    patient: "Savitri Devi",
    date: "Oct 22, 2026",
    icon: "☕",
  },
  {
    id: 4,
    title: "Comforting reminders",
    description: "Gently remind her that she is safe at home.",
    category: "Care",
    patient: "Savitri Devi",
    date: "Oct 21, 2026",
    icon: "💜",
  },
  {
    id: 5,
    title: "Favourite activity",
    description: "Enjoys sitting in the garden in the afternoon.",
    category: "Preferences",
    patient: "Ramesh Kumar",
    date: "Oct 20, 2026",
    icon: "🌿",
  },
];

const categories = ["All", "Family", "Preferences", "Routine", "Care"];

export default function MemoryPreferences() {
  const [memories, setMemories] = useState(initialMemories);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [patient, setPatient] = useState("All patients");
  const [showForm, setShowForm] = useState(false);
  const [newMemory, setNewMemory] = useState({
    title: "",
    description: "",
    category: "Care",
    patient: "Savitri Devi",
  });

  const filteredMemories = useMemo(() => {
    return memories.filter((memory) => {
      const matchesSearch =
        memory.title.toLowerCase().includes(search.toLowerCase()) ||
        memory.description.toLowerCase().includes(search.toLowerCase());

      const matchesCategory =
        category === "All" || memory.category === category;

      const matchesPatient =
        patient === "All patients" || memory.patient === patient;

      return matchesSearch && matchesCategory && matchesPatient;
    });
  }, [memories, search, category, patient]);

  const handleAddMemory = (event) => {
    event.preventDefault();

    if (!newMemory.title.trim() || !newMemory.description.trim()) {
      return;
    }

    const icons = {
      Family: "👨‍👩‍👧",
      Preferences: "💜",
      Routine: "☕",
      Care: "🌷",
    };

    const memory = {
      ...newMemory,
      id: Date.now(),
      title: newMemory.title.trim(),
      description: newMemory.description.trim(),
      date: new Date().toLocaleDateString("en-IN", {
        month: "short",
        day: "numeric",
        year: "numeric",
      }),
      icon: icons[newMemory.category] || "💜",
    };

    setMemories((previous) => [memory, ...previous]);
    setNewMemory({
      title: "",
      description: "",
      category: "Care",
      patient: "Savitri Devi",
    });
    setShowForm(false);
  };

  const handleDeleteMemory = (id) => {
    setMemories((previous) =>
      previous.filter((memory) => memory.id !== id)
    );
  };

  return (
    <div className="care-dashboard">
      <div className="care-page-heading">
        <div>
          <p className="care-eyebrow">PERSONALISED CARE</p>
          <h1>Memory & Preferences</h1>
          <p className="care-muted">
            Keep important details close to help CLARA provide more
            familiar and reassuring conversations.
          </p>
        </div>

        <button
          className="care-primary-button"
          onClick={() => setShowForm((value) => !value)}
        >
          {showForm ? "✕ Cancel" : "+ Add memory"}
        </button>
      </div>

      <div className="care-stats-grid">
        <div className="care-stat-card">
          <span className="care-stat-icon">🧠</span>
          <div>
            <p>Total memories</p>
            <h2>{memories.length}</h2>
          </div>
        </div>

        <div className="care-stat-card">
          <span className="care-stat-icon">💜</span>
          <div>
            <p>Care preferences</p>
            <h2>
              {memories.filter((item) => item.category === "Care").length}
            </h2>
          </div>
        </div>

        <div className="care-stat-card">
          <span className="care-stat-icon">👨‍👩‍👧</span>
          <div>
            <p>Family memories</p>
            <h2>
              {memories.filter((item) => item.category === "Family").length}
            </h2>
          </div>
        </div>
      </div>

      {showForm && (
        <form className="care-main-card care-memory-form" onSubmit={handleAddMemory}>
          <div className="care-card-heading">
            <div>
              <h2>Add a new memory</h2>
              <p className="care-muted">
                Add a helpful detail for the selected patient.
              </p>
            </div>
          </div>

          <div className="care-memory-form-grid">
            <label>
              Memory title
              <input
                value={newMemory.title}
                onChange={(event) =>
                  setNewMemory({
                    ...newMemory,
                    title: event.target.value,
                  })
                }
                placeholder="e.g. Favourite flower"
                required
              />
            </label>

            <label>
              Patient
              <select
                value={newMemory.patient}
                onChange={(event) =>
                  setNewMemory({
                    ...newMemory,
                    patient: event.target.value,
                  })
                }
              >
                <option>Savitri Devi</option>
                <option>Ramesh Kumar</option>
                <option>Kamla Sharma</option>
                <option>Om Prakash</option>
              </select>
            </label>

            <label>
              Category
              <select
                value={newMemory.category}
                onChange={(event) =>
                  setNewMemory({
                    ...newMemory,
                    category: event.target.value,
                  })
                }
              >
                {categories.slice(1).map((item) => (
                  <option key={item}>{item}</option>
                ))}
              </select>
            </label>

            <label>
              Description
              <textarea
                value={newMemory.description}
                onChange={(event) =>
                  setNewMemory({
                    ...newMemory,
                    description: event.target.value,
                  })
                }
                placeholder="Write a helpful detail..."
                rows={3}
                required
              />
            </label>
          </div>

          <button className="care-primary-button" type="submit">
            Save memory
          </button>
        </form>
      )}

      <div className="care-main-card care-memory-toolbar">
        <div className="care-search-box">
          <span>⌕</span>
          <input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search memories..."
            aria-label="Search memories"
          />
        </div>

        <select
          className="care-memory-patient-filter"
          value={patient}
          onChange={(event) => setPatient(event.target.value)}
          aria-label="Filter by patient"
        >
          <option>All patients</option>
          <option>Savitri Devi</option>
          <option>Ramesh Kumar</option>
          <option>Kamla Sharma</option>
          <option>Om Prakash</option>
        </select>
      </div>

      <div className="care-memory-categories">
        {categories.map((item) => (
          <button
            key={item}
            className={`care-memory-category ${
              category === item ? "active" : ""
            }`}
            onClick={() => setCategory(item)}
          >
            {item}
          </button>
        ))}
      </div>

      <div className="care-memory-grid">
        {filteredMemories.map((memory) => (
          <article className="care-main-card care-memory-card" key={memory.id}>
            <div className="care-memory-card-top">
              <span className="care-memory-icon">{memory.icon}</span>
              <button
                className="care-memory-delete"
                onClick={() => handleDeleteMemory(memory.id)}
                aria-label={`Delete ${memory.title}`}
                title="Delete memory"
              >
                ×
              </button>
            </div>

            <span className="care-memory-tag">{memory.category}</span>
            <h3>{memory.title}</h3>
            <p className="care-memory-description">{memory.description}</p>

            <div className="care-memory-footer">
              <span>👤 {memory.patient}</span>
              <span>{memory.date}</span>
            </div>
          </article>
        ))}
      </div>

      {filteredMemories.length === 0 && (
        <div className="care-main-card care-memory-empty">
          <span>🔎</span>
          <h3>No memories found</h3>
          <p>Try another search or category.</p>
        </div>
      )}

      <div className="care-memory-privacy">
        <span>🔒</span>
        <p>
          <strong>Care with privacy</strong>
          <br />
          These demo memories are stored only in the current page state.
          They are not saved to the database yet.
        </p>
      </div>
    </div>
  );
}
