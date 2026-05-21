import { defineConfig } from "vite-plus";

export default defineConfig({
  staged: {
    "*": "vp check --fix",
    "*.astro": "prettier --write",
  },
  lint: {
    ignorePatterns: ["public/admin/"],
  },
  fmt: {},
});
