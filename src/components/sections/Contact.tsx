"use client";

import React from "react";
import { content } from "@/lib/content";
import { Button } from "@/components/ui/Button";
import { MotionReveal } from "@/components/ui/MotionReveal";

export const Contact: React.FC = () => {
  const { contact, profile } = content;

  return (
    <section
      id="contact"
      aria-label="Contact Section"
      className="py-24 px-6 max-w-5xl mx-auto border-b border-gold/15 text-center"
    >
      <div className="space-y-12 max-w-3xl mx-auto">
        {/* Section Header */}
        <MotionReveal>
          <div className="inline-flex items-center gap-2 mb-3">
            <span className="font-cinzel text-xs uppercase tracking-[0.25em] text-gold font-semibold">
              {contact.storyTitle}
            </span>
            <span className="text-gold/40" aria-hidden="true">
              /
            </span>
            <span className="font-inter text-xs text-parchment/70">
              {contact.subtitle}
            </span>
          </div>
          <h2 className="font-cinzel text-3xl sm:text-5xl text-parchment font-bold tracking-tight mb-4">
            Dispatch a Missive
          </h2>
          <p className="font-cormorant text-xl sm:text-2xl text-gold/90 italic max-w-2xl mx-auto">
            {contact.narrative}
          </p>
        </MotionReveal>

        {/* Message Card */}
        <MotionReveal delay={0.15}>
          <div className="p-8 sm:p-10 rounded-2xl bg-[#0e1424] border border-gold/30 shadow-2xl space-y-8 relative overflow-hidden">
            <div className="space-y-4">
              <p className="font-inter text-base sm:text-lg text-parchment/85 leading-relaxed">
                {contact.closingMessage}
              </p>
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gold/10 border border-gold/25 text-xs text-gold font-medium">
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
            <div className="pt-4 border-t border-gold/15 flex items-center justify-center gap-6">
              <a
                href={profile.github}
                target="_blank"
                rel="noopener noreferrer"
                className="font-inter text-xs sm:text-sm text-parchment/75 hover:text-gold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold rounded px-2 py-1"
              >
                GitHub Codex ↗
              </a>
              <span className="text-gold/30" aria-hidden="true">
                •
              </span>
              <a
                href={profile.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="font-inter text-xs sm:text-sm text-parchment/75 hover:text-gold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold rounded px-2 py-1"
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
