/* eslint-disable import/namespace */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */

import path from 'path';

import { Given, Then, When } from '@cucumber/cucumber';
import type { Page } from 'playwright';

import { sleep } from '../../graphql-schema/AaquaApolloClient.class';
import { createCommentForEntity } from '../../graphql-schema/comment/create-comment';
import { reportEntity } from '../../graphql-schema/entity/report-entity';
import { reviewEntity } from '../../graphql-schema/entity/review-entity';
import { createEvent } from '../../graphql-schema/event/create-event';
import { EntityVisibility } from '../../graphql-schema/generated/graphql-request';
import { ensureExistsModerationJob } from '../../graphql-schema/jobs/find-job';
import { createPoll } from '../../graphql-schema/poll/create-poll';
import { createPost } from '../../graphql-schema/post/create-post';
import { uploadFile } from '../../graphql-schema/upload/upload';
import { JobsPage } from '../../pages/jobs.page';
import { ModerationJobDetailsPage } from '../../pages/moderation/moderation-job-details.page';
import type { ICustomWorld } from '../../support/custom-world';
import type { ViolationType } from '../../tests/moderation/utils/moderation-i18n-helper';
import { AaquaAdminApp, AaquaPartnerApp } from '../../utils/url-builder';

import { getModerationTypeFromString } from './utils/moderation-helper';

Given(
  'the created {string} has been reported to {string} with reason {string} by member {string}',
  async function (
    this: ICustomWorld,
    entityType: string,
    moderatorLevel: string,
    reportReason: string,
    user: string
  ) {
    const moderatorType = getModerationTypeFromString(moderatorLevel);
    let reportId = undefined;
    switch (entityType) {
      case 'COMMENT':
        this.moderation.reportCommentWithReason(reportReason);
        reportId = await reportEntity(
          this.moderation.reportedEntity.entityId,
          user,
          reportReason,
          moderatorType
        );
        break;
      case 'POST':
      case 'POLL':
      case 'EVENT':
        this.moderation.reportContentWithReason(reportReason);
        reportId = await reportEntity(
          this.moderation.reportedEntity.entityId,
          user,
          reportReason,
          moderatorType
        );
        break;
      case 'USER':
        throw new Error(`Entity type ${entityType} is not yet implemented`);
      default:
        throw new Error(
          `Unknown entity type ${entityType}. Please use POST, COMMENT, POLL, EVENT or USER`
        );
    }

    if (!reportId) {
      throw new Error(
        `Entity ${this.moderation.reportedEntity?.entityType} has not been reported`
      );
    }
  }
);

Given(
  'a {string} has been created by {string}',
  async function (this: ICustomWorld, entityType: string, user: string) {
    switch (entityType) {
      case 'POST': {
        this.moderation.mainContent = await createPost(user);
        break;
      }
      case 'COMMENT': {
        if (!this.moderation.mainContent) {
          throw new Error(
            `Error while creating comment - main content (POST, POLL, EVENT) is undefined `
          );
        }

        this.moderation.comment = await createCommentForEntity(
          user,
          this.moderation.mainContent
        );

        break;
      }
      case 'POLL':
        this.moderation.mainContent = await createPoll(user);
        break;
      case 'EVENT':
        this.moderation.mainContent = await createEvent(user);
        break;
      case 'USER':
        throw new Error(`Entity type ${entityType} is not yet implemented`);
      default:
        throw new Error(
          `Unknown entity type ${entityType}. Please use POST, COMMENT, POLL, EVENT or USER`
        );
    }
  }
);

Given(
  'the image {string} has been uploaded by {string}',
  async function (this: ICustomWorld, fileName: string, user: string) {
    const imgPath = path.join(__dirname + './../../', `assets/${fileName}`);
    const id = await uploadFile(user, imgPath);

    this.moderation.attachment = {
      attachmentId: id as string,
      type: 'IMAGE',
    };
  }
);

Given(
  'an offensive content been detected by AI',
  { timeout: 5 * 60 * 1000 },
  async function (this: ICustomWorld) {
    const entityId =
      this.moderation.comment?.entityId ??
      this.moderation.mainContent?.entityId;
    const moderationJob = await ensureExistsModerationJob(
      entityId as string,
      this.loggedUser as string,
      240
    );
    const isComment = this.moderation.comment?.entityId !== undefined;

    const reportReason = moderationJob?.reportInfo?.aiReports[0]
      .reportReason as string;
    if (isComment) {
      this.moderation.reportCommentWithReason(reportReason);
    } else {
      this.moderation.reportContentWithReason(reportReason);
    }
  }
);

Then(
  'I should see the reported entity with {string}',
  async function (this: ICustomWorld, reason: string) {
    const { page } = this;
    const jobsPage = new JobsPage(<Page>page, this.site);
    const { entityContent } = this.moderation.reportedEntity;

    await ensureExistsModerationJob(
      this.moderation.reportedEntity.entityId,
      this.loggedUser!
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

Then(
  'I review the job and keep it visible',
  async function (this: ICustomWorld) {
    const { entityId, entityType } = this.moderation.reportedEntity;

    const { page } = this;
    await page?.goto(
      AaquaAdminApp.moderationJobEntityDetailUrl(entityId, entityType)
    );
    // await page?.click(`text=${this.getEntityTitle()}`);
    await page?.click('text="Keep Content Visible"');
  }
);

Then(
  'I review the job and hide it with the violationType {string}',
  async function (this: ICustomWorld, violationType: ViolationType) {
    const { entityId, entityType } = this.moderation.reportedEntity;

    const { page } = this;
    switch (this.site) {
      case 'PARTNER':
        await page?.goto(
          AaquaPartnerApp.contentModerationJobEntityDetailUrl(
            entityId,
            entityType
          )
        );
        break;
      case 'ADMINISTRATION':
        await page?.goto(
          AaquaAdminApp.moderationJobEntityDetailUrl(entityId, entityType)
        );
        break;
      default:
        throw new Error(`${this.site} invalid page url`);
    }

    const detailsPage = new ModerationJobDetailsPage(<Page>page);

    await detailsPage.hideContent(violationType);

    await page?.waitForNavigation();
  }
);

Then(
  'entity is hidden by {string} with the violationType {string}',
  async function (this: ICustomWorld, user: string, violationType: string) {
    const { entityId } = this.moderation.reportedEntity;
    await reviewEntity(entityId, user, EntityVisibility.Hidden, violationType);
  }
);

Then(
  'entity is kept by {string}',
  async function (this: ICustomWorld, user: string) {
    const { entityId } = this.moderation.reportedEntity;
    await reviewEntity(entityId, user, EntityVisibility.Visible);
  }
);

When('I navigate to the history page', async function (this: ICustomWorld) {
  const { page } = this;
  await page?.click(`[href="/moderation/history"]`);
  await page?.waitForNavigation();
  await page?.waitForFunction(
    () => {
      const jobs = document.querySelectorAll('[aria-label="Show_details"]');
      return jobs.length >= 30;
    },
    null,
    { polling: 500 }
  );
});
