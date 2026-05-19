"use client";

import { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  isRed: boolean;
  // pulse state
  pulseRadius: number;
  pulseAlpha: number;
  pulsing: boolean;
}

interface ParticleNetworkProps {
  className?: string;
}

const PARTICLE_COUNT = 80;
const CONNECTION_DIST = 150;
const REPEL_DIST = 120;
const REPEL_FORCE = 0.35;
const PULSE_INTERVAL_MS = 4000;

function createParticle(width: number, height: number): Particle {
  return {
    x: Math.random() * width,
    y: Math.random() * height,
    vx: (Math.random() - 0.5) * 0.4,
    vy: (Math.random() - 0.5) * 0.4,
    size: 1 + Math.random() * 1.5,
    isRed: Math.random() < 0.18,
    pulseRadius: 0,
    pulseAlpha: 0,
    pulsing: false,
  };
}

export default function ParticleNetwork({ className = "" }: ParticleNetworkProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const rafRef = useRef<number>(0);
  const mouseRef = useRef<{ x: number; y: number } | null>(null);
  const isTouchRef = useRef(false);
  const lastPulseRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Detect touch device once
    isTouchRef.current =
      typeof window !== "undefined" &&
      ("ontouchstart" in window || navigator.maxTouchPoints > 0);

    function resize() {
      if (!canvas || !container) return;
      const w = container.offsetWidth;
      const h = container.offsetHeight;
      canvas.width = w;
      canvas.height = h;
      // Re-clamp particles to new bounds
      particlesRef.current.forEach((p) => {
        p.x = Math.min(p.x, w);
        p.y = Math.min(p.y, h);
      });
    }

    // Initialise particles
    resize();
    particlesRef.current = Array.from({ length: PARTICLE_COUNT }, () =>
      createParticle(canvas.width, canvas.height)
    );

    const ro = new ResizeObserver(() => {
      resize();
    });
    ro.observe(container);

    function onMouseMove(e: MouseEvent) {
      if (isTouchRef.current || !canvas) return;
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    }

    function onMouseLeave() {
      mouseRef.current = null;
    }

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseleave", onMouseLeave);

    function triggerPulse() {
      const particles = particlesRef.current;
      if (!particles.length) return;
      const idx = Math.floor(Math.random() * particles.length);
      const p = particles[idx];
      p.pulsing = true;
      p.pulseRadius = p.size;
      p.pulseAlpha = 0.8;
    }

    function draw(timestamp: number) {
      if (!canvas || !ctx) return;

      const w = canvas.width;
      const h = canvas.height;
      const particles = particlesRef.current;
      const mouse = mouseRef.current;

      // Trigger pulse every PULSE_INTERVAL_MS
      if (timestamp - lastPulseRef.current > PULSE_INTERVAL_MS) {
        lastPulseRef.current = timestamp;
        triggerPulse();
      }

      ctx.clearRect(0, 0, w, h);

      // Update + draw particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Mouse repulsion
        if (mouse) {
          const dx = p.x - mouse.x;
          const dy = p.y - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < REPEL_DIST && dist > 0) {
            const force = (1 - dist / REPEL_DIST) * REPEL_FORCE;
            p.vx += (dx / dist) * force;
            p.vy += (dy / dist) * force;
          }
        }

        // Dampen velocity to keep drift slow
        p.vx *= 0.99;
        p.vy *= 0.99;

        // Clamp velocity
        const speed = Math.sqrt(p.vx * p.vx + p.vy * p.vy);
        const maxSpeed = 1.2;
        if (speed > maxSpeed) {
          p.vx = (p.vx / speed) * maxSpeed;
          p.vy = (p.vy / speed) * maxSpeed;
        }

        p.x += p.vx;
        p.y += p.vy;

        // Wrap at edges
        if (p.x < 0) p.x = w;
        if (p.x > w) p.x = 0;
        if (p.y < 0) p.y = h;
        if (p.y > h) p.y = 0;

        // Draw particle
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        if (p.isRed) {
          ctx.fillStyle = "rgba(204,20,20,0.9)";
        } else {
          const grey = Math.floor(200 + Math.random() * 55);
          ctx.fillStyle = `rgba(${grey},${grey},${grey},0.85)`;
        }
        ctx.fill();

        // Draw pulse ripple
        if (p.pulsing) {
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.pulseRadius, 0, Math.PI * 2);
          const color = p.isRed
            ? `rgba(204,20,20,${p.pulseAlpha})`
            : `rgba(255,255,255,${p.pulseAlpha})`;
          ctx.strokeStyle = color;
          ctx.lineWidth = 1.5;
          ctx.stroke();

          p.pulseRadius += 2.5;
          p.pulseAlpha -= 0.018;
          if (p.pulseAlpha <= 0) {
            p.pulsing = false;
            p.pulseRadius = 0;
            p.pulseAlpha = 0;
          }
        }
      }

      // Draw connections
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const a = particles[i];
          const b = particles[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < CONNECTION_DIST) {
            const opacity = 1 - dist / CONNECTION_DIST;
            if (a.isRed || b.isRed) {
              ctx.strokeStyle = `rgba(204,20,20,${(opacity * 0.15).toFixed(3)})`;
            } else {
              ctx.strokeStyle = `rgba(255,255,255,${(opacity * 0.08).toFixed(3)})`;
            }
            ctx.lineWidth = 0.8;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }

      rafRef.current = requestAnimationFrame(draw);
    }

    rafRef.current = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(rafRef.current);
      ro.disconnect();
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseleave", onMouseLeave);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={`absolute inset-0 ${className}`}
      style={{ zIndex: 0, pointerEvents: "none" }}
    >
      <canvas
        ref={canvasRef}
        style={{ display: "block", width: "100%", height: "100%" }}
      />
    </div>
  );
}
