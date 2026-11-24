"use client";

import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { content } from "@/lib/content";
import { useIntroSkip } from "@/hooks/useIntroSkip";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { BookScene } from "./BookScene";

export interface IntroOverlayProps {
  onComplete?: () => void;
}

export const IntroOverlay: React.FC<IntroOverlayProps> = ({ onComplete }) => {
  const { hasSkipped, skipIntro, markCompleted, isReady } = useIntroSkip();
  const prefersReduced = useReducedMotion();
  const { intro } = content;

  const [isExiting, setIsExiting] = useState<boolean>(false);

  // When prefers-reduced-motion is active, skip intro immediately into finished hero
  useEffect(() => {
    if (prefersReduced) {
      markCompleted();
      setIsExiting(true);
      if (onComplete) onComplete();
    }
  }, [prefersReduced, markCompleted, onComplete]);

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

  // Video intro sequence complete -> seamless handoff into hero
  const handleSequenceComplete = useCallback(() => {
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
          exit={{ opacity: 0 }}
          transition={{ duration: 1.0, ease: "easeInOut" }}
          className="fixed inset-0 w-screen h-screen z-50 flex flex-col items-center justify-center bg-[#070a14] select-none"
          role="dialog"
          aria-modal="true"
          aria-label="Grimoire Opening Sequence"
        >
          {/* Skip Intro button positioned top-right */}
          <div className="absolute top-6 right-6 z-50">
            <button
              type="button"
              onClick={handleSkip}
              className="font-cinzel text-xs uppercase tracking-widest text-parchment/80 hover:text-gold border border-gold/30 hover:border-gold bg-[#0b1028]/80 px-4 py-2 rounded-lg transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold cursor-pointer shadow-md"
            >
              {intro.skipButton}
            </button>
          </div>

          {/* BookScene: Video Grimoire + Interactive Floating Wand */}
          <BookScene onComplete={handleSequenceComplete} onSkip={handleSkip} />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default IntroOverlay;
