import { expect } from '@playwright/test';
import type { Locator } from '@playwright/test';

// Проверяет, что элемент видим, либо спрятан, в зависимости от параметра isVisible
export async function assertElementVisibility(element: Locator, elementDescription: string, isVisible = true, timeout: number = 30_000) {
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
export async function assertElementHasText(element: Locator, elementDescription: string, expectedText: string, timeout: number = 30_000, ignoreCase = true) {
  await expect(element, ` текст элемента "${elementDescription}" === "${expectedText}"`).toHaveText(expectedText, { timeout, ignoreCase });
}
