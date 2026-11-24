"use client";

import React from "react";
import { content } from "@/lib/content";
import { MotionReveal } from "@/components/ui/MotionReveal";
import { InkHeading } from "@/components/ui/InkHeading";

export const Experience: React.FC = () => {
  const { experience } = content;

  return (
    <section
      id="experience"
      aria-label="Experience Section"
      className="py-24 px-6 max-w-6xl mx-auto rune-bg relative"
    >
      <div className="space-y-16">
        {/* Section Header with Ink Reveal */}
        <div className="max-w-3xl">
          <MotionReveal>
            <div className="inline-flex items-center gap-2 mb-3">
              <span className="font-cinzel text-xs uppercase tracking-[0.25em] text-candle font-semibold">
                {experience.storyTitle}
              </span>
              <span className="text-gold/40" aria-hidden="true">
                /
              </span>
              <span className="font-inter text-xs text-parchment/70">
                {experience.subtitle}
              </span>
            </div>
            <InkHeading className="font-cinzel text-3xl sm:text-4xl text-parchment font-bold tracking-tight mb-4">
              The Apprenticeship &amp; Progression
            </InkHeading>
            <p className="font-cormorant text-xl text-candle/90 italic">
              {experience.narrative}
            </p>
          </MotionReveal>
        </div>

        {/* Vertical Timeline with Candle Nodes */}
        <div className="relative border-l-2 border-gold/30 ml-4 sm:ml-8 pl-6 sm:pl-10 space-y-12">
          {experience.items.map((item, idx) => (
            <MotionReveal key={item.id} delay={idx * 0.15}>
              <div className="relative group">
                {/* Glowing Candle Node on timeline */}
                <div
                  className="absolute -left-[31px] sm:-left-[47px] top-2 w-4 h-4 rounded-full bg-midnight border-2 border-candle shadow-[0_0_14px_rgba(255,179,71,0.85)] group-hover:scale-125 transition-transform"
                  aria-hidden="true"
                />

                <div className="parchment-card p-7 rounded-2xl transition-all duration-300 hover:border-candle/60 hover:shadow-[0_10px_35px_rgba(255,179,71,0.12)] space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 border-b border-gold/15 pb-3">
                    <div>
                      <h3 className="font-cinzel text-xl text-parchment font-bold group-hover:text-candle transition-colors">
                        {item.title}
                      </h3>
                      <p className="font-inter text-sm text-gold font-medium">
                        {item.org}
                      </p>
                    </div>
                    <span className="font-cinzel text-xs text-candle tracking-wider uppercase sm:text-right mt-1 sm:mt-0 px-3 py-1 rounded-full bg-midnight border border-candle/30 self-start sm:self-auto shadow-xs">
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
                            <span className="text-candle font-bold mt-0.5" aria-hidden="true">
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
