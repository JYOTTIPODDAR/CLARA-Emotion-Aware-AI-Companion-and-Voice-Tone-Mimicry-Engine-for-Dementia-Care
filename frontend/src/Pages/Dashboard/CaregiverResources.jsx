
import { useMemo, useState } from "react";
import "./Dashboard.css";

const resources = [
  {
    id: 1,
    title: "Understanding Dementia",
    description:
      "Learn about common symptoms, changes in memory, and how dementia may affect everyday activities.",
    category: "Education",
    icon: "🧠",
    duration: "6 min read",
    featured: true,
  },
  {
    id: 2,
    title: "How to Respond to Agitation",
    description:
      "Use a calm voice, reduce distractions, acknowledge feelings, and offer a familiar activity.",
    category: "Emotional care",
    icon: "💜",
    duration: "5 min read",
    featured: true,
  },
  {
    id: 3,
    title: "Creating a Daily Routine",
    description:
      "Build a predictable schedule for meals, rest, activities, and medication reminders.",
    category: "Daily care",
    icon: "📅",
    duration: "4 min read",
    featured: false,
  },
  {
    id: 4,
    title: "Communicating with Patience",
    description:
      "Use short sentences, allow time for responses, and avoid arguing over forgotten details.",
    category: "Communication",
    icon: "💬",
    duration: "7 min read",
    featured: true,
  },
  {
    id: 5,
    title: "Making the Home Safer",
    description:
      "Reduce trip hazards, improve lighting, and keep frequently used items easy to find.",
    category: "Safety",
    icon: "🏡",
    duration: "5 min read",
    featured: false,
  },
  {
    id: 6,
    title: "Looking After Yourself",
    description:
      "Take breaks, ask trusted people for help, and make time for your own wellbeing.",
    category: "Caregiver wellbeing",
    icon: "🌷",
    duration: "4 min read",
    featured: false,
  },
];

const categories = [
  "All",
  "Education",
  "Emotional care",
  "Daily care",
  "Communication",
  "Safety",
  "Caregiver wellbeing",
];

