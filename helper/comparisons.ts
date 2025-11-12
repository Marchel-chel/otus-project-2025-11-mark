import { expect } from '@playwright/test';

export async function expectValueToBeGreaterThan(actual: number, minValue = 0) {
  expect(actual, `Проверяем, что значение ${actual} больше ${minValue}`).toBeGreaterThan(minValue);
}
