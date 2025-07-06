"use client";

import {
  FontBoldIcon,
  FontItalicIcon,
  Link2Icon,
  UnderlineIcon,
} from "@radix-ui/react-icons";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

import BunnyImage from "@/components/bunny-image";
import KeyboardCell from "@/components/home/bento/keyboard";
import {
  Part1,
  Part2,
  Part3,
  Part4,
  Part5,
  Part6,
  Part7,
  Part8,
  Part9,
} from "@/components/home/bento/split-logo";
import { BorderBeam } from "@/components/ui/border-beam";
import { cn } from "@/lib/utils";

interface ChartProps {
  vibrantColor?: string;
  softColor?: string;
  gridColor?: string;
}

interface LayerProps {
  color: string;
  softColor?: string;
  hovered?: boolean;
}

export function Visual1() {
  return (
    <div className="relative h-full w-full">
      <div className="absolute left-1/2 -translate-x-1/2 top-[40%] md:top-[40%] translate-y-[-50%] w-[170px] md:w-[150px] aspect-square rounded-[2rem] overflow-hidden bg-accent/5 cpu-shadow  flex items-center justify-center">
        <BorderBeam lightColor="#7876c5" lightWidth={200} duration={2} />
        <div className="absolute w-[145px] md:w-[130px] rounded-[1.5rem] aspect-square accent-shadow overflow-hidden bg-accent/5">
          <BorderBeam lightColor="#7876c5" lightWidth={150} duration={3} />
          <BunnyImage
            src="/images/home-bento/badtz-cpu.webp"
            alt="CPU"
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-contain opacity-90"
          />
        </div>
      </div>
    </div>
  );
}

export function Visual2() {
  return (
    <div className="relative h-full w-full">
      <div className="absolute left-[15%] top-[15%]">
        <KeyboardCell />
      </div>
    </div>
  );
}

