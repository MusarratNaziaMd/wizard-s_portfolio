"use client";

import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { content } from "@/lib/content";
import { useIntroSkip } from "@/hooks/useIntroSkip";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { IntroScene } from "./IntroScene";
import { GrimoirePages } from "./GrimoirePages";

export interface IntroOverlayProps {
  onComplete?: () => void;
}

export const IntroOverlay: React.FC<IntroOverlayProps> = ({ onComplete }) => {
  const { hasSkipped, skipIntro, markCompleted, isReady } = useIntroSkip();
  const prefersReduced = useReducedMotion();
  const { intro } = content;

  const [isWandHovered, setIsWandHovered] = useState<boolean>(false);
  const [isBookOpen, setIsBookOpen] = useState<boolean>(false);
  const [isPageTurned, setIsPageTurned] = useState<boolean>(false);
  const [showHint, setShowHint] = useState<boolean>(false);
  const [isExiting, setIsExiting] = useState<boolean>(false);

  // When prefers-reduced-motion is active, immediately open book and show name & enter button
  useEffect(() => {
    if (prefersReduced) {
      setIsBookOpen(true);
      setIsPageTurned(true);
    }
  }, [prefersReduced]);

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

    // After 2.5s on Spread 1 (name reveal), flip page to Spread 2 (skills & enter)
    setTimeout(() => {
      setIsPageTurned(true);
    }, 2800);
  }, [isBookOpen]);

  // Enter button handler: closes book with expanding light, fading into portfolio
  const handleEnterSanctum = useCallback(() => {
    markCompleted();
    setIsExiting(true);
    setTimeout(() => {
      if (onComplete) onComplete();
    }, 600);
  }, [markCompleted, onComplete]);

  // Skip Intro button handler
  const handleSkip = useCallback(() => {
    skipIntro();
    setIsExiting(true);
    setTimeout(() => {
      if (onComplete) onComplete();
    }, 300);
  }, [skipIntro, onComplete]);

  if (!isReady || hasSkipped) {
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
          className="fixed inset-0 w-screen h-screen z-50 flex flex-col items-center justify-center bg-[#070a14] select-none"
          role="dialog"
          aria-modal="true"
          aria-label="Grimoire Intro Experience"
        >
          {/* Skip Intro button positioned top-right with styling */}
          <div className="absolute top-6 right-6 z-40">
            <button
              type="button"
              onClick={handleSkip}
              className="font-cinzel text-xs uppercase tracking-widest text-parchment/80 hover:text-gold border border-gold/30 hover:border-gold bg-[#0b1028]/80 px-4 py-2 rounded-lg transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold cursor-pointer shadow-md"
            >
              {intro.skipButton}
            </button>
          </div>

          {/* 3D Grimoire & Wand Scene */}
          <IntroScene
            isWandHovered={isWandHovered}
            isBookOpen={isBookOpen}
            isPageTurned={isPageTurned}
            onWandHoverChange={setIsWandHovered}
            onWandTap={handleWandTap}
            monogram={intro.monogram}
          />

          {/* Accessible Wand Button (Keyboard & Screen reader focusable proxy) */}
          {!isBookOpen && !prefersReduced && (
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
                style={{ transform: "translateY(-60px)" }}
              >
                <span className="sr-only">{intro.wandAriaLabel}</span>
              </button>

              {/* Hint text fading in after 1.5s */}
              <div className="absolute bottom-12 sm:bottom-16 w-80 text-center pointer-events-none min-h-[32px]">
                <AnimatePresence>
                  {showHint && (
                    <motion.p
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      transition={{ duration: 0.8, ease: "easeOut" }}
                      className="font-cormorant text-xl sm:text-2xl text-parchment/90 italic tracking-wider drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)]"
                    >
                      {intro.hint}
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>
            </div>
          )}

          {/* Grimoire Open Pages (Inscribed Name, Role, & Skills) */}
          {isBookOpen && (
            <GrimoirePages
              isPageTurned={isPageTurned}
              onEnter={handleEnterSanctum}
              reducedMotion={prefersReduced}
            />
          )}

          {/* Screen reader announcement live region */}
          <div className="sr-only" aria-live="polite">
            {isBookOpen
              ? isPageTurned
                ? `${intro.page2Line1}. ${intro.page2Line2}`
                : `${content.profile.name}, ${content.profile.role}`
              : intro.hint}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default IntroOverlay;
