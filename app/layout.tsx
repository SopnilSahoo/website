import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import StickyCallButton from "@/components/ui/StickyCallButton";
import { ConditionalNav, ConditionalMain } from "@/components/layout/ConditionalLayout";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Reach Digitally Agency | AI-Powered Digital Marketing in Bhubaneswar",
    template: "%s | Reach Digitally Agency",
  },
  description:
    "Reach Digitally Agency is an AI-powered digital marketing agency in Bhubaneswar offering Social Media Marketing, SEO & AEO, Performance Marketing, Branding, and Website Development.",
  keywords: [
    "digital marketing agency Bhubaneswar",
    "SEO agency Odisha",
    "social media marketing Bhubaneswar",
    "performance marketing agency India",
    "branding agency Bhubaneswar",
    "AI digital marketing",
    "Reach Digitally Agency",
  ],
  authors: [{ name: "Reach Digitally Agency" }],
  creator: "Reach Digitally Agency",
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://reachdigitally.agency",
    siteName: "Reach Digitally Agency",
    title: "Reach Digitally Agency | AI-Powered Digital Marketing",
    description:
      "AI-powered digital marketing agency in Bhubaneswar helping brands dominate search, social, and beyond.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Reach Digitally Agency | AI-Powered Digital Marketing",
    description:
      "AI-powered digital marketing agency in Bhubaneswar helping brands dominate search, social, and beyond.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.className} h-full`}>
      <body className="min-h-full flex flex-col bg-[#0a0a0a] text-white">
        <ConditionalNav><Navbar /></ConditionalNav>
        <ConditionalMain>{children}</ConditionalMain>
        <ConditionalNav><Footer /></ConditionalNav>
        <ConditionalNav><StickyCallButton /></ConditionalNav>
      </body>
    </html>
  );
}
