"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Phone, X, ArrowRight, Clock } from "lucide-react";

export default function StickyCallButton() {
  const [visible, setVisible] = useState(false);
  const [expanded, setExpanded] = useState(false);

  // Show after scrolling 300px
  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 300);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Auto-expand once after 3s delay (only on first show)
  useEffect(() => {
    if (!visible) return;
    const id = setTimeout(() => {
      setExpanded(true);
      // Auto-collapse after 5s
      const id2 = setTimeout(() => setExpanded(false), 5000);
      return () => clearTimeout(id2);
    }, 3000);
    return () => clearTimeout(id);
  }, [visible]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 40, scale: 0.8 }}
          transition={{ type: "spring", stiffness: 400, damping: 28 }}
          className="fixed bottom-6 right-5 z-50 flex flex-col items-end gap-2"
        >
          {/* Expanded popup card */}
          <AnimatePresence>
            {expanded && (
              <motion.div
                initial={{ opacity: 0, y: 12, scale: 0.92 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 12, scale: 0.92 }}
                transition={{ type: "spring", stiffness: 380, damping: 26 }}
                className="relative w-64 rounded-2xl border border-white/[0.1] bg-[#111] p-5 shadow-[0_8px_40px_rgba(0,0,0,0.6)]"
              >
                {/* Close */}
                <button
                  onClick={() => setExpanded(false)}
                  aria-label="Close"
                  className="absolute right-3 top-3 flex h-6 w-6 items-center justify-center rounded-full text-white/30 transition-colors hover:bg-white/10 hover:text-white"
                >
                  <X size={13} />
                </button>

                {/* Top glow line */}
                <div className="absolute inset-x-0 top-0 h-px rounded-t-2xl bg-gradient-to-r from-transparent via-[#CC1414]/60 to-transparent" />

                {/* Pulsing dot + label */}
                <div className="mb-3 flex items-center gap-2">
                  <span className="relative flex h-2 w-2 shrink-0">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#CC1414] opacity-75" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-[#CC1414]" />
                  </span>
                  <span className="text-xs font-semibold uppercase tracking-widest text-[#CC1414]">
                    Free Strategy Call
                  </span>
                </div>

                <p className="mb-1 text-sm font-bold text-white leading-snug">
                  Ready to grow your brand?
                </p>
                <p className="mb-4 text-xs text-white/45 leading-relaxed">
                  30-min call, no commitment. We&apos;ll map out your growth
                  strategy — free.
                </p>

                <div className="mb-3 flex items-center gap-1.5 text-xs text-white/35">
                  <Clock size={11} />
                  <span>Mon–Sat · 9 AM – 7 PM IST</span>
                </div>

                <Link
                  href="/contact"
                  onClick={() => setExpanded(false)}
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#CC1414] px-4 py-2.5 text-sm font-semibold text-white transition-all hover:bg-[#e01818] active:scale-95"
                >
                  Book a Call
                  <ArrowRight size={14} />
                </Link>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Floating action button */}
          <motion.button
            onClick={() => setExpanded((p) => !p)}
            aria-label="Book a strategy call"
            whileHover={{ scale: 1.06 }}
            whileTap={{ scale: 0.93 }}
            className="relative flex items-center gap-2.5 rounded-full bg-[#CC1414] px-5 py-3 text-sm font-semibold text-white shadow-[0_4px_24px_rgba(204,20,20,0.45)] transition-shadow hover:shadow-[0_4px_32px_rgba(204,20,20,0.65)]"
          >
            {/* Pulse ring behind button */}
            <span
              aria-hidden="true"
              className="animate-pulse-ring pointer-events-none absolute inset-0 rounded-full bg-[#CC1414]/40"
            />
            <Phone size={15} strokeWidth={2.5} />
            <span>Book a Call</span>
          </motion.button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
