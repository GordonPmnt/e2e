import { expect, test } from '@playwright/test';

import type { DefineStepFunction } from '../../../gherkin-utils';
import { defineFeature, loadFeature } from '../../../gherkin-utils';
import { sleep } from '../../../graphql-schema/AaquaApolloClient.class';
import type { EntityType, ReportReason } from '../../../pages/jobs.page';
import { JobFilter, JobsPage } from '../../../pages/jobs.page';
import type { ModerationState } from '../../../step-definitions/aaqua-admin/state/moderation-state.class';
import { getModerationTypeFromString } from '../../../step-definitions/aaqua-admin/utils/moderation-helper';
import { login } from '../../../step-definitions/login/login.spec';
import { cleanup } from '../utils/cleanup.utils';
import { createEntity } from '../utils/create-entity.utils';
import { reportEntity } from '../utils/report-entity.utils';

const feature = loadFeature(
  'src/tests/moderation/admin/filtering-jobs.feature'
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

  (when as DefineStepFunction<{ entity_type: string }>)(
    /^I filter jobs by "(?<entity_type>\w+)" type$/,
    async ({ page }, { entity_type }) => {
      const jobsPage = new JobsPage(page, 'ADMINISTRATION');
      await jobsPage.filterJobs(JobFilter.EntityType, entity_type);
    }
  );

  (and as DefineStepFunction<{ reason: string }>)(
    /^I filter jobs by "(?<reason>\w+)" reason$/,
    async ({ page }, { reason }) => {
      const jobsPage = new JobsPage(page, 'ADMINISTRATION');
      await jobsPage.filterJobs(JobFilter.ReportReason, reason);
    }
  );

  (then as DefineStepFunction<{ entity_type: EntityType }>)(
    /^I should see only "(?<entity_type>\w+)" entities$/,
    async ({ page }, { entity_type }) => {
      const jobsPage = new JobsPage(page, 'ADMINISTRATION');

      expect(await jobsPage.validateEntityTypes(entity_type)).toBeTruthy();
    }
  );

  (then as DefineStepFunction<{ reason: ReportReason }>)(
    /^I should see only entities with "(?<reason>\w+)" reason$/,
    async ({ page }, { reason }) => {
      const jobsPage = new JobsPage(page, 'ADMINISTRATION');

      let retry = 1;
      while (await jobsPage.hasNoData()) {
        await page.reload();

        await sleep(1000);
        retry++;
        if (retry > 5) {
          throw new Error('No data appeared after 5 retries');
        }
      }
      expect(await jobsPage.validateReportReason(reason)).toBeTruthy();
    }
  );

  // eslint-disable-next-line no-empty-pattern
  test.afterEach(async ({}, testInfo) => {
    await cleanup(state, testInfo);
  });
});
