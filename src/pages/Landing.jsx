import React from "react";
import LandingNav from "../components/landing/LandingNav.jsx";
import Hero from "../components/landing/Hero.jsx";
import CapabilitiesSection from "../components/landing/CapabilitiesSection.jsx";
import FeaturesSection from "../components/landing/FeaturesSection.jsx";
import CTASection from "../components/landing/CTASection.jsx";

export default function Landing() {
  return (
    <div>
      <LandingNav />
      <Hero />
      <CapabilitiesSection />
      <FeaturesSection />
      <CTASection />
      <footer className="border-t border-[var(--border)] py-8">
        <div className="max-w-6xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-sm text-[var(--muted)]">
          <span>© 2026 Social Wavez Assistant</span>
          <span>Built for people, not tickets</span>
        </div>
      </footer>
    </div>
  );
}
