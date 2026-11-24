import * as THREE from "three";

/**
 * Creates a circular radial-gradient alpha texture for round, non-square particle sprites.
 * Ultra-smooth exponential falloff eliminates square clipping artifacts.
 */
export function createCircularSparkleTexture(): THREE.CanvasTexture {
  if (typeof document === "undefined") {
    return new THREE.CanvasTexture(null as unknown as HTMLCanvasElement);
  }

  const canvas = document.createElement("canvas");
  canvas.width = 128;
  canvas.height = 128;
  const ctx = canvas.getContext("2d");
  if (!ctx) return new THREE.CanvasTexture(canvas);

  const grad = ctx.createRadialGradient(64, 64, 0, 64, 64, 64);
  grad.addColorStop(0, "rgba(255, 255, 255, 1)");
  grad.addColorStop(0.15, "rgba(255, 238, 180, 0.95)");
  grad.addColorStop(0.4, "rgba(255, 179, 71, 0.5)");
  grad.addColorStop(0.7, "rgba(201, 162, 75, 0.15)");
  grad.addColorStop(1, "rgba(201, 162, 75, 0)");

  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 128, 128);

  const texture = new THREE.CanvasTexture(canvas);
  texture.needsUpdate = true;
  return texture;
}

/**
 * Creates a soft volumetric wand glow sprite texture.
 * Small bright core + smooth halo fading to transparent, ideal for additive blending.
 */
export function createWandGlowTexture(): THREE.CanvasTexture {
  if (typeof document === "undefined") {
    return new THREE.CanvasTexture(null as unknown as HTMLCanvasElement);
  }

  const canvas = document.createElement("canvas");
  canvas.width = 256;
  canvas.height = 256;
  const ctx = canvas.getContext("2d");
  if (!ctx) return new THREE.CanvasTexture(canvas);

  const grad = ctx.createRadialGradient(128, 128, 0, 128, 128, 128);
  grad.addColorStop(0, "rgba(255, 255, 255, 1)");
  grad.addColorStop(0.1, "rgba(255, 245, 210, 0.95)");
  grad.addColorStop(0.25, "rgba(255, 185, 80, 0.75)");
  grad.addColorStop(0.5, "rgba(230, 150, 40, 0.3)");
  grad.addColorStop(0.8, "rgba(200, 120, 20, 0.08)");
  grad.addColorStop(1, "rgba(0, 0, 0, 0)");

  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 256, 256);

  const texture = new THREE.CanvasTexture(canvas);
  texture.needsUpdate = true;
  return texture;
}
