"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, type Variants } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Button from "@/components/ui/Button";
import ParticleNetwork from "@/components/ui/ParticleNetwork";
import GlowOrbs from "@/components/ui/GlowOrbs";
import TextScramble from "@/components/ui/TextScramble";

// ─── Animation constants ────────────────────────────────────────────────────

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.13,
      duration: 0.7,
      ease: EASE,
    },
  }),
};

const badgeBounce: Variants = {
  hidden: { opacity: 0, scale: 0.6, y: -8 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 480,
      damping: 22,
      delay: 0.05,
    },
  },
};

const floatAnimation = {
  y: [0, -6, 0, 6, 0],
  transition: {
    duration: 6,
    repeat: Infinity,
    ease: "easeInOut" as const,
  },
};

// ─── Live metric card data ───────────────────────────────────────────────────

const METRICS = [
  { stat: "↑ 340%", label: "Average Lead Growth" },
  { stat: "↑ 12x",  label: "ROAS Achieved" },
  { stat: "< 30 days", label: "First Results" },
] as const;

// ─── Component ───────────────────────────────────────────────────────────────

export default function Hero() {
  const [scrambleTrigger, setScrambleTrigger] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  // Fire TextScramble after 800 ms so it lands after the headline fades in
  useEffect(() => {
    const id = setTimeout(() => setScrambleTrigger(true), 800);
    return () => clearTimeout(id);
  }, []);

  // Scroll-linked parallax
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  // Background layers move DOWN (slow parallax)
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);
  // Subtle scale-up on background as you scroll
  const bgScale = useTransform(scrollYProgress, [0, 1], [1, 1.08]);
  // Content moves UP slightly faster than the background
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "-18%"]);
  // Content fades out in the first half of the scroll
  const contentOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-[#0a0a0a] px-4 pt-20"
    >

      {/* ── Background layer 1: Particle network (z-0) ── */}
      <ParticleNetwork />

      {/* ── Background layer 2: Animated glow orbs (z-0) ── */}
      <GlowOrbs />

      {/* ── Parallax background layers (3, 4, 5) ── */}
      <motion.div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{ y: bgY, scale: bgScale }}
      >
        {/* ── Background layer 3: Red radial glow — top center ── */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            zIndex: 1,
            background:
              "radial-gradient(ellipse 120% 60% at 50% -5%, rgba(204,20,20,0.32) 0%, transparent 70%)",
          }}
        />

        {/* ── Background layer 4: Dot grid overlay ── */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-[0.07]"
          style={{
            zIndex: 2,
            backgroundImage:
              "radial-gradient(circle, rgba(255,255,255,0.9) 1px, transparent 1px)",
            backgroundSize: "28px 28px",
          }}
        />

        {/* ── Background layer 5: Soft edge vignette + bottom fade (lighter on mobile) ── */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            zIndex: 3,
            background: [
              "radial-gradient(ellipse 110% 90% at 50% 50%, transparent 45%, #0a0a0a 100%)",
              "linear-gradient(to bottom, transparent 65%, #0a0a0a 100%)",
            ].join(", "),
          }}
        />
      </motion.div>

      {/* ── Content ── */}
      <motion.div style={{ y: contentY, opacity: contentOpacity }}>
        <div className="relative flex flex-col items-center text-center max-w-4xl mx-auto w-full" style={{ zIndex: 10 }}>

          {/* Pre-headline agency tag */}
          <motion.p
            custom={0}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="mb-4 text-xs font-semibold tracking-[0.25em] uppercase"
            style={{ color: "#CC1414" }}
          >
            Reach Digitally Agency
          </motion.p>

          {/* Badge */}
          <motion.div
            variants={badgeBounce}
            initial="hidden"
            animate="visible"
            className="mb-9"
          >
            <span
              className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full text-sm text-white/75 font-medium"
              style={{ border: "1px solid rgba(255,255,255,0.10)" }}
            >
              {/* Pulsing red dot */}
              <span className="relative flex h-2 w-2 flex-shrink-0">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#CC1414] opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-[#CC1414]" />
              </span>
              AI-Powered Digital Marketing
            </span>
          </motion.div>

          {/* Main headline — floats gently as a group */}
          <motion.div animate={floatAnimation}>
            <motion.h1
              custom={1}
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold leading-[1.05] tracking-tight mb-6"
            >
              <span className="block text-white">We Don&apos;t Just Market</span>
              <span className="block text-white">We Make You</span>
              {/* Third line: TextScramble for "Unmissable." */}
              <span
                className="block"
                style={{
                  background: "linear-gradient(90deg, #ffffff 0%, #CC1414 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                <TextScramble
                  text="Unmissable."
                  trigger={scrambleTrigger}
                  speed={38}
                />
              </span>
            </motion.h1>
          </motion.div>

          {/* Subtext */}
          <motion.p
            custom={2}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="text-white/50 text-lg sm:text-xl max-w-2xl leading-relaxed mb-10"
          >
            Reach Digitally Agency helps brands dominate search, social, and
            beyond&nbsp;&mdash; with AI-powered strategies that convert.
          </motion.p>

          {/* CTA buttons */}
          <motion.div
            custom={3}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="flex flex-col sm:flex-row items-center gap-4 mb-10"
          >
            <Button
              variant="primary"
              size="lg"
              href="/contact"
              icon={<ArrowRight size={20} />}
            >
              Book a Free Strategy Call
            </Button>

            <Button variant="secondary" size="lg" href="/work">
              View Our Work
            </Button>
          </motion.div>

          {/* Trust indicators */}
          <motion.div
            custom={4}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-sm text-white/30 font-medium tracking-wide mb-8"
          >
            <span>5+ Years Experience</span>
            <span className="text-white/15 hidden sm:inline" aria-hidden="true">|</span>
            <span>50+ Happy Clients</span>
            <span className="text-white/15 hidden sm:inline" aria-hidden="true">|</span>
            <span>3 Accreditations</span>
          </motion.div>

          {/* Live metric cards */}
          <motion.div
            custom={5}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-3 w-full max-w-sm sm:max-w-none sm:flex sm:flex-wrap items-center justify-center gap-2 sm:gap-3"
          >
            {METRICS.map(({ stat, label }) => (
              <div
                key={label}
                className="flex flex-col items-center rounded-xl px-3 sm:px-5 py-3"
                style={{
                  background: "rgba(255,255,255,0.05)",
                  border: "1px solid rgba(255,255,255,0.12)",
                }}
              >
                <span className="text-white font-bold text-base sm:text-lg leading-tight tabular-nums">
                  {stat}
                </span>
                <span className="text-white/45 text-[10px] sm:text-xs mt-0.5 text-center">
                  {label}
                </span>
              </div>
            ))}
          </motion.div>

        </div>
      </motion.div>
    </section>
  );
}
