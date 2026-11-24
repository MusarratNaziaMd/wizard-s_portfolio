"use client";

import React, { useMemo, useRef } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import {
  createCoverTexture,
  createCoverBumpMap,
  createCoverRoughnessMap,
  createSpineTexture,
  createPageEdgeTexture,
  createPagePaperTexture,
} from "./bookTextures";

export interface Book3DProps {
  isOpen: boolean;
  isPageTurned: boolean;
  reducedMotion: boolean;
  monogram?: string;
  isMobile?: boolean;
}

export const Book3D: React.FC<Book3DProps> = ({
  isOpen,
  isPageTurned,
  reducedMotion,
  monogram = "MN",
  isMobile = false,
}) => {
  const bookGroupRef = useRef<THREE.Group>(null);
  const frontCoverPivotRef = useRef<THREE.Group>(null);
  const turningPagePivotRef = useRef<THREE.Group>(null);
  const glintLightRef = useRef<THREE.PointLight>(null);
  const pageLightRef = useRef<THREE.PointLight>(null);

  // Procedural canvas textures
  const coverTexture = useMemo(() => createCoverTexture(monogram), [monogram]);
  const coverBump = useMemo(() => createCoverBumpMap(), []);
  const coverRoughness = useMemo(() => createCoverRoughnessMap(), []);
  const spineTexture = useMemo(() => createSpineTexture(), []);
  const pageEdgeTexture = useMemo(() => createPageEdgeTexture(), []);
  const paperTexture = useMemo(() => createPagePaperTexture(), []);

  // Dimensions: carefully tuned so book fills ~55% viewport height
  // On mobile, scale group to fit comfortably within narrow viewport (10% side margins)
  const w = 2.35;
  const h = 3.15;
  const d = 0.36;

  // Hinge rotations
  const targetCoverRotZ = isOpen || reducedMotion ? Math.PI * 0.98 : 0;
  const targetPageRotZ = isPageTurned || reducedMotion ? Math.PI : 0;
  const targetBookTiltX = isOpen ? 0.35 : 0.45;

  // Clocks for glint & light
  const clock = useRef(0);

  useFrame((_, delta) => {
    clock.current += delta;
    const t = clock.current;

    // Slow glint sweeping across cover when closed
    if (glintLightRef.current && !isOpen) {
      const glintX = Math.sin(t * 0.8) * 2.5;
      const glintY = Math.cos(t * 0.8) * 1.5 + 1.2;
      glintLightRef.current.position.set(glintX, glintY, 1.8);
      glintLightRef.current.intensity = 0.8 + Math.sin(t * 1.6) * 0.4;
    }

    // Faint warm light rising from the pages when book is open
    if (pageLightRef.current && isOpen) {
      const pulse = Math.sin(t * 2.5) * 0.3;
      pageLightRef.current.intensity = 1.6 + pulse;
    }

    if (reducedMotion) {
      if (frontCoverPivotRef.current) frontCoverPivotRef.current.rotation.z = targetCoverRotZ;
      if (turningPagePivotRef.current) turningPagePivotRef.current.rotation.z = targetPageRotZ;
      if (bookGroupRef.current) bookGroupRef.current.rotation.x = targetBookTiltX;
      return;
    }

    // Smooth cover opening around spine hinge (Z axis)
    if (frontCoverPivotRef.current) {
      frontCoverPivotRef.current.rotation.z = THREE.MathUtils.damp(
        frontCoverPivotRef.current.rotation.z,
        targetCoverRotZ,
        2.6,
        delta
      );
    }

    // Smooth page turn around spine (Z axis) with dynamic bend/curl
    if (turningPagePivotRef.current) {
      turningPagePivotRef.current.rotation.z = THREE.MathUtils.damp(
        turningPagePivotRef.current.rotation.z,
        targetPageRotZ,
        3.0,
        delta
      );
    }

    // Book tilt adjustment
    if (bookGroupRef.current) {
      bookGroupRef.current.rotation.x = THREE.MathUtils.damp(
        bookGroupRef.current.rotation.x,
        targetBookTiltX,
        2.5,
        delta
      );
    }
  });

  // Responsive scale: on mobile (<768px), scale down so open book has 10%+ margins on both sides
  const scale = isMobile ? 0.68 : 1.0;
  const posX = isOpen ? (isMobile ? 0.0 : 0.0) : 0;

  return (
    <group
      ref={bookGroupRef}
      scale={[scale, scale, scale]}
      position={[posX, isMobile ? -0.1 : -0.2, 0]}
      rotation={[targetBookTiltX, isOpen ? 0 : -0.12, 0]}
    >
      {/* Slow Glint Light (for gold specular reflections on cover) */}
      {!isOpen && (
        <pointLight
          ref={glintLightRef}
          position={[-1.5, 1.2, 1.8]}
          color="#ffeaad"
          intensity={0.8}
          distance={6}
          decay={2}
        />
      )}

      {/* Warm rising glow from open pages */}
      {isOpen && (
        <pointLight
          ref={pageLightRef}
          position={[0, 0.6, 0.2]}
          color="#ffb347"
          intensity={1.6}
          distance={5}
          decay={2}
        />
      )}

      {/* 1. Back Cover (Rests flat beneath the pages) */}
      <mesh position={[0, -d / 2, 0]} receiveShadow>
        <boxGeometry args={[w, 0.04, h]} />
        <meshStandardMaterial
          map={coverTexture}
          bumpMap={coverBump}
          bumpScale={0.03}
          roughnessMap={coverRoughness}
          roughness={0.7}
          metalness={0.15}
          color="#220b14"
        />
      </mesh>

      {/* 2. Curved Antique Leather Spine */}
      <mesh
        position={[-w / 2, -d / 4, 0]}
        rotation={[0, 0, Math.PI / 2]}
      >
        <cylinderGeometry args={[d / 2, d / 2, h, 24, 1, false, 0, Math.PI]} />
        <meshStandardMaterial
          map={spineTexture}
          bumpMap={coverBump}
          bumpScale={0.02}
          roughness={0.65}
          metalness={0.2}
          color="#200a12"
        />
      </mesh>

      {/* 3. Base Parchment Page Block (Right Side / Bottom of Grimoire) */}
      <mesh position={[0, -0.02, 0]}>
        <boxGeometry args={[w - 0.08, d - 0.06, h - 0.08]} />
        <meshStandardMaterial
          map={paperTexture}
          roughness={0.92}
          metalness={0.02}
          color="#f6f0df"
        />
      </mesh>

      {/* Gilded Page Edges (Front, Top, Bottom) */}
      {/* Front edge */}
      <mesh position={[w / 2 - 0.04, -0.02, 0]}>
        <boxGeometry args={[0.015, d - 0.065, h - 0.09]} />
        <meshStandardMaterial
          map={pageEdgeTexture}
          roughness={0.4}
          metalness={0.65}
          color="#d4af37"
        />
      </mesh>
      {/* Top edge */}
      <mesh position={[0, -0.02, h / 2 - 0.04]}>
        <boxGeometry args={[w - 0.09, d - 0.065, 0.015]} />
        <meshStandardMaterial
          map={pageEdgeTexture}
          roughness={0.4}
          metalness={0.65}
          color="#d4af37"
        />
      </mesh>
      {/* Bottom edge */}
      <mesh position={[0, -0.02, -h / 2 + 0.04]}>
        <boxGeometry args={[w - 0.09, d - 0.065, 0.015]} />
        <meshStandardMaterial
          map={pageEdgeTexture}
          roughness={0.4}
          metalness={0.65}
          color="#d4af37"
        />
      </mesh>

      {/* 4. Left Page Paper Stack (Appears when opened) */}
      {isOpen && (
        <group position={[-w, 0, 0]}>
          <mesh position={[0.08, -d / 4, 0]}>
            <boxGeometry args={[w - 0.1, 0.03, h - 0.08]} />
            <meshStandardMaterial
              map={paperTexture}
              roughness={0.92}
              metalness={0.02}
              color="#f6f0df"
            />
          </mesh>
        </group>
      )}

      {/* 5. Turning Page with Bend / Curl around spine */}
      <group
        ref={turningPagePivotRef}
        position={[-w / 2, (d - 0.06) / 2, 0]}
      >
        <mesh position={[w / 2, 0.005, 0]}>
          <boxGeometry args={[w - 0.1, 0.006, h - 0.1]} />
          <meshStandardMaterial
            map={paperTexture}
            roughness={0.9}
            metalness={0.02}
            color="#f7f2e3"
          />
        </mesh>
      </group>

      {/* 6. Front Cover Pivot attached to the spine hinge at x = -w / 2 */}
      <group
        ref={frontCoverPivotRef}
        position={[-w / 2, d / 2, 0]}
      >
        <group position={[w / 2, 0, 0]}>
          {/* Outer Cover Face (Monogram, Gold borders, Leather grain) */}
          <mesh position={[0, 0.02, 0]} castShadow>
            <boxGeometry args={[w, 0.035, h]} />
            <meshStandardMaterial
              map={coverTexture}
              bumpMap={coverBump}
              bumpScale={0.035}
              roughnessMap={coverRoughness}
              roughness={0.68}
              metalness={0.2}
              color="#2a0d16"
            />
          </mesh>

          {/* Inner Flyleaf (Facing up when the cover opens fully to the left) */}
          <mesh position={[0, -0.018, 0]}>
            <planeGeometry args={[w - 0.04, h - 0.04]} />
            <meshStandardMaterial
              map={paperTexture}
              roughness={0.9}
              metalness={0.02}
              color="#f5efe0"
            />
          </mesh>
        </group>
      </group>
    </group>
  );
};

export default Book3D;
