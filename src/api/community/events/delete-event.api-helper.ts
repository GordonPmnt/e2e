import { deleteEvent as deleteCommunityEvent } from '@aaqua/aaqua-api-library';

import type { Event } from '../../../graphql-schema/generated/graphql-request';
import { ApiAuth } from '../../auth/api-authentication';

const graphQLEndpoint = process.env.GRAPHQL_ENDPOINT as string;

type DeleteEventArguments = {
  eventId: Event['id'];
  user: { email: string; password: string };
};
export const deleteEvent = async ({
  eventId,
  user: { email, password },
}: DeleteEventArguments) => {
  console.log('[deleteEvent] Trying to delete an event');
  const authToken = await ApiAuth.getAuthToken(email, password);

  const {
    errors,
    eventId: deletedEventId,
    status,
  } = await deleteCommunityEvent({
    client: { authToken, url: graphQLEndpoint },
    eventId,
  });

  if (status !== 200) {
    console.log(`[deleteEvent] Returned status ${status}`);
  }

  if (errors?.length > 0) {
    console.log(`[deleteEvent] Returned error ${errors[0]?.message}`);
  }

  await ApiAuth.closeSession();

  return deletedEventId;
};
