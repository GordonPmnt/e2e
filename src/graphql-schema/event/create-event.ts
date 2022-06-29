import { faker } from '@faker-js/faker';

import { EventEntityInfo } from '../../utils/aaqua-entity-base-info.class';
import { getModerationTestCommunityId } from '../../utils/credentials';
import type {
  CreateEventMutationMutationVariables,
  EventAttachmentInput,
} from '../generated/graphql-request';
import { CreateEventMutationDocument } from '../generated/graphql-request';
import { getGraphQLClient } from '../graphQL-utils';

export const createEvent = async (
  user: string,
  title?: string,
  content?: string,
  attachment?: EventAttachmentInput
): Promise<EventEntityInfo> => {
  const today = new Date();
  const endTime = new Date();
  endTime.setDate(today.getDate() + 2);

  const variables: CreateEventMutationMutationVariables = {
    input: {
      title:
        title ?? `${faker.random.words(2)} ${new Date().getTime().toString()}`,
      content:
        content ??
        `${faker.random.words(2)} ${new Date().getTime().toString()}`,
      attachments: attachment ? [attachment] : [],
      location: {
        displayName: faker.random.words(1),
      },
      endTime: endTime.toISOString(),
      fandomId: getModerationTestCommunityId(),
      startTime: today.toISOString(),
      visibleAt: null,
    },
  };

  const client = await getGraphQLClient(user);
  const response = await client.queryWithRetries({
    query: CreateEventMutationDocument,
    variables,
  });
  await client.closeSession();

  return new EventEntityInfo(
    response.data.createEvent.event.id,
    variables.input.title,
    user
  );
};
