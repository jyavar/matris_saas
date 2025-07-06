"use client";

import { BentoCell,BentoGrid } from "@/components/home/bento/bento-grid";
import { BentoNav } from "@/components/home/bento/bento-nav";
import {
  Visual1,
  Visual2,
  Visual3,
  Visual4,
} from "@/components/home/bento/new-visuals";
import { cn } from "@/lib/utils";

const navOptions = [
  {
    name: "Overview",
    text: "Build React interfaces faster with production-ready UI components. Perfectly integrated with Next.js. Custom Tailwind styling, zero-config setup.",
  },
  {
    name: "Components",
    text: "Access a comprehensive library of pre-built components. From buttons to complex layouts, everything you need to build beautiful interfaces.",
  },
  {
    name: "Benefits",
    text: "Save countless hours of development with our pre-designed components. Focus on your core features while we handle the UI building blocks.",
  },
  {
    name: "Integration",
    text: "Seamlessly integrate our components into your existing projects. Works with any React setup, from fresh Next.js apps to legacy codebases.",
  },
];

const features = [
  {
    title: "Lightning-Fast React Components.",
    description:
      "Production-optimized. Fits any stack - from fresh Next.js apps to legacy React.",
    visual: <Visual1 />,
  },
  {
    title: "Copy. Paste. Ship.",
    description:
      "Build React apps faster: integrate components via CLI or code snippets. No setup headaches - just plug-and-play components.",
    visual: <Visual2 />,
  },
  {
    title: "Your Design, Your Rules.",
    description:
      "Tailwind-first components with customizable animations. Style every state and breakpoint to match your brand identity.",
    visual: <Visual3 />,
  },
  {
    title: "Scale with BadtzUI Pro",
    description:
      "Ready-to-use blocks and templates for your apps, SaaS, AI tools...",
    visual: <Visual4 />,
  },
];

export default function HomeBento() {
  return (
    <section className="w-full h-full px-6 lg:px-8 pt-32 md:pb-36 pb-24">
      <div className="lg:max-w-5xl mx-auto">
        <div className="flex flex-col md:flex-row pb-12 md:gap-8">
          <div className="w-full md:w-1/2 flex md:items-center">
            <h2 className="text-4xl md:text-[44px]/[46px] font-semibold tracking-tighter bg-gradient-to-b from-white/80 via-white to-white/60 inline-block text-transparent bg-clip-text text-balance max-w-[605px] font-gilroy">
              Highlight your website in a second
            </h2>
          </div>
          <div className="w-full md:w-1/2 flex items-start justify-start">
            <BentoNav className="md:mt-0 mt-6" options={navOptions} />
          </div>
        </div>
        <BentoGrid>
          {features.map((feature, index) => (
            <BentoCell
              key={index}
              title={feature.title}
              description={feature.description}
              visual={feature.visual}
              className={cn(
                index === 1 || index === 2 ? "md:col-span-3 " : "",
                index === 1 && "max-md:h-[380px]",
                index === 3 && "max-md:max-w-[400px] w-full overflow-hidden"
              )}
            />
          ))}
        </BentoGrid>
      </div>
    </section>
  );
}
