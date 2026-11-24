"use client";

import React from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export const ScrollProgress: React.FC = () => {
  const prefersReduced = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  });

  if (prefersReduced) {
    return null;
  }

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-[2px] bg-gold z-50 origin-left pointer-events-none shadow-[0_0_8px_rgba(201,162,75,0.7)]"
      style={{ scaleX }}
      aria-hidden="true"
    />
  );
};

export default ScrollProgress;
