"use client";

import React, { useMemo, useRef } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import {
  createCoverTexture,
  createSpineTexture,
  createPageEdgeTexture,
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

  // Generate procedural textures once
  const coverTexture = useMemo(() => createCoverTexture(monogram), [monogram]);
  const spineTexture = useMemo(() => createSpineTexture(), []);
  const pageEdgeTexture = useMemo(() => createPageEdgeTexture(), []);

  // Dimensions
  const w = isMobile ? 2.0 : 2.4;
  const h = isMobile ? 2.7 : 3.2;
  const d = 0.36;

  // Animation targets: Opening around Z axis (spine hinge)
  const targetCoverRotZ = isOpen || reducedMotion ? Math.PI * 0.98 : 0;
  const targetPageRotZ = isPageTurned || reducedMotion ? Math.PI : 0;
  const targetBookTiltX = isOpen ? 0.32 : 0.42;

  useFrame((_, delta) => {
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

    // Smooth page turn around center spine (Z axis)
    if (turningPagePivotRef.current) {
      turningPagePivotRef.current.rotation.z = THREE.MathUtils.damp(
        turningPagePivotRef.current.rotation.z,
        targetPageRotZ,
        3.2,
        delta
      );
    }

    // Smooth book tilt adjustment when opening
    if (bookGroupRef.current) {
      bookGroupRef.current.rotation.x = THREE.MathUtils.damp(
        bookGroupRef.current.rotation.x,
        targetBookTiltX,
        2.5,
        delta
      );
    }
  });

  return (
    <group
      ref={bookGroupRef}
      position={[isOpen ? (isMobile ? 0.3 : 0.5) : 0, -0.2, 0]}
      rotation={[targetBookTiltX, isOpen ? 0 : -0.15, 0]}
    >
      {/* 1. Back Cover (Rests flat beneath the pages) */}
      <mesh position={[0, -d / 2, 0]} receiveShadow>
        <boxGeometry args={[w, 0.04, h]} />
        <meshStandardMaterial
          map={coverTexture}
          roughness={0.65}
          metalness={0.1}
          color="#220b14"
        />
      </mesh>

      {/* 2. Spine Cylinder along left edge */}
      <mesh
        position={[-w / 2, 0, 0]}
        rotation={[Math.PI / 2, 0, 0]}
      >
        <cylinderGeometry args={[d / 2, d / 2, h, 24]} />
        <meshStandardMaterial
          map={spineTexture}
          roughness={0.6}
          metalness={0.15}
          color="#1e0710"
        />
      </mesh>

      {/* 3. Parchment Page Block (Solid paper stack with edge lines) */}
      <mesh position={[0.02, 0, 0]}>
        <boxGeometry args={[w * 0.95, d * 0.88, h * 0.96]} />
        {/* Materials array: right, left, top, bottom, front, back */}
        <meshStandardMaterial attach="material-0" map={pageEdgeTexture} roughness={0.8} />
        <meshStandardMaterial attach="material-1" color="#1a0a14" roughness={0.8} />
        <meshStandardMaterial attach="material-2" color="#eedfb8" roughness={0.7} />
        <meshStandardMaterial attach="material-3" color="#eedfb8" roughness={0.7} />
        <meshStandardMaterial attach="material-4" map={pageEdgeTexture} roughness={0.8} />
        <meshStandardMaterial attach="material-5" map={pageEdgeTexture} roughness={0.8} />
      </mesh>

      {/* 4. Front Cover (Hinged pivot along left spine edge) */}
      <group ref={frontCoverPivotRef} position={[-w / 2, d / 2, 0]}>
        <mesh position={[w / 2, 0.02, 0]} castShadow>
          <boxGeometry args={[w, 0.04, h]} />
          {/* Top face (+Y) has gilded monogram cover texture */}
          <meshStandardMaterial
            attach="material-2"
            map={coverTexture}
            roughness={0.55}
            metalness={0.15}
          />
          {/* Bottom face (-Y, shown when open) has parchment lining */}
          <meshStandardMaterial
            attach="material-3"
            color="#ebdcb0"
            roughness={0.7}
          />
          <meshStandardMaterial
            attach="material-0"
            color="#c9a24b"
            roughness={0.4}
            metalness={0.7}
          />
          <meshStandardMaterial attach="material-1" color="#1a0a14" roughness={0.8} />
          <meshStandardMaterial attach="material-4" color="#1a0a14" roughness={0.8} />
          <meshStandardMaterial attach="material-5" color="#1a0a14" roughness={0.8} />
        </mesh>
      </group>

      {/* 6. Turning Leaf (Thin parchment plane that flips from right to left) */}
      {isOpen && (
        <group ref={turningPagePivotRef} position={[0, d / 2 + 0.01, 0]}>
          <mesh position={[w / 2 * 0.94, 0, 0]} rotation={[-Math.PI / 2, 0, 0]}>
            <planeGeometry args={[w * 0.94, h * 0.94]} />
            <meshStandardMaterial
              color="#eddcb5"
              roughness={0.75}
              side={THREE.DoubleSide}
            />
          </mesh>
        </group>
      )}
    </group>
  );
};

export default Book3D;
