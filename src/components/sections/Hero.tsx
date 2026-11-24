import React from "react";
import { NameReveal } from "@/components/intro/NameReveal";
import { Button } from "@/components/ui/Button";

export const Hero: React.FC = () => {
  return (
    <section
      id="hero"
      aria-label="Hero"
      className="relative min-h-[90vh] flex flex-col items-center justify-center text-center px-6 py-20 bg-gradient-to-b from-navy via-navy to-[#070a13]"
    >
      <div className="max-w-4xl mx-auto flex flex-col items-center gap-6">
        <span className="font-cinzel text-xs sm:text-sm tracking-[0.3em] uppercase text-gold/80 border border-gold/30 px-4 py-1.5 rounded-full bg-gold/5">
          Order of Digital Arts
        </span>
        <NameReveal />
        <p className="font-inter text-parchment/85 text-base sm:text-lg max-w-2xl leading-relaxed">
          Crafting spellbinding web experiences, architectural resilience, and
          interactive 3D realities with modern web technologies.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
          <Button variant="primary" href="#projects">
            Explore Grimoire
          </Button>
          <Button variant="secondary" href="#contact">
            Send Missive
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
