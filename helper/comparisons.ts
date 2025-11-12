import { expect } from '@playwright/test';

interface EqualComparison {
  expected: unknown;
  actual: unknown;
  description: string;
}

// Проверяет, что значение больше минимального
export async function expectValueToBeGreaterThan(actual: number, minValue = 0) {
  expect(actual, `Проверяем, что значение ${actual} больше ${minValue}`).toBeGreaterThan(minValue);
}

// Проверяет, что два значения равны
export async function expectToEqual({ expected, actual, description }: EqualComparison) {
  expect(actual, `Проверяем, что ${description} === ${JSON.stringify(expected)}`).toEqual(expected);
}
