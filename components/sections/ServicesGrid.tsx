"use client";

import { useRef } from "react";
import { motion, useInView, useMotionTemplate, type Variants } from "framer-motion";
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
import { use3DTilt } from "@/hooks/use3DTilt";

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

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 48, rotateX: 18, scale: 0.96 },
  visible: {
    opacity: 1,
    y: 0,
    rotateX: 0,
    scale: 1,
    transition: { duration: 0.55, ease: EASE },
  },
};

// Scan line variants — controlled by parent whileHover
const scanLineVariants: Variants = {
  rest: { y: "-100%", opacity: 0 },
  hover: {
    y: "100%",
    opacity: [0, 0.7, 0],
    transition: { duration: 0.6, ease: "easeInOut" },
  },
};

// Corner accent variants
const cornerAccentVariants: Variants = {
  rest: { opacity: 0 },
  hover: { opacity: 1, transition: { duration: 0.2 } },
};

// Title words stagger
const titleContainerVariants: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.07, delayChildren: 0.1 },
  },
};

const wordVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: EASE },
  },
};

// Animated underline
const underlineVariants: Variants = {
  hidden: { scaleX: 0, originX: 0 },
  visible: {
    scaleX: 1,
    transition: { duration: 0.7, ease: EASE, delay: 0.45 },
  },
};

function AnimatedTitle({
  text,
  isInView,
}: {
  text: string;
  isInView: boolean;
}) {
  const words = text.split(" ");
  // Find where "Full-Spectrum" starts (word 0) to place underline under first two words
  return (
    <div className="relative inline-block">
      <motion.span
        className="flex flex-wrap justify-center gap-x-[0.3em] gap-y-0"
        variants={titleContainerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        aria-label={text}
      >
        {words.map((word, i) => (
          <motion.span
            key={i}
            variants={wordVariants}
            className="inline-block"
          >
            {word}
          </motion.span>
        ))}
      </motion.span>

      {/* Animated underline under "Full-Spectrum Marketing" — full width */}
      <motion.span
        aria-hidden="true"
        className="absolute -bottom-2 left-0 right-0 h-[3px] rounded-full bg-gradient-to-r from-[#CC1414] via-[#e01616] to-[#CC1414]/40 origin-left"
        variants={underlineVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      />
    </div>
  );
}

function CoreServiceCard({ service, index }: { service: ServiceCard; index: number }) {
  const Icon = service.icon;
  const tilt = use3DTilt(10);
  const glareBackground = useMotionTemplate`radial-gradient(circle at ${tilt.glareX}% ${tilt.glareY}%, rgba(255,255,255,0.08) 0%, transparent 60%)`;

  return (
    <motion.div
      ref={tilt.ref}
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "0px 0px -80px 0px" }}
      whileHover="hover"
      animate="rest"
      custom={index}
      transition={{ duration: 0.55, ease: EASE, delay: (index % 3) * 0.1 }}
      onMouseMove={tilt.onMouseMove}
      onMouseLeave={tilt.onMouseLeave}
      className="group relative flex flex-col gap-4 p-6 rounded-xl bg-[#111111] border border-white/[0.06] cursor-default overflow-hidden"
      style={{
        originX: 0.5,
        originY: 0.5,
        rotateX: tilt.rotateX,
        rotateY: tilt.rotateY,
        transformStyle: "preserve-3d",
      }}
    >
      {/* Framer-motion hover for card lift + border glow */}
      <motion.div
        className="pointer-events-none absolute inset-0 rounded-xl"
        variants={{
          rest: {
            boxShadow: "0 0 0 0px rgba(204,20,20,0), 0 0px 0px rgba(204,20,20,0)",
            borderColor: "rgba(255,255,255,0.06)",
          },
          hover: {
            boxShadow:
              "0 0 0 1px rgba(204,20,20,0.35), 0 8px 32px rgba(204,20,20,0.14)",
            borderColor: "rgba(204,20,20,0.5)",
          },
        }}
        transition={{ duration: 0.25 }}
        style={{ border: "1px solid transparent", zIndex: 0 }}
      />

      {/* Corner accent — top-right triangle */}
      <motion.div
        aria-hidden="true"
        variants={cornerAccentVariants}
        className="pointer-events-none absolute top-0 right-0 w-5 h-5 z-10"
        style={{
          background: "#CC1414",
          clipPath: "polygon(100% 0, 0 0, 100% 100%)",
        }}
      />

      {/* Icon box with scan line */}
      <div className="relative inline-flex items-center justify-center w-11 h-11 rounded-lg bg-[#CC1414]/10 border border-[#CC1414]/20 overflow-hidden flex-shrink-0">
        {/* Icon — animates to brighter red on hover */}
        <motion.div
          variants={{
            rest: { color: "#CC1414" },
            hover: { color: "#ff2222" },
          }}
          transition={{ duration: 0.2 }}
        >
          <Icon size={22} strokeWidth={1.75} />
        </motion.div>

        {/* Scan line */}
        <motion.div
          aria-hidden="true"
          variants={scanLineVariants}
          className="pointer-events-none absolute inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-[#CC1414] to-transparent"
          style={{ top: 0 }}
        />
      </div>

      {/* Text */}
      <div className="relative flex flex-col gap-1.5 z-[1]">
        <h3 className="text-white font-semibold text-base leading-snug">
          {service.title}
        </h3>
        {service.description && (
          <p className="text-white/45 text-sm leading-relaxed">
            {service.description}
          </p>
        )}
      </div>

      {/* Corner red glow */}
      <motion.div
        aria-hidden="true"
        variants={{
          rest: { opacity: 0 },
          hover: { opacity: 1 },
        }}
        transition={{ duration: 0.3 }}
        className="pointer-events-none absolute top-0 right-0 w-24 h-24 rounded-tr-xl overflow-hidden"
      >
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(circle at top right, rgba(204,20,20,0.18) 0%, transparent 70%)",
          }}
        />
      </motion.div>

      {/* Glare overlay — visible only on mouse move via glareOpacity */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 rounded-xl"
        style={{
          background: glareBackground,
          opacity: tilt.glareOpacity,
          zIndex: 20,
        }}
      />
    </motion.div>
  );
}

