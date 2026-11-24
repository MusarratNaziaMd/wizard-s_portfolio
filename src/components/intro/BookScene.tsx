"use client";

import React, { useRef, useState, useEffect, useCallback } from "react";
import Image from "next/image";
import gsap from "gsap";
import { content } from "@/lib/content";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { useWindowSize } from "@/hooks/useWindowSize";
import { Button } from "@/components/ui/Button";

// ============================================================
// TWEAKABLE CONFIGURATION CONSTANTS
// ============================================================
export const WAND_CONFIG = {
  // Wand size on desktop (width & height in px; scaled to 60% on mobile)
  wandSize: { width: 340, height: 144 },
  // Target point on the closed-book frame where the wand tip taps (in % relative to book frame)
  tapPoint: { x: 50, y: 48 },
  // Duration in seconds for wand to arc down and tap the cover
  flightDuration: 0.85,
  // Duration in seconds of the warm light flash at the tap point
  flashDuration: 0.3,
};

export interface BookSceneProps {
  onComplete: () => void;
  onSkip?: () => void;
}

interface SparkleParticle {
  id: number;
  x: number;
  y: number;
  size: number;
  opacity: number;
}

export const BookScene: React.FC<BookSceneProps> = ({ onComplete }) => {
  const prefersReduced = useReducedMotion();
  const { isMobile } = useWindowSize();

  const containerRef = useRef<HTMLDivElement>(null);
  const bookFrameRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const wandBtnRef = useRef<HTMLButtonElement>(null);
  const flashRef = useRef<HTMLDivElement>(null);

  const [hasStarted, setHasStarted] = useState<boolean>(false);
  const [isVideoPlaying, setIsVideoPlaying] = useState<boolean>(false);
  const [showHint, setShowHint] = useState<boolean>(false);
  const [showNameHighlight, setShowNameHighlight] = useState<boolean>(false);
  const [sparkles, setSparkles] = useState<SparkleParticle[]>([]);

  // 1. Hint text fades in after 1.5s
  useEffect(() => {
    if (prefersReduced || hasStarted) return;
    const timer = setTimeout(() => {
      setShowHint(true);
    }, 1500);
    return () => clearTimeout(timer);
  }, [prefersReduced, hasStarted]);

  // Helper to spawn sparkle trail particles
  const spawnSparkles = (x: number, y: number, count = 3) => {
    const newItems: SparkleParticle[] = [];
    for (let i = 0; i < count; i++) {
      newItems.push({
        id: Math.random() + Date.now(),
        x: x + (Math.random() - 0.5) * 24,
        y: y + (Math.random() - 0.5) * 24,
        size: 3 + Math.random() * 5,
        opacity: 0.9,
      });
    }
    setSparkles((prev) => [...prev.slice(-25), ...newItems]);
  };

  // 2. Start Wand Flight and Video Opening Sequence
  const startWandSequence = useCallback(() => {
    if (hasStarted) return;
    setHasStarted(true);
    setShowHint(false);

    if (prefersReduced) {
      if (videoRef.current) {
        videoRef.current.play().catch(() => {});
      }
      setShowNameHighlight(true);
      return;
    }

    const wand = wandBtnRef.current;
    const bookFrame = bookFrameRef.current;
    const flash = flashRef.current;
    const video = videoRef.current;

    if (!wand || !bookFrame || !video) {
      if (video) video.play().catch(() => {});
      return;
    }

    // Stop CSS bobbing
    wand.style.animation = "none";

    const bookRect = bookFrame.getBoundingClientRect();
    const wandRect = wand.getBoundingClientRect();

    // Target tap coordinates in screen space
    const targetX = bookRect.left + (bookRect.width * WAND_CONFIG.tapPoint.x) / 100;
    const targetY = bookRect.top + (bookRect.height * WAND_CONFIG.tapPoint.y) / 100;

    // Relative movement for wand tip (tip is at upper-left: x: 18, y: 22)
    const tipOffsetX = 18;
    const tipOffsetY = 22;
    const deltaX = targetX - (wandRect.left + tipOffsetX);
    const deltaY = targetY - (wandRect.top + tipOffsetY);

    const tl = gsap.timeline();

    // Flight arc to tapPoint with sparkle trail
    let progressObj = { val: 0 };
    tl.to(wand, {
      x: deltaX,
      y: deltaY,
      rotation: -35,
      duration: WAND_CONFIG.flightDuration,
      ease: "power2.inOut",
      onUpdate: () => {
        progressObj.val += 1;
        if (progressObj.val % 2 === 0) {
          const curWandRect = wand.getBoundingClientRect();
          spawnSparkles(curWandRect.left + tipOffsetX, curWandRect.top + tipOffsetY, 2);
        }
      },
    });

    // When wand reaches tapPoint: brief soft flash of warm light (0.3s) and START VIDEO
    tl.add(() => {
      // 1. Start Video
      video.play().catch(() => {});
      setIsVideoPlaying(true);

      // 2. Flash of warm light
      if (flash) {
        gsap.fromTo(
          flash,
          { scale: 0.2, opacity: 1 },
          {
            scale: 2.4,
            opacity: 0,
            duration: WAND_CONFIG.flashDuration,
            ease: "power2.out",
          }
        );
      }
    });

    // During the first second of the video, wand lifts away, drifts up & right, and fades out
    tl.to(
      wand,
      {
        x: deltaX + 220,
        y: deltaY - 180,
        rotation: -10,
        opacity: 0,
        duration: 1.0,
        ease: "power2.out",
      },
      `+=${WAND_CONFIG.flashDuration * 0.4}`
    );

    // As the book opens in the video (~1.2s into playback), reveal the name with golden radiance
    setTimeout(() => {
      setShowNameHighlight(true);
    }, 1350);
  }, [hasStarted, prefersReduced]);

  // Keyboard accessibility
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if ((e.key === "Enter" || e.key === " ") && !hasStarted) {
        e.preventDefault();
        startWandSequence();
      }
    },
    [hasStarted, startWandSequence]
  );

  // Monitor video playback time
  const handleTimeUpdate = () => {
    if (!videoRef.current) return;
    const cur = videoRef.current.currentTime;
    // When book opens (~1.2s), show name highlight if not already shown
    if (cur >= 1.2 && !showNameHighlight) {
      setShowNameHighlight(true);
    }
    // Hold final open book frame if near end
    if (cur >= 3.85) {
      videoRef.current.pause();
    }
  };

  // Sparkles fading
  useEffect(() => {
    if (sparkles.length === 0) return;
    const timer = setTimeout(() => {
      setSparkles((prev) =>
        prev
          .map((s) => ({ ...s, opacity: s.opacity - 0.15 }))
          .filter((s) => s.opacity > 0.1)
      );
    }, 60);
    return () => clearTimeout(timer);
  }, [sparkles]);

  // Transition into hero
  const handleEnterHero = () => {
    onComplete();
  };

  const scaleFactor = isMobile ? 0.6 : 1.0;
  const currentWandWidth = WAND_CONFIG.wandSize.width * scaleFactor;
  const currentWandHeight = WAND_CONFIG.wandSize.height * scaleFactor;

  return (
    <div
      ref={containerRef}
      onKeyDown={handleKeyDown}
      className="relative w-full h-full flex flex-col items-center justify-center bg-[#070a14] overflow-hidden select-none"
    >
      {/* Sparkles Particle Trail */}
      <div className="fixed inset-0 pointer-events-none z-30 overflow-hidden">
        {sparkles.map((sp) => (
          <div
            key={sp.id}
            className="absolute rounded-full pointer-events-none"
            style={{
              left: sp.x,
              top: sp.y,
              width: `${sp.size}px`,
              height: `${sp.size}px`,
              opacity: sp.opacity,
              background:
                "radial-gradient(circle, #ffffff 0%, #ffeaad 35%, rgba(255, 179, 71, 0.8) 70%, transparent 100%)",
              boxShadow: "0 0 8px rgba(255, 179, 71, 0.9)",
              transform: "translate(-50%, -50%)",
              mixBlendMode: "screen",
            }}
          />
        ))}
      </div>

      {/* Closed Book Frame & Video Container */}
      <div
        ref={bookFrameRef}
        onClick={startWandSequence}
        className="relative w-[92vw] max-w-[860px] aspect-[16/9] sm:aspect-[16/10] rounded-2xl overflow-hidden border border-gold/30 shadow-[0_20px_60px_rgba(0,0,0,0.9)] bg-[#0a0e1c] cursor-pointer group"
      >
        {/* HTML5 Video Element */}
        <video
          ref={videoRef}
          src="/intro/book.mp4"
          playsInline
          muted
          preload="auto"
          onTimeUpdate={handleTimeUpdate}
          onEnded={handleEnterHero}
          className="w-full h-full object-cover object-center"
        />

        {/* Subtle grimoire leather overlay vignette before video plays */}
        {!isVideoPlaying && (
          <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-[#070a14]/50 via-transparent to-[#070a14]/30" />
        )}

        {/* Tap Point Warm Light Flash Element */}
        <div
          ref={flashRef}
          className="absolute rounded-full pointer-events-none opacity-0"
          style={{
            left: `${WAND_CONFIG.tapPoint.x}%`,
            top: `${WAND_CONFIG.tapPoint.y}%`,
            width: "140px",
            height: "140px",
            transform: "translate(-50%, -50%)",
            background:
              "radial-gradient(circle, #ffffff 0%, #fff2d1 25%, rgba(255, 179, 71, 0.95) 50%, rgba(201, 162, 75, 0.4) 75%, transparent 100%)",
            boxShadow: "0 0 35px rgba(255, 179, 71, 1)",
            mixBlendMode: "screen",
          }}
        />

        {/* ============================================================ */}
        {/* NAME SHOWN PROMINENTLY & HIGHLIGHTED AFTER BOOK OPENS        */}
        {/* ============================================================ */}
        <div
          className={`absolute inset-0 z-20 flex flex-col items-center justify-center text-center p-6 transition-all duration-1000 ${
            showNameHighlight
              ? "opacity-100 pointer-events-auto backdrop-blur-[2px] bg-[#070a14]/30"
              : "opacity-0 pointer-events-none"
          }`}
        >
          {/* Soft volumetric column of warm golden light rising from pages */}
          <div
            className="absolute bottom-0 w-3/4 h-full pointer-events-none -z-10 animate-pulse"
            style={{
              background:
                "radial-gradient(ellipse at bottom, rgba(255, 179, 71, 0.45) 0%, rgba(201, 162, 75, 0.2) 40%, transparent 75%)",
              filter: "blur(20px)",
              animationDuration: "4s",
            }}
          />

          {/* Golden Celestial Ornament */}
          <div className="text-gold text-sm tracking-[0.4em] font-cinzel mb-2 drop-shadow-[0_0_8px_rgba(201,162,75,0.8)]">
            ✦ ❖ ✦
          </div>

          {/* Subtitle */}
          <p className="font-cormorant italic text-lg sm:text-2xl text-candle mb-1 drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
            Inscribed in the Sanctum Grimoire
          </p>

          {/* NAME IN HIGH-CONTRAST GLEAMING GOLD CINZEL */}
          <h1 className="font-cinzel text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-[#fff5d6] via-gold to-[#fff5d6] drop-shadow-[0_0_25px_rgba(255,179,71,0.95)] drop-shadow-[0_0_60px_rgba(201,162,75,0.7)] drop-shadow-[0_3px_6px_rgba(0,0,0,0.95)] leading-tight max-w-2xl mx-auto my-2">
            {content.profile.name}
          </h1>

          {/* ROLE */}
          <p className="font-cinzel text-xs sm:text-sm md:text-base tracking-[0.25em] uppercase font-semibold text-parchment drop-shadow-[0_0_15px_rgba(255,179,71,0.85)] drop-shadow-[0_1px_3px_rgba(0,0,0,0.9)] mb-4">
            {content.profile.role}
          </p>

          {/* Ornate Divider */}
          <div className="flex items-center gap-3 my-2 text-gold/60 text-xs drop-shadow-[0_0_6px_rgba(201,162,75,0.6)]">
            <span>✦</span>
            <div className="w-24 sm:w-36 h-px bg-gradient-to-r from-transparent via-gold/70 to-transparent" />
            <span>✦</span>
          </div>

          {/* Tagline */}
          <p className="font-cormorant italic text-base sm:text-xl text-parchment/90 max-w-lg mx-auto drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)] mb-6">
            &ldquo;{content.profile.tagline}&rdquo;
          </p>

          {/* Enter Button */}
          <div className="pt-2">
            <Button variant="primary" onClick={handleEnterHero}>
              Enter Grimoire ✦
            </Button>
          </div>
        </div>
      </div>

      {/* ============================================================ */}
      {/* FLOATING WAND BUTTON: Zero dark background, pure transparency */}
      {/* ============================================================ */}
      <button
        ref={wandBtnRef}
        type="button"
        aria-label="Open the book with the wand"
        onClick={(e) => {
          e.stopPropagation();
          startWandSequence();
        }}
        className={`absolute z-40 cursor-pointer focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-gold/70 rounded-full transition-shadow duration-300 ${
          !hasStarted ? "animate-wand-bob" : ""
        }`}
        style={{
          width: `${currentWandWidth}px`,
          height: `${currentWandHeight}px`,
          top: isMobile ? "20%" : "24%",
          left: isMobile ? "35%" : "44%",
          transform: "rotate(-22deg)",
          transformOrigin: "18px 22px",
          background: "transparent",
          border: "none",
        }}
      >
        {/* Wand WebP/PNG with mix-blend-mode: screen ensuring 0 black background */}
        <div
          className="relative w-full h-full select-none pointer-events-none"
          style={{ mixBlendMode: "screen" }}
        >
          <Image
            src="/textures/intro/wand.png"
            alt=""
            fill
            sizes={`${currentWandWidth}px`}
            priority
            className="object-contain object-left-top"
          />

          {/* Luminous Soft Glow Sprite at Upper-Left Tip (No hard edges, no square outlines, additive blending) */}
          <div
            className="absolute rounded-full animate-wand-glow pointer-events-none"
            style={{
              left: `${18 * scaleFactor}px`,
              top: `${22 * scaleFactor}px`,
              width: `${60 * scaleFactor}px`,
              height: `${60 * scaleFactor}px`,
              transform: "translate(-50%, -50%)",
              background:
                "radial-gradient(circle, rgba(255, 255, 255, 1) 0%, rgba(255, 240, 190, 0.95) 20%, rgba(255, 179, 71, 0.75) 45%, rgba(201, 162, 75, 0.25) 70%, transparent 100%)",
              boxShadow: "0 0 18px rgba(255, 179, 71, 0.9)",
              mixBlendMode: "screen",
            }}
          />
        </div>
      </button>

      {/* Hint Text fading in after 1.5s */}
      <div className="absolute bottom-8 sm:bottom-12 w-full text-center pointer-events-none px-4 z-20">
        <p
          className={`font-cormorant text-xl sm:text-2xl text-candle italic tracking-wider drop-shadow-[0_2px_10px_rgba(0,0,0,0.9)] transition-opacity duration-700 ${
            showHint && !hasStarted ? "opacity-100" : "opacity-0"
          }`}
        >
          {content.intro.hint}
        </p>
      </div>
    </div>
  );
};

export default BookScene;
