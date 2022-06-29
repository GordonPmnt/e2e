import { sleep } from '../AaquaApolloClient.class';
import { FindPollByIdDocument } from '../generated/graphql-request';
import { getGraphQLClient } from '../graphQL-utils';
export const verifyPollIsVisible = async (
  pollId: string,
  user: string,
  timeout = 60
): Promise<void> => {
  const maxTimestamp = Date.now() + timeout * 1000;
  const client = await getGraphQLClient(user);
  const options = {
    query: FindPollByIdDocument,
    variables: {
      pollId: pollId,
    },
  };

  let response = undefined;
  try {
    do {
      response = await client.queryWithRetries(options, timeout);
      if (response.data?.poll?.id === pollId) {
        return;
      } else {
        await sleep(500);
      }
    } while (Date.now() < maxTimestamp);
  } finally {
    await client.closeSession();
  }
  throw new Error(`Timeout: Poll ${pollId} is not visible`);
};

export const verifyPollIsNotVisible = async (
  pollId: string,
  user: string,
  timeout = 60
): Promise<void> => {
  const maxTimestamp = Date.now() + timeout * 1000;
  const client = await getGraphQLClient(user);
  const options = {
    query: FindPollByIdDocument,
    variables: {
      pollId: pollId,
    },
  };

  try {
    do {
      const response = await client.query(options);
      if (response.errors) {
        const message = response.errors[0].message;
        if (message.includes(`Poll \`${pollId}\` is hidden`)) {
          return;
        } else {
          throw new Error(message);
        }
      } else {
        // no error: the poll is still visible
        await sleep(500);
      }
    } while (Date.now() < maxTimestamp);
  } finally {
    await client.closeSession();
  }
  throw new Error(`Timeout: Poll ${pollId} is still visible`);
};
