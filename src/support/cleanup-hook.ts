import type { ITestCaseHookParameter } from '@cucumber/cucumber';
import { After, Status } from '@cucumber/cucumber';

import { deleteComment } from '../graphql-schema/comment/delete-comment';
import { deleteEvent } from '../graphql-schema/event/delete-event';
import { deletePoll } from '../graphql-schema/poll/delete-poll';
import { deletePost } from '../graphql-schema/post/delete-post';
import type { ModerationState } from '../step-definitions/aaqua-admin/state/moderation-state.class';
import type { AaquaEntityType } from '../utils/typings';

import type { ICustomWorld } from './custom-world';

const cleanUpEntity = async (
  entityId?: string,
  entityType?: AaquaEntityType,
  author?: string
) => {
  if (!entityId || !entityType || !author) {
    return;
  }
  switch (entityType) {
    case 'COMMENT':
      await deleteComment(entityId, author);
      break;
    case 'EVENT':
      await deleteEvent(entityId, author);
      break;
    case 'POLL':
      await deletePoll(entityId, author);
      break;
    case 'POST':
      await deletePost(entityId, author);
      break;
  }
};

const cleanModeration = async (moderation: ModerationState) => {
  const mainContent = moderation.mainContent;
  if (!mainContent) {
    return;
  }

  const reportedEntity = moderation.reportedEntity;

  // reportedEntityId !== entityId when a comment is reported
  if (reportedEntity.entityId !== mainContent.entityId) {
    await cleanUpEntity(
      reportedEntity.entityId,
      reportedEntity.entityType,
      reportedEntity.author
    );
  }

  await cleanUpEntity(
    mainContent.entityId,
    mainContent.entityType,
    mainContent.author
  );
};

After(async function (this: ICustomWorld, { result }: ITestCaseHookParameter) {
  if (result && result.status === Status.PASSED) {
    await cleanModeration(this.moderation);
  }
});
