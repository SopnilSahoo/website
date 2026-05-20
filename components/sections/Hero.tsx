"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { ChevronDown } from "lucide-react";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const PARTICLES = Array.from({ length: 18 }, (_, i) => ({
  id: i,
  left: `${5 + ((i * 37) % 90)}%`,
  top: `${10 + ((i * 53) % 80)}%`,
  size: 1 + (i % 3),
  duration: `${6 + (i % 5)}s`,
  delay: `${(i * 0.4) % 5}s`,
  opacity: 0.3 + (i % 3) * 0.2,
}));

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });

  const bgScale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const contentY = useTransform(scrollYProgress, [0, 0.8], ["0%", "-12%"]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  const scrollTo = (id: string) => {
    document.querySelector(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      ref={ref}
      id="hero"
      className="relative min-h-screen flex items-end overflow-hidden bg-[#06070a]"
    >
      {/* ── Background image with parallax & Ken Burns ── */}
      <motion.div
        className="absolute inset-0"
        style={{ scale: bgScale, y: bgY }}
      >
        <Image
          src="https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1920&q=90"
          alt="Sreenivasa Sonthalia Ecorise — Luxury Residences"
          fill
          priority
          className="object-cover animate-ken-burns"
          sizes="100vw"
        />
      </motion.div>

      {/* ── Cinematic gradient overlays ── */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#06070a] via-[rgba(6,7,10,0.55)] to-[rgba(6,7,10,0.2)]" />
      <div className="absolute inset-0 bg-gradient-to-r from-[rgba(6,7,10,0.6)] via-transparent to-[rgba(6,7,10,0.2)]" />

      {/* ── Ambient gold glow ── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse 80% 50% at 50% 100%, rgba(201,168,76,0.08) 0%, transparent 70%)",
        }}
      />

      {/* ── Particle dots ── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {PARTICLES.map((p) => (
          <span
            key={p.id}
            className="particle"
            style={{
              left: p.left,
              top: p.top,
              width: `${p.size}px`,
              height: `${p.size}px`,
              opacity: p.opacity,
              "--duration": p.duration,
              "--delay": p.delay,
            } as React.CSSProperties}
          />
        ))}
      </div>

      {/* ── Content ── */}
      <motion.div
        style={{ y: contentY, opacity: contentOpacity }}
        className="relative z-10 w-full pb-24 md:pb-32"
      >
        <div className="container-luxury">
          {/* Eyebrow */}
          <motion.div
            className="section-eyebrow mb-6"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 3.0, ease: EASE }}
          >
            Sreenivasa Constructions · RERA: P02400010642
          </motion.div>

          {/* Main headline */}
          <div className="overflow-hidden mb-3">
            <motion.h1
              className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-light leading-[1.05] tracking-wide"
              style={{ fontFamily: "var(--font-cormorant), serif" }}
              initial={{ y: "100%", opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 1, delay: 3.1, ease: EASE }}
            >
              Sonthalia
            </motion.h1>
          </div>

          <div className="overflow-hidden mb-8">
            <motion.h1
              className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-light leading-[1.05] tracking-wide text-gold-gradient"
              style={{ fontFamily: "var(--font-cormorant), serif" }}
              initial={{ y: "100%", opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 1, delay: 3.2, ease: EASE }}
            >
              Ecorise
            </motion.h1>
          </div>

          {/* Tagline */}
          <motion.p
            className="text-[#a89d90] text-lg md:text-xl max-w-xl leading-relaxed mb-10 font-light"
            style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 3.35, ease: EASE }}
          >
            Ultra-luxury 3 & 4 BHK residences across 6.36 acres of curated elegance
            in the heart of Rajendranagar, Hyderabad.
          </motion.p>

          {/* CTA row */}
          <motion.div
            className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 3.5, ease: EASE }}
          >
            <button
              onClick={() => scrollTo("#inquiry")}
              className="btn-gold text-[0.7rem] px-8 py-3.5"
              style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}
            >
              <span className="relative z-10">Schedule Private Tour</span>
            </button>
            <button
              onClick={() => scrollTo("#residences")}
              className="btn-gold-outline text-[0.7rem] px-8 py-3.5"
              style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}
            >
              Explore Residences
            </button>
          </motion.div>

          {/* Stats strip */}
          <motion.div
            className="flex flex-wrap gap-8 md:gap-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 3.65, ease: EASE }}
          >
            {[
              { val: "3 & 4 BHK", label: "Configurations" },
              { val: "6.36 Acres", label: "Prime Land" },
              { val: "2790–4695", label: "sq.ft. Residences" },
              { val: "₹7,000/sqft", label: "Starting Price" },
            ].map(({ val, label }) => (
              <div key={label} className="flex flex-col">
                <span
                  className="text-[#f5f0e8] text-xl md:text-2xl font-light"
                  style={{ fontFamily: "var(--font-cormorant), serif" }}
                >
                  {val}
                </span>
                <span
                  className="text-[#5a5550] text-[0.65rem] tracking-[0.15em] uppercase mt-1"
                  style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}
                >
                  {label}
                </span>
              </div>
            ))}
          </motion.div>
        </div>
      </motion.div>

      {/* ── Scroll indicator ── */}
      <motion.button
        onClick={() => scrollTo("#overview")}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 group"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 4, duration: 0.6 }}
        aria-label="Scroll down"
      >
        <span
          className="text-[0.6rem] tracking-[0.3em] uppercase text-[#5a5550] group-hover:text-[#c9a84c] transition-colors"
          style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}
        >
          Explore
        </span>
        <div className="w-px h-12 overflow-hidden relative">
          <motion.div
            className="absolute w-full bg-gradient-to-b from-transparent via-[#c9a84c] to-transparent"
            animate={{ y: ["-100%", "200%"] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            style={{ height: "60%" }}
          />
        </div>
        <motion.div
          animate={{ y: [0, 4, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown size={14} className="text-[#c9a84c]" />
        </motion.div>
      </motion.button>
    </section>
  );
}
