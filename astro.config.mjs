import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";
import tailwind from "@astrojs/tailwind";
import prefetch from "@astrojs/prefetch";
import mdx from "@astrojs/mdx";

// https://astro.build/config
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
      config: {
        applyBaseStyles: false,
      },
    }),
    mdx(),
  ],
});
