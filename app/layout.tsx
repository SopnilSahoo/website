import type { Metadata } from "next";
import { Cormorant_Garamond, DM_Sans } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import StickyButtons from "@/components/ui/StickyButtons";
import PageLoader from "@/components/ui/PageLoader";
import SmoothScrollProvider from "@/components/providers/SmoothScrollProvider";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
  variable: "--font-cormorant",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  display: "swap",
  variable: "--font-dm-sans",
});

export const metadata: Metadata = {
  title: {
    default: "Sreenivasa Sonthalia Ecorise | Ultra-Luxury 3 & 4 BHK in Hyderabad",
    template: "%s | Sonthalia Ecorise",
  },
  description:
    "Experience Sreenivasa Sonthalia Ecorise — ultra-luxury 3 & 4 BHK residences in Gaganpahad, Rajendranagar, Hyderabad. 2,790–4,695 sq.ft. premium apartments on 6.36 acres. RERA: P02400010642.",
  keywords: [
    "Sreenivasa Sonthalia Ecorise",
    "luxury apartments Hyderabad",
    "3 BHK Rajendranagar",
    "4 BHK Gaganpahad Hyderabad",
    "Sreenivasa Constructions",
    "premium flats Hyderabad",
    "luxury residences Financial District",
    "RERA P02400010642",
  ],
  authors: [{ name: "Sreenivasa Constructions" }],
  creator: "Sreenivasa Constructions",
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://sreenivasaecorise.com",
    siteName: "Sreenivasa Sonthalia Ecorise",
    title: "Sreenivasa Sonthalia Ecorise | Ultra-Luxury Residences in Hyderabad",
    description:
      "Premium 3 & 4 BHK residences in the heart of Rajendranagar. Curated living across 6.36 acres of elegance.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sreenivasa Sonthalia Ecorise | Ultra-Luxury Residences",
    description:
      "Premium 3 & 4 BHK residences in Gaganpahad, Rajendranagar, Hyderabad.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${dmSans.variable} h-full`}
    >
      <body
        className="min-h-full flex flex-col bg-[#06070a] text-[#f5f0e8] font-sans-body"
        style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}
      >
        <SmoothScrollProvider>
          <PageLoader />
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
          <StickyButtons />
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
