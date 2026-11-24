// TODO confirm: All marked entries represent real candidate data awaiting user URL / handle confirmation.

export interface Profile {
  name: string;
  initials: string;
  role: string;
  tagline: string;
  email: string; // TODO confirm
  linkedin: string; // TODO confirm
  github: string; // TODO confirm
  resumeUrl: string; // TODO confirm
}

export interface ValueItem {
  title: string;
  description: string;
}

export interface AboutContent {
  chapter: string;
  storyTitle: string;
  subtitle: string;
  storyLine: string;
  narrative: string;
  paragraphs: string[];
  values: ValueItem[];
  profileImage: string; // TODO confirm
}

export interface SkillCategory {
  category: string;
  description: string;
  items: string[];
}

export interface ProjectItem {
  id: string;
  title: string;
  role: string;
  description: string;
  problem: string;
  solution: string;
  techStack: string[];
  result: string;
  liveUrl: string; // TODO confirm
  repoUrl: string; // TODO confirm
  image: string; // TODO confirm
}

export interface ExperienceItem {
  id: string;
  title: string;
  org: string;
  period: string; // TODO confirm
  summary: string;
  highlights: string[];
}

export interface AchievementItem {
  id: string;
  title: string;
  org: string;
  description: string;
  badge?: string; // TODO confirm
}

export interface IntroContent {
  hint: string;
  skipButton: string;
  enterButton: string;
  wandAriaLabel: string;
  monogram: string;
  ornament: string;
  page2Line1: string;
  page2Line2: string;
  page2Skills: string[];
  orbAriaLabel?: string;
  spellCasting?: string;
}

export interface SectionMeta {
  chapter?: string;
  storyTitle: string;
  subtitle: string;
  storyLine?: string;
  narrative: string;
}

export interface ContentData {
  intro: IntroContent;
  profile: Profile;
  hero: SectionMeta & {
    greeting: string;
    ctaExplore: string;
    ctaResume: string;
    ctaProjects: string;
    ctaContact: string;
    skillChips: string[];
  };
  about: AboutContent;
  experience: SectionMeta & {
    items: ExperienceItem[];
  };
  skills: SectionMeta & {
    groups: SkillCategory[];
    allSkills: string[];
  };
  projects: SectionMeta & {
    items: ProjectItem[];
  };
  achievements: SectionMeta & {
    items: AchievementItem[];
  };
  contact: SectionMeta & {
    closingMessage: string;
    resumeLabel: string;
    availability: string;
  };
}

