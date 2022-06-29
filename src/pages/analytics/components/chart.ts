import { expect } from '@playwright/test';
import type { Page } from 'playwright';

export class Chart {
  readonly page: Page;

  /* Element selectors */
  readonly pointOnMembersEvolutionChart =
    '(//*[@data-testid="chart-members-evolution"]//*[name()="g"]//*[name()="rect"])[1]';

  readonly pointOnJoinersVsLeaversChart =
    '(//*[@data-testid="chart-joiners-vs-leavers"]//*[name()="g"]//*[name()="rect"])[1]';

  readonly barOnPostsEvolutionChart =
    '(//*[@data-testid="histogram-interaction-bars__bar"])[1]';

  readonly loadingSpinner = '[data-testid="loader-indicator"]';

  constructor(page: Page) {
    this.page = page;
  }

  async hoverOnChart(chart: string) {
    let chartSelector;
    switch (chart) {
      case 'members-evolution':
        chartSelector = this.pointOnMembersEvolutionChart;
        break;
      case 'joiners-vs-leavers':
        chartSelector = this.pointOnJoinersVsLeaversChart;
        break;
      case 'posts-evolution':
        chartSelector = this.barOnPostsEvolutionChart;
        break;
      default:
        throw new Error(`Unknown chart: ${chart}`);
    }
    await this.page.waitForSelector(this.loadingSpinner, { state: 'hidden' });
    await this.page.waitForSelector(chartSelector);
    await this.page.locator(chartSelector).scrollIntoViewIfNeeded();
    await this.page.locator(chartSelector).hover();
  }

  async verifyTooltipIsVisible(chart: string) {
    const tooltipSelector = `//*[@data-testid="chart-${chart}"]//*[@data-testid="tooltip"]`;
    await this.page.waitForSelector(tooltipSelector);
    const visible = await this.page.isVisible(tooltipSelector);
    expect(visible).toBeTruthy();
  }
}
