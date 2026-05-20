import type { Metadata } from "next";
import Hero from "@/components/sections/Hero";
import ProjectOverview from "@/components/sections/ProjectOverview";
import Gallery from "@/components/sections/Gallery";
import Amenities from "@/components/sections/Amenities";
import Configurations from "@/components/sections/Configurations";
import Specifications from "@/components/sections/Specifications";
import Location from "@/components/sections/Location";
import Developer from "@/components/sections/Developer";
import Inquiry from "@/components/sections/Inquiry";

export const metadata: Metadata = {
  title: "Sreenivasa Sonthalia Ecorise | Ultra-Luxury 3 & 4 BHK in Hyderabad",
  description:
    "Premium 3 & 4 BHK residences in Gaganpahad, Rajendranagar, Hyderabad. 2,790–4,695 sq.ft. on 6.36 acres. RERA: P02400010642.",
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <ProjectOverview />
      <Gallery />
      <Amenities />
      <Configurations />
      <Specifications />
      <Location />
      <Developer />
      <Inquiry />
    </>
  );
}
