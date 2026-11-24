"use client";

import React from "react";
import { Canvas } from "@react-three/fiber";
import { Sparkles } from "@react-three/drei";
import { EffectComposer, Bloom } from "@react-three/postprocessing";

export interface HeroOverlayCanvasProps {
  isMobile: boolean;
  reducedMotion: boolean;
  isVisible: boolean;
}

export const HeroOverlayCanvas: React.FC<HeroOverlayCanvasProps> = ({
  isMobile,
  reducedMotion,
  isVisible,
}) => {
  return (
    <Canvas
      gl={{
        alpha: true,
        antialias: false,
        powerPreference: "high-performance",
        stencil: false,
        depth: false,
      }}
      dpr={[1, isMobile ? 1.2 : 1.5]}
      camera={{ position: [0, 0, 8], fov: 42, near: 0.1, far: 40 }}
      frameloop={isVisible ? "always" : "never"}
      style={{
        background: "transparent",
        pointerEvents: "none",
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
      }}
    >
      {/* Drifting golden stardust sparkles */}
      <Sparkles
        count={isMobile ? 25 : 60}
        scale={[16, 10, 14]}
        position={[0, 1, -2]}
        size={isMobile ? 1.5 : 2.2}
        speed={reducedMotion ? 0 : 0.25}
        color="#c9a24b"
        opacity={0.5}
      />

      <EffectComposer multisampling={0}>
        <Bloom
          luminanceThreshold={0.6}
          luminanceSmoothing={0.3}
          intensity={0.6}
          mipmapBlur
        />
      </EffectComposer>
    </Canvas>
  );
};

export default HeroOverlayCanvas;
