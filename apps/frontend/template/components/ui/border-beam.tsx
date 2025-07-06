"use client";

import React, { CSSProperties,useEffect, useRef } from "react";

import { cn } from "@/lib/utils";

interface BorderBeamProps {
  lightWidth?: number;
  duration?: number;
  lightColor?: string;
  borderWidth?: number;
  className?: string;
  [key: string]: any;
}

export function BorderBeam({
  lightWidth = 200,
  duration = 10,
  lightColor = "#FAFAFA",
  borderWidth = 1,
  className,
  ...props
}: BorderBeamProps) {
  const pathRef = useRef<HTMLDivElement>(null);

  const updatePath = () => {
    if (pathRef.current) {
      const div = pathRef.current;
      div.style.setProperty(
        "--path",
        `path("M 0 0 H ${div.offsetWidth} V ${div.offsetHeight} H 0 V 0")`
      );
    }
  };

  useEffect(() => {
    updatePath();
    window.addEventListener("resize", updatePath);

    return () => {
      window.removeEventListener("resize", updatePath);
    };
  }, []);

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
        `absolute rounded-[inherit] z-0 w-full h-full`,
        `after:content-[''] after:absolute after:inset-[var(--border-width)] after:rounded-[inherit]`,
        "![mask-clip:padding-box,border-box] border-[length:var(--border-width)]",
        "![mask-composite:intersect] [mask:linear-gradient(transparent,transparent),linear-gradient(red,red)]",

        `before:border-black/10 dark:before:border-sidebar-border before:absolute before:inset-0 before:rounded-[inherit] before:z-[-1] before:border-[length:var(--border-width)]`,
        className
      )}
      {...props}
    >
      <div
        className="absolute w-full inset-0 animate-border-beam bg-[radial-gradient(ellipse_at_center,var(--light-color),transparent,transparent)]"
        style={{
          offsetPath: "var(--path)",
          offsetDistance: "0%",
          width: "var(--light-width)",
        }}
      />
    </div>
  );
}
