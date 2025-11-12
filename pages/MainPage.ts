import type { Page, Locator } from '@playwright/test';
import { waitForUrl } from '../helper/pageActions';
import { assertElementHasText, assertElementVisibility } from '../helper/elements';
import 'dotenv/config';

class MainPage {
  readonly baseUrl!: string;

  readonly title: Locator;

  readonly headerLinksContainer: Locator;
  readonly logInLink: Locator;
  readonly customerInfo: Locator;
  readonly logOutBtn: Locator;

  readonly categoriesContainer: Locator;
  readonly categoryLink: (name: string) => Locator;

  constructor(readonly page: Page) {
    this.baseUrl = process.env.BASE_URL!;

    this.title = this.page.locator('//h2[contains(text(), "Welcome to our store")]');

    this.headerLinksContainer = this.page.locator('//div[@class="header-links"]');
    this.logInLink = this.headerLinksContainer.locator('//a[contains(@href, "login")]');
    this.customerInfo = this.headerLinksContainer.locator('//a[contains(@class, "account")]');
    this.logOutBtn = this.headerLinksContainer.locator('//a[contains(@href, "logout")]');

    this.categoriesContainer = this.page.locator('//div[contains(@class, "header-menu")]');
    this.categoryLink = (name: string) => this.categoriesContainer.getByRole('link', { name, exact: true });
  }

  async open() {
    await this.page.goto(this.baseUrl);
    await this.assertPageUrl();
    await this.assertTitleVisibility();
  }

  async assertPageUrl() {
    await waitForUrl(this.page, new RegExp(this.baseUrl));
  }

  async assertTitleVisibility() {
    await assertElementVisibility(this.title, 'заголовок главной страницы Demo Web Shop');
    await assertElementHasText(this.title, `заголовок главной страницы Demo Web Shop`, 'Welcome to our store');
  }

  async goToLoginPage() {
    await this.logInLink.click();
  }

  async assertUserIsLoggedIn(expectedEmail: string) {
    await assertElementVisibility(this.customerInfo, 'email залогиненого пользователя в шапке');
    await assertElementHasText(this.customerInfo, 'email залогиненого пользователя в шапке', expectedEmail);
  }

  async logout() {
    await this.logOutBtn.click();
    await assertElementVisibility(this.customerInfo, 'email залогиненого пользователя в шапке', false);
    await assertElementVisibility(this.logInLink, 'ссылка на страницу логина в шапке');
  }

  async goToCategory(name: string) {
    await this.categoryLink(name).click();
  }
}

export default MainPage;
