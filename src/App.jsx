import './App.css'

function App() {
  return (
    <div className="clara">

      {/* Navbar */}
      <nav className="navbar">
        <a href="#home" className="logo">
          CLARA<span>.</span>
        </a>

        <div className="nav-links">
          <a href="#home">Home</a>
          <a href="#how">How Clara Helps</a>
          <a href="#features">Features</a>
          <a href="#about">About Us</a>
        </div>

        <a href="/login" className="nav-button">
          Caregiver Login
        </a>
      </nav>

      {/* Hero Section */}
      <section className="hero" id="home">
        <div className="hero-content">
          <p className="eyebrow">CARE WITH COMPASSION</p>

          <h1>
            Compassionate Support for Patients.
            <span> Respite for Caregivers.</span>
          </h1>

          <p className="description">
            Clara is an AI-powered companion designed to support
            people living with dementia and help caregivers feel
            more supported in their daily care journey.
          </p>

          <div className="hero-buttons">
            <a href="/signup" className="primary-button">
              Get Started →
            </a>

            <a href="#how" className="secondary-button">
              Discover Clara
            </a>
          </div>

          <p className="trust-text">
            More comfort. More connection. More care.
          </p>
        </div>

        <div className="hero-visual">
          <div className="visual-circle"></div>

          <div className="visual-card">
            <div className="heart">♡</div>
            <h3>You are not alone.</h3>
            <p>
              A caring companion for moments that matter.
            </p>
          </div>
        </div>
      </section>

      {/* How Clara Helps */}
      <section className="how-section" id="how">
        <p className="eyebrow">HOW CLARA HELPS</p>

        <h2>Care that understands your needs.</h2>

        <p>
          Clara aims to provide reassuring conversations,
          familiar memories and simple interactions for
          people living with dementia.
        </p>
      </section>

      {/* Features */}
      <section className="features" id="features">
        <p className="eyebrow">OUR FEATURES</p>

        <h2>Support for patients and caregivers.</h2>

        <div className="feature-grid">
          <article className="feature-card">
            <div className="feature-icon">♡</div>
            <h3>Emotional Support</h3>
            <p>
              Gentle conversations designed to help patients
              feel comfortable and reassured.
            </p>
          </article>

          <article className="feature-card">
            <div className="feature-icon">◉</div>
            <h3>Voice Companion</h3>
            <p>
              A simple voice-first experience for natural
              and accessible interaction.
            </p>
          </article>

          <article className="feature-card">
            <div className="feature-icon">⌂</div>
            <h3>Caregiver Dashboard</h3>
            <p>
              A dedicated space to manage patient information,
              preferences and care settings.
            </p>
          </article>
        </div>
      </section>

      {/* About */}
      <section className="about" id="about">
        <p className="eyebrow">ABOUT CLARA</p>

        <h2>Technology with a caring heart.</h2>

        <p>
          Clara brings together AI technology and personalized
          care to support patients and caregivers. It is designed
          to complement human care, not replace professional
          medical advice or human support.
        </p>
      </section>

      {/* Call to Action */}
      <section className="caregiver">
        <h2>Begin your journey with Clara.</h2>

        <p>
          Join us in building a more supportive care experience.
        </p>

        <a href="/signup" className="primary-button">
          Join Clara →
        </a>
      </section>

      {/* Footer */}
      <footer className="footer">
        <a href="#home" className="logo">
          CLARA<span>.</span>
        </a>

        <p>Compassion in every conversation.</p>

        <p>© 2026 Clara. All rights reserved.</p>
      </footer>

    </div>
  )
}

export default App