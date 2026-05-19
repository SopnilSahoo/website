import type { Metadata } from "next";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  CheckCircle2,
} from "lucide-react";
import ContactForm from "@/components/sections/ContactForm";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Get in touch with Reach Digitally Agency. Book your free 30-minute strategy call and discover how we can grow your brand with data-driven digital marketing.",
};

export default function ContactPage() {
  return (
    <div className="bg-[#0a0a0a] text-white min-h-screen">
      {/* Hero */}
      <section className="relative overflow-hidden py-28 px-6 text-center">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 70% 50% at 50% 0%, rgba(204,20,20,0.18) 0%, transparent 70%)",
          }}
        />
        <div className="relative z-10 max-w-3xl mx-auto">
          <p className="text-[#CC1414] text-sm font-semibold tracking-widest uppercase mb-4">
            Get In Touch
          </p>
          <h1 className="text-5xl md:text-6xl font-bold tracking-tight mb-6">
            Let&apos;s Talk Growth
          </h1>
          <p className="text-xl text-white/60 leading-relaxed">
            Book your free 30-minute strategy call — no commitment, no fluff, just a
            clear plan for your brand&apos;s growth.
          </p>
        </div>
      </section>

      {/* Two-column layout */}
      <section className="py-16 px-6 pb-28">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
          {/* LEFT: Contact Form */}
          <div>
            <h2 className="text-2xl font-bold mb-2">Send Us a Message</h2>
            <p className="text-white/50 text-sm mb-7">
              Fill in the details below and we&apos;ll get back to you within 24 hours.
            </p>
            <ContactForm />
          </div>

          {/* RIGHT: Contact details + Why Book */}
          <div className="space-y-6">
            {/* Contact Details Card */}
            <div className="bg-[#111] border border-white/[0.06] rounded-2xl p-8 space-y-7">
              <h2 className="text-2xl font-bold">Contact Details</h2>

              {/* Phone */}
              <div className="flex items-start gap-4">
                <div className="w-11 h-11 rounded-xl bg-[#CC1414]/10 flex items-center justify-center shrink-0">
                  <Phone className="w-5 h-5 text-[#CC1414]" />
                </div>
                <div>
                  <p className="text-xs text-white/40 uppercase tracking-widest font-medium mb-1.5">
                    Phone
                  </p>
                  <a
                    href="tel:9777606321"
                    className="block text-white hover:text-[#CC1414] transition-colors duration-200 font-medium"
                  >
                    +91 97776 06321
                  </a>
                  <a
                    href="tel:9986834177"
                    className="block text-white hover:text-[#CC1414] transition-colors duration-200 font-medium"
                  >
                    +91 99868 34177
                  </a>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start gap-4">
                <div className="w-11 h-11 rounded-xl bg-[#CC1414]/10 flex items-center justify-center shrink-0">
                  <Mail className="w-5 h-5 text-[#CC1414]" />
                </div>
                <div>
                  <p className="text-xs text-white/40 uppercase tracking-widest font-medium mb-1.5">
                    Email
                  </p>
                  <a
                    href="mailto:hello@reachdigitally.agency"
                    className="text-white hover:text-[#CC1414] transition-colors duration-200 font-medium"
                  >
                    hello@reachdigitally.agency
                  </a>
                </div>
              </div>

              {/* Address */}
              <div className="flex items-start gap-4">
                <div className="w-11 h-11 rounded-xl bg-[#CC1414]/10 flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5 text-[#CC1414]" />
                </div>
                <div>
                  <p className="text-xs text-white/40 uppercase tracking-widest font-medium mb-1.5">
                    Address
                  </p>
                  <p className="text-white/70 leading-relaxed text-sm">
                    Plot No. 234, District Center,<br />
                    Chandrasekharpur,<br />
                    Bhubaneswar, Odisha 751016
                  </p>
                </div>
              </div>

              {/* Hours */}
              <div className="flex items-start gap-4">
                <div className="w-11 h-11 rounded-xl bg-[#CC1414]/10 flex items-center justify-center shrink-0">
                  <Clock className="w-5 h-5 text-[#CC1414]" />
                </div>
                <div>
                  <p className="text-xs text-white/40 uppercase tracking-widest font-medium mb-1.5">
                    Business Hours
                  </p>
                  <p className="text-white/70 text-sm">
                    Mon – Sat, 9:00 AM – 7:00 PM
                  </p>
                </div>
              </div>
            </div>

            {/* Why Book a Call */}
            <div className="bg-[#111] border border-white/[0.06] rounded-2xl p-8">
              <h3 className="text-xl font-bold mb-5">Why Book a Call?</h3>
              <ul className="space-y-4">
                {[
                  "No commitment required — it's completely free",
                  "Custom strategy tailored to your business goals",
                  "Free audit of your current marketing performance",
                ].map((point) => (
                  <li key={point} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-[#CC1414] shrink-0 mt-0.5" />
                    <span className="text-white/65 text-sm leading-relaxed">{point}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-8 pt-7 border-t border-white/[0.06]">
                <p className="text-white/40 text-xs leading-relaxed">
                  Our strategists have worked with 50+ brands across industries. In 30 minutes,
                  you&apos;ll walk away with a clear picture of what&apos;s holding your brand
                  back — and exactly what to do about it.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
