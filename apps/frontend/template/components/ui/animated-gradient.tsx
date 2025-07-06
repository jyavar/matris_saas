"use client";

import React, { useEffect, useRef } from "react";

import { Gradient } from "@/lib/gradient";

interface GradientType {
  initGradient: (canvas: HTMLCanvasElement | string) => void;
}

interface AnimatedGradientProps {
  color1?: string;
  color2?: string;
  color3?: string;
  color4?: string;
}

export function AnimatedGradient({
  color1 = "#a960ee",
  color2 = "#ff333d",
  color3 = "#90e0ff",
  color4 = "#ffcb57",
}: AnimatedGradientProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const gradient = new (Gradient as unknown as { new (): GradientType })();
    if (canvasRef.current) {
      gradient.initGradient(canvasRef.current);
    }
  }, [color1, color2, color3, color4]);

  return (
    <canvas
      ref={canvasRef}
      style={
        {
          "--gradient-color-1": color1,
          "--gradient-color-2": color2,
          "--gradient-color-3": color3,
          "--gradient-color-4": color4,
        } as React.CSSProperties
      }
      className="inset-0 w-full h-full absolute z-0 rounded-[inherit]"
    />
  );
}
