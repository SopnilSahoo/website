"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import ScrollReveal from "@/components/ui/ScrollReveal";
import AnimatedCounter from "@/components/ui/AnimatedCounter";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const MILESTONES = [
  { year: "1998", title: "Founded", desc: "Sreenivasa Constructions established by K.V. Rao in Hyderabad." },
  { year: "2005", title: "First Landmark", desc: "Delivered SSC Insignia Towers in Gachibowli — a benchmark in luxury." },
  { year: "2012", title: "Expansion", desc: "Expanded into Banjara Hills and Madhapur with Fortune Enclave series." },
  { year: "2020", title: "15 Lakh sq.ft.", desc: "Crossed 15 lakh sq.ft. of premium residential space delivered." },
  { year: "2024", title: "Sonthalia Ecorise", desc: "New Launch — Gaganpahad's most prestigious address unveiled." },
];

const CREDENTIALS = [
  "25+ Years of Real Estate Excellence",
  "50+ Successfully Delivered Projects",
  "1000+ Families Who Trust Sreenivasa",
  "RERA Registered Developer",
  "100% Vastu-Compliant Homes",
  "15+ Lakh sq.ft. Built & Delivered",
];

export default function Developer() {
  return (
    <section id="developer" className="relative bg-[#06070a] overflow-hidden">
      {/* Ambient */}
      <div
        className="absolute bottom-0 right-0 w-[700px] h-[700px] pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(201,168,76,0.03) 0%, transparent 60%)" }}
      />

      <div className="container-luxury section-padding">
        {/* Header */}
        <ScrollReveal direction="up" duration={0.8}>
          <div className="text-center max-w-2xl mx-auto mb-16">
            <p className="section-eyebrow mb-4 justify-center">The Developer</p>
            <h2
              className="text-4xl md:text-5xl font-light leading-tight text-[#f5f0e8] mb-6"
              style={{ fontFamily: "var(--font-cormorant), serif" }}
            >
              A Legacy of
              <br />
              <span className="text-gold-gradient">Trusted Excellence</span>
            </h2>
            <p
              className="text-[#5a5550] text-sm leading-relaxed"
              style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}
            >
              For over 25 years, Sreenivasa Constructions has been defining
              premium residential living across Hyderabad.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-20 items-center mb-16">
          {/* Developer image */}
          <ScrollReveal direction="left" duration={0.9}>
            <div className="relative h-[400px] md:h-[500px] overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1486325212027-8081e485255e?w=800&q=80"
                alt="Sreenivasa Constructions — Building Excellence"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[rgba(6,7,10,0.5)] to-transparent" />
              {/* Decorative border */}
              <div className="absolute top-5 left-5 w-12 h-12 border-t-2 border-l-2 border-[#c9a84c] opacity-60" />
              <div className="absolute bottom-5 right-5 w-12 h-12 border-b-2 border-r-2 border-[#c9a84c] opacity-60" />
              {/* Stats overlay */}
              <div className="absolute bottom-6 left-6 right-6 flex gap-4">
                {[
                  { end: 25, suffix: "+", label: "Years" },
                  { end: 50, suffix: "+", label: "Projects" },
                  { end: 1000, suffix: "+", label: "Families" },
                ].map(({ end, suffix, label }) => (
                  <div
                    key={label}
                    className="flex-1 text-center py-3 border border-[rgba(201,168,76,0.3)]"
                    style={{ background: "rgba(6,7,10,0.8)", backdropFilter: "blur(8px)" }}
                  >
                    <p
                      className="text-[#c9a84c] text-xl font-light"
                      style={{ fontFamily: "var(--font-cormorant), serif" }}
                    >
                      <AnimatedCounter end={end} suffix={suffix} />
                    </p>
                    <p
                      className="text-[#5a5550] text-[0.6rem] tracking-[0.15em] uppercase mt-0.5"
                      style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}
                    >
                      {label}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>

          {/* Developer info */}
          <ScrollReveal direction="right" duration={0.9} delay={0.1}>
            <p className="section-eyebrow mb-6">About Sreenivasa Constructions</p>
            <h3
              className="text-[#f5f0e8] text-3xl md:text-4xl font-light mb-6 leading-tight"
              style={{ fontFamily: "var(--font-cormorant), serif" }}
            >
              Building Homes,
              <br />Creating Legacies
            </h3>
            <p
              className="text-[#a89d90] text-sm leading-[1.9] mb-5"
              style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}
            >
              Founded in 1998 by K.V. Rao — a first-generation entrepreneur with a
              civil engineering background — Sreenivasa Constructions was built on
              a foundation of technical excellence and unwavering ethics.
            </p>
            <p
              className="text-[#a89d90] text-sm leading-[1.9] mb-8"
              style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}
            >
              Today, with over 50 completed projects, 15+ lakh sq.ft. of prime
              real estate delivered, and 1,000+ families who chose to call
              Sreenivasa homes their own — the legacy speaks for itself.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {CREDENTIALS.map((cred, i) => (
                <motion.div
                  key={cred}
                  className="flex items-center gap-3"
                  initial={{ opacity: 0, x: 16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.35, delay: i * 0.06, ease: EASE }}
                >
                  <div className="w-1.5 h-1.5 rounded-full bg-[#c9a84c] shrink-0" />
                  <span
                    className="text-[#a89d90] text-xs"
                    style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}
                  >
                    {cred}
                  </span>
                </motion.div>
              ))}
            </div>
          </ScrollReveal>
        </div>

        {/* Timeline */}
        <ScrollReveal direction="up" duration={0.8} delay={0.1}>
          <h3
            className="text-[#c9a84c] text-[0.65rem] tracking-[0.2em] uppercase mb-8 text-center"
            style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}
          >
            Our Journey
          </h3>
          <div className="relative">
            {/* Horizontal line */}
            <div className="hidden md:block absolute top-5 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[rgba(201,168,76,0.3)] to-transparent" />

            <div className="grid grid-cols-1 md:grid-cols-5 gap-6 md:gap-4">
              {MILESTONES.map((m, i) => (
                <motion.div
                  key={m.year}
                  className="flex flex-col items-center md:items-start text-center md:text-left"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.4, delay: i * 0.08, ease: EASE }}
                >
                  {/* Dot on timeline */}
                  <div className="w-2.5 h-2.5 rounded-full bg-[#c9a84c] border-2 border-[#06070a] mb-4 z-10 hidden md:block" />
                  <div className="md:hidden w-2.5 h-2.5 rounded-full bg-[#c9a84c] mb-3" />

                  <p
                    className="text-[#c9a84c] text-[0.65rem] tracking-[0.2em] uppercase mb-2"
                    style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}
                  >
                    {m.year}
                  </p>
                  <p
                    className="text-[#f5f0e8] text-base mb-2 font-light"
                    style={{ fontFamily: "var(--font-cormorant), serif" }}
                  >
                    {m.title}
                  </p>
                  <p
                    className="text-[#5a5550] text-xs leading-relaxed"
                    style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}
                  >
                    {m.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
