"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { useWindowSize } from "@/hooks/useWindowSize";
import { HeroText } from "./HeroText";
import { HeroMagicCanvas } from "./HeroMagicCanvas";

// Fixed positions of castle illuminated windows (in % relative to castle container)
const CASTLE_WINDOWS = [
  { x: "50.4%", y: "44.8%", size: 14, delay: "0s", duration: "3.2s" }, // Grand central hall
  { x: "50.3%", y: "48.3%", size: 12, delay: "0.8s", duration: "4.1s" }, // Lower arched window
  { x: "49.8%", y: "23.9%", size: 11, delay: "1.7s", duration: "2.8s" }, // High tower observatory
  { x: "49.5%", y: "60.7%", size: 13, delay: "2.4s", duration: "3.6s" }, // Terrace arch
  { x: "60.4%", y: "50.9%", size: 11, delay: "0.5s", duration: "3.9s" }, // East turret
  { x: "47.6%", y: "48.9%", size: 10, delay: "1.2s", duration: "4.5s" }, // West wing portal
  { x: "52.5%", y: "48.8%", size: 10, delay: "2.1s", duration: "3.3s" }, // East wing portal
  { x: "50.9%", y: "60.5%", size: 12, delay: "1.5s", duration: "3.7s" }, // Water gate
];

// Twinkling star points across upper dark sky
const TWINKLING_STARS = [
  { top: "8%", left: "12%", size: 2.2, delay: "0s", dur: "3.4s" },
  { top: "14%", left: "28%", size: 1.8, delay: "1.2s", dur: "4.1s" },
  { top: "6%", left: "42%", size: 2.5, delay: "2.4s", dur: "3.8s" },
  { top: "18%", left: "55%", size: 1.6, delay: "0.5s", dur: "4.6s" },
  { top: "11%", left: "68%", size: 2.0, delay: "1.8s", dur: "3.2s" },
  { top: "22%", left: "84%", size: 2.4, delay: "3.1s", dur: "4.0s" },
  { top: "28%", left: "92%", size: 1.5, delay: "0.9s", dur: "3.6s" },
  { top: "32%", left: "18%", size: 1.9, delay: "2.1s", dur: "4.4s" },
  { top: "26%", left: "36%", size: 2.2, delay: "1.4s", dur: "3.5s" },
  { top: "38%", left: "48%", size: 1.7, delay: "2.8s", dur: "4.2s" },
  { top: "16%", left: "8%", size: 2.0, delay: "0.3s", dur: "3.9s" },
  { top: "42%", left: "25%", size: 1.5, delay: "1.9s", dur: "4.5s" },
  { top: "35%", left: "62%", size: 2.3, delay: "3.5s", dur: "3.7s" },
  { top: "12%", left: "88%", size: 1.8, delay: "0.7s", dur: "4.1s" },
  { top: "5%", left: "95%", size: 2.1, delay: "2.2s", dur: "3.3s" },
  { top: "48%", left: "38%", size: 1.6, delay: "1.1s", dur: "4.7s" },
];

