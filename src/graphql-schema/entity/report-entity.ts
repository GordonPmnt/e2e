import type {
  ModeratorType,
  ReportEntityMutationMutation,
  ReportEntityMutationMutationVariables,
} from '../generated/graphql-request';
import { ReportEntityMutationDocument } from '../generated/graphql-request';
import { getGraphQLClient } from '../graphQL-utils';

export const reportEntity = async (
  entityId: string,
  user: string,
  reportReason: string,
  moderatorType: ModeratorType
): Promise<string | undefined> => {
  const variables: ReportEntityMutationMutationVariables = {
    input: {
      entityId: entityId,
      moderatorType,
      reportReason: reportReason.toUpperCase(),
    },
  };

  const client = await getGraphQLClient(user);
  const response = await client.queryWithRetries<
    ReportEntityMutationMutation | undefined
  >({
    query: ReportEntityMutationDocument,
    variables,
  });
  await client.closeSession();

  return response?.data?.reportEntityByMember?.entityId as string;
};
