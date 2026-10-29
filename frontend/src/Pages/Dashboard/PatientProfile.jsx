
import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Search,
  Plus,
  Users,
  ArrowLeft,
  ArrowRight,
  Clock3,
} from "lucide-react";

import "./PatientProfile.css";

const patients = [
  {
    id: "PT1023",
    name: "Savitri Devi",
    age: 78,
    condition: "Alzheimer's (Early Stage)",
    mood: "Anxious",
    moodClass: "anxious",
    active: "2 min ago",
    initials: "SD",
    color: "rose",
  },
  {
    id: "PT1045",
    name: "Ramesh Kumar",
    age: 82,
    condition: "Dementia",
    mood: "Calm",
    moodClass: "calm",
    active: "15 min ago",
    initials: "RK",
    color: "blue",
  },
  {
    id: "PT1067",
    name: "Kamla Sharma",
    age: 76,
    condition: "Alzheimer's",
    mood: "Neutral",
    moodClass: "neutral",
    active: "1 hour ago",
    initials: "KS",
    color: "peach",
  },
  {
    id: "PT1089",
    name: "Om Prakash",
    age: 80,
    condition: "Dementia",
    mood: "Calm",
    moodClass: "calm",
    active: "3 hours ago",
    initials: "OP",
    color: "green",
  },
  {
    id: "PT1102",
    name: "Leela Singh",
    age: 74,
    condition: "Memory impairment",
    mood: "At Risk",
    moodClass: "risk",
    active: "2 hours ago",
    initials: "LS",
    color: "lavender",
  },
];

export default function PatientProfile() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");

  const filteredPatients = useMemo(() => {
    const query = search.toLowerCase().trim();

    return patients.filter((patient) =>
      `${patient.name} ${patient.id} ${patient.condition}`
        .toLowerCase()
        .includes(query)
    );
  }, [search]);

  return (
    <div className="care-dashboard patient-profile-page">
      <div className="care-page-top">
        <div>
          <p className="care-eyebrow">PATIENT MANAGEMENT</p>
          <h1>My Patients</h1>
          <p className="care-muted">
            Manage and monitor the people in your care.
          </p>
        </div>

        <button
          className="care-primary-btn"
          onClick={() =>
            alert("Add Patient form will be connected later.")
          }
        >
          <Plus size={18} />
          Add Patient
        </button>
      </div>

      <section className="care-card">
        <div className="care-list-toolbar">
          <label className="care-search-box">
            <Search size={19} />

            <input
              type="search"
              placeholder="Search by patient name, ID or condition..."
              value={search}
              onChange={(event) => setSearch(event.target.value)}
            />
          </label>

          <span className="care-result-count">
            <Users size={17} />
            {filteredPatients.length} patients
          </span>
        </div>

        <div className="care-patient-list">
          {filteredPatients.map((patient) => (
            <div className="care-patient-list-row" key={patient.id}>
              <div
                className={`care-patient-avatar avatar-${patient.color}`}
              >
                {patient.initials}
              </div>

              <div className="care-list-patient-main">
                <strong>{patient.name}</strong>
                <small>
                  {patient.age} years · ID: {patient.id}
                </small>
              </div>

              <span
                className={`care-mood-pill mood-${patient.moodClass}`}
              >
                {patient.mood}
              </span>

              <span className="care-patient-condition">
                {patient.condition}
              </span>

              <span className="care-patient-active">
                <Clock3 size={14} />
                {patient.active}
              </span>

              <button
                className="care-list-arrow"
                aria-label={`View ${patient.name}`}
                onClick={() =>
                  navigate(`/dashboard/patient/${patient.id}`)
                }
              >
                <ArrowRight size={19} />
              </button>
            </div>
          ))}

          {filteredPatients.length === 0 && (
            <p className="care-empty-state">
              No patients found. Try another name or patient ID.
            </p>
          )}
        </div>
      </section>

      <button
        className="care-back-link"
        onClick={() => navigate("/dashboard")}
      >
        <ArrowLeft size={16} />
        Back to Dashboard
      </button>
    </div>
  );
}
