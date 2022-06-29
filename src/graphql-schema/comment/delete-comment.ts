import type { DeleteCommentMutationVariables } from '../generated/graphql-request';
import { DeleteCommentDocument } from '../generated/graphql-request';
import { getGraphQLClient } from '../graphQL-utils';

export const deleteComment = async (
  id: string,
  user: string
): Promise<void> => {
  const variables: DeleteCommentMutationVariables = {
    input: {
      id,
    },
  };

  const client = await getGraphQLClient(user);
  await client.queryWithRetries({
    query: DeleteCommentDocument,
    variables: variables,
  });
  await client.closeSession();
};
