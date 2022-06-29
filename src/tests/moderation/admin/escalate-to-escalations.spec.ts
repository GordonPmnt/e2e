import { expect, test } from '@playwright/test';

import {
  defineFeature,
  type DefineStepFunction,
  loadFeature,
} from '../../../gherkin-utils';
import { canFindReportedModerationJob } from '../../../graphql-schema/jobs/list-jobs';
import type { ModerationState } from '../../../step-definitions/aaqua-admin/state/moderation-state.class';
import { getModerationTypeFromString } from '../../../step-definitions/aaqua-admin/utils/moderation-helper';
import { login } from '../../../step-definitions/login/login.spec';
import { AaquaAdminApp } from '../../../utils/url-builder';
import { cleanup } from '../utils/cleanup.utils';
import { createEntity } from '../utils/create-entity.utils';
import { reportEntity } from '../utils/report-entity.utils';

const feature = loadFeature(
  'src/tests/moderation/admin/escalate-to-escalations.feature'
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

  (when as DefineStepFunction<void>)(
    /^I escalate the reported entity to ESCALATIONS$/,
    async ({ page }) => {
      const { entityId, entityType } = state.reportedEntity;

      const jobDetails = AaquaAdminApp.moderationJobEntityDetailUrl(
        entityId,
        entityType
      );
      await page?.goto(jobDetails);

      await page?.click(`text="Escalate"`);
    }
  );

  (then as DefineStepFunction<void>)(
    /^the reported entity should be visible in the ESCALATIONS queue$/,
    async ({ page }) => {
      expect(await page?.waitForSelector(`text="Escalated"`)).toBeTruthy();
      expect(
        await canFindReportedModerationJob(
          state,
          'MOD_INTERNAL_MODERATOR_1',
          'ESCALATIONS'
        )
      ).toBeTruthy();
    }
  );

  // eslint-disable-next-line no-empty-pattern
  test.afterEach(async ({}, testInfo) => {
    await cleanup(state, testInfo);
  });
});
