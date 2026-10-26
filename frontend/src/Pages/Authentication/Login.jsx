
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Mail, Lock, Heart, Eye, EyeOff } from "lucide-react";
import "./Auth.css";

export default function Login() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  // function handleSubmit(event) {
  //   event.preventDefault();
  //   setError("");

  //   if (!email.trim() || !password) {
  //     setError("Please enter your email and password.");
  //     return;
  //   }

  //   // Demo navigation only; real authentication needs the backend.
  //   navigate("/dashboard");
  // }

function handleSubmit(event) {
  event.preventDefault();
  setError("");

  if (!email.trim() || !password) {
    setError("Please enter your email and password.");
    return;
  }

  // Demo only: this does NOT verify credentials.
  localStorage.setItem("clara_logged_in", "true");
  navigate("/dashboard");
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
            <h1>Welcome Back, <span>Caregiver.</span></h1>
            <p>
              Sign in to access patient information, review conversations
              and manage personalized care preferences.
            </p>

            <ul className="auth-benefits">
              <li><span className="auth-check">✓</span> Access your caregiver dashboard</li>
              <li><span className="auth-check">✓</span> Manage patient information</li>
              <li><span className="auth-check">✓</span> Review conversations and alerts</li>
              <li><span className="auth-check">✓</span> Configure patient preferences</li>
            </ul>
          </div>

          <div className="auth-illustration">
            <div className="auth-emoji">💜 🤖</div>
            <p>Your care makes a difference.</p>
          </div>

          <div className="auth-side-footer">Made with care for caregivers.</div>
        </section>

        <section className="auth-form-panel">
          <form className="auth-form" onSubmit={handleSubmit}>
            <h2>Caregiver Login</h2>
            <p>Welcome back! Enter your details to continue.</p>

            {error && <div className="auth-error">{error}</div>}

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
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label="Toggle password visibility"
                >
                  {showPassword ? <EyeOff /> : <Eye />}
                </button>
              </div>
            </div>

            <div className="auth-options">
              <label className="auth-remember">
                <input type="checkbox" /> Remember me
              </label>
              <Link to="/login" className="auth-link">
                Forgot password?
              </Link>
            </div>

            <button type="submit" className="auth-submit">
              Login
            </button>

            <div className="auth-divider">OR</div>

            <p className="auth-switch">
              Don't have an account? <Link to="/signup">Sign Up</Link>
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
