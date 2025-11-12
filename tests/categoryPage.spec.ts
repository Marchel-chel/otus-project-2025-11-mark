import 'dotenv/config';
import { test } from '../helper/fixtures/pages.fixtures';
import { categories } from '../data/categories';

test.describe('Category navigation', () => {
  for (const { name, link, title, subcategories } of categories) {
    test(`Check category "${name}" works correctly`, async ({ mainPage, categoryPage }) => {
      await mainPage.open();
      await mainPage.goToCategory(name);

      await categoryPage.assertPageUrl(link);

      if (subcategories && subcategories.length) {
        // для Computers/Electronics: проверяем, что видны подкатегории…
        await categoryPage.assertSubcategoriesVisible();

        for (const sub of subcategories) {
          await categoryPage.openSubcategoryByLink(sub.link);
          await categoryPage.assertPageUrl(sub.link);
          await categoryPage.assertTitle(sub.title);
          await categoryPage.assertProductsIsVisible();
          // возвращаемся назад к родителю, чтобы открыть следующую
          await mainPage.goToCategory(name);
          await categoryPage.assertPageUrl(link);
        }
      } else {
        // обычная категория без подкатегорий
        await categoryPage.assertTitle(title);
        await categoryPage.assertProductsIsVisible();
      }
    });
  }
});
