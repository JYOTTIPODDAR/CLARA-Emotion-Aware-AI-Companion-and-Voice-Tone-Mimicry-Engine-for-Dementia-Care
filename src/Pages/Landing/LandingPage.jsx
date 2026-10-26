import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

import HeroSection from "./components/HeroSection";
import FeatureHighlights from "./components/FeatureHighlights";
import HowClaraHelps from "./components/HowClaraHelps";
import AboutClara from "./components/AboutClara";

import "./LandingPage.css";

export default function LandingPage() {
  return (
    <div className="landing">
      <Navbar />

      <main>
        <HeroSection />
        <FeatureHighlights />
        <HowClaraHelps />
        <AboutClara />
      </main>

      <Footer />
    </div>
  );
}