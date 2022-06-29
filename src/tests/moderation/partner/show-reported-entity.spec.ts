import { test } from '@playwright/test';

import { defineFeature, loadFeature } from '../../../gherkin-utils';
import type { DefineStepFunction } from '../../../gherkin-utils/define-feature.util';
import { sleep } from '../../../graphql-schema/AaquaApolloClient.class';
import { ensureExistsModerationJob } from '../../../graphql-schema/jobs/find-job';
import { CommunitiesPage } from '../../../pages/home/communities.page';
import { JobsPage } from '../../../pages/jobs.page';
import type { ModerationState } from '../../../step-definitions/aaqua-admin/state/moderation-state.class';
import { getModerationTypeFromString } from '../../../step-definitions/aaqua-admin/utils/moderation-helper';
import { login } from '../../../step-definitions/login/login.spec';
import { getModerationTestCommunityId } from '../../../utils/credentials';
import { getPartnerBaseUrl } from '../../../utils/utils';
import { cleanup } from '../utils/cleanup.utils';
import { createEntity } from '../utils/create-entity.utils';
import { reportEntity } from '../utils/report-entity.utils';

const feature = loadFeature(
  'src/tests/moderation/partner/show-reported-entity.feature'
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

  (and as DefineStepFunction<{ communityName: string }>)(
    /^I navigate to "(?<communityName>[\s\w]+)" community$/,
    async ({ page }, { communityName }) => {
      const communitiesPage = new CommunitiesPage(page);
      await communitiesPage.clickOnCommunity(communityName);
      await page?.waitForSelector(
        '//h1[normalize-space()="Community Overview"]'
      );
    }
  );

  (when as DefineStepFunction<void>)(
    /I navigate to the content moderation jobs page$/,
    async ({ page }) => {
      await page.goto(
        `${getPartnerBaseUrl()}/communities/${getModerationTestCommunityId()}/content-moderation/jobs`
      );
    }
  );

  (then as DefineStepFunction<{ reason: string }>)(
    /^I should see the reported entity with "(?<reason>.+)"$/,
    async ({ page }, { reason }) => {
      const jobsPage = new JobsPage(page, 'PARTNER');
      const { entityContent } = state.reportedEntity;

      await ensureExistsModerationJob(
        state.reportedEntity.entityId,
        'MOD_ADMIN'
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

  // eslint-disable-next-line no-empty-pattern
  test.afterEach(async ({}, testInfo) => {
    await cleanup(state, testInfo);
  });
});
