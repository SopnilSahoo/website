"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Phone, Mail } from "lucide-react";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

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

      <div
        ref={ref}
        className="relative mx-auto max-w-4xl px-4 py-24 text-center sm:px-6 sm:py-32 lg:px-8"
      >
        {/* Headline */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.65, ease: EASE }}
          className="text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl xl:text-6xl"
        >
          Ready to Grow Your{" "}
          <span className="text-[#CC1414]">Business?</span>
        </motion.h2>

        {/* Subtext */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.1, duration: 0.65, ease: EASE }}
          className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-white/55 sm:text-lg"
        >
          Book a free 30-minute strategy call. No fluff, no hard sell — just a clear roadmap for
          your brand&apos;s growth.
        </motion.p>

        {/* Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2, duration: 0.65, ease: EASE }}
          className="mt-10 flex flex-wrap items-center justify-center gap-3 sm:gap-4"
        >
          {/* Primary */}
          <a
            href="tel:9777606321"
            className="inline-flex items-center gap-2 rounded-xl bg-[#CC1414] px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-[#CC1414]/20 transition-all duration-200 hover:bg-[#e01616] hover:shadow-[#CC1414]/30 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#CC1414]"
          >
            Book Strategy Call
          </a>

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
          transition={{ delay: 0.32, duration: 0.6, ease: EASE }}
          className="mt-10 flex flex-wrap items-center justify-center gap-x-6 gap-y-3"
        >
          <a
            href="tel:9777606321"
            className="flex items-center gap-2 text-sm text-white/40 transition-colors hover:text-white/70"
          >
            <Phone className="h-4 w-4 shrink-0 text-[#CC1414]/70" aria-hidden="true" />
            9777606321
          </a>

          <span aria-hidden="true" className="h-3 w-px bg-white/20" />

          <a
            href="mailto:hello@reachdigitally.agency"
            className="flex items-center gap-2 text-sm text-white/40 transition-colors hover:text-white/70"
          >
            <Mail className="h-4 w-4 shrink-0 text-[#CC1414]/70" aria-hidden="true" />
            hello@reachdigitally.agency
          </a>
        </motion.div>
      </div>
    </section>
  );
}
