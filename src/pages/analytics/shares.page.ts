/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { expect } from '@playwright/test';
import type { Page } from 'playwright';

export class SharesPage {
  readonly page: Page;

  /* Element selectors */
  readonly sharesStatusLabelSelector = 'h2:has-text("Shares status")';

  readonly sharesExplanationLabelSelector =
    'p:has-text("The metrics below represent the current status of the community")';

  // TODO: Typo in the data-testid - report ticket
  readonly totalCommunitySharesLabelSelector =
    'data-testid=dashbord-gauge__title';

  readonly totalSharesValueSelector = 'data-testid=dashbord-gauge__value';

  readonly sharesDetailsLabelSelector =
    'h2:has-text("Shares details for selected period")';

  readonly sharesDeltaLabelSelector = 'data-testid=dashboard-delta__title';

  readonly sharesDeltaValueSelector = 'data-testid=dashboard-delta__value';

  readonly sharesEvolutionGraphLabelSelector =
    'h3:has-text("Community Sharing Evolution")';

  constructor(page: Page) {
    this.page = page;
  }

  async waitForSharesStatusLabelSelector() {
    await this.page.waitForSelector(this.sharesStatusLabelSelector);
  }

  async waitForSharesExplanationLabelSelector() {
    await this.page.waitForSelector(this.sharesExplanationLabelSelector);
  }

  async waitForTotalSharesLabelSelector() {
    const totalSharesLabel = await this.page.waitForSelector(
      this.totalCommunitySharesLabelSelector
    );
    expect(await totalSharesLabel.textContent()).toBe('Total Community Shares');
  }

  // TODO: Use this with API call that will get the correct number (API & WEB cross-validation)
  async waitForTotalSharesValueSelector(totalShares: string) {
    const totalSharesValue = await this.page.waitForSelector(
      this.totalSharesValueSelector
    );
    expect(totalSharesValue.textContent).toBe(totalShares);
  }

  async waitForSharesDeltaLabelSelector() {
    await this.page.waitForSelector(this.sharesDeltaLabelSelector);
  }

  // TODO: Use this with API call that will get the correct number (API & WEB cross-validation)
  async waitForSharesDeltaValueSelector(sharesDelta: string) {
    const sharesDeltaValue = await this.page.waitForSelector(
      this.sharesDeltaValueSelector
    );
    expect(sharesDeltaValue.textContent).toBe(sharesDelta);
  }

  async waitForSharesDetailsForSelectedPeriodLabelSelector() {
    await this.page.waitForSelector(this.sharesDetailsLabelSelector);
  }

  async waitForSharesEvolutionGraphLabelSelector() {
    await this.page.waitForSelector(this.sharesEvolutionGraphLabelSelector);
  }
}
