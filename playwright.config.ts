import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./tests",
  reporter: [
    ["list"],
    ["html"],
    ["allure-playwright"], // Allure-репорт
  ],
  use: {
    baseURL: "https://demowebshop.tricentis.com",
    trace: "retain-on-failure",
    screenshot: "only-on-failure",
    video: "retain-on-failure",
  },
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
  ],
});
