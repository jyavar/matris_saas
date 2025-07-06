import { ExternalLinkIcon } from "lucide-react";
import Link from "next/link";

import { PlausibleButton } from "@/components/plausible-button";
import { Meteors } from "@/components/ui/meteors";
import { Particles } from "@/components/ui/particles";
import { cn } from "@/lib/utils";

const particlesColor = "#8b5cf6";
const customParticleOptions = {
  particles: {
    opacity: 0.8,
    quantity: 800,
    size: {
      value: {
        min: 0.5,
        max: 0.8,
      },
    },
    move: {
      quantity: 200,
      enable: true,
      speed: {
        min: 0.1,
        max: 0.1,
      },
      direction: "none",
      random: true,
      straight: false,
      outModes: {
        default: "out",
      },
    },
    shadow: {
      enable: true,
      color: particlesColor,
      blur: 5,
      offset: {
        x: 0,
        y: 0,
      },
    },
    glow: {
      enable: true,
      color: particlesColor,
      distance: 10,
      size: 2,
    },
  },
  interactivity: {
    detectOn: "canvas",
    events: {
      onHover: {
        enable: false,
      },
    },
  },
};

export default function CallToAction() {
  return (
    <section className="px-6 md:px-8 md:pt-48 pt-24">
      <div className="max-w-5xl mx-auto w-full overflow-hidden border border-[#7876c5]/20 border-b-0 large-accent-shadow rounded-t-2xl relative">
        <div className="text-center flex flex-col items-center md:pt-20 pt-16 pb-24">
          <div className="h-20 w-20 bg-doc-background rounded-xl border border-[#7876c5]/30 accent-shadow overflow-hidden p-4 rect-shadow">
            <svg
              width="100%"
              height="100%"
              viewBox="0 0 200 200"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M92.3848 2.8252C96.9978 0.468179 102.498 0.393862 107.166 2.60352L107.615 2.8252L190.382 45.1133C195.697 47.8297 199 53.1424 199 58.9053V141.095C199 146.677 195.9 151.837 190.874 154.624L190.382 154.887L107.615 197.175C103.002 199.533 97.5024 199.606 92.834 197.396L92.3848 197.175L9.61914 154.887C4.30297 152.17 1 146.858 1 141.095V58.9053C1 53.3225 4.1 48.1626 9.12695 45.376L9.61914 45.1133L92.3848 2.8252ZM22.2998 61.9766C18.8201 60.2288 14.5518 62.633 14.5518 66.5547V137.747C14.5518 141.23 16.5579 144.403 19.7227 146V146.001L19.7275 146.003L19.7383 146.009L90.666 181.641L90.6729 181.644L90.6807 181.647L90.6836 181.648C94.1604 183.381 98.4149 180.978 98.415 177.063V105.87C98.415 102.383 96.4049 99.2067 93.2344 97.6113H93.2334L93.2285 97.6084L22.2998 61.9766Z"
                fill="url(#paint0_linear_500_187)"
                stroke="#343434"
                strokeWidth="2"
              />
              <defs>
                <linearGradient
                  id="paint0_linear_500_187"
                  x1="-5.68349e-06"
                  y1="-22.5"
                  x2="193.5"
                  y2="231"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop offset="0.0659752" stopColor="#BBBBBD" />
                  <stop offset="0.456731" stopColor="#F3F3F3" />
                  <stop offset="0.93617" stopColor="#BBBBBD" />
                </linearGradient>
              </defs>
            </svg>
          </div>
          <h2 className="max-w-[400px] mt-8 md:max-w-[700px] text-4xl md:text-6xl lg:text-6xl font-semibold tracking-tighter font-gilroy text-balance bg-gradient-to-b from-white/80 via-white to-white/60 inline-block text-transparent bg-clip-text pb-2 ">
            Build faster.
            <br /> Build beautiful.
          </h2>
          <p className="text-balance tracking-tight mt-3 max-w-[480px] text-sidebar-muted-foreground text-base md:text-lg">
            Build beautiful websites and applications. From concept to
            production at light speed.
          </p>
          <div className="mt-8 flex gap-3.5">
            <Link
              href="/docs"
              className="h-9 px-5 shadow-sm font-medium text-sm rounded-xl bg-foreground text-background hover:bg-foreground/85 flex items-center relative transition-colors duration-300"
            >
              View Docs
            </Link>
            <Link
              target="_blank"
              href="https://pro.badtz-ui.com"
              className="h-[38px] px-5 shadow-sm font-medium text-sm rounded-xl bg-[#111113] hover:bg-[#111113]/20 text-white border border-[#7876c5]/30 hover:border-[#7876c5]/40 flex items-center relative transition-colors duration-300 accent-shadow overflow-hidden [&_svg]:size-3.5 [&_svg]:shrink-0"
            >
              <PlausibleButton
                eventName="Clicked on Pro"
                className="flex items-center justify-center gap-2 relative z-10"
              >
                BadtzUI Pro <ExternalLinkIcon />
              </PlausibleButton>
            </Link>
          </div>
        </div>
        <div className="h-[500px] absolute -bottom-1/3 inset-x-0 bg-[radial-gradient(circle_at_bottom_center,#6d77d590,transparent_65%_50%)] [mask-image:radial-gradient(circle_at_50%_65%,white,transparent)] z-10 pointer-events-none">
          <Particles customOptions={customParticleOptions} className="w-full" />
          <Meteors number={5} />
        </div>
        <div
          className={cn(
            "abnsolute h-full before:inset-x-[-100px] before:pointer-events-none before:inset-y-0 before:absolute before:z-20 before:bg-transparent z-10 overflow-hidden"
          )}
        >
          <div className="absolute -bottom-[75%] md:-bottom-[60%] left-1/2 -translate-x-1/2 w-full h-full flex items-start justify-center md:max-h-[400px] max-h-[450px] overflow-hidden z-20">
            <div>
              <svg
                width="2576"
                height="496"
                viewBox="0 0 2576 496"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path
                  d="M1288 0C1783.57 0 2235.28 187.751 2575.89 496H0.105469C340.72 187.751 792.433 0 1288 0Z"
                  fill="url(#paint0_linear_493_203)"
                  stroke="#7876c540"
                  strokeWidth="1"
                />
                <defs>
                  <linearGradient
                    id="paint0_linear_493_203"
                    x1="1288"
                    y1="-53"
                    x2="1288"
                    y2="537.5"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stopColor="#111113" />
                    <stop offset="1" stopColor="#0A0A0A" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
