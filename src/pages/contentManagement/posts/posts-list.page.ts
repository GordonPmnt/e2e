import { expect } from '@playwright/test';
import type { Page } from 'playwright';

import type { Post } from '../../../graphql-schema/generated/graphql-request';

export class PostsListPage {
  readonly page: Page;

  readonly editButton = '//button[text() = "Edit"]';

  constructor(page: Page) {
    this.page = page;
  }

  async checkPostCount(count: number) {
    await this.page.waitForSelector('table');
    const postCount = await this.page
      .locator('tr:has-text("AaquaTestUser23")')
      .count();

    expect(postCount).toBeGreaterThanOrEqual(count);
  }

  async clickEditButton() {
    await this.page.waitForSelector(this.editButton);
    await this.page.click(this.editButton);
  }

  async clickMoreMenu(postId: Post['id']) {
    await this.page.waitForSelector(`[data-testid="dots-cell-${postId}"]`);
    await this.page.click(`[data-testid="dots-cell-${postId}"]`);
  }

  async verifyPostCreated(title: string) {
    await this.verifyUpsertHappened(title);
  }

  async verifyPostUpdated(title: string) {
    await this.verifyUpsertHappened(title);
  }

  async verifyUpsertHappened(title: string) {
    let post = await this.page.$(`td[role="cell"] div:has-text("${title}")`);

    while (post !== null) {
      this.page.reload();

      post = await this.page.$(`td[role="cell"] div:has-text("${title}")`);
    }
  }

  async visitDetailPage(postId: Post['id']) {
    await this.page.waitForSelector(`[data-testid="show-details-${postId}"]`);
    await this.page.click(`[data-testid="show-details-${postId}"]`);
  }
}
