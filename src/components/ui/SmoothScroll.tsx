"use client";

import React, { useEffect } from "react";
import Lenis from "lenis";
import { useReducedMotion } from "@/hooks/useReducedMotion";

declare global {
  interface Window {
    __lenis?: Lenis;
  }
}

export const SmoothScroll: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const prefersReduced = useReducedMotion();

  useEffect(() => {
    if (prefersReduced) return;

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    window.__lenis = lenis;

    let animationFrameId: number;

    function raf(time: number) {
      lenis.raf(time);
      animationFrameId = requestAnimationFrame(raf);
    }

    animationFrameId = requestAnimationFrame(raf);

    // Support browser back/forward and hashchange
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash) {
        const target = document.querySelector(hash);
        if (target) {
          lenis.scrollTo(target as HTMLElement, { offset: -64, duration: 1.2 });
        }
      }
    };
    window.addEventListener("hashchange", handleHashChange);
    window.addEventListener("popstate", handleHashChange);

    // Initial check if opened with a direct hash e.g. /#projects
    const initialHash = window.location.hash;
    if (initialHash) {
      // Small timeout to allow intro to initialize or skip
      setTimeout(() => {
        const target = document.querySelector(initialHash);
        if (target) {
          lenis.scrollTo(target as HTMLElement, { offset: -64, duration: 1.2 });
        }
      }, 500);
    }

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("hashchange", handleHashChange);
      window.removeEventListener("popstate", handleHashChange);
      lenis.destroy();
      delete window.__lenis;
    };
  }, [prefersReduced]);

  return <>{children}</>;
};

export default SmoothScroll;
