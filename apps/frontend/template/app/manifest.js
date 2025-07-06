export default function manifest() {
  return {
    name: "BadtzUI • UI Components for React JS",
    short_name: "BadtzUI",
    description:
      "An expanding collection of 70+ free UI components. Production-grade animations with Framer Motion. Weekly updates. Open source. React, Tailwind, TypeScript & JavaScript.",
    start_url: "/",
    display: "standalone",
    background_color: "#000000",
    theme_color: "#000000",
    icons: [
      {
        src: "/app/favicon-search.ico",
        sizes: "48x48",
        type: "image/x-icon",
      },
    ],
  };
}
