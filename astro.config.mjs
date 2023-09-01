import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";
import tailwind from "@astrojs/tailwind";
import prefetch from "@astrojs/prefetch";


export default defineConfig({
  site: "https://edjohnsonwilliams.co.uk",
  integrations: [
    sitemap(),
    prefetch(),
    tailwind(),
  ]
});
