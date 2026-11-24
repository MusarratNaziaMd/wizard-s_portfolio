"use client";

import React from "react";
import { content } from "@/lib/content";
import { MotionReveal } from "@/components/ui/MotionReveal";

export const About: React.FC = () => {
  const { about } = content;

  return (
    <section
      id="about"
      aria-label="About Section"
      className="py-24 px-6 max-w-6xl mx-auto border-b border-gold/15"
    >
      <div className="space-y-16">
        {/* Section Header */}
        <div className="max-w-3xl">
          <MotionReveal>
            <div className="inline-flex items-center gap-2 mb-3">
              <span className="font-cinzel text-xs uppercase tracking-[0.25em] text-gold font-semibold">
                {about.storyTitle}
              </span>
              <span className="text-gold/40" aria-hidden="true">
                /
              </span>
              <span className="font-inter text-xs text-parchment/70">
                {about.subtitle}
              </span>
            </div>
            <h2 className="font-cinzel text-3xl sm:text-4xl text-parchment font-bold tracking-tight mb-4">
              Foundations of Craft
            </h2>
            <p className="font-cormorant text-xl text-gold/90 italic">
              {about.narrative}
            </p>
          </MotionReveal>
        </div>

        {/* Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Paragraphs */}
          <div className="lg:col-span-7 space-y-6">
            {about.paragraphs.map((p, idx) => (
              <MotionReveal key={idx} delay={idx * 0.1}>
                <p className="font-inter text-parchment/85 leading-relaxed text-base sm:text-lg">
                  {p}
                </p>
              </MotionReveal>
            ))}
          </div>

          {/* 3 Core Values Cards */}
          <div className="lg:col-span-5 space-y-4">
            <h3 className="font-cinzel text-xs uppercase tracking-widest text-gold mb-2">
              Guiding Engineering Values
            </h3>
            {about.values.map((v, idx) => (
              <MotionReveal key={idx} delay={0.2 + idx * 0.1}>
                <div className="p-6 rounded-xl bg-navy/80 border border-gold/25 hover:border-gold/50 transition-all duration-300 shadow-md">
                  <h4 className="font-cinzel text-base text-gold font-semibold mb-2 flex items-center gap-2">
                    <span className="text-xs text-gold/70" aria-hidden="true">
                      ✦
                    </span>
                    {v.title}
                  </h4>
                  <p className="font-inter text-sm text-parchment/75 leading-relaxed">
                    {v.description}
                  </p>
                </div>
              </MotionReveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
