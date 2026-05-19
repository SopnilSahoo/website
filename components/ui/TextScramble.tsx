"use client";

import { useEffect, useRef, useState } from "react";

const CHARSET = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%&*<>/";

interface TextScrambleProps {
  text: string;
  className?: string;
  trigger?: boolean;
  speed?: number;
}

interface CharState {
  display: string;
  locked: boolean;
  scrambling: boolean;
  color: string;
}

function randomChar(): string {
  return CHARSET[Math.floor(Math.random() * CHARSET.length)];
}

function randomScrambleColor(): string {
  return Math.random() < 0.5 ? "#a0a0a0" : "#CC1414";
}

export default function TextScramble({
  text,
  className,
  trigger = true,
  speed = 40,
}: TextScrambleProps) {
  const [chars, setChars] = useState<CharState[]>(() =>
    text.split("").map(() => ({
      display: " ",
      locked: false,
      scrambling: false,
      color: "#a0a0a0",
    }))
  );

  const timeoutsRef = useRef<ReturnType<typeof setTimeout>[]>([]);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const prevTriggerRef = useRef<boolean>(false);

  useEffect(() => {
    // Reset chars array length if text changes
    setChars(
      text.split("").map(() => ({
        display: " ",
        locked: false,
        scrambling: false,
        color: "#a0a0a0",
      }))
    );
  }, [text]);

  useEffect(() => {
    if (!trigger) {
      prevTriggerRef.current = false;
      return;
    }

    // Only run when trigger flips to true (or on initial mount with trigger=true)
    if (trigger === prevTriggerRef.current) return;
    prevTriggerRef.current = true;

    // Clear any existing animation
    timeoutsRef.current.forEach(clearTimeout);
    timeoutsRef.current = [];
    if (intervalRef.current !== null) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }

    const letters = text.split("");
    const totalChars = letters.length;

    // Track per-position lock status outside state for interval logic
    const locked = new Array<boolean>(totalChars).fill(false);

    // Stagger: each position locks after (index * lockDelay) ms of running
    const lockDelay = speed * 3;

    // Start scrambling interval
    intervalRef.current = setInterval(() => {
      setChars((prev) => {
        const next = prev.map((c, i) => {
          if (locked[i]) {
            return { display: letters[i], locked: true, scrambling: false, color: "#ffffff" };
          }
          return {
            display: randomChar(),
            locked: false,
            scrambling: true,
            color: randomScrambleColor(),
          };
        });
        return next;
      });
    }, speed);

    // Schedule each character to lock in sequentially
    letters.forEach((letter, i) => {
      const t = setTimeout(() => {
        locked[i] = true;
        setChars((prev) => {
          const next = [...prev];
          next[i] = { display: letter, locked: true, scrambling: false, color: "#ffffff" };
          return next;
        });

        // Once the last character locks, stop the interval
        if (i === totalChars - 1) {
          if (intervalRef.current !== null) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
          }
        }
      }, i * lockDelay + lockDelay);

      timeoutsRef.current.push(t);
    });

    return () => {
      timeoutsRef.current.forEach(clearTimeout);
      timeoutsRef.current = [];
      if (intervalRef.current !== null) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [trigger, text, speed]);

  return (
    <span className={className} aria-label={text}>
      {chars.map((c, i) => (
        <span
          key={i}
          style={{
            color: c.color,
            transition: c.locked ? "color 0.1s ease" : undefined,
            display: "inline-block",
            whiteSpace: "pre",
          }}
          aria-hidden="true"
        >
          {c.display}
        </span>
      ))}
    </span>
  );
}
