"use client";

import React from "react";
import { content } from "@/lib/content";
import { Button } from "@/components/ui/Button";

export const HeroText: React.FC = () => {
  const { profile, hero } = content;

  return (
    <div className="relative z-30 w-full max-w-xl md:max-w-2xl md:ml-[4vw] lg:ml-[7vw] flex flex-col justify-end md:justify-center">
      {/* Script "Hello, I'm" directly on artwork with high-contrast text shadow */}
      <p className="font-cormorant italic text-2xl sm:text-3xl text-candle font-medium tracking-wide drop-shadow-[0_2px_10px_rgba(5,7,15,0.95)] mb-1">
        {hero.greeting}
      </p>

      {/* Name in gold Cinzel */}
      <h1 className="font-cinzel text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-gold via-parchment to-gold drop-shadow-[0_4px_16px_rgba(5,7,15,0.95)] drop-shadow-[0_1px_3px_rgba(0,0,0,0.95)] leading-[1.1] mb-3">
        {profile.name}
      </h1>

      {/* Role */}
      <p className="font-cinzel text-xs sm:text-sm md:text-base tracking-[0.2em] uppercase font-semibold text-parchment drop-shadow-[0_2px_10px_rgba(5,7,15,0.95)] mb-4">
        {profile.role}
      </p>

      {/* Ornate decorative divider */}
      <div className="flex items-center gap-3 my-3" aria-hidden="true">
        <div className="h-px w-16 bg-gradient-to-r from-gold/90 to-gold/30 shadow-[0_1px_4px_rgba(0,0,0,0.8)]" />
        <span className="text-gold text-xs drop-shadow-[0_0_6px_rgba(201,162,75,0.6)]">✦</span>
        <div className="h-px w-24 bg-gradient-to-r from-gold/50 to-transparent shadow-[0_1px_4px_rgba(0,0,0,0.8)]" />
      </div>

      {/* Tagline */}
      <p className="font-inter text-sm sm:text-base text-parchment/95 leading-relaxed max-w-lg drop-shadow-[0_2px_10px_rgba(5,7,15,0.95)] mb-6">
        {profile.tagline}
      </p>

      {/* Skill chips */}
      <div className="flex flex-wrap items-center gap-2 mb-8" aria-label="Key Disciplines">
        {hero.skillChips.map((skill, index) => (
          <span
            key={index}
            className="inline-flex items-center text-xs font-inter font-medium text-parchment bg-midnight/75 border border-gold/40 px-3 py-1 rounded-full shadow-[0_2px_8px_rgba(0,0,0,0.7)] backdrop-blur-sm hover:border-gold/80 hover:bg-midnight/90 transition-all"
          >
            {skill}
          </span>
        ))}
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap items-center gap-4">
        <Button variant="primary" href="#projects">
          {hero.ctaExplore}
        </Button>
        <Button
          variant="secondary"
          href={profile.resumeUrl}
          target="_blank"
          rel="noopener noreferrer"
        >
          {hero.ctaResume}
        </Button>
      </div>
    </div>
  );
};

export default HeroText;
