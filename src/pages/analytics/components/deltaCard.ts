import { expect } from '@playwright/test';
import type { Page } from 'playwright';

export class DeltaCard {
  readonly page: Page;

  /* Element selectors */

  constructor(page: Page) {
    this.page = page;
  }

  async verifyDeltaCardTitle(name: string, title: string) {
    const text = await this.page.waitForSelector(
      `[data-testid="${name}-delta__title"]`
    );
    expect(await text.textContent()).toBe(title);
  }

  async verifyDeltaCardValue(name: string, value: string) {
    const text = await this.page.waitForSelector(
      `[data-testid="${name}-delta__value"]`
    );
    expect(await text.textContent()).toBe(value);
  }

  async verifyDeltaCardComparisonMetrics(
    name: string,
    comparison_value: string,
    comparison: string
  ) {
    const textValueSelector = await this.page.waitForSelector(
      `[data-testid="${name}-delta__comparison"]`
    );
    const textMetricSelector = await this.page.waitForSelector(
      `[data-testid="${name}-delta__more-less"]`
    );
    const textMetric = await textMetricSelector.textContent();
    expect(await textValueSelector.textContent()).toBe(comparison_value);
    expect(textMetric?.trim()).toBe(comparison);
  }
}
