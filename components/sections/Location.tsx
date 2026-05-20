"use client";

import { motion } from "framer-motion";
import ScrollReveal from "@/components/ui/ScrollReveal";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const LANDMARKS = [
  {
    category: "IT & Business",
    color: "#c9a84c",
    items: [
      { name: "Financial District", distance: "15 mins" },
      { name: "HITEC City", distance: "20 mins" },
      { name: "Gachibowli IT Hub", distance: "18 mins" },
      { name: "Nanakramguda", distance: "12 mins" },
    ],
  },
  {
    category: "Connectivity",
    color: "#e2c97e",
    items: [
      { name: "Outer Ring Road (ORR)", distance: "5 mins" },
      { name: "Hyderabad Airport", distance: "25 mins" },
      { name: "Rajendranagar Metro", distance: "8 mins" },
      { name: "NH 44 Access", distance: "3 mins" },
    ],
  },
  {
    category: "Education",
    color: "#9a7a32",
    items: [
      { name: "Oakridge International School", distance: "4 mins" },
      { name: "ISB (Indian School of Business)", distance: "18 mins" },
      { name: "BITS Pilani Hyderabad", distance: "22 mins" },
      { name: "DPS Nacharam", distance: "10 mins" },
    ],
  },
  {
    category: "Healthcare",
    color: "#c9a84c",
    items: [
      { name: "Continental Hospital", distance: "8 mins" },
      { name: "Yashoda Hospitals", distance: "10 mins" },
      { name: "Apollo Health City", distance: "14 mins" },
      { name: "KIMS Hospitals", distance: "15 mins" },
    ],
  },
];

const ADVANTAGES = [
  {
    icon: "🏙",
    title: "Premium Neighborhood",
    desc: "Rajendranagar is Hyderabad's fastest-growing residential corridor, attracting premium developments.",
  },
  {
    icon: "🛣",
    title: "ORR Access",
    desc: "Direct connectivity via the Outer Ring Road to every major destination in Hyderabad.",
  },
  {
    icon: "✈",
    title: "Airport Corridor",
    desc: "Strategic location on the Rajendranagar–Airport corridor, a hotspot for capital appreciation.",
  },
  {
    icon: "📈",
    title: "High Appreciation",
    desc: "South Zone properties have witnessed consistent 10-15% annual appreciation in recent years.",
  },
];

export default function Location() {
  return (
    <section id="location" className="relative bg-[#0d0e12] overflow-hidden">
      <div className="container-luxury section-padding">
        {/* Header */}
        <ScrollReveal direction="up" duration={0.8}>
          <div className="max-w-2xl mb-16">
            <p className="section-eyebrow mb-4">Location Intelligence</p>
            <h2
              className="text-4xl md:text-5xl font-light leading-tight text-[#f5f0e8] mb-6"
              style={{ fontFamily: "var(--font-cormorant), serif" }}
            >
              At the Nexus of
              <br />
              <span className="text-gold-gradient">Everything That Matters</span>
            </h2>
            <p
              className="text-[#5a5550] text-sm leading-relaxed"
              style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}
            >
              Gaganpahad, Rajendranagar — perfectly positioned between the
              Financial District, HITEC City, and the Airport corridor.
              Connected, yet peaceful.
            </p>
          </div>
        </ScrollReveal>

        {/* Main grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Landmark groups */}
          <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {LANDMARKS.map((group, gi) => (
              <motion.div
                key={group.category}
                className="luxury-card p-6"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, delay: gi * 0.08, ease: EASE }}
              >
                <h3
                  className="text-[0.62rem] tracking-[0.2em] uppercase mb-5"
                  style={{
                    fontFamily: "var(--font-dm-sans), sans-serif",
                    color: group.color,
                  }}
                >
                  {group.category}
                </h3>
                <ul className="space-y-3">
                  {group.items.map(({ name, distance }, i) => (
                    <motion.li
                      key={name}
                      className="flex items-center justify-between"
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.3, delay: gi * 0.06 + i * 0.04, ease: EASE }}
                    >
                      <div className="flex items-center gap-2">
                        <div
                          className="w-1 h-1 rounded-full shrink-0"
                          style={{ background: group.color }}
                        />
                        <span
                          className="text-[#a89d90] text-xs"
                          style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}
                        >
                          {name}
                        </span>
                      </div>
                      <span
                        className="text-[#c9a84c] text-[0.7rem] font-medium shrink-0 ml-2"
                        style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}
                      >
                        {distance}
                      </span>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>

          {/* Advantages + Map placeholder */}
          <ScrollReveal direction="right" duration={0.9} delay={0.1} className="flex flex-col gap-5">
            {/* Map placeholder */}
            <div className="relative h-48 bg-[#111318] border border-[rgba(201,168,76,0.12)] flex items-center justify-center overflow-hidden">
              {/* Decorative map grid lines */}
              {Array.from({ length: 5 }).map((_, i) => (
                <div
                  key={i}
                  className="absolute border-[rgba(201,168,76,0.06)]"
                  style={{
                    left: `${i * 25}%`,
                    top: 0,
                    bottom: 0,
                    borderLeftWidth: "1px",
                  }}
                />
              ))}
              {Array.from({ length: 5 }).map((_, i) => (
                <div
                  key={i}
                  className="absolute border-[rgba(201,168,76,0.06)]"
                  style={{
                    top: `${i * 25}%`,
                    left: 0,
                    right: 0,
                    borderTopWidth: "1px",
                  }}
                />
              ))}
              {/* Center dot */}
              <div className="relative z-10 flex flex-col items-center gap-2">
                <div className="relative">
                  <div className="w-3 h-3 rounded-full bg-[#c9a84c]" />
                  <div className="absolute inset-0 rounded-full bg-[#c9a84c] animate-ping opacity-30" />
                </div>
                <p
                  className="text-[#c9a84c] text-[0.6rem] tracking-[0.15em] uppercase"
                  style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}
                >
                  Gaganpahad
                </p>
                <p
                  className="text-[#5a5550] text-[0.6rem]"
                  style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}
                >
                  Rajendranagar, Hyderabad
                </p>
              </div>
            </div>

            {/* Advantages */}
            {ADVANTAGES.map((adv, i) => (
              <motion.div
                key={adv.title}
                className="luxury-card p-5 flex items-start gap-4"
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.4, delay: i * 0.07, ease: EASE }}
              >
                <span className="text-xl shrink-0 mt-0.5">{adv.icon}</span>
                <div>
                  <h4
                    className="text-[#f5f0e8] text-sm mb-1 font-light"
                    style={{ fontFamily: "var(--font-cormorant), serif" }}
                  >
                    {adv.title}
                  </h4>
                  <p
                    className="text-[#5a5550] text-xs leading-relaxed"
                    style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}
                  >
                    {adv.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
