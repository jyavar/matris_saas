"use client";

import { Check, Lightbulb,X } from "lucide-react";

import { cn } from "@/lib/utils";

export function EmojiCheck({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "h-[18px] w-[18px] shrink-0 rounded-full bg-green-500 inline-flex items-center justify-center [&_svg]:size-3 text-white mr-1.5",
        className,
      )}
    >
      <Check strokeWidth={4} />
    </span>
  );
}

export function EmojiCross({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "h-[18px] w-[18px] shrink-0 rounded-full bg-red-500 inline-flex items-center justify-center [&_svg]:size-3 text-white mr-1.5",
        className,
      )}
    >
      <X strokeWidth={4} />
    </span>
  );
}

export function EmojiIdea({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "h-[18px] w-[18px] shrink-0 rounded-full bg-yellow-500 inline-flex items-center justify-center [&_svg]:size-3 text-white mr-1.5",
        className,
      )}
    >
      <Lightbulb strokeWidth={4} />
    </span>
  );
}
