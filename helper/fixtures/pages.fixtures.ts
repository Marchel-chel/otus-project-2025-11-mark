import { test as fixtureTest } from '@playwright/test';
import LoginPage from '../../pages/LoginPage';
import MainPage from '../../pages/MainPage';
import CategoryPage from '../../pages/CategoryPage';

export const test = fixtureTest.extend<{
  mainPage: MainPage;
  loginPage: LoginPage;
  loggedInMainPage: MainPage;
  categoryPage: CategoryPage;
}>({
  mainPage: async ({ page }, use) => {
    const mainPage = new MainPage(page);

    await use(mainPage);
  },

  loginPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);

    await use(loginPage);
  },

  loggedInMainPage: async ({ page }, use) => {
    const mainPage = new MainPage(page);
    const loginPage = new LoginPage(page);

    await mainPage.open();
    await mainPage.goToLoginPage();
    await loginPage.login(process.env.TEST_USER!, process.env.TEST_PASS!);
    await mainPage.assertUserIsLoggedIn(process.env.TEST_USER!);

    await use(mainPage);
  },

  categoryPage: async ({ page }, use) => {
    const categoryPage = new CategoryPage(page);

    await use(categoryPage);
  },
});

export { expect } from '@playwright/test';
