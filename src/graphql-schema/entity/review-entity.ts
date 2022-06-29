import type { EntityVisibility } from '../generated/graphql-request';
import { ChangeEntityModerationStatusDocument } from '../generated/graphql-request';
import { getGraphQLClient } from '../graphQL-utils';

export const reviewEntity = async (
  entityId: string,
  user: string,
  visibility: EntityVisibility,
  violationType?: string
): Promise<void> => {
  const variables = {
    entityId: entityId,
    visibility,
    violationType,
    internalNote: '',
  };

  const client = await getGraphQLClient(user);
  await client.queryWithRetries({
    query: ChangeEntityModerationStatusDocument,
    variables,
  });
  await client.closeSession();
};
