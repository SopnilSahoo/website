import type { Metadata } from "next";
import { BarChart2, Sparkles, Eye, MapPin } from "lucide-react";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn the story behind Reach Digitally Agency — Bhubaneswar's AI-powered digital marketing partner helping 50+ brands grow their online presence across Odisha and beyond.",
};

const stats = [
  { value: "5+", label: "Years in Business" },
  { value: "50+", label: "Clients Served" },
  { value: "200+", label: "Campaigns Delivered" },
  { value: "3", label: "Accreditations" },
];

const values = [
  {
    icon: BarChart2,
    title: "Data-Driven",
    description:
      "Every strategy we build is backed by real data — from audience insights to campaign analytics — so decisions are never based on guesswork.",
  },
  {
    icon: Sparkles,
    title: "Creative First",
    description:
      "Bold ideas and compelling storytelling sit at the heart of everything we do. We believe great creative is the ultimate performance lever.",
  },
  {
    icon: Eye,
    title: "Transparent",
    description:
      "We share everything — strategy, results, and learnings. You always know what we're doing, why we're doing it, and what it's delivering.",
  },
];

const accreditations = [
  {
    name: "BNI Member",
    short: "BNI",
    description:
      "Proud member of Business Network International (BNI), the world's largest business networking organisation, enabling us to connect our clients with a powerful referral network.",
  },
  {
    name: "Startup Odisha",
    short: "Startup Odisha",
    description:
      "Recognised by the Government of Odisha's Startup Odisha initiative as an emerging startup driving innovation in the digital marketing space within the state.",
  },
  {
    name: "MSME Registered",
    short: "MSME",
    description:
      "Officially registered under the Ministry of Micro, Small & Medium Enterprises (MSME), Government of India — affirming our credibility as a legitimate and accountable business entity.",
  },
];

export default function AboutPage() {
  return (
    <div className="bg-[#0a0a0a] text-white min-h-screen">
      {/* Hero */}
      <section className="relative overflow-hidden py-28 px-6 text-center">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 70% 50% at 50% 0%, rgba(204,20,20,0.15) 0%, transparent 70%)",
          }}
        />
        <div className="relative z-10 max-w-3xl mx-auto">
          <p className="text-[#CC1414] text-sm font-semibold tracking-widest uppercase mb-4">
            Who We Are
          </p>
          <h1 className="text-5xl md:text-6xl font-bold tracking-tight mb-6">
            About Reach Digitally
          </h1>
          <p className="text-xl text-white/60 leading-relaxed">
            The team behind your brand&apos;s growth
          </p>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col md:flex-row gap-12 items-start">
            <div className="md:w-1/3 shrink-0">
              <h2 className="text-3xl font-bold mb-2">Our Story</h2>
              <div className="w-12 h-1 bg-[#CC1414] rounded-full" />
            </div>
            <div className="md:w-2/3">
              <p className="text-white/65 text-lg leading-relaxed">
                Founded over 5 years ago in Bhubaneswar, Odisha, Reach Digitally Agency was born
                from a simple belief: every business deserves world-class marketing. We started
                small, with big ambitions — and today, we&apos;ve worked with 50+ brands across
                industries, helping them grow their online presence, generate leads, and build
                lasting reputations.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16 px-6 bg-[#0d0d0d]">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            Mission & Vision
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-[#111] border border-white/[0.06] rounded-2xl p-8 hover:border-[#CC1414]/40 transition-colors duration-300">
              <div className="w-10 h-10 rounded-lg bg-[#CC1414]/15 flex items-center justify-center mb-5">
                <span className="text-[#CC1414] font-bold text-lg">M</span>
              </div>
              <h3 className="text-xl font-bold mb-3">Our Mission</h3>
              <p className="text-white/60 leading-relaxed">
                To make every brand unmissable through AI-powered, data-driven marketing that
                delivers real results.
              </p>
            </div>
            <div className="bg-[#111] border border-white/[0.06] rounded-2xl p-8 hover:border-[#CC1414]/40 transition-colors duration-300">
              <div className="w-10 h-10 rounded-lg bg-[#CC1414]/15 flex items-center justify-center mb-5">
                <span className="text-[#CC1414] font-bold text-lg">V</span>
              </div>
              <h3 className="text-xl font-bold mb-3">Our Vision</h3>
              <p className="text-white/60 leading-relaxed">
                To become Odisha&apos;s most trusted and innovative digital marketing partner —
                setting the benchmark for what great marketing looks like.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="group bg-[#111] border border-white/[0.06] rounded-2xl p-6 text-center hover:border-[#CC1414]/40 hover:-translate-y-1 transition-all duration-300"
              >
                <div className="text-4xl font-bold text-[#CC1414] mb-2">{stat.value}</div>
                <div className="text-white/55 text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Values */}
      <section className="py-20 px-6 bg-[#0d0d0d]">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-3">
            What We Stand For
          </h2>
          <p className="text-white/50 text-center text-lg mb-14">
            The principles that guide every campaign, every client, every decision.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {values.map((value) => {
              const Icon = value.icon;
              return (
                <div
                  key={value.title}
                  className="group bg-[#111] border border-white/[0.06] rounded-2xl p-7 hover:border-[#CC1414]/40 hover:-translate-y-1 transition-all duration-300"
                >
                  <div className="w-12 h-12 rounded-xl bg-[#CC1414]/10 flex items-center justify-center mb-5 group-hover:bg-[#CC1414]/20 transition-colors duration-300">
                    <Icon className="w-6 h-6 text-[#CC1414]" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">{value.title}</h3>
                  <p className="text-white/55 text-sm leading-relaxed">{value.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Accreditations */}
      <section className="py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-3">
            Our Accreditations
          </h2>
          <p className="text-white/50 text-center text-lg mb-14">
            Recognised, registered, and trusted.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {accreditations.map((acc) => (
              <div
                key={acc.name}
                className="group bg-[#111] border border-white/[0.06] rounded-2xl p-7 hover:border-[#CC1414]/40 hover:-translate-y-1 transition-all duration-300"
              >
                <div className="inline-block bg-[#CC1414]/10 text-[#CC1414] text-xs font-bold tracking-widest uppercase px-3 py-1.5 rounded-lg mb-5">
                  {acc.short}
                </div>
                <h3 className="text-lg font-bold mb-3">{acc.name}</h3>
                <p className="text-white/55 text-sm leading-relaxed">{acc.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Address */}
      <section className="py-16 px-6 bg-[#0d0d0d]">
        <div className="max-w-2xl mx-auto">
          <div className="bg-[#111] border border-white/[0.06] rounded-2xl p-8 flex items-start gap-5">
            <div className="w-12 h-12 rounded-xl bg-[#CC1414]/10 flex items-center justify-center shrink-0">
              <MapPin className="w-6 h-6 text-[#CC1414]" />
            </div>
            <div>
              <h3 className="text-xl font-bold mb-2">Find Us</h3>
              <p className="text-white/60 leading-relaxed">
                Plot No. 234, District Center,<br />
                Chandrasekharpur,<br />
                Bhubaneswar, Odisha 751016
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
