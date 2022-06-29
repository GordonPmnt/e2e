import { test } from '@playwright/test';

import { defineFeature, loadFeature } from '../../../gherkin-utils';
import type { DefineStepFunction } from '../../../gherkin-utils/define-feature.util';
import { sleep } from '../../../graphql-schema/AaquaApolloClient.class';
import { ensureExistsModerationJob } from '../../../graphql-schema/jobs/find-job';
import { JobFilter, JobsPage } from '../../../pages/jobs.page';
import type { ModerationState } from '../../../step-definitions/aaqua-admin/state/moderation-state.class';
import { getModerationTypeFromString } from '../../../step-definitions/aaqua-admin/utils/moderation-helper';
import { login } from '../../../step-definitions/login/login.spec';
import { AaquaAdminApp } from '../../../utils/url-builder';
import { cleanup } from '../utils/cleanup.utils';
import { createEntity } from '../utils/create-entity.utils';
import { reportEntity } from '../utils/report-entity.utils';

const feature = loadFeature(
  'src/tests/moderation/admin/report-and-verify-reported-entity.feature'
);

let state: ModerationState;
let loggedUser: string;

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
      loggedUser = user;
    }
  );

  (when as DefineStepFunction<{ entity_type: string }>)(
    /^I filter jobs by "(?<entity_type>\w+)" type$/,
    async ({ page }, { entity_type }) => {
      const jobsPage = new JobsPage(page, 'ADMINISTRATION');
      await jobsPage.filterJobs(JobFilter.EntityType, entity_type);
    }
  );

  (and as DefineStepFunction<{ reported_reason: string }>)(
    /^I filter jobs by "(?<reported_reason>\w+)" reason$/,
    async ({ page }, { reported_reason }) => {
      const jobsPage = new JobsPage(page, 'ADMINISTRATION');
      await jobsPage.filterJobs(JobFilter.ReportReason, reported_reason);
    }
  );

  (then as DefineStepFunction<{ reason: string }>)(
    /^I should see the reported entity with "(?<reason>.+)"$/,
    async ({ page }, { reason }) => {
      const jobsPage = new JobsPage(page, 'ADMINISTRATION');
      const { entityContent } = state.reportedEntity;

      await ensureExistsModerationJob(
        state.reportedEntity.entityId,
        loggedUser
      );

      await page?.reload();

      let retries = 0;
      while (retries < 10) {
        retries++;
        await sleep(1000);
        try {
          await jobsPage.validateJobWithReason(entityContent, reason);
          return;
        } catch (error) {
          if (await jobsPage.canLoadMore()) {
            await jobsPage.loadMore();
          } else {
            await page?.reload();
          }
        }
      }
      throw new Error(
        `Could not find the moderation job with content: ${entityContent}`
      );
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

  // eslint-disable-next-line no-empty-pattern
  test.afterEach(async ({}, testInfo) => {
    await cleanup(state, testInfo);
  });
});
