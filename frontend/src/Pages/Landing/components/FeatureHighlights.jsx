import {
  Heart,
  Brain,
  BellRing,
  UsersRound
} from "lucide-react";

const features = [
  {
    Icon: Heart,
    title: "Emotional Support",
    description: "Gentle, reassuring conversations for everyday moments."
  },
  {
    Icon: Brain,
    title: "Patient Responses",
    description: "Patient and supportive responses to repeated questions."
  },
  {
    Icon: BellRing,
    title: "Caregiver Alerts",
    description: "Review configured reminders and follow-up suggestions."
  },
  {
    Icon: UsersRound,
    title: "Personalized Care",
    description: "Caregiver-managed memories and patient preferences."
  }
];

export default function FeatureHighlights() {
  return (
    <section className="highlights" id="features">
      {features.map(({ Icon, title, description }) => (
        <article key={title}>
          <span>
            <Icon size={23} />
          </span>

          <div>
            <h3>{title}</h3>
            <p>{description}</p>
          </div>
        </article>
      ))}
    </section>
  );
}