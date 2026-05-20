"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Phone } from "lucide-react";

const navLinks = [
  { label: "Overview", href: "#overview" },
  { label: "Residences", href: "#residences" },
  { label: "Amenities", href: "#amenities" },
  { label: "Gallery", href: "#gallery" },
  { label: "Location", href: "#location" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  const scrollTo = (href: string) => {
    setMobileOpen(false);
    if (href.startsWith("#")) {
      const el = document.querySelector(href);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 2.9, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "glass border-b border-[rgba(201,168,76,0.12)] shadow-[0_4px_40px_rgba(0,0,0,0.5)]"
            : "bg-transparent"
        }`}
      >
        <div className="container-luxury">
          <div className="flex items-center justify-between h-[70px] lg:h-[80px]">
            {/* Logo */}
            <button onClick={() => scrollTo("#")} className="flex flex-col leading-none gap-0.5">
              <span
                className="text-[#c9a84c] text-[10px] tracking-[0.25em] uppercase font-light"
                style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}
              >
                Sreenivasa Constructions
              </span>
              <span
                className="text-[#f5f0e8] text-xl font-light tracking-wider"
                style={{ fontFamily: "var(--font-cormorant), serif" }}
              >
                Sonthalia Ecorise
              </span>
            </button>

            {/* Desktop nav */}
            <nav className="hidden lg:flex items-center gap-8">
              {navLinks.map((link) => (
                <button
                  key={link.href}
                  onClick={() => scrollTo(link.href)}
                  className="text-[0.75rem] tracking-[0.12em] uppercase text-[#a89d90] hover:text-[#c9a84c] transition-colors duration-300 font-light"
                  style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}
                >
                  {link.label}
                </button>
              ))}
            </nav>

            {/* Desktop CTA */}
            <div className="hidden lg:flex items-center gap-4">
              <a
                href="tel:+919100000000"
                className="flex items-center gap-2 text-[0.72rem] tracking-[0.08em] uppercase text-[#c9a84c] hover:text-[#e2c97e] transition-colors duration-300"
                style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}
              >
                <Phone size={13} />
                +91 91000 00000
              </a>
              <button
                onClick={() => scrollTo("#inquiry")}
                className="btn-gold text-[0.7rem] px-5 py-2.5"
                style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}
              >
                <span className="relative z-10">Schedule Visit</span>
              </button>
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileOpen((p) => !p)}
              className="lg:hidden w-10 h-10 flex items-center justify-center text-[#a89d90] hover:text-[#c9a84c] transition-colors"
              aria-label="Toggle menu"
            >
              <AnimatePresence mode="wait" initial={false}>
                {mobileOpen ? (
                  <motion.span key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}>
                    <X size={20} />
                  </motion.span>
                ) : (
                  <motion.span key="m" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.2 }}>
                    <Menu size={20} />
                  </motion.span>
                )}
              </AnimatePresence>
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="fixed inset-0 z-40 bg-black/70 backdrop-blur-sm lg:hidden"
              onClick={() => setMobileOpen(false)}
            />
            <motion.div
              key="drawer"
              initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 32 }}
              className="fixed top-0 right-0 bottom-0 z-50 w-72 bg-[#0d0e12] border-l border-[rgba(201,168,76,0.12)] flex flex-col lg:hidden"
            >
              <div className="flex items-center justify-between px-6 h-[70px] border-b border-[rgba(201,168,76,0.1)]">
                <span
                  className="text-[#f5f0e8] text-lg font-light"
                  style={{ fontFamily: "var(--font-cormorant), serif" }}
                >
                  Sonthalia Ecorise
                </span>
                <button onClick={() => setMobileOpen(false)} className="text-[#a89d90] hover:text-[#c9a84c] transition-colors">
                  <X size={18} />
                </button>
              </div>

              <nav className="flex flex-col px-6 pt-8 gap-1 flex-1">
                {navLinks.map((link, i) => (
                  <motion.button
                    key={link.href}
                    onClick={() => scrollTo(link.href)}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.06 * i + 0.1 }}
                    className="text-left py-3 px-3 text-sm tracking-widest uppercase text-[#a89d90] hover:text-[#c9a84c] hover:bg-[rgba(201,168,76,0.05)] rounded transition-colors duration-200"
                    style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}
                  >
                    {link.label}
                  </motion.button>
                ))}
              </nav>

              <div className="px-6 pb-10 flex flex-col gap-3">
                <a
                  href="tel:+919100000000"
                  className="flex items-center justify-center gap-2 w-full py-3 border border-[rgba(201,168,76,0.3)] text-[#c9a84c] text-sm tracking-wide"
                >
                  <Phone size={14} /> +91 91000 00000
                </a>
                <button
                  onClick={() => scrollTo("#inquiry")}
                  className="btn-gold w-full justify-center text-xs"
                >
                  <span className="relative z-10">Schedule Visit</span>
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
