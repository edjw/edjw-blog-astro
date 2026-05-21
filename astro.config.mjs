import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig, fontProviders } from "astro/config";
import { createLogger } from "vite-plus";

const logger = createLogger();
const defaultWarn = logger.warn;
logger.warn = (message, options) => {
  if (
    typeof message === "string" &&
    message.includes(
      '`optimizeDeps.esbuildOptions` option was specified by "astro:dev-toolbar" plugin',
    )
  ) {
    return;
  }

  defaultWarn(message, options);
};

function removeVitePlusIncompatibleConfig() {
  return {
    name: "remove-vite-plus-incompatible-config",
    enforce: "post",
    config(config) {
      if (Array.isArray(config.resolve?.alias)) {
        config.resolve.alias = config.resolve.alias.filter((alias) => !("customResolver" in alias));
      }

      if (config.optimizeDeps?.esbuildOptions) {
        delete config.optimizeDeps.esbuildOptions;
      }
    },
  };
}

export default defineConfig({
  site: "https://edjohnsonwilliams.co.uk",
  output: "static",
  integrations: [sitemap()],
  fonts: [
    {
      provider: fontProviders.google(),
      name: "Jost",
      cssVariable: "--font-jost",
      weights: [400, 700],
      styles: ["normal"],
    },
  ],
  vite: {
    customLogger: logger,
    plugins: [removeVitePlusIncompatibleConfig(), tailwindcss()],
  },
});
