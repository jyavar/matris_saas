"use client";
import { usePlausible } from "next-plausible";
import { ButtonHTMLAttributes, ReactNode } from "react";

import { cn } from "@/lib/utils";

interface PlausibleButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  eventName: string;
  children: ReactNode;
  className?: string;
}

export function PlausibleButton({
  eventName,
  className,
  children,
}: PlausibleButtonProps) {
  const plausible = usePlausible();
  return (
    <button
      onClick={() => {
        plausible(eventName);
      }}
      className={cn(className)}
    >
      {children}
    </button>
  );
}
