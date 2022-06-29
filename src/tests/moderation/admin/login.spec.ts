import { expect } from '@playwright/test';
import type { Page } from 'playwright';

import { defineFeature, loadFeature } from '../../../gherkin-utils';
import type { DefineStepFunction } from '../../../gherkin-utils/define-feature.util';
import { LoginPage } from '../../../pages/login/login.page';
import { login } from '../../../step-definitions/login/login.spec';

const feature = loadFeature('src/tests/moderation/admin/login.feature');

defineFeature(feature, ({ when, then }) => {
  (when as DefineStepFunction<{ app: string; user: string }>)(
    /^I am logged in the "(?<app>\w+)" app as user "(?<user>\w+)"$/,
    async ({ page }, { app, user }) => {
      await login({ page }, app, user);
    }
  );

  then('user can view the list of Jobs', async ({ page }) => {
    const loginPage = new LoginPage(<Page>page);
    await loginPage.verifyJobsHeader();
  });

  then('user cannot view the list of Jobs', async function ({ page }) {
    const error = await page?.waitForSelector(
      '.chakra-alert:has-text("Access denied")'
    );

    expect(error).toBeTruthy();
  });
});
