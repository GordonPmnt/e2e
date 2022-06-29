import type { Page } from 'playwright';

import type { ViolationType } from '../../tests/moderation/utils/moderation-i18n-helper';
import { getTranslatedViolation } from '../../tests/moderation/utils/moderation-i18n-helper';
import type { AiLabelsStatus } from '../../utils/typings';

export class ModerationJobDetailsPage {
  readonly page: Page;

  readonly aiReportsSelector: string =
    "//div[./p[contains(text(),'AI reports for')]]";

  readonly appealByCreatorCard: string =
    '//p[text()[contains(.,"Appealed by creator")]]/..';

  readonly appealByReporterCard: string =
    '//p[text()[contains(.,"Appealed by members")]]/..';

  readonly appealNotesTextSelector: string = `//p[text()[contains(.,"This is the appeal note")]]`;

  readonly creatorAppealNoteSelector: string =
    this.appealByCreatorCard + this.appealNotesTextSelector;

  readonly appealNoteButtonSelector: string =
    this.appealByReporterCard + `//button[text()[contains(.,"appeal")]]`;

  readonly appealNotesDrawerSelector: string =
    '//div[contains(@role, "dialog")]';

  readonly reporterAppealNoteSelector: string =
    this.appealNotesDrawerSelector + this.appealNotesTextSelector;

  /**
   * @deprecated - Remove when take-action button definitely removed from app
   */
  readonly takeActionButtonSelector: string = 'text="Take Action"';

  readonly submitPopoverButtonSelector: string = 'text="Submit"';

  readonly hideContentButtonSelector: string = 'text="Hide Content"';

  readonly keepContentVisibleButtonSelector: string =
    'text="Keep Content Visible"';

  /**
   * @deprecated - Remove when take-action button definitely removed from app
   */
  readonly actionsDropdownSelector: string =
    "//select[@id='take-action-select']";

  readonly actionPopoverSelector: string = 'text="Select and submit"';

  /**
   * @deprecated - Remove when take-action button definitely removed from app
   */
  readonly violationTypesDropdownSelector: string =
    "//select[@id='violation-type-select']";

  actionPopoverViolationRadioSelector(violationType: ViolationType) {
    const violationLabel = getTranslatedViolation(violationType);
    return `//div[contains(@aria-label, "violation type ${violationLabel.toLowerCase()}")]`;
  }

  /**
   * @deprecated - Remove when take-action button definitely removed from app
   */
  readonly actionModalButtonSelector: string =
    "[data-testid='modal-button-action']";

  readonly aiLabelsSelector: (label: string, status: AiLabelsStatus) => string =
    (label, status) => `//button[contains(@aria-label, "${label} ${status}")]`;

  readonly visibilityNotificationSelector: string = `text="This content will remain visible"`;

  constructor(page: Page) {
    this.page = page;
  }

  async getAiReports(): Promise<string[]> {
    await this.page.waitForSelector(this.aiReportsSelector);

    const aiReports = await this.page.$$eval(
      `${this.aiReportsSelector}//span`,
      (elements) => elements.map((span) => span.innerHTML)
    );

    return aiReports.sort();
  }

  async getAiLabelsFromMedia(
    label: string,
    status: AiLabelsStatus
  ): Promise<string[]> {
    await this.page.waitForSelector(this.aiLabelsSelector(label, status));

    const aiLabelsFromMedia = await this.page.$$eval(
      this.aiLabelsSelector(label, status),
      (elements) => elements.map((button) => button.innerHTML)
    );

    return aiLabelsFromMedia.sort();
  }

  /**
   * @deprecated - Remove when take-action button definitely removed from app
   */
  async openActionsModalAndHideWithViolation(violation: string) {
    await this.page?.click(this.takeActionButtonSelector);
    const actionElement = await this.page?.waitForSelector(
      this.actionsDropdownSelector,
      {
        timeout: 1000,
      }
    );
    await actionElement?.selectOption({ value: 'HIDE' });

    const violationTypeElement = await this.page?.waitForSelector(
      this.violationTypesDropdownSelector,
      {
        timeout: 1000,
      }
    );
    await violationTypeElement?.selectOption({ value: violation });

    const takeActionButton = this.page?.waitForSelector(
      this.actionModalButtonSelector
    );

    (await takeActionButton)?.waitForElementState('enabled');

    await this.page?.click(this.actionModalButtonSelector);
  }

  /**
   * @deprecated - Remove when take-action button definitely removed from app
   */
  async openActionModalAndKeep() {
    await this.page?.click(this.takeActionButtonSelector);
    const actionElement = await this.page?.waitForSelector(
      this.actionsDropdownSelector,
      {
        timeout: 1000,
      }
    );
    await actionElement?.selectOption({ value: 'IGNORE_REPORT' });

    const takeActionButton = await this.page?.waitForSelector(
      this.actionModalButtonSelector
    );

    takeActionButton?.waitForElementState('enabled');

    await this.page?.click(this.actionModalButtonSelector);
  }

  async waitForVisibilityNotification() {
    await this.page.waitForSelector(this.visibilityNotificationSelector);
  }

  async keepContent() {
    await this.page?.click(this.keepContentVisibleButtonSelector);
  }

  async hideContent(violationType: ViolationType) {
    await this.page?.click(this.hideContentButtonSelector);

    await this.page?.waitForSelector(this.actionPopoverSelector, {
      timeout: 1000,
    });

    await this.page?.click(
      this.actionPopoverViolationRadioSelector(violationType)
    );

    const submitButton = await this.page?.waitForSelector(
      this.submitPopoverButtonSelector,
      {
        timeout: 1000,
      }
    );

    submitButton?.waitForElementState('enabled');

    await this.page?.click(this.submitPopoverButtonSelector);
  }
}
