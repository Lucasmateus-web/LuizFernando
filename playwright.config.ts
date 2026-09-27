import { defineConfig } from "@playwright/test"
const baseURL = process.env.SITE_URL || "http://localhost:3000"
export default defineConfig({
  testDir: "./tests/e2e",
  outputDir: "./artifacts/test-results",
  fullyParallel: false,
  workers: 2,
  timeout: 60000,
  use: {
    baseURL,
    browserName: "chromium",
    screenshot: "only-on-failure",
    trace: "retain-on-failure",
  },
  reporter: [["list"], ["html", { open: "never", outputFolder: "artifacts/playwright-report" }]],
  webServer: {
    command: `${process.platform === "win32" ? "npm.cmd" : "npm"} run start -- --port ${new URL(baseURL).port || "3000"}`,
    url: baseURL,
    reuseExistingServer: !process.env.CI,
    timeout: 120000,
  },
})
