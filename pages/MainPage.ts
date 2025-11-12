import type { Page, Locator } from '@playwright/test';
import { waitForUrl } from '../helper/pageActions';
import { assertElementHasText, assertElementVisibility } from '../helper/elements';
import 'dotenv/config';
import { expectValueToBeGreaterThan, expectToEqual } from '../helper/comparisons';

class MainPage {
  readonly baseUrl!: string;

  readonly title: Locator;

  readonly headerLinksContainer: Locator;
  readonly logInLink: Locator;
  readonly customerInfo: Locator;
  readonly logOutBtn: Locator;

  readonly categoriesContainer: Locator;
  readonly categoryLink: (name: string) => Locator;

  readonly searchInput: Locator;
  readonly searchButton: Locator;
  readonly searchResultsContainer: Locator;
  readonly searchResultItems: Locator;
  readonly searchResultTitles: Locator;

  constructor(readonly page: Page) {
    this.baseUrl = process.env.BASE_URL!;

    this.title = this.page.locator('//h2[contains(text(), "Welcome to our store")]');

    this.headerLinksContainer = this.page.locator('//div[@class="header-links"]');
    this.logInLink = this.headerLinksContainer.locator('//a[contains(@href, "login")]');
    this.customerInfo = this.headerLinksContainer.locator('//a[contains(@class, "account")]');
    this.logOutBtn = this.headerLinksContainer.locator('//a[contains(@href, "logout")]');

    this.categoriesContainer = this.page.locator('//div[contains(@class, "header-menu")]');
    this.categoryLink = (name: string) => this.categoriesContainer.getByRole('link', { name, exact: true });

    this.searchInput = this.page.locator('//input[contains(@id, "small-searchterms")]');
    this.searchButton = this.page.locator('//input[contains(@class, "search-box-button")]');
    this.searchResultsContainer = this.page.locator('//div[contains(@class, "product-grid")]');
    this.searchResultItems = this.searchResultsContainer.locator('//div[contains(@class, "item-box")]');
    this.searchResultTitles = this.searchResultItems.locator('//h2[@class="product-title"]/a');
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

  async searchFor(query: string) {
    await this.searchInput.fill(query);
    await this.searchButton.click();
  }

  async assertSearchResultsExist() {
    await assertElementVisibility(this.searchResultsContainer, 'контейнер с результатами поиска');
    const resultsCount = await this.searchResultItems.count();
    await expectValueToBeGreaterThan(resultsCount, 0);
  }

  async assertSearchResultsContain(query: string) {
    const titles = await this.searchResultTitles.allTextContents();

    for (const title of titles) {
      const normalizedTitle = title.trim().toLowerCase();
      const normalizedQuery = query.trim().toLowerCase();

      await expectToEqual({
        expected: true,
        actual: normalizedTitle.includes(normalizedQuery),
        description: `результат поиска "${title}" содержит "${query}"`,
      });
    }
  }
}

export default MainPage;
