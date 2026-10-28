
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Mail,
  Lock,
  Heart,
  Eye,
  EyeOff,
  UserRound,
  Stethoscope,
  ArrowLeft,
} from "lucide-react";
import "./Auth.css";

export default function Login() {
  const navigate = useNavigate();

  const [selectedRole, setSelectedRole] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  function handleRoleSelect(role) {
    setSelectedRole(role);
    setEmail("");
    setPassword("");
    setError("");
  }

  function handleSubmit(event) {
    event.preventDefault();
    setError("");

    const normalizedEmail = email.trim().toLowerCase();

    if (!normalizedEmail || !password) {
      setError("Please enter your email and password.");
      return;
    }

    // Patient login: match the patient account created by the caregiver.
    if (selectedRole === "patient") {
      let patients = [];

      try {
        patients = JSON.parse(
          localStorage.getItem("clara_demo_patients") || "[]"
        );
      } catch {
        setError("Unable to read patient records. Please try again.");
        return;
      }

      const patient = patients.find(
        (item) =>
          item.email?.trim().toLowerCase() === normalizedEmail &&
          item.password === password
      );

      if (!patient) {
        setError("Invalid patient email or password.");
        return;
      }

      localStorage.setItem("clara_logged_in", "true");
      localStorage.setItem("clara_user_role", "patient");
      localStorage.setItem("clara_patient_id", patient.id);

      navigate("/patient-dashboard");
      return;
    }

    // Caregiver login: demo navigation only.
    // Real caregiver credential verification must be implemented in the backend.
    if (selectedRole === "caregiver") {
      localStorage.setItem("clara_logged_in", "true");
      localStorage.setItem("clara_user_role", "caregiver");
      localStorage.removeItem("clara_patient_id");

      navigate("/dashboard");
      return;
    }

    setError("Please select your role first.");
  }

  return (
    <main className="auth-page">
      <div className="auth-shell">
        <section className="auth-side">
          <Link to="/" className="auth-brand">
            <span className="auth-brand-icon">
              <Heart />
            </span>

            <span>
              <strong>CLARA</strong>
              <small>AI Companion for Dementia Care</small>
            </span>
          </Link>

          <div className="auth-side-copy">
            <span className="auth-eyebrow">CLARA PORTAL</span>

            <h1>
              Care That <span>Understands.</span>
            </h1>

            <p>
              A caring companion designed to support patients and caregivers
              with personalized assistance.
            </p>

            <ul className="auth-benefits">
              <li>
                <span className="auth-check">✓</span>
                Personalized patient support
              </li>
              <li>
                <span className="auth-check">✓</span>
                Caregiver dashboard and patient profiles
              </li>
              <li>
                <span className="auth-check">✓</span>
                Memory preferences and conversations
              </li>
              <li>
                <span className="auth-check">✓</span>
                A more supportive care experience
              </li>
            </ul>
          </div>

          <div className="auth-illustration">
            <div className="auth-emoji">💜 🤖</div>
            <p>Your care makes a difference.</p>
          </div>

          <div className="auth-side-footer">
            Made with care for patients and caregivers.
          </div>
        </section>

        <section className="auth-form-panel">
          <div className="auth-form">
            {!selectedRole ? (
              <>
                <h2>Welcome to CLARA</h2>
                <p>Please select your role to continue.</p>

                <div className="role-options">
                  <button
                    type="button"
                    className="role-card"
                    onClick={() => handleRoleSelect("caregiver")}
                  >
                    <Stethoscope size={30} />
                    <strong>Caregiver</strong>
                    <span>Manage patient care and preferences</span>
                  </button>

                  <button
                    type="button"
                    className="role-card"
                    onClick={() => handleRoleSelect("patient")}
                  >
                    <UserRound size={30} />
                    <strong>Patient</strong>
                    <span>Access your personal companion</span>
                  </button>
                </div>

                <div className="auth-divider">OR</div>

                <p className="auth-switch">
                  New caregiver? <Link to="/signup">Create an account</Link>
                </p>

                <p className="auth-switch">
                  <Link to="/">← Back to home</Link>
                </p>
              </>
            ) : (
              <>
                <button
                  type="button"
                  className="role-back-button"
                  onClick={() => handleRoleSelect("")}
                >
                  <ArrowLeft size={16} />
                  Change role
                </button>

                <h2>
                  {selectedRole === "caregiver"
                    ? "Caregiver Login"
                    : "Patient Login"}
                </h2>

                <p>
                  {selectedRole === "caregiver"
                    ? "Enter your details to access the caregiver dashboard."
                    : "Enter the email and password provided by your caregiver."}
                </p>

                {error && (
                  <div className="auth-error" role="alert">
                    {error}
                  </div>
                )}

                <form onSubmit={handleSubmit}>
                  <div className="auth-field">
                    <label htmlFor="login-email">Email Address</label>

                    <div className="auth-input-wrap">
                      <Mail />

                      <input
                        id="login-email"
                        type="email"
                        placeholder="Enter your email address"
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                        autoComplete="email"
                        required
                      />
                    </div>
                  </div>

                  <div className="auth-field">
                    <label htmlFor="login-password">Password</label>

                    <div className="auth-input-wrap">
                      <Lock />

                      <input
                        id="login-password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter your password"
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                        autoComplete="current-password"
                        required
                      />

                      <button
                        type="button"
                        className="auth-eye"
                        onClick={() =>
                          setShowPassword((previous) => !previous)
                        }
                        aria-label={
                          showPassword ? "Hide password" : "Show password"
                        }
                      >
                        {showPassword ? <EyeOff /> : <Eye />}
                      </button>
                    </div>
                  </div>

                  <button type="submit" className="auth-submit">
                    Login as{" "}
                    {selectedRole === "caregiver" ? "Caregiver" : "Patient"}
                  </button>
                </form>

                {selectedRole === "caregiver" ? (
                  <p className="auth-switch">
                    Don't have a caregiver account?{" "}
                    <Link to="/signup">Sign Up</Link>
                  </p>
                ) : (
                  <p className="auth-switch">
                    Need a patient account? Please contact your caregiver.
                  </p>
                )}

                <p className="auth-switch">
                  <Link to="/">← Back to home</Link>
                </p>
              </>
            )}
          </div>
        </section>
      </div>
    </main>
  );
}
