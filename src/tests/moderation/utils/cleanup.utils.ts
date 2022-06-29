import type { TestInfo } from '@playwright/test';
import type { ModerationState } from 'step-definitions/aaqua-admin/state/moderation-state.class';

import { deleteComment } from '../../../graphql-schema/comment/delete-comment';
import { deleteEvent } from '../../../graphql-schema/event/delete-event';
import { deletePoll } from '../../../graphql-schema/poll/delete-poll';
import { deletePost } from '../../../graphql-schema/post/delete-post';
import type { AaquaEntityType } from '../../../utils/typings';

export const cleanup = async (state: ModerationState, testInfo: TestInfo) => {
  if (testInfo.status !== 'passed') {
    console.log('[cleanup] Test failed');
    console.log(state);
    return;
  }

  const mainContent = state.mainContent;
  if (!mainContent) {
    return;
  }

  const reportedEntity = state.reportedEntity;

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
