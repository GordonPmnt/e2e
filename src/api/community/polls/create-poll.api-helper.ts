import {
  createPoll as createCommunityPoll,
  getCommunityIdByHandle,
} from '@aaqua/aaqua-api-library';
import { faker } from '@faker-js/faker';
import type { Poll } from 'graphql-schema/generated/graphql-request';

import { ApiAuth } from '../../auth/api-authentication';

const graphQLEndpoint = process.env.GRAPHQL_ENDPOINT as string;

type CreatePollArguments = {
  title?: Poll['question'];
  user: { email: string; password: string };
};
export const createPoll = async ({
  title = faker.random.words(2),
  user: { email, password },
}: CreatePollArguments) => {
  console.log('[createPoll] Trying to create a poll');
  const authToken = await ApiAuth.getAuthToken(email, password);
  const client = { authToken, url: graphQLEndpoint };
  const { id: communityId } = await getCommunityIdByHandle(
    graphQLEndpoint,
    authToken,
    'e2e-web-cat'
  );

  const { errors, pollId, status } = await createCommunityPoll({
    client,
    poll: {
      duration: 2,
      options: ['Option 1', 'Option 2'],
      question: title,
    },
    fandomId: communityId,
  });

  if (status !== 200) {
    console.log(`[createPoll] Returned status ${status}`);
  }

  if (errors?.length > 0) {
    console.log(`[createPoll] Returned error ${errors[0]?.message}`);
  }

  await ApiAuth.closeSession();

  return pollId;
};
