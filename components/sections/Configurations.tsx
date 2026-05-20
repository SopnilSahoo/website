"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import ScrollReveal from "@/components/ui/ScrollReveal";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const CONFIGS = [
  {
    id: "3bhk",
    type: "3 BHK",
    area: "2,790 sq.ft.",
    price: "₹1.95 Cr* Onwards",
    tagline: "Intimate Luxury",
    description:
      "A perfectly proportioned 3-bedroom sanctuary with expansive living spaces, premium finishes, and breathtaking views — ideal for families who value quality over quantity.",
    features: [
      "3 Bedrooms + 3 Bathrooms",
      "Private Balcony (160 sq.ft.)",
      "Modular Kitchen with Pantry",
      "Master Bedroom with Walk-in Wardrobe",
      "Utility & Storage Area",
      "Double-height Living Room",
    ],
    image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1000&q=80",
    highlight: "Most Popular",
  },
  {
    id: "4bhk",
    type: "4 BHK",
    area: "4,675–4,695 sq.ft.",
    price: "₹3.27 Cr* Onwards",
    tagline: "Grand Living",
    description:
      "An extraordinary 4-bedroom residence designed for those who demand the very best. Palatial proportions, dual balconies, and a home office — a statement in refined living.",
    features: [
      "4 Bedrooms + 4.5 Bathrooms",
      "Dual Balconies (280+ sq.ft.)",
      "Dedicated Home Office/Study",
      "Grand Master Suite with His & Her Closets",
      "Separate Servant Quarter",
      "Family Lounge + Formal Living",
    ],
    image: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=1000&q=80",
    highlight: "Premium Collection",
  },
];

