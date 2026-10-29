import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Heart, ArrowLeft, ArrowRight, LogIn } from "lucide-react";
import "./CaregiverAuth.css";

export default function CaregiverLogin() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    // Frontend-only demo login
    if (!email.trim() || !password) {
      setMessage("Please enter your email and password.");
      return;
    }

    // Save the logged-in user's role
    localStorage.setItem("role", "caregiver");

    // Open caregiver dashboard
    navigate("/dashboard");
  }

  return (
    <main className="care-auth-page">
      <button
        type="button"
        className="care-auth-back"
        onClick={() =>
          navigate("/authentication/caregiver-choice")
        }
        aria-label="Go back"
      >
        <ArrowLeft size={21} />
      </button>

      <section className="care-auth-card care-login-card">
        <header className="care-auth-brand">
          <div className="care-auth-logo">
            <Heart size={34} />
            <span>☺</span>
          </div>

          <div>
            <h1>Clara</h1>
            <p>A Familiar Voice, A Calmer Day</p>
          </div>
        </header>

        <div className="care-auth-heading">
          <div className="care-auth-icon care-login-icon">
            <LogIn size={27} />
          </div>

          <h2>Welcome Back!</h2>
          <p>Sign in to continue caring for your loved one.</p>
        </div>

        <form
          className="care-auth-form"
          onSubmit={handleSubmit}
        >
          <label htmlFor="loginEmail">Email Address</label>

          <input
            id="loginEmail"
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setMessage("");
            }}
            autoComplete="email"
            required
          />

          <label htmlFor="loginPassword">Password</label>

          <input
            id="loginPassword"
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setMessage("");
            }}
            autoComplete="current-password"
            required
          />

          {message && (
            <p className="care-auth-success">{message}</p>
          )}

          <button
            className="care-auth-submit care-login-submit"
            type="submit"
          >
            Login <ArrowRight size={20} />
          </button>
        </form>

        <p className="care-auth-switch">
          Don't have an account?{" "}
          <Link to="/authentication/caregiver-signup">
            Sign Up
          </Link>
        </p>

        <p className="care-auth-note">
          We're happy to have you back with Clara.
        </p>
      </section>
    </main>
  );
}
