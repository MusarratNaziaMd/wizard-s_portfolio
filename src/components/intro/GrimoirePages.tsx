"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { content } from "@/lib/content";
import { Button } from "@/components/ui/Button";

export interface GrimoirePagesProps {
  isPageTurned: boolean;
  onEnter: () => void;
  reducedMotion: boolean;
}

export const GrimoirePages: React.FC<GrimoirePagesProps> = ({
  isPageTurned,
  onEnter,
  reducedMotion,
}) => {
  const { profile, intro } = content;

  return (
    <div className="absolute inset-0 z-30 flex items-center justify-center pointer-events-none px-4">
      <div
        className="relative w-full max-w-[820px] h-[440px] sm:h-[480px] grid grid-cols-2 gap-4 sm:gap-8 pointer-events-auto"
        style={{
          transform: "translateY(22px) rotateX(12deg)",
          transformStyle: "preserve-3d",
        }}
      >
        <AnimatePresence mode="wait">
          {!isPageTurned ? (
            /* ============================================================ */
            /* SPREAD 1: TITLE & VISITOR NAME REVEAL                         */
            /* ============================================================ */
            <motion.div
              key="spread-1"
              initial={reducedMotion ? { opacity: 1 } : { opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={reducedMotion ? { opacity: 0 } : { opacity: 0, x: -20 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="contents"
            >
              {/* LEFT PAGE: Gold Line-Art Classical Seal (SVG Circle, Star, MN Letters) */}
              <div className="flex flex-col items-center justify-center text-center p-6 sm:p-8 border-r border-[#c9a24b]/20 relative">
                {/* SVG Line-Art Celestial Ornament */}
                <div className="relative w-28 h-28 sm:w-36 sm:h-36 mb-4 flex items-center justify-center">
                  <svg
                    viewBox="0 0 160 160"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-full h-full text-gold drop-shadow-[0_0_8px_rgba(201,162,75,0.45)]"
                    aria-hidden="true"
                  >
                    {/* Outer beaded ring */}
                    <circle
                      cx="80"
                      cy="80"
                      r="74"
                      stroke="#c9a24b"
                      strokeWidth="1.5"
                      strokeDasharray="3 3"
                    />
                    {/* Primary boundary ring */}
                    <circle cx="80" cy="80" r="68" stroke="#d4af37" strokeWidth="2" />
                    {/* Inner fine ring */}
                    <circle cx="80" cy="80" r="62" stroke="#c9a24b" strokeWidth="1" strokeOpacity="0.6" />
                    {/* 8-point celestial star line art */}
                    <path
                      d="M80 16 L84 64 L132 80 L84 96 L80 144 L76 96 L28 80 L76 64 Z"
                      stroke="#e6c46a"
                      strokeWidth="1.2"
                      fill="rgba(201, 162, 75, 0.04)"
                    />
                    <path
                      d="M80 34 L83 67 L116 80 L83 93 L80 126 L77 93 L44 80 L77 67 Z"
                      stroke="#c9a24b"
                      strokeWidth="0.8"
                      strokeOpacity="0.7"
                    />
                    {/* Center ring containing MN ligature */}
                    <circle cx="80" cy="80" r="28" stroke="#d4af37" strokeWidth="1.5" fill="#14060b" />
                    <text
                      x="80"
                      y="87"
                      textAnchor="middle"
                      fill="#e6c46a"
                      fontFamily="Cinzel, serif"
                      fontSize="22"
                      fontWeight="bold"
                      letterSpacing="2"
                    >
                      {intro.monogram}
                    </text>
                  </svg>
                </div>

                {/* Classical ornament typography */}
                <div className="text-gold/90 text-sm tracking-[0.35em] font-cinzel mb-2">
                  {intro.ornament}
                </div>
                <p className="font-cormorant italic text-sm sm:text-base text-parchment/75 tracking-wider">
                  Sanctum Archival Grimoire
                </p>
                <div className="w-20 h-px bg-gradient-to-r from-transparent via-gold/50 to-transparent mt-3" />
              </div>

              {/* RIGHT PAGE: Inscribed Name & Role with Ink Reveal */}
              <div className="flex flex-col items-center justify-center text-center p-6 sm:p-8">
                <motion.div
                  initial={reducedMotion ? { opacity: 1 } : { opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.9, delay: 0.3 }}
                >
                  <p className="font-cormorant italic text-base sm:text-lg text-candle mb-1 tracking-wide">
                    Inscribed for
                  </p>
                  <h1
                    id="intro-name-element"
                    className="font-cinzel text-2xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-gold via-parchment to-gold drop-shadow-[0_2px_14px_rgba(201,162,75,0.45)] mb-3 leading-tight"
                  >
                    {profile.name}
                  </h1>
                </motion.div>

                {/* Role with ink-writing reveal */}
                <motion.div
                  initial={reducedMotion ? { clipPath: "inset(0 0% 0 0)" } : { clipPath: "inset(0 100% 0 0)" }}
                  animate={{ clipPath: "inset(0 0% 0 0)" }}
                  transition={{ duration: 1.4, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
                  className="overflow-hidden"
                >
                  <p className="font-cinzel text-xs sm:text-sm tracking-[0.2em] uppercase font-semibold text-parchment/90">
                    {profile.role}
                  </p>
                </motion.div>

                <div className="flex items-center gap-2 my-4 text-gold/40 text-xs">
                  <span>✦</span>
                  <div className="w-20 h-px bg-gold/30" />
                  <span>✦</span>
                </div>

                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.7 }}
                  transition={{ duration: 0.8, delay: 1.3 }}
                  className="font-cormorant italic text-xs sm:text-sm text-candle/80"
                >
                  Opening pages of the journey...
                </motion.p>
              </div>
            </motion.div>
          ) : (
            /* ============================================================ */
            /* SPREAD 2: FOUNDATIONS & ENTER BUTTON                          */
            /* ============================================================ */
            <motion.div
              key="spread-2"
              initial={reducedMotion ? { opacity: 1 } : { opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="contents"
            >
              {/* Left Page: Overview Bio */}
              <div className="flex flex-col justify-center p-6 sm:p-8 border-r border-[#c9a24b]/20 space-y-4">
                <span className="font-cinzel text-xs uppercase tracking-widest text-candle">
                  Foundations
                </span>
                <h2 className="font-cinzel text-lg sm:text-xl font-bold text-parchment leading-snug">
                  {intro.page2Line1}
                </h2>
                <p className="font-inter text-xs sm:text-sm text-parchment/85 leading-relaxed">
                  {intro.page2Line2}
                </p>
              </div>

              {/* Right Page: Core Skills & Enter Grimoire */}
              <div className="flex flex-col justify-center items-center text-center p-6 sm:p-8 space-y-6">
                <div>
                  <span className="font-cinzel text-xs uppercase tracking-widest text-candle block mb-3">
                    Core Runes &amp; Disciplines
                  </span>
                  <div className="flex flex-wrap justify-center gap-2">
                    {intro.page2Skills.map((skill, index) => (
                      <span
                        key={index}
                        className="text-xs font-inter font-medium text-parchment bg-[#0b1030]/80 border border-gold/40 px-2.5 py-1 rounded-full shadow-sm"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Enter Button */}
                <div className="pt-2">
                  <Button variant="primary" onClick={onEnter}>
                    {intro.enterButton}
                  </Button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default GrimoirePages;
