import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";
import tailwind from "@astrojs/tailwind";
import prefetch from "@astrojs/prefetch";


export default defineConfig({
  site: "https://edjohnsonwilliams.co.uk",
  // output: "static",
  server: {
    host: true,
    port: 3000
  },
  integrations: [
    sitemap(),
    prefetch(),
    tailwind(),
  ]
});
