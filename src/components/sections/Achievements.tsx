"use client";

import React from "react";
import { content } from "@/lib/content";
import { MotionReveal } from "@/components/ui/MotionReveal";
import { InkHeading } from "@/components/ui/InkHeading";

export const Achievements: React.FC = () => {
  const { achievements } = content;

  return (
    <section
      id="achievements"
      aria-label="Achievements Section"
      className="scroll-mt-16 py-28 px-6 max-w-6xl mx-auto relative z-20"
    >
      <div className="space-y-16">
        {/* Section Header with Ink Writing Effect */}
        <div className="max-w-3xl">
          <MotionReveal>
            <div className="inline-flex items-center gap-2 mb-3">
              <span className="font-cinzel text-xs uppercase tracking-[0.25em] text-candle font-semibold">
                {achievements.chapter}
              </span>
              <span className="text-gold/40" aria-hidden="true">
                /
              </span>
              <span className="font-inter text-xs text-parchment/70">
                {achievements.subtitle}
              </span>
            </div>
            <InkHeading className="font-cinzel text-3xl sm:text-4xl text-parchment font-bold tracking-tight mb-4">
              {achievements.storyTitle}: Scholarly Accolades
            </InkHeading>
            <p className="font-cormorant text-xl text-candle/90 italic">
              &ldquo;{achievements.storyLine}&rdquo;
            </p>
          </MotionReveal>
        </div>

        {/* Star List with Bespoke Winged-Orb SVG Icons */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {achievements.items.map((item, idx) => (
            <MotionReveal key={item.id} delay={idx * 0.12}>
              <div className="parchment-card p-6 sm:p-8 rounded-2xl border border-gold/30 bg-[#0a0f24]/90 backdrop-blur-sm transition-all duration-300 hover:border-gold hover:shadow-[0_12px_32px_rgba(201,162,75,0.15)] group flex items-start gap-5">
                {/* Original Winged-Orb Bespoke SVG Icon */}
                <div className="shrink-0 w-14 h-14 rounded-2xl border border-gold/40 bg-midnight/90 flex items-center justify-center p-2.5 shadow-md group-hover:scale-110 group-hover:border-candle transition-all">
                  <svg
                    viewBox="0 0 64 64"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-full h-full text-gold drop-shadow-[0_0_8px_rgba(201,162,75,0.5)]"
                    aria-hidden="true"
                  >
                    {/* Left Stylized Wing Feather Rays */}
                    <path
                      d="M18 32 C12 24 6 22 2 24 C8 28 14 30 18 32 Z"
                      fill="#c9a24b"
                      opacity="0.8"
                    />
                    <path
                      d="M20 30 C12 18 4 15 0 18 C7 23 15 26 20 30 Z"
                      fill="#e6c46a"
                    />
                    <path
                      d="M22 34 C16 38 10 42 4 44 C8 40 16 36 22 34 Z"
                      fill="#8b6508"
                    />

                    {/* Right Stylized Wing Feather Rays */}
                    <path
                      d="M46 32 C52 24 58 22 62 24 C56 28 50 30 46 32 Z"
                      fill="#c9a24b"
                      opacity="0.8"
                    />
                    <path
                      d="M44 30 C52 18 60 15 64 18 C57 23 49 26 44 30 Z"
                      fill="#e6c46a"
                    />
                    <path
                      d="M42 34 C48 38 54 42 60 44 C56 40 48 36 42 34 Z"
                      fill="#8b6508"
                    />

                    {/* Central Luminous Celestial Orb */}
                    <circle cx="32" cy="32" r="11" fill="url(#orb-grad)" stroke="#d4af37" strokeWidth="1.5" />
                    {/* Inner 4-point star highlight */}
                    <path
                      d="M32 24 L34 30 L40 32 L34 34 L32 40 L30 34 L24 32 L30 30 Z"
                      fill="#ffffff"
                      opacity="0.9"
                    />

                    <defs>
                      <radialGradient id="orb-grad" cx="30%" cy="30%" r="70%">
                        <stop offset="0%" stopColor="#ffeaad" />
                        <stop offset="50%" stopColor="#d4af37" />
                        <stop offset="100%" stopColor="#3d2203" />
                      </radialGradient>
                    </defs>
                  </svg>
                </div>

                {/* Achievement Details */}
                <div className="flex-1 space-y-2">
                  <div className="flex items-center justify-between flex-wrap gap-2">
                    <h3 className="font-cinzel text-lg sm:text-xl font-bold text-parchment tracking-tight group-hover:text-gold transition-colors">
                      {item.title}
                    </h3>
                    {item.badge && (
                      <span className="text-[10px] font-cinzel font-semibold tracking-widest uppercase px-2.5 py-0.5 rounded-full bg-midnight/90 border border-gold/40 text-candle">
                        {item.badge}
                      </span>
                    )}
                  </div>

                  <p className="font-cinzel text-xs text-candle/90 font-medium">
                    {item.org}
                  </p>

                  <p className="font-inter text-xs sm:text-sm text-parchment/80 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            </MotionReveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Achievements;
