"use client";

import React from "react";
import { content } from "@/lib/content";
import { Button } from "@/components/ui/Button";
import { MotionReveal } from "@/components/ui/MotionReveal";

export const Projects: React.FC = () => {
  const { projects } = content;

  return (
    <section
      id="projects"
      aria-label="Projects Section"
      className="py-24 px-6 max-w-6xl mx-auto border-b border-gold/15"
    >
      <div className="space-y-16">
        {/* Section Header */}
        <div className="max-w-3xl">
          <MotionReveal>
            <div className="inline-flex items-center gap-2 mb-3">
              <span className="font-cinzel text-xs uppercase tracking-[0.25em] text-gold font-semibold">
                {projects.storyTitle}
              </span>
              <span className="text-gold/40" aria-hidden="true">
                /
              </span>
              <span className="font-inter text-xs text-parchment/70">
                {projects.subtitle}
              </span>
            </div>
            <h2 className="font-cinzel text-3xl sm:text-4xl text-parchment font-bold tracking-tight mb-4">
              Featured Quests &amp; Case Studies
            </h2>
            <p className="font-cormorant text-xl text-gold/90 italic">
              {projects.narrative}
            </p>
          </MotionReveal>
        </div>

        {/* 4 Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.items.map((project, idx) => (
            <MotionReveal key={project.id} delay={idx * 0.1}>
              <article className="h-full flex flex-col justify-between p-8 rounded-2xl bg-[#0e1424] border border-gold/30 hover:border-gold/65 transition-all duration-300 shadow-xl relative overflow-hidden group">
                {/* Decorative parchment corner accent */}
                <div
                  className="absolute top-0 right-0 w-16 h-16 border-t-2 border-r-2 border-gold/40 pointer-events-none transition-colors group-hover:border-gold"
                  aria-hidden="true"
                />

                <div className="space-y-5">
                  <div className="space-y-1">
                    <span className="font-cinzel text-xs text-gold/80 tracking-widest uppercase block">
                      {project.role}
                    </span>
                    <h3 className="font-cinzel text-2xl text-parchment font-bold group-hover:text-gold transition-colors">
                      {project.title}
                    </h3>
                  </div>

                  <div className="space-y-3 font-inter text-sm text-parchment/80 leading-relaxed">
                    <div>
                      <strong className="text-parchment font-semibold block text-xs uppercase tracking-wider mb-1 text-gold/90">
                        Challenge:
                      </strong>
                      <p className="text-parchment/75 text-xs sm:text-sm">{project.problem}</p>
                    </div>

                    <div>
                      <strong className="text-parchment font-semibold block text-xs uppercase tracking-wider mb-1 text-gold/90">
                        Architectural Solution:
                      </strong>
                      <p className="text-parchment/75 text-xs sm:text-sm">{project.solution}</p>
                    </div>

                    <div className="p-3.5 rounded-lg bg-navy/80 border border-gold/20">
                      <span className="text-gold font-semibold text-xs uppercase tracking-wider block mb-1">
                        Impact / Verified Result:
                      </span>
                      <p className="text-xs sm:text-sm font-medium text-parchment">{project.result}</p>
                    </div>
                  </div>
                </div>

                <div className="pt-6 space-y-5 border-t border-gold/15 mt-6">
                  {/* Tech stack badges */}
                  <ul className="flex flex-wrap gap-2" aria-label={`Technologies used in ${project.title}`}>
                    {project.techStack.map((tech) => (
                      <li
                        key={tech}
                        className="text-[11px] font-inter px-2.5 py-1 rounded bg-gold/10 text-gold border border-gold/25 font-medium"
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
