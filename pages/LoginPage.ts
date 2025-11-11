import type { Page, Locator } from "@playwright/test";
import {
  assertElementHasText,
  assertElementVisibility,
  waitForUrl,
} from "../helper/pageActions";

import "dotenv/config";

class LoginPage {
  readonly pageUrl!: string;

  readonly title: Locator;

  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;
  readonly messageError: Locator;

  constructor(readonly page: Page) {
    this.pageUrl = `${process.env.BASE_URL}/login`;

    this.title = this.page.locator(
      '//div/h1[contains(text(), "Welcome, Please Sign In!")]'
    );

    this.emailInput = this.page.locator(
      '//div/input[contains(@class, "email")]'
    );
    this.passwordInput = this.page.locator(
      '//div/input[contains(@class, "password")]'
    );
    this.loginButton = this.page.locator(
      '//div/input[contains(@value, "Log in")]'
    );
    this.messageError = this.page.locator(
      '//div[contains(@class, "message-error")]'
    );
  }

  async open() {
    await this.page.goto(this.pageUrl);
    await this.assertPageUrl();
    await this.assertTitleVisibility();
  }

  async assertPageUrl() {
    await waitForUrl(this.page, new RegExp(this.pageUrl));
  }

  async assertTitleVisibility() {
    await assertElementVisibility(this.title, "заголовок страницы логина");
    await assertElementHasText(
      this.title,
      `заголовок страницы логина`,
      "Welcome, Please Sign In!"
    );
  }

  async login(email: string, password: string) {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }

  async assertErrorMessageIsVisible() {
    await assertElementVisibility(
      this.messageError,
      "сообщение об ошибке логина"
    );
  }
}

export default LoginPage;
