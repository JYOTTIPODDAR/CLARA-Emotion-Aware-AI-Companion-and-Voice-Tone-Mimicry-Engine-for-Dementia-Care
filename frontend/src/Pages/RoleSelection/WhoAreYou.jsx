
import { useNavigate } from "react-router-dom";
import { Heart, ArrowRight, ArrowLeft } from "lucide-react";
import "./WhoAreYou.css";

import caregiverImage from "../../assets/caregiver-illustration.png";
import patientImage from "../../assets/patient-illustration.png";

export default function WhoAreYou() {
  const navigate = useNavigate();

  return (
    <main className="role-page">
      <div className="role-decoration role-decoration-left" />
      <div className="role-decoration role-decoration-right" />

      <button
        className="role-back"
        onClick={() => navigate("/")}
        aria-label="Go back to home"
      >
        <ArrowLeft size={25} />
      </button>

      <header className="role-brand">
        <div className="role-logo">
          <Heart size={48} strokeWidth={1.8} />
          <span>☺</span>
        </div>

        <div>
          <h1>Clara</h1>
          <p>A Familiar Voice, A Calmer Day</p>
        </div>
      </header>

      <section className="role-content">
        <div className="role-heading">
          <h2>Who are you?</h2>
          <p>Choose your role to continue</p>
        </div>

        <div className="role-cards">
          {/* Caregiver Card */}
          <article className="role-card caregiver-card">
            <div className="role-art caregiver-art">
              <img
                src={caregiverImage}
                alt="Caregiver supporting an elderly woman"
                className="role-person-image"
              />

              <span className="floating-heart heart-one">♥</span>
              <span className="floating-heart heart-two">♥</span>
              <span className="plant plant-one">❧</span>
            </div>

            <h3>I am a Caregiver</h3>

            <p className="role-description">
              I want to create an account,
              <br />
              manage care and monitor
              <br />
              my loved one.
            </p>

            <button
              className="role-continue caregiver-continue"
              onClick={() =>
                navigate("/authentication/caregiver-choice")
              }
            >
              Continue <ArrowRight size={25} />
            </button>
          </article>

          {/* Patient Card */}
          <article className="role-card patient-card">
           <div className="role-art patient-art">
            <img
                src={patientImage}
                alt="Elderly patient smiling with Clara companion robot"
                className="role-person-image"
            />

              <span className="floating-heart heart-three">♥</span>
              <span className="floating-heart heart-four">♥</span>
              <span className="plant plant-two">❧</span>
            </div>

            <h3>I am a Patient</h3>

            <p className="role-description">
              I already have an account
              <br />
              provided by my caregiver.
            </p>

            <button
              className="role-continue patient-continue"
             onClick={() => navigate("/authentication/patient")}
            >
              Continue <ArrowRight size={25} />
            </button>
          </article>
        </div>
      </section>

      <div className="role-bottom-decoration" />
    </main>
  );
}
