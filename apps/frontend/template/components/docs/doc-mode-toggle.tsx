"use client";

import { Moon,Sun } from "lucide-react";
import { useTheme } from "next-themes";
import * as React from "react";

import { cn } from "@/lib/utils";

export function DocModeToggle({ className }: { className?: string }) {
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <button
      onClick={toggleTheme}
      className={cn(
        "h-[30px] w-[30px] transition-colors bg-doc-background hover:bg-transparent dark:hover:bg-sidebar-primary flex items-center justify-center [&_svg]:pointer-events-none [&_svg]:size-[13.5px] [&_svg]:shrink-0 border border-sidebar-border rounded-md text-sidebar-primary-foreground",
        className
      )}
    >
      <Sun className="dark:rotate-0 dark:scale-100 transition-all -rotate-90 scale-0" />
      <Moon className="absolute dark:rotate-90  dark:scale-0 transition-all rotate-0scale-100" />
      <span className="sr-only">Toggle theme</span>
    </button>
  );
}
