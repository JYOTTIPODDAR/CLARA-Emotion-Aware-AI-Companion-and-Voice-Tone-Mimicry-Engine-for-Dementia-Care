import { Link } from "react-router-dom";
import { ArrowRight, Heart, Mic, ShieldCheck } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="hero" id="home">
      <div className="hero-copy">
        <span className="eyebrow">A KINDER, CALMER TOMORROW</span>

        <h1>
          Compassionate Support
          <br />
          for Patients. <span>Respite for Caregivers.</span>
        </h1>

        <p>
          Meet CLARA, an AI-powered voice companion designed to offer
          patient, reassuring conversations for people living with dementia
          while helping caregivers stay informed.
        </p>

        <div className="hero-buttons">
          <Link to="/login" className="btn btn-primary">
            Caregiver Login <ArrowRight size={16} />
          </Link>

          <Link to="/signup" className="btn btn-outline">
            Create an Account
          </Link>
        </div>

        <small className="trust">
          <ShieldCheck size={15} />
          Privacy-conscious design. Built with care.
        </small>
      </div>

      <div className="hero-art">
        <div className="hero-orb">
          <div className="robot">🤖</div>
          <span>Meet Clara</span>
          <small>Your caring companion</small>
        </div>

        <div className="float-card card-one">
          <Heart size={18} />
          <span>
            <b>I'm here with you.</b>
            <small>Calm, friendly conversation</small>
          </span>
        </div>

        <div className="float-card card-two">
          <Mic size={19} />
          <span>
            <b>Voice-first support</b>
            <small>Designed to feel simple</small>
          </span>
        </div>
      </div>
    </section>
  );
}