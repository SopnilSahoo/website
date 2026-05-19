"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

interface Stat {
  value: number;
  suffix: string;
  label: string;
}

const STATS: Stat[] = [
  { value: 5, suffix: "+", label: "Years of Expertise" },
  { value: 50, suffix: "+", label: "Brands Transformed" },
  { value: 200, suffix: "+", label: "Campaigns Launched" },
  { value: 98, suffix: "%", label: "Client Retention Rate" },
];

function useCounter(target: number, duration: number, active: boolean) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!active) return;
    let start = 0;
    const increment = target / (duration / 16);
    const timer = setInterval(() => {
      start += increment;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [active, target, duration]);

  return count;
}

function StatCard({ stat, index, active }: { stat: Stat; index: number; active: boolean }) {
  const count = useCounter(stat.value, 1800, active);

  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      animate={active ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.12, duration: 0.65, ease: EASE }}
      className="group relative flex flex-col items-center justify-center rounded-2xl border border-white/[0.07] bg-white/[0.02] px-6 py-10 text-center backdrop-blur-sm transition-colors duration-300 hover:border-[#CC1414]/30 hover:bg-white/[0.04]"
    >
      {/* subtle top-edge glow on hover */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#CC1414]/40 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
      />

      <p className="text-5xl font-bold tracking-tight text-white sm:text-6xl">
        {count}
        <span className="text-[#CC1414]">{stat.suffix}</span>
      </p>
      <p className="mt-3 text-sm font-medium tracking-wide text-white/50">{stat.label}</p>
    </motion.div>
  );
}

export default function Stats() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="relative overflow-hidden bg-[#0a0a0a] py-24 sm:py-32">
      {/* faint red glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 60% 40% at 50% 100%, rgba(204,20,20,0.07) 0%, transparent 70%)",
        }}
      />

      <div ref={ref} className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Section label */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, ease: EASE }}
          className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-[#CC1414]"
        >
          The Numbers
        </motion.p>

        {/* Headline */}
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.06, duration: 0.6, ease: EASE }}
          className="mb-14 text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl"
        >
          Results That Speak
        </motion.h2>

        {/* Stat cards */}
        <div className="grid grid-cols-2 gap-4 sm:gap-5 lg:grid-cols-4">
          {STATS.map((stat, i) => (
            <StatCard key={stat.label} stat={stat} index={i} active={inView} />
          ))}
        </div>

        {/* Accreditations row */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.55, duration: 0.6, ease: EASE }}
          className="mt-16 flex flex-wrap items-center justify-center gap-x-0 gap-y-3"
        >
          {["BNI Member", "Startup Odisha", "MSME Registered"].map((item, i) => (
            <span key={item} className="flex items-center">
              <span className="text-xs font-medium uppercase tracking-widest text-white/40 transition-colors hover:text-white/70">
                {item}
              </span>
              {i < 2 && (
                <span className="mx-4 h-3 w-px bg-white/20" aria-hidden="true" />
              )}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
