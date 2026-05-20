"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import ScrollReveal from "@/components/ui/ScrollReveal";

const IMAGES = [
  {
    src: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&q=80",
    label: "Living Room",
    desc: "Open-plan living with floor-to-ceiling windows",
  },
  {
    src: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=1200&q=80",
    label: "Master Bedroom",
    desc: "Spacious retreats designed for restful living",
  },
  {
    src: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=1200&q=80",
    label: "Gourmet Kitchen",
    desc: "European-style modular kitchens with premium fittings",
  },
  {
    src: "https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=1200&q=80",
    label: "Luxury Bathroom",
    desc: "Spa-inspired bathrooms with imported marble",
  },
  {
    src: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=1200&q=80",
    label: "Private Balcony",
    desc: "Panoramic views of the Hyderabad skyline",
  },
  {
    src: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=1200&q=80",
    label: "Dining Area",
    desc: "Elegantly crafted dining spaces for every occasion",
  },
];

export default function Gallery() {
  const [active, setActive] = useState<typeof IMAGES[0] | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  return (
    <section id="gallery" className="relative bg-[#0d0e12] overflow-hidden py-0">
      {/* ── Header ── */}
      <div className="container-luxury pt-24 pb-12">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
          <ScrollReveal direction="up" duration={0.8}>
            <p className="section-eyebrow mb-4">Interior Showcase</p>
            <h2
              className="text-4xl md:text-5xl font-light leading-tight text-[#f5f0e8]"
              style={{ fontFamily: "var(--font-cormorant), serif" }}
            >
              Crafted for the
              <br />
              <span className="text-gold-gradient">Discerning Eye</span>
            </h2>
          </ScrollReveal>
          <ScrollReveal direction="up" delay={0.1} duration={0.8}>
            <p
              className="text-[#5a5550] text-sm max-w-xs leading-relaxed"
              style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}
            >
              Every space at Sonthalia Ecorise is a masterclass in refined living.
              Scroll to explore the interiors.
            </p>
          </ScrollReveal>
        </div>
      </div>

      {/* ── Horizontal scroll gallery ── */}
      <div ref={scrollRef} className="overflow-x-auto horizontal-scroll px-6 md:px-12 pb-16 gap-4">
        {IMAGES.map((img, i) => (
          <motion.div
            key={img.label}
            className="relative w-[280px] sm:w-[360px] md:w-[440px] h-[380px] sm:h-[480px] md:h-[560px] overflow-hidden cursor-pointer group shrink-0"
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
            onClick={() => setActive(img)}
          >
            <Image
              src={img.src}
              alt={img.label}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              sizes="(max-width: 640px) 280px, (max-width: 768px) 360px, 440px"
            />
            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-[rgba(6,7,10,0.85)] via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400" />
            {/* Label */}
            <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-400">
              <p
                className="text-[#c9a84c] text-[0.65rem] tracking-[0.2em] uppercase mb-1"
                style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}
              >
                {img.label}
              </p>
              <p
                className="text-[#f5f0e8] text-sm font-light"
                style={{ fontFamily: "var(--font-cormorant), serif" }}
              >
                {img.desc}
              </p>
            </div>
            {/* Index */}
            <div
              className="absolute top-5 right-5 text-[#c9a84c] text-[0.65rem] tracking-[0.2em]"
              style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}
            >
              0{i + 1}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Scroll hint */}
      <div className="container-luxury pb-16 flex items-center gap-3 text-[#5a5550]">
        <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M9 18l6-6-6-6" />
        </svg>
        <span
          className="text-[0.65rem] tracking-[0.2em] uppercase"
          style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}
        >
          Swipe or drag to explore
        </span>
      </div>

      {/* ── Lightbox ── */}
      <AnimatePresence>
        {active && (
          <motion.div
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-sm p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActive(null)}
          >
            <motion.div
              className="relative w-full max-w-4xl aspect-video"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={active.src}
                alt={active.label}
                fill
                className="object-cover"
                sizes="(max-width: 1200px) 100vw, 1200px"
              />
              <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent">
                <p className="section-eyebrow mb-1 text-[0.6rem]">{active.label}</p>
                <p className="text-[#f5f0e8] text-xl font-light" style={{ fontFamily: "var(--font-cormorant), serif" }}>
                  {active.desc}
                </p>
              </div>
              <button
                onClick={() => setActive(null)}
                className="absolute top-4 right-4 w-9 h-9 flex items-center justify-center bg-black/60 text-white rounded-full hover:bg-black/80 transition-colors"
              >
                ✕
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