export default function Configurations() {
  const [activeConfig, setActiveConfig] = useState<typeof CONFIGS[0] | null>(null);

  return (
    <section id="residences" className="relative bg-[#0d0e12] overflow-hidden">
      {/* Ambient */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(201,168,76,0.025) 0%, transparent 60%)" }}
      />

      <div className="container-luxury section-padding">
        {/* Header */}
        <ScrollReveal direction="up" duration={0.8}>
          <div className="text-center max-w-2xl mx-auto mb-16">
            <p className="section-eyebrow mb-4 justify-center">Residences</p>
            <h2
              className="text-4xl md:text-5xl font-light leading-tight text-[#f5f0e8] mb-6"
              style={{ fontFamily: "var(--font-cormorant), serif" }}
            >
              Thoughtfully Crafted
              <br />
              <span className="text-gold-gradient">For Every Chapter</span>
            </h2>
            <p
              className="text-[#5a5550] text-sm leading-relaxed"
              style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}
            >
              Two distinct configurations — each a world of its own, both a
              testament to the art of extraordinary living.
            </p>
          </div>
        </ScrollReveal>

        {/* Configuration cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
          {CONFIGS.map((config, i) => (
            <motion.div
              key={config.id}
              className="relative overflow-hidden luxury-card group cursor-pointer"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: i * 0.12, ease: EASE }}
              onClick={() => setActiveConfig(config)}
            >
              {/* Image */}
              <div className="relative h-64 md:h-80 overflow-hidden">
                <Image
                  src={config.image}
                  alt={config.type}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#111318] via-transparent to-transparent" />
                {/* Highlight badge */}
                <div
                  className="absolute top-5 left-5 px-3 py-1 text-[0.6rem] tracking-[0.2em] uppercase text-[#06070a] font-semibold"
                  style={{
                    background: "linear-gradient(135deg, #e2c97e, #c9a84c)",
                    fontFamily: "var(--font-dm-sans), sans-serif",
                  }}
                >
                  {config.highlight}
                </div>
              </div>

              {/* Content */}
              <div className="p-7 md:p-8">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <p
                      className="text-[#c9a84c] text-[0.62rem] tracking-[0.2em] uppercase mb-2"
                      style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}
                    >
                      {config.tagline}
                    </p>
                    <h3
                      className="text-[#f5f0e8] text-3xl md:text-4xl font-light"
                      style={{ fontFamily: "var(--font-cormorant), serif" }}
                    >
                      {config.type}
                    </h3>
                  </div>
                  <div className="text-right">
                    <p
                      className="text-[#f5f0e8] text-xl font-light"
                      style={{ fontFamily: "var(--font-cormorant), serif" }}
                    >
                      {config.area}
                    </p>
                    <p
                      className="text-[#c9a84c] text-sm mt-1"
                      style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}
                    >
                      {config.price}
                    </p>
                  </div>
                </div>

                <div className="h-px bg-[rgba(201,168,76,0.15)] mb-5" />

                <p
                  className="text-[#5a5550] text-sm leading-relaxed mb-6"
                  style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}
                >
                  {config.description}
                </p>

                {/* Feature list */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-6">
                  {config.features.map((f) => (
                    <div key={f} className="flex items-center gap-2">
                      <div className="w-1 h-1 rounded-full bg-[#c9a84c] shrink-0" />
                      <span
                        className="text-[#a89d90] text-xs"
                        style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}
                      >
                        {f}
                      </span>
                    </div>
                  ))}
                </div>

                {/* CTA */}
                <button
                  className="btn-gold-outline text-[0.68rem] px-6 py-3 w-full justify-center group-hover:border-[#c9a84c]"
                  style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}
                >
                  View Floor Plan
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Price note */}
        <ScrollReveal direction="up" delay={0.2} duration={0.7}>
          <p
            className="text-center text-[#5a5550] text-xs mt-8"
            style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}
          >
            *Prices are indicative at ~₹7,000/sq.ft. and subject to change. Contact our sales team for current pricing.
          </p>
        </ScrollReveal>
      </div>

      {/* Floor Plan Modal */}
      <AnimatePresence>
        {activeConfig && (
          <motion.div
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-sm p-4 md:p-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActiveConfig(null)}
          >
            <motion.div
              className="relative w-full max-w-3xl bg-[#111318] border border-[rgba(201,168,76,0.2)] p-8 md:p-10"
              initial={{ scale: 0.92, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.92, opacity: 0 }}
              transition={{ duration: 0.4, ease: EASE }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setActiveConfig(null)}
                className="absolute top-5 right-5 w-8 h-8 flex items-center justify-center text-[#5a5550] hover:text-[#c9a84c] transition-colors"
              >
                ✕
              </button>

              <p className="section-eyebrow mb-4">Floor Plan</p>
              <h3
                className="text-3xl font-light text-[#f5f0e8] mb-2"
                style={{ fontFamily: "var(--font-cormorant), serif" }}
              >
                {activeConfig.type} · {activeConfig.area}
              </h3>
              <p
                className="text-[#c9a84c] text-sm mb-6"
                style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}
              >
                {activeConfig.price}
              </p>

              {/* Floor plan placeholder */}
              <div className="relative h-64 md:h-80 bg-[#0d0e12] flex items-center justify-center border border-[rgba(201,168,76,0.1)] mb-6">
                <div className="text-center">
                  <p
                    className="text-[#c9a84c] text-[0.65rem] tracking-[0.2em] uppercase mb-3"
                    style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}
                  >
                    Floor Plan
                  </p>
                  <p
                    className="text-[#5a5550] text-sm"
                    style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}
                  >
                    Request detailed floor plan from our sales team
                  </p>
                </div>
                {/* Decorative corners */}
                <div className="absolute top-3 left-3 w-6 h-6 border-t border-l border-[#c9a84c] opacity-50" />
                <div className="absolute top-3 right-3 w-6 h-6 border-t border-r border-[#c9a84c] opacity-50" />
                <div className="absolute bottom-3 left-3 w-6 h-6 border-b border-l border-[#c9a84c] opacity-50" />
                <div className="absolute bottom-3 right-3 w-6 h-6 border-b border-r border-[#c9a84c] opacity-50" />
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-6">
                {activeConfig.features.map((f) => (
                  <div key={f} className="flex items-center gap-2">
                    <div className="w-1 h-1 rounded-full bg-[#c9a84c] shrink-0" />
                    <span
                      className="text-[#a89d90] text-xs"
                      style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}
                    >
                      {f}
                    </span>
                  </div>
                ))}
              </div>

              <a
                href="#inquiry"
                onClick={() => setActiveConfig(null)}
                className="btn-gold w-full justify-center text-[0.7rem]"
                style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}
              >
                <span className="relative z-10">Request Detailed Brochure</span>
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
