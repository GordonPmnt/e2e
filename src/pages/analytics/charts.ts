import type { Page } from 'playwright';

import { delay } from '../../../src/utils/utils';

export class Charts {
  readonly page: Page;

  readonly loadingSpinner = '[data-testid="loader-indicator"]';

  readonly sumCheckbox = '[data-testid="sum-checkbox"]';

  constructor(page: Page) {
    this.page = page;
  }

  async waitForChartToBeDisplayed(selector: string) {
    await this.page.waitForSelector(selector);
    await this.page.waitForSelector(this.loadingSpinner, { state: 'hidden' });
  }

  async clickSumCheckbox() {
    //Remove delay after fixing the issue https://aaqua.atlassian.net/browse/AN-656
    await delay(1000);
    await this.page.waitForSelector(this.sumCheckbox);
    await this.page.click(this.sumCheckbox);
  }
}
