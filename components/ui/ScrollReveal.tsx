"use client";

import { useEffect, useRef, useState, ReactNode } from "react";
import { motion, useInView } from "framer-motion";

type Direction = "up" | "down" | "left" | "right" | "scale" | "none";

interface ScrollRevealProps {
  children: ReactNode;
  delay?: number;
  direction?: Direction;
  duration?: number;
  className?: string;
  once?: boolean;
  amount?: number;
}

type MotionState = {
  opacity: number;
  x?: number;
  y?: number;
  scale?: number;
};

function getInitialState(direction: Direction): MotionState {
  switch (direction) {
    case "up":
      return { y: 40, opacity: 0 };
    case "down":
      return { y: -40, opacity: 0 };
    case "left":
      return { x: 40, opacity: 0 };
    case "right":
      return { x: -40, opacity: 0 };
    case "scale":
      return { scale: 0.85, opacity: 0 };
    case "none":
      return { opacity: 0 };
  }
}

function getVisibleState(direction: Direction): MotionState {
  switch (direction) {
    case "up":
    case "down":
      return { y: 0, opacity: 1 };
    case "left":
    case "right":
      return { x: 0, opacity: 1 };
    case "scale":
      return { scale: 1, opacity: 1 };
    case "none":
      return { opacity: 1 };
  }
}

export default function ScrollReveal({
  children,
  delay = 0,
  direction = "up",
  duration = 0.6,
  className,
  once = true,
  amount = 0.15,
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, {
    margin: "-80px",
    amount,
    once,
  });

  const [animateState, setAnimateState] = useState<MotionState>(
    getInitialState(direction)
  );

  useEffect(() => {
    if (isInView) {
      setAnimateState(getVisibleState(direction));
    } else if (!once) {
      setAnimateState(getInitialState(direction));
    }
  }, [isInView, direction, once]);

  return (
    <motion.div
      ref={ref}
      initial={getInitialState(direction)}
      animate={animateState}
      transition={{
        duration,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
