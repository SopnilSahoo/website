"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Phone, Mail, MapPin, Send } from "lucide-react";
import ScrollReveal from "@/components/ui/ScrollReveal";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const CONFIGS = ["3 BHK (2,790 sq.ft.)", "4 BHK (4,675 sq.ft.)", "4 BHK (4,695 sq.ft.)"];
const BUDGETS = ["₹1.5 – 2.5 Cr", "₹2.5 – 3.5 Cr", "₹3.5 Cr+", "Open to Discussion"];

interface FormState {
  name: string;
  phone: string;
  email: string;
  config: string;
  budget: string;
  message: string;
}

export default function Inquiry() {
  const [form, setForm] = useState<FormState>({
    name: "", phone: "", email: "", config: "", budget: "", message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const set = (k: keyof FormState, v: string) => setForm((f) => ({ ...f, [k]: v }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1500));
    setLoading(false);
    setSubmitted(true);
  };

  return (
    <section id="inquiry" className="relative bg-[#0d0e12] overflow-hidden">
      {/* Gold ambient */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] pointer-events-none"
        style={{ background: "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(201,168,76,0.06) 0%, transparent 70%)" }}
      />

      <div className="container-luxury section-padding">
        {/* Header */}
        <ScrollReveal direction="up" duration={0.8}>
          <div className="text-center max-w-2xl mx-auto mb-16">
            <p className="section-eyebrow mb-4 justify-center">Private Consultation</p>
            <h2
              className="text-4xl md:text-5xl font-light leading-tight text-[#f5f0e8] mb-6"
              style={{ fontFamily: "var(--font-cormorant), serif" }}
            >
              Begin Your Journey
              <br />
              <span className="text-gold-gradient">to Extraordinary Living</span>
            </h2>
            <p
              className="text-[#5a5550] text-sm leading-relaxed"
              style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}
            >
              Schedule a private tour or speak with our consultants.
              Your dream home is just one conversation away.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-14 items-start">
          {/* Contact info sidebar */}
          <ScrollReveal direction="left" duration={0.9} className="lg:col-span-2">
            <div className="space-y-6">
              {/* Quick contact */}
              <div className="luxury-card p-7">
                <h3
                  className="text-[#f5f0e8] text-xl font-light mb-6"
                  style={{ fontFamily: "var(--font-cormorant), serif" }}
                >
                  Speak With Us
                </h3>
                <div className="space-y-5">
                  <a href="tel:+919100000000" className="flex items-center gap-4 group">
                    <div className="w-10 h-10 flex items-center justify-center border border-[rgba(201,168,76,0.3)] text-[#c9a84c] group-hover:bg-[rgba(201,168,76,0.08)] transition-colors shrink-0">
                      <Phone size={15} />
                    </div>
                    <div>
                      <p className="text-[#c9a84c] text-[0.6rem] tracking-[0.2em] uppercase" style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}>Call Us</p>
                      <p className="text-[#f5f0e8] text-sm" style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}>+91 91000 00000</p>
                    </div>
                  </a>
                  <a href="mailto:info@sreenivasaecorise.com" className="flex items-center gap-4 group">
                    <div className="w-10 h-10 flex items-center justify-center border border-[rgba(201,168,76,0.3)] text-[#c9a84c] group-hover:bg-[rgba(201,168,76,0.08)] transition-colors shrink-0">
                      <Mail size={15} />
                    </div>
                    <div>
                      <p className="text-[#c9a84c] text-[0.6rem] tracking-[0.2em] uppercase" style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}>Email</p>
                      <p className="text-[#f5f0e8] text-sm break-all" style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}>info@sreenivasaecorise.com</p>
                    </div>
                  </a>
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 flex items-center justify-center border border-[rgba(201,168,76,0.3)] text-[#c9a84c] shrink-0">
                      <MapPin size={15} />
                    </div>
                    <div>
                      <p className="text-[#c9a84c] text-[0.6rem] tracking-[0.2em] uppercase" style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}>Site Office</p>
                      <p className="text-[#f5f0e8] text-sm leading-relaxed" style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}>Gaganpahad, Rajendranagar<br />Hyderabad, Telangana</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Office hours */}
              <div className="luxury-card p-7">
                <h3
                  className="text-[#f5f0e8] text-xl font-light mb-4"
                  style={{ fontFamily: "var(--font-cormorant), serif" }}
                >
                  Experience Centre
                </h3>
                <div className="space-y-3">
                  {[
                    { day: "Monday – Friday", time: "10:00 AM – 7:00 PM" },
                    { day: "Saturday", time: "10:00 AM – 6:00 PM" },
                    { day: "Sunday", time: "11:00 AM – 5:00 PM" },
                  ].map(({ day, time }) => (
                    <div key={day} className="flex justify-between items-center">
                      <span className="text-[#5a5550] text-xs" style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}>{day}</span>
                      <span className="text-[#c9a84c] text-xs" style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}>{time}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* WhatsApp CTA */}
              <a
                href="https://wa.me/919100000000?text=I'm interested in Sreenivasa Sonthalia Ecorise"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-3 w-full py-4 bg-[#25D366] text-white text-sm font-medium tracking-wide hover:bg-[#1fb659] transition-colors"
                style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                </svg>
                Chat on WhatsApp
              </a>
            </div>
          </ScrollReveal>

          {/* Form */}
          <ScrollReveal direction="right" duration={0.9} delay={0.1} className="lg:col-span-3">
            {submitted ? (
              <motion.div
                className="luxury-card p-10 flex flex-col items-center justify-center text-center h-full min-h-[400px] gap-6"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, ease: EASE }}
              >
                <div className="w-16 h-16 border border-[rgba(201,168,76,0.4)] flex items-center justify-center">
                  <svg viewBox="0 0 24 24" fill="none" stroke="#c9a84c" strokeWidth="1.5" className="w-8 h-8">
                    <path d="M20 6L9 17l-5-5" />
                  </svg>
                </div>
                <div>
                  <p className="section-eyebrow mb-3 justify-center">Thank You</p>
                  <h3
                    className="text-[#f5f0e8] text-2xl font-light mb-3"
                    style={{ fontFamily: "var(--font-cormorant), serif" }}
                  >
                    We&apos;ll Be In Touch Shortly
                  </h3>
                  <p
                    className="text-[#5a5550] text-sm leading-relaxed max-w-sm"
                    style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}
                  >
                    Our consultant will call you within 24 hours to schedule your
                    private tour of Sonthalia Ecorise.
                  </p>
                </div>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="luxury-card p-7 md:p-10 space-y-5">
                <h3
                  className="text-[#f5f0e8] text-2xl font-light mb-6"
                  style={{ fontFamily: "var(--font-cormorant), serif" }}
                >
                  Schedule a Private Tour
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[#5a5550] text-[0.65rem] tracking-[0.15em] uppercase mb-2" style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}>
                      Full Name *
                    </label>
                    <input
                      required
                      value={form.name}
                      onChange={(e) => set("name", e.target.value)}
                      placeholder="Your full name"
                      className="luxury-input"
                    />
                  </div>
                  <div>
                    <label className="block text-[#5a5550] text-[0.65rem] tracking-[0.15em] uppercase mb-2" style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}>
                      Phone Number *
                    </label>
                    <input
                      required
                      type="tel"
                      value={form.phone}
                      onChange={(e) => set("phone", e.target.value)}
                      placeholder="+91 XXXXX XXXXX"
                      className="luxury-input"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[#5a5550] text-[0.65rem] tracking-[0.15em] uppercase mb-2" style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}>
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={form.email}
                    onChange={(e) => set("email", e.target.value)}
                    placeholder="your@email.com"
                    className="luxury-input"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[#5a5550] text-[0.65rem] tracking-[0.15em] uppercase mb-2" style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}>
                      Preferred Configuration
                    </label>
                    <select
                      value={form.config}
                      onChange={(e) => set("config", e.target.value)}
                      className="luxury-input appearance-none cursor-pointer"
                      style={{ background: "rgba(255,255,255,0.03)" }}
                    >
                      <option value="" style={{ background: "#111318" }}>Select BHK type</option>
                      {CONFIGS.map((c) => (
                        <option key={c} value={c} style={{ background: "#111318" }}>{c}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-[#5a5550] text-[0.65rem] tracking-[0.15em] uppercase mb-2" style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}>
                      Budget Range
                    </label>
                    <select
                      value={form.budget}
                      onChange={(e) => set("budget", e.target.value)}
                      className="luxury-input appearance-none cursor-pointer"
                      style={{ background: "rgba(255,255,255,0.03)" }}
                    >
                      <option value="" style={{ background: "#111318" }}>Select budget</option>
                      {BUDGETS.map((b) => (
                        <option key={b} value={b} style={{ background: "#111318" }}>{b}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-[#5a5550] text-[0.65rem] tracking-[0.15em] uppercase mb-2" style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}>
                    Message (Optional)
                  </label>
                  <textarea
                    rows={3}
                    value={form.message}
                    onChange={(e) => set("message", e.target.value)}
                    placeholder="Any specific requirements or questions..."
                    className="luxury-input resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="btn-gold w-full justify-center text-[0.72rem] gap-3 py-4 mt-2 disabled:opacity-60 disabled:cursor-not-allowed"
                  style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}
                >
                  {loading ? (
                    <span className="relative z-10 flex items-center gap-2">
                      <motion.span
                        className="inline-block w-3 h-3 border border-current border-t-transparent rounded-full"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 0.7, repeat: Infinity, ease: "linear" }}
                      />
                      Submitting...
                    </span>
                  ) : (
                    <span className="relative z-10 flex items-center gap-2">
                      <Send size={13} />
                      Schedule My Private Tour
                    </span>
                  )}
                </button>

                <p
                  className="text-[#5a5550] text-[0.65rem] text-center"
                  style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}
                >
                  Your information is protected. We respect your privacy.
                </p>
              </form>
            )}
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
