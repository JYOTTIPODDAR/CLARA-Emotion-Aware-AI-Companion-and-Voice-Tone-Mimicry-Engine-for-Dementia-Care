import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Mail, Lock, User, Heart, Eye, EyeOff } from "lucide-react";
import "./Auth.css";

export default function Signup() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [accepted, setAccepted] = useState(false);
  const [error, setError] = useState("");

  function handleSubmit(event) {
    event.preventDefault();
    setError("");

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

    // Demo navigation only; account creation needs the backend.
    navigate("/login");
  }

  return (
    <main className="auth-page">
      <div className="auth-shell">
        <section className="auth-side">
          <Link to="/" className="auth-brand">
            <span className="auth-brand-icon"><Heart /></span>
            <span>
              <strong>CLARA</strong>
              <small>AI Companion for Dementia Care</small>
            </span>
          </Link>

          <div className="auth-side-copy">
            <span className="auth-eyebrow">CAREGIVER PORTAL</span>
            <h1>Join Clara as a <span>Caregiver.</span></h1>
            <p>
              Create your caregiver account to organize patient details,
              preferences and supportive conversations.
            </p>

            <ul className="auth-benefits">
              <li><span className="auth-check">✓</span> Personalized patient support</li>
              <li><span className="auth-check">✓</span> Manage care preferences</li>
              <li><span className="auth-check">✓</span> Review conversations</li>
              <li><span className="auth-check">✓</span> Keep track of configured alerts</li>
            </ul>
          </div>

          <div className="auth-illustration">
            <div className="auth-emoji">🤖 💜</div>
            <p>Built with care for caregivers.</p>
          </div>

          <div className="auth-side-footer">Every caring moment matters.</div>
        </section>

        <section className="auth-form-panel">
          <form className="auth-form" onSubmit={handleSubmit}>
            <h2>Caregiver Sign Up</h2>
            <p>Create your account to get started.</p>

            {error && <div className="auth-error">{error}</div>}

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
                  onClick={() => setShowPassword(!showPassword)}
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
                  onChange={(event) => setConfirmPassword(event.target.value)}
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
              Create Account
            </button>

            <div className="auth-divider">OR</div>

            <p className="auth-switch">
              Already have an account? <Link to="/login">Login</Link>
            </p>

            <p className="auth-switch">
              <Link to="/">← Back to home</Link>
            </p>
          </form>
        </section>
      </div>
    </main>
  );
}
