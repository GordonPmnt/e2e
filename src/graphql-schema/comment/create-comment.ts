import { faker } from '@faker-js/faker';

import type { MainContentType } from '../../utils/aaqua-entity-base-info.class';
import { CommentEntityInfo } from '../../utils/aaqua-entity-base-info.class';
import type {
  CommentAttachmentInput,
  CreateCommentInput,
  ParentType,
} from '../generated/graphql-request';
import { CreateCommentDocument } from '../generated/graphql-request';
import { getGraphQLClient } from '../graphQL-utils';

export const createCommentForEntity = async (
  user: string,
  entity: MainContentType,
  content?: string,
  attachment?: CommentAttachmentInput
): Promise<CommentEntityInfo> => {
  const input: CreateCommentInput = {
    content:
      content ?? `${faker.random.words(5)} ${new Date().getTime().toString()}`,
    replyTo: {
      id: entity.entityId as string, // entity has to be created first
      parentType: entity.entityType as ParentType,
    },
    attachment: attachment,
  };
  const client = await getGraphQLClient(user);
  const response = await client.queryWithRetries({
    query: CreateCommentDocument,
    variables: { input },
  });
  await client.closeSession();

  const commentId = response?.data?.createComment?.comment?.id;

  if (!commentId) {
    throw new Error(`Error while creating comment ${input.content} `);
  }
  return new CommentEntityInfo(commentId, input.content as string, user);
};
