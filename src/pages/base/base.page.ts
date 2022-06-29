import { expect } from '@playwright/test';
import type { Page } from 'playwright';

export class BasePage {
  async verifyTextToBeVisible(page: Page, text: string) {
    await expect(page.locator(`text="${text}"`)).toBeVisible();
  }

  async verifyTextNotToBeVisible(page: Page, text: string) {
    await expect(page.locator(`text="${text}"`)).not.toBeVisible();
  }
}
