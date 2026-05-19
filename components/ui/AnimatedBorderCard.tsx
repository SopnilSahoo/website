"use client";

import { useState, ReactNode } from "react";
import { motion } from "framer-motion";

interface AnimatedBorderCardProps {
  children: ReactNode;
  className?: string;
  glowColor?: string;
}

export default function AnimatedBorderCard({
  children,
  className = "",
  glowColor = "#CC1414",
}: AnimatedBorderCardProps) {
  const [hovered, setHovered] = useState(false);

  // Derive rgba values from the glowColor for box-shadow layers
  const shadowNear = `${glowColor}33`; // ~20% opacity
  const shadowFar = `${glowColor}0d`;  // ~5% opacity

  return (
    <motion.div
      className={`relative ${className}`}
      style={{ borderRadius: "inherit" }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      animate={{
        boxShadow: hovered
          ? `0 0 0 1px ${glowColor}99, 0 0 30px ${shadowNear}, 0 0 60px ${shadowFar}`
          : `0 0 0 1px rgba(255,255,255,0.06), 0 0 0px transparent`,
      }}
      transition={{ duration: 0.3, ease: "easeOut" }}
    >
      {/* Top gradient overlay — fades in on hover */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-px"
        style={{
          background: `linear-gradient(90deg, transparent 0%, ${glowColor} 50%, transparent 100%)`,
          borderRadius: "inherit",
        }}
        animate={{ opacity: hovered ? 1 : 0 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
      />

      {/* Content */}
      <div style={{ position: "relative", borderRadius: "inherit" }}>
        {children}
      </div>
    </motion.div>
  );
}
