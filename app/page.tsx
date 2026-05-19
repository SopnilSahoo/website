import type { Metadata } from "next";
import Hero from "@/components/sections/Hero";
import ServicesGrid from "@/components/sections/ServicesGrid";
import Stats from "@/components/sections/Stats";
import Testimonials from "@/components/sections/Testimonials";
import CTA from "@/components/sections/CTA";
import FAQ from "@/components/sections/FAQ";

export const metadata: Metadata = {
  title: "Reach Digitally Agency | AI-Powered Digital Marketing in Bhubaneswar",
  description:
    "AI-powered digital marketing agency in Bhubaneswar. We offer Social Media Marketing, SEO & AEO, Performance Marketing, Branding & Identity, and Website Development.",
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <ServicesGrid />
      <Stats />
      <Testimonials />
      <CTA />
      <FAQ />
    </>
  );
}