export function Visual3() {
  const [activeColor, setActiveColor] = useState({
    vibrant: "#5C67C7",
  });

  const colors = [
    { vibrant: "#6C79FF" },
    { vibrant: "#7477F0" },
    { vibrant: "#6E79D6" },
    { vibrant: "#5E6AD2" },
    { vibrant: "#666BE2" },
    { vibrant: "#5C67C7" },
    { vibrant: "#575BC7" },
    { vibrant: "#37466C" },
    { vibrant: "#2A2B51" },
    { vibrant: "#222342" },
  ];

  return (
    <div className={cn("h-full w-full cell3-bg")}>
      <Link
        href="/docs/components/animated-cards/animated-card-3"
        className="absolute z-30 top-6 right-6 bg-sidebar text-xs pl-2 pr-3 py-1.5 rounded-full flex items-center gap-2 border border-[#7876c5]/20 text-muted-foreground abs-accent-shadow overflow-hidden"
      >
        <span
          className="h-2.5 w-2.5 rounded-full transition-colors"
          style={{ backgroundColor: `${activeColor.vibrant}` }}
        ></span>
        <span>Animated Card 3</span>
      </Link>
      <div aria-hidden className="absolute inset-x-0 top-0 h-[80%] z-20">
        <Chart vibrantColor={activeColor.vibrant} />
      </div>
      <div
        aria-hidden
        className="absolute z-20 top-6 left-6 rounded-lg bg-sidebar backdrop-blur-sm border border-[#7876c5]/20 text-sm text-sidebar-muted-foreground font-light abs-accent-shadow overflow-hidden"
      >
        <div className="py-2 px-3  border-b border-[#7876c5]/20">
          <span className="text-foreground">Customize</span>
        </div>
        <div className="flex justify-between items-center px-3 py-2 gap-2 border-b border-[#7876c5]/20">
          <span className="text-foreground">Text</span>
          <div className="flex items-center [&>svg]:size-3 gap-1">
            <div className="p-0.5 rounded">
              <FontBoldIcon />
            </div>
            <div className="bg-muted p-0.5 rounded">
              <Link2Icon />
            </div>
            <div className="p-0.5 rounded">
              <FontItalicIcon />
            </div>
            <div className="p-0.5 rounded">
              <UnderlineIcon />
            </div>
          </div>
        </div>
        <div className="grid grid-cols-5 grid-rows-2 p-3 gap-2">
          {colors.map((color, index) => (
            <div
              key={index}
              className={`h-5 w-5 rounded cursor-pointer transition-all duration-300 ${
                activeColor.vibrant === color.vibrant
                  ? "ring-1 ring-blue-500"
                  : ""
              }`}
              style={{ backgroundColor: color.vibrant }}
              onClick={() => setActiveColor(color)}
            ></div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function Visual4() {
  return (
    <div className="relative h-full w-full">
      <Link
        href="https://pro.badtz-ui.com"
        className="absolute top-6 left-6 text-xs py-1 pl-3 pr-2 z-10 bg-gradient-to-b from-[#6d77d5] to-[#5c67c7] border border-[#6d77d5] rounded-full font-medium shadow-[0_0px_100px_rgba(109,_119,_213,_0.9)] before:shadow-[0_0px_20px_rgba(109,_119,_213,_0.9)] before:inset-0 before:absolute before:z-[-1] before:rounded-[inherit] opacity-100 transition-opacity duration-300 group-hover:opacity-0 text-white flex items-center gap-0.5 [&_svg]:size-3"
      >
        Explore <ArrowUpRight />
      </Link>
      <div className="absolute inset-x-4 lg:inset-x-12 top-[50px] md:top-6 grid grid-cols-5 grid-rows-6 gap-1 w-[274px] h-[320px] mx-auto">
        {Array.from({ length: 25 }).map((_, index) => (
          <div
            key={index}
            className={cn(
              "h-[50px] w-[50px] aspect-square transition-transform duration-150 rounded hover:rotate-[15deg] overflow-hidden",
              index === 2 ||
                index === 4 ||
                index === 6 ||
                index === 7 ||
                index === 10 ||
                index === 11 ||
                index === 13 ||
                index === 16 ||
                index === 17 ||
                index === 18 ||
                index === 20 ||
                index === 21
                ? "border border-sidebar-border/70"
                : "",
              index === 2 || index === 14 || index === 15 || index === 21
                ? "border-sidebar-border/70 shadow-[0px_2px_30px_0px_#7876c540]"
                : "",
              index === 8 || index === 12 || index === 14 || index === 15
                ? "border border-sidebar-border/70 bg-[#21222550]"
                : "",
              index === 12 &&
                "flex flex-col items-center justify-center text-foreground"
            )}
          >
            {index === 6 && <Part1 />}
            {index === 7 && <Part2 />}
            {index === 8 && <Part3 />}
            {index === 11 && <Part4 />}
            {index === 12 && <Part5 />}
            {index === 13 && <Part6 />}
            {index === 16 && <Part7 />}
            {index === 17 && <Part8 />}
            {index === 18 && <Part9 />}
          </div>
        ))}
      </div>
    </div>
  );
}

function Chart({
  vibrantColor = "#ffffff",
  softColor = "#ffffff",
}: ChartProps) {
  const [hovered, setHovered] = useState(false);

  return (
    <>
      <div
        className="inset-0 absolute z-10"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={
          {
            "--color": vibrantColor,
            "--secondary-color": softColor,
          } as React.CSSProperties
        }
      />

      <div className="w-full h-full relative">
        <SvgChart
          color={vibrantColor}
          softColor={softColor}
          hovered={hovered}
        />
        <EllipseGradient color={vibrantColor} />
      </div>
    </>
  );
}

const SvgChart: React.FC<LayerProps> = ({ color, hovered }) => {
  const rectsData = [
    {
      width: 23,
      height: 34,
      y: 172,
      hoverHeight: 34,
      hoverY: 206,
      x: 80,
      fill: "currentColor",
      hoverFill: "currentColor",
    },
    {
      width: 23,
      height: 34,
      y: 138,
      hoverHeight: 34,
      hoverY: 206,
      x: 110,
      fill: color,
      hoverFill: color,
    },
    {
      width: 23,
      height: 68,
      y: 104,
      hoverHeight: 51,
      hoverY: 189,
      x: 140,
      fill: color,
      hoverFill: color,
    },
    {
      width: 23,
      height: 51,
      y: 121,
      hoverHeight: 85,
      hoverY: 155,
      x: 170,
      fill: color,
      hoverFill: color,
    },
    {
      width: 23,
      height: 51,
      y: 172,
      hoverHeight: 68,
      hoverY: 172,
      x: 200,
      fill: "currentColor",
      hoverFill: "currentColor",
    },
    {
      width: 23,
      height: 85,
      y: 172,
      hoverHeight: 34,
      hoverY: 206,
      x: 230,
      fill: "currentColor",
      hoverFill: "currentColor",
    },
    {
      width: 23,
      height: 85,
      y: 87,
      hoverHeight: 51,
      hoverY: 189,
      x: 260,
      fill: color,
      hoverFill: color,
    },
    {
      width: 23,
      height: 51,
      y: 121,
      hoverHeight: 34,
      hoverY: 206,
      x: 290,
      fill: color,
      hoverFill: color,
    },
    {
      width: 23,
      height: 34,
      y: 172,
      hoverHeight: 68,
      hoverY: 172,
      x: 320,
      fill: "currentColor",
      hoverFill: "currentColor",
    },
    {
      width: 23,
      height: 68,
      y: 104,
      hoverHeight: 102,
      hoverY: 138,
      x: 350,
      fill: color,
      hoverFill: color,
    },
    {
      width: 23,
      height: 51,
      y: 172,
      hoverHeight: 119,
      hoverY: 121,
      x: 380,
      fill: "currentColor",
      hoverFill: "currentColor",
    },
    {
      width: 23,
      height: 85,
      y: 172,
      hoverHeight: 85,
      hoverY: 155,
      x: 410,
      fill: "currentColor",
      hoverFill: "currentColor",
    },
    {
      width: 23,
      height: 34,
      y: 172,
      hoverHeight: 136,
      hoverY: 104,
      x: 440,
      fill: "currentColor",
      hoverFill: "currentColor",
    },
    {
      width: 23,
      height: 51,
      y: 121,
      hoverHeight: 153,
      hoverY: 87,
      x: 470,
      fill: color,
      hoverFill: color,
    },
  ];

  return (
    <div
      className={cn(
        "w-[606px] h-[306px] absolute left-[53%] -translate-x-1/2 flex items-center justify-center transition-transform duration-500 ease-[cubic-bezier(0.6, 0.6, 0, 1)] z-[8] dark:text-[#292A35] text-[#FAFAFC] scale-[0.6] md:scale-[0.8] lg:scale-100",
        "top-[30px] md:top-[-15px] lg:top-0 rect-shadow",
        hovered && "scale-[0.75] md:scale-[0.95] lg:scale-[1.25] translate-y-6"
      )}
    >
      <svg
        width="606"
        height="306"
        xmlns="http://www.w3.org/2000/svg"
        className=""
      >
        {rectsData.map((rect, index) => (
          <rect
            key={index}
            width={hovered ? 23 : rect.width}
            height={hovered ? rect.hoverHeight : rect.height}
            x={rect.x}
            y={hovered ? rect.hoverY : rect.y}
            fill={hovered ? rect.hoverFill : rect.fill}
            rx="5"
            ry="5"
            className="transition-all duration-500 ease-[cubic-bezier(0.6, 0.6, 0, 1)]"
          />
        ))}
      </svg>
    </div>
  );
};

const EllipseGradient: React.FC<{ color: string }> = ({ color }) => {
  return (
    <div className="w-full h-full z-[5] absolute inset-0 flex items-center justify-center">
      <svg
        width="600"
        height="350"
        viewBox="0 0 600 350"
        fill="none"
        className="opacity-10"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g filter="url(#filter0_f_197_56)">
          <ellipse cx="300" cy="175" rx="200" ry="75" fill={color} />
        </g>
        <defs>
          <filter
            id="filter0_f_197_56"
            x="0"
            y="0"
            width="600"
            height="350"
            filterUnits="userSpaceOnUse"
            colorInterpolationFilters="sRGB"
          >
            <feFlood floodOpacity="0" result="BackgroundImageFix" />
            <feBlend
              mode="normal"
              in="SourceGraphic"
              in2="BackgroundImageFix"
              result="shape"
            />
            <feGaussianBlur
              stdDeviation="50"
              result="effect1_foregroundBlur_197_56"
            />
          </filter>
        </defs>
      </svg>
    </div>
  );
};
