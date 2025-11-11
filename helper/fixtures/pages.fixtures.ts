import { test as fixtureTest } from "@playwright/test";
import LoginPage from "../../pages/LoginPage";
import MainPage from "../../pages/MainPage";

export const test = fixtureTest.extend<{
  mainPage: MainPage;
  loginPage: LoginPage;
}>({
  mainPage: async ({ page }, use) => {
    const mainPage = new MainPage(page);

    await use(mainPage);
  },

  loginPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);

    await use(loginPage);
  },
});

export { expect } from "@playwright/test";
