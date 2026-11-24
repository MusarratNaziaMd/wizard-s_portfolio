"use client";

import React, { useMemo } from "react";

export const CastleSilhouette: React.FC = () => {
  const windowPositions = useMemo(() => [
    [-6.9, 3.5, -28.4] as const,
    [-7.0, 6.0, -28.4] as const,
    [-7.1, 1.0, -28.4] as const,
    [0.1, 8.5, -30.4] as const,
    [-0.1, 5.0, -30.4] as const,
    [6.9, 4.0, -28.4] as const,
    [7.1, 7.5, -28.4] as const,
    [7.0, 1.5, -28.4] as const,
    [-3.0, 2.0, -28.4] as const,
    [3.2, 2.2, -28.4] as const,
  ], []);

  return (
    <group position={[0, -2, -30]}>
      {/* Dark Stone Castle Walls & Towers */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[18, 8, 3]} />
        <meshStandardMaterial color="#050811" roughness={0.9} metalness={0.1} />
      </mesh>

      {/* Main Left Watchtower */}
      <mesh position={[-7, 4, 0]}>
        <cylinderGeometry args={[1.8, 2.2, 16, 16]} />
        <meshStandardMaterial color="#050811" roughness={0.9} />
      </mesh>
      {/* Left Tower Spire */}
      <mesh position={[-7, 14.5, 0]}>
        <coneGeometry args={[2.5, 5.5, 16]} />
        <meshStandardMaterial color="#04060d" roughness={0.9} />
      </mesh>

      {/* Main Right Watchtower */}
      <mesh position={[7, 5, 0]}>
        <cylinderGeometry args={[1.7, 2.0, 18, 16]} />
        <meshStandardMaterial color="#050811" roughness={0.9} />
      </mesh>
      {/* Right Tower Spire */}
      <mesh position={[7, 16.5, 0]}>
        <coneGeometry args={[2.3, 5.5, 16]} />
        <meshStandardMaterial color="#04060d" roughness={0.9} />
      </mesh>

      {/* Grand Central Observatory Tower */}
      <mesh position={[0, 7, -2]}>
        <cylinderGeometry args={[1.5, 1.8, 22, 16]} />
        <meshStandardMaterial color="#050811" roughness={0.9} />
      </mesh>
      {/* Central High Spire */}
      <mesh position={[0, 20.5, -2]}>
        <coneGeometry args={[2.0, 6.0, 16]} />
        <meshStandardMaterial color="#03050a" roughness={0.9} />
      </mesh>

      {/* Secondary Flanking Spires */}
      <mesh position={[-3.5, 6, -1]}>
        <cylinderGeometry args={[1.0, 1.2, 16, 16]} />
        <meshStandardMaterial color="#050811" roughness={0.9} />
      </mesh>
      <mesh position={[-3.5, 16, -1]}>
        <coneGeometry args={[1.4, 4.5, 16]} />
        <meshStandardMaterial color="#04060d" roughness={0.9} />
      </mesh>

      <mesh position={[3.5, 6.5, -1]}>
        <cylinderGeometry args={[1.0, 1.2, 17, 16]} />
        <meshStandardMaterial color="#050811" roughness={0.9} />
      </mesh>
      <mesh position={[3.5, 17, -1]}>
        <coneGeometry args={[1.4, 4.5, 16]} />
        <meshStandardMaterial color="#04060d" roughness={0.9} />
      </mesh>

      {/* Warm Lit Windows through the mist */}
      {windowPositions.map((pos, idx) => (
        <mesh key={idx} position={[pos[0], pos[1], pos[2] + 30]}>
          <planeGeometry args={[0.35, 0.6]} />
          <meshBasicMaterial color="#ffb347" />
        </mesh>
      ))}
    </group>
  );
};

export default CastleSilhouette;
