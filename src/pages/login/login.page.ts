import { expect } from '@playwright/test';
import type { Locator, Page } from 'playwright';

export class LoginPage {
  readonly page: Page;

  readonly emailInput: Locator;

  readonly passwordInput: Locator;

  readonly submitButton: Locator;

  readonly jobsHeader = 'h1 >> text="Jobs"';

  constructor(page: Page) {
    this.page = page;
    this.emailInput = page.locator('input[name="username"]');
    this.passwordInput = page.locator('input[name="password"]');
    this.submitButton = page.locator('button[type="submit"]');
  }

  async fillInEmail(email: string) {
    await this.emailInput.fill(email);
  }

  async fillInPassword(password: string) {
    await this.passwordInput.fill(password);
  }

  async clickLogin() {
    await Promise.all([
      this.page.waitForNavigation(),
      this.submitButton.click(),
    ]);
  }

  async loginWithCredentials(email: string, password: string) {
    await this.fillInEmail(email);
    await this.fillInPassword(password);
    await this.clickLogin();
  }

  async verifyJobsHeader() {
    const title = await this.page.waitForSelector(this.jobsHeader);
    expect(title).toBeTruthy();
  }
}
