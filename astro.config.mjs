import sitemap from "@astrojs/sitemap";
import { defineConfig, fontProviders } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import { consoleForwardPlugin } from "vite-console-forward-plugin";

// Helper function to generate console forwarding script copied from vite-console-forward-plugin
function getConsoleForwardingScript(endpoint = "/api/debug/client-logs") {
  return `
// Console forwarding script
(function() {
  const originalMethods = {
    log: console.log.bind(console),
    warn: console.warn.bind(console),
    error: console.error.bind(console),
    info: console.info.bind(console),
    debug: console.debug.bind(console),
  };

  const logBuffer = [];
  let flushTimeout = null;

  function createLogEntry(level, args) {
    const message = args.map((arg) => {
      if (arg === undefined) return "undefined";
      if (typeof arg === "string") return arg;
      if (typeof arg === "object" && arg !== null) {
        try { return JSON.stringify(arg); } catch { return String(arg); }
      }
      return String(arg);
    }).join(" ");

    return { level, message, timestamp: new Date(), url: window.location.href };
  }

  async function sendLogs(logs) {
    try {
      await fetch("${endpoint}", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ logs }),
      });
    } catch (error) {
      // Fail silently
    }
  }

  function flushLogs() {
    if (logBuffer.length === 0) return;
    const logsToSend = [...logBuffer];
    logBuffer.length = 0;
    sendLogs(logsToSend);
    if (flushTimeout) {
      clearTimeout(flushTimeout);
      flushTimeout = null;
    }
  }

  function addToBuffer(entry) {
    logBuffer.push(entry);
    if (logBuffer.length >= 10) {
      flushLogs();
      return;
    }
    if (!flushTimeout) {
      flushTimeout = setTimeout(flushLogs, 100);
    }
  }

  // Patch console methods
  ["log", "warn", "error", "info", "debug"].forEach(level => {
    console[level] = function(...args) {
      originalMethods[level](...args);
      const entry = createLogEntry(level, args);
      addToBuffer(entry);
    };
  });

  // Cleanup handlers
  window.addEventListener("beforeunload", flushLogs);
  setInterval(flushLogs, 5000);
})();`;
}



export default defineConfig({
  site: "https://edjohnsonwilliams.co.uk",
  output: "static",
  integrations: [
    sitemap(),
    // Forwards console logs from the client to vite server
    {
      name: "console-forward-astro",
      hooks: {
        "astro:config:setup": ({ injectScript, command }) => {
          // Only inject the script in dev mode
          if (command === "dev") {
            injectScript("head-inline", getConsoleForwardingScript());
          }
        }
      }
    }
  ],
  experimental: {
    fonts: [{
      provider: fontProviders.google(),
      name: "Jost",
      cssVariable: "--font-jost",
      weights: [400, 700],
      styles: ["normal"]
    }]
  },
  vite: {
    plugins: [
      tailwindcss(), consoleForwardPlugin()
    ]
  }
});
