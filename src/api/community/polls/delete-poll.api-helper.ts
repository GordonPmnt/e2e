import { deletePoll as deleteCommunityPoll } from '@aaqua/aaqua-api-library';

import type { Poll } from '../../../graphql-schema/generated/graphql-request';
import { ApiAuth } from '../../auth/api-authentication';

const graphQLEndpoint = process.env.GRAPHQL_ENDPOINT as string;

type DeletePollArguments = {
  pollId: Poll['id'];
  user: { email: string; password: string };
};
export const deletePoll = async ({
  pollId,
  user: { email, password },
}: DeletePollArguments) => {
  console.log('[deletePoll] Trying to delete a poll');
  const authToken = await ApiAuth.getAuthToken(email, password);

  const {
    errors,
    pollId: deletedPollId,
    status,
  } = await deleteCommunityPoll({
    client: { authToken, url: graphQLEndpoint },
    pollId,
  });

  if (status !== 200) {
    console.log(`[deletePoll] Returned status ${status}`);
  }

  if (errors?.length > 0) {
    console.log(`[deletePoll] Returned error ${errors[0]?.message}`);
  }

  await ApiAuth.closeSession();

  return deletedPollId;
};
