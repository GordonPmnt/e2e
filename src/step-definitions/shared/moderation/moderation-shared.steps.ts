/* eslint-disable import/namespace */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */

import { Given, When } from '@cucumber/cucumber';

import { createCommentForEntity } from '../../../graphql-schema/comment/create-comment';
import { reportEntity } from '../../../graphql-schema/entity/report-entity';
import { createEvent } from '../../../graphql-schema/event/create-event';
import type { ModeratorType } from '../../../graphql-schema/generated/graphql-request';
import { createPoll } from '../../../graphql-schema/poll/create-poll';
import { createPost } from '../../../graphql-schema/post/create-post';
import type { ICustomWorld } from '../../../support/custom-world';
import type { MainContentType } from '../../../utils/aaqua-entity-base-info.class';
import { AaquaAdminApp, AaquaPartnerApp } from '../../../utils/url-builder';
import { getModerationTypeFromString } from '../../aaqua-admin/utils/moderation-helper';

const reportMainEntity = async (
  customWorld: ICustomWorld,
  reporter: string,
  reportReason: string,
  moderatorType: ModeratorType
): Promise<string | undefined> => {
  customWorld.moderation.reportContentWithReason(reportReason);
  const { entityId } = customWorld.moderation.reportedEntity;
  return await reportEntity(entityId, reporter, reportReason, moderatorType);
};

const createAndReportComment = async (
  customWorld: ICustomWorld,
  creator: string,
  reporter: string,
  reportReason: string,
  moderatorType: ModeratorType
): Promise<string | undefined> => {
  customWorld.moderation.comment = await createCommentForEntity(
    creator,
    customWorld.moderation.mainContent as MainContentType
  );
  customWorld.moderation.reportCommentWithReason(reportReason);
  const { entityId } = customWorld.moderation.reportedEntity;
  return await reportEntity(entityId, reporter, reportReason, moderatorType);
};

Given(
  'a {string} created by {string} has been reported by {string} to {string} with reason {string}',
  async function (
    this: ICustomWorld,
    entityType: string,
    creator: string,
    reporter: string,
    moderatorLevel: string,
    reportReason: string
  ) {
    const moderatorType = getModerationTypeFromString(moderatorLevel);
    let reportId = undefined;
    switch (entityType) {
      case 'POST':
        this.moderation.mainContent = await createPost(creator);
        reportId = await reportMainEntity(
          this,
          reporter,
          reportReason,
          moderatorType
        );
        break;

      case 'POLL':
        this.moderation.mainContent = await createPoll(creator);
        reportId = await reportMainEntity(
          this,
          reporter,
          reportReason,
          moderatorType
        );
        break;

      case 'EVENT':
        this.moderation.mainContent = await createEvent(creator);
        reportId = await reportMainEntity(
          this,
          reporter,
          reportReason,
          moderatorType
        );
        break;

      case 'EVENT_COMMENT':
        this.moderation.mainContent = await createEvent(creator);
        reportId = await createAndReportComment(
          this,
          creator,
          reporter,
          reportReason,
          moderatorType
        );
        break;

      case 'POLL_COMMENT':
        this.moderation.mainContent = await createPoll(creator);
        reportId = await createAndReportComment(
          this,
          creator,
          reporter,
          reportReason,
          moderatorType
        );
        break;

      case 'POST_COMMENT':
        this.moderation.mainContent = await createPost(creator);
        reportId = await createAndReportComment(
          this,
          creator,
          reporter,
          reportReason,
          moderatorType
        );
        break;

      default:
        throw new Error(`Entity type ${entityType} is not implemented`);
    }

    if (!reportId) {
      throw new Error(
        `Entity ${this.moderation.reportedEntity?.entityType} has not been reported`
      );
    }
  }
);
When(
  'I update the moderation decision by making it appear again',
  async function (this: ICustomWorld) {
    const { entityId, entityType } = this.moderation.reportedEntity;

    const { page } = this;
    switch (this.site) {
      case 'PARTNER':
        await page?.goto(
          AaquaPartnerApp.contentModerationHistoryEntityDetailUrl(
            entityId,
            entityType
          )
        );
        break;
      case 'ADMINISTRATION':
        await page?.goto(
          AaquaAdminApp.moderationHistoryEntityDetailUrl(entityId, entityType)
        );
        break;
      default:
        throw new Error(`${this.site} invalid page url`);
    }

    await page?.click('text="Keep Content Visible"');
    await page?.waitForSelector(
      `text=This content will remain visible to members in the community`
    );
  }
);
