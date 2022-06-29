import { expect } from '@playwright/test';
import type { Page } from 'playwright';

export class ActivitiesPage {
  readonly page: Page;

  readonly pollCard = '//tr[td[div[span[text()= "Poll"]]]]';
  readonly eventCard = '//tr[td[div[span[text()= "Event"]]]]';
  readonly previousPageButton = '//button[@aria-label = "Previous Page"]';
  readonly nextPageButton = '//button[@aria-label = "Next Page"]';

  constructor(page: Page) {
    this.page = page;
  }

  async checkPollCount(count: number) {
    await this.page.waitForSelector(this.pollCard);
    const pollCount = await this.page.locator(this.pollCard).count();
    expect(pollCount).toBeGreaterThanOrEqual(count);
  }

  async checkEventCount(count: number) {
    await this.page.waitForSelector(this.eventCard);
    const eventCount = await this.page.locator(this.eventCard).count();
    expect(eventCount).toBeGreaterThanOrEqual(count);
  }

  async checkPaginationSection(pageNumber: string) {
    const paginationSection = `//p[contains(text(), "${pageNumber}")]/..`;
    await this.page.waitForSelector(paginationSection);
    const paginationVisibility = await this.page.isVisible(paginationSection);
    expect(paginationVisibility).toBeTruthy();
  }

  async clickNextPageButton() {
    await this.page.waitForSelector(this.nextPageButton);
    await Promise.all([
      this.page.waitForNavigation(),
      this.page.click(this.nextPageButton),
    ]);
  }

  async clickPreviousPageButton() {
    await this.page.waitForSelector(this.previousPageButton);
    await Promise.all([
      this.page.waitForNavigation(),
      this.page.click(this.previousPageButton),
    ]);
  }
}
