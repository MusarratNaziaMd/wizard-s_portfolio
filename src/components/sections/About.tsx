"use client";

import React, { useState } from "react";
import Image from "next/image";
import { content } from "@/lib/content";
import { MotionReveal } from "@/components/ui/MotionReveal";
import { InkHeading } from "@/components/ui/InkHeading";

export const About: React.FC = () => {
  const { about } = content;
  const [imageError, setImageError] = useState(false);

  return (
    <section
      id="about"
      aria-label="About Section"
      className="scroll-mt-16 py-28 px-6 max-w-6xl mx-auto relative z-20"
    >
      <div className="space-y-16">
        {/* Section Header with Ink Reveal */}
        <div className="max-w-3xl">
          <MotionReveal>
            <div className="inline-flex items-center gap-2 mb-3">
              <span className="font-cinzel text-xs uppercase tracking-[0.25em] text-candle font-semibold">
                {about.chapter}
              </span>
              <span className="text-gold/40" aria-hidden="true">
                /
              </span>
              <span className="font-inter text-xs text-parchment/70">
                {about.subtitle}
              </span>
            </div>
            <InkHeading className="font-cinzel text-3xl sm:text-4xl text-parchment font-bold tracking-tight mb-4">
              {about.storyTitle}: Foundations of Craft
            </InkHeading>
            <p className="font-cormorant text-xl text-candle/90 italic">
              &ldquo;{about.storyLine}&rdquo;
            </p>
          </MotionReveal>
        </div>

        {/* Content Layout: Arched Profile Frame + Aged Parchment Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Arched Gold Frame for Profile Image */}
          <div className="lg:col-span-4 flex justify-center">
            <MotionReveal delay={0.1}>
              <div className="relative group">
                {/* Outer decorative gold arch glow */}
                <div
                  className="absolute -inset-1 rounded-t-[140px] rounded-b-2xl bg-gradient-to-b from-gold/60 via-candle/30 to-gold/10 opacity-70 blur-md group-hover:opacity-100 transition-opacity"
                  aria-hidden="true"
                />

                {/* Arched frame container */}
                <div className="relative w-64 sm:w-72 h-80 sm:h-96 rounded-t-[136px] rounded-b-2xl border-2 border-gold/70 bg-[#0d1326] overflow-hidden shadow-[0_12px_36px_rgba(0,0,0,0.85)] flex items-center justify-center">
                  {!imageError ? (
                    <Image
                      src={about.profileImage}
                      alt={content.profile.name}
                      fill
                      sizes="(max-width: 640px) 256px, 288px"
                      className="object-cover object-top"
                      onError={() => setImageError(true)}
                    />
                  ) : (
                    /* Elegant scholarly SVG placeholder when portrait image is missing */
                    <div className="flex flex-col items-center justify-center p-6 text-center text-gold/80">
                      <svg
                        viewBox="0 0 100 100"
                        className="w-24 h-24 mb-3 text-gold/60"
                        fill="currentColor"
                        aria-hidden="true"
                      >
                        <circle cx="50" cy="35" r="20" opacity="0.8" />
                        <path d="M15 88 C15 65 30 55 50 55 C70 55 85 65 85 88 Z" opacity="0.6" />
                      </svg>
                      <span className="font-cinzel text-xs tracking-widest text-parchment/70 uppercase">
                        {content.profile.initials} Sanctuary
                      </span>
                    </div>
                  )}

                  {/* Subtle inner shadow and antique vignette */}
                  <div className="absolute inset-0 shadow-[inset_0_0_40px_rgba(10,14,26,0.6)] pointer-events-none" />
                </div>

                {/* Monogram crest tag at bottom center */}
                <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-10 h-10 rounded-full border border-gold bg-[#12060c] text-candle font-cinzel text-xs font-bold flex items-center justify-center shadow-lg">
                  {content.profile.initials}
                </div>
              </div>
            </MotionReveal>
          </div>

          {/* Aged Parchment Card with Torn-Edge Illusion & Paragraphs */}
          <div className="lg:col-span-8 space-y-8">
            <MotionReveal delay={0.15}>
              <div className="parchment-card p-8 sm:p-10 rounded-2xl border border-gold/30 shadow-2xl relative overflow-hidden">
                {/* Paper grain & subtle corner watermark */}
                <div
                  className="absolute top-4 right-4 text-gold/10 font-cinzel text-5xl select-none pointer-events-none"
                  aria-hidden="true"
                >
                  ✦
                </div>

                <div className="space-y-5">
                  {about.paragraphs.map((p, idx) => (
                    <p
                      key={idx}
                      className="font-inter text-parchment/85 leading-relaxed text-base sm:text-lg"
                    >
                      {p}
                    </p>
                  ))}
                </div>

                {/* Handwritten-Style Closing Line */}
                <div className="pt-6 mt-6 border-t border-gold/20 flex items-center justify-between flex-wrap gap-4">
                  <p className="font-cormorant italic text-xl sm:text-2xl text-candle drop-shadow-[0_1px_4px_rgba(0,0,0,0.8)]">
                    &mdash; {about.storyLine}
                  </p>
                  <span className="font-cinzel text-xs tracking-widest text-gold/60 uppercase">
                    B.Tech IT Graduate
                  </span>
                </div>
              </div>
            </MotionReveal>

            {/* Guiding Pillars Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {about.values.map((v, idx) => (
                <MotionReveal key={idx} delay={0.2 + idx * 0.1}>
                  <div className="p-5 rounded-xl border border-gold/25 bg-[#0e142a]/80 backdrop-blur-sm hover:border-gold/60 transition-all shadow-md">
                    <div className="text-candle font-cinzel text-xs uppercase tracking-wider mb-2 font-semibold flex items-center gap-2">
                      <span className="text-gold text-[10px]">✦</span>
                      {v.title}
                    </div>
                    <p className="font-inter text-xs text-parchment/75 leading-relaxed">
                      {v.description}
                    </p>
                  </div>
                </MotionReveal>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
