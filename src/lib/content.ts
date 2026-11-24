// SAMPLE: replace with real details

export interface Profile {
  name: string;
  role: string;
  tagline: string;
  email: string;
  linkedin: string;
  github: string;
  resumeUrl: string;
}

export interface ValueItem {
  title: string;
  description: string;
}

export interface AboutContent {
  storyTitle: string;
  subtitle: string;
  narrative: string;
  paragraphs: string[];
  values: ValueItem[];
}

export interface SkillCategory {
  category: "Frontend" | "Backend" | "Tools";
  description: string;
  items: string[];
}

export interface ProjectItem {
  id: string;
  title: string;
  role: string;
  problem: string;
  solution: string;
  techStack: string[];
  result: string;
  liveUrl: string;
  repoUrl: string;
}

export interface ExperienceItem {
  id: string;
  title: string;
  org: string;
  period: string;
  summary: string;
  highlights: string[];
}

export interface SectionMeta {
  storyTitle: string;
  subtitle: string;
  narrative: string;
}

export interface ContentData {
  profile: Profile;
  hero: SectionMeta & {
    ctaProjects: string;
    ctaContact: string;
  };
  about: AboutContent;
  skills: SectionMeta & {
    groups: SkillCategory[];
  };
  projects: SectionMeta & {
    items: ProjectItem[];
  };
  experience: SectionMeta & {
    items: ExperienceItem[];
  };
  contact: SectionMeta & {
    closingMessage: string;
    resumeLabel: string;
    availability: string;
  };
}

