import { Link } from "react-router-dom";
import {
Heart, Users, ShieldCheck, MessageCircle, Image,
Leaf, House, Bell, Smile, ArrowRight, Menu
} from "lucide-react";
import "./LandingPage.css";
import claraHero from "../../assets/clara-hero.png";

const features = [
{ icon: MessageCircle, title: "Familiar Conversations", text: "Talks in a warm, comforting and personalized way." },
{ icon: Users, title: "Emotion Awareness", text: "Recognizes signs of anxiety, confusion or distress." },
{ icon: Image, title: "Memory Support", text: "Brings back cherished memories and stories." },
{ icon: Heart, title: "Caregiver Relief", text: "Keeps you informed and supported." }
];

const steps = [
["👩🏻‍⚕️", "Caregiver Sets It Up", "Adds patient details, memories and preferences."],
["🤖", "Clara Learns & Personalizes", "Understands the person's voice, interests and history."],
["👵🏻", "Meaningful Conversations", "Clara listens and provides comfort in real time."],
["📊", "Ongoing Support", "Caregivers receive insights and alerts when needed."]
];

const benefits = [
{ icon: Leaf, title: "Reduces Anxiety", text: "Reassuring responses during moments of stress." },
{ icon: Users, title: "Encourages Engagement", text: "Keeps patients mentally active and connected." },
{ icon: House, title: "Builds Familiarity", text: "Uses personal memories and loved ones' voices." },
{ icon: Bell, title: "Timely Alerts", text: "Notifies caregivers about configured alerts." }
];

export default function LandingPage() {
return ( <main className="clara-landing" id="home"> <header className="clara-nav"> <a className="clara-brand" href="#home"> <span className="brand-mark"><Heart /><Smile /></span> <span><strong>Clara</strong><small>A Familiar Voice, A Calmer Day</small></span> </a>

```
    <nav className="clara-nav-links">
      <a className="active" href="#home">Home</a>
      <a href="#about">About</a>
      <a href="#features">Features</a>
      <a href="#how-it-works">How It Works</a>
      <a href="#faqs">FAQs</a>
    </nav>

    <Link to="/role" className="clara-button">
        Get Started <ArrowRight size={18} />
        </Link>
    <a href="#features" className="mobile-menu" aria-label="Go to features"><Menu /></a>
  </header>

  <section className="clara-hero">
    <div className="hero-content">
      <span className="hero-badge"><Heart size={15} fill="currentColor" /> AI Companion for Dementia & Alzheimer's Care</span>
      <h1>Compassionate Care, <span>Always Within Reach</span></h1>
      <p>
        Clara is an emotion-aware conversational companion that supports
        dementia and Alzheimer's patients with familiar, personalized
        conversations — giving caregivers the respite they deserve.
      </p>
      <Link to="/role" className="clara-button hero-cta">
        Get Started <ArrowRight size={19} />
      </Link>

      <div className="hero-trust">
        <div><span className="trust-icon pink"><Heart /></span><span><b>Calms Anxiety</b><small>with familiar voice</small></span></div>
        <div><span className="trust-icon purple"><Users /></span><span><b>Supports</b><small>Caregivers</small></span></div>
        <div><span className="trust-icon blue"><ShieldCheck /></span><span><b>Safe, Ethical</b><small>and Reliable</small></span></div>
      </div>
    </div>

    <div className="hero-visual">
      <img
        className="hero-image"
        src={claraHero}
        alt="Warm, caring companion"
        />
      <div className="hero-image-tint" />
      /*<div className="hero-robot">*/
        <div className="robot-antenna" />
        <div className="robot-screen"><span>⌣</span><span>⌣</span><i>•</i><b>•</b></div>
        <div className="robot-body"><Heart fill="currentColor" /></div>
      </div>
      {/* <div className="hero-speech">I'm always<br />here with you. 💗</div> */}
      <span className="decor-heart heart-a">♡</span>
      <span className="decor-heart heart-b">♥</span>
    </div>
  </section>

  <section className="clara-features" id="features">
    {features.map(({ icon: Icon, title, text }, index) => (
      <article className="feature-card" key={title}>
        <span className={`feature-icon feature-${index}`}><Icon /></span>
        <h3>{title}</h3>
        <p>{text}</p>
      </article>
    ))}
  </section>

  <section className="clara-steps section-container" id="how-it-works">
    <div className="clara-section-heading">
      <span>HOW IT WORKS</span>
      <h2>Simple Steps for a <em>Brighter Day</em></h2>
      <p>Clara makes everyday care easier and more meaningful.</p>
    </div>
    <div className="steps-grid">
      {steps.map(([emoji, title, text], index) => (
        <article className="process-card" key={title}>
          <span className="process-number">{index + 1}</span>
          <div className="process-illustration">{emoji}</div>
          <h3>{title}</h3>
          <p>{text}</p>
          {index < 3 && <ArrowRight className="process-arrow" />}
        </article>
      ))}
    </div>
  </section>

  <section className="clara-benefits section-container" id="about">
    <div className="benefits-intro">
      <span className="mini-label">KEY BENEFITS</span>
      <h2>A Safer, Calmer and <em>Happier Life</em></h2>
      <p>Clara is designed to bring comfort to patients and confidence to caregivers — every day.</p>
    </div>
    <div className="benefits-grid">
      {benefits.map(({ icon: Icon, title, text }, index) => (
        <article className="benefit-card" key={title}>
          <span className={`benefit-icon benefit-${index}`}><Icon /></span>
          <div><h3>{title}</h3><p>{text}</p></div>
        </article>
      ))}
    </div>
  </section>

  <section className="clara-impact section-container">
    <div className="clara-section-heading">
      <span>MAKING A REAL DIFFERENCE</span>
      <h2>Trusted by Families and Care Teams</h2>
    </div>
    <div className="impact-grid">
      <article><Users /><div><strong>Personalized</strong><p>Support for every family</p></div></article>
      <article><Smile /><div><strong>More Comfort</strong><p>Gentle conversations</p></div></article>
      <article><ShieldCheck /><div><strong>Ongoing Support</strong><p>Designed for daily care</p></div></article>
      <article><House /><div><strong>Home & Care Teams</strong><p>Flexible care experiences</p></div></article>
    </div>
  </section>

  <section className="clara-testimonials section-container">
    <span className="mini-label">WHAT FAMILIES SAY</span>
    <div className="testimonial-grid">
      <article className="testimonial-card">
        <div className="testimonial-avatar">💗</div>
        <div><p>"A caring companion that helps make everyday moments feel warmer and more personal."</p><strong>— A Caregiver</strong></div>
      </article>
      <article className="testimonial-card">
        <div className="testimonial-avatar">💜</div>
        <div><p>"Having a friendly voice to talk to makes the experience feel more comforting."</p><strong>— A Patient</strong></div>
      </article>
    </div>
    <p className="testimonial-note">Every conversation can be a brighter day ♡</p>
  </section>

  <section className="clara-final-cta" id="faqs">
    <h2>Let's Create Brighter Days Together</h2>
    <p>Take the first step towards compassionate, AI-powered care.</p>
    <Link to="/role" className="clara-button">
      Get Started <ArrowRight size={18} />
    </Link>
  </section>

  <footer className="clara-footer">
    <a className="clara-brand" href="#home">
      <span className="brand-mark"><Heart /><Smile /></span>
      <span><strong>Clara</strong><small>A Familiar Voice, A Calmer Day</small></span>
    </a>
    <p>Made with 💜 for more compassionate care.</p>
  </footer>
</main>
);
}