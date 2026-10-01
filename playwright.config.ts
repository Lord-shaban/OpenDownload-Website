import { defineConfig, devices } from "@playwright/test";
const remote = process.env.PLAYWRIGHT_BASE_URL;
export default defineConfig({
  testDir: "./e2e",
  timeout: 30_000,
  fullyParallel: false,
  retries: process.env.CI ? 1 : 0,
  use: { baseURL: remote ?? "http://127.0.0.1:3100", trace: "retain-on-failure" },
  projects: [
    { name: "desktop", use: { ...devices["Desktop Chrome"] } },
    { name: "mobile", use: { ...devices["iPhone 13"], defaultBrowserType: "chromium" } },
  ],
  webServer: remote
    ? undefined
    : {
        command: "pnpm start",
        url: "http://127.0.0.1:3100",
        reuseExistingServer: !process.env.CI,
        timeout: 60_000,
      },
  reporter: process.env.CI ? [["github"], ["html", { open: "never" }]] : "list",
});
