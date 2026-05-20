"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import AnimatedCounter from "@/components/ui/AnimatedCounter";
import ScrollReveal from "@/components/ui/ScrollReveal";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const STATS = [
  { end: 25, suffix: "+", label: "Years of Excellence", description: "Building trust since 1998" },
  { end: 50, suffix: "+", label: "Completed Projects", description: "Across Hyderabad & beyond" },
  { end: 1000, suffix: "+", label: "Families Housed", description: "Who chose Sreenivasa" },
  { end: 6.36, suffix: " Acres", label: "Prime Land", description: "Of curated living space", decimals: 2 },
];

const HIGHLIGHTS = [
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6">
        <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
        <polyline points="9,22 9,12 15,12 15,22" />
      </svg>
    ),
    title: "Spacious Residences",
    desc: "Homes ranging from 2,790 to 4,695 sq.ft. — designed for those who appreciate space.",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6">
        <circle cx="12" cy="12" r="10" />
        <path d="M12 8v4l3 3" />
      </svg>
    ),
    title: "Strategic Location",
    desc: "Minutes from Financial District, ORR, HITEC City, and Hyderabad Airport.",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
    title: "RERA Certified",
    desc: "Complete transparency and legal security. RERA Registration: P02400010642.",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6">
        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
      </svg>
    ),
    title: "World-Class Amenities",
    desc: "Infinity pool, grand clubhouse, fitness center, and landscaped gardens.",
  },
];

export default function ProjectOverview() {
  const statsRef = useRef<HTMLDivElement>(null);
  const inView = useInView(statsRef, { once: true, margin: "-80px" });

  return (
    <section id="overview" className="relative bg-[#06070a] overflow-hidden">
      {/* Gold ambient */}
      <div
        className="absolute top-0 right-0 w-[600px] h-[600px] pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(201,168,76,0.04) 0%, transparent 70%)",
        }}
      />

      {/* ── Intro block ── */}
      <div className="container-luxury pt-24 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <ScrollReveal direction="left" duration={0.9}>
            <p className="section-eyebrow mb-6">About The Project</p>
            <h2
              className="text-4xl md:text-5xl lg:text-6xl font-light leading-[1.1] tracking-wide text-[#f5f0e8] mb-8"
              style={{ fontFamily: "var(--font-cormorant), serif" }}
            >
              Where Architecture
              <br />
              <span className="text-gold-gradient">Meets Aspiration</span>
            </h2>
            <div className="h-px w-16 bg-gradient-to-r from-[#c9a84c] to-transparent mb-8" />
            <p
              className="text-[#a89d90] text-base leading-[1.85] max-w-lg"
              style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}
            >
              Sreenivasa Sonthalia Ecorise is a landmark luxury residential project
              in Gaganpahad, Rajendranagar — one of Hyderabad&apos;s most sought-after
              addresses. Spread across 6.36 acres, it offers thoughtfully crafted
              3 & 4 BHK residences that blend contemporary architecture with
              timeless elegance.
            </p>
            <p
              className="text-[#a89d90] text-base leading-[1.85] max-w-lg mt-4"
              style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}
            >
              Every detail — from the soaring ceiling heights to the premium
              fittings — reflects an uncompromising commitment to quality
              that Sreenivasa Constructions has upheld for over 25 years.
            </p>
          </ScrollReveal>

          {/* Highlights grid */}
          <ScrollReveal direction="right" duration={0.9} delay={0.1}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {HIGHLIGHTS.map((h, i) => (
                <motion.div
                  key={h.title}
                  className="luxury-card p-6 group"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.5, delay: i * 0.08, ease: EASE }}
                >
                  <div className="text-[#c9a84c] mb-4 group-hover:scale-110 transition-transform duration-300 w-fit">
                    {h.icon}
                  </div>
                  <h3
                    className="text-[#f5f0e8] text-base mb-2 font-light"
                    style={{ fontFamily: "var(--font-cormorant), serif" }}
                  >
                    {h.title}
                  </h3>
                  <p
                    className="text-[#5a5550] text-xs leading-relaxed"
                    style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}
                  >
                    {h.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </div>

      {/* ── Stats strip ── */}
      <div className="border-t border-[rgba(201,168,76,0.1)] border-b">
        <div ref={statsRef} className="container-luxury py-16">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-0 md:divide-x md:divide-[rgba(201,168,76,0.1)]">
            {STATS.map(({ end, suffix, label, description, decimals }, i) => (
              <motion.div
                key={label}
                className="flex flex-col items-center text-center px-4 md:px-8"
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.1, ease: EASE }}
              >
                <span
                  className="text-4xl md:text-5xl font-light text-[#f5f0e8] mb-2"
                  style={{ fontFamily: "var(--font-cormorant), serif" }}
                >
                  <AnimatedCounter
                    end={end}
                    suffix={suffix}
                    decimals={decimals ?? 0}
                    duration={2}
                  />
                </span>
                <span
                  className="text-[#c9a84c] text-xs tracking-[0.15em] uppercase mb-1"
                  style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}
                >
                  {label}
                </span>
                <span
                  className="text-[#5a5550] text-xs"
                  style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}
                >
                  {description}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
