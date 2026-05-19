import type { Metadata } from "next";
import {
  Share2,
  Palette,
  TrendingUp,
  Search,
  Globe,
  Tv,
  Radio,
  Mic2,
  FileText,
  Film,
  ArrowRight,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Explore the full suite of digital marketing services offered by Reach Digitally Agency — Social Media Marketing, SEO & AEO, Performance Marketing, Branding, Website Development, and more.",
};

const coreServices = [
  {
    icon: Share2,
    title: "Social Media Marketing",
    description:
      "We craft data-driven social media strategies that turn followers into loyal customers. From content creation to community management, we handle every aspect of your brand's online presence. Our team ensures your social channels work around the clock to build brand equity and generate measurable results.",
    deliverables: [
      "Monthly content calendar & post scheduling",
      "Reel and short-form video production",
      "Community management & engagement",
      "Monthly analytics & performance reports",
    ],
  },
  {
    icon: Palette,
    title: "Branding & Identity",
    description:
      "Your brand is more than a logo — it's the story people tell about you when you're not in the room. We build cohesive brand identities that communicate your values, attract your ideal clients, and create an instantly recognisable presence. From visual systems to brand voice, we define what makes you unmissable.",
    deliverables: [
      "Logo design & brand guidelines",
      "Color palette, typography & visual system",
      "Brand voice & messaging framework",
      "Business card, letterhead & stationery",
    ],
  },
  {
    icon: TrendingUp,
    title: "Performance Marketing",
    description:
      "Every rupee you spend should work harder. Our performance marketing campaigns are engineered for maximum ROI — using precision targeting, compelling creatives, and continuous optimisation. We manage Meta Ads, Google Ads, and YouTube campaigns that drive real leads and conversions for your business.",
    deliverables: [
      "Meta (Facebook & Instagram) Ads management",
      "Google Search & Display campaigns",
      "YouTube pre-roll and video ads",
      "Conversion tracking & ROAS reporting",
    ],
  },
  {
    icon: Search,
    title: "SEO & AEO",
    description:
      "Ranking on Google is table stakes — ranking in AI answer engines is the new frontier. We combine traditional SEO with Answer Engine Optimisation (AEO) to make your brand the definitive answer for your customers' questions. Our approach covers technical SEO, content strategy, and AI visibility.",
    deliverables: [
      "Technical SEO audit & implementation",
      "Keyword research & on-page optimisation",
      "AEO & featured snippet targeting",
      "Monthly rank tracking & reporting",
    ],
  },
  {
    icon: Globe,
    title: "Website Development",
    description:
      "A slow, outdated website is costing you clients every single day. We build fast, conversion-focused websites that look premium and perform even better. Whether you need a sleek landing page or a full-featured business site, we deliver pixel-perfect results on time and on budget.",
    deliverables: [
      "Custom website design & development",
      "Mobile-first, responsive layouts",
      "SEO-ready structure & performance optimisation",
      "CMS integration & post-launch support",
    ],
  },
];

const traditionalServices = [
  {
    icon: Tv,
    title: "TV Advertisement",
    description:
      "High-impact television commercials for regional and national channels that put your brand in front of millions.",
  },
  {
    icon: Radio,
    title: "Radio FM",
    description:
      "Targeted FM radio spots that reach local audiences during commute hours and drive top-of-mind awareness.",
  },
  {
    icon: Mic2,
    title: "Podcast Production",
    description:
      "End-to-end podcast production and distribution to establish your brand as an authority in your niche.",
  },
  {
    icon: FileText,
    title: "Print & Paper Media",
    description:
      "Brochures, flyers, newspaper inserts, and magazines designed to impress and convert offline audiences.",
  },
  {
    icon: Film,
    title: "Cinema Hall Ads",
    description:
      "Captivate a captive audience with stunning cinema pre-roll advertisements in leading multiplexes.",
  },
];

export default function ServicesPage() {
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
            What We Do
          </p>
          <h1 className="text-5xl md:text-6xl font-bold tracking-tight mb-6">
            Our Services
          </h1>
          <p className="text-xl text-white/60 leading-relaxed">
            Everything Your Brand Needs to Dominate
          </p>
        </div>
      </section>

      {/* Core Services */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-3 text-center">
            Core Digital Services
          </h2>
          <p className="text-white/50 text-center mb-14 text-lg">
            The full-stack digital marketing suite — built for results.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {coreServices.map((service) => {
              const Icon = service.icon;
              return (
                <div
                  key={service.title}
                  className="group relative bg-[#111] border border-white/[0.06] rounded-2xl p-7 hover:border-[#CC1414]/40 transition-all duration-300 hover:-translate-y-1"
                >
                  <div className="w-12 h-12 rounded-xl bg-[#CC1414]/10 flex items-center justify-center mb-5 group-hover:bg-[#CC1414]/20 transition-colors duration-300">
                    <Icon className="w-6 h-6 text-[#CC1414]" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">{service.title}</h3>
                  <p className="text-white/55 text-sm leading-relaxed mb-5">
                    {service.description}
                  </p>
                  <ul className="space-y-2">
                    {service.deliverables.map((item) => (
                      <li key={item} className="flex items-start gap-2 text-sm text-white/70">
                        <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[#CC1414] shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Traditional / Other Media */}
      <section className="py-20 px-6 bg-[#0d0d0d]">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-3 text-center">
            Traditional & Other Media
          </h2>
          <p className="text-white/50 text-center mb-14 text-lg">
            Offline channels that amplify your digital presence.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
            {traditionalServices.map((service) => {
              const Icon = service.icon;
              return (
                <div
                  key={service.title}
                  className="group bg-[#111] border border-white/[0.06] rounded-2xl p-6 hover:border-[#CC1414]/40 transition-all duration-300 hover:-translate-y-1 text-center"
                >
                  <div className="w-12 h-12 rounded-xl bg-[#CC1414]/10 flex items-center justify-center mb-4 mx-auto group-hover:bg-[#CC1414]/20 transition-colors duration-300">
                    <Icon className="w-6 h-6 text-[#CC1414]" />
                  </div>
                  <h3 className="text-base font-bold mb-2">{service.title}</h3>
                  <p className="text-white/50 text-xs leading-relaxed">
                    {service.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-24 px-6 text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold mb-5">
            Ready to Get Started?
          </h2>
          <p className="text-white/55 text-lg mb-10">
            Book your free strategy call today and let&apos;s map out exactly how we&apos;ll grow your brand.
          </p>
          <a
            href="/contact"
            className="inline-flex items-center gap-2 bg-[#CC1414] hover:bg-[#e01818] text-white font-semibold px-8 py-4 rounded-xl transition-colors duration-200 text-lg"
          >
            Book a Free Strategy Call
            <ArrowRight className="w-5 h-5" />
          </a>
        </div>
      </section>
    </div>
  );
}
