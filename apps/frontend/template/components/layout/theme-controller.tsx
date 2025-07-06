"use client";

import { usePathname } from "next/navigation";
import type { ThemeProviderProps } from "next-themes";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import * as React from "react";

export function ThemeController({ children, ...props }: ThemeProviderProps) {
  const pathname = usePathname();
  const isHomePage = pathname === "/";

  return (
    <NextThemesProvider
      forcedTheme={isHomePage ? "dark" : undefined}
      {...props}
    >
      {children}
    </NextThemesProvider>
  );
}
