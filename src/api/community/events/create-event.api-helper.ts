import {
  createEvent as createCommunityEvent,
  getCommunityIdByHandle,
} from '@aaqua/aaqua-api-library';
import { faker } from '@faker-js/faker';
import type { Event } from 'graphql-schema/generated/graphql-request';

import { ApiAuth } from '../../auth/api-authentication';

const graphQLEndpoint = process.env.GRAPHQL_ENDPOINT as string;

type CreateEventArguments = {
  title?: Event['title'];
  user: { email: string; password: string };
};
export const createEvent = async ({
  title = faker.random.words(2),
  user: { email, password },
}: CreateEventArguments) => {
  console.log('[createEvent] Trying to create an event');
  const authToken = await ApiAuth.getAuthToken(email, password);
  const client = { authToken, url: graphQLEndpoint };
  const { id: communityId } = await getCommunityIdByHandle(
    graphQLEndpoint,
    authToken,
    'e2e-web-cat'
  );

  const { errors, eventId, status } = await createCommunityEvent({
    client,
    event: {
      content: 'Event content',
      endTime: faker.date.soon(2),
      location: `${faker.address.city()}, ${faker.address.country()}`,
      startTime: faker.date.soon(1),
      title,
    },
    fandomId: communityId,
  });

  if (status !== 200) {
    console.log(`[createEvent] Returned status ${status}`);
  }

  if (errors?.length > 0) {
    console.log(`[createEvent] Returned error ${errors[0]?.message}`);
  }

  await ApiAuth.closeSession();

  return eventId;
};
