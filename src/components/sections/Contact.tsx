"use client";

import React from "react";
import { content } from "@/lib/content";
import { Button } from "@/components/ui/Button";
import { MotionReveal } from "@/components/ui/MotionReveal";
import { InkHeading } from "@/components/ui/InkHeading";
import { WaxSeal } from "@/components/ui/WaxSeal";

export const Contact: React.FC = () => {
  const { contact, profile } = content;

  return (
    <section
      id="contact"
      aria-label="Contact Section"
      className="py-24 px-6 max-w-5xl mx-auto rune-bg text-center relative"
    >
      <div className="space-y-12 max-w-3xl mx-auto">
        {/* Section Header with Ink Reveal */}
        <MotionReveal>
          <div className="inline-flex items-center gap-2 mb-3">
            <span className="font-cinzel text-xs uppercase tracking-[0.25em] text-candle font-semibold">
              {contact.storyTitle}
            </span>
            <span className="text-gold/40" aria-hidden="true">
              /
            </span>
            <span className="font-inter text-xs text-parchment/70">
              {contact.subtitle}
            </span>
          </div>
          <InkHeading className="font-cinzel text-3xl sm:text-5xl text-parchment font-bold tracking-tight mb-4">
            Dispatch a Missive
          </InkHeading>
          <p className="font-cormorant text-xl sm:text-2xl text-candle/90 italic max-w-2xl mx-auto">
            {contact.narrative}
          </p>
        </MotionReveal>

        {/* Message Card with Parchment & Wax Seal */}
        <MotionReveal delay={0.15}>
          <div className="parchment-card p-8 sm:p-12 rounded-2xl border border-gold/35 shadow-2xl space-y-8 relative overflow-hidden">
            <div className="absolute top-6 right-6">
              <WaxSeal label="OWL" />
            </div>

            <div className="space-y-4">
              <p className="font-inter text-base sm:text-lg text-parchment/90 leading-relaxed max-w-xl mx-auto">
                {contact.closingMessage}
              </p>
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-forest/25 border border-forest/60 text-xs text-emerald-300 font-medium">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" aria-hidden="true" />
                <span>{contact.availability}</span>
              </div>
            </div>

            {/* Channels & Action Grid */}
            <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
              <Button
                variant="primary"
                href={`mailto:${profile.email}`}
                className="w-full sm:w-auto"
              >
                Send Direct Email ({profile.email})
              </Button>

              <Button
                variant="secondary"
                href={profile.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto"
              >
                {contact.resumeLabel}
              </Button>
            </div>

            {/* Social / Profiles */}
            <div className="pt-6 border-t border-gold/20 flex items-center justify-center gap-6">
              <a
                href={profile.github}
                target="_blank"
                rel="noopener noreferrer"
                className="font-inter text-xs sm:text-sm text-parchment/75 hover:text-candle transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold rounded px-2 py-1"
              >
                GitHub Codex ↗
              </a>
              <span className="text-gold/40" aria-hidden="true">
                •
              </span>
              <a
                href={profile.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="font-inter text-xs sm:text-sm text-parchment/75 hover:text-candle transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold rounded px-2 py-1"
              >
                LinkedIn Network ↗
              </a>
            </div>
          </div>
        </MotionReveal>
      </div>
    </section>
  );
};

export default Contact;
