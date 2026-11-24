"use client";

import React, { useMemo, useRef } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import { createCircularSparkleTexture } from "./SparklesSprite";

export interface IntroSparklesProps {
  isTapped: boolean;
  reducedMotion: boolean;
  isMobile: boolean;
}

export const IntroSparkles: React.FC<IntroSparklesProps> = ({
  isTapped,
  reducedMotion,
  isMobile,
}) => {
  const pointsRef = useRef<THREE.Points>(null);
  const burstPointsRef = useRef<THREE.Points>(null);
  const sparkleTexture = useMemo(() => createCircularSparkleTexture(), []);

  // Ambient dust motes
  const count = isMobile ? 35 : 75;
  const { positions, velocities } = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const vel = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 12;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 8;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 8;

      vel[i * 3] = (Math.random() - 0.5) * 0.005;
      vel[i * 3 + 1] = 0.004 + Math.random() * 0.008; // slow upward drift
      vel[i * 3 + 2] = (Math.random() - 0.5) * 0.005;
    }
    return { positions: pos, velocities: vel };
  }, [count]);

  // Tap burst particles (active upon book opening)
  const burstCount = isMobile ? 25 : 50;
  const { burstPositions, burstVelocities } = useMemo(() => {
    const bPos = new Float32Array(burstCount * 3);
    const bVel = new Float32Array(burstCount * 3);
    for (let i = 0; i < burstCount; i++) {
      bPos[i * 3] = (Math.random() - 0.5) * 0.4;
      bPos[i * 3 + 1] = 0.1;
      bPos[i * 3 + 2] = (Math.random() - 0.5) * 0.4;

      const angle = Math.random() * Math.PI * 2;
      const speed = 0.04 + Math.random() * 0.08;
      bVel[i * 3] = Math.cos(angle) * speed;
      bVel[i * 3 + 1] = 0.05 + Math.random() * 0.09;
      bVel[i * 3 + 2] = Math.sin(angle) * speed;
    }
    return { burstPositions: bPos, burstVelocities: bVel };
  }, [burstCount]);

  const burstClock = useRef(0);

  useFrame((_, delta) => {
    if (reducedMotion) return;

    // Ambient dust drift
    if (pointsRef.current) {
      const geo = pointsRef.current.geometry;
      const posAttr = geo.attributes.position as THREE.BufferAttribute;
      const array = posAttr.array as Float32Array;

      for (let i = 0; i < count; i++) {
        array[i * 3 + 1] += velocities[i * 3 + 1];
        array[i * 3] += Math.sin(delta + i) * 0.003;

        // Wrap to bottom when off top
        if (array[i * 3 + 1] > 5) {
          array[i * 3 + 1] = -5;
          array[i * 3] = (Math.random() - 0.5) * 12;
        }
      }
      posAttr.needsUpdate = true;
    }

    // Tap burst expansion
    if (isTapped && burstPointsRef.current) {
      burstClock.current += delta;
      const geo = burstPointsRef.current.geometry;
      const posAttr = geo.attributes.position as THREE.BufferAttribute;
      const array = posAttr.array as Float32Array;
      const mat = burstPointsRef.current.material as THREE.PointsMaterial;

      for (let i = 0; i < burstCount; i++) {
        array[i * 3] += burstVelocities[i * 3];
        array[i * 3 + 1] += burstVelocities[i * 3 + 1];
        array[i * 3 + 2] += burstVelocities[i * 3 + 2];
        burstVelocities[i * 3] *= 0.96;
        burstVelocities[i * 3 + 1] *= 0.96;
        burstVelocities[i * 3 + 2] *= 0.96;
      }
      posAttr.needsUpdate = true;

      // Fade out burst over 1.2s
      if (mat) {
        mat.opacity = Math.max(0, 1 - burstClock.current / 1.4);
      }
    }
  });

  return (
    <group>
      {/* 1. Ambient Floating Stardust */}
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[positions, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          size={isMobile ? 0.12 : 0.18}
          map={sparkleTexture}
          transparent
          opacity={0.65}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
          color="#ffdd80"
        />
      </points>

      {/* 2. Page Tap Sparkle Burst */}
      {isTapped && (
        <points ref={burstPointsRef}>
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              args={[burstPositions, 3]}
            />
          </bufferGeometry>
          <pointsMaterial
            size={isMobile ? 0.22 : 0.32}
            map={sparkleTexture}
            transparent
            opacity={1.0}
            blending={THREE.AdditiveBlending}
            depthWrite={false}
            color="#ffe699"
          />
        </points>
      )}
    </group>
  );
};

export default IntroSparkles;
