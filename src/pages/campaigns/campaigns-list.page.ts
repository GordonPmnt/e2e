import type { Page } from 'playwright';

export class CampaignsListPage {
  readonly page: Page;

  readonly editButton = '//button[text() = "Edit"]';

  constructor(page: Page) {
    this.page = page;
  }

  async clickEditButton() {
    await this.page.waitForSelector(this.editButton);
    await this.page.click(this.editButton);
  }

  async clickMoreMenu(campaignId: string) {
    await this.page.waitForSelector(`[data-testid="dots-cell-${campaignId}"]`);
    await this.page.click(`[data-testid="dots-cell-${campaignId}"]`);
  }

  async verifyCampaignUpdated(title: string) {
    let campaign = await this.page.$(
      `td[role="cell"] div:has-text("${title}")`
    );

    while (campaign !== null) {
      this.page.reload();

      campaign = await this.page.$(`td[role="cell"] div:has-text("${title}")`);
    }
  }
}
