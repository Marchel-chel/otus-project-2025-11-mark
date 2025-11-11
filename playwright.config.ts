import { defineConfig, devices } from "@playwright/test";
import * as dotenv from "dotenv";
dotenv.config();

export default defineConfig({
  testDir: "./tests",
  timeout: 30_000,
  expect: { timeout: 5_000 },
  reporter: [["html", { outputFolder: "playwright-report" }]],
  use: {
    baseURL: process.env.BASE_URL || "https://demowebshop.tricentis.com",
    trace: "retain-on-failure",
    headless: false,
  },
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
  ],
});
