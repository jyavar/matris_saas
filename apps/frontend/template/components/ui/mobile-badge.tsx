"use client";

import { cn } from "@/lib/utils";

const variants: Record<string, { text: string; classes: string }> = {
  new: {
    text: "New",
    classes: "bg-[#10b981]",
  },
  pro: {
    text: "Pro",
    classes: "bg-[#5e6ad2]",
  },
  hot: {
    text: "Hot",
    classes: "bg-[#ff7235]",
  },
  soon: {
    text: "Soon",
    classes: "bg-[#d9d9d9] dark:bg-[#343639]",
  },
};

interface MobileBadgeProps {
  className?: string;
  variant?: keyof typeof variants;
}

export function MobileBadge({ className, variant = "pro" }: MobileBadgeProps) {
  const variantData = variants[variant];

  if (!variantData) {
    return null;
  }

  const { text, classes } = variantData;

  return (
    <div className="md:hidden">
      <span
        className={cn(
          "ml-auto rounded-[3px] cursor-default px-1.5 py-[2px] flex items-center justify-center font-light text-white text-[10px] leading-none",
          classes,
          className
        )}
      >
        {text}
      </span>
    </div>
  );
}
