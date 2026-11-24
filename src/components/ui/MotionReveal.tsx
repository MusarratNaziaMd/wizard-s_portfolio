"use client";

import React from "react";
import { motion } from "framer-motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export interface MotionRevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "down" | "left" | "right" | "none";
}

export const MotionReveal: React.FC<MotionRevealProps> = ({
  children,
  className = "",
  delay = 0,
  direction = "up",
}) => {
  const prefersReduced = useReducedMotion();

  if (prefersReduced) {
    return <div className={className}>{children}</div>;
  }

  const offset = 24;
  const initialVariants = {
    up: { opacity: 0, y: offset },
    down: { opacity: 0, y: -offset },
    left: { opacity: 0, x: offset },
    right: { opacity: 0, x: -offset },
    none: { opacity: 0 },
  };

  const animateVariants = {
    up: { opacity: 1, y: 0 },
    down: { opacity: 1, y: 0 },
    left: { opacity: 1, x: 0 },
    right: { opacity: 1, x: 0 },
    none: { opacity: 1 },
  };

  return (
    <motion.div
      initial={initialVariants[direction]}
      whileInView={animateVariants[direction]}
      viewport={{ once: true, margin: "-60px" }}
      transition={{
        duration: 0.6,
        delay,
        ease: [0.21, 0.47, 0.32, 0.98],
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default MotionReveal;
