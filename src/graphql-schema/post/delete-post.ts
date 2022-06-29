import type { DeletePostMutationVariables } from '../generated/graphql-request';
import { DeletePostDocument } from '../generated/graphql-request';
import { getGraphQLClient } from '../graphQL-utils';

export const deletePost = async (
  postId: string,
  user: string
): Promise<void> => {
  const variables: DeletePostMutationVariables = {
    input: {
      postId,
    },
  };

  const client = await getGraphQLClient(user);
  await client.queryWithRetries({
    query: DeletePostDocument,
    variables: variables,
  });
  await client.closeSession();
};
