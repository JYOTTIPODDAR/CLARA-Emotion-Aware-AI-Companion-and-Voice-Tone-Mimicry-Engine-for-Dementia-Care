import { Link } from "react-router-dom";
import {
  ShieldCheck,
  HeartHandshake,
  Settings,
  Sprout,
  ArrowRight
} from "lucide-react";

const points = [
  {
    Icon: HeartHandshake,
    title: "Patient-centred",
    description: "Keep comfort and dignity at the heart of the experience."
  },
  {
    Icon: ShieldCheck,
    title: "Privacy aware",
    description: "Patient information needs appropriate access controls."
  },
  {
    Icon: Settings,
    title: "Caregiver control",
    description: "Manage preferences and familiar topics."
  },
  {
    Icon: Sprout,
    title: "Everyday support",
    description: "Encourage gentle and familiar activities."
  }
];

export default function AboutClara() {
  return (
    <>
      <section className="about" id="about">
        <div className="about-copy">
          <span className="eyebrow">ABOUT CLARA</span>

          <h2>Technology with a more human touch.</h2>

          <p>
            CLARA supports everyday conversations and helps caregivers
            organize patient preferences, interaction history and reminders.
          </p>

          <p>
            It is a supportive tool, not a medical diagnostic system
            or an emergency service.
          </p>

          <Link to="/signup" className="btn btn-outline">
            Get Started <ArrowRight size={15} />
          </Link>
        </div>

        <div className="about-illustration">
          <span>💜</span>
          <h3>Care, connection, reassurance.</h3>
          <p>Small moments can mean so much.</p>
        </div>

        <div className="about-points">
          {points.map(({ Icon, title, description }) => (
            <article key={title}>
              <span><Icon size={20} /></span>
              <div>
                <b>{title}</b>
                <p>{description}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="care-cta" id="caregivers">
        <div>
          <span className="eyebrow">FOR CAREGIVERS</span>
          <h2>You care for them. Clara helps support you.</h2>
          <p>
            Explore CLARA's caregiver experience and personalization tools.
          </p>
        </div>

        <Link to="/signup" className="btn btn-primary">
          Get Started <ArrowRight size={16} />
        </Link>
      </section>
    </>
  );
}