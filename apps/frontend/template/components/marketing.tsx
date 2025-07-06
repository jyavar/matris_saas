"use client";

import Link from "next/link";
import { usePlausible } from "next-plausible";

import { cn } from "@/lib/utils";

interface MarketingProps {
  href: string;
  className?: string;
  children: React.ReactNode;
  plausibleEvent?: string;
}

export default function Marketing({
  href,
  children,
  className,
  plausibleEvent,
}: MarketingProps) {
  const plausible = usePlausible();
  return (
    <Link
      href={href}
      target="_blank"
      className={cn(
        "text-center text-[13.5px] relative w-full flex items-center justify-center border-b border-sidebar-border/70 accent-shadow",
        className
      )}
    >
      <button
        onClick={(e) => {
          e.stopPropagation();
          if (plausibleEvent) {
            plausible(plausibleEvent);
          }
        }}
        className="h-full w-full px-4 py-1.5"
      >
        <span>{children}</span>
      </button>
    </Link>
  );
}
