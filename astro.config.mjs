import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";
import tailwind from "@astrojs/tailwind";
import prefetch from "@astrojs/prefetch";
import compress from "astro-compress";

// https://astro.build/config
export default defineConfig({
  site: "https://edjohnsonwilliams.co.uk",
  integrations: [
    sitemap(),
    prefetch(),
    tailwind(),
    compress({
      html: {
        removeComments: true,
      },
    }),
  ],
});
