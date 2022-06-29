import type { Page } from 'playwright';

export class EditCampaignPage {
  readonly page: Page;

  readonly titleField = 'input[name="title"]';
  readonly submitButton = 'button[type="submit"]';

  constructor(page: Page) {
    this.page = page;
  }

  async changeTitle(title: string) {
    await this.page.fill(this.titleField, title);
  }

  async clickSubmit() {
    await this.page.click(this.submitButton);
  }
}
