import type { Page, Locator } from '@playwright/test';

import { waitForUrl } from '../helper/pageActions';
import { assertElementHasText, assertElementVisibility } from '../helper/elements';
import { expectValueToBeGreaterThan } from '../helper/comparisons';
import 'dotenv/config';

class CategoryPage {
  readonly baseUrl!: string;

  readonly title: Locator;
  readonly productsContainer: Locator;
  readonly productItems: Locator;

  readonly subcategoriesContainer: Locator;
  readonly subcategoryItems: Locator;

  constructor(readonly page: Page) {
    this.baseUrl = process.env.BASE_URL!;

    this.title = this.page.locator('//div[contains(@class, "page-title")]/h1');
    this.productsContainer = this.page.locator('//div[contains(@class, "product-grid")]');
    this.productItems = this.productsContainer.locator('//div[contains(@class, "item-box")]');

    this.subcategoriesContainer = this.page.locator('//div[contains(@class,"sub-category-grid")]');
    this.subcategoryItems = this.subcategoriesContainer.locator('//div[contains(@class,"item-box")]');
  }

  async open(link: string) {
    await this.page.goto(`${this.baseUrl}/${link}`);
    await this.assertPageUrl(link);
    await this.assertProductsIsVisible();
  }

  async assertPageUrl(link: string) {
    await waitForUrl(this.page, new RegExp(`${this.baseUrl}/${link}`));
  }

  async assertTitle(expected: string) {
    await assertElementVisibility(this.title, 'заголовок категории');
    await assertElementHasText(this.title, 'заголовок категории', expected);
  }

  async assertProductsIsVisible() {
    await assertElementVisibility(this.productsContainer, 'контейнер с товарами категории');
    const productsCount = await this.productItems.count();
    await expectValueToBeGreaterThan(productsCount, 0);
  }

  async hasSubcategories(): Promise<boolean> {
    return await this.subcategoriesContainer.isVisible();
  }

  async assertSubcategoriesVisible() {
    await assertElementVisibility(this.subcategoriesContainer, 'контейнер подкатегорий');
    const cnt = await this.subcategoryItems.count();
    await expectValueToBeGreaterThan(cnt, 0);
  }

  async openSubcategoryByLink(link: string) {
    await this.subcategoriesContainer.locator(`a[href*="/${link}"]`).nth(1).click();
  }

  async openSubcategoryByName(name: string) {
    await this.subcategoriesContainer.locator('a', { hasText: name }).click();
  }
}

export default CategoryPage;
