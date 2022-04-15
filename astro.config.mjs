import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";
import tailwind from "@astrojs/tailwind";

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
  integrations: [sitemap(), tailwind({
    config: { applyBaseStyles: false },
  })],
});
