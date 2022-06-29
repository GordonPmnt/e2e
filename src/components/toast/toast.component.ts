import type { Page } from 'playwright';

import { PageElement } from '../../elements/page.element';

export class ToastComponent {
  toastTitle: PageElement;

  private readonly toastTitleSelector =
    'xpath=//div[contains(@class, "chakra-alert__title") and text() = "Delete rule"]';

  toastMessage: PageElement;

  private readonly toastMessageSelector =
    'xpath=//div[contains(@class, "chakra-alert__desc") and text() = "toastMessage"]';

  constructor(page: Page, toastTitle: string, toastMessage: string) {
    this.toastTitle = new PageElement(
      page,
      this.toastTitleSelector.replace('toastTitle', toastTitle)
    );
    this.toastMessage = new PageElement(
      page,
      this.toastMessageSelector.replace('toastMessage', toastMessage)
    );
  }
}
