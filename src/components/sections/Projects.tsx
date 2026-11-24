"use client";

import React from "react";
import { content } from "@/lib/content";
import { Button } from "@/components/ui/Button";
import { MotionReveal } from "@/components/ui/MotionReveal";
import { InkHeading } from "@/components/ui/InkHeading";
import { WaxSeal } from "@/components/ui/WaxSeal";

export const Projects: React.FC = () => {
  const { projects } = content;

  return (
    <section
      id="projects"
      aria-label="Projects Section"
      className="py-24 px-6 max-w-6xl mx-auto rune-bg relative"
    >
      <div className="space-y-16">
        {/* Section Header with Ink Writing Effect */}
        <div className="max-w-3xl">
          <MotionReveal>
            <div className="inline-flex items-center gap-2 mb-3">
              <span className="font-cinzel text-xs uppercase tracking-[0.25em] text-candle font-semibold">
                {projects.storyTitle}
              </span>
              <span className="text-gold/40" aria-hidden="true">
                /
              </span>
              <span className="font-inter text-xs text-parchment/70">
                {projects.subtitle}
              </span>
            </div>
            <InkHeading className="font-cinzel text-3xl sm:text-4xl text-parchment font-bold tracking-tight mb-4">
              Featured Quests &amp; Case Studies
            </InkHeading>
            <p className="font-cormorant text-xl text-candle/90 italic">
              {projects.narrative}
            </p>
          </MotionReveal>
        </div>

        {/* 4 Projects Grid with Parchment Cards & Wax Seals */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.items.map((project, idx) => (
            <MotionReveal key={project.id} delay={idx * 0.1}>
              <article className="parchment-card h-full flex flex-col justify-between p-8 rounded-2xl transition-all duration-300 hover:-translate-y-1.5 hover:border-candle/70 hover:shadow-[0_14px_40px_rgba(255,179,71,0.18)] group">
                {/* Wax Seal Stamp in corner */}
                <div className="absolute top-5 right-5 z-10">
                  <WaxSeal label={`0${idx + 1}`} />
                </div>

                <div className="space-y-5 relative z-10">
                  <div className="space-y-1 pr-12">
                    <span className="font-cinzel text-xs text-candle/90 tracking-widest uppercase block">
                      {project.role}
                    </span>
                    <h3 className="font-cinzel text-2xl text-parchment font-bold group-hover:text-candle transition-colors">
                      {project.title}
                    </h3>
                  </div>

                  <div className="space-y-3 font-inter text-sm text-parchment/80 leading-relaxed">
                    <div>
                      <strong className="text-gold font-semibold block text-xs uppercase tracking-wider mb-1">
                        Challenge:
                      </strong>
                      <p className="text-parchment/75 text-xs sm:text-sm">{project.problem}</p>
                    </div>

                    <div>
                      <strong className="text-gold font-semibold block text-xs uppercase tracking-wider mb-1">
                        Architectural Solution:
                      </strong>
                      <p className="text-parchment/75 text-xs sm:text-sm">{project.solution}</p>
                    </div>

                    <div className="p-3.5 rounded-lg bg-midnight/90 border border-gold/25 shadow-inner">
                      <span className="text-candle font-semibold text-xs uppercase tracking-wider block mb-1">
                        Impact / Verified Result:
                      </span>
                      <p className="text-xs sm:text-sm font-medium text-parchment">{project.result}</p>
                    </div>
                  </div>
                </div>

                <div className="pt-6 space-y-5 border-t border-gold/20 mt-6 relative z-10">
                  {/* Tech stack badges */}
                  <ul className="flex flex-wrap gap-2" aria-label={`Technologies used in ${project.title}`}>
                    {project.techStack.map((tech) => (
                      <li
                        key={tech}
                        className="text-[11px] font-inter px-2.5 py-1 rounded bg-midnight border border-gold/30 text-parchment/90 font-medium group-hover:border-gold/50 transition-colors"
                      >
                        {tech}
                      </li>
                    ))}
                  </ul>

                  {/* Actions: Live and Code */}
                  <div className="flex items-center gap-3">
                    <Button
                      variant="primary"
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[11px] py-2 px-4 flex-1 text-center"
                    >
                      Inspect Live
                    </Button>
                    <Button
                      variant="secondary"
                      href={project.repoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[11px] py-2 px-4 flex-1 text-center"
                    >
                      Source Codex
                    </Button>
                  </div>
                </div>
              </article>
            </MotionReveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
