import 'dotenv/config';
import { test } from '../helper/fixtures/pages.fixtures';

test.describe('Main Page tests', () => {
  test('Successful logout', async ({ loggedInMainPage }) => {
    await loggedInMainPage.logout();
  });

  test('Search returns relevant results', async ({ mainPage }) => {
    const searchQuery = 'Smartphone';

    await mainPage.open();
    await mainPage.searchFor(searchQuery);
    await mainPage.assertSearchResultsExist();
    await mainPage.assertSearchResultsContain(searchQuery);
  });
});
