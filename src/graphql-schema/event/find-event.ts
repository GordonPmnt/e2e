import { sleep } from '../AaquaApolloClient.class';
import { FindEventByIdDocument } from '../generated/graphql-request';
import { getGraphQLClient } from '../graphQL-utils';
export const verifyEventIsVisible = async (
  eventId: string,
  user: string,
  timeout = 60
): Promise<void> => {
  const maxTimestamp = Date.now() + timeout * 1000;
  const client = await getGraphQLClient(user);
  const options = {
    query: FindEventByIdDocument,
    variables: {
      eventId: eventId,
    },
  };

  let response = undefined;
  try {
    do {
      response = await client.queryWithRetries(options, timeout);
      if (response.data?.event?.status === 'ONLINE') {
        return;
      } else {
        await sleep(500);
      }
    } while (Date.now() < maxTimestamp);
  } finally {
    await client.closeSession();
  }
  throw new Error(`Timeout: Event ${eventId} is not visible`);
};

export const verifyEventIsNotVisible = async (
  eventId: string,
  user: string,
  timeout = 60
): Promise<void> => {
  const maxTimestamp = Date.now() + timeout * 1000;
  const client = await getGraphQLClient(user);
  const options = {
    query: FindEventByIdDocument,
    variables: {
      eventId: eventId,
    },
  };

  try {
    do {
      const response = await client.query(options);
      if (response.errors) {
        const message = response.errors[0].message;
        if (message.includes(`Event \`${eventId}\` is hidden`)) {
          return;
        } else {
          throw new Error(message);
        }
      } else {
        // no error: the event is still visible
        await sleep(500);
      }
    } while (Date.now() < maxTimestamp);
  } finally {
    await client.closeSession();
  }
  throw new Error(`Timeout: Event ${eventId} is still visible`);
};
