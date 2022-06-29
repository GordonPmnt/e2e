/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { expect } from '@playwright/test';
import type { Page } from 'playwright';

export class DatePicker {
  readonly page: Page;

  /* Element selectors */
  readonly dropdown = '//*[@data-testid="combo-box-dropdown-indicator"]';

  readonly confirmRangeButton = 'button:has-text("Set Date Range")';

  readonly datePickerPopUp = '//*[text()="Select a Date Range"]';

  constructor(page: Page) {
    this.page = page;
  }

  async clickDatePickerDropdown() {
    await this.page.waitForSelector(this.dropdown);
    await this.page.click(this.dropdown);
  }

  async clickConfirmationButton() {
    await this.page.waitForSelector(this.confirmRangeButton);
    await this.page.click(this.confirmRangeButton);
  }

  async clickPeriodSelector(period: string) {
    await this.page.waitForSelector(`//div[text()= "${period}"]`);
    await this.page.click(`//div[text()= "${period}"]`);
  }

  async selectDate(date: string) {
    await this.page.waitForSelector(`[class*='day--0${date}']`);
    await this.page.click(`[class*='day--0${date}']`);
  }

  async datePickerPopUpIsisible() {
    await this.page.waitForSelector(this.datePickerPopUp);
    const visible = await this.page.isVisible(this.datePickerPopUp);
    expect(visible).toBeTruthy();
  }
}
