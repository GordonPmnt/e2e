import { Given, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import type { Page } from 'playwright';

import { createCommentForEntity } from '../../graphql-schema/comment/create-comment';
import { createEvent } from '../../graphql-schema/event/create-event';
import type {
  AttachmentInput,
  CommentAttachmentInput,
  EventAttachmentInput,
} from '../../graphql-schema/generated/graphql-request';
import { createPoll } from '../../graphql-schema/poll/create-poll';
import { createPost } from '../../graphql-schema/post/create-post';
import { ModerationJobDetailsPage } from '../../pages/moderation/moderation-job-details.page';
import type { ICustomWorld } from '../../support/custom-world';

Given(
  'a {string} has been created by {string} with text {string}',
  async function (
    this: ICustomWorld,
    entityType: string,
    user: string,
    content: string
  ) {
    const title = content;
    switch (entityType) {
      case 'POST': {
        this.moderation.mainContent = await createPost(user, title, content);
        break;
      }
      case 'COMMENT':
        if (!this.moderation.mainContent) {
          throw new Error(
            `Error while creating comment - main content (POST, POLL, EVENT) is undefined `
          );
        }

        this.moderation.comment = await createCommentForEntity(
          user,
          this.moderation.mainContent,
          content
        );

        break;
      case 'POLL':
        this.moderation.mainContent = await createPoll(user, content);
        break;
      case 'EVENT':
        this.moderation.mainContent = await createEvent(user, title, content);
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
  'a {string} has been created by {string} with image',
  async function (this: ICustomWorld, entityType: string, user: string) {
    const content = 'Test';
    const title = content;

    switch (entityType) {
      case 'POST': {
        this.moderation.mainContent = await createPost(
          user,
          title,
          content,
          this.moderation.attachment as AttachmentInput
        );
        break;
      }
      case 'COMMENT':
        if (!this.moderation.mainContent) {
          throw new Error(
            `Error while creating comment - main content (POST, POLL, EVENT) is undefined `
          );
        }

        this.moderation.comment = await createCommentForEntity(
          user,
          this.moderation.mainContent,
          content,
          this.moderation.attachment as CommentAttachmentInput
        );
        break;
      case 'EVENT':
        this.moderation.mainContent = await createEvent(
          user,
          title,
          content,
          this.moderation.attachment as EventAttachmentInput
        );
        break;
      case 'POLL':
        throw new Error(`Impossible to add attachment to the poll`);
      case 'USER':
        throw new Error(`Entity type ${entityType} is not yet implemented`);
      default:
        throw new Error(
          `Unknown entity type ${entityType}. Please use POST, COMMENT, POLL, EVENT or USER`
        );
    }
  }
);

Then('I see AI reports for {string}', async function (reports: string) {
  const expectedAiReports = reports.split(',').sort();
  const { page } = this;
  const moderationDetailsPage = new ModerationJobDetailsPage(<Page>page);

  expect(await moderationDetailsPage.getAiReports()).toEqual(expectedAiReports);
});
