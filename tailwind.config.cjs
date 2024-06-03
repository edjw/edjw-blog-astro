/** @type {import("tailwindcss").Config} */
module.exports = {
  content: [
    "./public/**/*.html",
    "./src/**/*.{astro,html,js,jsx,md,svelte,ts,tsx,vue}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      typography: {
        DEFAULT: {
          css: {
            "code::before": {
              content: "",
            },
            "code::after": {
              content: "",
            },
          },
        },
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
