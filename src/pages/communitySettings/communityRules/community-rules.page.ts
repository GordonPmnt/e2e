import type { Page } from 'playwright';

import { RuleComponent } from '../../../components/community/rule/rule.component';
import { ConfirmationModalComponent } from '../../../components/modals/confirmation-modal-component/confirmation-modal.component';
import { ToastComponent } from '../../../components/toast/toast.component';
import { community_rules } from '../../../constants/community/community-rules/index';
import { PageElement } from '../../../elements/page.element';
import { BasePage } from '../../base/base.page';
export class CommunityRulesPage extends BasePage {
  readonly page: Page;

  ruleComponent: RuleComponent;

  confirmationModalComponent: ConfirmationModalComponent;

  toastComponent: ToastComponent;

  addNewRuleBtn: PageElement;

  readonly addRuleButtonSelector = `text="Add new rule"`;

  constructor(page: Page) {
    super();
    this.page = page;
    this.addNewRuleBtn = new PageElement(page, this.addRuleButtonSelector);
    this.ruleComponent = new RuleComponent(page);

    this.confirmationModalComponent = new ConfirmationModalComponent(
      page,
      community_rules.delete_rule_modal.title,
      community_rules.delete_rule_modal.message
    );

    this.toastComponent = new ToastComponent(
      page,
      community_rules.delete_rule_toast.title,
      community_rules.delete_rule_toast.description
    );
  }
}
