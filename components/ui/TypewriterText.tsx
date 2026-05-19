"use client";

import { useEffect, useState } from "react";

interface TypewriterTextProps {
  text: string;
  className?: string;
  speed?: number;
  delay?: number;
  cursor?: boolean;
  onComplete?: () => void;
}

export default function TypewriterText({
  text,
  className,
  speed = 60,
  delay = 0,
  cursor = true,
  onComplete,
}: TypewriterTextProps) {
  const [displayedCount, setDisplayedCount] = useState(0);
  const [started, setStarted] = useState(false);
  const [done, setDone] = useState(false);

  // Handle start delay
  useEffect(() => {
    setDisplayedCount(0);
    setStarted(false);
    setDone(false);

    const startTimer = setTimeout(() => {
      setStarted(true);
    }, delay);

    return () => clearTimeout(startTimer);
  }, [text, delay]);

  // Type characters once started
  useEffect(() => {
    if (!started) return;
    if (displayedCount >= text.length) {
      setDone(true);
      onComplete?.();
      return;
    }

    const interval = setInterval(() => {
      setDisplayedCount((prev) => {
        if (prev >= text.length) {
          clearInterval(interval);
          return prev;
        }
        return prev + 1;
      });
    }, speed);

    return () => clearInterval(interval);
  }, [started, text, speed, onComplete]); // eslint-disable-line react-hooks/exhaustive-deps

  // Mark done when count reaches full length (covers edge case)
  useEffect(() => {
    if (started && displayedCount >= text.length && !done) {
      setDone(true);
      onComplete?.();
    }
  }, [displayedCount, text.length, started, done, onComplete]);

  return (
    <span className={className}>
      {text.slice(0, displayedCount)}
      {cursor && (
        <span
          aria-hidden="true"
          style={{ animation: "blink 1s step-start infinite" }}
        >
          |
        </span>
      )}
    </span>
  );
}
