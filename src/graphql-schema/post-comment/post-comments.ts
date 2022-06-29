import type {
  PostCommentsQuery,
  PostCommentsQueryVariables,
} from '../generated/graphql-request';
import { PostCommentsDocument } from '../generated/graphql-request';
import { getGraphQLClient } from '../graphQL-utils';

export const getPostCommentIds = async (
  postId: string,
  user: string
): Promise<string[]> => {
  const variables: PostCommentsQueryVariables = {
    postId,
  };

  const client = await getGraphQLClient(user);
  const response = await client.queryWithRetries({
    query: PostCommentsDocument,
    variables,
  });
  await client.closeSession();

  if (response?.data?.errors?.length > 0) {
    throw new Error(`Post comments fails ${response.data.errors[0].message}`);
  }

  const data = response.data as PostCommentsQuery;

  if (!data.post?.comments?.edges.length) {
    return [];
  }

  const comments = data.post?.comments?.edges;

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  return comments
    .filter((comment) => comment?.node.id)
    .map((comment) => comment?.node.id);
};
