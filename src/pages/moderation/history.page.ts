import { expect } from '@playwright/test';
import type { Page } from 'playwright';

export class HistoryPage {
  readonly page: Page;

  readonly historyNav = `[href="/moderation/history"]`;

  readonly showDetails = `[aria-label="Show_details"]`;

  constructor(page: Page) {
    this.page = page;
  }

  async validateJobWithViolation(
    content: string,
    violation: string
  ): Promise<void> {
    const row = await this.page.$$(
      `[aria-label="Show_details"]:has-text("${content}") td:nth-child(5) span:has-text("${violation}")`
    );
    expect(row.length).toBe(1);
  }

  async navigateToHistoryPage() {
    await this.page.waitForSelector(this.historyNav);
    await this.page.click(this.historyNav);
    await this.page.waitForNavigation();
    await this.page.waitForFunction(
      () => {
        const jobs = document.querySelectorAll('[aria-label="Show_details"]');
        return jobs.length >= 30;
      },
      null,
      { polling: 500 }
    );
  }
}
