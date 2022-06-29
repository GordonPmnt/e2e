import type {
  AaquaEntityBaseInfo,
  CommentEntityInfo,
  MainContentType,
} from '../../../utils/aaqua-entity-base-info.class';
import type { Attachment } from '../../../utils/attachment';
import type { AaquaEntityType } from '../../../utils/typings';
export class ModerationState {
  private _reportedEntityType?: AaquaEntityType;

  private _reportedReason = '';

  // POST - POLL - EVENT
  public mainContent?: MainContentType;

  // COMMENT
  public comment?: CommentEntityInfo;

  public attachment?: Attachment;

  reportContentWithReason(reportReason: string): void {
    if (!this.mainContent) {
      throw new Error('reportContentWithReason: mainContent is undefined');
    }
    this._reportedEntityType = this.mainContent?.entityType;
    this._reportedReason = reportReason;
  }

  reportContentWithoutReason(): void {
    if (!this.mainContent) {
      throw new Error('reportContentWithoutReason: mainContent is undefined');
    }
    this._reportedEntityType = this.mainContent?.entityType;
  }

  reportCommentWithReason(reportReason: string): void {
    if (!this.mainContent || !this.comment) {
      throw new Error(
        'reportCommentWithReason: mainContent and/or comment are undefined'
      );
    }
    this._reportedEntityType = 'COMMENT';
    this._reportedReason = reportReason;
  }

  get reportedReason(): string {
    return this._reportedReason;
  }

  // Return the entity that is the subject of the test.
  get entity(): AaquaEntityBaseInfo {
    if (!this.mainContent) {
      throw new Error('entity: mainContent is undefined');
    }
    if (!this.comment) {
      return this.mainContent as AaquaEntityBaseInfo;
    } else {
      return this.comment as AaquaEntityBaseInfo;
    }
  }

  get reportedEntity(): AaquaEntityBaseInfo {
    switch (this._reportedEntityType) {
      case 'POST':
      case 'POLL':
      case 'EVENT':
        return this.mainContent as AaquaEntityBaseInfo;
      case 'COMMENT':
        return this.comment as AaquaEntityBaseInfo;
      default:
        throw new Error(`${this._reportedEntityType} is not yet implemented`);
    }
  }
}
