"use client";

import { motion } from "framer-motion";
import { useState } from "react";

import { cn } from "@/lib/utils";

interface BookmarkButtonProps {
  className?: string;
}

export function BookmarkButton({
  className,
}: BookmarkButtonProps): JSX.Element {
  const [isHovered, setIsHovered] = useState<boolean>(false);

  return (
    <div className={cn("w-full flex justify-end pr-8", className)}>
      <kbd
        className="flex items-center bg-white dark:bg-background justify-center p-0.5 rounded-lg border border-border cursor-default ml-4 w-min"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="h-8 w-8 select-none pt-[1px] gap-1 rounded-md bg-secondary px-1.5 font-mono text-[12px] font-medium flex items-center">
          <span className="text-xs text-[16px]">⌘</span>D
        </div>
        <motion.span
          className="text-sm text-muted-foreground font-mono overflow-hidden pointer-events-none select-none"
          initial={{ opacity: 0, x: -20, width: 0 }}
          animate={{
            opacity: isHovered ? 1 : 0,
            x: isHovered ? 0 : -20,
            width: isHovered ? "auto" : 0,
          }}
          transition={{ duration: 0.3 }}
        >
          {"\u00A0"}Bookmark{"\u00A0"}
        </motion.span>
      </kbd>
    </div>
  );
}
