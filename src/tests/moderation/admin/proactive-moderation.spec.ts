import { test } from '@playwright/test';

import type { DefineStepFunction } from '../../../gherkin-utils';
import { defineFeature, loadFeature } from '../../../gherkin-utils';
import type { FeedItemType } from '../../../graphql-schema/generated/graphql-request';
import { ensureExistsEntityInModerationService } from '../../../graphql-schema/jobs/find-job';
import { ModerationJobDetailsPage } from '../../../pages/moderation/moderation-job-details.page';
import { SharedPage } from '../../../pages/shared.page';
import type { ModerationState } from '../../../step-definitions/aaqua-admin/state/moderation-state.class';
import { login } from '../../../step-definitions/login/login.spec';
import { cleanup } from '../utils/cleanup.utils';
import { createEntity } from '../utils/create-entity.utils';
import {
  checkIsValidStep,
  checkMemberFeeds,
} from '../utils/moderation-entity-visibility-feeds.utils';

const feature = loadFeature(
  'src/tests/moderation/admin/proactive-moderation.feature'
);

let state: ModerationState;
let loggedUser: string;

defineFeature(feature, ({ given, and, when, then }) => {
  (given as DefineStepFunction<{ entity_type: string; creator: string }>)(
    /^a "(?<entity_type>\w+)" has been created by "(?<creator>\w+)"$/,
    async (_, { entity_type, creator }) => {
      state = await createEntity(entity_type, creator);
    }
  );

  (and as DefineStepFunction<{ app: string; user: string }>)(
    /^I am logged in the "(?<app>\w+)" app as user "(?<user>\w+)"$/,
    async ({ page }, { app, user }) => {
      await login({ page }, app, user);
      loggedUser = user;
    }
  );

  (when as DefineStepFunction<void>)(
    /^I look for the non reported entity$/,
    async ({ page }) => {
      if (!loggedUser) {
        throw new Error('User must be logged in');
      }

      const entityId = state.mainContent?.entityId as string;
      await ensureExistsEntityInModerationService(entityId, loggedUser, 240);

      const sharedPage = new SharedPage(page);
      await sharedPage.lookForEntityById(entityId);
    }
  );

  (and as DefineStepFunction<void>)(
    /^I proactively review the job and hide it with the violationType CHILD$/,
    async ({ page }) => {
      const detailsPage = new ModerationJobDetailsPage(page);
      await detailsPage.hideContent('CHILD');

      state.reportContentWithoutReason();
      await page.waitForNavigation();
    }
  );

  (
    then as DefineStepFunction<{
      visibility: string;
      reporter: string;
      feedName: string;
    }>
  )(
    /^the entity is "(?<visibility>\w+)" for member "(?<reporter>\w+)" in "(?<feedName>[\s\w,]+)" feeds$/,
    async (_, { visibility, reporter: user, feedName }) => {
      const { entityId, entityType } = state.reportedEntity;

      checkIsValidStep(entityType, visibility, feedName);

      await checkMemberFeeds(
        feedName,
        entityId,
        entityType as FeedItemType,
        user,
        visibility
      );
    }
  );

  // eslint-disable-next-line no-empty-pattern
  test.afterEach(async ({}, testInfo) => {
    await cleanup(state, testInfo);
  });
});
