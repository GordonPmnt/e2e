import { test } from '@playwright/test';

import { defineFeature, loadFeature } from '../../../gherkin-utils';
import type { DefineStepFunction } from '../../../gherkin-utils/define-feature.util';
import { ensureExistsModerationJob } from '../../../graphql-schema/jobs/find-job';
import { JobsPage } from '../../../pages/jobs.page';
import type { ModerationState } from '../../../step-definitions/aaqua-admin/state/moderation-state.class';
import { login } from '../../../step-definitions/login/login.spec';
import { cleanup } from '../utils/cleanup.utils';
import { createEntity } from '../utils/create-entity.utils';
import { reportEntity } from '../utils/report-entity.utils';
import { verifyEntityIsVisible } from '../utils/verify-entity.utils';

const feature = loadFeature(
  'src/tests/moderation/admin/test-data-is-hidden.feature'
);

let state: ModerationState;
let loggedUser: string;

defineFeature(feature, ({ given, and, when, then }) => {
  (given as DefineStepFunction<{ entityType: string }>)(
    /^a "(?<entityType>\w+)" is created, visible and reported to AAQUA$/,
    async (_, { entityType }) => {
      state = await createEntity(entityType, 'MOD_MEMBER_1');
      await verifyEntityIsVisible(state, 'MOD_MEMBER_2');
      await reportEntity(state, 'MOD_MEMBER_2');
    }
  );

  (and as DefineStepFunction<{ user: string }>)(
    /^the created moderation job is visible to "(?<user>\w+)"$/,
    async (_, { user }) => {
      await ensureExistsModerationJob(state.reportedEntity.entityId, user);
      loggedUser = user;
    }
  );

  (when as DefineStepFunction<{ app: string; user: string }>)(
    /^I am logged in the "(?<app>\w+)" app as user "(?<user>\w+)"$/,
    async ({ page }, { app, user }) => {
      await login({ page }, app, user);
    }
  );

  (then as DefineStepFunction<void>)(
    /^I can not see the reported job$/,
    async ({ page }) => {
      const jobsPage = new JobsPage(page, 'ADMINISTRATION');
      const { entityContent } = state.reportedEntity;

      await ensureExistsModerationJob(
        state.reportedEntity.entityId,
        loggedUser
      );

      let found = false;
      if ((await jobsPage.hasNoData()) == false) {
        let finished = false;
        do {
          try {
            await jobsPage.validateJobWithReason(
              entityContent,
              state.reportedReason
            );
            found = true;
            finished = true;
          } catch {
            // expected, as the job should be invisible
          }
          if (await jobsPage.canLoadMore()) {
            await jobsPage.loadMore();
          } else {
            finished = true;
          }
        } while (found == false && finished == false);
      }
      if (found) {
        throw new Error(
          `Could find the moderation job with content: ${entityContent}`
        );
      }
    }
  );

  // eslint-disable-next-line no-empty-pattern
  test.afterEach(async ({}, testInfo) => {
    await cleanup(state, testInfo);
  });
});
