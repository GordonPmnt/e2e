import { expect, test } from '@playwright/test';

import { resetCommunityRules } from '../../../../../api/community/rules';
import { community_rules } from '../../../../../constants/community/community-rules';
import { defineFeature, loadFeature } from '../../../../../gherkin-utils';
import type { DefineStepFunction } from '../../../../../gherkin-utils/define-feature.util';
import { CommunityRulesFormPage } from '../../../../../pages/communitySettings/communityRules/community-rules-form.page';
import { CommunityRulesPage } from '../../../../../pages/communitySettings/communityRules/community-rules.page';
import { navigateToCommunity } from '../../../../../step-definitions/aaqua-partner/communities/communities.spec';
import { login } from '../../../../../step-definitions/login/login.spec';
import { getEmail, getPassword } from '../../../../../utils/credentials';

const feature = loadFeature(
  'src/tests/features/aaqua_partner/community_and_user_management/community_rules/community_rules.feature'
);

const community = {
  name: 'FNU_HIDDEN_WEB_1',
  handle: 'fnuhiddenweb1',
  id: '96c0666a-e3ab-4667-8787-211962577f95',
};

defineFeature(feature, ({ given, then, when, and }) => {
  test.afterEach(async () => {
    await resetCommunityRules({
      user: { email: getEmail('FNU_ONE'), password: getPassword('FNU_ONE') },
      rules: community_rules.default_rules,
      communityHandle: community.handle,
    });
  });

  (given as DefineStepFunction<{ app: string; user: string }>)(
    /^I am logged in the "(?<app>\w+)" app as user "(?<user>\w+)"$/,
    async ({ page }, { app, user }) => {
      await login({ page }, app, user);
    }
  );

  (
    and as DefineStepFunction<{
      communityName: string;
      parentPage: string;
      childPage: string;
    }>
  )(
    /^I am on the "(?<communityName>[\s\w]+)" "(?<parentPage>[\s\w]+)" "(?<childPage>[\s\w]+)" page$/,
    async ({ page }, { communityName, parentPage, childPage }) => {
      await navigateToCommunity({ page }, communityName, parentPage, childPage);
    }
  );

  then('I see the rules information message', async ({ page }) => {
    const communityRulesPage = new CommunityRulesPage(page);

    await communityRulesPage.verifyTextToBeVisible(
      page,
      community_rules.info_message
    );
  });

  and('I see all default community rules', async ({ page }) => {
    const communityRulesPage = new CommunityRulesPage(page);

    await Promise.all(
      community_rules.default_rules.map(async (rule) => {
        await communityRulesPage.verifyTextToBeVisible(page, rule.name);
        await communityRulesPage.verifyTextToBeVisible(page, rule.description);
      })
    );
  });

  (when as DefineStepFunction<{ title: string; content: string }>)(
    /^I add new community rule with title "(?<title>\w+)" and content "(?<content>\w+)"$/,
    async ({ page }, { title, content }) => {
      const communityRulesPage = new CommunityRulesPage(page);
      const communityRulesFormPage = new CommunityRulesFormPage(page);

      await communityRulesPage.addNewRuleBtn.click();

      await communityRulesFormPage.nameInputField.fill(title);
      await communityRulesFormPage.contentInputField.fill(content);
      await communityRulesFormPage.submitButton.click();
    }
  );

  (
    then as DefineStepFunction<{
      title: string;
      content: string;
      ruleNumber: number;
    }>
  )(
    /^I can see the title "(?<title>\w+)" and content "(?<content>\w+)" on the rules page for rule "(?<ruleNumber>\w+)"$/,
    async ({ page }, { title, content, ruleNumber }) => {
      const communityRulesPage = new CommunityRulesPage(page);

      const ruleTitle =
        await communityRulesPage.ruleComponent.getRuleTitleLabel(ruleNumber);

      await expect(ruleTitle.isVisible()).toBeTruthy();
      await expect(await ruleTitle.textContent()).toEqual(title);

      const ruleDescription =
        await communityRulesPage.ruleComponent.getRuleDescriptionLabel(
          ruleNumber
        );

      await expect(ruleDescription.isVisible()).toBeTruthy();
      await expect(await ruleDescription.textContent()).toEqual(content);
    }
  );

  (
    when as DefineStepFunction<{
      ruleNumber: number;
      title: string;
      content: string;
    }>
  )(
    /^I edit the community rule "(?<ruleNumber>\w+)" with title "(?<title>\w+)" and content "(?<content>\w+)"$/,
    async ({ page }, { ruleNumber, title, content }) => {
      const communityRulesPage = new CommunityRulesPage(page);
      const communityRulesFormPage = new CommunityRulesFormPage(page);

      await communityRulesPage.ruleComponent.getRuleEditBtn(ruleNumber).click();

      await communityRulesFormPage.nameInputField.fill(title);
      await communityRulesFormPage.contentInputField.fill(content);
      await communityRulesFormPage.submitButton.click();
    }
  );

  (
    when as DefineStepFunction<{
      ruleNumber: number;
    }>
  )(
    /^I delete the community rule "(?<ruleNumber>\w+)"$/,
    async ({ page }, { ruleNumber }) => {
      const communityRulesPage = new CommunityRulesPage(page);

      await communityRulesPage.ruleComponent
        .getRuleDeleteBtn(ruleNumber)
        .click();

      expect(
        await communityRulesPage.confirmationModalComponent.modalTitle.isVisible()
      ).toBeTruthy();

      expect(
        await communityRulesPage.confirmationModalComponent.modalMessage.isVisible()
      ).toBeTruthy();

      await communityRulesPage.confirmationModalComponent.cancelBtn.click();

      await communityRulesPage.ruleComponent
        .getRuleDeleteBtn(ruleNumber)
        .click();

      await communityRulesPage.confirmationModalComponent.approveBtn.click();

      await communityRulesPage.toastComponent.toastTitle
        .nth(0)
        .waitFor({ state: 'visible', timeout: 5000 });

      expect(
        await communityRulesPage.toastComponent.toastTitle.nth(0).isVisible()
      ).toBeTruthy();

      expect(
        await communityRulesPage.toastComponent.toastMessage.nth(0).isVisible()
      ).toBeTruthy();
    }
  );

  (
    then as DefineStepFunction<{
      ruleNumber: number;
      title: string;
      content: string;
    }>
  )(
    /^I can't see the deleted rule "(?<ruleNumber>\w+)" anymore$/,
    async ({ page }, { ruleNumber }) => {
      const communityRulesPage = new CommunityRulesPage(page);
      await communityRulesPage.verifyTextNotToBeVisible(
        page,
        community_rules.default_rules[ruleNumber].name
      );

      await communityRulesPage.verifyTextNotToBeVisible(
        page,
        community_rules.default_rules[ruleNumber].description
      );
    }
  );
});
