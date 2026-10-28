
import { useEffect, useState } from "react";
import {
  UserPlus,
  Users,
  Search,
  Pencil,
  Trash2,
  X,
  Mail,
  Lock,
  Languages,
  Calendar,
} from "lucide-react";
import "./PatientProfile.css";

const STORAGE_KEY = "clara_demo_patients";

const emptyForm = {
  name: "",
  email: "",
  password: "",
  age: "",
  language: "Hindi",
  notes: "",
};

export default function PatientProfile() {
  const [patients, setPatients] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
    } catch {
      return [];
    }
  });

  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [search, setSearch] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(patients));
    } catch {
      setError("Patient data could not be saved in this browser.");
    }
  }, [patients]);

  function openAddForm() {
    setForm(emptyForm);
    setEditingId(null);
    setError("");
    setSuccess("");
    setShowForm(true);
  }

  function openEditForm(patient) {
    setForm({
      name: patient.name || "",
      email: patient.email || "",
      password: patient.password || "",
      age: patient.age || "",
      language: patient.language || "Hindi",
      notes: patient.notes || "",
    });

    setEditingId(patient.id);
    setError("");
    setSuccess("");
    setShowForm(true);
  }

  function handleChange(event) {
    const { name, value } = event.target;
    setForm((previous) => ({ ...previous, [name]: value }));
  }

  function handleSubmit(event) {
    event.preventDefault();
    setError("");
    setSuccess("");

    const name = form.name.trim();
    const email = form.email.trim().toLowerCase();
    const password = form.password;

    if (!name || !email || !password) {
      setError("Please fill in the name, email and temporary password.");
      return;
    }

    if (password.length < 8) {
      setError("Temporary password must contain at least 8 characters.");
      return;
    }

    const duplicateEmail = patients.some(
      (patient) =>
        patient.email?.toLowerCase() === email &&
        patient.id !== editingId
    );

    if (duplicateEmail) {
      setError("A patient with this email already exists.");
      return;
    }

    const patientData = {
      id: editingId || crypto.randomUUID(),
      name,
      email,
      password,
      age: form.age,
      language: form.language,
      notes: form.notes.trim(),
    };

    if (editingId) {
      setPatients((previous) =>
        previous.map((patient) =>
          patient.id === editingId ? patientData : patient
        )
      );
      setSuccess("Patient details updated.");
    } else {
      setPatients((previous) => [...previous, patientData]);
      setSuccess("Patient added successfully.");
    }

    setShowForm(false);
    setForm(emptyForm);
    setEditingId(null);
  }

  function deletePatient(id) {
    const confirmed = window.confirm(
      "Are you sure you want to delete this patient?"
    );

    if (!confirmed) return;

    setPatients((previous) =>
      previous.filter((patient) => patient.id !== id)
    );

    setSuccess("Patient deleted.");
    setError("");
  }

  const filteredPatients = patients.filter((patient) =>
    `${patient.name || ""} ${patient.email || ""}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <section className="section-page patient-profile-page">
      <div className="patient-page-header">
        <div>
          <span className="patient-eyebrow">CARE MANAGEMENT</span>
          <h1>Patient Profiles</h1>
          <p>Manage patient information and login accounts.</p>
        </div>

        <button className="patient-primary-btn" onClick={openAddForm}>
          <UserPlus size={18} />
          Add Patient
        </button>
      </div>

      {success && (
        <div className="patient-success" role="status">
          {success}
          <button onClick={() => setSuccess("")} aria-label="Dismiss">
            <X size={16} />
          </button>
        </div>
      )}

      <div className="patient-stats-grid">
        <div className="patient-stat-card">
          <div className="patient-stat-icon">
            <Users size={22} />
          </div>
          <div>
            <span>Total Patients</span>
            <strong>{patients.length}</strong>
          </div>
        </div>

        <div className="patient-stat-card">
          <div className="patient-stat-icon">
            <UserPlus size={22} />
          </div>
          <div>
            <span>Patient Accounts</span>
            <strong>{patients.length}</strong>
          </div>
        </div>
      </div>

      <div className="patient-list-card">
        <div className="patient-list-header">
          <div>
            <h2>Your Patients</h2>
            <p>View and manage the profiles you have added.</p>
          </div>

          <div className="patient-search">
            <Search size={18} />
            <input
              type="search"
              placeholder="Search patients..."
              value={search}
              onChange={(event) => setSearch(event.target.value)}
            />
          </div>
        </div>

        {filteredPatients.length === 0 ? (
          <div className="patient-empty-state">
            <div className="patient-empty-icon">
              <Users size={30} />
            </div>

            <h3>
              {search ? "No matching patients" : "No patients added yet"}
            </h3>

            <p>
              {search
                ? "Try searching with a different name or email."
                : "Add your first patient to get started with CLARA."}
            </p>

            {!search && (
              <button className="patient-primary-btn" onClick={openAddForm}>
                <UserPlus size={18} />
                Add First Patient
              </button>
            )}
          </div>
        ) : (
          <div className="patient-table-wrap">
            <table className="patient-table">
              <thead>
                <tr>
                  <th>Patient</th>
                  <th>Age</th>
                  <th>Language</th>
                  <th>Login Email</th>
                  <th>Actions</th>
                </tr>
              </thead>

              <tbody>
                {filteredPatients.map((patient) => (
                  <tr key={patient.id}>
                    <td>
                      <div className="patient-name-cell">
                        <div className="patient-avatar">
                          {(patient.name || "?").charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <strong>{patient.name}</strong>
                          <span>Patient</span>
                        </div>
                      </div>
                    </td>

                    <td>{patient.age || "—"}</td>
                    <td>{patient.language || "Hindi"}</td>
                    <td>{patient.email}</td>

                    <td>
                      <div className="patient-actions">
                        <button
                          className="patient-icon-btn"
                          onClick={() => openEditForm(patient)}
                          title="Edit patient"
                          aria-label={`Edit ${patient.name}`}
                        >
                          <Pencil size={17} />
                        </button>

                        <button
                          className="patient-icon-btn patient-delete-btn"
                          onClick={() => deletePatient(patient.id)}
                          title="Delete patient"
                          aria-label={`Delete ${patient.name}`}
                        >
                          <Trash2 size={17} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {showForm && (
        <div
          className="patient-modal-overlay"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              setShowForm(false);
            }
          }}
        >
          <div
            className="patient-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="patient-form-title"
          >
            <div className="patient-modal-header">
              <div>
                <h2 id="patient-form-title">
                  {editingId ? "Edit Patient" : "Add New Patient"}
                </h2>
                <p>
                  Enter the patient's details and demo login credentials.
                </p>
              </div>

              <button
                className="patient-icon-btn"
                onClick={() => setShowForm(false)}
                aria-label="Close form"
              >
                <X size={21} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="patient-form">
              <label>
                Full Name *
                <span className="patient-input-wrap">
                  <Users size={18} />
                  <input
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Enter patient name"
                    required
                  />
                </span>
              </label>

              <div className="patient-form-row">
                <label>
                  Age
                  <span className="patient-input-wrap">
                    <Calendar size={18} />
                    <input
                      name="age"
                      type="number"
                      min="1"
                      max="120"
                      value={form.age}
                      onChange={handleChange}
                      placeholder="Age"
                    />
                  </span>
                </label>

                <label>
                  Preferred Language
                  <span className="patient-input-wrap">
                    <Languages size={18} />
                    <select
                      name="language"
                      value={form.language}
                      onChange={handleChange}
                    >
                      <option>Hindi</option>
                      <option>English</option>
                      <option>Bengali</option>
                      <option>Marathi</option>
                      <option>Tamil</option>
                      <option>Telugu</option>
                    </select>
                  </span>
                </label>
              </div>

              <label>
                Patient Login Email *
                <span className="patient-input-wrap">
                  <Mail size={18} />
                  <input
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="patient@example.com"
                    autoComplete="off"
                    required
                  />
                </span>
              </label>

              <label>
                Temporary Password *
                <span className="patient-input-wrap">
                  <Lock size={18} />
                  <input
                    name="password"
                    type="password"
                    value={form.password}
                    onChange={handleChange}
                    placeholder="At least 8 characters"
                    autoComplete="new-password"
                    minLength={8}
                    required
                  />
                </span>
              </label>

              <label>
                Care Notes
                <textarea
                  name="notes"
                  value={form.notes}
                  onChange={handleChange}
                  placeholder="Add relevant care preferences or notes..."
                  rows={3}
                />
              </label>

              {error && (
                <div className="patient-form-error" role="alert">
                  {error}
                </div>
              )}

              <div className="patient-form-note">
                Demo only: this version stores patient data in this browser.
                Do not enter real patient information or passwords.
              </div>

              <div className="patient-form-actions">
                <button
                  type="button"
                  className="patient-secondary-btn"
                  onClick={() => {
                    setShowForm(false);
                    setError("");
                  }}
                >
                  Cancel
                </button>

                <button type="submit" className="patient-primary-btn">
                  {editingId ? "Save Changes" : "Create Patient"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
}
