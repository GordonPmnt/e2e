import { sleep } from '../AaquaApolloClient.class';
import type {
  ModerationJob,
  ModerationJobByEntityIdQueryVariables,
} from '../generated/graphql-request';
import {
  ModerationJobByEntityIdDocument,
  ModerationStatus,
} from '../generated/graphql-request';
import { getGraphQLClient } from '../graphQL-utils';

//
// A moderation job may not "appear" right away after a user report.
// As a result, iterating through the webapp UI  may sometimes fail.
// This function ensures that the expected moderation job exists with
// a "PENDING" status and returns it.
//
export const ensureExistsModerationJob = async (
  entityId: string,
  user: string,
  timeout?: number
): Promise<ModerationJob | undefined> => {
  const variables: ModerationJobByEntityIdQueryVariables = {
    entityId: entityId,
  };

  const client = await getGraphQLClient(user);
  const options = {
    query: ModerationJobByEntityIdDocument,
    variables: variables,
  };

  let job;
  try {
    do {
      const { data } = await client.queryWithRetries(options, timeout);
      job = data?.moderationJobByEntityId as ModerationJob;
      if (job?.moderationStatus != ModerationStatus.Pending) {
        await sleep(500);
      }
    } while (job?.moderationStatus != ModerationStatus.Pending);
    return job;
  } finally {
    await client.closeSession();
  }
};

//
// An entity (Post, comment etc.) is not known by moderation right away after its creation.
// This function ensures that the expected entity exists and therefore can be reported, pro-actively moderated.
//
export const ensureExistsEntityInModerationService = async (
  entityId: string,
  user: string,
  timeout?: number
) => {
  const variables: ModerationJobByEntityIdQueryVariables = {
    entityId: entityId,
  };

  const client = await getGraphQLClient(user);
  try {
    const options = {
      query: ModerationJobByEntityIdDocument,
      variables: variables,
    };
    await client.queryWithRetries(options, timeout);
  } finally {
    await client.closeSession();
  }
};
