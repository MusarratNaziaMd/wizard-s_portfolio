"use client";

import React, { useRef } from "react";
import * as THREE from "three";
import { Canvas, useFrame } from "@react-three/fiber";
import { EffectComposer, Bloom, Vignette } from "@react-three/postprocessing";
import { useWindowSize } from "@/hooks/useWindowSize";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { Book3D } from "./Book3D";
import { Wand3D } from "./Wand3D";
import { IntroSparkles } from "./IntroSparkles";

export interface IntroCanvasProps {
  isWandHovered: boolean;
  isBookOpen: boolean;
  isPageTurned: boolean;
  onWandHoverChange: (hovered: boolean) => void;
  onWandTap: () => void;
  monogram?: string;
}

const CameraRig: React.FC<{ isOpen: boolean; isMobile: boolean; reducedMotion: boolean }> = ({
  isOpen,
  isMobile,
  reducedMotion,
}) => {
  const targetPos = useRef(new THREE.Vector3(0, 2.8, isMobile ? 5.6 : 5.0));

  useFrame((state, delta) => {
    if (reducedMotion) {
      state.camera.position.set(0, isOpen ? (isMobile ? 2.2 : 1.9) : (isMobile ? 3.0 : 2.6), isMobile ? 4.8 : 4.2);
      state.camera.lookAt(0, -0.1, 0);
      return;
    }

    const destY = isOpen ? (isMobile ? 2.2 : 1.9) : (isMobile ? 3.0 : 2.6);
    const destZ = isOpen ? (isMobile ? 4.8 : 4.1) : (isMobile ? 5.8 : 5.0);
    targetPos.current.set(0, destY, destZ);

    state.camera.position.lerp(targetPos.current, delta * 2.0);
    state.camera.lookAt(0, -0.1, 0);
  });

  return null;
};

export const IntroCanvas: React.FC<IntroCanvasProps> = ({
  isWandHovered,
  isBookOpen,
  isPageTurned,
  onWandHoverChange,
  onWandTap,
  monogram = "MN",
}) => {
  const { isMobile } = useWindowSize();
  const prefersReduced = useReducedMotion();

  return (
    <Canvas
      gl={{
        alpha: true,
        antialias: false,
        powerPreference: "high-performance",
        stencil: false,
        depth: true,
      }}
      dpr={[1, isMobile ? 1.2 : 1.5]}
      camera={{ position: [0, 2.8, isMobile ? 5.8 : 5.0], fov: 42, near: 0.1, far: 40 }}
      style={{
        background: "transparent",
        width: "100%",
        height: "100%",
      }}
    >
      <CameraRig
        isOpen={isBookOpen}
        isMobile={isMobile}
        reducedMotion={prefersReduced}
      />

      {/* Atmospheric Lighting */}
      <ambientLight intensity={0.65} color="#161f38" />
      <directionalLight position={[2, 6, 4]} intensity={1.5} color="#fff6e5" castShadow />
      <pointLight position={[-3, 1, 2]} intensity={0.9} color="#c9a24b" distance={8} />

      {/* 3D Grimoire Book */}
      <Book3D
        isOpen={isBookOpen}
        isPageTurned={isPageTurned}
        reducedMotion={prefersReduced}
        monogram={monogram}
        isMobile={isMobile}
      />

      {/* 3D Animated Wand */}
      <Wand3D
        isHovered={isWandHovered}
        isTapped={isBookOpen}
        onHoverChange={onWandHoverChange}
        onTap={onWandTap}
        reducedMotion={prefersReduced}
      />

      {/* Circular Particle Sparkles & Tap Burst */}
      <IntroSparkles
        isTapped={isBookOpen}
        reducedMotion={prefersReduced}
        isMobile={isMobile}
      />

      {/* Lightweight Postprocessing: Bloom & Vignette */}
      <EffectComposer multisampling={0}>
        <Bloom
          luminanceThreshold={0.65}
          luminanceSmoothing={0.3}
          intensity={0.7}
          mipmapBlur
        />
        <Vignette eskil={false} offset={0.2} darkness={0.8} />
      </EffectComposer>
    </Canvas>
  );
};

export default IntroCanvas;
