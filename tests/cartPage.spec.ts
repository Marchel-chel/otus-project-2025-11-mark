import { test } from '../helper/fixtures/pages.fixtures';

test.describe('Shopping cart tests', () => {
  test('Add product to cart', async ({ mainPage, cartPage }) => {
    await mainPage.open();

    const expectedName = (await mainPage.featuredProductTitle.textContent())!.trim();

    await mainPage.addFeaturedProductToCart();
    await mainPage.goToCart();

    await cartPage.assertTitleVisibility();
    await cartPage.assertHasItems();

    await cartPage.assertProductInCart(expectedName);
  });

  test('Remove product from cart', async ({ mainPage, cartPage }) => {
    await mainPage.open();
    await mainPage.addFeaturedProductToCart();
    await mainPage.goToCart();
    await cartPage.assertHasItems();

    await cartPage.removeProductInCart();
    await cartPage.assertCartIsEmpty();
  });
});
