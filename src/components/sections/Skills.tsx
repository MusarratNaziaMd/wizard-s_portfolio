"use client";

import React from "react";
import { content } from "@/lib/content";
import { MotionReveal } from "@/components/ui/MotionReveal";
import { InkHeading } from "@/components/ui/InkHeading";

export const Skills: React.FC = () => {
  const { skills } = content;

  return (
    <section
      id="skills"
      aria-label="Skills Section"
      className="py-24 px-6 max-w-6xl mx-auto rune-bg relative"
    >
      <div className="space-y-16">
        {/* Section Header with Ink Reveal */}
        <div className="max-w-3xl">
          <MotionReveal>
            <div className="inline-flex items-center gap-2 mb-3">
              <span className="font-cinzel text-xs uppercase tracking-[0.25em] text-candle font-semibold">
                {skills.storyTitle}
              </span>
              <span className="text-gold/40" aria-hidden="true">
                /
              </span>
              <span className="font-inter text-xs text-parchment/70">
                {skills.subtitle}
              </span>
            </div>
            <InkHeading className="font-cinzel text-3xl sm:text-4xl text-parchment font-bold tracking-tight mb-4">
              Disciplines of Technical Mastery
            </InkHeading>
            <p className="font-cormorant text-xl text-candle/90 italic">
              {skills.narrative}
            </p>
          </MotionReveal>
        </div>

        {/* 3 Skill Group Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {skills.groups.map((group, groupIdx) => {
            const tomeBadgeStyle =
              groupIdx === 0
                ? "bg-midnight/90 border-gold/40 text-candle"
                : groupIdx === 1
                ? "bg-forest/20 border-forest/50 text-emerald-300"
                : "bg-burgundy/20 border-burgundy/50 text-rose-300";

            return (
              <MotionReveal key={group.category} delay={groupIdx * 0.15}>
                <div className="parchment-card h-full flex flex-col justify-between p-7 rounded-2xl transition-all duration-300 hover:border-candle/50 hover:shadow-[0_10px_30px_rgba(255,179,71,0.12)]">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between border-b border-gold/15 pb-4">
                      <h3 className="font-cinzel text-xl text-candle font-bold tracking-wide">
                        {group.category}
                      </h3>
                      <span
                        className={`font-cinzel text-[11px] uppercase tracking-widest px-2.5 py-1 rounded border ${tomeBadgeStyle}`}
                      >
                        Tome 0{groupIdx + 1}
                      </span>
                    </div>
                    <p className="font-inter text-xs sm:text-sm text-parchment/70 leading-relaxed min-h-[40px]">
                      {group.description}
                    </p>
                  </div>

                  <div className="pt-6">
                    <ul
                      className="flex flex-wrap gap-2.5"
                      aria-label={`${group.category} skills`}
                    >
                      {group.items.map((skill) => (
                        <li
                          key={skill}
                          className="font-inter text-xs px-3 py-1.5 rounded-md bg-midnight/90 text-parchment/90 border border-gold/25 hover:border-candle hover:text-candle hover:bg-midnight transition-colors cursor-default shadow-xs"
                        >
                          {skill}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </MotionReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Skills;
