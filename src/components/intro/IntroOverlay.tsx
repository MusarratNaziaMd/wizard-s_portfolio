"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { content } from "@/lib/content";
import { useIntroSkip } from "@/hooks/useIntroSkip";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { IntroScene } from "./IntroScene";
import { NameReveal } from "./NameReveal";

export interface IntroOverlayProps {
  onComplete?: () => void;
}

export const IntroOverlay: React.FC<IntroOverlayProps> = ({ onComplete }) => {
  const { hasSkipped, skipIntro, markCompleted, isReady } = useIntroSkip();
  const prefersReduced = useReducedMotion();

  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [isBloomed, setIsBloomed] = useState<boolean>(false);
  const [showHint, setShowHint] = useState<boolean>(false);
  const [isExiting, setIsExiting] = useState<boolean>(false);

  // 1. After 1.5s, fade in the hint text below the orb
  useEffect(() => {
    if (prefersReduced) return;
    const hintTimer = setTimeout(() => {
      setShowHint(true);
    }, 1500);

    return () => clearTimeout(hintTimer);
  }, [prefersReduced]);

  // Lock body scroll while the intro is active
  useEffect(() => {
    if (!hasSkipped && !isExiting) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [hasSkipped, isExiting]);

  // Handle spell unleash trigger (click or keyboard Enter/Space)
  const triggerSpell = () => {
    if (isBloomed || prefersReduced) return;
    setIsBloomed(true);
  };

  // Handle final Enter button click to unveil the portfolio
  const handleEnterSanctum = () => {
    setIsExiting(true);
    setTimeout(() => {
      markCompleted();
      if (onComplete) onComplete();
    }, 600);
  };

  // Handle Skip intro button
  const handleSkip = () => {
    setIsExiting(true);
    setTimeout(() => {
      skipIntro();
      if (onComplete) onComplete();
    }, 300);
  };

  // If already skipped in session storage or reduced motion bypassed, don't show
  if (!isReady) {
    return null;
  }

  if (hasSkipped) {
    return null;
  }

  return (
    <AnimatePresence>
      {!isExiting && (
        <motion.div
          key="intro-overlay"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-navy select-none"
          role="dialog"
          aria-modal="true"
          aria-label="Sanctum Intro Experience"
        >
          {/* Visible Skip intro button at all times */}
          <div className="absolute top-6 right-6 z-40">
            <button
              onClick={handleSkip}
              className="font-cinzel text-xs uppercase tracking-widest text-parchment/70 hover:text-gold border border-gold/25 hover:border-gold/60 bg-navy/60 px-4 py-2 rounded-lg transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold cursor-pointer"
            >
              {content.intro.skipButton}
            </button>
          </div>

          {/* 3D Visual Scene */}
          {!prefersReduced && (
            <IntroScene isHovered={isHovered} isBloomed={isBloomed} />
          )}

          {/* Interactive Accessible Orb Button (hidden once bloomed) */}
          {!isBloomed && !prefersReduced && (
            <div className="relative z-20 flex flex-col items-center justify-center">
              <button
                type="button"
                onClick={triggerSpell}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                onFocus={() => setIsHovered(true)}
                onBlur={() => setIsHovered(false)}
                aria-label={content.intro.orbAriaLabel}
                className="w-24 h-24 rounded-full flex items-center justify-center cursor-pointer transition-all duration-300 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-gold/80"
              >
                <span className="sr-only">{content.intro.orbAriaLabel}</span>
              </button>

              {/* Hint text fading in after 1.5s */}
              <div className="absolute -bottom-16 w-80 text-center pointer-events-none min-h-[28px]">
                <AnimatePresence>
                  {showHint && (
                    <motion.p
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.8, ease: "easeOut" }}
                      className="font-cormorant text-lg sm:text-xl text-parchment/80 italic tracking-wider drop-shadow-md"
                    >
                      {content.intro.hint}
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>
            </div>
          )}

          {/* Name Reveal & Role Presentation once spell is cast or on reduced-motion */}
          {(isBloomed || prefersReduced) && (
            <NameReveal
              isTriggered={isBloomed || prefersReduced}
              onEnter={handleEnterSanctum}
            />
          )}

          {/* Screen reader live region */}
          <div className="sr-only" aria-live="polite">
            {isBloomed
              ? content.intro.spellCasting
              : content.intro.hint}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default IntroOverlay;
