"use client";

import React from "react";
import * as THREE from "three";
import { Canvas, useFrame } from "@react-three/fiber";
import { Stars, Sparkles } from "@react-three/drei";
import { EffectComposer, Bloom, Vignette, Noise } from "@react-three/postprocessing";
import { Candles } from "./Candles";
import { CastleSilhouette } from "./CastleSilhouette";

interface CameraRigProps {
  reducedMotion: boolean;
}

const CameraRig: React.FC<CameraRigProps> = ({ reducedMotion }) => {
  useFrame((state) => {
    if (reducedMotion) return;
    const { pointer, camera } = state;
    camera.position.x = THREE.MathUtils.lerp(camera.position.x, pointer.x * 0.7, 0.035);
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, 0.4 + pointer.y * 0.35, 0.035);
    camera.lookAt(0, 0.4, -15);
  });
  return null;
};

export interface GreatHallCanvasProps {
  isMobile?: boolean;
  reducedMotion?: boolean;
  isVisible?: boolean;
}

export const GreatHallCanvas: React.FC<GreatHallCanvasProps> = ({
  isMobile = false,
  reducedMotion = false,
  isVisible = true,
}) => {
  const candleCount = isMobile ? 22 : 54;
  const dpr: [number, number] = isMobile ? [1, 1.5] : [1, 2];

  return (
    <div className="absolute inset-0 w-full h-full pointer-events-none">
      <Canvas
        frameloop={isVisible ? "always" : "never"}
        camera={{ position: [0, 0.4, 4], fov: 50, near: 0.1, far: 80 }}
        dpr={dpr}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
        }}
      >
        {/* Deep blue-grey atmospheric volumetric fog */}
        <color attach="background" args={["#0a0e1e"]} />
        <fogExp2 attach="fog" args={["#0b1028", 0.044]} />

        {/* Camera Parallax */}
        <CameraRig reducedMotion={reducedMotion} />

        {/* Celestial Starry Sky */}
        <Stars
          radius={50}
          depth={35}
          count={isMobile ? 500 : 1200}
          factor={3.5}
          saturation={0.15}
          fade
          speed={reducedMotion ? 0 : 0.4}
        />

        {/* Ambient floating dust & magical embers */}
        <Sparkles
          count={isMobile ? 30 : 80}
          scale={16}
          size={isMobile ? 2.0 : 3.0}
          speed={reducedMotion ? 0 : 0.3}
          color="#ffb347"
          opacity={0.5}
        />
        <Sparkles
          count={isMobile ? 20 : 60}
          scale={18}
          size={isMobile ? 1.5 : 2.5}
          speed={reducedMotion ? 0 : 0.2}
          color="#cfd8ff"
          opacity={0.4}
        />

        {/* Dual Atmosphere Lighting: Warm Candle Left vs Cool Moon Right */}
        {/* Warm candle ambiance on the left */}
        <pointLight
          position={[-5, 2.5, -2]}
          color="#ffb347"
          intensity={1.8}
          distance={16}
          decay={2}
        />
        {/* Cool silvery moonlight on the right */}
        <directionalLight
          position={[7, 9, -4]}
          color="#cfd8ff"
          intensity={1.5}
        />
        <ambientLight color="#111836" intensity={0.5} />

        {/* Floating Candles */}
        <Candles count={candleCount} reducedMotion={reducedMotion} />

        {/* Distant Castle Silhouette */}
        <CastleSilhouette />

        {/* Postprocessing Pipeline */}
        {!isMobile ? (
          <EffectComposer multisampling={0}>
            <Bloom
              luminanceThreshold={0.24}
              luminanceSmoothing={0.88}
              intensity={1.5}
            />
            <Vignette eskil={false} offset={0.12} darkness={1.15} />
            <Noise opacity={0.024} />
          </EffectComposer>
        ) : (
          <EffectComposer multisampling={0}>
            <Bloom
              luminanceThreshold={0.3}
              luminanceSmoothing={0.9}
              intensity={1.1}
            />
            <Vignette eskil={false} offset={0.15} darkness={1.1} />
          </EffectComposer>
        )}
      </Canvas>
    </div>
  );
};

export default GreatHallCanvas;
