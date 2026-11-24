import { Navbar } from "@/components/ui/Navbar";
import { ScrollProgress } from "@/components/ui/ScrollProgress";
import { SmoothScroll } from "@/components/ui/SmoothScroll";
import { IntroOverlay } from "@/components/intro/IntroOverlay";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Skills } from "@/components/sections/Skills";
import { Projects } from "@/components/sections/Projects";
import { Experience } from "@/components/sections/Experience";
import { Contact } from "@/components/sections/Contact";
import { content } from "@/lib/content";

export default function Home() {
  return (
    <SmoothScroll>
      <div className="min-h-screen bg-navy text-parchment flex flex-col selection:bg-gold/30 selection:text-gold relative">
        <IntroOverlay />
        <ScrollProgress />
        <Navbar />
        <main className="flex-1 flex flex-col">
          <Hero />
          <About />
          <Skills />
          <Projects />
          <Experience />
          <Contact />
        </main>
        <footer className="border-t border-gold/15 py-10 text-center text-xs font-cinzel text-parchment/60 space-y-2">
          <p>© 2026 {content.profile.name}. All rites reserved.</p>
          <p className="font-inter text-[11px] text-parchment/40">
            Forged in TypeScript, Next.js, and Tailwind CSS.
          </p>
        </footer>
      </div>
    </SmoothScroll>
  );
}
