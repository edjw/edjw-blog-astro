import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./tests",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : 4,
  reporter: [["html"], ["json", { outputFile: "logs/playwright-results.json" }], ["list"]],
  use: {
    baseURL: "http://localhost:4322",
    trace: "on-first-retry",
    screenshot: "only-on-failure",
    video: "retain-on-failure",
  },
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
  ],
  webServer: {
    command:
      "vp exec astro dev stop >/dev/null 2>&1 || true; vp run dev --host 127.0.0.1 --port 4322",
    url: "http://localhost:4322",
    reuseExistingServer: false,
    timeout: 120000, // 2 minutes for dev server startup
    stdout: "pipe",
    stderr: "pipe",
  },
});
