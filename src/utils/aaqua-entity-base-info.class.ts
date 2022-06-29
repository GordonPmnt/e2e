import type { AaquaEntityType } from './typings';

export type MainContentType = PostEntityInfo | PollEntityInfo | EventEntityInfo;

export abstract class AaquaEntityBaseInfo {
  private _entityId: string;
  private _entityType: AaquaEntityType;
  private _entityContent: string;

  private _author?: string;
  constructor(
    entityId: string,
    entityType: AaquaEntityType,
    entityContent: string,
    author?: string
  ) {
    this._entityId = entityId;
    this._entityType = entityType;
    this._entityContent = entityContent;
    this._author = author;
  }

  get entityId(): string {
    return this._entityId;
  }
  get entityType(): AaquaEntityType {
    return this._entityType;
  }
  get entityContent(): string {
    return this._entityContent;
  }

  get author(): string | undefined {
    return this._author;
  }
}

export class PostEntityInfo extends AaquaEntityBaseInfo {
  constructor(entityId: string, entityContent: string, author: string) {
    super(entityId, 'POST', entityContent, author);
  }
}

export class PollEntityInfo extends AaquaEntityBaseInfo {
  constructor(entityId: string, entityContent: string, author: string) {
    super(entityId, 'POLL', entityContent, author);
  }
}

export class EventEntityInfo extends AaquaEntityBaseInfo {
  constructor(entityId: string, entityContent: string, author: string) {
    super(entityId, 'EVENT', entityContent, author);
  }
}

export class CommentEntityInfo extends AaquaEntityBaseInfo {
  constructor(entityId: string, entityContent: string, author: string) {
    super(entityId, 'COMMENT', entityContent, author);
  }
}
