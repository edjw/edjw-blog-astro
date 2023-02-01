/**
 * @type {import('prettier').Options}
 */
module.exports = {
  tailwindConfig: "./tailwind.config.cjs",
  plugins: ["prettier-plugin-astro", "prettier-plugin-tailwindcss"],
  pluginSearchDirs: false,
  overrides: [
    {
      files: "**/*.astro",
      options: { parser: "astro" },
    },
  ],
};
