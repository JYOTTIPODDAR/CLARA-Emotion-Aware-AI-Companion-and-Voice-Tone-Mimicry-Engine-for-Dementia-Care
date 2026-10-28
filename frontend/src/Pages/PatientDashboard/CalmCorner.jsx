
import { useEffect, useState } from "react";
import { Flower2, Wind, Heart, Play, Pause } from "lucide-react";

export default function CalmCorner() {
  const [running, setRunning] = useState(false);
  const [phase, setPhase] = useState("Ready when you are");

  useEffect(() => {
    if (!running) {
      setPhase("Ready when you are");
      return;
    }

    setPhase("Breathe in gently");

    const first = setTimeout(() => setPhase("Breathe out slowly"), 4000);
    const interval = setInterval(() => {
      setPhase((current) =>
        current === "Breathe in gently"
          ? "Breathe out slowly"
          : "Breathe in gently"
      );
    }, 8000);

    return () => {
      clearTimeout(first);
      clearInterval(interval);
    };
  }, [running]);

  return (
    <section className="feature-page">
      <div className="feature-heading">
        <span className="feature-icon"><Flower2 size={27} /></span>
        <div>
          <h1>Calm Corner</h1>
          <p>A peaceful place to pause and relax.</p>
        </div>
      </div>

      <div className="feature-card feature-centered">
        <div className={`calm-breathing-circle ${running ? "calm-breathing-active" : ""}`}>
          <Wind size={42} />
        </div>

        <h2>{phase}</h2>
        <p>There is no rush. Sit comfortably and breathe gently at your own pace.</p>

        <button
          className="feature-button"
          onClick={() => setRunning((value) => !value)}
        >
          {running ? <Pause size={18} /> : <Play size={18} />}
          {running ? "Pause exercise" : "Start breathing exercise"}
        </button>
      </div>

      <div className="feature-card feature-info-card">
        <Heart size={23} />
        <div>
          <strong>A kind reminder</strong>
          <p>It is okay to take a break. If an exercise feels uncomfortable, stop and rest.</p>
        </div>
      </div>
    </section>
  );
}
