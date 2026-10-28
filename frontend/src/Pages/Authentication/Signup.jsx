import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Mail,
  Lock,
  User,
  Heart,
  Eye,
  EyeOff,
  Stethoscope,
  UserRound,
  ArrowLeft,
} from "lucide-react";
import "./Auth.css";

export default function Signup() {
  const navigate = useNavigate();

  const [selectedRole, setSelectedRole] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [accepted, setAccepted] = useState(false);
  const [error, setError] = useState("");

  function handleRoleSelect(role) {
    setSelectedRole(role);
    setError("");
  }

  function handleSubmit(event) {
    event.preventDefault();
    setError("");

    if (selectedRole !== "caregiver") {
      setError("Patient accounts must be created by a caregiver.");
      return;
    }

    if (!name.trim() || !email.trim()) {
      setError("Please enter your name and email address.");
      return;
    }

    if (password.length < 8) {
      setError("Password must contain at least 8 characters.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    if (!accepted) {
      setError("Please accept the Terms and Privacy Policy.");
      return;
    }

    // Frontend demo only: real account creation requires a backend.
    // No account is created or password saved at this stage.
    navigate("/login");
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
              Care Starts <span>With You.</span>
            </h1>

            <p>
              Join CLARA to support patients, manage care preferences
              and build a more personalized care experience.
            </p>

            <ul className="auth-benefits">
              <li>
                <span className="auth-check">✓</span>
                Personalized patient support
              </li>
              <li>
                <span className="auth-check">✓</span>
                Manage care preferences
              </li>
              <li>
                <span className="auth-check">✓</span>
                Review conversations
              </li>
              <li>
                <span className="auth-check">✓</span>
                Keep track of configured alerts
              </li>
            </ul>
          </div>

          <div className="auth-illustration">
            <div className="auth-emoji">🤖 💜</div>
            <p>Built with care for patients and caregivers.</p>
          </div>

          <div className="auth-side-footer">
            Every caring moment matters.
          </div>
        </section>

        <section className="auth-form-panel">
          <div className="auth-form">
            {!selectedRole ? (
              <>
                <h2>Join CLARA</h2>
                <p>Select the type of account you need.</p>

                <div className="role-options">
                  <button
                    type="button"
                    className="role-card"
                    onClick={() => handleRoleSelect("caregiver")}
                  >
                    <Stethoscope size={30} />
                    <strong>Caregiver</strong>
                    <span>Create an account to manage patient care</span>
                  </button>

                  <button
                    type="button"
                    className="role-card"
                    onClick={() => handleRoleSelect("patient")}
                  >
                    <UserRound size={30} />
                    <strong>Patient</strong>
                    <span>
                      Patient accounts are created by caregivers
                    </span>
                  </button>
                </div>

                <div className="auth-divider">OR</div>

                <p className="auth-switch">
                  Already have an account? <Link to="/login">Login</Link>
                </p>

                <p className="auth-switch">
                  <Link to="/">← Back to home</Link>
                </p>
              </>
            ) : selectedRole === "patient" ? (
              <>
                <button
                  type="button"
                  className="role-back-button"
                  onClick={() => handleRoleSelect("")}
                >
                  <ArrowLeft size={16} />
                  Change role
                </button>

                <div className="auth-role-message">
                  <UserRound size={38} />
                  <h2>Patient Account</h2>
                  <p>
                    Patient accounts cannot be created through public
                    signup. Please ask your caregiver to add your profile
                    and provide your login details.
                  </p>

                  <button
                    type="button"
                    className="auth-submit"
                    onClick={() => navigate("/login")}
                  >
                    Go to Login
                  </button>
                </div>
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

                <h2>Caregiver Sign Up</h2>
                <p>Create your account to get started.</p>

                {error && <div className="auth-error">{error}</div>}

                <form onSubmit={handleSubmit}>
                  <div className="auth-field">
                    <label htmlFor="signup-name">Full Name</label>
                    <div className="auth-input-wrap">
                      <User />
                      <input
                        id="signup-name"
                        type="text"
                        placeholder="Enter your full name"
                        value={name}
                        onChange={(event) => setName(event.target.value)}
                        autoComplete="name"
                        required
                      />
                    </div>
                  </div>

                  <div className="auth-field">
                    <label htmlFor="signup-email">Email Address</label>
                    <div className="auth-input-wrap">
                      <Mail />
                      <input
                        id="signup-email"
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
                    <label htmlFor="signup-password">Password</label>
                    <div className="auth-input-wrap">
                      <Lock />
                      <input
                        id="signup-password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Create a password (8+ characters)"
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                        autoComplete="new-password"
                        minLength={8}
                        required
                      />

                      <button
                        type="button"
                        className="auth-eye"
                        onClick={() =>
                          setShowPassword((previous) => !previous)
                        }
                        aria-label="Toggle password visibility"
                      >
                        {showPassword ? <EyeOff /> : <Eye />}
                      </button>
                    </div>
                  </div>

                  <div className="auth-field">
                    <label htmlFor="signup-confirm">Confirm Password</label>
                    <div className="auth-input-wrap">
                      <Lock />
                      <input
                        id="signup-confirm"
                        type={showPassword ? "text" : "password"}
                        placeholder="Confirm your password"
                        value={confirmPassword}
                        onChange={(event) =>
                          setConfirmPassword(event.target.value)
                        }
                        autoComplete="new-password"
                        required
                      />
                    </div>
                  </div>

                  <label className="auth-terms">
                    <input
                      type="checkbox"
                      checked={accepted}
                      onChange={(event) => setAccepted(event.target.checked)}
                    />
                    <span>
                      I agree to CLARA's <a href="#terms">Terms</a> and
                      <a href="#privacy"> Privacy Policy</a>.
                    </span>
                  </label>

                  <button type="submit" className="auth-submit">
                    Create Caregiver Account
                  </button>
                </form>

                <div className="auth-divider">OR</div>

                <p className="auth-switch">
                  Already have an account? <Link to="/login">Login</Link>
                </p>

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
