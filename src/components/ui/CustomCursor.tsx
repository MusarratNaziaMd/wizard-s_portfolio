"use client";

import React, { useEffect, useState } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export const CustomCursor: React.FC = () => {
  const [position, setPosition] = useState<{ x: number; y: number }>({ x: -100, y: -100 });
  const [isVisible, setIsVisible] = useState(false);
  const [isPointer, setIsPointer] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    // Disable on touch devices or if user prefers reduced motion
    if (prefersReducedMotion || window.matchMedia("(pointer: coarse)").matches) {
      return;
    }

    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);

      const target = e.target as HTMLElement | null;
      if (target) {
        const isClickable =
          target.tagName === "BUTTON" ||
          target.tagName === "A" ||
          target.closest("button") ||
          target.closest("a") ||
          window.getComputedStyle(target).cursor === "pointer";
        setIsPointer(!!isClickable);
      }
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener("mousemove", handleMouseMove);
    document.documentElement.addEventListener("mouseleave", handleMouseLeave);
    document.documentElement.addEventListener("mouseenter", handleMouseEnter);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.documentElement.removeEventListener("mouseleave", handleMouseLeave);
      document.documentElement.removeEventListener("mouseenter", handleMouseEnter);
    };
  }, [isVisible, prefersReducedMotion]);

  if (prefersReducedMotion || !isVisible) {
    return null;
  }

  return (
    <div
      className="fixed top-0 left-0 pointer-events-none z-50 transition-transform duration-75 ease-out"
      style={{
        transform: `translate3d(${position.x}px, ${position.y}px, 0)`,
      }}
      aria-hidden="true"
    >
      <div
        className={`-translate-x-1/2 -translate-y-1/2 rounded-full border border-gold/70 transition-all duration-150 ${
          isPointer
            ? "w-8 h-8 bg-gold/20 scale-125"
            : "w-4 h-4 bg-gold/40"
        }`}
      />
    </div>
  );
};

export default CustomCursor;
