"use client";

import React, { useMemo, useRef } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";

export interface ParticlesProps {
  count?: number;
}

function pseudoRandom(i: number) {
  const x = Math.sin(i * 12.9898 + 78.233) * 43758.5453;
  return x - Math.floor(x);
}

export const Particles: React.FC<ParticlesProps> = ({ count = 120 }) => {
  const pointsRef = useRef<THREE.Points>(null);

  const [positions] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (pseudoRandom(i * 3) - 0.5) * 10;
      pos[i * 3 + 1] = (pseudoRandom(i * 3 + 1) - 0.5) * 10;
      pos[i * 3 + 2] = (pseudoRandom(i * 3 + 2) - 0.5) * 10;
    }
    return [pos];
  }, [count]);

  useFrame((_, delta) => {
    if (!pointsRef.current) return;
    pointsRef.current.rotation.y += delta * 0.05;
    pointsRef.current.rotation.x += delta * 0.02;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.035}
        color="#c9a24b"
        transparent
        opacity={0.7}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
};

export default Particles;
