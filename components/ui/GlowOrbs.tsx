"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

interface OrbConfig {
  width: number;
  height: number;
  top: string;
  left: string;
  color: string;
  blur: number;
  opacity: number;
  xKeyframes: number[];
  yKeyframes: number[];
  duration: number;
}

const ORBS_DESKTOP: OrbConfig[] = [
  {
    width: 560, height: 560, top: "-12%", left: "-8%",
    color: "rgba(204,20,20,1)", blur: 110, opacity: 0.15,
    xKeyframes: [0, 60, -30, 80, 0], yKeyframes: [0, 40, 90, 20, 0], duration: 18,
  },
  {
    width: 420, height: 420, top: "55%", left: "70%",
    color: "rgba(204,20,20,1)", blur: 90, opacity: 0.13,
    xKeyframes: [0, -70, 40, -50, 0], yKeyframes: [0, -50, -100, -30, 0], duration: 15,
  },
  {
    width: 500, height: 500, top: "30%", left: "40%",
    color: "rgba(255,255,255,1)", blur: 120, opacity: 0.04,
    xKeyframes: [0, 50, -20, 60, 0], yKeyframes: [0, -60, 30, -80, 0], duration: 20,
  },
  {
    width: 300, height: 300, top: "70%", left: "10%",
    color: "rgba(255,255,255,1)", blur: 70, opacity: 0.05,
    xKeyframes: [0, 40, -60, 20, 0], yKeyframes: [0, -30, -70, -20, 0], duration: 14,
  },
  {
    width: 380, height: 380, top: "5%", left: "60%",
    color: "rgba(204,20,20,1)", blur: 80, opacity: 0.12,
    xKeyframes: [0, -40, 30, -60, 0], yKeyframes: [0, 70, 30, 100, 0], duration: 16,
  },
];

// Mobile: fewer, smaller, higher opacity, tighter blur so glows are crisp
const ORBS_MOBILE: OrbConfig[] = [
  {
    width: 320, height: 320, top: "-8%", left: "-15%",
    color: "rgba(204,20,20,1)", blur: 70, opacity: 0.30,
    xKeyframes: [0, 40, -20, 50, 0], yKeyframes: [0, 30, 60, 15, 0], duration: 14,
  },
  {
    width: 280, height: 280, top: "50%", left: "55%",
    color: "rgba(204,20,20,1)", blur: 60, opacity: 0.25,
    xKeyframes: [0, -40, 25, -35, 0], yKeyframes: [0, -40, -70, -20, 0], duration: 12,
  },
  {
    width: 260, height: 260, top: "25%", left: "30%",
    color: "rgba(204,20,20,1)", blur: 55, opacity: 0.18,
    xKeyframes: [0, 30, -15, 40, 0], yKeyframes: [0, -30, 20, -50, 0], duration: 16,
  },
];

export default function GlowOrbs() {
  const [orbs, setOrbs] = useState<OrbConfig[]>(ORBS_DESKTOP);

  useEffect(() => {
    function pick() {
      setOrbs(window.innerWidth < 768 ? ORBS_MOBILE : ORBS_DESKTOP);
    }
    pick();
    window.addEventListener("resize", pick);
    return () => window.removeEventListener("resize", pick);
  }, []);

  return (
    <div
      aria-hidden="true"
      style={{
        position: "absolute",
        inset: 0,
        overflow: "hidden",
        pointerEvents: "none",
        zIndex: 0,
      }}
    >
      {orbs.map((orb, i) => (
        <motion.div
          key={i}
          animate={{
            x: orb.xKeyframes,
            y: orb.yKeyframes,
          }}
          transition={{
            duration: orb.duration,
            repeat: Infinity,
            repeatType: "mirror",
            ease: "linear",
          }}
          style={{
            position: "absolute",
            top: orb.top,
            left: orb.left,
            width: orb.width,
            height: orb.height,
            borderRadius: "50%",
            backgroundColor: orb.color,
            filter: `blur(${orb.blur}px)`,
            opacity: orb.opacity,
            willChange: "transform",
          }}
        />
      ))}
    </div>
  );
}
