"use client";

import React, { useState } from "react";
import Image from "next/image";
import { content } from "@/lib/content";
import { Button } from "@/components/ui/Button";
import { MotionReveal } from "@/components/ui/MotionReveal";
import { InkHeading } from "@/components/ui/InkHeading";
import { WaxSeal } from "@/components/ui/WaxSeal";

export const Projects: React.FC = () => {
  const { projects } = content;
  const [imageErrors, setImageErrors] = useState<Record<string, boolean>>({});

  return (
    <section
      id="projects"
      aria-label="Projects Section"
      className="scroll-mt-16 py-28 px-6 max-w-6xl mx-auto relative z-20"
    >
      <div className="space-y-16">
        {/* Section Header with Ink Writing Effect */}
        <div className="max-w-3xl">
          <MotionReveal>
            <div className="inline-flex items-center gap-2 mb-3">
              <span className="font-cinzel text-xs uppercase tracking-[0.25em] text-candle font-semibold">
                {projects.chapter}
              </span>
              <span className="text-gold/40" aria-hidden="true">
                /
              </span>
              <span className="font-inter text-xs text-parchment/70">
                {projects.subtitle}
              </span>
            </div>
            <InkHeading className="font-cinzel text-3xl sm:text-4xl text-parchment font-bold tracking-tight mb-4">
              {projects.storyTitle}: Artifacts &amp; Systems
            </InkHeading>
            <p className="font-cormorant text-xl text-candle/90 italic">
              &ldquo;{projects.storyLine}&rdquo;
            </p>
          </MotionReveal>
        </div>

        {/* Dark Glass Project Cards with Image Slots & Warm Hover Border Glow */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-10">
          {projects.items.map((project, idx) => (
            <MotionReveal key={project.id} delay={idx * 0.15}>
              <article className="parchment-card h-full flex flex-col justify-between p-6 sm:p-8 rounded-2xl transition-all duration-300 hover:-translate-y-1.5 hover:border-candle/70 hover:shadow-[0_16px_40px_rgba(255,179,71,0.18)] group relative overflow-hidden bg-[#0a0f22]/90 backdrop-blur-md border border-gold/30">
                {/* Wax Seal Stamp in corner */}
                <div className="absolute top-5 right-5 z-20">
                  <WaxSeal label={`0${idx + 1}`} />
                </div>

                <div className="space-y-5">
                  {/* Project Image Slot with Elegant Fallback */}
                  <div className="relative w-full h-48 sm:h-56 rounded-xl border border-gold/25 overflow-hidden bg-[#060914] shadow-inner flex items-center justify-center">
                    {!imageErrors[project.id] ? (
                      <Image
                        src={project.image}
                        alt={project.title}
                        fill
                        sizes="(max-width: 768px) 100vw, 50vw"
                        className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
                        onError={() =>
                          setImageErrors((prev) => ({ ...prev, [project.id]: true }))
                        }
                      />
                    ) : (
                      /* Scholarly Grimoire Codex Illustration Fallback */
                      <div className="flex flex-col items-center justify-center p-6 text-center">
                        <div className="w-14 h-14 rounded-full border border-gold/40 flex items-center justify-center text-gold text-xl font-cinzel mb-2 bg-midnight/70">
                          ✦
                        </div>
                        <span className="font-cinzel text-xs uppercase tracking-widest text-parchment/60">
                          {project.title} Grimoire Slot
                        </span>
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0a0f22] via-transparent to-transparent opacity-80" />
                  </div>

                  {/* Title & Role */}
                  <div>
                    <span className="text-xs font-cinzel text-candle tracking-widest uppercase block mb-1">
                      {project.role}
                    </span>
                    <h3 className="font-cinzel text-2xl font-bold text-parchment tracking-tight group-hover:text-gold transition-colors">
                      {project.title}
                    </h3>
                  </div>

                  {/* One-Line Description */}
                  <p className="font-inter text-sm text-parchment/85 leading-relaxed">
                    {project.description}
                  </p>

                  {/* Tech Stack Chips */}
                  <div className="flex flex-wrap gap-2 pt-2">
                    {project.techStack.map((tech, techIdx) => (
                      <span
                        key={techIdx}
                        className="text-[11px] font-inter font-medium text-parchment/90 bg-midnight/80 border border-gold/30 px-2.5 py-1 rounded-full shadow-sm"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Bottom Action: "View Project" Link with Warm Border Glow */}
                <div className="pt-6 mt-6 border-t border-gold/15 flex items-center justify-between">
                  <Button
                    variant="primary"
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    View Project
                  </Button>
                  <a
                    href={project.repoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-inter text-xs text-parchment/60 hover:text-gold transition-colors underline-offset-4 hover:underline"
                  >
                    Inspect Codex (GitHub)
                  </a>
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
