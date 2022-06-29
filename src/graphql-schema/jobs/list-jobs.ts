import type { ModerationState } from 'step-definitions/aaqua-admin/state/moderation-state.class';

import type {
  EntityType,
  ModerationJobsQuery,
  ModerationJobsQueryVariables,
} from '../generated/graphql-request';
import {
  ModerationJobsDocument,
  ModerationStatus,
} from '../generated/graphql-request';
import { getGraphQLClient } from '../graphQL-utils';

import type { ModerationQueueEdge } from './types';

export const canFindReportedModerationJob = async (
  moderationState: ModerationState,
  user: string,
  queue: string
): Promise<boolean> => {
  const { entityId, entityType } = moderationState.reportedEntity;

  const client = await getGraphQLClient(user);
  const variables: ModerationJobsQueryVariables = {
    filter: {
      // by adding the fandomId we receive an empty array
      // fandomId: getModerationTestCommunityId(),
      entityType: entityType as EntityType,
      moderationStatus: ModerationStatus.Pending,
      reportReason: moderationState.reportedReason,
      queues: [queue],
    },
    first: 100,
  };

  let found = false;
  let hasNextPage = false;
  do {
    const result = await client.query<ModerationJobsQuery | undefined>({
      query: ModerationJobsDocument,
      variables,
    });

    if (!result) {
      console.error('The GraphQL query returned no results?');
      client.closeSession();
      return false;
    }
    found =
      result?.data?.moderationJobs?.edges
        .map((edge) => getEntityId(edge as ModerationQueueEdge))
        .indexOf(entityId) != -1;

    if (result?.data?.moderationJobs?.pageInfo.hasNextPage) {
      hasNextPage = true;
      variables.after = result?.data?.moderationJobs?.pageInfo.endCursor;
    }
  } while (!found && hasNextPage);

  client.closeSession();
  return found;
};

const getEntityId = (edge: ModerationQueueEdge) => {
  const entity = edge?.node?.entity;
  switch (entity?.__typename) {
    case 'CommentModerationInfo': {
      return entity.comment?.id;
    }
    case 'EventModerationInfo': {
      return entity.event?.id;
    }
    case 'PollModerationInfo': {
      return entity.poll?.id;
    }
    case 'PostModerationInfo': {
      return entity.post?.id;
    }
    default: {
      return null;
    }
  }
};
