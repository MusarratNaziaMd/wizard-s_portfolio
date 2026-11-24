"use client";

import React, { useRef } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";

export interface Wand3DProps {
  isHovered: boolean;
  isTapped: boolean;
  onHoverChange: (hovered: boolean) => void;
  onTap: () => void;
  reducedMotion: boolean;
}

export const Wand3D: React.FC<Wand3DProps> = ({
  isHovered,
  isTapped,
  onHoverChange,
  onTap,
  reducedMotion,
}) => {
  const wandGroupRef = useRef<THREE.Group>(null);
  const tipLightRef = useRef<THREE.PointLight>(null);
  const tipMeshRef = useRef<THREE.Mesh>(null);

  // Flight time tracking
  const flightClock = useRef(0);
  const tapClock = useRef(0);

  useFrame((_, delta) => {
    if (!wandGroupRef.current) return;

    if (reducedMotion) {
      wandGroupRef.current.position.set(0.3, 1.2, 0.4);
      wandGroupRef.current.rotation.set(-0.6, 0.2, 0.7);
      return;
    }

    flightClock.current += delta;
    const t = flightClock.current;

    if (isTapped) {
      tapClock.current += delta;
      const tapProgress = Math.min(1, tapClock.current / 0.5);

      if (tapProgress < 0.4) {
        // Dip downward to strike book
        const dip = (tapProgress / 0.4) * 0.75;
        wandGroupRef.current.position.set(0.3, 1.2 - dip, 0.4);
      } else {
        // Ascend upward and exit
        const retreat = (tapProgress - 0.4) / 0.6;
        wandGroupRef.current.position.set(
          0.3 + retreat * 1.5,
          0.45 + retreat * 4.0,
          0.4 - retreat * 1.0
        );
        wandGroupRef.current.scale.setScalar(Math.max(0.01, 1 - retreat));
      }
      return;
    }

    // Phase 1: Wait 1.5s
    if (t < 1.5) {
      wandGroupRef.current.position.set(7, 5, 2);
      wandGroupRef.current.scale.setScalar(0.01);
      return;
    }

    // Phase 2: Curved spiral flight loop around the book (1.5s to 3.2s)
    if (t < 3.2) {
      const flightProgress = (t - 1.5) / 1.7; // 0 to 1
      wandGroupRef.current.scale.setScalar(Math.min(1, flightProgress * 2.5));

      const angle = flightProgress * Math.PI * 2.5 - Math.PI * 0.5;
      const radius = 3.5 * (1 - flightProgress * 0.75);
      const x = Math.cos(angle) * radius;
      const z = Math.sin(angle) * radius + 0.3;
      const y = 3.5 - flightProgress * 2.3;

      wandGroupRef.current.position.set(x, y, z);
      wandGroupRef.current.rotation.set(
        -0.5 + Math.sin(angle) * 0.3,
        angle + Math.PI / 2,
        0.6
      );
      return;
    }

    // Phase 3: Hover above the book with gentle harmonic bobbing
    const hoverTime = t - 3.2;
    const bob = Math.sin(hoverTime * 2.4) * 0.08;
    const sway = Math.cos(hoverTime * 1.8) * 0.04;

    wandGroupRef.current.scale.setScalar(1);
    wandGroupRef.current.position.set(0.25 + sway, 0.85 + bob, 0.5);
    wandGroupRef.current.rotation.set(-0.75 + bob * 0.2, 0.25, 0.85);

    // Tip glow pulsing
    if (tipLightRef.current) {
      const baseLight = isHovered ? 3.5 : 2.2;
      tipLightRef.current.intensity = baseLight + Math.sin(hoverTime * 4) * 0.4;
    }
    if (tipMeshRef.current) {
      const mat = tipMeshRef.current.material as THREE.MeshStandardMaterial;
      if (mat) {
        mat.emissiveIntensity = isHovered ? 6.0 : 4.0 + Math.sin(hoverTime * 4) * 0.6;
      }
    }
  });

  return (
    <group
      ref={wandGroupRef}
      position={[7, 5, 2]}
      scale={0.01}
      onClick={(e) => {
        e.stopPropagation();
        onTap();
      }}
      onPointerOver={(e) => {
        e.stopPropagation();
        document.body.style.cursor = "pointer";
        onHoverChange(true);
      }}
      onPointerOut={() => {
        document.body.style.cursor = "default";
        onHoverChange(false);
      }}
    >
      {/* Invisible hit proxy sphere for easy tap/click */}
      <mesh visible={false}>
        <sphereGeometry args={[0.75, 12, 12]} />
        <meshBasicMaterial transparent opacity={0} />
      </mesh>

      {/* Wand Shaft: Polished Mahogany/Walnut tapered cylinder */}
      <mesh position={[0, -0.7, 0]}>
        <cylinderGeometry args={[0.026, 0.065, 1.45, 24]} />
        <meshStandardMaterial
          color="#381d11"
          roughness={0.28}
          metalness={0.12}
        />
      </mesh>

      {/* Primary Gold Handle Ring */}
      <mesh position={[0, -1.15, 0]}>
        <cylinderGeometry args={[0.062, 0.066, 0.08, 24]} />
        <meshStandardMaterial
          color="#e6c46a"
          roughness={0.2}
          metalness={0.9}
        />
      </mesh>

      {/* Secondary Gold Inlay Ring */}
      <mesh position={[0, -0.4, 0]}>
        <cylinderGeometry args={[0.038, 0.042, 0.04, 20]} />
        <meshStandardMaterial
          color="#e6c46a"
          roughness={0.2}
          metalness={0.9}
        />
      </mesh>

      {/* Luminous Wand Tip Core */}
      <mesh ref={tipMeshRef} position={[0, 0.04, 0]}>
        <sphereGeometry args={[0.075, 20, 20]} />
        <meshStandardMaterial
          color="#ffffff"
          emissive="#ffb347"
          emissiveIntensity={4.2}
          roughness={0.1}
        />
      </mesh>

      {/* Soft Additive Outer Glow Flare */}
      <mesh position={[0, 0.04, 0]}>
        <sphereGeometry args={[0.18, 18, 18]} />
        <meshBasicMaterial
          color="#ffc86b"
          transparent
          opacity={isHovered ? 0.75 : 0.45}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>

      {/* Point Light Casting Warm Radiance onto Book Cover */}
      <pointLight
        ref={tipLightRef}
        position={[0, 0.04, 0]}
        color="#ffb347"
        intensity={2.2}
        distance={7}
        decay={2}
      />
    </group>
  );
};

export default Wand3D;