export const content: ContentData = {
  // SAMPLE: replace with real details
  profile: {
    name: "Rowan Vance",
    role: "Senior Full-Stack Engineer & Systems Craftsman",
    tagline: "Architecting resilient web infrastructure, reactive interfaces, and scalable computational engines.",
    email: "rowan.vance@example.com",
    linkedin: "https://linkedin.com/in/example",
    github: "https://github.com/example",
    resumeUrl: "/resume.pdf",
  },

  hero: {
    storyTitle: "The Spark",
    subtitle: "Architecture & Creative Engineering",
    narrative: "Every enduring construct begins with a deliberate synthesis of structure, logic, and aesthetic discipline.",
    ctaProjects: "Explore The Quests",
    ctaContact: "Dispatch a Message",
  },

  about: {
    storyTitle: "The Origin",
    subtitle: "Who I am and what drives my craft",
    narrative: "Bridging the rigor of distributed systems with the nuance of human-centric interfaces.",
    paragraphs: [
      "I am a full-stack engineer dedicated to building software that endures. With over seven years of engineering experience across high-growth startups and established software institutions, my focus centers on resilient distributed systems, sub-second web performance, and expressive user experiences.",
      "My approach balances mechanical sympathy with mathematical elegance. I view modern software development much like classical scholarly research: systems require uncompromising structural foundations, transparent mental models, and relentless attention to operational telemetry.",
      "When not orchestrating microservices or fine-tuning WebGL rendering pipelines, I mentor junior developers, contribute to open-source tooling, and write technical essays dissecting systems design and interface ergonomics.",
    ],
    values: [
      {
        title: "Deterministic Architecture",
        description: "Systems should behave predictably under stress. I design architectures with strict boundaries, idempotent operations, and fault-tolerant failovers.",
      },
      {
        title: "Speed as a Moral Imperative",
        description: "Latency degrades human focus. Every millisecond saved across network boundaries and browser rendering loops honors the user's finite attention.",
      },
      {
        title: "Craft Over Expediency",
        description: "Technical debt is a compound tax. I champion clean abstractions, self-documenting codebases, and exhaustive end-to-end reliability.",
      },
    ],
  },

  skills: {
    storyTitle: "The Spellbook",
    subtitle: "Grouped technical proficiencies and tooling",
    narrative: "An inventory of battle-tested languages, frameworks, and operational platforms mastered through production practice.",
    groups: [
      {
        category: "Frontend",
        description: "Modern rendering engines, state machines, and performant web graphics.",
        items: [
          "TypeScript",
          "React 19 / Next.js (App Router)",
          "Three.js / React Three Fiber",
          "Tailwind CSS v4",
          "GSAP & Web Animations API",
          "WebGL & Custom GLSL Shaders",
          "HTML5 Semantic Architecture",
          "Web Accessibility (WCAG 2.1 AAA)",
        ],
      },
      {
        category: "Backend",
        description: "Scalable data ingestion pipelines, APIs, and persistent storage layers.",
        items: [
          "Node.js & Bun",
          "Go (Golang)",
          "PostgreSQL & Prisma",
          "Redis & Memory Caching",
          "RESTful APIs & GraphQL",
          "Distributed Event Streams (Kafka)",
          "WebSocket & Real-time Protocols",
          "Authentication & RBAC Security",
        ],
      },
      {
        category: "Tools",
        description: "Observability, infrastructure automation, and developer ergonomics.",
        items: [
          "Docker & Container Orchestration",
          "Git Version Control & CI/CD Pipelines",
          "Linux Environment Administration",
          "Vercel & AWS Cloud Architecture",
          "Vitest, Jest & Playwright Testing",
          "Turbopack & Webpack Build Tooling",
          "OpenTelemetry & Performance Tracing",
          "Figma to Code Systematic Design",
        ],
      },
    ],
  },

  projects: {
    storyTitle: "The Quests",
    subtitle: "Selected production milestones and technical studies",
    narrative: "Case studies demonstrating end-to-end engineering from architectural conception to verified impact.",
    items: [
      {
        id: "astral-orrery",
        title: "Astral Orrery Simulator",
        role: "Lead Graphics Engineer & System Architect",
        problem: "Simulating n-body gravitational mechanics and orbital telemetry in web browsers was computationally prohibitive for standard DOM and canvas solutions.",
        solution: "Architected a GPU-accelerated compute pipeline using WebGL instanced meshes and Three.js with custom GLSL shaders, running orbital trajectories off-thread via Web Workers.",
        techStack: ["TypeScript", "Three.js", "R3F", "GLSL", "Next.js", "Web Workers"],
        result: "Sustained locked 60 FPS across desktop and mobile devices while rendering 10,000 concurrent orbital bodies.",
        liveUrl: "https://example.com/astral-orrery",
        repoUrl: "https://github.com/example/astral-orrery",
      },
      {
        id: "chronicle-cms",
        title: "Chronicle Collaborative Engine",
        role: "Full-Stack Engineer",
        problem: "Distributed research teams faced data divergence and latency spikes during real-time document annotation across intermittent networks.",
        solution: "Implemented an offline-first Conflict-Free Replicated Data Type (CRDT) engine over WebSocket streams with local IndexedDB persistence and PostgreSQL sync.",
        techStack: ["Next.js", "TypeScript", "Node.js", "WebSockets", "CRDTs", "PostgreSQL"],
        result: "Reduced sync resolution conflicts to zero and decreased end-to-end peer mutation latency to under 35ms globally.",
        liveUrl: "https://example.com/chronicle-cms",
        repoUrl: "https://github.com/example/chronicle-cms",
      },
      {
        id: "aegis-telemetry",
        title: "Aegis Observability Gateway",
        role: "Backend & Infrastructure Engineer",
        problem: "High-throughput microservices produced over 40,000 metrics per second, overwhelming the centralized monitoring database.",
        solution: "Constructed a stream processing buffer in Go with backpressure buffering, Redis ring-buffers, and automated downsampling prior to long-term storage.",
        techStack: ["Go", "Redis", "Docker", "Prometheus", "Grafana", "TimescaleDB"],
        result: "Cut monitoring compute costs by 58% while maintaining sub-second alert dispatch on production anomalies.",
        liveUrl: "https://example.com/aegis-telemetry",
        repoUrl: "https://github.com/example/aegis-telemetry",
      },
      {
        id: "runic-design-system",
        title: "Runic Enterprise UI Kit",
        role: "Design Technologist & Lead Maintainer",
        problem: "A federated engineering organization suffered from fragmented UI standards, inconsistent accessibility, and code bloat across 12 product surfaces.",
        solution: "Authored an accessible, headless design system with tokenized Tailwind CSS themes, rigorous keyboard navigation traps, and automated visual regression testing.",
        techStack: ["React", "TypeScript", "Tailwind CSS", "Storybook", "Playwright", "npm"],
        result: "Adopted across all 12 products, reducing UI defect tickets by 72% and shaving 35% off feature frontend delivery cycles.",
        liveUrl: "https://example.com/runic-ui",
        repoUrl: "https://github.com/example/runic-ui",
      },
    ],
  },

  experience: {
    storyTitle: "The Apprenticeship",
    subtitle: "Professional chronicle and organizational impact",
    narrative: "A disciplined trajectory through specialized engineering roles, scaling systems, and elevating engineering standards.",
    items: [
      {
        id: "exp-1",
        title: "Staff Software Engineer",
        org: "Vanguard Systems Labs",
        period: "2023 – Present",
        summary: "Directing technical architecture for next-generation distributed data pipelines and client-facing analytical dashboards.",
        highlights: [
          "Spearheaded architectural transition to Next.js App Router and edge caching, cutting average TTFB by 42%.",
          "Mentored an engineering squad of 8 developers in advanced TypeScript patterns and automated testing disciplines.",
          "Instituted weekly architecture reviews and codified design RFC standards across engineering groups.",
        ],
      },
      {
        id: "exp-2",
        title: "Senior Full-Stack Developer",
        org: "Aetherial Media Labs",
        period: "2021 – 2023",
        summary: "Led frontend architecture and API service design for interactive 3D simulations and consumer media experiences.",
        highlights: [
          "Designed and delivered 4 high-traffic WebGL interactive campaigns handling 500k+ daily unique visitors.",
          "Engineered a resilient GraphQL orchestration gateway unifying 6 legacy microservices.",
          "Achieved 100/100 Lighthouse performance and accessibility benchmarks across flagship properties.",
        ],
      },
      {
        id: "exp-3",
        title: "Software Engineer",
        org: "Halcyon Core Technologies",
        period: "2019 – 2021",
        summary: "Engineered responsive client applications, RESTful microservices, and automated continuous delivery pipelines.",
        highlights: [
          "Developed core features for real-time collaboration dashboards using React and WebSocket transports.",
          "Authored unit and end-to-end integration test suites increasing automated test coverage from 44% to 91%.",
          "Optimized PostgreSQL query indexes and schema designs, reducing heavy query latencies by 60%.",
        ],
      },
    ],
  },

  contact: {
    storyTitle: "The Owl Post",
    subtitle: "Direct channels of dispatch and collaboration",
    narrative: "Open for technical leadership roles, architectural advisement, and ambitious full-stack ventures.",
    closingMessage: "Whether you seek to forge a new system architecture, optimize a high-stakes WebGL project, or consult on software strategy, my communication channel is directly available.",
    resumeLabel: "Download Curriculum Vitae (PDF)",
    availability: "Currently considering select opportunities for 2026.",
  },
};
