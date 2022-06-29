import type { Page } from 'playwright';

import { scrollToTopOfPage } from '../../../utils/scroll-helper';

export class CreatePostPage {
  readonly page: Page;

  readonly descriptionField = 'textarea[title="Description"]';

  readonly submitButton = 'button[type="submit"]';

  constructor(page: Page) {
    this.page = page;
  }

  async clickSubmit() {
    await this.page.click(this.submitButton);
  }

  async clickSubmitCreateForm() {
    await scrollToTopOfPage(this.page);
    await this.clickSubmit();
  }

  async fillInPostForm(description: string) {
    await this.page.fill(this.descriptionField, description);
  }
}
