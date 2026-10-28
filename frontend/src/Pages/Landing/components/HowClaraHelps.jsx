import {
  Mic,
  Brain,
  MessageCircle,
  Bell
} from "lucide-react";

const steps = [
  {
    Icon: Mic,
    title: "Patient Speaks",
    description: "The patient shares a question or feeling."
  },
  {
    Icon: Brain,
    title: "Clara Understands",
    description: "The system processes the words and relevant context."
  },
  {
    Icon: MessageCircle,
    title: "Clara Responds",
    description: "A gentle, personalized response is prepared."
  },
  {
    Icon: Bell,
    title: "Caregiver Follows Up",
    description: "Configured reminders support caregiver awareness."
  }
];

export default function HowClaraHelps() {
  return (
    <section className="how-section" id="how-it-works">
      <div className="section-title">
        <span className="eyebrow">HOW IT WORKS</span>
        <h2>How Clara Helps</h2>
        <p>A simple flow designed around supportive conversation.</p>
      </div>

      <div className="steps">
        {steps.map(({ Icon, title, description }, index) => (
          <article key={title}>
            <span className="step-icon">
              <Icon size={23} />
            </span>

            <small>STEP 0{index + 1}</small>
            <h3>{title}</h3>
            <p>{description}</p>
          </article>
        ))}
      </div>
    </section>
  );
}