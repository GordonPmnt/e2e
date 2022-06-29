import { test } from '@playwright/test';

import { defineFeature, loadFeature } from '../../../gherkin-utils';
import type { DefineStepFunction } from '../../../gherkin-utils/define-feature.util';
import { CommunitiesPage } from '../../../pages/home/communities.page';
import { ModerationJobDetailsPage } from '../../../pages/moderation/moderation-job-details.page';
import type { ModerationState } from '../../../step-definitions/aaqua-admin/state/moderation-state.class';
import { getModerationTypeFromString } from '../../../step-definitions/aaqua-admin/utils/moderation-helper';
import { login } from '../../../step-definitions/login/login.spec';
import { AaquaPartnerApp } from '../../../utils/url-builder';
import { cleanup } from '../utils/cleanup.utils';
import { createEntity } from '../utils/create-entity.utils';
import type { ViolationType } from '../utils/moderation-i18n-helper';
import { reportEntity } from '../utils/report-entity.utils';
import {
  verifyEntityIsNotVisible,
  verifyEntityIsVisible,
} from '../utils/verify-entity.utils';

const feature = loadFeature(
  'src/tests/moderation/partner/moderate-reported-comment.feature'
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

  (when as DefineStepFunction)(
    /^I review the job in the partner site and keep it visible$/,
    async ({ page }) => {
      const { entityId, entityType } = state.reportedEntity;

      await page?.goto(
        AaquaPartnerApp.contentModerationJobEntityDetailUrl(
          entityId,
          entityType
        )
      );
      await page?.click('text="Keep Content Visible"');
      await page?.waitForSelector(`text="This content will remain visible"`);
    }
  );

  (when as DefineStepFunction<{ violationType: ViolationType }>)(
    /^I review the job and hide it with the violationType "(?<violationType>[\s\w]+)"$/,
    async ({ page }, { violationType }) => {
      const { entityId, entityType } = state.reportedEntity;

      await page?.goto(
        AaquaPartnerApp.contentModerationJobEntityDetailUrl(
          entityId,
          entityType
        )
      );

      const detailsPage = new ModerationJobDetailsPage(page);

      await detailsPage.hideContent(violationType);

      await page?.waitForNavigation();
    }
  );

  (
    then as DefineStepFunction<{
      visibility: string;
      reporter: string;
    }>
  )(
    /^the comment is "(?<visibility>\w+)" for member "(?<reporter>\w+)"$/,
    async (_, { visibility, reporter }) => {
      switch (visibility) {
        case 'hidden':
          await verifyEntityIsNotVisible(state, [reporter]);
          break;

        case 'visible':
          await verifyEntityIsVisible(state, reporter);
          break;
      }
    }
  );

  // eslint-disable-next-line no-empty-pattern
  test.afterEach(async ({}, testInfo) => {
    await cleanup(state, testInfo);
  });
});
