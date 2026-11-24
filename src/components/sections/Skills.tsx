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
      className="scroll-mt-16 py-28 px-6 max-w-6xl mx-auto relative z-20"
    >
      <div className="space-y-16">
        {/* Section Header with Ink Reveal */}
        <div className="max-w-3xl">
          <MotionReveal>
            <div className="inline-flex items-center gap-2 mb-3">
              <span className="font-cinzel text-xs uppercase tracking-[0.25em] text-candle font-semibold">
                {skills.chapter}
              </span>
              <span className="text-gold/40" aria-hidden="true">
                /
              </span>
              <span className="font-inter text-xs text-parchment/70">
                {skills.subtitle}
              </span>
            </div>
            <InkHeading className="font-cinzel text-3xl sm:text-4xl text-parchment font-bold tracking-tight mb-4">
              {skills.storyTitle}: Disciplines of Mastery
            </InkHeading>
            <p className="font-cormorant text-xl text-candle/90 italic">
              &ldquo;{skills.storyLine}&rdquo;
            </p>
          </MotionReveal>
        </div>

        {/* 1. All Core Runes Glowing Badge Grid */}
        <MotionReveal delay={0.1}>
          <div className="parchment-card p-8 rounded-2xl border border-gold/30 shadow-2xl relative">
            <span className="font-cinzel text-xs uppercase tracking-widest text-candle block mb-6">
              Primary Arcana &amp; Technical Runes
            </span>
            <div className="flex flex-wrap gap-3 sm:gap-4">
              {skills.allSkills.map((skill, idx) => (
                <div
                  key={idx}
                  className="group relative inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-midnight/90 border border-gold/35 text-parchment text-sm font-inter font-medium transition-all duration-300 hover:border-gold hover:text-gold hover:scale-105 hover:shadow-[0_0_20px_rgba(201,162,75,0.4)] cursor-default select-none"
                >
                  <span className="text-gold/60 text-xs group-hover:text-candle transition-colors">
                    ✦
                  </span>
                  <span>{skill}</span>
                  {/* Subtle hover backlight glow */}
                  <div className="absolute inset-0 rounded-xl bg-gold/10 opacity-0 group-hover:opacity-100 transition-opacity blur-sm -z-10" />
                </div>
              ))}
            </div>
          </div>
        </MotionReveal>

        {/* 2. Structured Disciplines (Languages & Core, Frameworks & Web, AI & Infrastructure) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {skills.groups.map((group, groupIdx) => {
            const tomeBadgeStyle =
              groupIdx === 0
                ? "bg-midnight/90 border-gold/40 text-candle"
                : groupIdx === 1
                ? "bg-[#0b1f17]/90 border-forest/70 text-emerald-300"
                : "bg-[#250912]/90 border-burgundy/70 text-rose-300";

            return (
              <MotionReveal key={groupIdx} delay={0.15 + groupIdx * 0.1}>
                <div className="parchment-card h-full p-6 sm:p-8 rounded-2xl flex flex-col justify-between border border-gold/25 transition-all duration-300 hover:border-gold/60 hover:-translate-y-1 hover:shadow-[0_10px_30px_rgba(201,162,75,0.12)]">
                  <div>
                    {/* Category Seal Badge */}
                    <div className="inline-flex items-center gap-2 mb-4">
                      <span
                        className={`text-[11px] font-cinzel font-semibold tracking-widest uppercase px-3 py-1 rounded-full border ${tomeBadgeStyle}`}
                      >
                        {group.category}
                      </span>
                    </div>

                    <p className="font-inter text-xs text-parchment/70 leading-relaxed mb-6">
                      {group.description}
                    </p>

                    {/* Skill items list with check sigils */}
                    <ul className="space-y-2.5">
                      {group.items.map((item, itemIdx) => (
                        <li
                          key={itemIdx}
                          className="flex items-center gap-3 font-inter text-sm text-parchment/85 group/item"
                        >
                          <span
                            className="text-candle text-xs transition-transform group-hover/item:scale-125"
                            aria-hidden="true"
                          >
                            ✧
                          </span>
                          <span className="font-medium group-hover/item:text-gold transition-colors">
                            {item}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-8 pt-4 border-t border-gold/15 flex items-center justify-between text-[11px] font-cinzel text-parchment/40">
                    <span>Rank: Mastered</span>
                    <span className="text-gold/40">✦ ✦ ✦</span>
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
