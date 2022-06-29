import { reportEntity as reportEntityApi } from '../../../graphql-schema/entity/report-entity';
import { ModeratorType } from '../../../graphql-schema/generated/graphql-request';
import type { ModerationState } from '../../../step-definitions/aaqua-admin/state/moderation-state.class';

export const reportEntity = async (
  state: ModerationState,
  reporter: string,
  reportReason = 'HARASSMENT_HATE',
  moderatorType = ModeratorType.Community
): Promise<void> => {
  let entityId: string;
  if (!state.comment) {
    state.reportContentWithReason(reportReason);
    entityId = state.reportedEntity.entityId;
  } else {
    state.reportCommentWithReason(reportReason);
    entityId = state.comment.entityId;
  }
  await reportEntityApi(entityId, reporter, reportReason, moderatorType);
};
