import type { EntityVisibility } from '../generated/graphql-request';

type PostEntity = {
  __typename: 'PostModerationInfo';
  visibility?: EntityVisibility;
  post?: { __typename?: 'Post'; id: string };
};

type EventEntity = {
  __typename: 'EventModerationInfo';
  visibility?: EntityVisibility;
  event?: {
    id: string;
  };
};

type PollEntity = {
  poll: {
    id: string;
  };
  visibility?: EntityVisibility;
  __typename: 'PollModerationInfo';
};

type CommentEntity = {
  __typename: 'CommentModerationInfo';
  visibility?: EntityVisibility;
  comment?: {
    id: string;
  };
};

type UserEntity = {
  __typename: 'UserModerationInfo';
};

type Entity =
  | PostEntity
  | PollEntity
  | EventEntity
  | CommentEntity
  | UserEntity;

export type ModerationQueueEdge = {
  node: {
    entity?: Entity;
    __typename?: 'ModerationJob';
  };
};
