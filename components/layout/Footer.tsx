"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useInView, type Variants } from "framer-motion";
import { Phone, Mail, MapPin } from "lucide-react";

const companyLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Contact", href: "/contact" },
];

const serviceLinks = [
  { label: "Social Media Marketing", href: "/services#social-media" },
  { label: "SEO & AEO", href: "/services#seo-aeo" },
  { label: "Performance Marketing", href: "/services#performance" },
  { label: "Branding & Identity", href: "/services#branding" },
  { label: "Website Development", href: "/services#website" },
];

const accreditations = ["BNI", "Startup Odisha", "MSME"];

const fadeUpVariants: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
    },
  }),
};

export default function Footer() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "0px 0px -80px 0px" });

  return (
    <footer
      ref={ref}
      className="bg-[#0a0a0a] border-t"
      style={{ borderColor: "rgba(255,255,255,0.06)" }}
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 pt-16 pb-10">
        {/* Top Section: Logo + Tagline + Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-10">
          {/* Brand Column */}
          <motion.div
            custom={0}
            variants={fadeUpVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="lg:col-span-1"
          >
            {/* Logo */}
            <Link href="/" className="inline-flex flex-col leading-none mb-4">
              <div className="flex items-baseline gap-[5px]">
                <span className="text-white font-bold text-xl tracking-tight">
                  REACH
                </span>
                <span
                  className="font-bold text-xl tracking-tight"
                  style={{ color: "#CC1414" }}
                >
                  DIGITALLY
                </span>
              </div>
              <span className="text-[10px] font-light italic tracking-[0.18em] text-white/40 mt-[-1px]">
                Agency
              </span>
            </Link>

            <p className="text-sm text-white/40 leading-relaxed mt-2 max-w-[220px]">
              AI-Powered Digital Marketing Agency
            </p>

            {/* Accreditations */}
            <div className="mt-6 flex flex-wrap gap-2">
              {accreditations.map((item) => (
                <span
                  key={item}
                  className="inline-block px-2.5 py-1 rounded text-[11px] font-medium tracking-wide text-white/40 border"
                  style={{ borderColor: "rgba(255,255,255,0.1)" }}
                >
                  {item}
                </span>
              ))}
            </div>
            <p className="text-[11px] text-white/25 mt-3 tracking-wide">
              Accredited by BNI | Startup Odisha | MSME
            </p>
          </motion.div>

          {/* Company Links */}
          <motion.div
            custom={1}
            variants={fadeUpVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            <h4 className="text-xs font-semibold uppercase tracking-[0.14em] text-white/30 mb-5">
              Company
            </h4>
            <ul className="space-y-3">
              {companyLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/55 hover:text-white transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Services Links */}
          <motion.div
            custom={2}
            variants={fadeUpVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            <h4 className="text-xs font-semibold uppercase tracking-[0.14em] text-white/30 mb-5">
              Services
            </h4>
            <ul className="space-y-3">
              {serviceLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/55 hover:text-white transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact */}
          <motion.div
            custom={3}
            variants={fadeUpVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            <h4 className="text-xs font-semibold uppercase tracking-[0.14em] text-white/30 mb-5">
              Contact
            </h4>
            <ul className="space-y-4">
              {/* Address */}
              <li className="flex items-start gap-3">
                <MapPin
                  size={15}
                  className="text-white/30 mt-0.5 shrink-0"
                  strokeWidth={1.8}
                />
                <span className="text-sm text-white/50 leading-relaxed">
                  Plot No. 234, District Center,
                  <br />
                  Chandrasekharpur,
                  <br />
                  Bhubaneswar, Odisha 751016
                </span>
              </li>

              {/* Phone */}
              <li className="flex items-start gap-3">
                <Phone
                  size={15}
                  className="text-white/30 mt-0.5 shrink-0"
                  strokeWidth={1.8}
                />
                <div className="flex flex-col gap-1">
                  <a
                    href="tel:9777606321"
                    className="text-sm text-white/55 hover:text-white transition-colors duration-200"
                  >
                    9777606321
                  </a>
                  <a
                    href="tel:9986834177"
                    className="text-sm text-white/55 hover:text-white transition-colors duration-200"
                  >
                    9986834177
                  </a>
                </div>
              </li>

              {/* Email */}
              <li className="flex items-center gap-3">
                <Mail
                  size={15}
                  className="text-white/30 shrink-0"
                  strokeWidth={1.8}
                />
                <a
                  href="mailto:hello@reachdigitally.agency"
                  className="text-sm text-white/55 hover:text-white transition-colors duration-200 break-all"
                >
                  hello@reachdigitally.agency
                </a>
              </li>
            </ul>
          </motion.div>
        </div>

        {/* Divider */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0.6 }}
          animate={isInView ? { opacity: 1, scaleX: 1 } : { opacity: 0, scaleX: 0.6 }}
          transition={{ delay: 0.45, duration: 0.5, ease: "easeOut" }}
          className="mt-14 mb-7 border-t"
          style={{ borderColor: "rgba(255,255,255,0.06)" }}
        />

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
          transition={{ delay: 0.55, duration: 0.4, ease: "easeOut" }}
          className="flex flex-col sm:flex-row items-center justify-between gap-3"
        >
          <p className="text-xs text-white/25 tracking-wide">
            &copy; 2024 Reach Digitally Agency. All rights reserved.
          </p>
          <p className="text-xs text-white/20 tracking-wide">
            Bhubaneswar, Odisha, India
          </p>
        </motion.div>
      </div>
    </footer>
  );
}
