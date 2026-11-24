"use client";

import React, { useEffect, useRef } from "react";

export interface HeroMagicCanvasProps {
  isMobile: boolean;
  reducedMotion: boolean;
  isVisible: boolean;
}

interface DustMote {
  x: number;
  y: number;
  radius: number;
  vy: number;
  swayFreq: number;
  swayAmp: number;
  phase: number;
  baseAlpha: number;
  twinkleFreq: number;
}

interface Firefly {
  x: number;
  y: number;
  targetX: number;
  targetY: number;
  vx: number;
  vy: number;
  radius: number;
  glowRadius: number;
  baseAlpha: number;
  pulseSpeed: number;
  pulsePhase: number;
}

interface ClickSparkle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  alpha: number;
  decay: number;
}

interface CursorTrail {
  x: number;
  y: number;
  size: number;
  alpha: number;
  decay: number;
}

export const HeroMagicCanvas: React.FC<HeroMagicCanvasProps> = ({
  isMobile,
  reducedMotion,
  isVisible,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const clickSparklesRef = useRef<ClickSparkle[]>([]);
  const cursorTrailRef = useRef<CursorTrail[]>([]);
  const mousePosRef = useRef<{ x: number; y: number; active: boolean }>({
    x: -100,
    y: -100,
    active: false,
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || window.innerWidth);
    let height = (canvas.height = canvas.parentElement?.clientHeight || window.innerHeight);

    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx.scale(dpr, dpr);

    const handleResize = () => {
      if (!canvas.parentElement) return;
      width = canvas.parentElement.clientWidth;
      height = canvas.parentElement.clientHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.scale(dpr, dpr);
    };
    window.addEventListener("resize", handleResize);

    // ==========================================
    // 1. Initialise Golden Dust Motes (60 / 25)
    // ==========================================
    const moteCount = isMobile ? 25 : 60;
    const motes: DustMote[] = [];
    for (let i = 0; i < moteCount; i++) {
      motes.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: 0.8 + Math.random() * 1.4,
        vy: 0.2 + Math.random() * 0.45,
        swayFreq: 0.01 + Math.random() * 0.02,
        swayAmp: 0.4 + Math.random() * 0.8,
        phase: Math.random() * Math.PI * 2,
        baseAlpha: 0.25 + Math.random() * 0.45,
        twinkleFreq: 0.02 + Math.random() * 0.04,
      });
    }

    // ==========================================
    // 2. Initialise Fireflies (10)
    // ==========================================
    const fireflyCount = isMobile ? 5 : 10;
    const fireflies: Firefly[] = [];
    for (let i = 0; i < fireflyCount; i++) {
      fireflies.push({
        x: Math.random() * width,
        y: 0.2 * height + Math.random() * (0.65 * height),
        targetX: Math.random() * width,
        targetY: 0.2 * height + Math.random() * (0.65 * height),
        vx: 0,
        vy: 0,
        radius: 1.8 + Math.random() * 1.5,
        glowRadius: 16 + Math.random() * 14,
        baseAlpha: 0.4 + Math.random() * 0.4,
        pulseSpeed: 0.025 + Math.random() * 0.035,
        pulsePhase: Math.random() * Math.PI * 2,
      });
    }

    // ==========================================
    // 3. Mouse Wand & Click Handlers
    // ==========================================
    const isFinePointer = window.matchMedia("(pointer: fine)").matches;

    const handlePointerMove = (e: PointerEvent) => {
      if (reducedMotion || !isFinePointer) return;
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      mousePosRef.current = { x, y, active: true };

      // Add wand trail sparkle (max 15 kept in buffer)
      if (cursorTrailRef.current.length < 15) {
        cursorTrailRef.current.push({
          x: x + (Math.random() - 0.5) * 6,
          y: y + (Math.random() - 0.5) * 6,
          size: 1.2 + Math.random() * 1.8,
          alpha: 0.85,
          decay: 0.045 + Math.random() * 0.02,
        });
      }
    };

    const handlePointerLeave = () => {
      mousePosRef.current.active = false;
    };

    const handleClick = (e: MouseEvent) => {
      if (reducedMotion) return;
      const rect = canvas.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      const clickY = e.clientY - rect.top;

      // Burst of ~20 gold sparkles expanding outward
      for (let i = 0; i < 20; i++) {
        const angle = (i / 20) * Math.PI * 2 + (Math.random() - 0.5) * 0.4;
        const speed = 1.2 + Math.random() * 3.4;
        clickSparklesRef.current.push({
          x: clickX,
          y: clickY,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          size: 1.5 + Math.random() * 2.2,
          alpha: 0.95,
          decay: 0.022 + Math.random() * 0.015, // Fades completely in ~40-60 frames (<1s)
        });
      }
    };

    canvas.parentElement?.addEventListener("pointermove", handlePointerMove, { passive: true });
    canvas.parentElement?.addEventListener("pointerleave", handlePointerLeave);
    canvas.parentElement?.addEventListener("click", handleClick);

    // ==========================================
    // 4. Render & Simulation Loop
    // ==========================================
    let frame = 0;

    const render = () => {
      if (!isVisible) {
        animationFrameId = requestAnimationFrame(render);
        return;
      }

      ctx.clearRect(0, 0, width, height);

      // --- Draw Dust Motes (Additive) ---
      ctx.globalCompositeOperation = "lighter";

      for (let i = 0; i < motes.length; i++) {
        const m = motes[i];
        if (!reducedMotion) {
          m.y -= m.vy;
          m.x += Math.sin(frame * m.swayFreq + m.phase) * m.swayAmp;

          // Wrap to bottom when drifting out
          if (m.y < -10) {
            m.y = height + 10;
            m.x = Math.random() * width;
          }
        }

        const twinkle = Math.sin(frame * m.twinkleFreq + m.phase);
        const alpha = Math.max(0.08, Math.min(0.85, m.baseAlpha + twinkle * 0.22));

        const grad = ctx.createRadialGradient(m.x, m.y, 0, m.x, m.y, m.radius * 2);
        grad.addColorStop(0, `rgba(255, 235, 175, ${alpha})`);
        grad.addColorStop(0.5, `rgba(201, 162, 75, ${alpha * 0.6})`);
        grad.addColorStop(1, "rgba(201, 162, 75, 0)");

        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(m.x, m.y, m.radius * 2, 0, Math.PI * 2);
        ctx.fill();
      }

      // --- Draw Fireflies ---
      for (let i = 0; i < fireflies.length; i++) {
        const f = fireflies[i];
        if (!reducedMotion) {
          // Smooth steering toward target
          const dx = f.targetX - f.x;
          const dy = f.targetY - f.y;
          const dist = Math.hypot(dx, dy);

          if (dist < 40) {
            f.targetX = Math.random() * width;
            f.targetY = 0.2 * height + Math.random() * (0.65 * height);
          } else {
            f.vx += (dx / dist) * 0.025;
            f.vy += (dy / dist) * 0.025;
            f.vx *= 0.98;
            f.vy *= 0.98;
            f.x += f.vx;
            f.y += f.vy;
          }
        }

        const pulse = Math.sin(frame * f.pulseSpeed + f.pulsePhase);
        const alpha = Math.max(0.15, Math.min(0.85, f.baseAlpha + pulse * 0.3));

        // Soft outer glowing aura
        const aura = ctx.createRadialGradient(f.x, f.y, 0, f.x, f.y, f.glowRadius);
        aura.addColorStop(0, `rgba(255, 240, 180, ${alpha * 0.9})`);
        aura.addColorStop(0.2, `rgba(255, 179, 71, ${alpha * 0.5})`);
        aura.addColorStop(0.6, `rgba(201, 162, 75, ${alpha * 0.15})`);
        aura.addColorStop(1, "rgba(201, 162, 75, 0)");

        ctx.fillStyle = aura;
        ctx.beginPath();
        ctx.arc(f.x, f.y, f.glowRadius, 0, Math.PI * 2);
        ctx.fill();

        // Bright core dot
        ctx.fillStyle = `rgba(255, 255, 230, ${alpha})`;
        ctx.beginPath();
        ctx.arc(f.x, f.y, f.radius, 0, Math.PI * 2);
        ctx.fill();
      }

      // --- Draw Wand Cursor & Trail (Desktop fine pointer only) ---
      if (!reducedMotion && isFinePointer && mousePosRef.current.active) {
        const { x, y } = mousePosRef.current;

        // Wand tip glowing aura
        const wandGrad = ctx.createRadialGradient(x, y, 0, x, y, 14);
        wandGrad.addColorStop(0, "rgba(255, 255, 240, 0.95)");
        wandGrad.addColorStop(0.3, "rgba(255, 215, 120, 0.65)");
        wandGrad.addColorStop(0.7, "rgba(201, 162, 75, 0.2)");
        wandGrad.addColorStop(1, "rgba(201, 162, 75, 0)");

        ctx.fillStyle = wandGrad;
        ctx.beginPath();
        ctx.arc(x, y, 14, 0, Math.PI * 2);
        ctx.fill();

        // Tip core
        ctx.fillStyle = "#ffffff";
        ctx.beginPath();
        ctx.arc(x, y, 2.2, 0, Math.PI * 2);
        ctx.fill();
      }

      // Wand Sparkle Trail
      if (!reducedMotion) {
        for (let i = cursorTrailRef.current.length - 1; i >= 0; i--) {
          const t = cursorTrailRef.current[i];
          t.alpha -= t.decay;
          t.y += 0.2; // subtle drift

          if (t.alpha <= 0) {
            cursorTrailRef.current.splice(i, 1);
            continue;
          }

          ctx.fillStyle = `rgba(255, 225, 140, ${t.alpha})`;
          ctx.beginPath();
          ctx.arc(t.x, t.y, t.size, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // --- Draw Click Spell Sparkles ---
      if (!reducedMotion) {
        for (let i = clickSparklesRef.current.length - 1; i >= 0; i--) {
          const s = clickSparklesRef.current[i];
          s.x += s.vx;
          s.y += s.vy;
          s.vx *= 0.95; // gentle friction
          s.vy *= 0.95;
          s.vy += 0.03; // gentle gravity
          s.alpha -= s.decay;

          if (s.alpha <= 0) {
            clickSparklesRef.current.splice(i, 1);
            continue;
          }

          const sparkGrad = ctx.createRadialGradient(s.x, s.y, 0, s.x, s.y, s.size * 2);
          sparkGrad.addColorStop(0, `rgba(255, 250, 210, ${s.alpha})`);
          sparkGrad.addColorStop(0.5, `rgba(201, 162, 75, ${s.alpha * 0.7})`);
          sparkGrad.addColorStop(1, "rgba(201, 162, 75, 0)");

          ctx.fillStyle = sparkGrad;
          ctx.beginPath();
          ctx.arc(s.x, s.y, s.size * 2, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      ctx.globalCompositeOperation = "source-over";

      frame++;
      if (!reducedMotion) {
        animationFrameId = requestAnimationFrame(render);
      }
    };

    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      canvas.parentElement?.removeEventListener("pointermove", handlePointerMove);
      canvas.parentElement?.removeEventListener("pointerleave", handlePointerLeave);
      canvas.parentElement?.removeEventListener("click", handleClick);
      cancelAnimationFrame(animationFrameId);
    };
  }, [isMobile, reducedMotion, isVisible]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none select-none z-25"
      aria-hidden="true"
    />
  );
};

export default HeroMagicCanvas;
