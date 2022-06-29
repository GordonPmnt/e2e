import type { Page } from 'playwright';

import { PageElement } from '../../../elements/page.element';

export class RuleComponent {
  readonly page: Page;

  readonly ruleTitleSelector =
    '//div[@data-testid="rule__row_ruleNumber"]//div[contains(@class, "chakra-text")]';

  readonly ruleDescriptionSelector =
    '//div[@data-testid="rule__row_ruleNumber"]//p[contains(@class, "chakra-text")]';

  readonly ruleEditSelector = 'data-testid=rule__edit_ruleNumber';

  readonly ruleDeleteSelector = 'data-testid=rule__delete_ruleNumber';

  constructor(page: Page) {
    this.page = page;
  }

  getRuleTitleLabel(ruleNumber: number) {
    return new PageElement(
      this.page,
      this.ruleTitleSelector.replace('ruleNumber', ruleNumber.toString())
    );
  }

  getRuleDescriptionLabel(ruleNumber: number) {
    return new PageElement(
      this.page,
      this.ruleDescriptionSelector.replace('ruleNumber', ruleNumber.toString())
    );
  }

  getRuleEditBtn(ruleNumber: number) {
    return new PageElement(
      this.page,
      this.ruleEditSelector.replace('ruleNumber', ruleNumber.toString())
    );
  }

  getRuleDeleteBtn(ruleNumber: number) {
    return new PageElement(
      this.page,
      this.ruleDeleteSelector.replace('ruleNumber', ruleNumber.toString())
    );
  }
}
