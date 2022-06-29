import { faker } from '@faker-js/faker';

import { PostEntityInfo } from '../../utils/aaqua-entity-base-info.class';
import { getModerationTestCommunityId } from '../../utils/credentials';
import type {
  AttachmentInput,
  CreatePostInput,
} from '../generated/graphql-request';
import {
  CreatePostMutationDocument,
  PostType,
} from '../generated/graphql-request';
import { getGraphQLClient } from '../graphQL-utils';

export const createPost = async (
  user: string,
  title?: string,
  content?: string,
  attachment?: AttachmentInput
): Promise<PostEntityInfo> => {
  const input: CreatePostInput = {
    content:
      content ?? faker.random.words(5) + ' ' + new Date().getTime().toString(),
    fandomId: getModerationTestCommunityId(),
    title:
      title ?? faker.random.words(3) + ' ' + new Date().getTime().toString(),
    type: PostType.Freemium,
    attachments: attachment ? [attachment] : [],
  };

  const client = await getGraphQLClient(user);
  const response = await client.queryWithRetries({
    query: CreatePostMutationDocument,
    variables: { input },
  });
  await client.closeSession();

  return new PostEntityInfo(
    response.data?.createPost.post.id,
    input.title as string,
    user
  );
};
