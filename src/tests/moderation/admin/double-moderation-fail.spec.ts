import { expect, test } from '@playwright/test';

import type { DefineStepFunction } from '../../../gherkin-utils';
import { defineFeature, loadFeature } from '../../../gherkin-utils';
import { logOut } from '../../../step-definitions/aaqua-admin/login/login.spec';
import type { ModerationState } from '../../../step-definitions/aaqua-admin/state/moderation-state.class';
import { getModerationTypeFromString } from '../../../step-definitions/aaqua-admin/utils/moderation-helper';
import { login } from '../../../step-definitions/login/login.spec';
import { AaquaAdminApp } from '../../../utils/url-builder';
import { cleanup } from '../utils/cleanup.utils';
import { createEntity } from '../utils/create-entity.utils';
import { reportEntity } from '../utils/report-entity.utils';

const feature = loadFeature(
  'src/tests/moderation/admin/double-moderation-fail.feature'
);

let state: ModerationState;

defineFeature(feature, ({ given, and, when, then }) => {
  (
    given as DefineStepFunction<{
      entityType: string;
      creator: string;
      reporter: string;
      moderatorLevel: string;
      reportReason: string;
    }>
  )(
    /^a "(?<entityType>\w+)" created by "(?<creator>\w+)" has been reported by "(?<reporter>\w+)" to "(?<moderatorLevel>\w+)" with reason "(?<reportReason>\w+)"$/,
    async (
      _,
      { entityType, creator, reporter, moderatorLevel, reportReason }
    ) => {
      state = await createEntity(entityType, creator);
      const moderatorType = getModerationTypeFromString(moderatorLevel);
      await reportEntity(state, reporter, reportReason, moderatorType);
    }
  );

  (and as DefineStepFunction<{ app: string; user: string }>)(
    /^I am logged in the "(?<app>\w+)" app as user "(?<user>\w+)"$/,
    async ({ page }, { app, user }) => {
      await login({ page }, app, user);
    }
  );

  (and as DefineStepFunction<void>)(
    /^I review the job and keep it visible$/,
    async ({ page }) => {
      const { entityId, entityType } = state.reportedEntity;

      await page.goto(
        AaquaAdminApp.moderationJobEntityDetailUrl(entityId, entityType)
      );
      await page?.click('text="Keep Content Visible"');
    }
  );

  and('I log out', async ({ page }) => {
    await logOut({ page });
  });

  (when as DefineStepFunction<void>)(
    /^I navigate to the reported entity detail$/,
    async ({ page }) => {
      const { entityId, entityType } = state.reportedEntity;
      await page.goto(
        AaquaAdminApp.moderationJobEntityDetailUrl(entityId, entityType)
      );
    }
  );

  then('I see an alert message', async ({ page }) => {
    const expectedMessage =
      'This job has already been reviewed, we recommend you to skip this job.';

    expect(await page?.waitForSelector(`text=${expectedMessage}`)).toBeTruthy();
  });

  // eslint-disable-next-line no-empty-pattern
  test.afterEach(async ({}, testInfo) => {
    await cleanup(state, testInfo);
  });
});
