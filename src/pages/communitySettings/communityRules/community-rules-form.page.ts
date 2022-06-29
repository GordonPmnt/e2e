import type { Page } from 'playwright';

import { PageElement } from '../../../elements/page.element';

export class CommunityRulesFormPage {
  readonly page: Page;

  nameInputField: PageElement;

  contentInputField: PageElement;

  submitButton: PageElement;

  readonly nameInputFieldPath = 'input[id="name"]';

  readonly contentInputFieldPath = 'textarea[id="description"]';

  readonly submitButtonPath = `text="Save"`;

  constructor(page: Page) {
    this.page = page;

    this.nameInputField = new PageElement(this.page, this.nameInputFieldPath);
    this.contentInputField = new PageElement(
      this.page,
      this.contentInputFieldPath
    );

    this.submitButton = new PageElement(this.page, this.submitButtonPath);
  }
}
