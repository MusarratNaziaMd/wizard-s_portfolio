import { Navbar } from "@/components/ui/Navbar";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Projects } from "@/components/sections/Projects";
import { Skills } from "@/components/sections/Skills";
import { Contact } from "@/components/sections/Contact";

export default function Home() {
  return (
    <div className="min-h-screen bg-navy text-parchment flex flex-col selection:bg-gold/30 selection:text-gold">
      <Navbar />
      <main className="flex-1 flex flex-col">
        <Hero />
        <About />
        <Projects />
        <Skills />
        <Contact />
      </main>
      <footer className="border-t border-gold/15 py-8 text-center text-xs font-cinzel text-parchment/60">
        <p>© 2026 Order of the Digital Sanctum. All rites reserved.</p>
      </footer>
    </div>
  );
}
