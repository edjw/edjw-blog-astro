import sitemap from "@astrojs/sitemap";
import { defineConfig, fontProviders } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import netlify from "@astrojs/netlify";

export default defineConfig({
  site: "https://edjohnsonwilliams.co.uk",
  output: "static",
  adapter: netlify(),
  integrations: [sitemap()],
  experimental: {
    fonts: [{
      provider: fontProviders.google(),
      name: "Jost",
      cssVariable: "--font-jost",
      weights: [400, 700],
      styles: ["normal"]
    }]
  },
  vite: {
    plugins: [
      tailwindcss()
    ]
  }
});
