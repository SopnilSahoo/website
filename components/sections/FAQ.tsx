"use client";

import { useRef, useState } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { ChevronDown } from "lucide-react";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

interface FAQItem {
  question: string;
  answer: string;
}

const FAQ_ITEMS: FAQItem[] = [
  {
    question: "What makes Reach Digitally different from other agencies?",
    answer:
      "We combine AI-powered tools with human creativity to deliver campaigns that aren't just creative — they're strategic and data-backed. Every decision is measurable.",
  },
  {
    question: "How long before I see results?",
    answer:
      "Most clients see tangible improvements within 60–90 days. SEO takes 3–6 months for significant ranking changes, while paid ads can show results within the first week.",
  },
  {
    question: "Do you work with small businesses?",
    answer:
      "Absolutely. We've worked with startups, SMEs, and established brands across various sectors. Our strategies scale to your budget and goals.",
  },
  {
    question: "What's included in the free strategy call?",
    answer:
      "A 30-minute deep-dive into your business, current marketing, competitors, and a clear action plan — completely free, no strings attached.",
  },
  {
    question: "Do you offer packages or custom pricing?",
    answer:
      "Both. We have flexible packages for common needs and custom proposals for complex requirements. Every brand is different.",
  },
  {
    question: "Are you accredited or recognized?",
    answer:
      "Yes — we're a BNI member, recognized by Startup Odisha, and MSME registered, giving you the assurance of working with a credible, established agency.",
  },
];

function AccordionItem({
  item,
  index,
  inView,
}: {
  item: FAQItem;
  index: number;
  inView: boolean;
}) {
  const [open, setOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.08, duration: 0.55, ease: EASE }}
      className="group border-b border-white/[0.07] last:border-b-0"
    >
      <button
        onClick={() => setOpen((prev) => !prev)}
        aria-expanded={open}
        className="flex w-full items-center justify-between gap-4 py-6 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#CC1414]/50 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0a0a]"
      >
        <span className="text-sm font-semibold leading-snug text-white/85 transition-colors group-hover:text-white sm:text-base">
          {item.question}
        </span>

        {/* Chevron */}
        <motion.span
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.3, ease: EASE }}
          className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-white/[0.1] text-white/40"
          aria-hidden="true"
        >
          <ChevronDown className="h-3.5 w-3.5" />
        </motion.span>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: EASE }}
            className="overflow-hidden"
          >
            <p className="pb-6 pr-10 text-sm leading-relaxed text-white/50">{item.answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function FAQ() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="relative overflow-hidden bg-[#0a0a0a] py-24 sm:py-32">
      {/* Subtle top divider */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent"
      />

      <div ref={ref} className="relative mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        {/* Section label */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, ease: EASE }}
          className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-[#CC1414]"
        >
          FAQ
        </motion.p>

        {/* Headline */}
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.06, duration: 0.6, ease: EASE }}
          className="mb-12 text-3xl font-bold tracking-tight text-white sm:text-4xl"
        >
          Frequently Asked Questions
        </motion.h2>

        {/* Accordion */}
        <div className="rounded-2xl border border-white/[0.07] bg-white/[0.02] px-6 sm:px-8">
          {FAQ_ITEMS.map((item, i) => (
            <AccordionItem key={item.question} item={item} index={i} inView={inView} />
          ))}
        </div>
      </div>
    </section>
  );
}
