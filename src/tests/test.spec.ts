import { expect } from '@playwright/test';

import { defineFeature, loadFeature } from '../gherkin-utils';
import type { DefineStepFunction } from '../gherkin-utils/define-feature.util';

const feature = loadFeature('src/tests/test.feature');

defineFeature(feature, ({ given, then }) => {
  given('I am on the login page', async ({ page }) => {
    await page.goto('https://partner.aaqua.live/');
  });

  (then as DefineStepFunction<{ needle: string }>)(
    /^I can see "(?<needle>[<>\w]+)" in the title$/,
    async ({ page }, { needle }) => {
      await expect(page.locator('h1')).toHaveText(needle);
    }
  );
});
