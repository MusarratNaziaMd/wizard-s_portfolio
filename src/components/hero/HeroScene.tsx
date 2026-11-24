"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import dynamic from "next/dynamic";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { useWindowSize } from "@/hooks/useWindowSize";
import { HeroText } from "./HeroText";
import type { HeroOverlayCanvasProps } from "./HeroOverlayCanvas";

const DynamicHeroOverlayCanvas = dynamic<HeroOverlayCanvasProps>(
  () => import("./HeroOverlayCanvas").then((mod) => mod.HeroOverlayCanvas),
  { ssr: false }
);

export const HeroScene: React.FC = () => {
  const containerRef = useRef<HTMLElement>(null);
  const skyRef = useRef<HTMLDivElement>(null);
  const castleRef = useRef<HTMLDivElement>(null);
  const fogRef = useRef<HTMLDivElement>(null);
  const owlRef = useRef<HTMLDivElement>(null);
  const shelfRef = useRef<HTMLDivElement>(null);

  const { isMobile } = useWindowSize();
  const prefersReduced = useReducedMotion();
  const [isVisible, setIsVisible] = useState<boolean>(true);

  // Smooth mouse parallax animation loop
  useEffect(() => {
    if (prefersReduced) return;

    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;
    let animationFrameId: number;

    const handleMouseMove = (e: MouseEvent) => {
      // Normalized coordinates: -1 to 1
      targetX = (e.clientX / window.innerWidth - 0.5) * 2;
      targetY = (e.clientY / window.innerHeight - 0.5) * 2;
    };

    const handleMouseLeave = () => {
      targetX = 0;
      targetY = 0;
    };

    const animateParallax = () => {
      currentX += (targetX - currentX) * 0.08;
      currentY += (targetY - currentY) * 0.08;

      // Parallax strengths:
      // Sky: 2% (~20px X, 12px Y)
      if (skyRef.current) {
        skyRef.current.style.transform = `scaleX(-1) translate3d(${currentX * -20}px, ${currentY * 12}px, 0)`;
      }

      // Castle: 4% (~40px X, 24px Y)
      if (castleRef.current) {
        castleRef.current.style.transform = `translate3d(${currentX * 40}px, ${currentY * 24}px, 0)`;
      }

      // Fog: 6% (~60px X, 30px Y)
      if (fogRef.current) {
        fogRef.current.style.transform = `translate3d(${currentX * 60}px, ${currentY * 30}px, 0)`;
      }

      // Owl: 10% (~100px X, 45px Y)
      if (owlRef.current) {
        owlRef.current.style.transform = `translate3d(${currentX * 100}px, ${currentY * 45}px, 0)`;
      }

      // Shelf: 10% in the opposite direction (-100px X, -45px Y)
      if (shelfRef.current) {
        shelfRef.current.style.transform = `translate3d(${-currentX * 100}px, ${-currentY * 45}px, 0)`;
      }

      animationFrameId = requestAnimationFrame(animateParallax);
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("mouseleave", handleMouseLeave);
    animationFrameId = requestAnimationFrame(animateParallax);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, [prefersReduced]);

  // Performance: Pause Canvas rendering when Hero is off-screen
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
      className="relative w-full min-h-screen flex items-center overflow-hidden bg-[#070a14] border-b border-gold/15"
    >
      {/* ============================================================ */}
      {/* LAYER 1: SKY-MOON (Full hero, scaleX(-1) so moon sits right)   */}
      {/* ============================================================ */}
      <div
        ref={skyRef}
        className="absolute inset-0 w-full h-full pointer-events-none select-none will-change-transform"
        style={{ transform: "scaleX(-1)" }}
        aria-hidden="true"
      >
        <Image
          src="/textures/hero/sky-moon.webp"
          alt="Moonlit cloudy fantasy sky"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center scale-105"
        />

        {/* Subtle nocturnal blue tint overlay to unify color harmony */}
        <div className="absolute inset-0 bg-[#0a0e1a]/25 mix-blend-multiply" />
        <div className="absolute inset-0 bg-gradient-to-t from-navy/90 via-transparent to-midnight/40" />

        {/* Deep edge vignette */}
        <div className="absolute inset-0 shadow-[inset_0_0_120px_rgba(7,10,20,0.85)]" />
      </div>

      {/* ============================================================ */}
      {/* LAYER 2: CASTLE (Right-center, water reflection at base)     */}
      {/* ============================================================ */}
      <div
        ref={castleRef}
        className="absolute bottom-0 pointer-events-none select-none will-change-transform z-10 w-[95vw] left-1/2 -translate-x-1/2 md:left-auto md:translate-x-0 md:right-[4%] lg:right-[8%] md:w-[55vw] max-w-[1250px] aspect-[2000/1187]"
        aria-hidden="true"
      >
        <Image
          src="/textures/hero/castle.webp"
          alt="Gothic academy fortress reflected in misty waters"
          fill
          priority
          sizes="(max-width: 768px) 95vw, 55vw"
          className="object-contain object-bottom"
        />
      </div>

      {/* ============================================================ */}
      {/* LAYER 3: FOG (Drifting blue mist, mix-blend-mode: screen)    */}
      {/* ============================================================ */}
      <div
        ref={fogRef}
        className="absolute inset-x-0 bottom-0 pointer-events-none select-none will-change-transform z-15 [mask-image:linear-gradient(to_top,black_30%,transparent_100%)] [-webkit-mask-image:linear-gradient(to_top,black_30%,transparent_100%)]"
        aria-hidden="true"
      >
        {/* Lower dense fog: drifts left, opacity 0.7 */}
        <div className="relative w-full h-44 sm:h-60 md:h-80 overflow-hidden mix-blend-screen opacity-70">
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

        {/* Higher lighter fog: sits higher, drifts right, lower opacity 0.4 */}
        <div className="absolute bottom-16 sm:bottom-28 md:bottom-36 inset-x-0 h-36 sm:h-52 md:h-68 overflow-hidden mix-blend-screen opacity-40">
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
      {/* LAYER 4: OWL ON BOOKS (Right edge, overlaps castle right)    */}
      {/* ============================================================ */}
      <div
        ref={owlRef}
        className="absolute bottom-0 right-0 pointer-events-none select-none will-change-transform z-20 w-[35vw] md:w-[24vw] min-w-[180px] max-w-[420px] aspect-[900/1200]"
        aria-hidden="true"
      >
        <div className="relative w-full h-full animate-owl-breathe">
          <Image
            src="/textures/hero/owl-books.webp"
            alt="Scholarly owl perched atop ancient grimoires"
            fill
            sizes="(max-width: 768px) 35vw, 24vw"
            className="object-contain object-right-bottom drop-shadow-[0_10px_25px_rgba(0,0,0,0.85)]"
          />
        </div>
      </div>

      {/* ============================================================ */}
      {/* LAYER 5: SHELF-LEFT & LANTERN GLOW (Desktop only, flush left) */}
      {/* ============================================================ */}
      <div
        ref={shelfRef}
        className="absolute bottom-0 left-0 pointer-events-none select-none will-change-transform z-20 hidden md:block w-[22vw] min-w-[280px] max-w-[440px] aspect-[900/1402]"
        aria-hidden="true"
      >
        {/* Warm amber radial glow situated directly behind the lantern (center at 49% left, 51% top) */}
        <div
          className="absolute rounded-full blur-2xl animate-lantern-flicker pointer-events-none -z-10"
          style={{
            left: "49%",
            top: "51%",
            width: "220px",
            height: "220px",
            transform: "translate(-50%, -50%)",
            background:
              "radial-gradient(circle, rgba(255, 179, 71, 0.9) 0%, rgba(201, 162, 75, 0.5) 45%, rgba(11, 16, 48, 0) 70%)",
          }}
        />

        {/* Shelf imagery */}
        <div className="relative w-full h-full">
          <Image
            src="/textures/hero/shelf-left.webp"
            alt="Academy library shelf with lantern and codices"
            fill
            sizes="(max-width: 768px) 0vw, 22vw"
            className="object-contain object-left-bottom drop-shadow-[4px_0_30px_rgba(0,0,0,0.8)]"
          />

          {/* Foreground subtle luminous flare right at lantern core */}
          <div
            className="absolute rounded-full blur-md animate-lantern-flicker pointer-events-none mix-blend-screen"
            style={{
              left: "49%",
              top: "51%",
              width: "70px",
              height: "70px",
              transform: "translate(-50%, -50%)",
              background:
                "radial-gradient(circle, rgba(255, 230, 180, 0.8) 0%, rgba(255, 179, 71, 0.4) 60%, transparent 80%)",
            }}
          />
        </div>
      </div>

      {/* ============================================================ */}
      {/* LAYER 6: 3D R3F FLOATING CANDLES & STARDUST OVERLAY          */}
      {/* ============================================================ */}
      <div className="absolute inset-0 pointer-events-none z-25 overflow-hidden" aria-hidden="true">
        <DynamicHeroOverlayCanvas
          isMobile={isMobile}
          reducedMotion={prefersReduced}
          isVisible={isVisible}
        />
      </div>

      {/* ============================================================ */}
      {/* LAYER 7: ACCESSIBLE HTML TEXT CONTENT (Left-center)          */}
      {/* ============================================================ */}
      <div className="relative z-30 w-full max-w-7xl mx-auto px-6 sm:px-12 lg:px-20 py-24 sm:py-32 flex items-center">
        <HeroText />
      </div>

      {/* Atmospheric bottom blend into the next section */}
      <div
        className="absolute bottom-0 inset-x-0 h-24 bg-gradient-to-t from-navy to-transparent pointer-events-none z-30"
        aria-hidden="true"
      />
    </section>
  );
};

export default HeroScene;
