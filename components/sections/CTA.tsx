"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Phone, Mail } from "lucide-react";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

// Diagonal data-stream lines config
const DIAGONAL_LINES = [
  { left: "8%", top: "-20%", rotate: 35, duration: 14, delay: 0, opacity: 0.07 },
  { left: "28%", top: "-30%", rotate: 35, duration: 18, delay: 3, opacity: 0.05 },
  { left: "52%", top: "-15%", rotate: 35, duration: 12, delay: 1.5, opacity: 0.06 },
  { left: "74%", top: "-25%", rotate: 35, duration: 16, delay: 5, opacity: 0.05 },
  { left: "90%", top: "-10%", rotate: 35, duration: 20, delay: 2, opacity: 0.04 },
] as const;

// Pulsing rings config
const PULSE_RINGS = [
  { delay: 0, duration: 2.0 },
  { delay: 0.65, duration: 2.0 },
  { delay: 1.3, duration: 2.0 },
] as const;

function DataStreamLine({
  left,
  top,
  rotate,
  duration,
  delay,
  opacity,
}: (typeof DIAGONAL_LINES)[number]) {
  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none absolute"
      style={{
        left,
        top,
        rotate: `${rotate}deg`,
        width: "1px",
        height: "260px",
        background:
          "linear-gradient(to bottom, transparent 0%, #CC1414 40%, #CC1414 60%, transparent 100%)",
        opacity,
        originX: "50%",
        originY: "0%",
      }}
      animate={{ y: ["0%", "160%"] }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        ease: "linear",
        repeatType: "loop",
      }}
    />
  );
}

function PulsingRing({ delay, duration }: (typeof PULSE_RINGS)[number]) {
  return (
    <motion.span
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 rounded-xl border border-[#CC1414]"
      initial={{ opacity: 0.7, scale: 1 }}
      animate={{ opacity: 0, scale: 1.65 }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        ease: "easeOut",
        repeatType: "loop",
      }}
    />
  );
}

// Word-by-word stagger for headline
const headlineContainerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08, delayChildren: 0.05 },
  },
};

const wordVariant = {
  hidden: { opacity: 0, y: 22 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: EASE } },
};

function AnimatedHeadline({
  inView,
}: {
  inView: boolean;
}) {
  // Split preserving the red "Business?" span
  const plainWords = ["Ready", "to", "Grow", "Your"];

  return (
    <motion.h2
      variants={headlineContainerVariants}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      className="text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl xl:text-6xl"
      aria-label="Ready to Grow Your Business?"
    >
      {plainWords.map((word) => (
        <motion.span key={word} variants={wordVariant} className="inline-block mr-[0.25em]">
          {word}
        </motion.span>
      ))}
      <motion.span
        variants={wordVariant}
        className="inline-block text-[#CC1414]"
      >
        Business?
      </motion.span>
    </motion.h2>
  );
}

export default function CTA() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="relative overflow-hidden bg-[#0a0a0a]">
      {/* Top + bottom borders */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent"
      />
      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent"
      />

      {/* Red radial glow background */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 70% 60% at 50% 50%, rgba(204,20,20,0.13) 0%, rgba(204,20,20,0.04) 40%, transparent 70%)",
        }}
      />

      {/* Noise texture overlay */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
          backgroundRepeat: "repeat",
          backgroundSize: "128px 128px",
        }}
      />

      {/* Animated diagonal data-stream lines */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
        {DIAGONAL_LINES.map((line, i) => (
          <DataStreamLine key={i} {...line} />
        ))}
      </div>

      <div
        ref={ref}
        className="relative mx-auto max-w-4xl px-4 py-24 text-center sm:px-6 sm:py-32 lg:px-8"
      >
        {/* Headline — word-by-word stagger */}
        <AnimatedHeadline inView={inView} />

        {/* Subtext */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.38, duration: 0.65, ease: EASE }}
          className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-white/55 sm:text-lg"
        >
          Book a free 30-minute strategy call. No fluff, no hard sell — just a
          clear roadmap for your brand&apos;s growth.
        </motion.p>

        {/* Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.48, duration: 0.65, ease: EASE }}
          className="mt-10 flex flex-wrap items-center justify-center gap-3 sm:gap-4"
        >
          {/* Primary button with pulsing rings */}
          <div className="relative inline-flex">
            {/* Pulsing rings */}
            {inView &&
              PULSE_RINGS.map((ring, i) => (
                <PulsingRing key={i} {...ring} />
              ))}

            <a
              href="tel:9777606321"
              className="relative inline-flex items-center gap-2 rounded-xl bg-[#CC1414] px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-[#CC1414]/20 transition-all duration-200 hover:bg-[#e01616] hover:shadow-[#CC1414]/30 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#CC1414]"
            >
              Book Strategy Call
            </a>
          </div>

          {/* Ghost */}
          <a
            href="mailto:hello@reachdigitally.agency"
            className="inline-flex items-center gap-2 rounded-xl border border-white/[0.12] bg-white/[0.04] px-6 py-3 text-sm font-semibold text-white/80 backdrop-blur-sm transition-all duration-200 hover:border-white/20 hover:bg-white/[0.08] hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/30"
          >
            Talk to Us
          </a>
        </motion.div>

        {/* Contact info */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.58, duration: 0.6, ease: EASE }}
          className="mt-10 flex flex-wrap items-center justify-center gap-x-6 gap-y-3"
        >
          <a
            href="tel:9777606321"
            className="flex items-center gap-2 text-sm text-white/40 transition-colors hover:text-white/70"
          >
            <Phone
              className="h-4 w-4 shrink-0 text-[#CC1414]/70"
              aria-hidden="true"
            />
            9777606321
          </a>

          <span aria-hidden="true" className="h-3 w-px bg-white/20" />

          <a
            href="mailto:hello@reachdigitally.agency"
            className="flex items-center gap-2 text-sm text-white/40 transition-colors hover:text-white/70"
          >
            <Mail
              className="h-4 w-4 shrink-0 text-[#CC1414]/70"
              aria-hidden="true"
            />
            hello@reachdigitally.agency
          </a>
        </motion.div>
      </div>
    </section>
  );
}
