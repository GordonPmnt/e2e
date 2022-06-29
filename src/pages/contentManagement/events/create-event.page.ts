import { faker } from '@faker-js/faker';
import type { Page } from 'playwright';

import { scrollToTopOfPage } from '../../../utils/scroll-helper';

export class CreateEventPage {
  readonly page: Page;

  readonly descriptionField = 'textarea[title="Description"]';
  readonly locationField = 'input[name="location"]';
  readonly submitButton = 'button[type="submit"]';
  readonly titleField = 'input[name="title"]';

  readonly dataEndInputField = '#endTime';
  readonly dataEndPicker = '[aria-label="toggle end picker"]';
  readonly okButton = 'text=OK';

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

  async fillInEndDate() {
    await this.page.locator(this.dataEndInputField).scrollIntoViewIfNeeded();
    await this.page.click(this.dataEndPicker);
    await this.page.press(this.okButton, 'Enter');
  }

  async fillInEventForm(title: string) {
    await this.page.fill(this.titleField, title);
    await this.page.fill(this.descriptionField, faker.random.words(5));
    await this.fillInEndDate();
    await this.page.fill(
      this.locationField,
      `${faker.address.city()}, ${faker.address.country()}`
    );
  }
}
