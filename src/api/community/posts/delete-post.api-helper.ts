import { deletePost as deleteCommunityPost } from '@aaqua/aaqua-api-library';

import type { Post } from '../../../graphql-schema/generated/graphql-request';
import { ApiAuth } from '../../auth/api-authentication';

const graphQLEndpoint = process.env.GRAPHQL_ENDPOINT as string;

type DeletePostArguments = {
  postId: Post['id'];
  user: { email: string; password: string };
};
export const deletePost = async ({
  postId,
  user: { email, password },
}: DeletePostArguments) => {
  console.log('[deletePost] Trying to delete a post');
  const authToken = await ApiAuth.getAuthToken(email, password);

  const {
    errors,
    postId: deletedPostId,
    status,
  } = await deleteCommunityPost({
    client: { authToken, url: graphQLEndpoint },
    postId,
  });

  if (status !== 200) {
    console.log(`[deletePost] Returned status ${status}`);
  }

  if (errors?.length > 0) {
    console.log(`[deletePost] Returned error ${errors[0]?.message}`);
  }

  await ApiAuth.closeSession();

  return deletedPostId;
};
