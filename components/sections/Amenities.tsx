"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import ScrollReveal from "@/components/ui/ScrollReveal";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const AMENITIES = [
  {
    id: "clubhouse",
    icon: "🏛",
    title: "Grand Clubhouse",
    desc: "A sprawling social hub with lounge, event halls, and entertainment spaces — the beating heart of the community.",
    image: "https://images.unsplash.com/photo-1562778612-e1e0cda9915c?w=800&q=80",
  },
  {
    id: "pool",
    icon: "🏊",
    title: "Infinity Pool",
    desc: "Resort-style infinity pool overlooking landscaped gardens — where every dip feels like a getaway.",
    image: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&q=80",
  },
  {
    id: "gym",
    icon: "💪",
    title: "Fitness Center",
    desc: "State-of-the-art gymnasium with world-class equipment, yoga studio, and dedicated wellness spaces.",
    image: "https://images.unsplash.com/photo-1540497077202-7c8a3999166f?w=800&q=80",
  },
  {
    id: "garden",
    icon: "🌿",
    title: "Landscaped Gardens",
    desc: "Curated green spaces designed by landscape architects — perfect for morning walks and evening strolls.",
    image: "https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?w=800&q=80",
  },
  {
    id: "kids",
    icon: "🎠",
    title: "Kids' Play Area",
    desc: "Safe, vibrant play zones designed for children of all ages with premium equipment.",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80",
  },
  {
    id: "indoor",
    icon: "🎱",
    title: "Indoor Games",
    desc: "Billiards, table tennis, carrom and more — a full recreation hub for residents.",
    image: "https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=800&q=80",
  },
  {
    id: "security",
    icon: "🔒",
    title: "24×7 Security",
    desc: "Round-the-clock security with CCTV surveillance, trained guards, and smart access systems.",
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80",
  },
  {
    id: "power",
    icon: "⚡",
    title: "Power Backup",
    desc: "100% power backup for all common areas and residences — uninterrupted living at all times.",
    image: "https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?w=800&q=80",
  },
  {
    id: "water",
    icon: "💧",
    title: "24×7 Water Supply",
    desc: "Dedicated water storage and distribution ensuring consistent supply throughout the community.",
    image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&q=80",
  },
  {
    id: "parking",
    icon: "🚗",
    title: "Ample Parking",
    desc: "Designated covered parking for every residence with ample visitor parking spaces.",
    image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80",
  },
];

export default function Amenities() {
  const [hovered, setHovered] = useState<string | null>(null);
  const [activeImage, setActiveImage] = useState(AMENITIES[0].image);

  return (
    <section id="amenities" className="relative bg-[#06070a] overflow-hidden">
      {/* Gold ambient left */}
      <div
        className="absolute left-0 top-1/2 -translate-y-1/2 w-[500px] h-[500px] pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(201,168,76,0.04) 0%, transparent 70%)" }}
      />

      <div className="container-luxury section-padding">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-16">
          <ScrollReveal direction="up" duration={0.8}>
            <p className="section-eyebrow mb-4">Life at Ecorise</p>
            <h2
              className="text-4xl md:text-5xl font-light leading-tight text-[#f5f0e8]"
              style={{ fontFamily: "var(--font-cormorant), serif" }}
            >
              An Ecosystem of
              <br />
              <span className="text-gold-gradient">Elevated Living</span>
            </h2>
          </ScrollReveal>
          <ScrollReveal direction="up" delay={0.1} duration={0.8}>
            <p
              className="text-[#5a5550] text-sm max-w-xs leading-relaxed"
              style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}
            >
              Every amenity has been thoughtfully curated to enhance your daily
              experience and enrich community life.
            </p>
          </ScrollReveal>
        </div>

        {/* Main layout — cards + preview image */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-start">
          {/* Amenity grid */}
          <div className="lg:col-span-3 grid grid-cols-1 sm:grid-cols-2 gap-3">
            {AMENITIES.map((a, i) => (
              <motion.div
                key={a.id}
                className="luxury-card p-5 cursor-pointer group flex items-start gap-4"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.45, delay: i * 0.05, ease: EASE }}
                onMouseEnter={() => { setHovered(a.id); setActiveImage(a.image); }}
                onMouseLeave={() => setHovered(null)}
                style={{
                  borderColor: hovered === a.id ? "rgba(201,168,76,0.4)" : undefined,
                  background: hovered === a.id ? "rgba(201,168,76,0.04)" : undefined,
                }}
              >
                <span className="text-2xl shrink-0 mt-0.5">{a.icon}</span>
                <div>
                  <h3
                    className="text-[#f5f0e8] text-base mb-1 font-light group-hover:text-[#c9a84c] transition-colors duration-300"
                    style={{ fontFamily: "var(--font-cormorant), serif" }}
                  >
                    {a.title}
                  </h3>
                  <p
                    className="text-[#5a5550] text-xs leading-relaxed line-clamp-2"
                    style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}
                  >
                    {a.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Preview image */}
          <ScrollReveal direction="right" duration={0.9} className="lg:col-span-2 hidden lg:block">
            <div className="relative h-[600px] overflow-hidden sticky top-24">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeImage}
                  className="absolute inset-0"
                  initial={{ opacity: 0, scale: 1.05 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.5, ease: EASE }}
                >
                  <Image
                    src={activeImage}
                    alt="Amenity preview"
                    fill
                    className="object-cover"
                    sizes="(max-width: 1280px) 400px, 500px"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[rgba(6,7,10,0.6)] to-transparent" />
                </motion.div>
              </AnimatePresence>
              {/* Decorative corner */}
              <div className="absolute top-4 left-4 w-8 h-8 border-t border-l border-[#c9a84c] opacity-60" />
              <div className="absolute bottom-4 right-4 w-8 h-8 border-b border-r border-[#c9a84c] opacity-60" />
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
