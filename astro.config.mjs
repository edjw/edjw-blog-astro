import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";
import tailwind from "@astrojs/tailwind";
import prefetch from '@astrojs/prefetch';

export default defineConfig({
  site: "https://edjohnsonwilliams.co.uk",
  markdown: {
    remarkPlugins: [
      "remark-html",
      "remark-gfm",
      [
        "remark-footnotes",
        {
          inlineNotes: true,
        },
      ],
    ],
  },
  integrations: [
    sitemap(),
    prefetch(),
    tailwind({
      config: { applyBaseStyles: false },
    })
  ],
});
