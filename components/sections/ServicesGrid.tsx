"use client";

import { useRef } from "react";
import { motion, useInView, type Variants } from "framer-motion";
import {
  Share2,
  Palette,
  TrendingUp,
  Search,
  Globe,
  Zap,
  Tv,
  Radio,
  Mic,
  FileText,
  Film,
  type LucideIcon,
} from "lucide-react";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

interface ServiceCard {
  icon: LucideIcon;
  title: string;
  description?: string;
}

const coreServices: ServiceCard[] = [
  {
    icon: Share2,
    title: "Social Media Marketing",
    description:
      "Viral-worthy content & community management that builds loyal audiences",
  },
  {
    icon: Palette,
    title: "Branding & Identity",
    description:
      "Distinctive brand identities that command attention and trust",
  },
  {
    icon: TrendingUp,
    title: "Performance Marketing",
    description:
      "Data-driven ad campaigns with measurable ROI across platforms",
  },
  {
    icon: Search,
    title: "SEO & AEO",
    description:
      "Rank on Google and get cited by AI tools like ChatGPT & Gemini",
  },
  {
    icon: Globe,
    title: "Website Development",
    description:
      "High-converting websites built for speed, SEO, and user experience",
  },
  {
    icon: Zap,
    title: "AI-Powered Strategy",
    description:
      "Cutting-edge AI tools to supercharge every marketing channel",
  },
];

const otherServices: ServiceCard[] = [
  { icon: Tv, title: "TV Advertisement" },
  { icon: Radio, title: "Radio FM Advertisement" },
  { icon: Mic, title: "Podcast Production" },
  { icon: FileText, title: "Print & Paper Media" },
  { icon: Film, title: "Cinema Hall Ads" },
];

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.55,
      ease: EASE,
    },
  },
};

const headerVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: EASE },
  },
};

function CoreServiceCard({ service }: { service: ServiceCard }) {
  const Icon = service.icon;
  return (
    <motion.div
      variants={cardVariants}
      className="group relative flex flex-col gap-4 p-6 rounded-xl bg-[#111111] border border-white/[0.06] cursor-default"
      whileHover={{
        y: -4,
        borderColor: "rgba(204,20,20,0.5)",
        boxShadow:
          "0 0 0 1px rgba(204,20,20,0.3), 0 8px 32px rgba(204,20,20,0.12)",
      }}
      transition={{ duration: 0.2 }}
    >
      {/* Icon */}
      <div className="inline-flex items-center justify-center w-11 h-11 rounded-lg bg-[#CC1414]/10 border border-[#CC1414]/20 text-[#CC1414] transition-colors duration-300 group-hover:bg-[#CC1414]/20">
        <Icon size={22} strokeWidth={1.75} />
      </div>

      {/* Text */}
      <div className="flex flex-col gap-1.5">
        <h3 className="text-white font-semibold text-base leading-snug">
          {service.title}
        </h3>
        {service.description && (
          <p className="text-white/45 text-sm leading-relaxed">
            {service.description}
          </p>
        )}
      </div>

      {/* Subtle corner red glow on hover */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-0 right-0 w-24 h-24 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-tr-xl overflow-hidden"
      >
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(circle at top right, rgba(204,20,20,0.14) 0%, transparent 70%)",
          }}
        />
      </div>
    </motion.div>
  );
}

function OtherServiceCard({ service }: { service: ServiceCard }) {
  const Icon = service.icon;
  return (
    <motion.div
      variants={cardVariants}
      className="group flex items-center gap-3 px-5 py-4 rounded-xl bg-[#111111] border border-white/[0.06] cursor-default"
      whileHover={{
        borderColor: "rgba(204,20,20,0.4)",
        boxShadow:
          "0 0 0 1px rgba(204,20,20,0.2), 0 4px 16px rgba(204,20,20,0.08)",
      }}
      transition={{ duration: 0.2 }}
    >
      <div className="inline-flex items-center justify-center w-9 h-9 rounded-lg bg-[#CC1414]/10 border border-[#CC1414]/20 text-[#CC1414] transition-colors duration-300 group-hover:bg-[#CC1414]/20 flex-shrink-0">
        <Icon size={18} strokeWidth={1.75} />
      </div>
      <span className="text-white/65 text-sm font-medium group-hover:text-white transition-colors duration-200">
        {service.title}
      </span>
    </motion.div>
  );
}

export default function ServicesGrid() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-80px" });

  return (
    <section
      ref={sectionRef}
      className="relative bg-[#0a0a0a] py-24 md:py-32 px-4"
    >
      {/* Faint top separator */}
      <div
        aria-hidden="true"
        className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-16 bg-gradient-to-b from-transparent to-white/10"
      />

      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <motion.div
          variants={headerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="flex flex-col items-center text-center mb-16 md:mb-20"
        >
          <span className="text-[#CC1414] text-xs font-semibold uppercase tracking-[0.2em] mb-4">
            What We Do
          </span>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white leading-tight tracking-tight mb-5">
            Full-Spectrum Marketing
          </h2>
          <p className="text-white/45 text-lg max-w-xl leading-relaxed">
            From viral social campaigns to AI-driven strategy — every channel,
            every platform, fully covered.
          </p>
        </motion.div>

        {/* Core services grid — 3 columns on desktop */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-12"
        >
          {coreServices.map((service) => (
            <CoreServiceCard key={service.title} service={service} />
          ))}
        </motion.div>

        {/* Other services divider label */}
        <motion.div
          variants={headerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="flex items-center gap-4 mb-6"
        >
          <div className="h-px flex-1 bg-white/[0.06]" />
          <span className="text-white/30 text-xs font-medium uppercase tracking-widest px-2">
            More Services
          </span>
          <div className="h-px flex-1 bg-white/[0.06]" />
        </motion.div>

        {/* Other services row — up to 5 columns on large screens */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3"
        >
          {otherServices.map((service) => (
            <OtherServiceCard key={service.title} service={service} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
