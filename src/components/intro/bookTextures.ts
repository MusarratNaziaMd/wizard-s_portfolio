import * as THREE from "three";

/**
 * Procedurally generates high-resolution textures, bump maps, and roughness maps
 * for the 3D antique grimoire.
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

  // 1. Deep antique burgundy leather background with aged radial gradient
  const bgGrad = ctx.createRadialGradient(512, 512, 80, 512, 512, 680);
  bgGrad.addColorStop(0, "#2c0e18"); // Rich deep burgundy
  bgGrad.addColorStop(0.65, "#18060e"); // Deep aged leather
  bgGrad.addColorStop(1, "#0a0206"); // Worn dark rim
  ctx.fillStyle = bgGrad;
  ctx.fillRect(0, 0, 1024, 1024);

  // 2. Leather grain texture noise & subtle creases
  ctx.fillStyle = "rgba(0, 0, 0, 0.12)";
  for (let i = 0; i < 45000; i++) {
    const x = Math.random() * 1024;
    const y = Math.random() * 1024;
    const size = Math.random() * 1.6;
    ctx.fillRect(x, y, size, size);
  }

  ctx.fillStyle = "rgba(255, 235, 190, 0.03)";
  for (let i = 0; i < 15000; i++) {
    const x = Math.random() * 1024;
    const y = Math.random() * 1024;
    ctx.fillRect(x, y, 1, 1);
  }

  // 3. Gold Foil Double Filigree Border with Corner Stars
  ctx.strokeStyle = "#d4af37";
  ctx.lineWidth = 10;
  ctx.strokeRect(64, 64, 896, 896);

  ctx.strokeStyle = "rgba(212, 175, 55, 0.6)";
  ctx.lineWidth = 3;
  ctx.strokeRect(88, 88, 848, 848);

  // Corner star accents
  const corners = [
    [108, 108],
    [916, 108],
    [108, 916],
    [916, 916],
  ];
  ctx.fillStyle = "#e6c46a";
  ctx.font = "bold 34px serif";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  corners.forEach(([cx, cy]) => {
    ctx.fillText("✦", cx, cy);
  });

  // 4. Central Embossed Monogram
  ctx.font = "bold 195px 'Cinzel', 'Times New Roman', serif";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";

  // Debossed drop shadow
  ctx.fillStyle = "rgba(0, 0, 0, 0.75)";
  ctx.fillText(monogram, 516, 518);

  // Bevel specular rim
  ctx.fillStyle = "rgba(255, 245, 210, 0.4)";
  ctx.fillText(monogram, 508, 508);

  // Antique gold foil fill
  const goldGrad = ctx.createLinearGradient(400, 400, 624, 624);
  goldGrad.addColorStop(0, "#f3de98");
  goldGrad.addColorStop(0.45, "#d4af37");
  goldGrad.addColorStop(1, "#8b6508");
  ctx.fillStyle = goldGrad;
  ctx.fillText(monogram, 512, 512);

  // Diamond boundary flourish
  ctx.strokeStyle = "rgba(212, 175, 55, 0.45)";
  ctx.lineWidth = 4;
  ctx.beginPath();
  ctx.moveTo(512, 335);
  ctx.lineTo(685, 512);
  ctx.lineTo(512, 689);
  ctx.lineTo(339, 512);
  ctx.closePath();
  ctx.stroke();

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

export function createCoverBumpMap(): THREE.CanvasTexture {
  if (typeof document === "undefined") {
    return new THREE.CanvasTexture(null as unknown as HTMLCanvasElement);
  }

  const canvas = document.createElement("canvas");
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext("2d");
  if (!ctx) return new THREE.CanvasTexture(canvas);

  // Neutral mid-grey base
  ctx.fillStyle = "#808080";
  ctx.fillRect(0, 0, 512, 512);

  // Noise grain bump
  for (let i = 0; i < 20000; i++) {
    const x = Math.random() * 512;
    const y = Math.random() * 512;
    const val = Math.floor(Math.random() * 30);
    ctx.fillStyle = `rgb(${110 + val}, ${110 + val}, ${110 + val})`;
    ctx.fillRect(x, y, 1.5, 1.5);
  }

  // Raised borders
  ctx.strokeStyle = "#d0d0d0";
  ctx.lineWidth = 5;
  ctx.strokeRect(32, 32, 448, 448);

  const texture = new THREE.CanvasTexture(canvas);
  return texture;
}

export function createCoverRoughnessMap(): THREE.CanvasTexture {
  if (typeof document === "undefined") {
    return new THREE.CanvasTexture(null as unknown as HTMLCanvasElement);
  }

  const canvas = document.createElement("canvas");
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext("2d");
  if (!ctx) return new THREE.CanvasTexture(canvas);

  // Base leather is matte (high roughness = lighter grey ~0.75)
  ctx.fillStyle = "#c0c0c0";
  ctx.fillRect(0, 0, 512, 512);

  // Gold foil borders and center are glossy/metallic (low roughness = dark grey ~0.15)
  ctx.strokeStyle = "#252525";
  ctx.lineWidth = 6;
  ctx.strokeRect(32, 32, 448, 448);

  // Monogram area is glossy
  ctx.fillStyle = "#252525";
  ctx.beginPath();
  ctx.arc(256, 256, 80, 0, Math.PI * 2);
  ctx.fill();

  const texture = new THREE.CanvasTexture(canvas);
  return texture;
}

export function createSpineTexture(): THREE.CanvasTexture {
  if (typeof document === "undefined") {
    return new THREE.CanvasTexture(null as unknown as HTMLCanvasElement);
  }

  const canvas = document.createElement("canvas");
  canvas.width = 256;
  canvas.height = 512;
  const ctx = canvas.getContext("2d");
  if (!ctx) return new THREE.CanvasTexture(canvas);

  // Dark leather spine base
  ctx.fillStyle = "#16050b";
  ctx.fillRect(0, 0, 256, 512);

  // Horizontal gold ribbing bands
  const ribs = [70, 160, 256, 350, 440];
  ctx.fillStyle = "#c9a24b";
  ribs.forEach((y) => {
    ctx.fillRect(20, y - 4, 216, 8);
    ctx.fillStyle = "rgba(255, 255, 255, 0.35)";
    ctx.fillRect(20, y - 4, 216, 2);
    ctx.fillStyle = "rgba(0, 0, 0, 0.5)";
    ctx.fillRect(20, y + 2, 216, 3);
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

  // Warm gilded paper edge background
  ctx.fillStyle = "#c29b47";
  ctx.fillRect(0, 0, 256, 256);

  // Striations for individual stacked pages
  for (let y = 0; y < 256; y += 3) {
    const shade = Math.random() > 0.4 ? "rgba(40, 25, 10, 0.35)" : "rgba(255, 235, 175, 0.3)";
    ctx.fillStyle = shade;
    ctx.fillRect(0, y, 256, 1);
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

export function createPagePaperTexture(): THREE.CanvasTexture {
  if (typeof document === "undefined") {
    return new THREE.CanvasTexture(null as unknown as HTMLCanvasElement);
  }

  const canvas = document.createElement("canvas");
  canvas.width = 1024;
  canvas.height = 1024;
  const ctx = canvas.getContext("2d");
  if (!ctx) return new THREE.CanvasTexture(canvas);

  // Warm cream parchment base
  ctx.fillStyle = "#f6f0df";
  ctx.fillRect(0, 0, 1024, 1024);

  // Fine paper fibers
  ctx.fillStyle = "rgba(100, 70, 40, 0.04)";
  for (let i = 0; i < 30000; i++) {
    const x = Math.random() * 1024;
    const y = Math.random() * 1024;
    ctx.fillRect(x, y, 1.5, 1.5);
  }

  // Soft gutter shadow on left edge (toward spine)
  const gutterGrad = ctx.createLinearGradient(0, 0, 160, 0);
  gutterGrad.addColorStop(0, "rgba(25, 15, 8, 0.45)");
  gutterGrad.addColorStop(0.4, "rgba(25, 15, 8, 0.18)");
  gutterGrad.addColorStop(1, "rgba(25, 15, 8, 0)");
  ctx.fillStyle = gutterGrad;
  ctx.fillRect(0, 0, 160, 1024);

  // Corner vignettes for aged paper feel
  const cornerGrad = ctx.createRadialGradient(1024, 1024, 50, 1024, 1024, 400);
  cornerGrad.addColorStop(0, "rgba(140, 95, 45, 0.2)");
  cornerGrad.addColorStop(1, "rgba(140, 95, 45, 0)");
  ctx.fillStyle = cornerGrad;
  ctx.fillRect(600, 600, 424, 424);

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}
