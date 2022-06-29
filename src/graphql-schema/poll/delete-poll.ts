import type { DeletePollMutationVariables } from '../generated/graphql-request';
import { DeletePollDocument } from '../generated/graphql-request';
import { getGraphQLClient } from '../graphQL-utils';

export const deletePoll = async (
  pollId: string,
  user: string
): Promise<void> => {
  const variables: DeletePollMutationVariables = {
    input: {
      pollId,
    },
  };

  const client = await getGraphQLClient(user);
  await client.queryWithRetries({
    query: DeletePollDocument,
    variables: variables,
  });
  await client.closeSession();
};
