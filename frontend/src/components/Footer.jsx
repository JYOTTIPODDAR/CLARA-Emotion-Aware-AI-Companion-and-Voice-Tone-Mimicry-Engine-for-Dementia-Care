import { Heart } from "lucide-react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="footer" id="contact">
      <Link to="/" className="brand">
        <span className="brand-icon">
          <Heart fill="currentColor" />
        </span>

        <span>
          <b>CLARA</b>
          <small>AI Companion for Dementia Care</small>
        </span>
      </Link>

      <p>Compassionate support for patients and caregivers.</p>

      <small>© {new Date().getFullYear()} CLARA. Prototype.</small>
    </footer>
  );
}