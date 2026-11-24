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
      className="scroll-mt-16 py-28 px-6 max-w-5xl mx-auto text-center relative z-20"
    >
      <div className="space-y-12 max-w-3xl mx-auto">
        {/* Section Header with Ink Reveal */}
        <MotionReveal>
          <div className="inline-flex items-center gap-2 mb-3">
            <span className="font-cinzel text-xs uppercase tracking-[0.25em] text-candle font-semibold">
              {contact.chapter}
            </span>
            <span className="text-gold/40" aria-hidden="true">
              /
            </span>
            <span className="font-inter text-xs text-parchment/70">
              {contact.subtitle}
            </span>
          </div>
          <InkHeading className="font-cinzel text-3xl sm:text-5xl text-parchment font-bold tracking-tight mb-4">
            {contact.storyTitle}: Send a Missive
          </InkHeading>
          <p className="font-cormorant text-xl sm:text-2xl text-candle/90 italic max-w-2xl mx-auto">
            &ldquo;{contact.storyLine}&rdquo;
          </p>
        </MotionReveal>

        {/* Envelope-Style Parchment Card with Wax Seal */}
        <MotionReveal delay={0.15}>
          <div className="parchment-card p-8 sm:p-12 rounded-3xl border border-gold/40 shadow-2xl space-y-8 relative overflow-hidden bg-[#0a0f24]/95">
            {/* Wax Seal Stamp in top right corner */}
            <div className="absolute top-6 right-6 z-10">
              <WaxSeal label="OWL" />
            </div>

            <div className="space-y-4 pt-2">
              <span className="text-xs font-cinzel tracking-widest text-candle uppercase block">
                {contact.availability}
              </span>
              <p className="font-inter text-base sm:text-lg text-parchment/90 leading-relaxed max-w-xl mx-auto">
                {contact.closingMessage}
              </p>
            </div>

            {/* Communication Actions: Email Missive + Download Resume */}
            <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
              <Button
                variant="primary"
                href={`mailto:${profile.email}`}
              >
                Send Missive (Email)
              </Button>
              <Button
                variant="secondary"
                href={profile.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                {contact.resumeLabel}
              </Button>
            </div>

            {/* Social Channels with SVG Icons (LinkedIn, GitHub, Email) */}
            <div className="pt-8 border-t border-gold/20 flex items-center justify-center gap-8 sm:gap-12 flex-wrap">
              {/* LinkedIn */}
              <a
                href={profile.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-2.5 font-cinzel text-xs tracking-wider text-parchment/75 hover:text-gold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold rounded p-1"
                aria-label="LinkedIn Profile"
              >
                <div className="w-8 h-8 rounded-full border border-gold/30 bg-midnight/80 flex items-center justify-center group-hover:border-gold group-hover:scale-110 transition-all">
                  <svg
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-4 h-4 text-gold"
                    aria-hidden="true"
                  >
                    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
                  </svg>
                </div>
                <span>LinkedIn</span>
              </a>

              {/* GitHub */}
              <a
                href={profile.github}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-2.5 font-cinzel text-xs tracking-wider text-parchment/75 hover:text-gold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold rounded p-1"
                aria-label="GitHub Profile"
              >
                <div className="w-8 h-8 rounded-full border border-gold/30 bg-midnight/80 flex items-center justify-center group-hover:border-gold group-hover:scale-110 transition-all">
                  <svg
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-4 h-4 text-gold"
                    aria-hidden="true"
                  >
                    <path d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.1-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2z" />
                  </svg>
                </div>
                <span>GitHub</span>
              </a>

              {/* Email */}
              <a
                href={`mailto:${profile.email}`}
                className="group flex items-center gap-2.5 font-cinzel text-xs tracking-wider text-parchment/75 hover:text-gold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold rounded p-1"
                aria-label="Direct Email"
              >
                <div className="w-8 h-8 rounded-full border border-gold/30 bg-midnight/80 flex items-center justify-center group-hover:border-gold group-hover:scale-110 transition-all">
                  <svg
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-4 h-4 text-gold"
                    aria-hidden="true"
                  >
                    <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
                  </svg>
                </div>
                <span>{profile.email}</span>
              </a>
            </div>
          </div>
        </MotionReveal>
      </div>
    </section>
  );
};

export default Contact;
