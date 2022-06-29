import { test } from '@playwright/test';
import type { Page } from 'playwright';

import { defineFeature, loadFeature } from '../../../gherkin-utils';
import type { DefineStepFunction } from '../../../gherkin-utils/define-feature.util';
import { HistoryPage } from '../../../pages/moderation/history.page';
import { ModerationJobDetailsPage } from '../../../pages/moderation/moderation-job-details.page';
import type { ModerationState } from '../../../step-definitions/aaqua-admin/state/moderation-state.class';
import { getModerationTypeFromString } from '../../../step-definitions/aaqua-admin/utils/moderation-helper';
import { login } from '../../../step-definitions/login/login.spec';
import { AaquaAdminApp } from '../../../utils/url-builder';
import { cleanup } from '../utils/cleanup.utils';
import { createEntity } from '../utils/create-entity.utils';
import type { ViolationType } from '../utils/moderation-i18n-helper';
import { reportEntity } from '../utils/report-entity.utils';

const feature = loadFeature(
  'src/tests/moderation/admin/reviewed-job-goes-to-history.feature'
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

  (when as DefineStepFunction<{ violationType: ViolationType }>)(
    /^I review the job and hide it with the violationType "(?<violationType>[\s\w]+)"$/,
    async ({ page }, { violationType }) => {
      const { entityId, entityType } = state.reportedEntity;

      await page?.goto(
        AaquaAdminApp.moderationJobEntityDetailUrl(entityId, entityType)
      );

      const detailsPage = new ModerationJobDetailsPage(<Page>page);

      await detailsPage.hideContent(violationType);

      await page?.waitForNavigation();
    }
  );

  when('I navigate to the history page', async ({ page }) => {
    const historyPage = new HistoryPage(page);
    await historyPage.navigateToHistoryPage();
  });

  (
    then as DefineStepFunction<{
      violation: string;
    }>
  )(
    /^I see the reviewed entity with "(?<violation>[\s\w]+)"$/,
    async ({ page }, { violation }) => {
      const historyPage = new HistoryPage(page);
      const { entityContent } = state.reportedEntity;

      let retries = 1;
      do {
        try {
          await historyPage.validateJobWithViolation(entityContent, violation);
          return;
        } catch (error) {
          retries++;
          await page?.reload();
        }
      } while (retries < 5);
      throw new Error(
        `Could not find the moderation job with content: ${entityContent}`
      );
    }
  );

  // eslint-disable-next-line no-empty-pattern
  test.afterEach(async ({}, testInfo) => {
    await cleanup(state, testInfo);
  });
});
