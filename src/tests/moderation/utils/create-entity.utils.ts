import { createCommentForEntity } from '../../../graphql-schema/comment/create-comment';
import { createEvent } from '../../../graphql-schema/event/create-event';
import type {
  AttachmentInput,
  CommentAttachmentInput,
  EventAttachmentInput,
} from '../../../graphql-schema/generated/graphql-request';
import { createPoll } from '../../../graphql-schema/poll/create-poll';
import { createPost } from '../../../graphql-schema/post/create-post';
import { ModerationState } from '../../../step-definitions/aaqua-admin/state/moderation-state.class';
import type { Attachment } from '../../../utils/attachment';

export const createEntity = async (
  entityType: string,
  creator: string,
  content?: string,
  attachment?: Attachment
): Promise<ModerationState> => {
  const state = new ModerationState();
  switch (entityType) {
    case 'EVENT':
      state.mainContent = await createEvent(
        creator,
        content,
        content,
        attachment as EventAttachmentInput
      );
      break;

    case 'EVENT_COMMENT':
      state.mainContent = await createEvent(creator);
      state.comment = await createCommentForEntity(
        creator,
        state.mainContent,
        content
      );
      break;

    case 'POLL':
      state.mainContent = await createPoll(creator, content);
      break;

    case 'POLL_COMMENT':
      state.mainContent = await createPoll(creator);
      state.comment = await createCommentForEntity(
        creator,
        state.mainContent,
        content
      );
      break;

    case 'POST':
      state.mainContent = await createPost(
        creator,
        content,
        content,
        attachment as AttachmentInput
      );
      break;

    case 'POST_COMMENT':
      state.mainContent = await createPost(creator);
      state.comment = await createCommentForEntity(
        creator,
        state.mainContent,
        content,
        attachment as CommentAttachmentInput
      );
      break;

    default:
      throw new Error(`Entity type ${entityType} is not implemented`);
  }

  return state;
};
