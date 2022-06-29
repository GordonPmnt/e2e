import { faker } from '@faker-js/faker';
import { formatISODuration } from 'date-fns';

import { PollEntityInfo } from '../../utils/aaqua-entity-base-info.class';
import { getModerationTestCommunityId } from '../../utils/credentials';
import type { CreatePollMutationMutationVariables } from '../generated/graphql-request';
import { CreatePollMutationDocument } from '../generated/graphql-request';
import { getGraphQLClient } from '../graphQL-utils';
export const createPoll = async (
  user: string,
  question?: string
): Promise<PollEntityInfo> => {
  const variables: CreatePollMutationMutationVariables = {
    input: {
      options: ['Yes', 'No'],
      question: question ?? faker.random.words(2),
      duration: formatISODuration({ days: 2 }),
      fandomId: getModerationTestCommunityId(),
      visibleAt: null,
    },
  };

  const client = await getGraphQLClient(user);
  const response = await client.queryWithRetries({
    query: CreatePollMutationDocument,
    variables,
  });
  await client.closeSession();

  return new PollEntityInfo(
    response.data?.createPoll.poll.id,
    variables.input.question,
    user
  );
};
