"use client";

import React, { useMemo, useRef } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import { createWandGlowTexture, createCircularSparkleTexture } from "./SparklesSprite";

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
  const tipSpriteRef = useRef<THREE.Sprite>(null);
  const sparklesRef = useRef<THREE.Points>(null);

  // Flight & tap timing clocks
  const flightClock = useRef(0);
  const tapClock = useRef(0);

  // Textures
  const glowTexture = useMemo(() => createWandGlowTexture(), []);
  const sparkleTexture = useMemo(() => createCircularSparkleTexture(), []);

  // Tiny orbiting sparkles around wand tip
  const { tipSparklePositions, tipSparklePhases } = useMemo(() => {
    const count = 12;
    const positions = new Float32Array(count * 3);
    const phases = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      const angle = (i / count) * Math.PI * 2;
      const r = 0.08 + Math.random() * 0.12;
      positions[i * 3] = Math.cos(angle) * r;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 0.1;
      positions[i * 3 + 2] = Math.sin(angle) * r;
      phases[i] = Math.random() * Math.PI * 2;
    }
    return { tipSparklePositions: positions, tipSparklePhases: phases };
  }, []);

  useFrame((state, delta) => {
    if (!wandGroupRef.current) return;

    if (reducedMotion) {
      wandGroupRef.current.position.set(0.25, 0.9, 0.4);
      wandGroupRef.current.rotation.set(-0.65, 0.2, 0.75);
      return;
    }

    flightClock.current += delta;
    const t = flightClock.current;

    if (isTapped) {
      tapClock.current += delta;
      const tapProgress = Math.min(1, tapClock.current / 0.55);

      if (tapProgress < 0.35) {
        // Dip downward to tap book surface
        const dip = (tapProgress / 0.35) * 0.72;
        wandGroupRef.current.position.set(0.25, 0.85 - dip, 0.45);
      } else {
        // Ascend upward and fade/retreat
        const retreat = (tapProgress - 0.35) / 0.65;
        wandGroupRef.current.position.set(
          0.25 + retreat * 1.8,
          0.45 + retreat * 4.2,
          0.45 - retreat * 1.2
        );
        wandGroupRef.current.scale.setScalar(Math.max(0.001, 1 - retreat));
      }
      return;
    }

    // Phase 1: Pre-flight pause (1.5s)
    if (t < 1.5) {
      wandGroupRef.current.position.set(6, 4, 2);
      wandGroupRef.current.scale.setScalar(0.01);
      return;
    }

    // Phase 2: Curved spiral flight path into view (1.5s - 3.2s)
    if (t < 3.2) {
      const flightProgress = (t - 1.5) / 1.7; // 0 -> 1
      wandGroupRef.current.scale.setScalar(Math.min(1, flightProgress * 2.2));

      const angle = flightProgress * Math.PI * 2.4 - Math.PI * 0.5;
      const radius = 3.6 * (1 - flightProgress * 0.72);
      const x = Math.cos(angle) * radius;
      const z = Math.sin(angle) * radius + 0.35;
      const y = 3.4 - flightProgress * 2.5;

      wandGroupRef.current.position.set(x, y, z);
      wandGroupRef.current.rotation.set(
        -0.5 + Math.sin(angle) * 0.25,
        angle + Math.PI / 2,
        0.65
      );
      return;
    }

    // Phase 3: Hover above grimoire with gentle harmonic bobbing
    const hoverTime = t - 3.2;
    const bob = Math.sin(hoverTime * 2.2) * 0.06;
    const sway = Math.cos(hoverTime * 1.6) * 0.035;

    wandGroupRef.current.scale.setScalar(1);
    wandGroupRef.current.position.set(0.22 + sway, 0.82 + bob, 0.48);
    wandGroupRef.current.rotation.set(-0.72 + bob * 0.15, 0.24, 0.82);

    // Dynamic tip pulse & brightness
    const pulse = Math.sin(hoverTime * 3.6) * 0.18;
    if (tipLightRef.current) {
      const baseLight = isHovered ? 3.4 : 2.2;
      tipLightRef.current.intensity = baseLight + pulse * 1.5;
    }

    if (tipMeshRef.current) {
      const mat = tipMeshRef.current.material as THREE.MeshStandardMaterial;
      if (mat) {
        mat.emissiveIntensity = isHovered ? 5.5 : 3.8 + pulse * 1.8;
      }
    }

    // Glow sprite scale & opacity pulse
    if (tipSpriteRef.current) {
      const baseScale = isHovered ? 0.75 : 0.58;
      const curScale = baseScale + pulse * 0.08;
      tipSpriteRef.current.scale.set(curScale, curScale, 1);
      tipSpriteRef.current.material.opacity = isHovered ? 0.95 : 0.75 + pulse * 0.15;
    }

    // Animate tiny tip sparkles
    if (sparklesRef.current) {
      const posAttr = sparklesRef.current.geometry.attributes.position;
      const count = posAttr.count;
      for (let i = 0; i < count; i++) {
        const ph = tipSparklePhases[i] + hoverTime * 3.0;
        const r = 0.07 + Math.sin(ph) * 0.03;
        posAttr.setX(i, Math.cos(ph) * r);
        posAttr.setY(i, (Math.sin(ph * 1.4) * 0.04) + 0.04);
        posAttr.setZ(i, Math.sin(ph) * r);
      }
      posAttr.needsUpdate = true;
    }
  });

  return (
    <group
      ref={wandGroupRef}
      position={[6, 4, 2]}
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
      {/* Invisible hit proxy for easy click/touch targeting */}
      <mesh visible={false}>
        <sphereGeometry args={[0.85, 12, 12]} />
        <meshBasicMaterial transparent opacity={0} />
      </mesh>

      {/* Wand Shaft: Polished Mahogany/Walnut tapered cylinder */}
      <mesh position={[0, -0.7, 0]}>
        <cylinderGeometry args={[0.026, 0.065, 1.45, 24]} />
        <meshStandardMaterial
          color="#381d11"
          roughness={0.28}
          metalness={0.15}
        />
      </mesh>

      {/* Primary Gold Handle Ring */}
      <mesh position={[0, -1.15, 0]}>
        <cylinderGeometry args={[0.064, 0.068, 0.09, 24]} />
        <meshStandardMaterial
          color="#e6c46a"
          roughness={0.2}
          metalness={0.92}
        />
      </mesh>

      {/* Secondary Gold Inlay Ring */}
      <mesh position={[0, -0.4, 0]}>
        <cylinderGeometry args={[0.038, 0.042, 0.045, 20]} />
        <meshStandardMaterial
          color="#e6c46a"
          roughness={0.2}
          metalness={0.92}
        />
      </mesh>

      {/* Luminous Wand Tip Core Sphere */}
      <mesh ref={tipMeshRef} position={[0, 0.04, 0]}>
        <sphereGeometry args={[0.05, 20, 20]} />
        <meshStandardMaterial
          color="#ffffff"
          emissive="#ffb347"
          emissiveIntensity={4.2}
          roughness={0.05}
        />
      </mesh>

      {/* Soft Glow Sprite (Always faces camera, smooth radial falloff, no flat disc) */}
      <sprite ref={tipSpriteRef} position={[0, 0.04, 0]} scale={[0.58, 0.58, 1]}>
        <spriteMaterial
          map={glowTexture}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
          transparent
          opacity={0.8}
        />
      </sprite>

      {/* Tiny Sparkling Stardust around Tip */}
      <points ref={sparklesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[tipSparklePositions, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.07}
          map={sparkleTexture}
          transparent
          blending={THREE.AdditiveBlending}
          depthWrite={false}
          opacity={0.85}
          color="#ffe4a0"
        />
      </points>

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
