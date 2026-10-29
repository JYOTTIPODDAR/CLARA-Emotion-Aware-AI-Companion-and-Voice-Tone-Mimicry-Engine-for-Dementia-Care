
import { useNavigate } from "react-router-dom";
import {
  Heart,
  ArrowLeft,
  ArrowRight,
  UserRoundPlus,
  LogIn,
} from "lucide-react";
import "./CaregiverChoice.css";

export default function CaregiverChoice() {
  const navigate = useNavigate();

  return (
    <main className="caregiver-choice-page">
      <div className="choice-panel">
        {/* Decorative background */}
        <div className="choice-top-shape" />
        <div className="choice-bottom-wave" />
        <div className="choice-leaves choice-leaves-top">❧</div>
        <div className="choice-plant">🌿</div>
        <div className="choice-heart">♥</div>

        {/* Back button */}
        <button
          className="choice-back"
          onClick={() => navigate("/role")}
          aria-label="Go back"
        >
          <ArrowLeft size={28} />
        </button>

        {/* Clara branding */}
        <header className="choice-brand">
          <div className="choice-logo">
            <Heart size={54} strokeWidth={1.8} />
            <span>☺</span>
          </div>

          <div className="choice-brand-text">
            <h1>Clara</h1>
            <p>A Familiar Voice, A Calmer Day</p>
          </div>
        </header>

        {/* Heading */}
        <section className="choice-content">
          <div className="choice-heading">
            <h2>Caregiver</h2>
            <p>How would you like to continue?</p>
          </div>

          {/* Sign Up and Login cards */}
          <div className="choice-cards">
            <article className="choice-card choice-signup-card">
              <div className="choice-icon signup-icon">
                <UserRoundPlus size={72} strokeWidth={2.4} />
              </div>

              <h3>Sign Up</h3>
              <p>
                Create a new account
                <br />
                to get started
              </p>

              <button
                className="choice-action signup-action"
                onClick={() => navigate("/authentication/caregiver-signup")}
              >
                <span>Sign Up</span>
                <ArrowRight size={30} />
              </button>
            </article>

            <article className="choice-card choice-login-card">
              <div className="choice-icon login-icon">
                <LogIn size={72} strokeWidth={2.4} />
              </div>

              <h3>Login</h3>
              <p>
                Already have an account?
                <br />
                Sign in here
              </p>

              <button
                className="choice-action login-action"
                onClick={() => navigate("/authentication/caregiver-login")}
              >
                <span>Login</span>
                <ArrowRight size={30} />
              </button>
            </article>
          </div>
        </section>
      </div>
    </main>
  );
}
