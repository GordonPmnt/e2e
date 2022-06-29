/* eslint-disable import/namespace */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { expect } from '@playwright/test';
import type { AaquaEntityBaseInfo } from 'utils/aaqua-entity-base-info.class';

import { getCommunityFeedsId } from '../../../graphql-schema/feeds/community/community-feeds';
import { getEventFeedsId } from '../../../graphql-schema/feeds/event/event-feeds';
import { getHomeHighLightFeedsId } from '../../../graphql-schema/feeds/homeFeedHighlights/home-feed-highlights';
import { getProfileFeedsId } from '../../../graphql-schema/feeds/profile/profile-feeds';
import {
  FeedItemSourceType,
  FeedItemType,
} from '../../../graphql-schema/generated/graphql-request';
import { getModerationTestCommunityId } from '../../../utils/credentials';

enum QueryFeedEnum {
  communityFeedName = 'community',
  highlightFeedName = 'highlight',
  profileFeedName = 'profile',
  eventFeedName = 'event',
}
const availableFeeds: string[] = [
  QueryFeedEnum.communityFeedName,
  QueryFeedEnum.highlightFeedName,
  QueryFeedEnum.profileFeedName,
  QueryFeedEnum.eventFeedName,
];

const hasToCheckCommunityFeed = (feedName: string) =>
  feedName.includes(QueryFeedEnum.communityFeedName);

const hasToCheckHighlightFeed = (feedName: string) =>
  feedName.includes(QueryFeedEnum.highlightFeedName);

const hasToCheckProfileFeed = (feedName: string) =>
  feedName.includes(QueryFeedEnum.profileFeedName);

const hasToCheckEventFeed = (feedName: string, entityType: FeedItemType) =>
  feedName.includes(QueryFeedEnum.eventFeedName) &&
  entityType === FeedItemType.Event;
export const checkIsValidStep = (
  reportedEntity: AaquaEntityBaseInfo,
  visibility: string,
  feedName: string
): void => {
  if (visibility !== 'visible' && visibility !== 'hidden') {
    throw new Error(
      `Unknown visibility type ${visibility}. Please use visible or hidden`
    );
  }

  const feedNameList = feedName
    .split(',')
    .map((feedNameItem) => feedNameItem.trim());

  // throw an error if feedNameItem does not exist in the available feeds list
  if (
    feedNameList.find((feedNameItem) => !availableFeeds.includes(feedNameItem))
  ) {
    throw new Error(`Unknown feedName ${feedName}.`);
  }

  if (!reportedEntity) {
    throw new Error(`content (POST/POLL/EVENT) is undefined `);
  }

  const { entityType } = reportedEntity;

  if (entityType === 'USER' || entityType === 'COMMENT') {
    throw new Error(`By default entity ${entityType} is not in feeds result`);
  }
};

const checkInFeed = async (
  feedName: string,
  entityId: string,
  entityType: FeedItemType,
  user: string,
  visibility: string
) => {
  let entityHasExpectedVisibility = false;

  // sometimes the backend returns the hidden entity because the api call comes to fast
  // reason why there are 10 tries and a timeout
  const nbRetries = 10;
  for (let i = 0, j = 1; i < nbRetries; i++, j++) {
    let feedsId = null;

    switch (feedName) {
      case 'community':
        feedsId = await getCommunityFeedsId(entityType, user);
        break;

      case 'highlight':
        feedsId = await getHomeHighLightFeedsId(
          getModerationTestCommunityId(),
          entityType,
          user
        );
        break;

      case 'profile':
        feedsId = await getProfileFeedsId(entityType, user);
        break;

      case 'event':
        feedsId = await getEventFeedsId(
          getModerationTestCommunityId(),
          entityType,
          [FeedItemSourceType.Regular],
          user
        );
        break;
    }

    if (!feedsId) {
      throw new Error(`${feedName} feed returns null `);
      break;
    }

    const entityIdx = feedsId.indexOf(entityId);

    if (visibility === 'visible') {
      entityHasExpectedVisibility = entityIdx > -1;
    } else {
      entityHasExpectedVisibility = entityIdx === -1;
    }

    if (entityHasExpectedVisibility) {
      break;
    }

    if (i < nbRetries) {
      await new Promise((resolve) => setTimeout(resolve, j * 500));
    }
  }
  expect(entityHasExpectedVisibility).toBe(true);
};

export const checkMemberFeeds = async (
  feedName: string,
  entityId: string,
  entityType: FeedItemType,
  user: string,
  visibility: string
): Promise<void> => {
  /*  I tried to use an array with a list a feedNames but without success
        forEach, for let i in , PromiseAll  ==> error */
  if (hasToCheckCommunityFeed(feedName)) {
    await checkInFeed(
      'community',
      entityId,
      entityType as FeedItemType,
      user,
      visibility
    );
  }

  if (hasToCheckHighlightFeed(feedName)) {
    await checkInFeed(
      'highlight',
      entityId,
      entityType as FeedItemType,
      user,
      visibility
    );
  }

  // currently it's working only for EVENT - 16/12/2021
  if (hasToCheckEventFeed(feedName, entityType)) {
    await checkInFeed(
      'event',
      entityId,
      entityType as FeedItemType,
      user,
      visibility
    );
  }
};
export const checkCreatorFeeds = async (
  feedName: string,
  entityId: string,
  entityType: FeedItemType,
  user: string,
  visibility: string
): Promise<void> => {
  if (hasToCheckProfileFeed(feedName)) {
    await checkInFeed(
      'profile',
      entityId,
      entityType as FeedItemType,
      user,
      visibility
    );
  }

  // currently it's working only for EVENT - 16/12/2021
  if (hasToCheckEventFeed(feedName, entityType)) {
    await checkInFeed(
      'event',
      entityId,
      entityType as FeedItemType,
      user,
      visibility
    );
  }
};
