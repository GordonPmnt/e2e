import { test } from '@playwright/test';

import type { DefineStepFunction } from '../../../gherkin-utils';
import { defineFeature, loadFeature } from '../../../gherkin-utils';
import type { FeedItemType } from '../../../graphql-schema/generated/graphql-request';
import { ModerationJobDetailsPage } from '../../../pages/moderation/moderation-job-details.page';
import type { ModerationState } from '../../../step-definitions/aaqua-admin/state/moderation-state.class';
import { getModerationTypeFromString } from '../../../step-definitions/aaqua-admin/utils/moderation-helper';
import { login } from '../../../step-definitions/login/login.spec';
import { AaquaAdminApp } from '../../../utils/url-builder';
import { cleanup } from '../utils/cleanup.utils';
import { createEntity } from '../utils/create-entity.utils';
import {
  checkCreatorFeeds,
  checkIsValidStep,
  checkMemberFeeds,
} from '../utils/moderation-entity-visibility-feeds.utils';
import type { ViolationType } from '../utils/moderation-i18n-helper';
import { reportEntity } from '../utils/report-entity.utils';

const feature = loadFeature(
  'src/tests/moderation/admin/entity-is-hidden-in-the-feeds.feature'
);

let state: ModerationState;

defineFeature(feature, ({ given, and, when }) => {
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

  (
    and as DefineStepFunction<{
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

  (
    and as DefineStepFunction<{
      visibility: string;
      creator: string;
      feedName: string;
    }>
  )(
    /^the entity is "(?<visibility>\w+)" for creator "(?<creator>\w+)" in "(?<feedName>[\s\w,]+)" feeds$/,
    async (_, { visibility, creator: user, feedName }) => {
      const { entityId, entityType } = state.reportedEntity;

      checkIsValidStep(entityType, visibility, feedName);

      await checkCreatorFeeds(
        feedName,
        entityId,
        entityType as FeedItemType,
        user,
        visibility
      );
    }
  );

  (and as DefineStepFunction<{ app: string; user: string }>)(
    /^I am logged in the "(?<app>\w+)" app as user "(?<user>\w+)"$/,
    async ({ page }, { app, user }) => {
      await login({ page }, app, user);
    }
  );

  (when as DefineStepFunction<{ violationType: ViolationType }>)(
    /^I review the job and hide it with the violationType "(?<violationType>\w+)"$/,
    async ({ page }, { violationType }) => {
      await page.goto(
        AaquaAdminApp.moderationJobEntityDetailUrl(
          state.reportedEntity.entityId,
          state.reportedEntity.entityType
        )
      );
      const detailsPage = new ModerationJobDetailsPage(page);
      await detailsPage.hideContent(violationType);
      await page?.waitForNavigation();
    }
  );

  // eslint-disable-next-line no-empty-pattern
  test.afterEach(async ({}, testInfo) => {
    await cleanup(state, testInfo);
  });
});
