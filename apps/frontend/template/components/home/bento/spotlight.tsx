import { cn } from "@/lib/utils";

interface SpotlightProps {
  rotate?: string;
  scale?: string;
  duration?: string;
  left?: string;
  height?: string;
  width?: string;
  top?: string;
  opacity?: number;
  color?: string;
  className?: string;
}

function hexToRgb(hex: string): string {
  hex = hex.replace(/^#/, "");

  const bigint = parseInt(hex, 16);
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;

  return `${r}, ${g}, ${b}`;
}

export function Spotlight({
  rotate = "0deg",
  scale = "1.02",
  duration = "8s",
  left = "0",
  top = "0",
  height = "300px",
  width = "100px",
  opacity = 0.75,
  color = "#ffffff",
  className,
}: SpotlightProps) {
  const rgbColor = hexToRgb(color);
  const accentCore = `rgba(${rgbColor}, 0.6)`;
  const accentGlow = `rgba(109, 119, 213, 0.9)`;
  const accentFringe = `rgba(109, 119, 213, 0.5)`;

  return (
    <div
      className={cn("animate-spotlight", className)}
      aria-hidden
      style={
        {
          "--rotate": rotate,
          "--scale": scale,
          "--duration": duration,
          position: "absolute",
          zIndex: 10,
          top: top,
          left: left,
          width: width,
          height: height,
          backgroundImage: `
          conic-gradient(
            from 0deg at 50% 50%,
            transparent 165deg,
            ${accentFringe} 170deg,
            ${accentGlow} 175deg,
            ${accentCore} 180deg,
            ${accentGlow} 185deg,
            ${accentFringe} 190deg,
            transparent 195deg
          ),
          conic-gradient(
            from 0deg at 50% 50%,
            transparent 165deg,
            rgba(255,255,255,0.15) 170deg,
            ${accentCore} 175deg,
            rgba(255,255,255,0.6) 180deg,
            ${accentCore} 185deg,
            rgba(255,255,255,0.15) 190deg,
            transparent 195deg
          )`,
          opacity: opacity,
          filter: "blur(20px)",
          transform: "translate(-50%, -50%)",
          pointerEvents: "none",
          transformOrigin: "50% 50%",
          mixBlendMode: "plus-lighter",
        } as React.CSSProperties
      }
    ></div>
  );
}