export const content: ContentData = {
  // Intro grimoire parameters
  intro: {
    hint: "Touch the book with the wand.",
    skipButton: "Skip Intro",
    enterButton: "Enter",
    wandAriaLabel: "Open the book with the wand",
    monogram: "MN",
    ornament: "✦ ❖ ✦",
    page2Line1: "Software Developer | AI & Full-Stack",
    page2Line2: "Turning ideas into magical digital experiences.",
    page2Skills: ["Python", "React", "AI / ML", "Generative AI"],
    orbAriaLabel: "Open the book",
    spellCasting: "The grimoire opens. Welcome to the sanctum.",
  },

  // Candidate Personal Profile
  profile: {
    name: "Mohammad Musarrat Nazia",
    initials: "MN",
    role: "Software Developer | AI & Full-Stack",
    tagline: "Turning ideas into magical digital experiences",
    email: "nazia.dev@example.com", // TODO confirm: replace with real email
    linkedin: "https://linkedin.com/in/TODO", // TODO confirm: replace with real LinkedIn URL
    github: "https://github.com/TODO", // TODO confirm: replace with real GitHub URL
    resumeUrl: "/resume.pdf", // TODO confirm: place real resume PDF in public/
  },

  // Hero / Prologue
  hero: {
    chapter: "Prologue",
    storyTitle: "The Awakening",
    subtitle: "Digital Sorcery & Software Engineering",
    storyLine: "Turning ideas into magical digital experiences.",
    narrative: "Turning ideas into magical digital experiences.",
    greeting: "Hello, I'm",
    ctaExplore: "Explore The Quests",
    ctaResume: "Download Resume",
    ctaProjects: "Explore The Quests",
    ctaContact: "Dispatch Missive",
    skillChips: ["Python", "React", "AI / ML", "Generative AI"], // TODO confirm
  },

  // Chapter I "The Spark" - About
  about: {
    chapter: "Chapter I",
    storyTitle: "The Spark",
    subtitle: "Curiosity, Academics & Digital Craft",
    storyLine: "Always curious. Always coding.",
    narrative: "Always curious. Always coding.",
    paragraphs: [
      "I am a curiosity-driven B.Tech Information Technology graduate passionate about transforming complex computational ideas into elegant, reliable digital realities.",
      "My journey began with an insatiable appetite to understand how systems tick under the hood. From low-level algorithmic logic to high-level neural networks and reactive user interfaces, I approach software engineering as an art form rooted in discipline, continuous learning, and creative problem-solving.",
      "Whether developing responsive cross-platform web and mobile experiences or engineering intelligent voice and language systems, I thrive on writing clean, purposeful code that delivers real human impact.",
    ],
    values: [
      {
        title: "Perpetual Curiosity",
        description: "Technology moves fast. Approaching every architectural challenge with humility and a researcher's mind ensures continuous growth.",
      },
      {
        title: "Rigorous Engineering",
        description: "From data structures to UI rendering loops, writing clean, tested, and self-documenting code is a non-negotiable principle.",
      },
      {
        title: "Human-Centric Impact",
        description: "Code and machine learning models are runes; their ultimate purpose is to solve genuine problems and create delightfully intuitive experiences.",
      },
    ],
    profileImage: "/images/about/profile.webp", // TODO confirm: place portrait image at public/images/about/profile.webp
  },

  // Chapter II "The Apprenticeship" - Experience
  experience: {
    chapter: "Chapter II",
    storyTitle: "The Apprenticeship",
    subtitle: "Guild Internships & Real-World Craft",
    storyLine: "Forging craft through real-world guild challenges.",
    narrative: "Forging craft through real-world guild challenges.",
    items: [
      {
        id: "exp-incux",
        title: "Software Developer Intern",
        org: "Incux",
        period: "Apr 2026 – Present", // TODO confirm
        summary: "Developed modern responsive web applications and a mobile app, contributed to core features of JobMatch, and coordinated Campus Recruitment Training (CRT).",
        highlights: [
          "Developed and deployed responsive web interfaces and cross-platform mobile app components with modern web tooling.",
          "Collaborated directly on JobMatch platform capabilities, streamlining candidate-opportunity workflows.",
          "Led and managed CRT coordination, organizing structured technical workshops and mentoring student peers.",
        ],
      },
      {
        id: "exp-infosys",
        title: "AI/ML Intern",
        org: "Infosys Springboard",
        period: "Sep – Nov 2025", // TODO confirm
        summary: "Engineered an intelligent conversational IVR system integrating Natural Language Understanding (NLU) and real-time sentiment analysis.",
        highlights: [
          "Built conversational AI pipelines to transcribe audio, interpret caller intents, and extract emotional sentiment in real time.",
          "Integrated NLU models into interactive voice workflows to drastically reduce misrouted inquiries.",
          "Developed automated logging and telemetry dashboards to evaluate system accuracy and conversational flow latency.",
        ],
      },
    ],
  },

  // Chapter III "The Spellbook" - Skills
  skills: {
    chapter: "Chapter III",
    storyTitle: "The Spellbook",
    subtitle: "Languages, Modern Frameworks & Machine Intelligence",
    storyLine: "A disciplined compendium of languages, frameworks, and modern intelligence systems.",
    narrative: "A disciplined compendium of languages, frameworks, and modern intelligence systems.",
    allSkills: [
      "Python",
      "Java",
      "JavaScript",
      "React",
      "Node.js",
      "Machine Learning",
      "NLP",
      "GenAI",
      "Supabase",
      "Git & GitHub",
    ],
    groups: [
      {
        category: "Languages & Core",
        description: "Versatile foundations for scalable software and systems logic.",
        items: ["Python", "Java", "JavaScript", "TypeScript"],
      },
      {
        category: "Frameworks & Web",
        description: "Modern client and server architectures delivering reactive performance.",
        items: ["React", "Next.js", "Node.js", "Tailwind CSS"],
      },
      {
        category: "AI, Data & Infrastructure",
        description: "Machine learning, language intelligence, and cloud backend solutions.",
        items: ["Machine Learning", "NLP", "GenAI", "Supabase", "Git & GitHub"],
      },
    ],
  },

  // Chapter IV "The Quests" - Projects
  projects: {
    chapter: "Chapter IV",
    storyTitle: "The Quests",
    subtitle: "Production Projects & Artificial Intelligence Systems",
    storyLine: "Forged artifacts solving tangible problems with code and artificial intelligence.",
    narrative: "Forged artifacts solving tangible problems with code and artificial intelligence.",
    items: [
      {
        id: "jobmatch",
        title: "JobMatch",
        role: "Full-Stack Developer",
        description: "A modern job-matching platform and mobile application connecting talent with tailored career opportunities.",
        problem: "Job hunters face cumbersome application processes and overwhelming, unfocused job feeds with low relevancy.",
        solution: "Engineered an intelligent matching platform featuring a clean responsive web interface, mobile app integration, and streamlined candidate-job matching algorithms.",
        techStack: ["React", "Python", "Supabase", "Node.js", "AI / ML"],
        result: "Provided rapid filtering, intuitive mobile navigation, and seamless profile-to-job recommendation workflows.",
        liveUrl: "https://example.com/jobmatch", // TODO confirm: replace with real demo URL
        repoUrl: "https://github.com/TODO/jobmatch", // TODO confirm: replace with real repository URL
        image: "/images/projects/jobmatch.webp", // TODO confirm: place project screenshot at public/images/projects/jobmatch.webp
      },
      {
        id: "ai-conversational-ivr",
        title: "AI Conversational IVR",
        role: "AI / ML Engineer",
        description: "Intelligent interactive voice response system powered by real-time transcription, Natural Language Understanding, and sentiment analysis.",
        problem: "Legacy touch-tone IVR systems are rigid, causing caller frustration and high transfer rates due to misinterpreted requests.",
        solution: "Architected a conversational voice pipeline with NLU intent recognition and real-time sentiment scoring to dynamically adapt responses.",
        techStack: ["Python", "NLP", "GenAI", "Machine Learning", "Node.js"],
        result: "Delivered sub-second transcript processing with accurate caller emotion detection and adaptive intent routing.",
        liveUrl: "https://example.com/ai-ivr", // TODO confirm: replace with real demo URL
        repoUrl: "https://github.com/TODO/ai-conversational-ivr", // TODO confirm: replace with real repository URL
        image: "/images/projects/ivr.webp", // TODO confirm: place project screenshot at public/images/projects/ivr.webp
      },
    ],
  },

  // Chapter V "The Honours" - Achievements
  achievements: {
    chapter: "Chapter V",
    storyTitle: "The Honours",
    subtitle: "Distinctions, Competitions & Research Accolades",
    storyLine: "Distinctions earned along the scholarly and competitive path.",
    narrative: "Distinctions earned along the scholarly and competitive path.",
    items: [
      {
        id: "sih-top6",
        title: "Smart India Hackathon (SIH) — Top 6",
        org: "Ministry of Education & AICTE",
        description: "Achieved Top 6 national standing among thousands of collegiate teams for engineering innovative computational solutions under rigorous hackathon conditions.",
        badge: "National Finalist", // TODO confirm
      },
      {
        id: "research-scopus",
        title: "Research Publication (JETIR + Scopus)",
        org: "Journal of Emerging Technologies and Innovative Research",
        description: "Authored and published peer-reviewed scholarly research indexed in JETIR and recognized in Scopus academic databases.",
        badge: "Published Author", // TODO confirm
      },
      {
        id: "quantum-valley",
        title: "Quantum Valley AP — Semifinalist",
        org: "Quantum Valley Innovation Initiative",
        description: "Reached semifinalist status in competitive technological innovation challenges for breakthrough digital concept design.",
        badge: "Semifinalist", // TODO confirm
      },
      {
        id: "wipro-scholar",
        title: "Wipro TalentNext Scholar",
        org: "Wipro Certified Digital Skills",
        description: "Honoured as a certified Wipro TalentNext Scholar upon completing rigorous training in advanced Java, algorithms, and full-stack software methodologies.",
        badge: "Certified Scholar", // TODO confirm
      },
    ],
  },

  // Epilogue "The Owl Post" - Contact
  contact: {
    chapter: "Epilogue",
    storyTitle: "The Owl Post",
    subtitle: "Direct Dispatch & Missives",
    storyLine: "Let's build something amazing together.",
    narrative: "Let's build something amazing together.",
    closingMessage: "Let's build something amazing together. Whether you have an exciting software challenge, an AI venture, or wish to connect, my inbox is always open.",
    resumeLabel: "Download Resume (PDF)",
    availability: "Available for Software Developer and AI & Full-Stack roles.",
  },
};
