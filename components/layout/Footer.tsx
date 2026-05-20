"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Phone, Mail, MapPin } from "lucide-react";

const quickLinks = [
  { label: "Overview", href: "#overview" },
  { label: "Residences", href: "#residences" },
  { label: "Amenities", href: "#amenities" },
  { label: "Gallery", href: "#gallery" },
  { label: "Location", href: "#location" },
  { label: "Inquiry", href: "#inquiry" },
];

export default function Footer() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -60px 0px" });

  return (
    <footer ref={ref} className="bg-[#06070a] border-t border-[rgba(201,168,76,0.1)]">
      <div className="container-luxury py-16 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <motion.div
            className="lg:col-span-2"
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <p
              className="text-[#c9a84c] text-[0.62rem] tracking-[0.3em] uppercase mb-2"
              style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}
            >
              Sreenivasa Constructions
            </p>
            <h2
              className="text-[#f5f0e8] text-3xl font-light tracking-wider mb-6"
              style={{ fontFamily: "var(--font-cormorant), serif" }}
            >
              Sonthalia Ecorise
            </h2>
            <p
              className="text-[#5a5550] text-sm leading-relaxed max-w-sm mb-8"
              style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}
            >
              Ultra-luxury 3 & 4 BHK residences in Gaganpahad, Rajendranagar, Hyderabad.
              An address that defines a new era of refined living.
            </p>
            <div className="flex items-center gap-2">
              <div className="h-px w-6 bg-[rgba(201,168,76,0.4)]" />
              <span
                className="text-[0.65rem] tracking-[0.2em] uppercase text-[#5a5550]"
                style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}
              >
                RERA: P02400010642
              </span>
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          >
            <h3
              className="text-[#c9a84c] text-[0.62rem] tracking-[0.25em] uppercase mb-6"
              style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}
            >
              Navigate
            </h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-sm text-[#5a5550] hover:text-[#c9a84c] transition-colors duration-200 tracking-wide"
                    style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          >
            <h3
              className="text-[#c9a84c] text-[0.62rem] tracking-[0.25em] uppercase mb-6"
              style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}
            >
              Contact
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <Phone size={13} className="text-[#c9a84c] mt-0.5 shrink-0" />
                <a href="tel:+919100000000" className="text-sm text-[#5a5550] hover:text-[#c9a84c] transition-colors" style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}>
                  +91 91000 00000
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Mail size={13} className="text-[#c9a84c] mt-0.5 shrink-0" />
                <a href="mailto:info@sreenivasaecorise.com" className="text-sm text-[#5a5550] hover:text-[#c9a84c] transition-colors break-all" style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}>
                  info@sreenivasaecorise.com
                </a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin size={13} className="text-[#c9a84c] mt-0.5 shrink-0" />
                <span className="text-sm text-[#5a5550] leading-relaxed" style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}>
                  Gaganpahad, Rajendranagar,<br />Hyderabad, Telangana
                </span>
              </li>
            </ul>
          </motion.div>
        </div>
      </div>

      <div className="gold-line" />

      <div className="container-luxury py-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-[#5a5550] tracking-wide" style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}>
            © {new Date().getFullYear()} Sreenivasa Constructions. All rights reserved.
          </p>
          <p className="text-xs text-[#5a5550] tracking-wide text-center" style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}>
            *Artistic impressions. Specifications subject to change. RERA: P02400010642
          </p>
        </div>
      </div>
    </footer>
  );
}
