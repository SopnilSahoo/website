"use client";

import { motion } from "framer-motion";
import ScrollReveal from "@/components/ui/ScrollReveal";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const SPECS = [
  { label: "Project Name", value: "Sreenivasa Sonthalia Ecorise" },
  { label: "Developer", value: "Sreenivasa Constructions" },
  { label: "Location", value: "Gaganpahad, Rajendranagar, Hyderabad" },
  { label: "Total Land Area", value: "6.36 Acres" },
  { label: "Configuration", value: "3 BHK & 4 BHK Apartments" },
  { label: "3 BHK Area", value: "2,790 sq.ft." },
  { label: "4 BHK Area", value: "4,675 – 4,695 sq.ft." },
  { label: "Price Range", value: "₹1.95 Cr – ₹3.30 Cr*" },
  { label: "Project Status", value: "New Launch" },
  { label: "RERA Number", value: "P02400010642" },
  { label: "Approval", value: "GHMC, HMDA Approved" },
  { label: "Flooring", value: "Vitrified Tiles (All Rooms)" },
];

const FINISHES = [
  {
    category: "Structure",
    items: [
      "RCC framed structure with earthquake-resistant design",
      "AAC blocks for superior thermal insulation",
      "Branded waterproofing in all wet areas",
    ],
  },
  {
    category: "Doors & Windows",
    items: [
      "Main door: Teak wood frame with designer panel",
      "Internal doors: Engineered wood with SS fittings",
      "Windows: UPVC sliding with mosquito mesh",
    ],
  },
  {
    category: "Kitchen",
    items: [
      "Granite countertop with stainless steel sink",
      "Provision for exhaust fan, chimney & dishwasher",
      "2-level modular cabinets with soft-close hinges",
    ],
  },
  {
    category: "Bathrooms",
    items: [
      "Imported ceramic tiles from floor to ceiling",
      "Branded CP fittings (Grohe / Jaquar)",
      "Concealed plumbing with hot & cold provisions",
    ],
  },
];

export default function Specifications() {
  return (
    <section id="specifications" className="relative bg-[#06070a] overflow-hidden">
      {/* Gold line accent */}
      <div className="absolute top-0 left-0 right-0 h-px gold-line" />

      <div className="container-luxury section-padding">
        {/* Header */}
        <ScrollReveal direction="up" duration={0.8}>
          <div className="max-w-2xl mb-16">
            <p className="section-eyebrow mb-4">Technical Details</p>
            <h2
              className="text-4xl md:text-5xl font-light leading-tight text-[#f5f0e8] mb-6"
              style={{ fontFamily: "var(--font-cormorant), serif" }}
            >
              Built to the
              <br />
              <span className="text-gold-gradient">Highest Standard</span>
            </h2>
            <p
              className="text-[#5a5550] text-sm leading-relaxed"
              style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}
            >
              Every material, every fitting, every detail chosen with
              an uncompromising standard of quality.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Project specs table */}
          <ScrollReveal direction="left" duration={0.9}>
            <h3
              className="text-[#c9a84c] text-[0.65rem] tracking-[0.2em] uppercase mb-6"
              style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}
            >
              Project Overview
            </h3>
            <div className="border border-[rgba(201,168,76,0.12)]">
              {SPECS.map(({ label, value }, i) => (
                <motion.div
                  key={label}
                  className="flex items-start gap-4 px-5 py-4 border-b last:border-b-0 border-[rgba(201,168,76,0.08)]"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.4, delay: i * 0.04, ease: EASE }}
                  style={{
                    background: i % 2 === 0 ? "rgba(201,168,76,0.015)" : "transparent",
                  }}
                >
                  <span
                    className="text-[#5a5550] text-xs min-w-[130px] shrink-0 pt-0.5"
                    style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}
                  >
                    {label}
                  </span>
                  <span
                    className="text-[#f5f0e8] text-sm font-light"
                    style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}
                  >
                    {value}
                  </span>
                </motion.div>
              ))}
            </div>
          </ScrollReveal>

          {/* Premium finishes */}
          <ScrollReveal direction="right" duration={0.9} delay={0.1}>
            <h3
              className="text-[#c9a84c] text-[0.65rem] tracking-[0.2em] uppercase mb-6"
              style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}
            >
              Premium Specifications
            </h3>
            <div className="space-y-6">
              {FINISHES.map((section, i) => (
                <motion.div
                  key={section.category}
                  className="luxury-card p-6"
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.4, delay: i * 0.08, ease: EASE }}
                >
                  <h4
                    className="text-[#f5f0e8] text-base mb-4 font-light"
                    style={{ fontFamily: "var(--font-cormorant), serif" }}
                  >
                    {section.category}
                  </h4>
                  <ul className="space-y-2">
                    {section.items.map((item) => (
                      <li
                        key={item}
                        className="flex items-start gap-3 text-[#5a5550] text-xs leading-relaxed"
                        style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}
                      >
                        <div className="w-1 h-1 rounded-full bg-[#c9a84c] shrink-0 mt-1.5" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </ScrollReveal>
        </div>

        {/* RERA highlight */}
        <ScrollReveal direction="up" delay={0.2} duration={0.7}>
          <div className="mt-12 p-6 md:p-8 border border-[rgba(201,168,76,0.2)] bg-[rgba(201,168,76,0.02)] flex flex-col sm:flex-row items-start sm:items-center gap-6">
            <div className="flex items-center justify-center w-12 h-12 border border-[rgba(201,168,76,0.3)] shrink-0">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6 text-[#c9a84c]">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              </svg>
            </div>
            <div>
              <p
                className="text-[#c9a84c] text-[0.62rem] tracking-[0.2em] uppercase mb-1"
                style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}
              >
                RERA Certified
              </p>
              <p
                className="text-[#f5f0e8] text-lg font-light mb-1"
                style={{ fontFamily: "var(--font-cormorant), serif" }}
              >
                Registration Number: P02400010642
              </p>
              <p
                className="text-[#5a5550] text-xs"
                style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}
              >
                This project is registered under the Real Estate (Regulation & Development) Act,
                ensuring complete legal transparency and buyer protection.
              </p>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
