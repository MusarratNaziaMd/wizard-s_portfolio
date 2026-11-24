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
          transform: "translateY(18px) rotateX(12deg)",
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
              {/* LEFT PAGE: Classical Antique Ornament */}
              <div className="flex flex-col items-center justify-center text-center p-6 sm:p-8 border-r border-[#c9a24b]/15">
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full border border-gold/40 flex items-center justify-center mb-4 bg-midnight/40 shadow-inner">
                  <span className="font-cinzel text-gold text-lg sm:text-xl">
                    {intro.monogram}
                  </span>
                </div>
                <div className="text-gold/80 text-sm tracking-[0.3em] font-cinzel mb-2">
                  {intro.ornament}
                </div>
                <p className="font-cormorant italic text-sm sm:text-base text-parchment/60 tracking-wider">
                  Sanctum Archival Codex
                </p>
                <div className="w-16 h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent mt-4" />
              </div>

              {/* RIGHT PAGE: Inscribed Name & Role with Ink Writing Reveal */}
              <div className="flex flex-col items-center justify-center text-center p-6 sm:p-8">
                <motion.div
                  initial={reducedMotion ? { opacity: 1 } : { opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.9, delay: 0.3 }}
                >
                  <p className="font-cormorant italic text-base sm:text-lg text-candle mb-1 tracking-wide">
                    {intro.hint ? "Inscribed for" : ""}
                  </p>
                  <h1 className="font-cinzel text-2xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-gold via-parchment to-gold drop-shadow-[0_2px_12px_rgba(201,162,75,0.4)] mb-3 leading-tight">
                    {profile.name}
                  </h1>
                </motion.div>

                {/* Role with ink-writing reveal animation */}
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
                  transition={{ duration: 0.8, delay: 1.4 }}
                  className="font-inter text-xs text-parchment/70 italic"
                >
                  Turning page...
                </motion.p>
              </div>
            </motion.div>
          ) : (
            /* ============================================================ */
            /* SPREAD 2: DISCIPLINE PILLARS & ENTER BUTTON                   */
            /* ============================================================ */
            <motion.div
              key="spread-2"
              initial={reducedMotion ? { opacity: 1 } : { opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="contents"
            >
              {/* LEFT PAGE: Role & Bio summary */}
              <div className="flex flex-col items-center justify-center text-center p-6 sm:p-8 border-r border-[#c9a24b]/15">
                <span className="font-cinzel text-xs tracking-[0.25em] text-gold uppercase mb-2">
                  The Foundations
                </span>
                <h3 className="font-cinzel text-sm sm:text-base font-bold text-parchment mb-4 leading-snug">
                  {intro.page2Line1}
                </h3>
                <p className="font-inter text-xs sm:text-sm text-parchment/80 leading-relaxed max-w-xs">
                  {intro.page2Line2}
                </p>
                <div className="w-12 h-px bg-gold/30 mt-4" />
              </div>

              {/* RIGHT PAGE: Key Skills & ENTER Button */}
              <div className="flex flex-col items-center justify-center text-center p-6 sm:p-8">
                <span className="font-cinzel text-xs tracking-[0.2em] text-gold uppercase mb-3">
                  Core Runes
                </span>
                <div className="flex flex-wrap items-center justify-center gap-2 mb-6 max-w-xs">
                  {intro.page2Skills.map((skill, idx) => (
                    <span
                      key={idx}
                      className="text-[11px] font-inter text-parchment/90 bg-midnight/80 border border-gold/30 px-2.5 py-1 rounded-full shadow-sm"
                    >
                      {skill}
                    </span>
                  ))}
                </div>

                {/* Enter Button */}
                <motion.div
                  initial={reducedMotion ? { scale: 1 } : { scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="mt-2"
                >
                  <Button variant="primary" onClick={onEnter}>
                    {intro.enterButton}
                  </Button>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default GrimoirePages;
