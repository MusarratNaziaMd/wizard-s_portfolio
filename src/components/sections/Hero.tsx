"use client";

import React from "react";
import { content } from "@/lib/content";
import { Button } from "@/components/ui/Button";
import { MotionReveal } from "@/components/ui/MotionReveal";
import { GreatHallScene } from "@/components/three/GreatHallScene";

export const Hero: React.FC = () => {
  const { profile, hero } = content;

  return (
    <section
      id="hero"
      aria-label="Hero Section"
      className="relative min-h-[95vh] flex flex-col items-center justify-center text-center px-6 py-28 overflow-hidden border-b border-gold/15 bg-gradient-to-b from-midnight via-navy to-navy"
    >
      {/* 3D Great Hall Scene: floating candles, distant castle, starry ceiling, fog */}
      <GreatHallScene />

      {/* Atmospheric depth vignette overlays */}
      <div
        className="absolute inset-0 bg-gradient-to-t from-navy via-transparent to-midnight/50 pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute bottom-0 left-0 right-0 h-36 bg-gradient-to-t from-navy to-transparent pointer-events-none"
        aria-hidden="true"
      />

      {/* Hero HTML Content Layer */}
      <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center gap-6">
        <MotionReveal direction="down">
          <div className="inline-flex items-center gap-2 border border-gold/40 bg-midnight/80 backdrop-blur-md px-4 py-1.5 rounded-full shadow-[0_0_15px_rgba(201,162,75,0.15)]">
            <span className="font-cinzel text-xs uppercase tracking-[0.25em] text-gold font-semibold">
              {hero.storyTitle}
            </span>
            <span className="text-gold/50" aria-hidden="true">
              •
            </span>
            <span className="font-inter text-xs text-parchment/80">
              {hero.subtitle}
            </span>
          </div>
        </MotionReveal>

        <MotionReveal delay={0.1}>
          <h1 className="font-cinzel text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-parchment drop-shadow-[0_2px_18px_rgba(10,14,26,0.9)]">
            {profile.name}
          </h1>
        </MotionReveal>

        <MotionReveal delay={0.2}>
          <p className="font-cormorant text-2xl sm:text-3xl text-candle font-medium italic tracking-wide drop-shadow-md">
            {profile.role}
          </p>
        </MotionReveal>

        <MotionReveal delay={0.3}>
          <p className="font-inter text-parchment/90 text-base sm:text-lg max-w-2xl leading-relaxed mx-auto drop-shadow-md">
            {profile.tagline}
          </p>
        </MotionReveal>

        <MotionReveal delay={0.4}>
          <p className="font-inter text-xs sm:text-sm text-gold/90 italic max-w-xl mx-auto drop-shadow">
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
