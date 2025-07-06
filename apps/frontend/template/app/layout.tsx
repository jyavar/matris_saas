import "./globals.css";

import { GeistMono } from "geist/font/mono";
import { GeistSans } from "geist/font/sans";
import type { Metadata } from "next";
import localFont from "next/font/local";
import PlausibleProvider from "next-plausible";

import { ThemeController } from "@/components/layout/theme-controller";
import { Toaster } from "@/components/ui/toaster";

export const metadata: Metadata = {
  title: "BadtzUI • UI Components for React JS",
  description:
    "An expanding collection of 70+ free UI components. Production-grade animations with Framer Motion. Daily updates. Open source. React, Tailwind, TypeScript & JavaScript.",
  metadataBase: new URL("https://badtz-ui.com"),
  openGraph: {
    title: "BadtzUI - Modern React Components",
    images: [{ url: "/opengraph-image.jpg", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "BadtzUI - UI Components for React JS",
    description:
      "An expanding collection of 70+ free UI components. Production-grade animations with Framer Motion. Daily updates. Open source. React, Tailwind, TypeScript & JavaScript.",
    images: [{ url: "/twitter-image.jpg", width: 1200, height: 675 }],
    site: "@badtz_ui",
  },
};

const Gilroy = localFont({
  variable: "--font-gilroy",
  display: "swap",
  src: [
    {
      path: "../fonts/font.woff2",
      weight: "600",
      style: "semibold",
    },
  ],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <PlausibleProvider domain="badtz-ui.com" taggedEvents />

        <script
          defer
          data-domain="badtz-ui.com"
          data-api="/plausible/api/event"
          src="/plausible/js/script.js"
        ></script>
        <link rel="icon" href="/favicon.ico" type="image/x-icon" />
      </head>
      <body className={`${GeistSans.className} ${Gilroy.variable}`}>
        <ThemeController
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Toaster />
        </ThemeController>
      </body>
    </html>
  );
}
