"use client";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

const variants: Record<
  string,
  { text: string; description: string; classes: string }
> = {
  new: {
    text: "New",
    description: "New",
    classes: "bg-[#10b981]",
  },
  pro: {
    text: "Pro",
    description: "Pro",
    classes: "bg-[#5e6ad2]",
  },
  hot: {
    text: "Hot",
    description: "Trending 🔥",
    classes: "bg-[#ff7235]",
  },
  soon: {
    text: "Soon",
    description: "Coming soon",
    classes: "bg-[#d9d9d9] dark:bg-[#343639]",
  },
};

interface BadgeProps {
  className?: string;
  variant?: keyof typeof variants;
}

export function Badge({ className, variant = "pro" }: BadgeProps) {
  const variantData = variants[variant];

  if (!variantData) {
    return null;
  }

  const { description, classes } = variantData;

  return (
    <div className="hidden md:block">
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <span
              className={cn(
                "ml-auto rounded-[3px] cursor-default h-3 w-3 flex items-center justify-center font-light text-white text-[8px] pt-[1px]",
                classes,
                className
              )}
            >
              !
            </span>
          </TooltipTrigger>
          <TooltipContent>
            <p>{description}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
}
