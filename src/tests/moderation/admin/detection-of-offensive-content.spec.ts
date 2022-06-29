import path from 'path';

import { expect, test } from '@playwright/test';

import {
  defineFeature,
  type DefineStepFunction,
  loadFeature,
} from '../../../gherkin-utils';
import { ensureExistsModerationJob } from '../../../graphql-schema/jobs/find-job';
import { uploadFile } from '../../../graphql-schema/upload/upload';
import { ModerationJobDetailsPage } from '../../../pages/moderation/moderation-job-details.page';
import { ModerationState } from '../../../step-definitions/aaqua-admin/state/moderation-state.class';
import { login } from '../../../step-definitions/login/login.spec';
import { AaquaAdminApp } from '../../../utils/url-builder';
import { cleanup } from '../utils/cleanup.utils';
import { createEntity } from '../utils/create-entity.utils';

const feature = loadFeature(
  'src/tests/moderation/admin/detection-of-offensive-content.feature'
);

let state: ModerationState;

defineFeature(feature, ({ given, and, when, then }) => {
  (
    given as DefineStepFunction<{
      entity_type: string;
      user: string;
      content: string;
    }>
  )(
    /^a "(?<entity_type>\w+)" has been created by "(?<user>\w+)" with text "(?<content>.+)"$/,
    async (_, { entity_type, user, content }) => {
      state = await createEntity(entity_type, user, content);
    }
  );

  (given as DefineStepFunction<{ filename: string; user: string }>)(
    /^the image "(?<filename>.+)" has been uploaded by "(?<user>\w+)"$/,
    async (_, { filename, user }) => {
      const imgPath = path.join(
        __dirname + '../../../../',
        `assets/${filename}`
      );
      const id = await uploadFile(user, imgPath);

      state = new ModerationState();
      state.attachment = {
        attachmentId: id as string,
        type: 'IMAGE',
      };
    }
  );

  (given as DefineStepFunction<{ user: string }>)(
    /^a POST has been created by "(?<user>\w+)"$/,
    async (_, { user }) => {
      state = await createEntity('POST', user);
    }
  );

  (and as DefineStepFunction<{ entity_type: string; user: string }>)(
    /^a "(?<entity_type>\w+)" has been created by "(?<user>\w+)" with image$/,
    async (_, { entity_type, user }) => {
      state = await createEntity(entity_type, user, 'Test', state.attachment);
    }
  );

  (and as DefineStepFunction<{ app: string; user: string }>)(
    /^I am logged in the "(?<app>\w+)" app as user "(?<user>\w+)"$/,
    async ({ page }, { app, user }) => {
      await login({ page }, app, user);
    }
  );

  (and as DefineStepFunction<void>)(
    /^an offensive content been detected by AI$/,
    async () => {
      const entityId = state.comment?.entityId ?? state.mainContent?.entityId;
      const moderationJob = await ensureExistsModerationJob(
        entityId as string,
        'MOD_INTERNAL_MODERATOR_1',
        240
      );
      const isComment = state.comment?.entityId !== undefined;

      const reportReason = moderationJob?.reportInfo?.aiReports[0]
        .reportReason as string;
      if (isComment) {
        state.reportCommentWithReason(reportReason);
      } else {
        state.reportContentWithReason(reportReason);
      }
    }
  );

  (when as DefineStepFunction<void>)(
    /^I navigate to the reported entity detail$/,
    async ({ page }) => {
      const { entityId, entityType } = state.reportedEntity;
      await page.goto(
        AaquaAdminApp.moderationJobEntityDetailUrl(entityId, entityType)
      );
    }
  );

  (then as DefineStepFunction<{ reports: string }>)(
    /^I see AI reports for "(?<reports>.+)"$/,
    async ({ page }, { reports }) => {
      const expectedAiReports = reports.split(',').sort();
      const moderationDetailsPage = new ModerationJobDetailsPage(page);

      expect(await moderationDetailsPage.getAiReports()).toEqual(
        expectedAiReports
      );
    }
  );

  // eslint-disable-next-line no-empty-pattern
  test.afterEach(async ({}, testInfo) => {
    await cleanup(state, testInfo);
  });
});
