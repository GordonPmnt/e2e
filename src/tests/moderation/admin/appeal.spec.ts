import { expect, test } from '@playwright/test';
import type { Page } from 'playwright';

import { defineFeature, loadFeature } from '../../../gherkin-utils';
import type { DefineStepFunction } from '../../../gherkin-utils/define-feature.util';
import { appealJob } from '../../../graphql-schema/appeal/appeal-job';
import { EntityVisibility } from '../../../graphql-schema/generated/graphql-request';
import { ModerationJobDetailsPage } from '../../../pages/moderation/moderation-job-details.page';
import type { ModerationState } from '../../../step-definitions/aaqua-admin/state/moderation-state.class';
import { getModerationTypeFromString } from '../../../step-definitions/aaqua-admin/utils/moderation-helper';
import { login } from '../../../step-definitions/login/login.spec';
import { AaquaAdminApp } from '../../../utils/url-builder';
import { cleanup } from '../utils/cleanup.utils';
import { createEntity } from '../utils/create-entity.utils';
import { reportEntity } from '../utils/report-entity.utils';
import { reviewEntity } from '../utils/review-entity.utils';

const feature = loadFeature('src/tests/moderation/admin/appeal.feature');

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

  (
    and as DefineStepFunction<{
      user: string;
      violationType: string;
    }>
  )(
    /^entity is hidden by "(?<user>\w+)" with the violationType "(?<violationType>\w+)"$/,
    async (_, { user, violationType }) => {
      await reviewEntity(EntityVisibility.Hidden, state, user, violationType);
    }
  );

  (
    and as DefineStepFunction<{
      user: string;
    }>
  )(/^entity is appealed by "(?<user>\w+)"$/, async (_, { user }) => {
    const { entityId } = state.reportedEntity;
    await appealJob(entityId, user);
  });

  (when as DefineStepFunction<{ app: string; user: string }>)(
    /^I am logged in the "(?<app>\w+)" app as user "(?<user>\w+)"$/,
    async ({ page }, { app, user }) => {
      await login({ page }, app, user);
    }
  );

  (
    then as DefineStepFunction<{
      entityType: string;
      role: 'CREATOR' | 'REPORTER';
    }>
  )(
    /^I should see that "(?<entityType>\w+)" is appealed by "(?<role>\w+)"$/,
    async ({ page }, { role }) => {
      const detailsPage = new ModerationJobDetailsPage(<Page>page);

      const { entityId, entityType } = state.reportedEntity;

      const jobDetails = AaquaAdminApp.moderationJobEntityDetailUrl(
        entityId,
        entityType
      );

      await page?.goto(jobDetails);

      const appealCardSelector =
        role === 'CREATOR'
          ? detailsPage.appealByCreatorCard
          : detailsPage.appealByReporterCard;
      expect(await page?.waitForSelector(appealCardSelector)).toBeTruthy();
    }
  );

  (then as DefineStepFunction<{ role: 'CREATOR' | 'REPORTER' }>)(
    /^I should see that the "(?<role>\w+)" appeal notes are present$/,
    async ({ page }, { role }) => {
      const detailsPage = new ModerationJobDetailsPage(<Page>page);

      if (role === 'CREATOR') {
        expect(
          await page?.waitForSelector(detailsPage.creatorAppealNoteSelector)
        ).toBeTruthy();
      } else {
        await page?.click(detailsPage.appealNoteButtonSelector);
        expect(
          await page?.waitForSelector(detailsPage.reporterAppealNoteSelector)
        ).toBeTruthy();
      }
    }
  );

  (and as DefineStepFunction<{ user: string }>)(
    /^entity is kept by "(?<user>\w+)"$/,
    async (_, { user }) => {
      await reviewEntity(EntityVisibility.Visible, state, user);
    }
  );

  // eslint-disable-next-line no-empty-pattern
  test.afterEach(async ({}, testInfo) => {
    await cleanup(state, testInfo);
  });
});
