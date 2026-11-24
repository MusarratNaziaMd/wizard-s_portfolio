import { Navbar } from "@/components/ui/Navbar";
import { ScrollProgress } from "@/components/ui/ScrollProgress";
import { SmoothScroll } from "@/components/ui/SmoothScroll";
import { IntroOverlay } from "@/components/intro/IntroOverlay";
import { SectionDivider } from "@/components/ui/SectionDivider";
import { ChapterRail } from "@/components/ui/ChapterRail";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Experience } from "@/components/sections/Experience";
import { Skills } from "@/components/sections/Skills";
import { Projects } from "@/components/sections/Projects";
import { Achievements } from "@/components/sections/Achievements";
import { Contact } from "@/components/sections/Contact";
import { content } from "@/lib/content";

export default function Home() {
  return (
    <SmoothScroll>
      <div className="min-h-screen bg-navy text-parchment flex flex-col selection:bg-gold/30 selection:text-gold relative">
        <IntroOverlay />
        <ScrollProgress />
        <ChapterRail />
        <Navbar />
        <main className="flex-1 flex flex-col bg-[#080c1a] relative z-20">
          <Hero />
          <SectionDivider />
          <About />
          <SectionDivider />
          <Experience />
          <SectionDivider />
          <Skills />
          <SectionDivider />
          <Projects />
          <SectionDivider />
          <Achievements />
          <SectionDivider />
          <Contact />
        </main>

        {/* Scholarly Footer with original "MN" monogram shield and "Code. Create. Conjure." */}
        <footer className="border-t border-gold/20 py-16 px-6 text-center text-xs font-cinzel text-parchment/70 space-y-4 bg-[#070a16] relative z-20">
          <div className="flex justify-center">
            {/* Original "MN" Monogram Shield (Bespoke SVG) */}
            <div className="w-14 h-16 rounded-b-2xl border-2 border-gold/50 bg-midnight/90 flex items-center justify-center shadow-[0_0_15px_rgba(201,162,75,0.25)]">
              <svg
                viewBox="0 0 60 70"
                className="w-10 h-12 text-gold"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                {/* Shield Contour */}
                <path
                  d="M30 4 L54 12 V38 C54 52 30 66 30 66 C30 66 6 52 6 38 V12 Z"
                  stroke="#c9a24b"
                  strokeWidth="2"
                  fill="rgba(11, 16, 48, 0.8)"
                />
                {/* Inner Border */}
                <path
                  d="M30 9 L49 16 V36 C49 48 30 59 30 59 C30 59 11 48 11 36 V16 Z"
                  stroke="#d4af37"
                  strokeWidth="1"
                  strokeOpacity="0.5"
                />
                {/* MN Monogram Typography */}
                <text
                  x="30"
                  y="40"
                  textAnchor="middle"
                  fill="#ffeaad"
                  fontFamily="Cinzel, serif"
                  fontSize="15"
                  fontWeight="bold"
                  letterSpacing="1"
                >
                  {content.profile.initials}
                </text>
              </svg>
            </div>
          </div>

          <p className="font-cormorant italic text-lg sm:text-xl text-candle tracking-wide">
            &ldquo;Code. Create. Conjure.&rdquo;
          </p>

          <p className="font-cinzel text-xs text-parchment/60">
            &copy; 2026 {content.profile.name}. All rites reserved.
          </p>
          <p className="font-inter text-[11px] text-parchment/40">
            Engineered with Next.js App Router, TypeScript, and Tailwind CSS.
          </p>
        </footer>
      </div>
    </SmoothScroll>
  );
}
