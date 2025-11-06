import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig, fontProviders } from "astro/config";

export default defineConfig({
  site: "https://edjohnsonwilliams.co.uk",
  output: "static",
  integrations: [sitemap()],
  experimental: {
    fonts: [
      {
        provider: fontProviders.google(),
        name: "Jost",
        cssVariable: "--font-jost",
        weights: [400, 700],
        styles: ["normal"],
      },
    ],
  },
  vite: {
    plugins: [tailwindcss()],
  },
});
