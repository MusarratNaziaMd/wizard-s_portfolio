"use client";

import React, { useEffect, useState, useRef, useSyncExternalStore } from "react";
import dynamic from "next/dynamic";
import { useWindowSize } from "@/hooks/useWindowSize";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import type { GreatHallCanvasProps } from "./GreatHallCanvas";

// Pure CSS Lite Mode Fallback (used when WebGL is unavailable or during SSR)
const LiteModeFallback: React.FC = () => {
  return (
    <div
      className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden"
      aria-hidden="true"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-[#0b1030] via-[#0a0e1e] to-[#070a14]" />
      {/* Decorative star specks */}
      <div
        className="absolute inset-0 opacity-40"
        style={{
          backgroundImage:
            "radial-gradient(#cfd8ff 1px, transparent 1px), radial-gradient(#ffb347 1px, transparent 1px)",
          backgroundSize: "60px 60px, 90px 90px",
          backgroundPosition: "0 0, 30px 45px",
        }}
      />
      {/* Soft lunar glow top right */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#cfd8ff]/10 rounded-full blur-3xl" />
      {/* Soft warm candle glow bottom left */}
      <div className="absolute bottom-10 left-10 w-80 h-80 bg-[#ffb347]/10 rounded-full blur-3xl" />
    </div>
  );
};

const DynamicGreatHallCanvas = dynamic<GreatHallCanvasProps>(
  () => import("./GreatHallCanvas").then((mod) => mod.GreatHallCanvas),
  {
    ssr: false,
    loading: () => <LiteModeFallback />,
  }
);

function subscribeWebGL() {
  return () => {};
}

function checkWebGL(): boolean {
  if (typeof window === "undefined") return true;
  try {
    const canvas = document.createElement("canvas");
    return Boolean(
      window.WebGLRenderingContext &&
        (canvas.getContext("webgl") || canvas.getContext("experimental-webgl"))
    );
  } catch {
    return false;
  }
}

function getWebGLServerSnapshot(): boolean {
  return true;
}

export const GreatHallScene: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { isMobile } = useWindowSize();
  const prefersReduced = useReducedMotion();
  const hasWebGL = useSyncExternalStore(subscribeWebGL, checkWebGL, getWebGLServerSnapshot);
  const [isVisible, setIsVisible] = useState<boolean>(true);

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
    <div
      ref={containerRef}
      className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none"
      aria-hidden="true"
    >
      {!hasWebGL ? (
        <LiteModeFallback />
      ) : (
        <DynamicGreatHallCanvas
          isMobile={isMobile}
          reducedMotion={prefersReduced}
          isVisible={isVisible}
        />
      )}
    </div>
  );
};

export default GreatHallScene;
