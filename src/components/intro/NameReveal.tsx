"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { content } from "@/lib/content";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { Button } from "@/components/ui/Button";

export interface NameRevealProps {
  isTriggered: boolean;
  onEnter: () => void;
}

export const NameReveal: React.FC<NameRevealProps> = ({
  isTriggered,
  onEnter,
}) => {
  const prefersReduced = useReducedMotion();
  const { profile, intro } = content;
  const nameLetters = Array.from(profile.name);
  const fullRole = profile.role;

  const [typedRoleLength, setTypedRoleLength] = useState<number>(0);
  const [showEnterButton, setShowEnterButton] = useState<boolean>(false);

  // Trigger typewriter for role once name animation completes (only when not reduced-motion)
  useEffect(() => {
    if (prefersReduced || !isTriggered) return;

    const nameDurationMs = nameLetters.length * 55 + 500;
    const startTypewriterTimer = setTimeout(() => {
      let currentLength = 0;
      const typeInterval = setInterval(() => {
        currentLength++;
        setTypedRoleLength(currentLength);
        if (currentLength >= fullRole.length) {
          clearInterval(typeInterval);
          setTimeout(() => {
            setShowEnterButton(true);
          }, 300);
        }
      }, 25);

      return () => clearInterval(typeInterval);
    }, nameDurationMs);

    return () => clearTimeout(startTypewriterTimer);
  }, [isTriggered, prefersReduced, fullRole.length, nameLetters.length]);

  if (!isTriggered && !prefersReduced) {
    return null;
  }

  // Reduced motion: immediate final state
  if (prefersReduced) {
    return (
      <div className="flex flex-col items-center justify-center text-center space-y-6 z-20 px-6 max-w-4xl mx-auto">
        <h1 className="font-cinzel text-4xl sm:text-6xl md:text-7xl font-bold tracking-wider text-gold drop-shadow-[0_0_20px_rgba(201,162,75,0.7)]">
          {profile.name}
        </h1>
        <p className="font-cormorant text-xl sm:text-2xl text-parchment/90 italic tracking-wide">
          {fullRole}
        </p>
        <div className="pt-4">
          <Button
            variant="primary"
            onClick={onEnter}
            className="text-sm px-8 py-3.5 shadow-[0_0_20px_rgba(201,162,75,0.4)]"
            autoFocus
          >
            {intro.enterButton}
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div
      className="flex flex-col items-center justify-center text-center space-y-6 z-20 px-6 max-w-4xl mx-auto pointer-events-auto"
      role="region"
      aria-label="Name Reveal"
    >
      {/* Name Letter-by-Letter Reveal */}
      <h1 className="font-cinzel text-4xl sm:text-6xl md:text-7xl font-bold tracking-wider text-gold flex flex-wrap justify-center drop-shadow-[0_0_24px_rgba(201,162,75,0.65)]">
        {nameLetters.map((letter, idx) => (
          <motion.span
            key={idx}
            initial={{ opacity: 0, y: 15, filter: "blur(8px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{
              duration: 0.45,
              delay: idx * 0.05,
              ease: "easeOut",
            }}
            className={letter === " " ? "mr-4" : ""}
          >
            {letter}
          </motion.span>
        ))}
      </h1>

      {/* Role Typewriter */}
      <div className="min-h-[32px] flex items-center justify-center">
        <p className="font-cormorant text-xl sm:text-2xl text-parchment/90 italic tracking-wide">
          {fullRole.slice(0, typedRoleLength)}
          {typedRoleLength > 0 && typedRoleLength < fullRole.length && (
            <span
              className="inline-block w-0.5 h-5 ml-1 bg-gold animate-pulse"
              aria-hidden="true"
            />
          )}
        </p>
      </div>

      {/* Enter Button */}
      <AnimatePresence>
        {showEnterButton && (
          <motion.div
            initial={{ opacity: 0, y: 15, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="pt-4"
          >
            <Button
              variant="primary"
              onClick={onEnter}
              className="text-sm px-8 py-3.5 shadow-[0_0_25px_rgba(201,162,75,0.5)] cursor-pointer"
              autoFocus
            >
              {intro.enterButton} →
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default NameReveal;
