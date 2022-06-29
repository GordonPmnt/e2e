import type { Page } from 'playwright';

import type {
  Event,
  Poll,
} from '../../../graphql-schema/generated/graphql-request';

export class ActivitiesListPage {
  readonly page: Page;

  readonly editButton = '//button[text() = "Edit"]';

  constructor(page: Page) {
    this.page = page;
  }

  async clickEditButton() {
    await this.page.waitForSelector(this.editButton);
    await this.page.click(this.editButton);
  }

  async clickMoreMenu(activityId: Event['id'] | Poll['id']) {
    await this.page.waitForSelector(`[data-testid="dots-cell-${activityId}"]`);
    await this.page.click(`[data-testid="dots-cell-${activityId}"]`);
  }

  async verifyEventCreated(title: Event['title']) {
    await this.verifyUpsertHappened(title);
  }

  async verifyEventUpdated(title: Event['title']) {
    await this.verifyUpsertHappened(title);
  }

  async verifyPollCreated(question: Poll['question']) {
    await this.verifyUpsertHappened(question);
  }

  async verifyUpsertHappened(title: Event['title'] | Poll['question']) {
    let activity = await this.page.$(
      `td[role="cell"] div:has-text("${title}")`
    );

    while (activity !== null) {
      this.page.reload();

      activity = await this.page.$(`td[role="cell"] div:has-text("${title}")`);
    }
  }

  async visitDetailPage(activityId: Event['id'] | Poll['id']) {
    await this.page.waitForSelector(
      `[data-testid="show-details-${activityId}"]`
    );
    await this.page.click(`[data-testid="show-details-${activityId}"]`);
  }
}
