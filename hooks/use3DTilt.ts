"use client";

import { useRef, useCallback } from "react";
import { useMotionValue, useSpring } from "framer-motion";

export interface TiltResult {
  ref: React.RefObject<HTMLDivElement | null>;
  rotateX: ReturnType<typeof useSpring>;
  rotateY: ReturnType<typeof useSpring>;
  glareX: ReturnType<typeof useMotionValue<number>>;
  glareY: ReturnType<typeof useMotionValue<number>>;
  glareOpacity: ReturnType<typeof useMotionValue<number>>;
  onMouseMove: (e: React.MouseEvent<HTMLDivElement>) => void;
  onMouseLeave: () => void;
}

const SPRING = { stiffness: 280, damping: 28, mass: 0.6 };

export function use3DTilt(maxAngle = 12): TiltResult {
  const ref = useRef<HTMLDivElement>(null);

  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const rotateX = useSpring(rawY, SPRING);
  const rotateY = useSpring(rawX, SPRING);

  // Glare highlight position (0–100% across card surface)
  const glareX = useMotionValue(50);
  const glareY = useMotionValue(50);
  const glareOpacity = useMotionValue(0);

  const onMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const nx = (e.clientX - rect.left) / rect.width;  // 0..1
      const ny = (e.clientY - rect.top) / rect.height;  // 0..1
      // Center-relative normalized (-1..1)
      const cx = nx * 2 - 1;
      const cy = ny * 2 - 1;
      rawX.set(cx * maxAngle);
      rawY.set(-cy * maxAngle);
      glareX.set(nx * 100);
      glareY.set(ny * 100);
      glareOpacity.set(0.12);
    },
    [rawX, rawY, glareX, glareY, glareOpacity, maxAngle]
  );

  const onMouseLeave = useCallback(() => {
    rawX.set(0);
    rawY.set(0);
    glareOpacity.set(0);
  }, [rawX, rawY, glareOpacity]);

  return { ref, rotateX, rotateY, glareX, glareY, glareOpacity, onMouseMove, onMouseLeave };
}
