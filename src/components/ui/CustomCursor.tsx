"use client";

import React, { useEffect, useState, useRef } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";

interface TrailPoint {
  x: number;
  y: number;
  id: number;
}

export const CustomCursor: React.FC = () => {
  const [position, setPosition] = useState<{ x: number; y: number }>({ x: -100, y: -100 });
  const [trail, setTrail] = useState<TrailPoint[]>([]);
  const [isVisible, setIsVisible] = useState(false);
  const [isPointer, setIsPointer] = useState(false);
  const prefersReducedMotion = useReducedMotion();
  const counterRef = useRef(0);

  useEffect(() => {
    // Disable on touch devices or if user prefers reduced motion
    if (prefersReducedMotion || window.matchMedia("(pointer: coarse)").matches) {
      return;
    }

    const handleMouseMove = (e: MouseEvent) => {
      const newPos = { x: e.clientX, y: e.clientY };
      setPosition(newPos);
      if (!isVisible) setIsVisible(true);

      // Add trail point with sliding buffer
      counterRef.current += 1;
      setTrail((prev) => [
        { x: newPos.x, y: newPos.y, id: counterRef.current },
        ...prev.slice(0, 4),
      ]);

      const target = e.target as HTMLElement | null;
      if (target) {
        const isClickable =
          target.tagName === "BUTTON" ||
          target.tagName === "A" ||
          target.closest("button") ||
          target.closest("a") ||
          window.getComputedStyle(target).cursor === "pointer";
        setIsPointer(Boolean(isClickable));
      }
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
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
    <>
      {/* Short Sparkle Trail */}
      {trail.map((point, index) => {
        const scale = 1 - (index + 1) * 0.18;
        const opacity = 0.5 - index * 0.1;
        return (
          <div
            key={point.id}
            className="fixed top-0 left-0 pointer-events-none z-50 transition-opacity duration-150"
            style={{
              transform: `translate3d(${point.x}px, ${point.y}px, 0)`,
            }}
            aria-hidden="true"
          >
            <div
              className="-translate-x-1/2 -translate-y-1/2 rounded-full bg-candle"
              style={{
                width: `${Math.max(2, 6 * scale)}px`,
                height: `${Math.max(2, 6 * scale)}px`,
                opacity,
                boxShadow: "0 0 6px rgba(255, 179, 71, 0.8)",
              }}
            />
          </div>
        );
      })}

      {/* Main Wand-Light Tip */}
      <div
        className="fixed top-0 left-0 pointer-events-none z-50"
        style={{
          transform: `translate3d(${position.x}px, ${position.y}px, 0)`,
        }}
        aria-hidden="true"
      >
        <div
          className={`-translate-x-1/2 -translate-y-1/2 rounded-full transition-all duration-150 flex items-center justify-center ${
            isPointer
              ? "w-8 h-8 border border-candle bg-candle/20 shadow-[0_0_18px_rgba(255,179,71,0.6)] scale-110"
              : "w-3.5 h-3.5 bg-parchment shadow-[0_0_12px_#ffb347,0_0_24px_#c9a24b]"
          }`}
        >
          {isPointer && (
            <div className="w-1.5 h-1.5 rounded-full bg-parchment shadow-[0_0_6px_#ffffff]" />
          )}
        </div>
      </div>
    </>
  );
};

export default CustomCursor;
