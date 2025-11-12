import type { Page } from '@playwright/test';

// Проверяет, что URL страницы соответствует ожидаемому
export async function waitForUrl(page: Page, expectedUrl: RegExp | string, timeout = 30_000) {
  await page.waitForURL(expectedUrl, { timeout });
}
