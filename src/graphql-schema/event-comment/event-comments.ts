import type {
  EventCommentsQuery,
  EventCommentsQueryVariables,
} from '../generated/graphql-request';
import { EventCommentsDocument } from '../generated/graphql-request';
import { getGraphQLClient } from '../graphQL-utils';

export const getEventCommentIds = async (
  eventId: string,
  user: string
): Promise<string[]> => {
  const variables: EventCommentsQueryVariables = {
    eventId,
  };

  const client = await getGraphQLClient(user);
  const response = await client.queryWithRetries({
    query: EventCommentsDocument,
    variables,
  });
  await client.closeSession();

  if (response?.data?.errors?.length > 0) {
    throw new Error(`Event comments fails ${response.data.errors[0].message}`);
  }

  const data = response.data as EventCommentsQuery;

  if (!data.event?.comments?.edges.length) {
    return [];
  }

  const comments = data.event?.comments?.edges;

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  return comments
    .filter((comment) => comment?.node.id)
    .map((comment) => comment?.node.id);
};
