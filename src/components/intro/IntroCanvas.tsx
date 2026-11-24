"use client";

import React, { useRef } from "react";
import * as THREE from "three";
import { Canvas, useFrame } from "@react-three/fiber";
import { Sparkles } from "@react-three/drei";
import { EffectComposer, Bloom, Vignette } from "@react-three/postprocessing";
import { useWindowSize } from "@/hooks/useWindowSize";

interface GoldenOrbProps {
  isHovered: boolean;
  isBloomed: boolean;
}

const GoldenOrb: React.FC<GoldenOrbProps> = ({ isHovered, isBloomed }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const glowRef = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    if (!meshRef.current) return;
    const t = state.clock.getElapsedTime();

    if (isBloomed) {
      meshRef.current.scale.lerp(new THREE.Vector3(12, 12, 12), delta * 2.2);
      if (glowRef.current) {
        glowRef.current.scale.lerp(new THREE.Vector3(16, 16, 16), delta * 2.5);
      }
    } else {
      const baseScale = isHovered ? 1.25 : 1.0;
      const pulse = Math.sin(t * 2.6) * 0.08;
      const targetScale = baseScale + pulse;
      meshRef.current.scale.lerp(
        new THREE.Vector3(targetScale, targetScale, targetScale),
        delta * 6
      );

      if (glowRef.current) {
        const outerScale = targetScale * 1.5;
        glowRef.current.scale.set(outerScale, outerScale, outerScale);
      }
    }
  });

  return (
    <group position={[0, 0, 0]}>
      <mesh ref={glowRef}>
        <sphereGeometry args={[0.42, 32, 32]} />
        <meshBasicMaterial
          color="#c9a24b"
          transparent
          opacity={isBloomed ? 0.08 : (isHovered ? 0.35 : 0.2)}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      <mesh ref={meshRef}>
        <sphereGeometry args={[0.3, 32, 32]} />
        <meshStandardMaterial
          color="#f2e8cf"
          emissive="#c9a24b"
          emissiveIntensity={isBloomed ? 4.5 : (isHovered ? 2.8 : 2.0)}
          roughness={0.1}
          metalness={0.9}
        />
      </mesh>

      <pointLight
        position={[0, 0, 0]}
        color="#c9a24b"
        intensity={isBloomed ? 12 : (isHovered ? 4.5 : 3)}
        distance={10}
      />
      <ambientLight intensity={0.2} />
    </group>
  );
};

export interface IntroCanvasProps {
  isHovered: boolean;
  isBloomed: boolean;
}

export const IntroCanvas: React.FC<IntroCanvasProps> = ({
  isHovered,
  isBloomed,
}) => {
  const { isMobile } = useWindowSize();
  const sparkleCount = isMobile ? (isBloomed ? 45 : 20) : (isBloomed ? 110 : 45);

  return (
    <div className="fixed inset-0 w-screen h-screen pointer-events-none z-0">
      <Canvas
        camera={{ position: [0, 0, 4.5], fov: 45 }}
        dpr={[1, 2]}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
        }}
      >
        <color attach="background" args={["#0a0e1a"]} />

        <GoldenOrb isHovered={isHovered} isBloomed={isBloomed} />

        <Sparkles
          count={sparkleCount}
          scale={isBloomed ? 14 : 7}
          size={isBloomed ? 3.5 : 2}
          speed={isBloomed ? 0.9 : 0.25}
          color="#c9a24b"
          opacity={isBloomed ? 0.9 : 0.6}
        />

        <EffectComposer multisampling={0}>
          <Bloom
            luminanceThreshold={0.25}
            luminanceSmoothing={0.9}
            intensity={isBloomed ? 2.8 : 1.4}
          />
          <Vignette eskil={false} offset={0.15} darkness={1.15} />
        </EffectComposer>
      </Canvas>
    </div>
  );
};

export default IntroCanvas;
