import * as THREE from "three";

/**
 * Procedurally generates high-resolution textures for the 3D antique grimoire.
 * Zero external asset dependencies.
 */

export function createCoverTexture(monogram: string = "MN"): THREE.CanvasTexture {
  if (typeof document === "undefined") {
    return new THREE.CanvasTexture(null as unknown as HTMLCanvasElement);
  }

  const canvas = document.createElement("canvas");
  canvas.width = 1024;
  canvas.height = 1024;
  const ctx = canvas.getContext("2d");
  if (!ctx) return new THREE.CanvasTexture(canvas);

  // 1. Deep leather background gradient
  const bgGrad = ctx.createRadialGradient(512, 512, 100, 512, 512, 600);
  bgGrad.addColorStop(0, "#2c0e18"); // Rich deep burgundy
  bgGrad.addColorStop(0.7, "#1c070f"); // Darkened leather
  bgGrad.addColorStop(1, "#0d0307"); // Weathered rim
  ctx.fillStyle = bgGrad;
  ctx.fillRect(0, 0, 1024, 1024);

  // 2. Leather grain texture noise
  ctx.fillStyle = "rgba(0, 0, 0, 0.15)";
  for (let i = 0; i < 40000; i++) {
    const x = Math.random() * 1024;
    const y = Math.random() * 1024;
    const size = Math.random() * 1.5;
    ctx.fillRect(x, y, size, size);
  }

  // 3. Gold Filigree Border
  ctx.strokeStyle = "#c9a24b";
  ctx.lineWidth = 10;
  ctx.strokeRect(60, 60, 904, 904);

  ctx.strokeStyle = "rgba(201, 162, 75, 0.5)";
  ctx.lineWidth = 3;
  ctx.strokeRect(85, 85, 854, 854);

  // Corner ornaments
  const corners = [
    [105, 105],
    [919, 105],
    [105, 919],
    [919, 919],
  ];
  ctx.fillStyle = "#c9a24b";
  ctx.font = "bold 32px serif";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  corners.forEach(([cx, cy]) => {
    ctx.fillText("✦", cx, cy);
  });

  // 4. Central Embossed Monogram
  // Shadow for deboss depth
  ctx.font = "bold 200px serif";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";

  ctx.fillStyle = "rgba(0, 0, 0, 0.7)";
  ctx.fillText(monogram, 515, 518);

  // Bevel highlight
  ctx.fillStyle = "rgba(255, 235, 175, 0.4)";
  ctx.fillText(monogram, 509, 508);

  // Core antique gold fill
  const goldGrad = ctx.createLinearGradient(400, 400, 620, 620);
  goldGrad.addColorStop(0, "#e8c978");
  goldGrad.addColorStop(0.5, "#c9a24b");
  goldGrad.addColorStop(1, "#8a6620");
  ctx.fillStyle = goldGrad;
  ctx.fillText(monogram, 512, 512);

  // Monogram surrounding diamond flourish
  ctx.strokeStyle = "rgba(201, 162, 75, 0.4)";
  ctx.lineWidth = 4;
  ctx.beginPath();
  ctx.moveTo(512, 330);
  ctx.lineTo(690, 512);
  ctx.lineTo(512, 694);
  ctx.lineTo(334, 512);
  ctx.closePath();
  ctx.stroke();

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

export function createSpineTexture(): THREE.CanvasTexture {
  if (typeof document === "undefined") {
    return new THREE.CanvasTexture(null as unknown as HTMLCanvasElement);
  }

  const canvas = document.createElement("canvas");
  canvas.width = 256;
  canvas.height = 1024;
  const ctx = canvas.getContext("2d");
  if (!ctx) return new THREE.CanvasTexture(canvas);

  // Spine leather
  ctx.fillStyle = "#1e0710";
  ctx.fillRect(0, 0, 256, 1024);

  // Horizontal gold ribbing bands
  ctx.fillStyle = "#c9a24b";
  const ribs = [150, 320, 512, 704, 874];
  ribs.forEach((y) => {
    ctx.fillRect(20, y - 6, 216, 12);
    ctx.fillStyle = "rgba(255, 235, 175, 0.6)";
    ctx.fillRect(20, y - 6, 216, 3);
    ctx.fillStyle = "#c9a24b";
  });

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

export function createPageEdgeTexture(): THREE.CanvasTexture {
  if (typeof document === "undefined") {
    return new THREE.CanvasTexture(null as unknown as HTMLCanvasElement);
  }

  const canvas = document.createElement("canvas");
  canvas.width = 256;
  canvas.height = 256;
  const ctx = canvas.getContext("2d");
  if (!ctx) return new THREE.CanvasTexture(canvas);

  // Parchment paper block side
  ctx.fillStyle = "#eddcb5";
  ctx.fillRect(0, 0, 256, 256);

  // Subtle individual page leaf lines
  ctx.fillStyle = "rgba(120, 95, 55, 0.25)";
  for (let y = 0; y < 256; y += 4) {
    ctx.fillRect(0, y, 256, 1);
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(1, 4);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}
