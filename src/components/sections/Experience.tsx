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
      className="scroll-mt-16 py-28 px-6 max-w-6xl mx-auto relative z-20"
    >
      <div className="space-y-16">
        {/* Section Header with Ink Reveal */}
        <div className="max-w-3xl">
          <MotionReveal>
            <div className="inline-flex items-center gap-2 mb-3">
              <span className="font-cinzel text-xs uppercase tracking-[0.25em] text-candle font-semibold">
                {experience.chapter}
              </span>
              <span className="text-gold/40" aria-hidden="true">
                /
              </span>
              <span className="font-inter text-xs text-parchment/70">
                {experience.subtitle}
              </span>
            </div>
            <InkHeading className="font-cinzel text-3xl sm:text-4xl text-parchment font-bold tracking-tight mb-4">
              {experience.storyTitle}: Guild Internships
            </InkHeading>
            <p className="font-cormorant text-xl text-candle/90 italic">
              &ldquo;{experience.storyLine}&rdquo;
            </p>
          </MotionReveal>
        </div>

        {/* Vertical Gold Timeline with Glowing Amber Nodes */}
        <div className="relative border-l-2 border-gold/35 ml-4 sm:ml-8 pl-6 sm:pl-10 space-y-12">
          {experience.items.map((item, idx) => (
            <MotionReveal key={item.id} delay={idx * 0.15}>
              <div className="relative group">
                {/* Glowing Candle Node on timeline */}
                <div
                  className="absolute -left-[31px] sm:-left-[47px] top-2 w-4 h-4 rounded-full bg-midnight border-2 border-candle shadow-[0_0_14px_rgba(255,179,71,0.85)] group-hover:scale-125 transition-transform"
                  aria-hidden="true"
                />

                {/* Experience Card */}
                <div className="parchment-card p-6 sm:p-8 rounded-xl border border-gold/25 transition-all duration-300 hover:border-gold/60 hover:shadow-[0_8px_32px_rgba(201,162,75,0.12)]">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
                    <div>
                      <h3 className="font-cinzel text-lg sm:text-xl font-bold text-parchment tracking-tight group-hover:text-gold transition-colors">
                        {item.title}
                      </h3>
                      <p className="font-cinzel text-xs sm:text-sm text-candle font-medium tracking-wide">
                        {item.org}
                      </p>
                    </div>
                    <span className="inline-block px-3 py-1 rounded-full text-xs font-inter font-medium text-parchment/80 bg-midnight/90 border border-gold/30 self-start sm:self-auto">
                      {item.period}
                    </span>
                  </div>

                  <p className="font-inter text-parchment/80 text-sm leading-relaxed mb-6">
                    {item.summary}
                  </p>

                  {/* Highlights list with star markers */}
                  <div className="space-y-2 border-t border-gold/15 pt-4">
                    <span className="font-cinzel text-[11px] uppercase tracking-widest text-gold/70 block mb-2">
                      Key Contributions
                    </span>
                    <ul className="space-y-2">
                      {item.highlights.map((h, hIdx) => (
                        <li
                          key={hIdx}
                          className="flex items-start gap-3 font-inter text-xs sm:text-sm text-parchment/75 leading-relaxed"
                        >
                          <span className="text-candle mt-1 text-[10px]" aria-hidden="true">
                            ✦
                          </span>
                          <span>{h}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
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
