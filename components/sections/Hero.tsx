"use client";

import { motion, type Variants } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Button from "@/components/ui/Button";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.12,
      duration: 0.65,
      ease: EASE,
    },
  }),
};

export default function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-[#0a0a0a] px-4">
      {/* Red radial glow — center top */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 55% at 50% -10%, rgba(204,20,20,0.20) 0%, transparent 70%)",
        }}
      />

      {/* Subtle animated grid overlay */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* Edge vignette to fade grid into background */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 100% 100% at 50% 50%, transparent 40%, #0a0a0a 100%)",
        }}
      />

      <div className="relative z-10 flex flex-col items-center text-center max-w-4xl mx-auto w-full">
        {/* Badge */}
        <motion.div
          custom={0}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="mb-8"
        >
          <span
            className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full text-sm text-white/75 font-medium"
            style={{ border: "1px solid rgba(255,255,255,0.1)" }}
          >
            {/* Pulsing red dot */}
            <span className="relative flex h-2 w-2 flex-shrink-0">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#CC1414] opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-[#CC1414]" />
            </span>
            AI-Powered Digital Marketing
          </span>
        </motion.div>

        {/* Main headline */}
        <motion.h1
          custom={1}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold leading-[1.05] tracking-tight mb-6"
        >
          <span className="block text-white">We Don&apos;t Just Market</span>
          <span className="block text-white">We Make You</span>
          <span
            className="block"
            style={{
              background: "linear-gradient(90deg, #ffffff 0%, #CC1414 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Unmissable.
          </span>
        </motion.h1>

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
          className="flex flex-col sm:flex-row items-center gap-4 mb-12"
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
          className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-sm text-white/30 font-medium tracking-wide"
        >
          <span>5+ Years Experience</span>
          <span className="text-white/15 hidden sm:inline" aria-hidden="true">
            |
          </span>
          <span>50+ Happy Clients</span>
          <span className="text-white/15 hidden sm:inline" aria-hidden="true">
            |
          </span>
          <span>3 Accreditations</span>
        </motion.div>
      </div>
    </section>
  );
}
