"use client";

import React, { CSSProperties,useEffect, useRef } from "react";

import { cn } from "@/lib/utils";

interface CircleBeamProps {
  lightWidth?: number;
  duration?: number;
  lightColor?: string;
  borderWidth?: number;
  className?: string;
  [key: string]: any;
}

export function CircleBeam({
  lightWidth = 200,
  duration = 10,
  lightColor = "#FAFAFA",
  borderWidth = 1,
  className,
  ...props
}: CircleBeamProps) {
  const pathRef = useRef<HTMLDivElement>(null);

  const updatePath = () => {
    if (pathRef.current) {
      const div = pathRef.current;
      const radius = div.offsetWidth / 2 - borderWidth;
      const cx = div.offsetWidth / 2;
      const cy = div.offsetHeight / 2;
      div.style.setProperty(
        "--path",
        `path("M ${cx},${cy} m -${radius},0 a ${radius},${radius} 0 1,0 ${
          radius * 2
        },0 a ${radius},${radius} 0 1,0 -${radius * 2},0")`
      );
    }
  };

  useEffect(() => {
    updatePath();
    window.addEventListener("resize", updatePath);

    return () => {
      window.removeEventListener("resize", updatePath);
    };
  }, [borderWidth]);

  return (
    <div
      style={
        {
          "--duration": duration,
          "--light-width": `${lightWidth}px`,
          "--border-width": `${borderWidth}px`,
          "--light-color": lightColor,
        } as CSSProperties
      }
      ref={pathRef}
      className={cn(
        `absolute rounded-full z-0 w-full h-full`,
        `after:content-[''] after:absolute after:inset-[var(--border-width)] after:rounded-full`,
        "![mask-clip:padding-box,border-box] border-[length:var(--border-width)]",
        "![mask-composite:intersect] [mask:linear-gradient(transparent,transparent),linear-gradient(red,red)]",

        `before:border-black/10 dark:before:border-sidebar-border before:absolute before:inset-0 before:rounded-full before:z-[-1] before:border-[length:var(--border-width)]`,
        className
      )}
      {...props}
    >
      <div
        className="absolute inset-0 animate-border-beam-reverse bg-[radial-gradient(ellipse_at_center,var(--light-color),transparent,transparent)]"
        style={{
          offsetPath: "var(--path)",
          offsetDistance: "0%",
          width: "var(--light-width)",
        }}
      />
    </div>
  );
}
