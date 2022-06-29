import type { DeleteEventMutationVariables } from '../generated/graphql-request';
import { DeleteEventDocument } from '../generated/graphql-request';
import { getGraphQLClient } from '../graphQL-utils';

export const deleteEvent = async (
  eventId: string,
  user: string
): Promise<void> => {
  const variables: DeleteEventMutationVariables = {
    input: {
      eventId,
    },
  };

  const client = await getGraphQLClient(user);
  await client.queryWithRetries({
    query: DeleteEventDocument,
    variables: variables,
  });
  await client.closeSession();
};
