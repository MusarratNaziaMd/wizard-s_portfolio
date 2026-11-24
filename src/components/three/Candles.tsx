"use client";

import React, { useMemo, useRef } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";

export interface CandlesProps {
  count?: number;
  reducedMotion?: boolean;
}

function pseudoRandom(i: number) {
  const x = Math.sin(i * 12.9898 + 78.233) * 43758.5453;
  return x - Math.floor(x);
}

interface CandleData {
  id: number;
  baseX: number;
  baseY: number;
  baseZ: number;
  phase: number;
  speed: number;
  height: number;
  radius: number;
  hasLight: boolean;
}

export const Candles: React.FC<CandlesProps> = ({
  count = 50,
  reducedMotion = false,
}) => {
  const candleGroupRef = useRef<THREE.Group>(null);
  const lightsRef = useRef<(THREE.PointLight | null)[]>([]);

  const candles = useMemo<CandleData[]>(() => {
    const list: CandleData[] = [];
    const lightStep = Math.max(1, Math.floor(count / 6));

    for (let i = 0; i < count; i++) {
      // Distribute widely across hall space
      const baseX = (pseudoRandom(i * 4 + 1) - 0.5) * 14;
      const baseY = -1.5 + pseudoRandom(i * 4 + 2) * 6.5;
      const baseZ = -2 - pseudoRandom(i * 4 + 3) * 18;
      const phase = pseudoRandom(i * 4 + 4) * Math.PI * 2;
      const speed = 0.5 + pseudoRandom(i * 4 + 5) * 0.7;
      const height = 0.35 + pseudoRandom(i * 4 + 6) * 0.35;
      const radius = 0.045 + pseudoRandom(i * 4 + 7) * 0.02;
      const hasLight = i % lightStep === 0 && list.filter((c) => c.hasLight).length < 6;

      list.push({
        id: i,
        baseX,
        baseY,
        baseZ,
        phase,
        speed,
        height,
        radius,
        hasLight,
      });
    }
    return list;
  }, [count]);

  useFrame((state) => {
    if (reducedMotion || !candleGroupRef.current) return;
    const t = state.clock.getElapsedTime();

    // Gentle bobbing of individual candles
    candleGroupRef.current.children.forEach((child, idx) => {
      const candle = candles[idx];
      if (candle) {
        child.position.y = candle.baseY + Math.sin(t * candle.speed + candle.phase) * 0.18;
      }
    });

    // Subtle natural light flickering on the 6 real lights
    lightsRef.current.forEach((light, i) => {
      if (light) {
        const flicker = Math.sin(t * 8 + i * 1.7) * 0.15 + Math.cos(t * 13 + i * 2.3) * 0.1;
        light.intensity = 1.1 + flicker;
      }
    });
  });

  return (
    <group ref={candleGroupRef}>
      {candles.map((candle, idx) => {
        let lightIndex = -1;
        if (candle.hasLight) {
          lightIndex = candles.slice(0, idx + 1).filter((c) => c.hasLight).length - 1;
        }

        return (
          <group
            key={candle.id}
            position={[candle.baseX, candle.baseY, candle.baseZ]}
          >
            {/* Wax Candle Body: warm ivory with subtle gilded translucent glow */}
            <mesh position={[0, -candle.height / 2, 0]}>
              <cylinderGeometry
                args={[candle.radius, candle.radius * 1.05, candle.height, 12]}
              />
              <meshStandardMaterial
                color="#f8f1de"
                emissive="#c9a24b"
                emissiveIntensity={0.28}
                roughness={0.4}
                metalness={0.05}
              />
            </mesh>

            {/* Glowing Flame Sphere (Emissive + Bloom) */}
            <mesh position={[0, 0.05, 0]}>
              <sphereGeometry args={[0.04, 12, 12]} />
              <meshStandardMaterial
                color="#ffb347"
                emissive="#ffb347"
                emissiveIntensity={2.8}
                roughness={0.2}
              />
            </mesh>

            {/* Outer Flame Glow Halo */}
            <mesh position={[0, 0.05, 0]}>
              <sphereGeometry args={[0.075, 12, 12]} />
              <meshBasicMaterial
                color="#ffb347"
                transparent
                opacity={0.35}
                blending={THREE.AdditiveBlending}
              />
            </mesh>

            {/* Strategic Point Light (capped at ~6 total) */}
            {candle.hasLight && (
              <pointLight
                ref={(el) => {
                  if (lightIndex >= 0) {
                    lightsRef.current[lightIndex] = el;
                  }
                }}
                position={[0, 0.1, 0]}
                color="#ffb347"
                intensity={1.2}
                distance={6}
                decay={2}
              />
            )}
          </group>
        );
      })}
    </group>
  );
};

export default Candles;
