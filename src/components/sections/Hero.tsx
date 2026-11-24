"use client";

import React from "react";
import { content } from "@/lib/content";
import { Button } from "@/components/ui/Button";
import { MotionReveal } from "@/components/ui/MotionReveal";

export const Hero: React.FC = () => {
  const { profile, hero } = content;

  return (
    <section
      id="hero"
      aria-label="Hero Section"
      className="relative min-h-[92vh] flex flex-col items-center justify-center text-center px-6 py-24 overflow-hidden border-b border-gold/15"
    >
      {/* Decorative celestial background rings */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] sm:w-[800px] sm:h-[800px] rounded-full border border-gold/10 pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[380px] h-[380px] sm:w-[500px] sm:h-[500px] rounded-full border border-gold/15 border-dashed pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gold/5 rounded-full blur-3xl pointer-events-none"
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center gap-6">
        <MotionReveal direction="down">
          <div className="inline-flex items-center gap-2 border border-gold/30 bg-gold/5 px-4 py-1.5 rounded-full">
            <span className="font-cinzel text-xs uppercase tracking-[0.25em] text-gold font-semibold">
              {hero.storyTitle}
            </span>
            <span className="text-gold/50" aria-hidden="true">
              •
            </span>
            <span className="font-inter text-xs text-parchment/75">
              {hero.subtitle}
            </span>
          </div>
        </MotionReveal>

        <MotionReveal delay={0.1}>
          <h1 className="font-cinzel text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-parchment drop-shadow-sm">
            {profile.name}
          </h1>
        </MotionReveal>

        <MotionReveal delay={0.2}>
          <p className="font-cormorant text-2xl sm:text-3xl text-gold font-normal italic tracking-wide">
            {profile.role}
          </p>
        </MotionReveal>

        <MotionReveal delay={0.3}>
          <p className="font-inter text-parchment/85 text-base sm:text-lg max-w-2xl leading-relaxed mx-auto">
            {profile.tagline}
          </p>
        </MotionReveal>

        <MotionReveal delay={0.4}>
          <p className="font-inter text-xs sm:text-sm text-gold/80 italic max-w-xl mx-auto">
            &ldquo;{hero.narrative}&rdquo;
          </p>
        </MotionReveal>

        <MotionReveal delay={0.5}>
          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            <Button variant="primary" href="#projects">
              {hero.ctaProjects}
            </Button>
            <Button variant="secondary" href="#contact">
              {hero.ctaContact}
            </Button>
          </div>
        </MotionReveal>
      </div>
    </section>
  );
};

export default Hero;
