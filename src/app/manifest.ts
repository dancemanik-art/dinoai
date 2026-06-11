import type { MetadataRoute } from "next";
import { defaultDescription, SITE_NAME, SITE_URL } from "@/lib/seo";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: SITE_NAME,
    short_name: SITE_NAME,
    description: defaultDescription,
    start_url: "/",
    scope: "/",
    display: "standalone",
    background_color: "#0a0b0d",
    theme_color: "#c9a24b",
    lang: "cs",
    orientation: "portrait-primary",
    categories: ["finance", "business"],
    icons: [
      {
        src: "/icon.png",
        sizes: "512x512",
        type: "image/png",
      },
      {
        src: "/apple-icon.png",
        sizes: "180x180",
        type: "image/png",
        purpose: "any",
      },
    ],
    id: SITE_URL,
  };
}
