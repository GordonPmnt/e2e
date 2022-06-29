import { sleep } from '../AaquaApolloClient.class';
import { FindCommentByIdDocument } from '../generated/graphql-request';
import { getGraphQLClient } from '../graphQL-utils';
export const verifyCommentIsVisible = async (
  commentId: string,
  user: string,
  timeout = 60
): Promise<void> => {
  const maxTimestamp = Date.now() + timeout * 1000;
  const client = await getGraphQLClient(user);
  const options = {
    query: FindCommentByIdDocument,
    variables: {
      commentId: commentId,
    },
  };

  let response = undefined;
  try {
    do {
      response = await client.queryWithRetries(options, timeout);
      if (response.data?.comment?.status === 'ONLINE') {
        return;
      } else {
        await sleep(500);
      }
    } while (Date.now() < maxTimestamp);
  } finally {
    await client.closeSession();
  }
  throw new Error(`Timeout: Comment ${commentId} is not visible`);
};

export const verifyCommentIsNotVisible = async (
  commentId: string,
  user: string,
  timeout = 60
): Promise<void> => {
  const maxTimestamp = Date.now() + timeout * 1000;
  const client = await getGraphQLClient(user);
  const options = {
    query: FindCommentByIdDocument,
    variables: {
      commentId: commentId,
    },
  };

  try {
    do {
      const response = await client.query(options);
      if (response.errors) {
        const message = response.errors[0].message;
        if (message.includes(`Comment \`${commentId}\` is hidden`)) {
          return;
        } else {
          throw new Error(message);
        }
      } else {
        // no error: the comment is still visible
        await sleep(500);
      }
    } while (Date.now() < maxTimestamp);
  } finally {
    await client.closeSession();
  }
  throw new Error(`Timeout: Comment ${commentId} is still visible`);
};
