import type { Page } from 'playwright';

import { PageElement } from '../../../elements/page.element';
import { ModalBaseComponent } from '../modal-base.component';

export class ConfirmationModalComponent extends ModalBaseComponent {
  modalTitle: PageElement;

  modalMessage: PageElement;

  cancelBtn: PageElement;

  approveBtn: PageElement;

  private readonly modalTitleSelector =
    'xpath=//header[contains(@class, "chakra-modal__header") and text() = "modalTitle"]';

  private readonly modalMessageSelector =
    'xpath=//div[contains(@class, "chakra-modal__body") and text() = "modalMessage"]';

  private readonly cancelSelector =
    'xpath=//button[contains(@class, "chakra-button") and text() = "cancelBtn"]';

  private readonly approveSelector =
    'xpath=//button[contains(@class, "chakra-button") and text() = "approveBtn"]';

  constructor(
    page: Page,
    modalTitle: string,
    modalMessage: string,
    cancelBtn = 'Cancel',
    approveBtn = 'Delete'
  ) {
    super(page);
    this.modalTitle = new PageElement(
      page,
      this.modalTitleSelector.replace('modalTitle', modalTitle)
    );

    this.modalMessage = new PageElement(
      page,
      this.modalMessageSelector.replace('modalMessage', modalMessage)
    );

    this.cancelBtn = new PageElement(
      page,
      this.cancelSelector.replace('cancelBtn', cancelBtn)
    );

    this.approveBtn = new PageElement(
      page,
      this.approveSelector.replace('approveBtn', approveBtn)
    );
  }
}
