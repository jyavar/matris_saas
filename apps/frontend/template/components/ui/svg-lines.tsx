"use client";

// TODO: Fix this, ugly
import { motion } from "framer-motion";
import { useId } from "react";

import { cn } from "@/lib/utils";

export interface SvgLinesProps {
  className?: string;
  path: string;
  pathColor?: string;
  pathOpacity?: number;
  gradientStartColor?: string;
  gradientStopColor?: string;
  delay?: number;
  duration?: number;
  viewBox?: string;
}

export const SvgLines: React.FC<SvgLinesProps> = ({
  className,
  path,
  duration = 10,
  delay = 2,
  pathColor = "#7876c5",
  pathOpacity = 0.8,
  gradientStartColor = "#7876c5",
  gradientStopColor = "#7876c5",
  viewBox = "0 0 195 200",
}) => {
  const id = useId();

  return (
    <svg
      fill="none"
      width="100%"
      height="100%"
      xmlns="http://www.w3.org/2000/svg"
      className={cn(
        "pointer-events-none absolute inset-0 transform-gpu",
        className
      )}
      viewBox={viewBox}
      preserveAspectRatio="xMidYMid meet"
    >
      <path
        d={path}
        stroke={pathColor}
        strokeWidth="1"
        strokeOpacity={pathOpacity}
        strokeLinecap="round"
        vectorEffect="non-scaling-stroke"
      />
      <path
        d={path}
        strokeWidth="1"
        stroke={`url(#${id})`}
        strokeOpacity="1"
        strokeLinecap="round"
        vectorEffect="non-scaling-stroke"
      />
      <defs>
        <motion.linearGradient
          className="transform-gpu"
          id={id}
          gradientUnits="userSpaceOnUse"
          initial={{
            x1: "-10%",
            x2: "-10%",
            y1: "0%",
            y2: "0%",
          }}
          animate={{
            x1: ["-10%", "110%"],
            x2: ["0%", "120%"],
            y1: ["0%", "0%"],
            y2: ["0%", "0%"],
          }}
          transition={{
            delay,
            duration,
            ease: [0.16, 1, 0.3, 1],
            repeat: Infinity,
            repeatDelay: 0,
          }}
        >
          <stop stopColor={gradientStartColor} stopOpacity="0"></stop>
          <stop
            offset="20%"
            stopColor={gradientStartColor}
            stopOpacity="0.3"
          ></stop>
          <stop
            offset="50%"
            stopColor={gradientStopColor}
            stopOpacity="0.7"
          ></stop>
          <stop
            offset="80%"
            stopColor={gradientStartColor}
            stopOpacity="1"
          ></stop>
          <stop
            offset="100%"
            stopColor={gradientStartColor}
            stopOpacity="0"
          ></stop>
        </motion.linearGradient>
      </defs>
    </svg>
  );
};