function OtherServiceCard({ service, index }: { service: ServiceCard; index: number }) {
  const Icon = service.icon;
  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "0px 0px -60px 0px" }}
      transition={{ duration: 0.5, ease: EASE, delay: index * 0.08 }}
      className="group flex items-center gap-3 px-5 py-4 rounded-xl bg-[#111111] border border-white/[0.06] cursor-default"
      style={{ transformStyle: "preserve-3d" }}
      whileHover={{
        borderColor: "rgba(204,20,20,0.4)",
        boxShadow: "0 0 0 1px rgba(204,20,20,0.2), 0 4px 16px rgba(204,20,20,0.08)",
        y: -3,
      }}
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
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="flex flex-col items-center text-center mb-16 md:mb-20"
        >
          <motion.span
            variants={wordVariants}
            className="text-[#CC1414] text-xs font-semibold uppercase tracking-[0.2em] mb-4"
          >
            What We Do
          </motion.span>

          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white leading-tight tracking-tight mb-5 pb-3">
            <AnimatedTitle text="Full-Spectrum Marketing" isInView={isInView} />
          </h2>

          <motion.p
            variants={{
              hidden: { opacity: 0, y: 16 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE, delay: 0.35 } },
            }}
            className="text-white/45 text-lg max-w-xl leading-relaxed"
          >
            From viral social campaigns to AI-driven strategy — every channel,
            every platform, fully covered.
          </motion.p>
        </motion.div>

        {/* Core services grid — 3 columns on desktop */}
        <div style={{ perspective: "1000px" }}>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
            {coreServices.map((service, i) => (
              <CoreServiceCard key={service.title} service={service} index={i} />
            ))}
          </div>
        </div>

        {/* Other services divider label */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, ease: EASE, delay: 0.3 }}
          className="flex items-center gap-4 mb-6"
        >
          <div className="h-px flex-1 bg-white/[0.06]" />
          <span className="text-white/30 text-xs font-medium uppercase tracking-widest px-2">
            More Services
          </span>
          <div className="h-px flex-1 bg-white/[0.06]" />
        </motion.div>

        {/* Other services row — up to 5 columns on large screens */}
        <div style={{ perspective: "1000px" }}>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
            {otherServices.map((service, i) => (
              <OtherServiceCard key={service.title} service={service} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
