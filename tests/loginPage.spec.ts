import "dotenv/config";
import { test } from "../helper/fixtures/pages.fixtures";

const EMAIL = process.env.TEST_USER!;
const PASSWORD = process.env.TEST_PASS!;

test.describe("Auth tests", () => {
  test("Successful login with valid credentials", async ({
    mainPage,
    loginPage,
  }) => {
    await mainPage.open();

    await mainPage.goToLoginPage();
    await loginPage.assertPageUrl();
    await loginPage.assertTitleVisibility();

    await loginPage.login(EMAIL, PASSWORD);
    await mainPage.assertPageUrl();
    await mainPage.assertUserIsLoggedIn(EMAIL);
  });

  test("Unsuccessful login with invalid credentials", async ({
    mainPage,
    loginPage,
  }) => {
    await mainPage.open();

    await mainPage.goToLoginPage();
    await loginPage.assertPageUrl();
    await loginPage.assertTitleVisibility();

    await loginPage.login(EMAIL, "qweqweqwe");
    await loginPage.assertErrorMessageIsVisible();
  });
});