export default function CaregiverResources() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [savedIds, setSavedIds] = useState([]);
  const [selectedResource, setSelectedResource] = useState(null);

  const filteredResources = useMemo(() => {
    return resources.filter((resource) => {
      const matchesSearch =
        resource.title.toLowerCase().includes(search.toLowerCase()) ||
        resource.description.toLowerCase().includes(search.toLowerCase());

      const matchesCategory =
        category === "All" || resource.category === category;

      return matchesSearch && matchesCategory;
    });
  }, [search, category]);

  const toggleSaved = (id) => {
    setSavedIds((previous) =>
      previous.includes(id)
        ? previous.filter((savedId) => savedId !== id)
        : [...previous, id]
    );
  };

  return (
    <div className="care-dashboard">
      <div className="care-page-heading">
        <div>
          <p className="care-eyebrow">LEARN & GROW</p>
          <h1>Caregiver Resources</h1>
          <p className="care-muted">
            Practical guidance to help you provide thoughtful, compassionate
            dementia care.
          </p>
        </div>

        <div className="care-resource-count">
          <span>📚</span>
          <div>
            <strong>{resources.length} resources</strong>
            <p>Available to explore</p>
          </div>
        </div>
      </div>

      <div className="care-resource-hero">
        <div className="care-resource-hero-content">
          <span className="care-resource-hero-label">
            YOUR CAREGIVER GUIDE
          </span>
          <h2>Small moments make a meaningful difference.</h2>
          <p>
            Explore simple ways to support memory, emotional wellbeing,
            communication, and everyday comfort.
          </p>
          <button
            className="care-resource-hero-button"
            onClick={() => {
              document
                .getElementById("care-resource-library")
                ?.scrollIntoView({ behavior: "smooth" });
            }}
          >
            Explore resources →
          </button>
        </div>
        <div className="care-resource-hero-art" aria-hidden="true">
          <span>🌿</span>
          <span>💜</span>
          <span>🫶</span>
        </div>
      </div>

      <div className="care-resource-section-heading">
        <div>
          <h2>Recommended for you</h2>
          <p className="care-muted">
            Helpful starting points for everyday caregiving.
          </p>
        </div>
      </div>

      <div className="care-resource-featured-grid">
        {resources
          .filter((resource) => resource.featured)
          .map((resource) => (
            <article className="care-main-card care-resource-card" key={resource.id}>
              <div className="care-resource-card-top">
                <span className="care-resource-icon">{resource.icon}</span>
                <button
                  className={`care-resource-save ${
                    savedIds.includes(resource.id) ? "saved" : ""
                  }`}
                  onClick={() => toggleSaved(resource.id)}
                  aria-label={
                    savedIds.includes(resource.id)
                      ? "Remove saved resource"
                      : "Save resource"
                  }
                >
                  {savedIds.includes(resource.id) ? "♥" : "♡"}
                </button>
              </div>
              <span className="care-memory-tag">{resource.category}</span>
              <h3>{resource.title}</h3>
              <p>{resource.description}</p>
              <div className="care-resource-card-bottom">
                <span>◷ {resource.duration}</span>
                <button onClick={() => setSelectedResource(resource)}>
                  Read guide →
                </button>
              </div>
            </article>
          ))}
      </div>

      <div id="care-resource-library" className="care-resource-library">
        <div className="care-resource-section-heading">
          <div>
            <h2>Resource library</h2>
            <p className="care-muted">
              Find guidance based on your current needs.
            </p>
          </div>
        </div>

        <div className="care-main-card care-resource-toolbar">
          <div className="care-search-box">
            <span>⌕</span>
            <input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search caregiving topics..."
              aria-label="Search resources"
            />
          </div>

          <select
            className="care-memory-patient-filter"
            value={category}
            onChange={(event) => setCategory(event.target.value)}
            aria-label="Filter resources by category"
          >
            {categories.map((item) => (
              <option key={item}>{item}</option>
            ))}
          </select>
        </div>

        <div className="care-resource-library-grid">
          {filteredResources.map((resource) => (
            <article className="care-main-card care-resource-card" key={resource.id}>
              <div className="care-resource-card-top">
                <span className="care-resource-icon">{resource.icon}</span>
                <button
                  className={`care-resource-save ${
                    savedIds.includes(resource.id) ? "saved" : ""
                  }`}
                  onClick={() => toggleSaved(resource.id)}
                  aria-label={
                    savedIds.includes(resource.id)
                      ? "Remove saved resource"
                      : "Save resource"
                  }
                >
                  {savedIds.includes(resource.id) ? "♥" : "♡"}
                </button>
              </div>
              <span className="care-memory-tag">{resource.category}</span>
              <h3>{resource.title}</h3>
              <p>{resource.description}</p>
              <div className="care-resource-card-bottom">
                <span>◷ {resource.duration}</span>
                <button onClick={() => setSelectedResource(resource)}>
                  Read guide →
                </button>
              </div>
            </article>
          ))}
        </div>

        {filteredResources.length === 0 && (
          <div className="care-main-card care-memory-empty">
            <span>🔎</span>
            <h3>No resources found</h3>
            <p>Try another keyword or category.</p>
          </div>
        )}
      </div>

      {selectedResource && (
        <div
          className="care-resource-modal-backdrop"
          onClick={() => setSelectedResource(null)}
        >
          <section
            className="care-main-card care-resource-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="care-resource-modal-title"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              className="care-resource-modal-close"
              onClick={() => setSelectedResource(null)}
              aria-label="Close guide"
            >
              ×
            </button>

            <span className="care-resource-icon">
              {selectedResource.icon}
            </span>
            <span className="care-memory-tag">
              {selectedResource.category}
            </span>
            <h2 id="care-resource-modal-title">
              {selectedResource.title}
            </h2>
            <p>{selectedResource.description}</p>

            <div className="care-resource-guide-note">
              <strong>Try this</strong>
              <p>
                Stay patient, observe the person's response, and adapt your
                approach to their comfort and individual needs. If you have
                concerns about symptoms or safety, contact a qualified
                healthcare professional.
              </p>
            </div>

            <button
              className="care-primary-button"
              onClick={() => setSelectedResource(null)}
            >
              Done
            </button>
          </section>
        </div>
      )}

      <div className="care-memory-privacy">
        <span>ⓘ</span>
        <p>
          <strong>Educational information</strong>
          <br />
          These are sample resources for the CLARA interface, not personalised
          medical advice. Saved items remain in page state and are not stored
          in a database.
        </p>
      </div>
    </div>
  );
}
