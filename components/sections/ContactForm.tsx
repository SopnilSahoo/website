"use client";

import { useState } from "react";
import { Send } from "lucide-react";

const serviceOptions = [
  "Social Media Marketing",
  "SEO & AEO",
  "Performance Marketing",
  "Branding & Identity",
  "Website Development",
  "Other",
];

interface FormState {
  name: string;
  email: string;
  phone: string;
  businessName: string;
  service: string;
  message: string;
}

const initialForm: FormState = {
  name: "",
  email: "",
  phone: "",
  businessName: "",
  service: "",
  message: "",
};

const inputClass =
  "w-full bg-[#111] border border-[rgba(255,255,255,0.08)] text-white placeholder-white/30 rounded-lg px-4 py-3 focus:border-[#CC1414] focus:outline-none transition-colors duration-200 text-sm";

export default function ContactForm() {
  const [form, setForm] = useState<FormState>(initialForm);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    // Simulate async send
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 800);
  }

  if (submitted) {
    return (
      <div className="flex flex-col items-center justify-center text-center py-16 px-6 bg-[#111] border border-white/[0.06] rounded-2xl h-full min-h-[400px]">
        <div className="w-14 h-14 rounded-full bg-[#CC1414]/15 flex items-center justify-center mb-5">
          <Send className="w-7 h-7 text-[#CC1414]" />
        </div>
        <h3 className="text-2xl font-bold mb-3">Message Sent!</h3>
        <p className="text-white/60 text-lg leading-relaxed max-w-sm">
          Thank you! We&apos;ll be in touch within 24 hours.
        </p>
        <button
          onClick={() => { setForm(initialForm); setSubmitted(false); }}
          className="mt-8 text-sm text-[#CC1414] hover:text-white transition-colors duration-200 underline underline-offset-4"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-[#111] border border-white/[0.06] rounded-2xl p-8 space-y-5"
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div className="space-y-1.5">
          <label className="text-xs text-white/50 font-medium tracking-wide uppercase">
            Name <span className="text-[#CC1414]">*</span>
          </label>
          <input
            type="text"
            name="name"
            required
            placeholder="Your full name"
            value={form.name}
            onChange={handleChange}
            className={inputClass}
          />
        </div>
        <div className="space-y-1.5">
          <label className="text-xs text-white/50 font-medium tracking-wide uppercase">
            Email <span className="text-[#CC1414]">*</span>
          </label>
          <input
            type="email"
            name="email"
            required
            placeholder="you@company.com"
            value={form.email}
            onChange={handleChange}
            className={inputClass}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div className="space-y-1.5">
          <label className="text-xs text-white/50 font-medium tracking-wide uppercase">
            Phone
          </label>
          <input
            type="tel"
            name="phone"
            placeholder="+91 XXXXX XXXXX"
            value={form.phone}
            onChange={handleChange}
            className={inputClass}
          />
        </div>
        <div className="space-y-1.5">
          <label className="text-xs text-white/50 font-medium tracking-wide uppercase">
            Business Name
          </label>
          <input
            type="text"
            name="businessName"
            placeholder="Your business"
            value={form.businessName}
            onChange={handleChange}
            className={inputClass}
          />
        </div>
      </div>

      <div className="space-y-1.5">
        <label className="text-xs text-white/50 font-medium tracking-wide uppercase">
          Service Interest
        </label>
        <select
          name="service"
          value={form.service}
          onChange={handleChange}
          className={`${inputClass} appearance-none cursor-pointer`}
        >
          <option value="" disabled className="bg-[#111]">
            Select a service...
          </option>
          {serviceOptions.map((opt) => (
            <option key={opt} value={opt} className="bg-[#111]">
              {opt}
            </option>
          ))}
        </select>
      </div>

      <div className="space-y-1.5">
        <label className="text-xs text-white/50 font-medium tracking-wide uppercase">
          Message <span className="text-[#CC1414]">*</span>
        </label>
        <textarea
          name="message"
          required
          rows={5}
          placeholder="Tell us about your business and goals..."
          value={form.message}
          onChange={handleChange}
          className={`${inputClass} resize-none`}
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full flex items-center justify-center gap-2 bg-[#CC1414] hover:bg-[#e01818] disabled:opacity-60 disabled:cursor-not-allowed text-white font-semibold px-6 py-4 rounded-xl transition-colors duration-200 text-base"
      >
        {loading ? (
          <>
            <span className="w-4 h-4 rounded-full border-2 border-white/40 border-t-white animate-spin" />
            Sending...
          </>
        ) : (
          <>
            Send Message
            <span className="text-lg">→</span>
          </>
        )}
      </button>
    </form>
  );
}
