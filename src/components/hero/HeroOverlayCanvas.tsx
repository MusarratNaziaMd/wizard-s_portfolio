"use client";

import React, { useRef } from "react";
import * as THREE from "three";
import { Canvas, useFrame } from "@react-three/fiber";
import { Sparkles } from "@react-three/drei";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import { Candles } from "@/components/three/Candles";

export interface HeroOverlayCanvasProps {
  isMobile: boolean;
  reducedMotion: boolean;
  isVisible: boolean;
}

const SubtleCameraParallax: React.FC<{ reducedMotion: boolean }> = ({ reducedMotion }) => {
  const targetPos = useRef(new THREE.Vector3(0, 0, 8));

  useFrame((state, delta) => {
    if (reducedMotion) return;
    const { x, y } = state.pointer;
    targetPos.current.x = x * 0.4;
    targetPos.current.y = y * 0.25;
    state.camera.position.lerp(targetPos.current, delta * 2.5);
    state.camera.lookAt(0, 0.5, 0);
  });

  return null;
};

export const HeroOverlayCanvas: React.FC<HeroOverlayCanvasProps> = ({
  isMobile,
  reducedMotion,
  isVisible,
}) => {
  const candleCount = isMobile ? 12 : 25;

  return (
    <Canvas
      gl={{
        alpha: true,
        antialias: false,
        powerPreference: "high-performance",
        stencil: false,
        depth: true,
      }}
      dpr={[1, isMobile ? 1.5 : 2]}
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
      <SubtleCameraParallax reducedMotion={reducedMotion} />

      {/* Ambient mystical starlight */}
      <ambientLight intensity={0.5} color="#cfd8ff" />

      {/* Subtle warm rim light */}
      <pointLight position={[-4, 2, 2]} intensity={1.2} color="#ffb347" distance={15} decay={2} />

      {/* 3D Floating Candles with bobbing & flickering flame cores */}
      <Candles count={candleCount} reducedMotion={reducedMotion} />

      {/* Drifting golden stardust sparkles */}
      <Sparkles
        count={isMobile ? 35 : 70}
        scale={[16, 10, 14]}
        position={[0, 1, -2]}
        size={isMobile ? 1.8 : 2.5}
        speed={reducedMotion ? 0 : 0.35}
        color="#c9a24b"
        opacity={0.65}
      />

      {/* Secondary cooler celestial dust in the distance */}
      <Sparkles
        count={isMobile ? 20 : 45}
        scale={[18, 12, 16]}
        position={[2, 3, -6]}
        size={isMobile ? 1.5 : 2.2}
        speed={reducedMotion ? 0 : 0.25}
        color="#cfd8ff"
        opacity={0.4}
      />

      {/* Lightweight Postprocessing: Bloom for emissive candle flames and stardust */}
      <EffectComposer multisampling={0}>
        <Bloom
          luminanceThreshold={0.55}
          luminanceSmoothing={0.25}
          intensity={0.85}
          mipmapBlur
        />
      </EffectComposer>
    </Canvas>
  );
};

export default HeroOverlayCanvas;
