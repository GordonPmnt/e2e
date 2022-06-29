/* eslint-disable import/namespace */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Then } from '@cucumber/cucumber';

import type { FeedItemType } from '../../../graphql-schema/generated/graphql-request';
import type { ICustomWorld } from '../../../support/custom-world';

import {
  checkCreatorFeeds,
  checkIsValidStep,
  checkMemberFeeds,
} from './moderation-entity-visibility-feeds.utils';

Then(
  'the entity is {string} for member {string} in {string} feeds',
  async function (
    this: ICustomWorld,
    visibility: string,
    user: string,
    feedName: string
  ) {
    checkIsValidStep(this.moderation.reportedEntity, visibility, feedName);

    const { entityId, entityType } = this.moderation.reportedEntity;

    await checkMemberFeeds(
      feedName,
      entityId,
      entityType as FeedItemType,
      user,
      visibility
    );
  }
);
Then(
  'the entity is {string} for creator {string} in {string} feeds',
  async function (
    this: ICustomWorld,
    visibility: string,
    user: string,
    feedName: string
  ) {
    checkIsValidStep(this.moderation.reportedEntity, visibility, feedName);

    const { entityId, entityType } = this.moderation.reportedEntity;

    await checkCreatorFeeds(
      feedName,
      entityId,
      entityType as FeedItemType,
      user,
      visibility
    );
  }
);
