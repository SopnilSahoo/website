"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function PageLoader() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(false), 2800);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[9999] bg-[#06070a] flex flex-col items-center justify-center"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Logo mark */}
          <motion.div
            className="flex flex-col items-center gap-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            {/* Ornamental ring */}
            <div className="relative w-20 h-20 flex items-center justify-center">
              <motion.div
                className="absolute inset-0 rounded-full border border-[rgba(201,168,76,0.3)]"
                animate={{ rotate: 360 }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
              />
              <motion.div
                className="absolute inset-2 rounded-full border border-[rgba(201,168,76,0.15)]"
                animate={{ rotate: -360 }}
                transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
              />
              <div className="w-2 h-2 rounded-full bg-[#c9a84c]" />
            </div>

            {/* Project name */}
            <div className="text-center">
              <p className="section-eyebrow mb-2" style={{ justifyContent: "center" }}>
                Sreenivasa Constructions
              </p>
              <h1
                className="text-3xl font-light text-[#f5f0e8] tracking-wide"
                style={{ fontFamily: "var(--font-cormorant), serif" }}
              >
                Sonthalia Ecorise
              </h1>
            </div>

            {/* Progress bar */}
            <div className="w-48 h-px bg-[rgba(201,168,76,0.15)] overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-[#9a7a32] via-[#c9a84c] to-[#e2c97e]"
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: 2.2, ease: [0.22, 1, 0.36, 1] }}
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
