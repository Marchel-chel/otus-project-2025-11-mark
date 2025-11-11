import type { Page, Locator } from "@playwright/test";
import { expect } from "@playwright/test";

// Проверяет, что URL страницы соответствует ожидаемому
export async function waitForUrl(
  page: Page,
  expectedUrl: RegExp | string,
  timeout = 30_000
) {
  await page.waitForURL(expectedUrl, { timeout });
}

// Проверяет, что элемент видим
export async function assertElementVisibility(
  element: Locator,
  elementDescription: string,
  isVisible = true,
  timeout: number = 30_000
) {
  if (isVisible) {
    await expect(element, `${elementDescription} отображается`).toBeVisible({
      timeout,
    });
  } else {
    await expect(element, `${elementDescription} не отображается`).toBeHidden({
      timeout,
    });
  }
}

// Проверяет, что текст элемента соответствует ожидаемому
export async function assertElementHasText(
  element: Locator,
  elementDescription: string,
  expectedText: string,
  timeout: number = 30_000,
  ignoreCase = true
) {
  await expect(
    element,
    ` текст элемента "${elementDescription}" === "${expectedText}"`
  ).toHaveText(expectedText, { timeout, ignoreCase });
}
