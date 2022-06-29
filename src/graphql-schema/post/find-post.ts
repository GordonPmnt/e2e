import { sleep } from '../AaquaApolloClient.class';
import { FindPostByIdDocument } from '../generated/graphql-request';
import { getGraphQLClient } from '../graphQL-utils';
export const verifyPostIsVisible = async (
  postId: string,
  user: string,
  timeout = 60
): Promise<void> => {
  const maxTimestamp = Date.now() + timeout * 1000;
  const client = await getGraphQLClient(user);
  const options = {
    query: FindPostByIdDocument,
    variables: {
      postId: postId,
    },
  };

  let response = undefined;
  try {
    do {
      response = await client.queryWithRetries(options, timeout);
      if (response.data?.post?.status === 'ONLINE') {
        return;
      } else {
        await sleep(500);
      }
    } while (Date.now() < maxTimestamp);
  } finally {
    await client.closeSession();
  }
  throw new Error(`Timeout: Post ${postId} is not visible`);
};

export const verifyPostIsNotVisible = async (
  postId: string,
  user: string,
  timeout = 60
): Promise<void> => {
  const maxTimestamp = Date.now() + timeout * 1000;
  const client = await getGraphQLClient(user);
  const options = {
    query: FindPostByIdDocument,
    variables: {
      postId: postId,
    },
  };

  try {
    do {
      const response = await client.query(options);
      if (response.errors) {
        const message = response.errors[0].message;
        if (message.includes(`Post \`${postId}\` is hidden`)) {
          return;
        } else {
          throw new Error(message);
        }
      } else {
        // no error: the post is still visible
        await sleep(500);
      }
    } while (Date.now() < maxTimestamp);
  } finally {
    await client.closeSession();
  }
  throw new Error(`Timeout: Post ${postId} is still visible`);
};
