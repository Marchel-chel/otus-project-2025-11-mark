import type { Page, Locator } from '@playwright/test';
import { waitForUrl } from '../helper/pageActions';
import { assertElementHasText, assertElementVisibility } from '../helper/elements';
import 'dotenv/config';
import { expectValueToBeGreaterThan, expectValueToBeLessThan } from '../helper/comparisons';

class CartPage {
  readonly pageUrl!: string;

  readonly title: Locator;
  readonly cartContainer: Locator;
  readonly cartItems: Locator;
  readonly productName: Locator;
  readonly removeCheckbox: Locator;
  readonly updateCartButton: Locator;
  readonly emptyCartMessage: Locator;

  constructor(readonly page: Page) {
    this.pageUrl = `${process.env.BASE_URL}/cart`;

    this.title = this.page.locator('//div/h1[contains(text(), "Shopping cart")]');
    this.cartContainer = this.page.locator('//div[contains(@class, "shopping-cart-page")]');
    this.cartItems = this.cartContainer.locator('//tbody/tr').first();
    this.productName = this.cartItems.locator('//td[@class="product"]/a');
    this.removeCheckbox = this.cartItems.locator('//input[contains(@name, "removefromcart")]');
    this.updateCartButton = this.cartContainer.locator('//input[@name="updatecart"]');
    this.emptyCartMessage = this.page.locator('//div[contains(@class, "order-summary-content")]');
  }

  async open() {
    await this.page.goto(this.pageUrl);
    await this.assertPageUrl();
  }

  async assertPageUrl() {
    await waitForUrl(this.page, new RegExp(this.pageUrl));
  }

  async assertTitleVisibility() {
    await assertElementVisibility(this.title, 'заголовок страницы корзины');
    await assertElementHasText(this.title, 'заголовок страницы корзины', 'Shopping cart');
  }

  async assertHasItems() {
    await assertElementVisibility(this.cartContainer, 'контейнер корзины');
    const cnt = await this.cartItems.count();
    await expectValueToBeGreaterThan(cnt, 0);
  }

  async assertProductInCart(expectedName: string) {
    await assertElementVisibility(this.productName, 'название товара в корзине');
    await assertElementHasText(this.productName, 'название товара в корзине', expectedName);
  }

  async removeProductInCart() {
    await assertElementVisibility(this.removeCheckbox, 'чекбокс Remove у первого товара');
    await this.removeCheckbox.check();
    await this.updateCartButton.click();
  }

  async assertCartIsEmpty() {
    const rows = await this.cartItems.count();
    await expectValueToBeLessThan(rows, 1);
    await assertElementVisibility(this.emptyCartMessage, 'сообщение о пустой корзине');
  }
}

export default CartPage;
