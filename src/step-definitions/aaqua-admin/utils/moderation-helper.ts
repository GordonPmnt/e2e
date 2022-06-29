import { ModeratorType } from '../../../graphql-schema/generated/graphql-request';

export const getModerationTypeFromString = (
  moderatorLevel: string
): ModeratorType => {
  switch (moderatorLevel) {
    case 'AAQUA':
      return ModeratorType.Aaqua;
      break;
    case 'COMMUNITY':
      return ModeratorType.Community;
      break;
    default:
      throw new Error(
        `unknown moderatorLevel ${moderatorLevel}. Please use AAQUA or COMMUNITY.`
      );
  }
};
