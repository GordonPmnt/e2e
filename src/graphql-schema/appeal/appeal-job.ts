import type { AppealModerationJobInput } from '../generated/graphql-request';
import { AppealModerationJobMutationDocument } from '../generated/graphql-request';
import { getGraphQLClient } from '../graphQL-utils';

export const appealJob = async (
  entityId: string,
  user: string
): Promise<void> => {
  const input: AppealModerationJobInput = {
    appealNote: 'This is the appeal note',
    entityId,
  };

  const client = await getGraphQLClient(user);
  await client.queryWithRetries({
    query: AppealModerationJobMutationDocument,
    variables: { input },
  });
  await client.closeSession();
};
