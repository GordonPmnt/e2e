/* eslint-disable import/namespace */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';

import { getEventCommentIds } from '../../../graphql-schema/event-comment/event-comments';
import { getPollCommentIds } from '../../../graphql-schema/poll-comment/poll-comments';
import { getPostCommentIds } from '../../../graphql-schema/post-comment/post-comments';
import type { ICustomWorld } from '../../../support/custom-world';

Then(
  'the comment is {string} for member {string}',
  async function (this: ICustomWorld, visibility: string, user: string) {
    if (visibility !== 'visible' && visibility !== 'hidden') {
      throw new Error(
        `Unknown visibility type ${visibility}. Please use visible or hidden`
      );
    }

    const mainContent = this.moderation.mainContent;

    if (!mainContent) {
      throw new Error(`content (POST/POLL/EVENT) is undefined `);
    }

    const { entityId, entityType } = this.moderation.reportedEntity;

    if (entityType !== 'COMMENT') {
      throw new Error(`Reported entity  ${entityType} is not a COMMENT`);
    }

    let entityHasExpectedVisibility = false;

    const nbRetries = 10;
    for (let i = 0, j = 1; i < nbRetries; i++, j++) {
      let commentIds = null;

      switch (mainContent.entityType) {
        case 'POST':
          commentIds = await getPostCommentIds(mainContent.entityId, user);
          break;
        case 'POLL':
          commentIds = await getPollCommentIds(mainContent.entityId, user);
          break;
        case 'EVENT':
          commentIds = await getEventCommentIds(mainContent.entityId, user);
          break;
      }

      if (!commentIds) {
        throw new Error(`${entityType} comments returns null `);
        break;
      }

      const entityIdx = commentIds.indexOf(entityId);

      if (visibility === 'visible') {
        entityHasExpectedVisibility = entityIdx > -1;
      } else {
        entityHasExpectedVisibility = entityIdx === -1;
      }

      if (entityHasExpectedVisibility) {
        break;
      }

      if (i < nbRetries) {
        await this.page?.waitForTimeout(j * 500);
      }
    }
    expect(entityHasExpectedVisibility).toBe(true);
  }
);
