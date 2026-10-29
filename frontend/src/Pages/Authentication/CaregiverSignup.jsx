
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Heart, ArrowLeft, ArrowRight, UserRoundPlus } from "lucide-react";
import "./CaregiverAuth.css";

export default function CaregiverSignup() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
    setSuccess("");
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    if (form.password.length < 8) {
      setError("Password must contain at least 8 characters.");
      return;
    }

    setError("");
    setSuccess("Form validated! Backend registration is not connected yet.");
  }

  return (
    <main className="care-auth-page">
      <button
        className="care-auth-back"
        onClick={() => navigate("/authentication/caregiver-choice")}
        aria-label="Go back"
      >
        <ArrowLeft size={21} />
      </button>

      <section className="care-auth-card">
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
          <div className="care-auth-icon">
            <UserRoundPlus size={27} />
          </div>
          <h2>Create Your Account</h2>
          <p>Join Clara and care for your loved one.</p>
        </div>

        <form className="care-auth-form" onSubmit={handleSubmit}>
          <label htmlFor="fullName">Full Name</label>
          <input
            id="fullName"
            name="fullName"
            type="text"
            placeholder="Enter your full name"
            value={form.fullName}
            onChange={handleChange}
            autoComplete="name"
            required
          />

          <label htmlFor="email">Email Address</label>
          <input
            id="email"
            name="email"
            type="email"
            placeholder="you@example.com"
            value={form.email}
            onChange={handleChange}
            autoComplete="email"
            required
          />

          <label htmlFor="phone">Phone Number</label>
          <input
            id="phone"
            name="phone"
            type="tel"
            placeholder="Enter your phone number"
            value={form.phone}
            onChange={handleChange}
            autoComplete="tel"
            pattern="[0-9]{10}"
            maxLength={10}
            title="Enter a 10-digit phone number"
            required
          />

          <label htmlFor="password">Password</label>
          <input
            id="password"
            name="password"
            type="password"
            placeholder="At least 8 characters"
            value={form.password}
            onChange={handleChange}
            autoComplete="new-password"
            minLength={8}
            required
          />

          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            placeholder="Re-enter your password"
            value={form.confirmPassword}
            onChange={handleChange}
            autoComplete="new-password"
            minLength={8}
            required
          />

          {error && <p className="care-auth-error">{error}</p>}
          {success && <p className="care-auth-success">{success}</p>}

          <button className="care-auth-submit" type="submit">
            Create Account <ArrowRight size={20} />
          </button>
        </form>

        <p className="care-auth-switch">
          Already have an account?{" "}
          <Link to="/authentication/caregiver-login">Login</Link>
        </p>

        <p className="care-auth-note">
          Your journey toward more compassionate care starts here.
        </p>
      </section>
    </main>
  );
}
