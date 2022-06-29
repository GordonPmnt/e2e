import {
  createPost as createCommunityPost,
  getCommunityIdByHandle,
} from '@aaqua/aaqua-api-library';
import { faker } from '@faker-js/faker';
import type { Post } from 'graphql-schema/generated/graphql-request';

import { ApiAuth } from '../../auth/api-authentication';

const graphQLEndpoint = process.env.GRAPHQL_ENDPOINT as string;

type CreatePostArguments = {
  title?: Post['title'];
  user: { email: string; password: string };
};
export const createPost = async ({
  title = faker.random.words(2),
  user: { email, password },
}: CreatePostArguments) => {
  console.log('[createPost] Trying to create a post');
  const authToken = await ApiAuth.getAuthToken(email, password);
  const client = { authToken, url: graphQLEndpoint };
  const { id: communityId } = await getCommunityIdByHandle(
    graphQLEndpoint,
    authToken,
    'e2e-web-cat'
  );

  const { errors, postId, status } = await createCommunityPost({
    client,
    fandomId: communityId,
    post: {
      content: 'Post content',
      title,
    },
  });

  if (status !== 200) {
    console.log(`[createPost] Returned status ${status}`);
  }

  if (errors?.length > 0) {
    console.log(`[createPost] Returned error ${errors[0]?.message}`);
  }

  await ApiAuth.closeSession();

  return postId;
};
