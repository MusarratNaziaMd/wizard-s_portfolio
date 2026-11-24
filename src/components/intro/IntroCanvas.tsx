"use client";

import React, { useRef } from "react";
import * as THREE from "three";
import { Canvas, useFrame } from "@react-three/fiber";
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
  const targetPos = useRef(new THREE.Vector3(0, 2.5, isMobile ? 5.6 : 4.8));

  useFrame((state, delta) => {
    if (reducedMotion) {
      state.camera.position.set(
        0,
        isOpen ? (isMobile ? 2.1 : 1.8) : (isMobile ? 2.8 : 2.5),
        isMobile ? (isOpen ? 5.2 : 5.8) : (isOpen ? 4.2 : 4.8)
      );
      state.camera.lookAt(0, -0.1, 0);
      return;
    }

    const destY = isOpen ? (isMobile ? 2.1 : 1.8) : (isMobile ? 2.8 : 2.5);
    const destZ = isMobile ? (isOpen ? 5.2 : 5.8) : (isOpen ? 4.2 : 4.8);
    targetPos.current.set(0, destY, destZ);

    state.camera.position.lerp(targetPos.current, delta * 2.2);
    state.camera.lookAt(0, -0.1, 0);
  });

  return null;
};

export const IntroCanvas: React.FC<IntroCanvasProps> = ({
  isWandHovered,
  isBookOpen,
  isPageTurned,
  onWandHoverChange,
  onTap = () => {},
  onWandTap,
  monogram = "MN",
}: IntroCanvasProps & { onTap?: () => void }) => {
  const { isMobile } = useWindowSize();
  const prefersReduced = useReducedMotion();
  const handleTap = onWandTap || onTap;

  return (
    <Canvas
      gl={{
        alpha: true,
        antialias: true,
        powerPreference: "high-performance",
        stencil: false,
        depth: true,
      }}
      dpr={[1, isMobile ? 1.2 : 1.5]}
      camera={{ position: [0, 2.6, isMobile ? 5.8 : 4.8], fov: 40, near: 0.1, far: 40 }}
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

      {/* Atmospheric Soft Lighting */}
      <ambientLight intensity={0.7} color="#141c32" />
      <directionalLight position={[2.5, 6, 4]} intensity={1.6} color="#fff6e8" castShadow />
      <pointLight position={[-3, 1.2, 2.5]} intensity={0.8} color="#c9a24b" distance={9} />

      {/* 3D Grimoire Book */}
      <Book3D
        isOpen={isBookOpen}
        isPageTurned={isPageTurned}
        reducedMotion={prefersReduced}
        monogram={monogram}
        isMobile={isMobile}
      />

      {/* Floating 3D Wand with Glow Sprite & Sparkles */}
      <Wand3D
        isHovered={isWandHovered}
        isTapped={isBookOpen}
        onHoverChange={onWandHoverChange}
        onTap={handleTap}
        reducedMotion={prefersReduced}
      />

      {/* Ambient Stardust & Tap Sparkle Burst */}
      <IntroSparkles
        isTapped={isBookOpen}
        reducedMotion={prefersReduced}
        isMobile={isMobile}
      />
    </Canvas>
  );
};

export default IntroCanvas;
