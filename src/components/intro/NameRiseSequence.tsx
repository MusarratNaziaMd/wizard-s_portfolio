"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { content } from "@/lib/content";

export interface NameRiseSequenceProps {
  isActive: boolean;
  onComplete: () => void;
  reducedMotion: boolean;
}

export const NameRiseSequence: React.FC<NameRiseSequenceProps> = ({
  isActive,
  onComplete,
  reducedMotion,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const lightColumnRef = useRef<HTMLDivElement>(null);
  const lettersRef = useRef<(HTMLSpanElement | null)[]>([]);
  const sparklesContainerRef = useRef<HTMLDivElement>(null);

  const name = content.profile.name;
  const letters = name.split("");

  useEffect(() => {
    if (!isActive) return;

    if (reducedMotion) {
      onComplete();
      return;
    }

    const validLetters = lettersRef.current.filter(Boolean);
    const light = lightColumnRef.current;
    const container = containerRef.current;

    // Build GSAP animation timeline
    const tl = gsap.timeline({
      onComplete: () => {
        onComplete();
      },
    });

    // 1. Warm column of light rises from the pages of the open book
    if (light) {
      tl.fromTo(
        light,
        { scaleY: 0, opacity: 0, transformOrigin: "bottom center" },
        { scaleY: 1, opacity: 0.85, duration: 0.9, ease: "power2.out" }
      );
    }

    // 2. Letters lift off the page letter-by-letter with gold glow
    if (validLetters.length > 0) {
      tl.fromTo(
        validLetters,
        {
          opacity: 0,
          y: 40,
          scale: 0.8,
          rotationX: 30,
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          rotationX: 0,
          stagger: 0.055,
          duration: 0.85,
          ease: "back.out(1.4)",
        },
        "-=0.5"
      );

      // 3. Letters gather, float upward into golden majesty, and transition toward hero position
      tl.to(
        validLetters,
        {
          y: -140,
          scale: 1.15,
          color: "#fff7e0",
          textShadow: "0 0 25px rgba(255, 179, 71, 0.9), 0 0 50px rgba(201, 162, 75, 0.7)",
          stagger: {
            each: 0.02,
            from: "center",
          },
          duration: 1.2,
          ease: "power2.inOut",
        },
        "+=0.2"
      );
    }

    // 4. Light column dissipates as letters ascend
    if (light) {
      tl.to(
        light,
        {
          opacity: 0,
          scaleY: 1.3,
          duration: 0.8,
          ease: "power2.in",
        },
        "-=0.9"
      );
    }

    // 5. Fade container smoothly into hero handoff
    if (container) {
      tl.to(
        container,
        {
          opacity: 0,
          y: -30,
          duration: 0.9,
          ease: "power2.inOut",
        },
        "-=0.3"
      );
    }

    return () => {
      tl.kill();
    };
  }, [isActive, onComplete, reducedMotion]);

  if (!isActive) return null;

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 z-35 flex flex-col items-center justify-center pointer-events-none select-none px-4"
    >
      {/* 1. Soft Column of Warm Light rising from book pages */}
      <div
        ref={lightColumnRef}
        className="absolute bottom-1/4 w-[280px] sm:w-[380px] h-[550px] pointer-events-none opacity-0"
        style={{
          background:
            "radial-gradient(ellipse at bottom, rgba(255, 179, 71, 0.6) 0%, rgba(201, 162, 75, 0.3) 35%, rgba(11, 16, 48, 0) 70%)",
          filter: "blur(18px)",
        }}
      />

      {/* Sparkle motes container */}
      <div ref={sparklesContainerRef} className="absolute inset-0 pointer-events-none overflow-hidden">
        {Array.from({ length: 18 }).map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-[#ffeaad] animate-pulse"
            style={{
              width: `${(i % 3) + 2}px`,
              height: `${(i % 3) + 2}px`,
              left: `${45 + (i % 7) * 2}%`,
              top: `${50 - (i * 3)}%`,
              boxShadow: "0 0 10px rgba(255, 179, 71, 0.9)",
              animationDuration: `${1.2 + (i % 4) * 0.4}s`,
            }}
          />
        ))}
      </div>

      {/* 2. Rising Letters Container */}
      <div
        className="relative flex flex-wrap justify-center items-center text-center max-w-3xl px-6"
        style={{ transform: "translateY(20px)" }}
      >
        <h1 className="font-cinzel text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-gold via-parchment to-gold leading-tight drop-shadow-[0_2px_14px_rgba(201,162,75,0.6)]">
          {letters.map((char, index) => (
            <span
              key={index}
              ref={(el) => {
                lettersRef.current[index] = el;
              }}
              className="inline-block opacity-0"
              style={{
                marginRight: char === " " ? "0.35em" : "0.015em",
                minWidth: char === " " ? "0.35em" : "auto",
              }}
            >
              {char === " " ? "\u00A0" : char}
            </span>
          ))}
        </h1>
      </div>
    </div>
  );
};

export default NameRiseSequence;
