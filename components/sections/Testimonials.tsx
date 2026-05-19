"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

interface Testimonial {
  name: string;
  role: string;
  quote: string;
  stars: number;
  initials: string;
}

const TESTIMONIALS: Testimonial[] = [
  {
    name: "Arjun Mehta",
    role: "Founder, TechVentures",
    quote:
      "Reach Digitally transformed our online presence completely. Our leads increased by 340% in just 3 months!",
    stars: 5,
    initials: "AM",
  },
  {
    name: "Priya Sharma",
    role: "CEO, StyleBoutique",
    quote:
      "The team's expertise in social media marketing is unmatched. We went from 2K to 50K Instagram followers organically.",
    stars: 5,
    initials: "PS",
  },
  {
    name: "Rajesh Kumar",
    role: "Director, BuildRight Infra",
    quote:
      "Their SEO strategy put us on page 1 for all our target keywords. Best ROI we've ever seen from any agency.",
    stars: 5,
    initials: "RK",
  },
];

function StarRating({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5" aria-label={`${count} out of 5 stars`}>
      {Array.from({ length: count }).map((_, i) => (
        <svg
          key={i}
          className="h-4 w-4 fill-amber-400 text-amber-400"
          viewBox="0 0 20 20"
          aria-hidden="true"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

function TestimonialCard({
  testimonial,
  index,
  inView,
}: {
  testimonial: Testimonial;
  index: number;
  inView: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.14, duration: 0.65, ease: EASE }}
      className="group relative flex flex-col rounded-2xl border border-white/[0.06] bg-[#111] p-7 transition-colors duration-300 hover:border-white/[0.12]"
    >
      {/* Red quote mark */}
      <span
        aria-hidden="true"
        className="absolute left-6 top-5 select-none font-serif text-6xl leading-none text-[#CC1414]/60"
      >
        &ldquo;
      </span>

      {/* Stars */}
      <div className="mb-5 mt-6">
        <StarRating count={testimonial.stars} />
      </div>

      {/* Quote */}
      <p className="flex-1 text-sm leading-relaxed text-white/70">{testimonial.quote}</p>

      {/* Author */}
      <div className="mt-7 flex items-center gap-3">
        {/* Avatar */}
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#CC1414] text-xs font-bold uppercase tracking-wide text-white">
          {testimonial.initials}
        </div>
        <div>
          <p className="text-sm font-semibold text-white">{testimonial.name}</p>
          <p className="text-xs text-white/40">{testimonial.role}</p>
        </div>
      </div>
    </motion.div>
  );
}

export default function Testimonials() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="relative overflow-hidden bg-[#0a0a0a] py-24 sm:py-32">
      {/* Subtle top divider */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent"
      />

      <div ref={ref} className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Section label */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, ease: EASE }}
          className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-[#CC1414]"
        >
          Client Love
        </motion.p>

        {/* Headline */}
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.06, duration: 0.6, ease: EASE }}
          className="mb-14 text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl"
        >
          What Our Clients Say
        </motion.h2>

        {/* Cards */}
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {TESTIMONIALS.map((t, i) => (
            <TestimonialCard key={t.name} testimonial={t} index={i} inView={inView} />
          ))}
        </div>
      </div>
    </section>
  );
}
