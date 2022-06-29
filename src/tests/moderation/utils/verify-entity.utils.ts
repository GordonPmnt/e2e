import {
  verifyCommentIsNotVisible,
  verifyCommentIsVisible,
} from '../../../graphql-schema/comment/find-comment';
import {
  verifyEventIsNotVisible,
  verifyEventIsVisible,
} from '../../../graphql-schema/event/find-event';
import {
  verifyPollIsNotVisible,
  verifyPollIsVisible,
} from '../../../graphql-schema/poll/find-poll';
import {
  verifyPostIsNotVisible,
  verifyPostIsVisible,
} from '../../../graphql-schema/post/find-post';
import type { ModerationState } from '../../../step-definitions/aaqua-admin/state/moderation-state.class';

export const verifyEntityIsVisible = async (
  state: ModerationState,
  user: string
): Promise<void> => {
  const entity = state.entity;
  switch (entity.entityType) {
    case 'COMMENT':
      await verifyCommentIsVisible(entity.entityId, user);
      break;

    case 'EVENT':
      await verifyEventIsVisible(entity.entityId, user);
      break;

    case 'POLL':
      await verifyPollIsVisible(entity.entityId, user);
      break;

    case 'POST':
      await verifyPostIsVisible(entity.entityId, user);
      break;
  }
};

export const verifyEntityIsNotVisible = async (
  state: ModerationState,
  users: string[]
): Promise<void> => {
  const entity = state.entity;

  for (const user of users) {
    switch (entity.entityType) {
      case 'COMMENT':
        await verifyCommentIsNotVisible(entity.entityId, user);
        break;

      case 'EVENT':
        await verifyEventIsNotVisible(entity.entityId, user);
        break;

      case 'POLL':
        await verifyPollIsNotVisible(entity.entityId, user);
        break;

      case 'POST':
        await verifyPostIsNotVisible(entity.entityId, user);
        break;
    }
  }
};
