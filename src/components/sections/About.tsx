import React from "react";

export const About: React.FC = () => {
  return (
    <section
      id="about"
      aria-label="About"
      className="py-24 px-6 max-w-5xl mx-auto border-t border-gold/15"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div className="space-y-6">
          <span className="font-cinzel text-xs uppercase tracking-[0.25em] text-gold">
            Chapter I
          </span>
          <h2 className="font-cinzel text-3xl sm:text-4xl text-parchment font-bold">
            The Scholar&apos;s Journey
          </h2>
          <p className="font-inter text-parchment/80 leading-relaxed text-base">
            Rooted in principles of disciplined engineering and aesthetic harmony,
            I blend rigorous system architecture with cutting-edge visual craft.
            Every project is treated as an ancient manuscript: precisely structured,
            resilient to the ravages of time, and rich in deliberate detail.
          </p>
          <p className="font-cormorant text-xl text-gold/90 italic">
            &ldquo;Code is our incantation; mathematics and design are our runes.&rdquo;
          </p>
        </div>
        <div className="p-8 rounded-2xl bg-navy/60 border border-gold/25 shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-gold/5 rounded-full blur-2xl pointer-events-none" />
          <h3 className="font-cinzel text-lg text-gold mb-4 uppercase tracking-wider">
            Academy Pillars
          </h3>
          <ul className="space-y-4 font-inter text-sm text-parchment/80">
            <li className="flex items-start gap-3">
              <span className="text-gold font-bold">✦</span>
              <span><strong>Performance by Design:</strong> Zero-compromise 60fps rendering, lean bundle footprints, and instant hydration.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-gold font-bold">✦</span>
              <span><strong>Universal Accessibility:</strong> High-contrast typography, screen reader landmarks, and reduced-motion fallbacks.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-gold font-bold">✦</span>
              <span><strong>Artful Craft:</strong> Bespoke shaders, tactile motion, and cohesive aesthetic identity.</span>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default About;
