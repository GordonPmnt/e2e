import type {
  PollCommentsQuery,
  PollCommentsQueryVariables,
} from '../generated/graphql-request';
import { PollCommentsDocument } from '../generated/graphql-request';
import { getGraphQLClient } from '../graphQL-utils';

export const getPollCommentIds = async (
  pollId: string,
  user: string
): Promise<string[]> => {
  const variables: PollCommentsQueryVariables = {
    pollId,
  };

  const client = await getGraphQLClient(user);
  const response = await client.queryWithRetries({
    query: PollCommentsDocument,
    variables,
  });
  await client.closeSession();

  if (response?.data?.errors?.length > 0) {
    throw new Error(`Poll comments fails ${response.data.errors[0].message}`);
  }

  const data = response.data as PollCommentsQuery;

  if (!data.poll?.comments?.edges.length) {
    return [];
  }

  const comments = data.poll?.comments?.edges;

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  return comments
    .filter((comment) => comment?.node.id)
    .map((comment) => comment?.node.id);
};
