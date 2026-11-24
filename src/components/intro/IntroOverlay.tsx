"use client";

import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { content } from "@/lib/content";
import { useIntroSkip } from "@/hooks/useIntroSkip";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { IntroScene } from "./IntroScene";
import { GrimoirePages } from "./GrimoirePages";
import { NameRiseSequence } from "./NameRiseSequence";

export interface IntroOverlayProps {
  onComplete?: () => void;
}

export const IntroOverlay: React.FC<IntroOverlayProps> = ({ onComplete }) => {
  const { hasSkipped, skipIntro, markCompleted, isReady } = useIntroSkip();
  const prefersReduced = useReducedMotion();
  const { intro } = content;

  const [isWandHovered, setIsWandHovered] = useState<boolean>(false);
  const [isBookOpen, setIsBookOpen] = useState<boolean>(false);
  const [isNameRising, setIsNameRising] = useState<boolean>(false);
  const [isBookSinking, setIsBookSinking] = useState<boolean>(false);
  const [showHint, setShowHint] = useState<boolean>(false);
  const [isExiting, setIsExiting] = useState<boolean>(false);

  // When prefers-reduced-motion is active, skip intro immediately into finished hero
  useEffect(() => {
    if (prefersReduced) {
      markCompleted();
      setIsExiting(true);
      if (onComplete) onComplete();
    }
  }, [prefersReduced, markCompleted, onComplete]);

  // 1. After 1.5s, fade in hint text "Tap the wand to open the book."
  useEffect(() => {
    if (prefersReduced || isBookOpen) return;
    const hintTimer = setTimeout(() => {
      setShowHint(true);
    }, 1500);

    return () => clearTimeout(hintTimer);
  }, [prefersReduced, isBookOpen]);

  // Lock body scroll while intro is active; unlock when finished
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

  // Wand Tap Handler (Click / Space / Enter)
  const handleWandTap = useCallback(() => {
    if (isBookOpen) return;
    setIsBookOpen(true);
    setShowHint(false);

    // Book opens around 1.1s; then name letters rise from pages
    setTimeout(() => {
      setIsNameRising(true);
    }, 1100);

    // After letters rise (~2.2s), book sinks and fades into the background
    setTimeout(() => {
      setIsBookSinking(true);
    }, 2200);
  }, [isBookOpen]);

  // Name rise sequence complete -> seamless handoff into hero
  const handleNameRiseComplete = useCallback(() => {
    markCompleted();
    setIsExiting(true);
    if (onComplete) onComplete();
  }, [markCompleted, onComplete]);

  // Skip Intro button handler -> jumps directly to finished hero
  const handleSkip = useCallback(() => {
    skipIntro();
    markCompleted();
    setIsExiting(true);
    if (onComplete) onComplete();
  }, [skipIntro, markCompleted, onComplete]);

  if (!isReady || hasSkipped || prefersReduced) {
    return null;
  }

  return (
    <AnimatePresence>
      {!isExiting && (
        <motion.div
          key="intro-overlay"
          initial={{ opacity: 1 }}
          animate={{ opacity: isBookSinking ? 0 : 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
          className="fixed inset-0 w-screen h-screen z-50 flex flex-col items-center justify-center bg-[#070a14] select-none"
          role="dialog"
          aria-modal="true"
          aria-label="Grimoire Opening Sequence"
        >
          {/* Skip Intro button positioned top-right */}
          <div className="absolute top-6 right-6 z-40">
            <button
              type="button"
              onClick={handleSkip}
              className="font-cinzel text-xs uppercase tracking-widest text-parchment/80 hover:text-gold border border-gold/30 hover:border-gold bg-[#0b1028]/80 px-4 py-2 rounded-lg transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold cursor-pointer shadow-md"
            >
              {intro.skipButton}
            </button>
          </div>

          {/* 3D Grimoire & Wand Scene: Sinks and fades as letters ascend into hero */}
          <motion.div
            animate={{
              opacity: isBookSinking ? 0 : 1,
              y: isBookSinking ? 90 : 0,
              scale: isBookSinking ? 0.9 : 1,
            }}
            transition={{ duration: 1.4, ease: "easeInOut" }}
            className="w-full h-full relative"
          >
            <IntroScene
              isWandHovered={isWandHovered}
              isBookOpen={isBookOpen}
              isPageTurned={false}
              onWandHoverChange={setIsWandHovered}
              onWandTap={handleWandTap}
              monogram={intro.monogram}
            />

            {/* Left Page Classical Ornament while book is open */}
            {isBookOpen && !isBookSinking && (
              <GrimoirePages
                isPageTurned={false}
                onEnter={() => {}}
                reducedMotion={prefersReduced}
              />
            )}
          </motion.div>

          {/* Accessible Wand Button (Keyboard & Screen reader focusable proxy) */}
          {!isBookOpen && (
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-20">
              <button
                type="button"
                onClick={handleWandTap}
                onMouseEnter={() => setIsWandHovered(true)}
                onMouseLeave={() => setIsWandHovered(false)}
                onFocus={() => setIsWandHovered(true)}
                onBlur={() => setIsWandHovered(false)}
                aria-label={intro.wandAriaLabel}
                className="w-48 h-48 rounded-full pointer-events-auto cursor-pointer focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-gold/70"
                style={{ transform: "translateY(-40px)" }}
              >
                <span className="sr-only">{intro.wandAriaLabel}</span>
              </button>

              {/* Hint text below book */}
              <div className="absolute bottom-8 sm:bottom-12 w-full text-center pointer-events-none px-4">
                <AnimatePresence>
                  {showHint && (
                    <motion.p
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      transition={{ duration: 0.8, ease: "easeOut" }}
                      className="font-cormorant text-xl sm:text-2xl text-candle italic tracking-wider drop-shadow-[0_2px_10px_rgba(0,0,0,0.85)]"
                    >
                      {intro.hint}
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>
            </div>
          )}

          {/* GSAP Name Rise & Warm Light Column Sequence */}
          <NameRiseSequence
            isActive={isNameRising}
            onComplete={handleNameRiseComplete}
            reducedMotion={prefersReduced}
          />

          {/* Screen reader announcement */}
          <div className="sr-only" aria-live="polite">
            {isBookOpen
              ? `${content.profile.name}, ${content.profile.role}`
              : intro.hint}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default IntroOverlay;
