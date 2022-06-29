import type { Page } from 'playwright';

import { scrollToTopOfPage } from '../../../utils/scroll-helper';

export class CreatePollPage {
  readonly page: Page;

  readonly option1Field = 'input[name="options[0]"]';
  readonly option2Field = 'input[name="options[1]"]';
  readonly questionField = 'input[name="question"]';
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

  async fillInPollForm(title: string) {
    await this.page.fill(this.questionField, title);
    await this.page.fill(this.option1Field, 'Option 1');
    await this.page.fill(this.option2Field, 'Option 2');
  }
}
