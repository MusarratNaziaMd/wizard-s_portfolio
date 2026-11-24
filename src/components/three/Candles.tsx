"use client";

import React, { useRef } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";

export interface CandlesProps {
  count?: number;
}

export const Candles: React.FC<CandlesProps> = ({ count = 5 }) => {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!groupRef.current) return;
    const t = state.clock.getElapsedTime();
    groupRef.current.position.y = Math.sin(t * 0.8) * 0.15;
  });

  return (
    <group ref={groupRef}>
      {Array.from({ length: count }).map((_, i) => {
        const angle = (i / count) * Math.PI * 2;
        const radius = 2.5;
        const x = Math.cos(angle) * radius;
        const z = Math.sin(angle) * radius;
        const y = Math.sin(i * 1.5) * 0.5;

        return (
          <group key={i} position={[x, y, z]}>
            {/* Candle body */}
            <mesh position={[0, 0, 0]}>
              <cylinderGeometry args={[0.06, 0.06, 0.6, 16]} />
              <meshStandardMaterial color="#f2e8cf" roughness={0.4} />
            </mesh>
            {/* Flame glow */}
            <mesh position={[0, 0.38, 0]}>
              <sphereGeometry args={[0.04, 16, 16]} />
              <meshBasicMaterial color="#c9a24b" />
            </mesh>
            <pointLight position={[0, 0.4, 0]} color="#c9a24b" intensity={0.8} distance={2} />
          </group>
        );
      })}
    </group>
  );
};

export default Candles;
