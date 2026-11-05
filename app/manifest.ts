import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Swapnil — AI Engineer",
    short_name: "Swapnil",
    description:
      "AI Engineer with 2.5+ years shipping LLM-powered products into production across fintech and media.",
    start_url: "/",
    display: "browser",
    background_color: "#111111",
    theme_color: "#111111",
    icons: [
      { src: "/icon.svg", sizes: "any", type: "image/svg+xml" },
      { src: "/apple-icon", sizes: "180x180", type: "image/png" },
    ],
  };
}
