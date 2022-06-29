import type { Page } from 'playwright';

export class EditPostPage {
  readonly page: Page;

  readonly descriptionField = 'textarea[name="content"]';

  readonly submitButton = 'button[type="submit"]';

  constructor(page: Page) {
    this.page = page;
  }

  async changeDescription(description: string) {
    await this.page.fill(this.descriptionField, description);
  }

  async clickSubmit() {
    await this.page.click(this.submitButton);
  }
}
