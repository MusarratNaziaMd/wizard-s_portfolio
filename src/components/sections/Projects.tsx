import React from "react";
import { Button } from "@/components/ui/Button";

interface ProjectItem {
  title: string;
  category: string;
  description: string;
  tags: string[];
}

const sampleProjects: ProjectItem[] = [
  {
    title: "The Astral Orrery",
    category: "WebGL Simulation",
    description:
      "Interactive celestial cartography application displaying orbital mechanics, star charts, and real-time planetary ephemeris.",
    tags: ["Three.js", "R3F", "GLSL", "Next.js"],
  },
  {
    title: "Sanctum Architecture",
    category: "Full-Stack Platform",
    description:
      "Resilient distributed system designed for real-time collaborative manuscript editing with end-to-end conflict resolution.",
    tags: ["TypeScript", "Next.js", "Tailwind", "WebSockets"],
  },
  {
    title: "Chronicle of Runes",
    category: "Design System",
    description:
      "A comprehensive design token repository and accessible component library inspired by neoclassical academia.",
    tags: ["Design Systems", "Accessibility", "Tailwind CSS"],
  },
];

export const Projects: React.FC = () => {
  return (
    <section
      id="projects"
      aria-label="Projects"
      className="py-24 px-6 max-w-6xl mx-auto border-t border-gold/15"
    >
      <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
        <span className="font-cinzel text-xs uppercase tracking-[0.25em] text-gold">
          Chapter II
        </span>
        <h2 className="font-cinzel text-3xl sm:text-4xl text-parchment font-bold">
          The Great Works
        </h2>
        <p className="font-inter text-parchment/75 text-sm sm:text-base">
          Selected artifacts and digital instruments forged through code, design, and experimental engineering.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {sampleProjects.map((project, idx) => (
          <article
            key={idx}
            className="flex flex-col justify-between p-6 rounded-2xl bg-navy/70 border border-gold/20 hover:border-gold/50 transition-colors duration-300 shadow-lg group"
          >
            <div className="space-y-4">
              <span className="font-cinzel text-xs text-gold/80 tracking-wider uppercase">
                {project.category}
              </span>
              <h3 className="font-cinzel text-xl text-parchment font-semibold group-hover:text-gold transition-colors">
                {project.title}
              </h3>
              <p className="font-inter text-sm text-parchment/70 leading-relaxed">
                {project.description}
              </p>
            </div>

            <div className="pt-6 space-y-4">
              <div className="flex flex-wrap gap-2">
                {project.tags.map((t) => (
                  <span
                    key={t}
                    className="text-xs px-2.5 py-1 rounded-md bg-gold/10 text-gold font-inter border border-gold/20"
                  >
                    {t}
                  </span>
                ))}
              </div>
              <Button variant="ghost" className="w-full justify-center">
                Inspect Codex →
              </Button>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

export default Projects;
