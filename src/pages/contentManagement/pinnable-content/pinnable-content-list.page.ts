import { expect } from '@playwright/test';
import type { Page } from 'playwright';

import type {
  Event,
  Poll,
  Post,
} from '../../../graphql-schema/generated/graphql-request';
import { SharedPage } from '../../shared.page';

export class PinnableContentListPage extends SharedPage {
  readonly pinButton = '//button[text() = "Pin"]';

  readonly pinnedLabelSelector = 'tr:has-text("Pinned")';

  readonly unpinButton = '//button[text() = "Unpin"]';

  constructor(page: Page) {
    super(page);
  }

  async clickButton(selector: string) {
    await this.page.waitForSelector(selector);
    await this.page.click(selector);
  }

  async clickPinButton() {
    await this.clickButton(this.pinButton);
  }

  async clickConfirmPinButton() {
    await this.clickButton(this.pinButton);
  }

  async clickUnpinButton() {
    await this.clickButton(this.unpinButton);
  }

  async clickMoreMenu(contentId: Event['id'] | Poll['id'] | Post['id']) {
    await this.page.waitForSelector(`[data-testid="dots-cell-${contentId}"]`);
    await this.page.click(`[data-testid="dots-cell-${contentId}"]`);
  }

  async verifyContentCreated(title: string) {
    await this.reload();

    await this.page.waitForLoadState('domcontentloaded');

    const content = this.page.locator(`td[role="cell"]:has-text("${title}")`);
    await content.waitFor();
  }

  async verifyContentPinned() {
    await this.reload();

    await this.page.waitForLoadState('domcontentloaded');

    await this.page.waitForSelector('table');
    // TODO: verify that the pinned label is associated with the correct item
    const pinnedContentCount = await this.page
      .locator(this.pinnedLabelSelector)
      .count();

    // The header row `Pinned` is counted as well
    expect(pinnedContentCount).toBe(2);
  }

  async verifyContentUnpinned() {
    await this.reload();

    await this.page.waitForLoadState('domcontentloaded');

    await this.page.waitForSelector('table');
    const pinnedContentCount = await this.page
      .locator(this.pinnedLabelSelector)
      .count();

    // The header row `Pinned` is counted as well
    expect(pinnedContentCount).toBe(1);
  }
}
