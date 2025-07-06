"use client";

import BunnyImage from "@/components/bunny-image";
import { Meteors } from "@/components/ui/meteors";
import { Particles } from "@/components/ui/particles";
import { cn } from "@/lib/utils";

export function HeroImage() {
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
        quantity: 800,
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

  return (
    <div className="relative">
      <div className=" h-[600px] absolute -top-[300px] inset-x-0 bg-[radial-gradient(circle_at_bottom_center,#6d77d5,transparent_75%)] [mask-image:radial-gradient(circle_at_50%_65%,white,transparent)] z-[-1]">
        <Particles customOptions={customParticleOptions} className="w-full" />
        <Meteors number={5} />
      </div>
      <div
        className={cn(
          "mt-16 md:mt-20 relative h-[300px] sm:h-[400px] md:h-[600px] before:inset-x-[-200px] before:pointer-events-none before:inset-y-0 before:absolute before:z-20 before:bg-doc-background before:[mask-image:radial-gradient(ellipse_100%_75%_at_40%_20%,transparent_50%,#000_100%)] z-[1]"
        )}
      >
        <div className="absolute top-[50px] md:-top-[20px] lg:-top-[50px] left-1/2 -translate-x-1/2 w-full h-full flex items-start justify-center md:max-h-[400px] max-h-[450px] overflow-hidden">
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
        <div className="hidden md:block absolute left-0 inset-y-0 w-10 bg-gradient-to-r from-doc-background to-transparent z-5"></div>
        <div className="hidden md:block absolute right-0 inset-y-0 w-10 bg-gradient-to-l from-doc-background z-5"></div>
        <div className="hidden lg:block mx-auto border border-[#7876c5]/20 p-2 rounded-xl backdrop-blur-sm relative z-10 accent-shadow overflow-hidden">
          <BunnyImage
            src="/images/home-hero/hero-image-bui.png"
            alt="Badtz UI"
            width={1440}
            height={900}
            className="opacity-90 object-contain"
            priority
            quality={100}
          />
        </div>
        <div
          className={cn(
            "block lg:hidden absolute inset-0 lg:left-0 md:left-10 md:h-[600px] md:w-[960px] h-[400px] w-[760px] pointer-events-none z-10"
          )}
        >
          <BunnyImage
            src="/images/home-hero/hero-image-bui.png"
            alt="Badtz UI interface in dark mode"
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            quality={100}
            priority
            className="overflow-hidden object-contain object-left ml-6 opacity-90"
          />
        </div>
      </div>
    </div>
  );
}
