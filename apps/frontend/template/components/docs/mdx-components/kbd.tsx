import { HTMLAttributes } from "react";

import { cn } from "@/lib/utils";

interface KbdProps extends HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
}

export function Kbd({ children, className, ...props }: KbdProps) {
  return (
    <kbd
      className={cn(
        "h-5 items-center gap-1 border-sidebar-border mx-[1px] rounded border px-1.5 py-[3px] text-[12px] font-medium text-muted-foreground bg-sidebar",
        className
      )}
      {...props}
    >
      {children}
    </kbd>
  );
}
