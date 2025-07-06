"use client";

import { MoonIcon, SunIcon } from "@radix-ui/react-icons";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import * as React from "react";

import { cn } from "@/lib/utils";

export function ModeToggle({ className }: { className?: string }) {
  const { theme, setTheme } = useTheme();
  const pathname = usePathname();

  const isHomePage = pathname === "/";

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <button
      onClick={toggleTheme}
      disabled={isHomePage}
      className={cn(
        "h-8 w-8 hover:bg-sidebar-accent transition-colors flex items-center justify-center rounded-md [&_svg]:pointer-events-none [&_svg]:size-3.5 [&_svg]:shrink-0 border border-sidebar-border text-foreground bg-transparent",
        isHomePage && "opacity-50 cursor-not-allowed",
        className
      )}
    >
      <SunIcon className="rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      <MoonIcon className="absolute rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
      <span className="sr-only">Toggle theme</span>
    </button>
  );
}
