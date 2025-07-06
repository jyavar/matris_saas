import type { Metadata } from "next";

import Footer from "@/components/footer";
import Header from "@/components/header";
import CallToAction from "@/components/home/call-to-action";
import FAQ from "@/components/home/faq";
import Hero from "@/components/home/hero";
import HomeBento from "@/components/home/home-bento";
import WallOfLove from "@/components/home/wall-of-love";
import Marketing from "@/components/marketing";

// TODO: Clean up the home page
// TODO: Refactor the everything

export const metadata: Metadata = {
  title: "BadtzUI • UI Components for React JS",
  description:
    "An expanding collection of 70+ free UI components. Production-grade animations with Framer Motion. Weekly updates. Open source. React, Tailwind, TypeScript & JavaScript.",
  openGraph: {
    title: "BadtzUI - Modern React Components",
    images: "/opengraph-image.jpg",
  },
  twitter: {
    card: "summary_large_image",
    title: "BadtzUI - UI Components for React JS",
    description:
      "An expanding collection of 70+ free UI components. Production-grade animations with Framer Motion. Weekly updates. Open source. React, Tailwind, TypeScript & JavaScript.",
    images: "/twitter-image.jpg",
    site: "@badtz_ui",
  },
};

export default async function Home() {
  return (
    <div className="bg-doc-background">
      <Marketing
        href="https://pro.badtz-ui.com"
        plausibleEvent="Clicked on Pro"
        className="text-white"
      >
        🎉&nbsp;Go Pro! Unlock Premium Badtz UI Templates, Blocks & More.
      </Marketing>
      <Header />
      <main className="max-w-5xl mx-auto">
        <Hero />
        <HomeBento />
        <WallOfLove />
        <FAQ />
        <CallToAction />
      </main>
      <Footer />
    </div>
  );
}
