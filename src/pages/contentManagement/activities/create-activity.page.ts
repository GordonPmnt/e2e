import type { Page } from 'playwright';

export class CreateActivityPage {
  readonly page: Page;

  readonly createEventOption = '//div[normalize-space()="Create an event"]';
  readonly createPollOption = '//div[normalize-space()="Create a poll"]';
  readonly header = 'h1 >> text="Create Activity"';
  readonly submitButton = 'button[type="submit"]';

  constructor(page: Page) {
    this.page = page;
  }

  async clickSubmit() {
    await this.page.click(this.submitButton);
  }

  async selectCreateActivityOption(option: string) {
    await this.page.click(option);
    await this.clickSubmit();
  }

  async selectCreateEventOption() {
    await this.selectCreateActivityOption(this.createEventOption);
  }

  async selectCreatePollOption() {
    await this.selectCreateActivityOption(this.createPollOption);
  }

  async waitForCreateActivityHeader() {
    await this.page.waitForSelector(this.header);
  }
}
