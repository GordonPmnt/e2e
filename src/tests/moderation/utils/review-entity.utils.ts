import type { ModerationState } from 'step-definitions/aaqua-admin/state/moderation-state.class';

import type { EntityVisibility } from '../../../graphql-schema/generated/graphql-request';
import { ChangeEntityModerationStatusDocument } from '../../../graphql-schema/generated/graphql-request';
import { getGraphQLClient } from '../../../graphql-schema/graphQL-utils';

export const reviewEntity = async (
  visibility: EntityVisibility,
  moderationState: ModerationState,
  user: string,
  violationType: string = moderationState.reportedReason
): Promise<void> => {
  const variables = {
    entityId: moderationState.reportedEntity.entityId,
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
