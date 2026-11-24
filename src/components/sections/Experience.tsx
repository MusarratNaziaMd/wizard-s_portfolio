"use client";

import React from "react";
import { content } from "@/lib/content";
import { MotionReveal } from "@/components/ui/MotionReveal";

export const Experience: React.FC = () => {
  const { experience } = content;

  return (
    <section
      id="experience"
      aria-label="Experience Section"
      className="py-24 px-6 max-w-6xl mx-auto border-b border-gold/15"
    >
      <div className="space-y-16">
        {/* Section Header */}
        <div className="max-w-3xl">
          <MotionReveal>
            <div className="inline-flex items-center gap-2 mb-3">
              <span className="font-cinzel text-xs uppercase tracking-[0.25em] text-gold font-semibold">
                {experience.storyTitle}
              </span>
              <span className="text-gold/40" aria-hidden="true">
                /
              </span>
              <span className="font-inter text-xs text-parchment/70">
                {experience.subtitle}
              </span>
            </div>
            <h2 className="font-cinzel text-3xl sm:text-4xl text-parchment font-bold tracking-tight mb-4">
              The Apprenticeship &amp; Progression
            </h2>
            <p className="font-cormorant text-xl text-gold/90 italic">
              {experience.narrative}
            </p>
          </MotionReveal>
        </div>

        {/* Vertical Timeline */}
        <div className="relative border-l-2 border-gold/25 ml-4 sm:ml-8 pl-6 sm:pl-10 space-y-12">
          {experience.items.map((item, idx) => (
            <MotionReveal key={item.id} delay={idx * 0.15}>
              <div className="relative group">
                {/* Glowing node on timeline */}
                <div
                  className="absolute -left-[31px] sm:-left-[47px] top-1.5 w-4 h-4 rounded-full bg-navy border-2 border-gold shadow-[0_0_10px_rgba(201,162,75,0.7)] group-hover:scale-125 transition-transform"
                  aria-hidden="true"
                />

                <div className="p-7 rounded-2xl bg-[#0e1424] border border-gold/20 hover:border-gold/45 transition-all duration-300 shadow-lg space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 border-b border-gold/15 pb-3">
                    <div>
                      <h3 className="font-cinzel text-xl text-parchment font-bold">
                        {item.title}
                      </h3>
                      <p className="font-inter text-sm text-gold font-medium">
                        {item.org}
                      </p>
                    </div>
                    <span className="font-cinzel text-xs text-gold/80 tracking-wider uppercase sm:text-right mt-1 sm:mt-0 px-2.5 py-1 rounded bg-gold/10 border border-gold/20 self-start sm:self-auto">
                      {item.period}
                    </span>
                  </div>

                  <p className="font-inter text-sm text-parchment/80 leading-relaxed">
                    {item.summary}
                  </p>

                  {item.highlights && item.highlights.length > 0 && (
                    <div className="pt-2">
                      <ul className="space-y-2 font-inter text-xs sm:text-sm text-parchment/75">
                        {item.highlights.map((h, hIdx) => (
                          <li key={hIdx} className="flex items-start gap-2.5">
                            <span className="text-gold font-bold mt-0.5" aria-hidden="true">
                              ✦
                            </span>
                            <span>{h}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            </MotionReveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
