import React from "react";

interface SkillCategory {
  discipline: string;
  proficiencies: string[];
}

const skillSets: SkillCategory[] = [
  {
    discipline: "Visual Sorcery & 3D",
    proficiencies: ["Three.js", "React Three Fiber", "Drei", "GLSL Shaders", "Postprocessing", "GSAP", "Lenis", "Framer Motion"],
  },
  {
    discipline: "Core Architecture",
    proficiencies: ["Next.js (App Router)", "TypeScript", "React 19", "Tailwind CSS v4", "Node.js", "REST & GraphQL"],
  },
  {
    discipline: "Scholarly Principles",
    proficiencies: ["Semantic HTML & WCAG", "Responsive Craft", "Reduced Motion Systems", "Bundle Optimization", "Git & CI/CD"],
  },
];

export const Skills: React.FC = () => {
  return (
    <section
      id="skills"
      aria-label="Skills"
      className="py-24 px-6 max-w-5xl mx-auto border-t border-gold/15"
    >
      <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
        <span className="font-cinzel text-xs uppercase tracking-[0.25em] text-gold">
          Chapter III
        </span>
        <h2 className="font-cinzel text-3xl sm:text-4xl text-parchment font-bold">
          Disciplines of Mastery
        </h2>
        <p className="font-inter text-parchment/75 text-sm sm:text-base">
          A catalogue of specialized languages, systems, and creative tools wielded across projects.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {skillSets.map((set, idx) => (
          <div
            key={idx}
            className="p-6 rounded-2xl bg-navy/50 border border-gold/20 flex flex-col gap-4"
          >
            <h3 className="font-cinzel text-lg text-gold font-semibold tracking-wide">
              {set.discipline}
            </h3>
            <ul className="space-y-2">
              {set.proficiencies.map((item) => (
                <li
                  key={item}
                  className="font-inter text-sm text-parchment/80 flex items-center gap-2"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-gold/60" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Skills;