export const HeroScene: React.FC = () => {
  const containerRef = useRef<HTMLElement>(null);
  const { isMobile } = useWindowSize();
  const prefersReduced = useReducedMotion();
  const [isVisible, setIsVisible] = useState<boolean>(true);

  // Performance: Pause animations when Hero is off-screen or tab is hidden
  useEffect(() => {
    const handleVisibilityChange = () => {
      setIsVisible(document.visibilityState === "visible");
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting && document.visibilityState === "visible");
      },
      { threshold: 0.05 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      observer.disconnect();
    };
  }, []);

  return (
    <section
      id="hero"
      ref={containerRef}
      aria-label="Hero Section"
      className="relative w-full min-h-screen flex flex-col justify-end md:justify-center overflow-hidden bg-[#070a14] border-b border-gold/15 cursor-default select-none"
    >
      {/* ============================================================ */}
      {/* LAYER 1: SKY-MOON (Completely STILL, scaleX(-1) for moon)     */}
      {/* ============================================================ */}
      <div
        className="absolute inset-0 w-full h-full pointer-events-none select-none"
        style={{ transform: "scaleX(-1)" }}
        aria-hidden="true"
      >
        <Image
          src="/textures/hero/sky-moon.webp"
          alt="Moonlit fantasy night sky with clouds"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />

        {/* Subtle nocturnal blue tint overlay */}
        <div className="absolute inset-0 bg-[#0a0e1a]/20 mix-blend-multiply" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#070a14]/90 via-transparent to-[#0b1030]/35" />

        {/* Deep edge vignette */}
        <div className="absolute inset-0 shadow-[inset_0_0_140px_rgba(7,10,20,0.85)]" />
      </div>

      {/* ============================================================ */}
      {/* MAGIC EFFECT D: MOON GLOW (Soft pulsing radial aura)          */}
      {/* Positioned at Moon center: x = 75.2%, y = 25.1%              */}
      {/* ============================================================ */}
      <div
        className="absolute rounded-full pointer-events-none blur-3xl animate-moon-pulse -z-10"
        style={{
          left: "75.2%",
          top: "25.1%",
          width: "min(480px, 45vw)",
          height: "min(480px, 45vw)",
          background:
            "radial-gradient(circle, rgba(207, 216, 255, 0.45) 0%, rgba(201, 162, 75, 0.2) 40%, rgba(11, 16, 48, 0.05) 70%, transparent 80%)",
        }}
        aria-hidden="true"
      />

      {/* ============================================================ */}
      {/* MAGIC EFFECT C: TWINKLING STARS (Fixed in place, CSS pulse)  */}
      {/* ============================================================ */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-10" aria-hidden="true">
        {TWINKLING_STARS.map((star, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-[#f2e8cf] animate-star-twinkle"
            style={{
              top: star.top,
              left: star.left,
              width: `${star.size}px`,
              height: `${star.size}px`,
              animationDelay: star.delay,
              animationDuration: star.dur,
              boxShadow: "0 0 4px rgba(207, 216, 255, 0.9)",
            }}
          />
        ))}
      </div>

      {/* ============================================================ */}
      {/* MAGIC EFFECT F: SHOOTING STAR (Periodic streak every ~18s)   */}
      {/* ============================================================ */}
      <div
        className="absolute top-[14%] right-[26%] pointer-events-none z-12 overflow-visible"
        aria-hidden="true"
      >
        <div
          className="w-32 h-[1.5px] rounded-full animate-shooting-star"
          style={{
            background:
              "linear-gradient(90deg, transparent 0%, rgba(201, 162, 75, 0.8) 60%, rgba(255, 250, 220, 1) 100%)",
            boxShadow: "0 0 6px rgba(255, 235, 175, 0.8)",
          }}
        />
      </div>

      {/* ============================================================ */}
      {/* LAYER 2: CASTLE (Completely STILL, clearly visible)          */}
      {/* Mobile: Sits in upper-middle so towers are visible above text*/}
      {/* Desktop: Sits right-center, bottom aligned                   */}
      {/* ============================================================ */}
      <div
        className="absolute top-[15vh] md:top-auto md:bottom-0 pointer-events-none select-none z-14 w-[92vw] left-1/2 -translate-x-1/2 md:left-auto md:translate-x-0 md:right-[4%] lg:right-[8%] md:w-[55vw] max-w-[1250px] aspect-[2000/1187]"
        aria-hidden="true"
      >
        <Image
          src="/textures/hero/castle.webp"
          alt="Gothic academy fortress reflected in misty waters"
          fill
          priority
          sizes="(max-width: 768px) 95vw, 55vw"
          className="object-contain object-bottom drop-shadow-[0_0_35px_rgba(207,216,255,0.12)]"
        />

        {/* ============================================================ */}
        {/* MAGIC EFFECT E: CASTLE LIT WINDOW GLOWS (Soft CSS flickers)   */}
        {/* ============================================================ */}
        {CASTLE_WINDOWS.map((win, idx) => (
          <div
            key={idx}
            className="absolute rounded-full blur-[2px] animate-window-flicker pointer-events-none"
            style={{
              left: win.x,
              top: win.y,
              width: `${win.size}px`,
              height: `${win.size}px`,
              animationDelay: win.delay,
              animationDuration: win.duration,
              background:
                "radial-gradient(circle, rgba(255, 215, 120, 0.95) 0%, rgba(255, 179, 71, 0.5) 50%, transparent 80%)",
              boxShadow: "0 0 8px rgba(255, 179, 71, 0.7)",
            }}
          />
        ))}
      </div>

      {/* ============================================================ */}
      {/* LAYER 3: FOG (Slow 120s drift, low opacity, vertical mask)   */}
      {/* ============================================================ */}
      <div
        className="absolute inset-x-0 bottom-0 pointer-events-none select-none z-15 [mask-image:linear-gradient(to_top,black_25%,transparent_100%)] [-webkit-mask-image:linear-gradient(to_top,black_25%,transparent_100%)]"
        aria-hidden="true"
      >
        {/* Lower mist: slow 120s loop, low opacity 0.35 */}
        <div className="relative w-full h-44 sm:h-56 md:h-72 overflow-hidden mix-blend-screen opacity-35">
          <div className="flex w-[200%] h-full animate-fog-left">
            <div className="relative w-1/2 h-full">
              <Image
                src="/textures/hero/fog.webp"
                alt="Atmospheric low mist"
                fill
                sizes="100vw"
                className="object-cover object-bottom"
              />
            </div>
            <div className="relative w-1/2 h-full">
              <Image
                src="/textures/hero/fog.webp"
                alt="Atmospheric low mist duplicate"
                fill
                sizes="100vw"
                className="object-cover object-bottom"
              />
            </div>
          </div>
        </div>

        {/* Upper mist: slow 140s loop, very low opacity 0.2 */}
        <div className="absolute bottom-14 sm:bottom-24 md:bottom-32 inset-x-0 h-32 sm:h-48 md:h-60 overflow-hidden mix-blend-screen opacity-20">
          <div className="flex w-[200%] h-full animate-fog-right">
            <div className="relative w-1/2 h-full">
              <Image
                src="/textures/hero/fog.webp"
                alt="Atmospheric high mist"
                fill
                sizes="100vw"
                className="object-cover object-bottom"
              />
            </div>
            <div className="relative w-1/2 h-full">
              <Image
                src="/textures/hero/fog.webp"
                alt="Atmospheric high mist duplicate"
                fill
                sizes="100vw"
                className="object-cover object-bottom"
              />
            </div>
          </div>
        </div>
      </div>

      {/* ============================================================ */}
      {/* LAYER 4: OWL ON BOOKS (Shifted left and up, fully visible)   */}
      {/* ============================================================ */}
      <div
        className="absolute bottom-2 sm:bottom-4 md:bottom-6 right-3 sm:right-6 md:right-10 pointer-events-none select-none z-18 w-[34vw] md:w-[22vw] min-w-[180px] max-w-[390px] aspect-[900/1200]"
        aria-hidden="true"
      >
        <div className="relative w-full h-full">
          <Image
            src="/textures/hero/owl-books.webp"
            alt="Scholarly owl perched atop ancient grimoires"
            fill
            sizes="(max-width: 768px) 34vw, 22vw"
            className="object-contain object-right-bottom drop-shadow-[0_10px_25px_rgba(0,0,0,0.85)]"
          />
        </div>
      </div>

      {/* ============================================================ */}
      {/* LAYER 5: SHELF-LEFT & LANTERN (Brighter warm lift, STILL)    */}
      {/* ============================================================ */}
      <div
        className="absolute bottom-0 left-0 pointer-events-none select-none z-18 hidden md:block w-[22vw] min-w-[280px] max-w-[440px] aspect-[900/1402]"
        aria-hidden="true"
      >
        {/* Warm amber radial glow behind lantern flame (stronger 0.6 - 0.95 flicker) */}
        <div
          className="absolute rounded-full blur-2xl animate-lantern-flicker pointer-events-none -z-10"
          style={{
            left: "49%",
            top: "51%",
            width: "240px",
            height: "240px",
            transform: "translate(-50%, -50%)",
            background:
              "radial-gradient(circle, rgba(255, 179, 71, 0.95) 0%, rgba(201, 162, 75, 0.55) 45%, transparent 75%)",
          }}
        />

        {/* Shelf imagery with brightened warm lift */}
        <div
          className="relative w-full h-full"
          style={{ filter: "brightness(1.15) contrast(1.04)" }}
        >
          <Image
            src="/textures/hero/shelf-left.webp"
            alt="Academy library shelf with lantern and codices"
            fill
            sizes="(max-width: 768px) 0vw, 22vw"
            className="object-contain object-left-bottom drop-shadow-[4px_0_30px_rgba(0,0,0,0.8)]"
          />

          {/* Foreground luminous flare right at lantern core */}
          <div
            className="absolute rounded-full blur-sm animate-lantern-flicker pointer-events-none mix-blend-screen"
            style={{
              left: "49%",
              top: "51%",
              width: "70px",
              height: "70px",
              transform: "translate(-50%, -50%)",
              background:
                "radial-gradient(circle, rgba(255, 240, 205, 0.9) 0%, rgba(255, 179, 71, 0.5) 60%, transparent 80%)",
            }}
          />
        </div>
      </div>

      {/* ============================================================ */}
      {/* ATMOSPHERIC GRADIENT: Soft left-to-right gradient only       */}
      {/* Navy 85% at far left fading to transparent by 55% width.     */}
      {/* On mobile: bottom-to-top gradient so towers stay visible.    */}
      {/* ============================================================ */}
      <div
        className="absolute inset-0 pointer-events-none z-20 hidden md:block"
        style={{
          background:
            "linear-gradient(to right, rgba(10, 14, 26, 0.85) 0%, rgba(10, 14, 26, 0.65) 25%, rgba(10, 14, 26, 0.25) 42%, rgba(10, 14, 26, 0.05) 50%, transparent 55%)",
        }}
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 pointer-events-none z-20 block md:hidden"
        style={{
          background:
            "linear-gradient(to top, rgba(10, 14, 26, 0.95) 0%, rgba(10, 14, 26, 0.8) 42%, rgba(10, 14, 26, 0.2) 65%, transparent 80%)",
        }}
        aria-hidden="true"
      />

      {/* ============================================================ */}
      {/* MAGIC EFFECTS OVERLAY: Dust motes, Fireflies, Wand & Clicks   */}
      {/* ============================================================ */}
      <HeroMagicCanvas
        isMobile={isMobile}
        reducedMotion={prefersReduced}
        isVisible={isVisible}
      />

      {/* ============================================================ */}
      {/* HTML TEXT: Left side, DIRECTLY on artwork, NO BOX            */}
      {/* Mobile: In lower half; castle towers visible above it.       */}
      {/* ============================================================ */}
      <div className="relative z-30 w-full max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 pt-32 pb-14 sm:pb-16 md:py-28 flex items-end md:items-center">
        <HeroText />
      </div>

      {/* Subtle blend into the next section */}
      <div
        className="absolute bottom-0 inset-x-0 h-16 bg-gradient-to-t from-navy to-transparent pointer-events-none z-30"
        aria-hidden="true"
      />
    </section>
  );
};

export default HeroScene;
