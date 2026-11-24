"use client";

import React from "react";
import { content } from "@/lib/content";
import { Button } from "@/components/ui/Button";

export const HeroText: React.FC = () => {
  const { profile, hero } = content;

  return (
    <div className="relative z-30 w-full max-w-xl md:max-w-2xl md:ml-[6vw] lg:ml-[10vw]">
      {/* High-legibility atmospheric gradient backdrop: left-to-right dark gradient */}
      <div className="relative p-6 sm:p-8 md:p-10 rounded-2xl md:rounded-3xl bg-gradient-to-b from-navy/95 via-navy/90 to-navy/70 md:bg-gradient-to-r md:from-navy/95 md:via-navy/80 md:to-transparent backdrop-blur-[3px] border border-gold/15 shadow-[0_10px_40px_rgba(5,7,15,0.7)]">
        {/* Script "Hello, I'm" */}
        <p className="font-cormorant italic text-2xl sm:text-3xl text-candle font-medium tracking-wide drop-shadow-sm mb-1">
          {hero.greeting}
        </p>

        {/* Name in gold Cinzel */}
        <h1 className="font-cinzel text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-gold via-parchment to-gold drop-shadow-[0_2px_14px_rgba(0,0,0,0.8)] leading-[1.1] mb-3">
          {profile.name}
        </h1>

        {/* Role */}
        <p className="font-cinzel text-xs sm:text-sm md:text-base tracking-[0.2em] uppercase font-semibold text-parchment/90 mb-4">
          {profile.role}
        </p>

        {/* Ornate decorative divider */}
        <div className="flex items-center gap-3 my-4" aria-hidden="true">
          <div className="h-px w-16 bg-gradient-to-r from-gold/80 to-gold/20" />
          <span className="text-gold text-xs">✦</span>
          <div className="h-px w-24 bg-gradient-to-r from-gold/40 to-transparent" />
        </div>

        {/* Tagline */}
        <p className="font-inter text-sm sm:text-base text-parchment/85 leading-relaxed max-w-xl mb-6">
          {profile.tagline}
        </p>

        {/* Skill chips */}
        <div className="flex flex-wrap items-center gap-2 mb-8" aria-label="Key Disciplines">
          {hero.skillChips.map((skill, index) => (
            <span
              key={index}
              className="inline-flex items-center text-xs font-inter font-medium text-parchment/90 bg-midnight/80 border border-gold/30 px-3 py-1 rounded-full shadow-sm backdrop-blur-sm hover:border-gold/60 transition-colors"
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
    </div>
  );
};

export default HeroText;
