// Full Astro Configuration API Documentation:
// https://docs.astro.build/reference/configuration-reference

// @type-check enabled!
// VSCode and other TypeScript-enabled text editors will provide auto-completion,
// helpful tooltips, and warnings if your exported object is invalid.
// You can disable this by removing "@ts-check" and `@type` comments below.

// @ts-check
// export default /** @type {import('astro').AstroUserConfig} */ ({
//
//
//   // devOptions: {
//   //   tailwindConfig: "./tailwind.config.js"
//   // }
// });

import { defineConfig } from "astro/config";

// https://astro.build/config
export default defineConfig({
  site: "https://edjohnsonwilliams.co.uk",

  markdown: {
    remarkPlugins: [
      "remark-html",
      "remark-gfm",
      ["remark-footnotes", { inlineNotes: true }],
    ],
  },
});
