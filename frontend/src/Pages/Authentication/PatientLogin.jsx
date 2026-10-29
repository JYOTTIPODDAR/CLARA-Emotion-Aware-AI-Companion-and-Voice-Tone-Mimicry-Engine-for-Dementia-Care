
// PatientLogin.jsx

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Heart,
  ArrowLeft,
  UserRound,
  LockKeyhole,
  Eye,
  EyeOff,
  ArrowRight,
  Info,
} from "lucide-react";

import patientImage from "../../assets/patient-illustration.png";
import "./PatientLogin.css";

export default function PatientLogin() {
  const navigate = useNavigate();

  const [patientId, setPatientId] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();

    if (!patientId.trim() || !password) {
      alert("Please enter your Patient ID and password.");
      return;
    }

    // Frontend-only demo login
    localStorage.setItem("role", "patient");

    // Open Patient Dashboard
    navigate("/patient-dashboard");
  };

  return (
    <main className="patient-login-page">
      <div className="patient-login-card">
        <button
          type="button"
          className="patient-back-button"
          onClick={() => navigate("/role")}
          aria-label="Go back"
        >
          <ArrowLeft size={23} />
        </button>

        <header className="patient-brand">
          <div className="patient-brand-icon">
            <Heart size={39} strokeWidth={1.8} />
            <span>☺</span>
          </div>

          <div>
            <h1>Clara</h1>
            <p>A Familiar Voice, A Calmer Day</p>
          </div>
        </header>

        <section className="patient-login-layout">
          <div className="patient-form-section">
            <h2>Patient Login</h2>

            <p className="patient-subtitle">
              Enter the ID and password provided
              <br className="desktop-break" /> by your caregiver.
            </p>

            <form onSubmit={handleLogin} className="patient-login-form">
              <label className="patient-input">
                <UserRound size={23} />

                <input
                  type="text"
                  placeholder="Patient ID"
                  value={patientId}
                  onChange={(e) => setPatientId(e.target.value)}
                  aria-label="Patient ID"
                  autoComplete="username"
                  required
                />
              </label>

              <label className="patient-input">
                <LockKeyhole size={23} />

                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  aria-label="Password"
                  autoComplete="current-password"
                  required
                />

                <button
                  type="button"
                  className="patient-password-toggle"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff size={22} /> : <Eye size={22} />}
                </button>
              </label>

              <button type="submit" className="patient-login-button">
                Login <ArrowRight size={24} />
              </button>
            </form>

            <div className="patient-info">
              <Info size={28} />
              <p>
                You do not need to create an account. Please use the ID and
                password given to you by your caregiver.
              </p>
            </div>
          </div>

          <div className="patient-visual">
            <div className="patient-image-glow" />
            <img
              src={patientImage}
              alt="An elderly woman smiling with her Clara companion robot"
            />
            <span className="patient-heart heart-a">♥</span>
            <span className="patient-heart heart-b">♥</span>
          </div>
        </section>

        <div className="patient-bottom-wave" />
      </div>
    </main>
  );
}
