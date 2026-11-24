"use client";

import React, { useEffect } from "react";
import Lenis from "lenis";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export const SmoothScroll: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const prefersReduced = useReducedMotion();

  useEffect(() => {
    if (prefersReduced) return;

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    let animationFrameId: number;

    function raf(time: number) {
      lenis.raf(time);
      animationFrameId = requestAnimationFrame(raf);
    }

    animationFrameId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(animationFrameId);
      lenis.destroy();
    };
  }, [prefersReduced]);

  return <>{children}</>;
};

export default SmoothScroll;
