import type { Page } from 'playwright';

import { PageElement } from '../../elements/page.element';

export class ModalBaseComponent {
  closeBtn: PageElement;

  private readonly modalCloseSelector =
    'xpath=//button[contains(@class, "chakra-modal__close-btn")]';

  constructor(page: Page) {
    this.closeBtn = new PageElement(page, this.modalCloseSelector);
  }
}
