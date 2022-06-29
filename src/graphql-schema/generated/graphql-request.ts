import type { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
import type { GraphQLClient } from 'graphql-request';
import type * as Dom from 'graphql-request/dist/types.dom';
import type { GraphQLError } from 'graphql-request/dist/types';
import { print } from 'graphql'
import gql from 'graphql-tag';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** java.math.BigInteger */
  BigInteger: any;
  /** An RFC-3339 compliant Full Date Scalar */
  Date: any;
  /** An RFC-3339 compliant DateTime Scalar */
  DateTime: any;
  Duration: any;
  /** A 64-bit signed integer */
  Long: any;
  ZonedDateTime: any;
};

export type AcceptFriendRequestInput = {
  userId: Scalars['String'];
};

export type AcceptFriendRequestPayload = {
  __typename?: 'AcceptFriendRequestPayload';
  user?: Maybe<User>;
};

export type AcceptJoinHiddenFandomInput = {
  fandomId: Scalars['String'];
};

export type AcceptJoinHiddenFandomPayload = {
  __typename?: 'AcceptJoinHiddenFandomPayload';
  member?: Maybe<FandomMember>;
};

export type AcknowledgeInboxNotificationsInput = {
  notifications: Array<Scalars['String']>;
};

export type AcknowledgeInboxNotificationsPayload = {
  __typename?: 'AcknowledgeInboxNotificationsPayload';
  notifications: Array<Scalars['String']>;
};

export type AddFandomAdminInput = {
  fandomId: Scalars['String'];
  userId: Scalars['String'];
};

export type AddFandomAdminPayload = {
  __typename?: 'AddFandomAdminPayload';
  member: FandomMember;
};

export type AddPlatformMemberRoleInput = {
  roles: Array<PlatformMemberRole>;
  userId: Scalars['String'];
};

export type AddPlatformMemberRolePayload = {
  __typename?: 'AddPlatformMemberRolePayload';
  user?: Maybe<User>;
};

export type Administrator = {
  __typename?: 'Administrator';
  joins: Scalars['Boolean'];
  mentions: Scalars['Boolean'];
  reports: Scalars['Boolean'];
};

export type AdministratorInput = {
  joins: Scalars['Boolean'];
  mentions: Scalars['Boolean'];
  reports: Scalars['Boolean'];
};

export type AiLabel = {
  __typename?: 'AiLabel';
  /** TODO */
  status: AiLabelStatus;
  /** TODO */
  value: Scalars['String'];
};

export enum AiLabelStatus {
  Confirmed = 'CONFIRMED',
  Denied = 'DENIED',
  Pending = 'PENDING'
}

export type AiLabelsInput = {
  status: AiLabelStatus;
  /** Id of the target content (post, comment, poll, event, image, or video) */
  targetId: Scalars['String'];
  value: Scalars['String'];
};

/** Types */
export type AiReport = {
  __typename?: 'AiReport';
  reportReason?: Maybe<Scalars['String']>;
  score: AiReportScore;
};

/** Aggregated score provided by AI content analysis systems. */
export enum AiReportScore {
  High = 'HIGH',
  Low = 'LOW',
  Medium = 'MEDIUM'
}

export type AllFandomMemberReputationsInput = {
  date: Scalars['Date'];
  memberId: Scalars['String'];
};

export type AppealInfo = CreatorAppealInfo | ReportersAppealInfo;

/** Inputs */
export type AppealModerationJobInput = {
  /** Some text for the appelant to provide a reasoning to the appeal. */
  appealNote?: InputMaybe<Scalars['String']>;
  /** The id of the content the appealed moderation decision is about. */
  entityId: Scalars['String'];
};

export type AppealModerationJobPayload = {
  __typename?: 'AppealModerationJobPayload';
  /** The id of the content the appealed moderation decision is about. */
  entityId: Scalars['String'];
};

export type AppealNote = {
  __typename?: 'AppealNote';
  date?: Maybe<Scalars['String']>;
  text: Scalars['String'];
  user?: Maybe<User>;
};

export type AppealNoteConnection = {
  __typename?: 'AppealNoteConnection';
  edges: Array<Maybe<AppealNoteEdge>>;
  pageInfo: PageInfo;
};

export type AppealNoteEdge = {
  __typename?: 'AppealNoteEdge';
  cursor?: Maybe<Scalars['String']>;
  node?: Maybe<AppealNote>;
};

export enum AppealStatus {
  None = 'NONE',
  Pending = 'PENDING',
  Reviewed = 'REVIEWED'
}

export type ApproveJoinPrivateFandomInput = {
  fandomId: Scalars['String'];
  userId: Scalars['String'];
};

export type ApproveJoinPrivateFandomPayload = {
  __typename?: 'ApproveJoinPrivateFandomPayload';
  member?: Maybe<FandomMember>;
};

export type AttachmentInput = {
  attachmentId: Scalars['String'];
  type: AttachmentType;
};

export enum AttachmentType {
  Image = 'IMAGE',
  Video = 'VIDEO'
}

export type AttributeSummaryItem = {
  __typename?: 'AttributeSummaryItem';
  name: Scalars['String'];
  values: Array<Scalars['String']>;
};

export type AttributeSummaryItemInput = {
  name: Scalars['String'];
  values: Array<Scalars['String']>;
};

export type AudienceSpecification = {
  __typename?: 'AudienceSpecification';
  onlineSegmentsAudienceFilter?: Maybe<OnlineSegmentAudienceFilter>;
  reputationScoreAudienceFilter?: Maybe<ReputationScoreAudienceFilter>;
};

export type AudienceSpecificationInput = {
  onlineSegmentsAudienceFilter?: InputMaybe<OnlineSegmentAudienceFilterInput>;
  reputationScoreAudienceFilter?: InputMaybe<ReputationScoreAudienceFilterInput>;
};

export type Badge = {
  __typename?: 'Badge';
  collectedAt?: Maybe<Scalars['DateTime']>;
  description: Scalars['String'];
  fandom?: Maybe<Fandom>;
  id: Scalars['String'];
  image?: Maybe<Image>;
  name: Scalars['String'];
  status: BadgeStatus;
  type: BadgeType;
  user?: Maybe<User>;
};

/** Fiter badges by award status. Defaults to ALL */
export enum BadgeAwardStatus {
  All = 'ALL',
  Awarded = 'AWARDED',
  Unawarded = 'UNAWARDED'
}

export type BadgeCollectedNotification = InboxNotification & {
  __typename?: 'BadgeCollectedNotification';
  acknowledged: Scalars['Boolean'];
  badge?: Maybe<Badge>;
  collectedBy?: Maybe<User>;
  id: Scalars['String'];
  read: Scalars['Boolean'];
  time: Scalars['String'];
};

export type BadgeConnection = {
  __typename?: 'BadgeConnection';
  edges: Array<Maybe<BadgeEdge>>;
  pageInfo: PageInfo;
};

export type BadgeEdge = {
  __typename?: 'BadgeEdge';
  cursor?: Maybe<Scalars['String']>;
  node: Badge;
};

/** BadgeStatus is only significat to Web and Backend */
export enum BadgeStatus {
  Active = 'ACTIVE',
  Inactive = 'INACTIVE'
}

export enum BadgeType {
  Community = 'COMMUNITY',
  Global = 'GLOBAL'
}

export type Campaign = {
  __typename?: 'Campaign';
  creator?: Maybe<User>;
  /** ISO-8601 */
  endTime?: Maybe<Scalars['DateTime']>;
  fandom?: Maybe<Fandom>;
  id: Scalars['String'];
  item?: Maybe<CampaignItemContent>;
  specifications: Array<CampaignSpecification>;
  /** ISO-8601 */
  startTime?: Maybe<Scalars['DateTime']>;
  type?: Maybe<CampaignType>;
};

export type CampaignConnection = {
  __typename?: 'CampaignConnection';
  edges: Array<Maybe<CampaignEdge>>;
  pageInfo: PageInfo;
};

export type CampaignEdge = {
  __typename?: 'CampaignEdge';
  cursor: Scalars['String'];
  node: Campaign;
};

export type CampaignItemContent = Event | Poll | Post;

export type CampaignItemInput = {
  id: Scalars['String'];
  type: CampaignItemType;
};

export enum CampaignItemType {
  Post = 'POST'
}

export type CampaignSpecification = {
  __typename?: 'CampaignSpecification';
  audienceSpecification: AudienceSpecification;
  deliverySpecification: DeliverySpecification;
  triggerSpecification: TriggerSpecification;
};

export type CampaignSpecificationInput = {
  audienceSpecification?: InputMaybe<AudienceSpecificationInput>;
  deliverySpecification: DeliverySpecificationInput;
  triggerSpecification?: InputMaybe<TriggerSpecificationInput>;
};

/** type of the campaign */
export enum CampaignType {
  Announcement = 'ANNOUNCEMENT',
  Custom = 'CUSTOM',
  Onboarding = 'ONBOARDING'
}

export type CancelJoinHiddenFandomInput = {
  fandomId: Scalars['String'];
  userId: Scalars['String'];
};

export type CancelJoinHiddenFandomPayload = {
  __typename?: 'CancelJoinHiddenFandomPayload';
  member?: Maybe<FandomMember>;
};

export type CancelJoinPrivateFandomInput = {
  fandomId: Scalars['String'];
};

export type CancelJoinPrivateFandomPayload = {
  __typename?: 'CancelJoinPrivateFandomPayload';
  fandomId?: Maybe<Scalars['String']>;
  roles?: Maybe<Array<FandomMemberRole>>;
  status?: Maybe<FandomMemberStatus>;
  user?: Maybe<User>;
};

export type CastVoteInput = {
  optionId: Scalars['String'];
  pollId: Scalars['String'];
};

export type CastVotePayload = {
  __typename?: 'CastVotePayload';
  poll: Poll;
};

export type ChangeModerationStatusInput = {
  entityId: Scalars['String'];
  /** Internal note provided by moderator to explain the decision made */
  internalNote?: InputMaybe<Scalars['String']>;
  /** Violation identified by moderator when deciding to take content down, should match [A-Z_]{1,40} */
  violationType?: InputMaybe<Scalars['String']>;
  /** Desired state of content visibility after the action is finished */
  visibility?: InputMaybe<EntityVisibility>;
};

export type Chat = {
  __typename?: 'Chat';
  channel: ChatChannel;
  id: Scalars['String'];
  status: ChatStatus;
  title: Scalars['String'];
  type: ChatType;
};

export type ChatChannel = {
  __typename?: 'ChatChannel';
  id: Scalars['String'];
  type: Scalars['String'];
};

export type ChatContext = {
  fandomId: Scalars['String'];
};

export enum ChatStatus {
  Closed = 'CLOSED',
  Open = 'OPEN'
}

export type ChatToken = {
  __typename?: 'ChatToken';
  value: Scalars['String'];
};

export enum ChatType {
  Event = 'EVENT',
  Fandom = 'FANDOM',
  Livestream = 'LIVESTREAM',
  Private = 'PRIVATE'
}

export type Comment = {
  __typename?: 'Comment';
  aiLabels?: Maybe<Array<AiLabel>>;
  attachment?: Maybe<CommentAttachment>;
  author?: Maybe<User>;
  content?: Maybe<Scalars['String']>;
  createdAt: Scalars['DateTime'];
  cursor: Scalars['String'];
  fandom?: Maybe<Fandom>;
  fandomMembership?: Maybe<FandomMember>;
  id: Scalars['String'];
  likeReaction?: Maybe<LikeReaction>;
  parent?: Maybe<CommentParent>;
  replies?: Maybe<CommentConnection>;
  status: CommentStatus;
  updatedAt?: Maybe<Scalars['DateTime']>;
};


export type CommentRepliesArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  filter?: InputMaybe<CommentFilterType>;
  first?: InputMaybe<Scalars['Int']>;
  inclusive?: InputMaybe<Scalars['Boolean']>;
  last?: InputMaybe<Scalars['Int']>;
};

export type CommentAttachment = Image | Video;

export type CommentAttachmentInput = {
  attachmentId: Scalars['String'];
  type: CommentAttachmentType;
};

export enum CommentAttachmentType {
  Image = 'IMAGE',
  Video = 'VIDEO'
}

export type CommentConnection = {
  __typename?: 'CommentConnection';
  edges: Array<Maybe<CommentEdge>>;
  pageInfo: PageInfo;
  totalCount?: Maybe<Scalars['Int']>;
};

export type CommentEdge = {
  __typename?: 'CommentEdge';
  cursor: Scalars['String'];
  node: Comment;
};

export enum CommentFilterType {
  All = 'ALL',
  Moderated = 'MODERATED',
  Visible = 'VISIBLE'
}

export type CommentModerationInfo = {
  __typename?: 'CommentModerationInfo';
  comment?: Maybe<Comment>;
  topParent?: Maybe<TopParentEntity>;
  visibility?: Maybe<EntityVisibility>;
};

export type CommentNotification = InboxNotification & {
  __typename?: 'CommentNotification';
  acknowledged: Scalars['Boolean'];
  commentCount: Scalars['BigInteger'];
  fandom?: Maybe<Fandom>;
  feedItem?: Maybe<InboxFeedItem>;
  id: Scalars['String'];
  inReplyTo?: Maybe<InboxComposition>;
  lastComments: Array<Maybe<Comment>>;
  read: Scalars['Boolean'];
  time: Scalars['String'];
};

export type CommentParent = Comment | Event | Poll | Post;

export enum CommentStatus {
  /** @deprecated Field no longer supported */
  Deleted = 'DELETED',
  Failed = 'FAILED',
  Online = 'ONLINE',
  Processing = 'PROCESSING'
}

export type CommunityRecommendedHighlights = {
  __typename?: 'CommunityRecommendedHighlights';
  fandom?: Maybe<Fandom>;
  highlights: Array<Maybe<FeedItem>>;
  highlightsType?: Maybe<CommunityRecommendedHighlightsType>;
};

export enum CommunityRecommendedHighlightsType {
  Joined = 'JOINED',
  Recommended = 'RECOMMENDED'
}

/** Connect EventChat */
export type ConnectEventChatInput = {
  eventId: Scalars['String'];
};

export type ConnectEventChatPayload = {
  __typename?: 'ConnectEventChatPayload';
  token: Scalars['String'];
};

/** Connect FandomChat */
export type ConnectFandomChatPayload = {
  __typename?: 'ConnectFandomChatPayload';
  token: Scalars['String'];
};

export type ContentSearchConnection = {
  __typename?: 'ContentSearchConnection';
  edges: Array<ContentSearchEdge>;
  pageInfo: PageInfo;
};

export type ContentSearchEdge = {
  __typename?: 'ContentSearchEdge';
  cursor: Scalars['String'];
  node?: Maybe<ContentSearchNode>;
};

export type ContentSearchNode = Event | Poll | Post;

export type CreateCampaignInput = {
  /**
   * End time (if null no endtime is used)
   *  ISO-8601
   */
  endTime?: InputMaybe<Scalars['DateTime']>;
  /** Fandom */
  fandomId: Scalars['String'];
  /** Campaign item used for this campaign */
  item: CampaignItemInput;
  /** All active specifications */
  specifications: Array<CampaignSpecificationInput>;
  /**
   * Start time (if null no starttime is used)
   *  ISO-8601
   */
  startTime?: InputMaybe<Scalars['DateTime']>;
  /** Type */
  type: CampaignType;
};

export type CreateCampaignPayload = {
  __typename?: 'CreateCampaignPayload';
  campaign?: Maybe<Campaign>;
};

export type CreateCommentInput = {
  attachment?: InputMaybe<CommentAttachmentInput>;
  content?: InputMaybe<Scalars['String']>;
  replyTo: ParentInput;
};

export type CreateCommentPayload = {
  __typename?: 'CreateCommentPayload';
  comment: Comment;
};

export type CreateEventInput = {
  attachments: Array<InputMaybe<EventAttachmentInput>>;
  content: Scalars['String'];
  endTime: Scalars['ZonedDateTime'];
  fandomId: Scalars['String'];
  location: EventLocationInput;
  startTime: Scalars['ZonedDateTime'];
  ticketUrl?: InputMaybe<Scalars['String']>;
  title: Scalars['String'];
  visibleAt?: InputMaybe<Scalars['DateTime']>;
};

export type CreateEventPayload = {
  __typename?: 'CreateEventPayload';
  event: Event;
};

export type CreateFandomInput = {
  hashtags?: InputMaybe<Array<Scalars['String']>>;
  logoImageId?: InputMaybe<Scalars['String']>;
  name: Scalars['String'];
  summary: Scalars['String'];
  /**
   * This directive should be uncommented when it is supported in the spec.
   * cf. https://github.com/graphql/graphql-spec/pull/805
   */
  themeId: Scalars['String'];
  visibility: FandomVisibility;
};

export type CreateFandomPayload = {
  __typename?: 'CreateFandomPayload';
  fandom: Fandom;
};

export type CreateFriendRequestInput = {
  userId: Scalars['String'];
};

export type CreateFriendRequestPayload = {
  __typename?: 'CreateFriendRequestPayload';
  user?: Maybe<User>;
};

export type CreateLikeReactionInput = {
  reactableId: Scalars['String'];
  reactableType: ReactableType;
};

export type CreateLikeReactionPayload = {
  __typename?: 'CreateLikeReactionPayload';
  reaction: LikeReaction;
};

export type CreatePollInput = {
  duration: Scalars['Duration'];
  fandomId: Scalars['String'];
  options: Array<Scalars['String']>;
  question: Scalars['String'];
  visibleAt?: InputMaybe<Scalars['DateTime']>;
};

export type CreatePollPayload = {
  __typename?: 'CreatePollPayload';
  poll: Poll;
};

export type CreatePostInput = {
  attachments: Array<InputMaybe<AttachmentInput>>;
  content?: InputMaybe<Scalars['String']>;
  fandomId: Scalars['String'];
  title?: InputMaybe<Scalars['String']>;
  type?: InputMaybe<PostType>;
  visibleAt?: InputMaybe<Scalars['DateTime']>;
};

export type CreatePostPayload = {
  __typename?: 'CreatePostPayload';
  post: Post;
};

/**
 * CreateProductInput takes optional parameters depending on the `productType`.
 * - `productType = SINGLE`
 * - `status` may be specified, if null defaults to UNPUBLISHED
 * - `variant` field should be present
 *
 * - `productType = MULTI`
 * - `status` will be ignored if specified, it will always be UNPUBLISHED
 * - `variants` field should be present
 */
export type CreateProductInput = {
  description: Scalars['String'];
  name: Scalars['String'];
  productType?: InputMaybe<ProductType>;
  status?: InputMaybe<ProductStatus>;
  storeId: Scalars['String'];
  variant?: InputMaybe<CreateVariantInput>;
  variants?: InputMaybe<Array<AttributeSummaryItemInput>>;
};

export type CreateProductPayload = {
  __typename?: 'CreateProductPayload';
  error?: Maybe<EntityError>;
  /** @deprecated Use `error` field instead */
  message?: Maybe<Scalars['String']>;
  product?: Maybe<Product>;
  /** @deprecated Use `error` field instead */
  status: StoreMutationStatus;
};

export type CreateStoreInput = {
  active: Scalars['Boolean'];
  contactCountryCode?: InputMaybe<Scalars['String']>;
  contactNumber?: InputMaybe<Scalars['String']>;
  content: Scalars['String'];
  ctaImgId: Scalars['String'];
  currency?: InputMaybe<Scalars['String']>;
  email?: InputMaybe<Scalars['String']>;
  fandomId: Scalars['String'];
  storeUrl: Scalars['String'];
  storeUrlTitle?: InputMaybe<Scalars['String']>;
  tags?: InputMaybe<Array<Scalars['String']>>;
  title: Scalars['String'];
};

export type CreateStorePayload = {
  __typename?: 'CreateStorePayload';
  error?: Maybe<EntityError>;
  /** @deprecated Use `error` field instead */
  message?: Maybe<Scalars['String']>;
  /** @deprecated Use `error` field instead */
  status: StoreMutationStatus;
  store?: Maybe<Store>;
};

/**
 * `productId` is optional when creating a SINGLE productType.
 * It **should not be null** when adding a new variant to and existing MULTI productType
 */
export type CreateVariantInput = {
  attributes?: InputMaybe<Array<VariantAttributeInput>>;
  externalUrl: Scalars['String'];
  imageIds: Array<Scalars['String']>;
  label: VariantLabel;
  price: Scalars['Float'];
  productId?: InputMaybe<Scalars['String']>;
  salePrice?: InputMaybe<Scalars['Float']>;
  saleValidFrom?: InputMaybe<Scalars['DateTime']>;
  saleValidTo?: InputMaybe<Scalars['DateTime']>;
  sku?: InputMaybe<Scalars['String']>;
};

export type CreateVariantPayload = {
  __typename?: 'CreateVariantPayload';
  error?: Maybe<EntityError>;
  /** @deprecated Use `error` field instead */
  message?: Maybe<Scalars['String']>;
  /** @deprecated Use `error` field instead */
  status: StoreMutationStatus;
  variant?: Maybe<Variant>;
};

export type CreatorAppealInfo = {
  __typename?: 'CreatorAppealInfo';
  /** Creator of the entity. */
  creator?: Maybe<User>;
  /** Some text provided by the creator as a reasoning to his appeal. */
  note?: Maybe<Scalars['String']>;
};

export type DeleteCampaignInput = {
  campaignId: Scalars['String'];
};

export type DeleteCampaignPayload = {
  __typename?: 'DeleteCampaignPayload';
  campaignId?: Maybe<Scalars['String']>;
};

export type DeleteCommentInput = {
  id: Scalars['String'];
};

export type DeleteCommentPayload = {
  __typename?: 'DeleteCommentPayload';
  comment: Comment;
  /** @deprecated Field no longer supported */
  id: Scalars['String'];
};

export type DeleteEventInput = {
  eventId: Scalars['String'];
};

export type DeleteEventPayload = {
  __typename?: 'DeleteEventPayload';
  eventId: Scalars['String'];
};

export type DeleteFriendshipInput = {
  userId: Scalars['String'];
};

export type DeleteFriendshipPayload = {
  __typename?: 'DeleteFriendshipPayload';
  user?: Maybe<User>;
};

export type DeleteLikeReactionInput = {
  reactionId: Scalars['String'];
};

export type DeleteLikeReactionPayload = {
  __typename?: 'DeleteLikeReactionPayload';
  reaction: LikeReaction;
};

export type DeletePollInput = {
  pollId: Scalars['String'];
};

export type DeletePollPayload = {
  __typename?: 'DeletePollPayload';
  pollId: Scalars['String'];
};

export type DeletePostInput = {
  postId: Scalars['String'];
};

export type DeletePostPayload = {
  __typename?: 'DeletePostPayload';
  postId: Scalars['String'];
};

export type DeleteProductInput = {
  id: Scalars['String'];
};

export type DeleteProductPayload = {
  __typename?: 'DeleteProductPayload';
  error?: Maybe<EntityError>;
  /** @deprecated Use `error` field instead */
  message?: Maybe<Scalars['String']>;
  product?: Maybe<Product>;
  /** @deprecated Use `error` field instead */
  status: StoreMutationStatus;
};

export type DeleteUserInput = {
  userId: Scalars['String'];
};

export type DeleteUserPayload = {
  __typename?: 'DeleteUserPayload';
  user?: Maybe<User>;
};

export type DeleteVariantInput = {
  productId: Scalars['String'];
  variantId: Scalars['String'];
};

export type DeleteVariantPayload = {
  __typename?: 'DeleteVariantPayload';
  error?: Maybe<EntityError>;
  /** @deprecated Use `error` field instead */
  message?: Maybe<Scalars['String']>;
  /** @deprecated Use `error` field instead */
  status: StoreMutationStatus;
  variant?: Maybe<Variant>;
};

export enum DeliveryMechanismType {
  CommunityFeed = 'COMMUNITY_FEED',
  Highlights = 'HIGHLIGHTS'
}

export type DeliverySpecification = {
  __typename?: 'DeliverySpecification';
  deliveryMechanisms: Array<DeliveryMechanismType>;
};

export type DeliverySpecificationInput = {
  deliveryMechanisms: Array<DeliveryMechanismType>;
};

/** End FandomChat */
export type EndFandomChatInput = {
  fandomId: Scalars['String'];
};

export type EndFandomChatPayload = {
  __typename?: 'EndFandomChatPayload';
  chat: FandomChat;
};

export type EntityError = {
  __typename?: 'EntityError';
  code: ErrorCode;
  details?: Maybe<Array<ErrorItem>>;
};

export enum EntityType {
  Comment = 'COMMENT',
  Event = 'EVENT',
  Poll = 'POLL',
  Post = 'POST',
  User = 'USER'
}

export enum EntityVisibility {
  Hidden = 'HIDDEN',
  Visible = 'VISIBLE'
}

export enum EntryType {
  Credit = 'CREDIT',
  Debit = 'DEBIT'
}

export enum ErrorCode {
  BadRequest = 'BAD_REQUEST',
  InternalServerError = 'INTERNAL_SERVER_ERROR',
  NotFound = 'NOT_FOUND',
  UnprocessableEntity = 'UNPROCESSABLE_ENTITY'
}

export enum ErrorDetail {
  /**
   * The deadline expired before the operation could complete.
   *
   * For operations that change the state of the system, this error
   * may be returned even if the operation has completed successfully.
   * For example, a successful response from a server could have been
   * delayed long enough for the deadline to expire.
   *
   * HTTP Mapping: 504 Gateway Timeout
   * Error Type: UNAVAILABLE
   */
  DeadlineExceeded = 'DEADLINE_EXCEEDED',
  /**
   * The server detected that the client is exhibiting a behavior that
   * might be generating excessive load.
   *
   * HTTP Mapping: 429 Too Many Requests or 420 Enhance Your Calm
   * Error Type: UNAVAILABLE
   */
  EnhanceYourCalm = 'ENHANCE_YOUR_CALM',
  /**
   * The requested field is not found in the schema.
   *
   * This differs from `NOT_FOUND` in that `NOT_FOUND` should be used when a
   * query is valid, but is unable to return a result (if, for example, a
   * specific video id doesn't exist). `FIELD_NOT_FOUND` is intended to be
   * returned by the server to signify that the requested field is not known to exist.
   * This may be returned in lieu of failing the entire query.
   * See also `PERMISSION_DENIED` for cases where the
   * requested field is invalid only for the given user or class of users.
   *
   * HTTP Mapping: 404 Not Found
   * Error Type: BAD_REQUEST
   */
  FieldNotFound = 'FIELD_NOT_FOUND',
  /**
   * The client specified an invalid argument.
   *
   * Note that this differs from `FAILED_PRECONDITION`.
   * `INVALID_ARGUMENT` indicates arguments that are problematic
   * regardless of the state of the system (e.g., a malformed file name).
   *
   * HTTP Mapping: 400 Bad Request
   * Error Type: BAD_REQUEST
   */
  InvalidArgument = 'INVALID_ARGUMENT',
  /**
   * The provided cursor is not valid.
   *
   * The most common usage for this error is when a client is paginating
   * through a list that uses stateful cursors. In that case, the provided
   * cursor may be expired.
   *
   * HTTP Mapping: 404 Not Found
   * Error Type: NOT_FOUND
   */
  InvalidCursor = 'INVALID_CURSOR',
  /**
   * Unable to perform operation because a required resource is missing.
   *
   * Example: Client is attempting to refresh a list, but the specified
   * list is expired. This requires an action by the client to get a new list.
   *
   * If the user is simply trying GET a resource that is not found,
   * use the NOT_FOUND error type. FAILED_PRECONDITION.MISSING_RESOURCE
   * is to be used particularly when the user is performing an operation
   * that requires a particular resource to exist.
   *
   * HTTP Mapping: 400 Bad Request or 500 Internal Server Error
   * Error Type: FAILED_PRECONDITION
   */
  MissingResource = 'MISSING_RESOURCE',
  /**
   * Service Error.
   *
   * There is a problem with an upstream service.
   *
   * This may be returned if a gateway receives an unknown error from a service
   * or if a service is unreachable.
   * If a request times out which waiting on a response from a service,
   * `DEADLINE_EXCEEDED` may be returned instead.
   * If a service returns a more specific error Type, the specific error Type may
   * be returned instead.
   *
   * HTTP Mapping: 502 Bad Gateway
   * Error Type: UNAVAILABLE
   */
  ServiceError = 'SERVICE_ERROR',
  /**
   * Request failed due to network errors.
   *
   * HTTP Mapping: 503 Unavailable
   * Error Type: UNAVAILABLE
   */
  TcpFailure = 'TCP_FAILURE',
  /**
   * Request throttled based on server concurrency limits.
   *
   * HTTP Mapping: 503 Unavailable
   * Error Type: UNAVAILABLE
   */
  ThrottledConcurrency = 'THROTTLED_CONCURRENCY',
  /**
   * Request throttled based on server CPU limits
   *
   * HTTP Mapping: 503 Unavailable.
   * Error Type: UNAVAILABLE
   */
  ThrottledCpu = 'THROTTLED_CPU',
  /**
   * The operation is not implemented or is not currently supported/enabled.
   *
   * HTTP Mapping: 501 Not Implemented
   * Error Type: BAD_REQUEST
   */
  Unimplemented = 'UNIMPLEMENTED',
  /**
   * Unknown error.
   *
   * This error should only be returned when no other error detail applies.
   * If a client sees an unknown errorDetail, it will be interpreted as UNKNOWN.
   *
   * HTTP Mapping: 500 Internal Server Error
   */
  Unknown = 'UNKNOWN'
}

export type ErrorItem = {
  __typename?: 'ErrorItem';
  key?: Maybe<Scalars['String']>;
  message: Scalars['String'];
};

export enum ErrorType {
  /**
   * Bad Request.
   *
   * There is a problem with the request.
   * Retrying the same request is not likely to succeed.
   * An example would be a query or argument that cannot be deserialized.
   *
   * HTTP Mapping: 400 Bad Request
   */
  BadRequest = 'BAD_REQUEST',
  /**
   * The operation was rejected because the system is not in a state
   * required for the operation's execution.  For example, the directory
   * to be deleted is non-empty, an rmdir operation is applied to
   * a non-directory, etc.
   *
   * Service implementers can use the following guidelines to decide
   * between `FAILED_PRECONDITION` and `UNAVAILABLE`:
   *
   * - Use `UNAVAILABLE` if the client can retry just the failing call.
   * - Use `FAILED_PRECONDITION` if the client should not retry until
   * the system state has been explicitly fixed.  E.g., if an "rmdir"
   *      fails because the directory is non-empty, `FAILED_PRECONDITION`
   * should be returned since the client should not retry unless
   * the files are deleted from the directory.
   *
   * HTTP Mapping: 400 Bad Request or 500 Internal Server Error
   */
  FailedPrecondition = 'FAILED_PRECONDITION',
  /**
   * Internal error.
   *
   * An unexpected internal error was encountered. This means that some
   * invariants expected by the underlying system have been broken.
   * This error code is reserved for serious errors.
   *
   * HTTP Mapping: 500 Internal Server Error
   */
  Internal = 'INTERNAL',
  /**
   * The requested entity was not found.
   *
   * This could apply to a resource that has never existed (e.g. bad resource id),
   * or a resource that no longer exists (e.g. cache expired.)
   *
   * Note to server developers: if a request is denied for an entire class
   * of users, such as gradual feature rollout or undocumented allowlist,
   * `NOT_FOUND` may be used. If a request is denied for some users within
   * a class of users, such as user-based access control, `PERMISSION_DENIED`
   * must be used.
   *
   * HTTP Mapping: 404 Not Found
   */
  NotFound = 'NOT_FOUND',
  /**
   * The caller does not have permission to execute the specified
   * operation.
   *
   * `PERMISSION_DENIED` must not be used for rejections
   * caused by exhausting some resource or quota.
   * `PERMISSION_DENIED` must not be used if the caller
   * cannot be identified (use `UNAUTHENTICATED`
   * instead for those errors).
   *
   * This error Type does not imply the
   * request is valid or the requested entity exists or satisfies
   * other pre-conditions.
   *
   * HTTP Mapping: 403 Forbidden
   */
  PermissionDenied = 'PERMISSION_DENIED',
  /**
   * The request does not have valid authentication credentials.
   *
   * This is intended to be returned only for routes that require
   * authentication.
   *
   * HTTP Mapping: 401 Unauthorized
   */
  Unauthenticated = 'UNAUTHENTICATED',
  /**
   * Currently Unavailable.
   *
   * The service is currently unavailable.  This is most likely a
   * transient condition, which can be corrected by retrying with
   * a backoff.
   *
   * HTTP Mapping: 503 Unavailable
   */
  Unavailable = 'UNAVAILABLE',
  /**
   * Unknown error.
   *
   * For example, this error may be returned when
   * an error code received from another address space belongs to
   * an error space that is not known in this address space.  Also
   * errors raised by APIs that do not return enough error information
   * may be converted to this error.
   *
   * If a client sees an unknown errorType, it will be interpreted as UNKNOWN.
   * Unknown errors MUST NOT trigger any special behavior. These MAY be treated
   * by an implementation as being equivalent to INTERNAL.
   *
   * When possible, a more specific error should be provided.
   *
   * HTTP Mapping: 520 Unknown Error
   */
  Unknown = 'UNKNOWN'
}

export type EscalateModerationJobInput = {
  /** ID of the entity associated with the moderation job */
  entityId: Scalars['String'];
  /** Target moderation level where the job should be escalated to */
  target?: InputMaybe<EscalationTarget>;
};

/** Payload returned when a moderation job is escalated */
export type EscalateModerationJobPayload = {
  __typename?: 'EscalateModerationJobPayload';
  /** Moderation job */
  moderationJob: ModerationJob;
};

export enum EscalationTarget {
  Aaqua = 'AAQUA',
  Escalations = 'ESCALATIONS'
}

export type Event = {
  __typename?: 'Event';
  aiLabels?: Maybe<Array<AiLabel>>;
  attachments: Array<Maybe<EventAttachment>>;
  chat?: Maybe<EventChat>;
  comments?: Maybe<CommentConnection>;
  content: Scalars['String'];
  createdAt: Scalars['DateTime'];
  endTime: Scalars['ZonedDateTime'];
  fandom?: Maybe<Fandom>;
  fandomMembership?: Maybe<FandomMember>;
  id: Scalars['String'];
  interactions: EventInteractions;
  isPinned?: Maybe<Scalars['Boolean']>;
  likeReaction?: Maybe<LikeReaction>;
  location: EventLocation;
  startTime: Scalars['ZonedDateTime'];
  status: EventStatus;
  ticketUrl?: Maybe<Scalars['String']>;
  title: Scalars['String'];
  updatedAt?: Maybe<Scalars['DateTime']>;
  user?: Maybe<User>;
  userReply?: Maybe<UserEventReply>;
  visibleAt: Scalars['DateTime'];
};


export type EventCommentsArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  filter?: InputMaybe<CommentFilterType>;
  first?: InputMaybe<Scalars['Int']>;
  inclusive?: InputMaybe<Scalars['Boolean']>;
  last?: InputMaybe<Scalars['Int']>;
};

export type EventAttachment = Image | Video;

export type EventAttachmentInput = {
  attachmentId: Scalars['String'];
  type: EventAttachmentType;
};

export enum EventAttachmentType {
  Image = 'IMAGE',
  Video = 'VIDEO'
}

export type EventChat = {
  __typename?: 'EventChat';
  channel: Scalars['String'];
  id: Scalars['String'];
  status: ChatStatus;
  title: Scalars['String'];
};

export type EventInteractions = {
  __typename?: 'EventInteractions';
  going: Scalars['Int'];
  maybe: Scalars['Int'];
  notGoing: Scalars['Int'];
};

export type EventLocation = {
  __typename?: 'EventLocation';
  displayName: Scalars['String'];
};

export type EventLocationInput = {
  displayName: Scalars['String'];
};

export type EventModerationInfo = {
  __typename?: 'EventModerationInfo';
  event?: Maybe<Event>;
  visibility?: Maybe<EntityVisibility>;
};

export type EventPartialContentInput = {
  updatedValue: Scalars['String'];
};

export type EventPartialDisplayNameInput = {
  updatedValue: Scalars['String'];
};

export type EventPartialEndTimeInput = {
  updatedValue: Scalars['ZonedDateTime'];
};

export type EventPartialLocationInput = {
  displayName?: InputMaybe<EventPartialDisplayNameInput>;
};

export type EventPartialStartTimeInput = {
  updatedValue: Scalars['ZonedDateTime'];
};

export type EventPartialTicketUrlInput = {
  updatedValue?: InputMaybe<Scalars['String']>;
};

export type EventPartialTitleInput = {
  updatedValue: Scalars['String'];
};

export type EventPartialVisibleAtInput = {
  updatedValue?: InputMaybe<Scalars['DateTime']>;
};

export enum EventStatus {
  Failed = 'FAILED',
  Online = 'ONLINE',
  Processing = 'PROCESSING'
}

export type Fandom = {
  __typename?: 'Fandom';
  /**
   *  This directive should be moved to the PaginationInput argument and uncommented when this isn't supported in the spec.
   *  cf. https://github.com/graphql/graphql-spec/pull/805
   * @deprecated(reason: "deprecated argument PaginationInput from v6, use unpacked arguments instead")
   */
  admins?: Maybe<FandomMemberConnection>;
  chat?: Maybe<FandomChat>;
  createdAt?: Maybe<Scalars['DateTime']>;
  createdBy?: Maybe<User>;
  handle?: Maybe<Scalars['String']>;
  hashtags?: Maybe<Array<Scalars['String']>>;
  id: Scalars['String'];
  livestream?: Maybe<Livestream>;
  logoImage?: Maybe<Image>;
  memberCount?: Maybe<Scalars['Int']>;
  /**
   *  This directive should be moved to the PaginationInput argument and uncommented when this isn't supported in the spec.
   *  cf. https://github.com/graphql/graphql-spec/pull/805
   * @deprecated(reason: "deprecated argument PaginationInput from v6, use unpacked arguments instead")
   */
  members?: Maybe<FandomMemberConnection>;
  myMembership?: Maybe<FandomMember>;
  name?: Maybe<Scalars['String']>;
  rules?: Maybe<Array<FandomRule>>;
  rulesLastUpdatedAt?: Maybe<Scalars['DateTime']>;
  summary?: Maybe<Scalars['String']>;
  /** @deprecated Deprecated from api v7. Theme functionality removed in app build 1.31.0 */
  theme?: Maybe<FandomTheme>;
  visibility?: Maybe<FandomVisibility>;
};


export type FandomAdminsArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  pagination?: InputMaybe<PaginationInput>;
};


export type FandomMembersArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  pagination?: InputMaybe<PaginationInput>;
};

export type FandomAddedAsAdminNotification = InboxNotification & {
  __typename?: 'FandomAddedAsAdminNotification';
  acknowledged: Scalars['Boolean'];
  assigner?: Maybe<User>;
  fandom?: Maybe<Fandom>;
  id: Scalars['String'];
  read: Scalars['Boolean'];
  time: Scalars['String'];
};

export type FandomChat = {
  __typename?: 'FandomChat';
  channel?: Maybe<Scalars['String']>;
  id: Scalars['String'];
  participantCount?: Maybe<Scalars['Int']>;
  status: ChatStatus;
  title: Scalars['String'];
};

export type FandomConnection = {
  __typename?: 'FandomConnection';
  edges: Array<Maybe<FandomEdge>>;
  pageInfo: PageInfo;
};

export type FandomEdge = {
  __typename?: 'FandomEdge';
  cursor: Scalars['String'];
  node?: Maybe<Fandom>;
};

export type FandomInviteAcceptionNotification = InboxNotification & {
  __typename?: 'FandomInviteAcceptionNotification';
  acceptCount: Scalars['BigInteger'];
  acknowledged: Scalars['Boolean'];
  fandom?: Maybe<Fandom>;
  id: Scalars['String'];
  lastAcceptions: Array<Maybe<User>>;
  read: Scalars['Boolean'];
  time: Scalars['String'];
};

export type FandomInviteNotification = InboxNotification & {
  __typename?: 'FandomInviteNotification';
  acknowledged: Scalars['Boolean'];
  fandom?: Maybe<Fandom>;
  id: Scalars['String'];
  invitor?: Maybe<User>;
  read: Scalars['Boolean'];
  time: Scalars['String'];
};

export type FandomInviteRejectionNotification = InboxNotification & {
  __typename?: 'FandomInviteRejectionNotification';
  acknowledged: Scalars['Boolean'];
  fandom?: Maybe<Fandom>;
  id: Scalars['String'];
  lastRejections: Array<Maybe<User>>;
  read: Scalars['Boolean'];
  rejectCount: Scalars['BigInteger'];
  time: Scalars['String'];
};

export type FandomInviteResponseNotification = InboxNotification & {
  __typename?: 'FandomInviteResponseNotification';
  accepted: Scalars['Boolean'];
  acknowledged: Scalars['Boolean'];
  fandom?: Maybe<Fandom>;
  id: Scalars['String'];
  read: Scalars['Boolean'];
  time: Scalars['String'];
};

export type FandomJoinRequestAcceptionNotification = InboxNotification & {
  __typename?: 'FandomJoinRequestAcceptionNotification';
  acceptCount: Scalars['BigInteger'];
  acknowledged: Scalars['Boolean'];
  fandom?: Maybe<Fandom>;
  id: Scalars['String'];
  lastAcceptions: Array<Maybe<User>>;
  read: Scalars['Boolean'];
  time: Scalars['String'];
};

export type FandomJoinRequestNotification = InboxNotification & {
  __typename?: 'FandomJoinRequestNotification';
  acknowledged: Scalars['Boolean'];
  fandom?: Maybe<Fandom>;
  id: Scalars['String'];
  read: Scalars['Boolean'];
  requestor?: Maybe<User>;
  time: Scalars['String'];
};

export type FandomJoinRequestRejectionNotification = InboxNotification & {
  __typename?: 'FandomJoinRequestRejectionNotification';
  acknowledged: Scalars['Boolean'];
  fandom?: Maybe<Fandom>;
  id: Scalars['String'];
  lastRejections: Array<Maybe<User>>;
  read: Scalars['Boolean'];
  rejectCount: Scalars['BigInteger'];
  time: Scalars['String'];
};

export type FandomJoinRequestResponseNotification = InboxNotification & {
  __typename?: 'FandomJoinRequestResponseNotification';
  accepted: Scalars['Boolean'];
  acknowledged: Scalars['Boolean'];
  fandom?: Maybe<Fandom>;
  id: Scalars['String'];
  read: Scalars['Boolean'];
  time: Scalars['String'];
};

export type FandomJoinedNotification = InboxNotification & {
  __typename?: 'FandomJoinedNotification';
  acknowledged: Scalars['Boolean'];
  fandom?: Maybe<Fandom>;
  id: Scalars['String'];
  joinCount: Scalars['BigInteger'];
  lastJoiners: Array<Maybe<User>>;
  read: Scalars['Boolean'];
  time: Scalars['String'];
};

export type FandomJoinedSinceTriggerFilter = {
  __typename?: 'FandomJoinedSinceTriggerFilter';
  /** ISO-8601 */
  joinedAfter?: Maybe<Scalars['DateTime']>;
};

export type FandomJoinedSinceTriggerFilterInput = {
  /** ISO-8601 */
  joinedAfter?: InputMaybe<Scalars['DateTime']>;
};

export type FandomJoinedTriggerFilter = {
  __typename?: 'FandomJoinedTriggerFilter';
  maxDaysAfterJoining?: Maybe<Scalars['Int']>;
  minDaysAfterJoining?: Maybe<Scalars['Int']>;
};

export type FandomJoinedTriggerFilterInput = {
  maxDaysAfterJoining?: InputMaybe<Scalars['Int']>;
  minDaysAfterJoining?: InputMaybe<Scalars['Int']>;
};

export type FandomMember = {
  __typename?: 'FandomMember';
  fandom?: Maybe<Fandom>;
  roles?: Maybe<Array<FandomMemberRole>>;
  status?: Maybe<FandomMemberStatus>;
  user?: Maybe<User>;
};

export type FandomMemberConnection = {
  __typename?: 'FandomMemberConnection';
  edges: Array<Maybe<FandomMemberEdge>>;
  pageInfo: PageInfo;
};

export type FandomMemberEdge = {
  __typename?: 'FandomMemberEdge';
  cursor: Scalars['String'];
  node?: Maybe<FandomMember>;
};

export type FandomMemberReputation = {
  __typename?: 'FandomMemberReputation';
  aesActivityScore: Scalars['Float'];
  aesEngagementScore: Scalars['Float'];
  aesStickinessScore: Scalars['Float'];
  behaviourScore: Scalars['Float'];
  contributionScore: Scalars['Float'];
  dataCompletenessScore: Scalars['Float'];
  date: Scalars['Date'];
  engagementScore: Scalars['Float'];
  fandom?: Maybe<Fandom>;
  friendlinessScore: Scalars['Float'];
  member?: Maybe<User>;
  promotorScore: Scalars['Float'];
  reputationScore: Scalars['Float'];
};

export type FandomMemberReputationConnection = {
  __typename?: 'FandomMemberReputationConnection';
  edges?: Maybe<Array<Maybe<FandomMemberReputationEdge>>>;
  pageInfo: PageInfo;
};

export type FandomMemberReputationConnectionV2 = {
  __typename?: 'FandomMemberReputationConnectionV2';
  edges: Array<Maybe<FandomMemberReputationEdgeV2>>;
  pageInfo: PageInfo;
};

export type FandomMemberReputationEdge = {
  __typename?: 'FandomMemberReputationEdge';
  cursor?: Maybe<Scalars['String']>;
  node?: Maybe<FandomMemberReputation>;
};

export type FandomMemberReputationEdgeV2 = {
  __typename?: 'FandomMemberReputationEdgeV2';
  cursor?: Maybe<Scalars['String']>;
  node?: Maybe<FandomMemberReputationV2>;
};

export type FandomMemberReputationHistoryInput = {
  after?: InputMaybe<Scalars['String']>;
  endDate: Scalars['Date'];
  fandomId: Scalars['String'];
  first: Scalars['Int'];
  memberId: Scalars['String'];
  startDate: Scalars['Date'];
};

export type FandomMemberReputationInput = {
  date: Scalars['Date'];
  fandomId: Scalars['String'];
  memberId: Scalars['String'];
};

export type FandomMemberReputationV2 = {
  __typename?: 'FandomMemberReputationV2';
  components: ScoreComponents;
  dailyChange: Scalars['String'];
  date: Scalars['Date'];
  fandom?: Maybe<Fandom>;
  member?: Maybe<User>;
  reputationScore: Scalars['String'];
};

export enum FandomMemberRole {
  Admin = 'ADMIN',
  Fan = 'FAN'
}

export enum FandomMemberStatus {
  /** Admin invites to private/hidden fandoms */
  Joined = 'JOINED',
  None = 'NONE',
  /** Join requests to private fandoms */
  PendingInviteRequest = 'PENDING_INVITE_REQUEST',
  PendingJoinRequest = 'PENDING_JOIN_REQUEST'
}

export type FandomMentionNotification = InboxNotification & {
  __typename?: 'FandomMentionNotification';
  acknowledged: Scalars['Boolean'];
  composition?: Maybe<InboxComposition>;
  fandom?: Maybe<Fandom>;
  feedItem?: Maybe<InboxFeedItem>;
  id: Scalars['String'];
  inReplyTo?: Maybe<InboxComposition>;
  mention?: Maybe<Fandom>;
  mentioner?: Maybe<User>;
  read: Scalars['Boolean'];
  time: Scalars['String'];
};

export type FandomRemovedFromAdminNotification = InboxNotification & {
  __typename?: 'FandomRemovedFromAdminNotification';
  acknowledged: Scalars['Boolean'];
  assigner?: Maybe<User>;
  fandom?: Maybe<Fandom>;
  id: Scalars['String'];
  read: Scalars['Boolean'];
  time: Scalars['String'];
};

export type FandomReputation = {
  __typename?: 'FandomReputation';
  date: Scalars['Date'];
  fandom?: Maybe<Fandom>;
  reputationScore: Scalars['Float'];
};

export type FandomReputationConnection = {
  __typename?: 'FandomReputationConnection';
  edges?: Maybe<Array<Maybe<FandomReputationEdge>>>;
  pageInfo: PageInfo;
};

export type FandomReputationEdge = {
  __typename?: 'FandomReputationEdge';
  cursor?: Maybe<Scalars['String']>;
  node?: Maybe<FandomReputation>;
};

export type FandomReputationHistoryInput = {
  after?: InputMaybe<Scalars['String']>;
  endDate: Scalars['Date'];
  fandomId: Scalars['String'];
  first: Scalars['Int'];
  startDate: Scalars['Date'];
};

export type FandomReputationInput = {
  date: Scalars['Date'];
  fandomId: Scalars['String'];
};

export type FandomRule = {
  __typename?: 'FandomRule';
  description: Scalars['String'];
  name: Scalars['String'];
};

export type FandomSearchConnection = {
  __typename?: 'FandomSearchConnection';
  edges: Array<FandomSearchEdge>;
  pageInfo: PageInfo;
};

export type FandomSearchEdge = {
  __typename?: 'FandomSearchEdge';
  cursor: Scalars['String'];
  node?: Maybe<Fandom>;
};

export type FandomShareNotification = InboxNotification & {
  __typename?: 'FandomShareNotification';
  acknowledged: Scalars['Boolean'];
  content?: Maybe<Scalars['String']>;
  fandom?: Maybe<Fandom>;
  id: Scalars['String'];
  read: Scalars['Boolean'];
  sharer?: Maybe<User>;
  sharers: Array<User>;
  time: Scalars['String'];
};

export type FandomSuggestionConnection = {
  __typename?: 'FandomSuggestionConnection';
  edges: Array<FandomSuggestionEdge>;
  pageInfo: PageInfo;
};

export type FandomSuggestionEdge = {
  __typename?: 'FandomSuggestionEdge';
  cursor: Scalars['String'];
  node?: Maybe<Fandom>;
};

export type FandomTheme = {
  __typename?: 'FandomTheme';
  /** @deprecated Deprecated from api v7. Theme functionality removed in app build 1.31.0 */
  hex?: Maybe<Scalars['String']>;
  /** @deprecated Deprecated from api v7. Theme functionality removed in app build 1.31.0 */
  id: Scalars['String'];
};

export enum FandomVisibility {
  Hidden = 'HIDDEN',
  Private = 'PRIVATE',
  Public = 'PUBLIC'
}

export type FandomVisitedTriggerFilter = {
  __typename?: 'FandomVisitedTriggerFilter';
  maxDaysSinceLastVisited?: Maybe<Scalars['Int']>;
  minDaysSinceLastVisited?: Maybe<Scalars['Int']>;
};

export type FandomVisitedTriggerFilterInput = {
  maxDaysSinceLastVisited?: InputMaybe<Scalars['Int']>;
  minDaysSinceLastVisited?: InputMaybe<Scalars['Int']>;
};

export type FeedFilter = {
  feedItemType: Array<FeedItemType>;
  feedSourceType: Array<FeedItemSourceType>;
};

export type FeedItem = {
  __typename?: 'FeedItem';
  content?: Maybe<FeedItemContent>;
  sourceInformation: FeedItemSourceInformation;
};

export type FeedItemConnection = {
  __typename?: 'FeedItemConnection';
  edges: Array<FeedItemEdge>;
  pageInfo: PageInfo;
};

export type FeedItemContent = Event | Livestream | Poll | Post;

export type FeedItemEdge = {
  __typename?: 'FeedItemEdge';
  cursor: Scalars['String'];
  node: FeedItem;
};

export type FeedItemSourceInformation = PinnedFeedItemInformation | RecommendedFeedItemInformation | RegularFeedItemInformation | TargetedFeedItemInformation;

export enum FeedItemSourceType {
  Pinned = 'PINNED',
  Recommended = 'RECOMMENDED',
  Regular = 'REGULAR',
  Targeted = 'TARGETED'
}

export enum FeedItemType {
  Event = 'EVENT',
  Livestream = 'LIVESTREAM',
  Poll = 'POLL',
  Post = 'POST'
}

export type FriendRequestNotification = InboxNotification & {
  __typename?: 'FriendRequestNotification';
  acknowledged: Scalars['Boolean'];
  friend?: Maybe<User>;
  id: Scalars['String'];
  read: Scalars['Boolean'];
  time: Scalars['String'];
};

export type FriendRequestResponseNotification = InboxNotification & {
  __typename?: 'FriendRequestResponseNotification';
  accepted: Scalars['Boolean'];
  acknowledged: Scalars['Boolean'];
  friend?: Maybe<User>;
  id: Scalars['String'];
  read: Scalars['Boolean'];
  time: Scalars['String'];
};

export enum FriendshipStatus {
  Friends = 'FRIENDS',
  FriendRequestReceived = 'FRIEND_REQUEST_RECEIVED',
  FriendRequestSent = 'FRIEND_REQUEST_SENT',
  None = 'NONE'
}

export type GenerateFandomLinkInput = {
  /** app bundle id */
  fandom: Scalars['String'];
  source: Scalars['String'];
};

export type GenerateFandomLinkPayload = {
  __typename?: 'GenerateFandomLinkPayload';
  link: Scalars['String'];
};

export type GenerateInviteLinkInput = {
  /** app bundle id */
  fandom: Scalars['String'];
  numberOfSeats?: InputMaybe<Scalars['Int']>;
  source: Scalars['String'];
};

export type GenerateInviteLinkPayload = {
  __typename?: 'GenerateInviteLinkPayload';
  link: Scalars['String'];
};

export type HighlightsFromCommunityConnection = {
  __typename?: 'HighlightsFromCommunityConnection';
  edges: Array<HighlightsFromCommunityEdge>;
  pageInfo: PageInfo;
};

export type HighlightsFromCommunityEdge = {
  __typename?: 'HighlightsFromCommunityEdge';
  cursor: Scalars['String'];
  node: CommunityRecommendedHighlights;
};

export type HomeFeedFandomTile = {
  __typename?: 'HomeFeedFandomTile';
  badge?: Maybe<HomeFeedTileBadge>;
  fandom?: Maybe<Fandom>;
};

export type HomeFeedHighlightedUpdatesSection = {
  __typename?: 'HomeFeedHighlightedUpdatesSection';
  updateTiles: Array<HomeFeedTile>;
};

export type HomeFeedPersonalRecommendationSection = {
  __typename?: 'HomeFeedPersonalRecommendationSection';
  personalRecommendationTiles: Array<Maybe<Fandom>>;
};

export type HomeFeedSection = HomeFeedHighlightedUpdatesSection | HomeFeedPersonalRecommendationSection;

export type HomeFeedSectionConnection = {
  __typename?: 'HomeFeedSectionConnection';
  edges: Array<HomeFeedSectionEdge>;
};

export type HomeFeedSectionEdge = {
  __typename?: 'HomeFeedSectionEdge';
  /** cursor: String! No paging for now. */
  node: HomeFeedSection;
};

export enum HomeFeedSectionType {
  HighlightedUpdates = 'HIGHLIGHTED_UPDATES',
  PersonalisedRecommendations = 'PERSONALISED_RECOMMENDATIONS'
}

export type HomeFeedSectionsFilter = {
  sectionTypes: Array<HomeFeedSectionType>;
  tilesTypes: Array<HomeFeedTilesType>;
};

export type HomeFeedTile = HomeFeedFandomTile;

export type HomeFeedTileBadge = {
  __typename?: 'HomeFeedTileBadge';
  newPosts?: Maybe<Scalars['Int']>;
};

export enum HomeFeedTilesType {
  FandomTile = 'FANDOM_TILE'
}

export type Image = {
  __typename?: 'Image';
  aiLabels?: Maybe<Array<AiLabel>>;
  contentType: Scalars['String'];
  height?: Maybe<Scalars['Int']>;
  id: Scalars['String'];
  /** @deprecated use status instead */
  online: Scalars['Boolean'];
  ratio?: Maybe<Scalars['String']>;
  status: ImageStatus;
  statusRemarks?: Maybe<Scalars['String']>;
  url: Scalars['String'];
  width?: Maybe<Scalars['Int']>;
};

export enum ImageStatus {
  Online = 'ONLINE',
  Pending = 'PENDING',
  ProcessingFailed = 'PROCESSING_FAILED',
  ValidationFailed = 'VALIDATION_FAILED'
}

export type InboxComposition = Comment | Event | Poll | Post;

export type InboxConfiguration = {
  __typename?: 'InboxConfiguration';
  notifyOn: NotifyOn;
};

export type InboxConfigurationInput = {
  notifyOn: NotifyOnInput;
};

export type InboxFeedItem = Event | Poll | Post;

export type InboxNotification = {
  acknowledged: Scalars['Boolean'];
  id: Scalars['String'];
  read: Scalars['Boolean'];
  time: Scalars['String'];
};

export type InboxNotificationConnection = {
  __typename?: 'InboxNotificationConnection';
  edges: Array<Maybe<InboxNotificationEdge>>;
  pageInfo?: Maybe<PageInfo>;
  /** @deprecated Field no longer supported */
  readMark?: Maybe<Scalars['String']>;
  seenMark?: Maybe<Scalars['String']>;
  unseenCount: Scalars['BigInteger'];
};

export type InboxNotificationEdge = {
  __typename?: 'InboxNotificationEdge';
  cursor: Scalars['String'];
  node: InboxNotification;
};

export type IngestServer = {
  __typename?: 'IngestServer';
  endpoint: Scalars['String'];
  streamKey: Scalars['String'];
};

export type InviteJoinHiddenFandomInput = {
  fandomId: Scalars['String'];
  userId: Scalars['String'];
};

export type InviteJoinHiddenFandomPayload = {
  __typename?: 'InviteJoinHiddenFandomPayload';
  member?: Maybe<FandomMember>;
};

/** Join Chat */
export type JoinChatInput = {
  chatId: Scalars['String'];
};

export type JoinChatPayload = {
  __typename?: 'JoinChatPayload';
  chat: Chat;
};

/** WATCHER */
export type JoinLivestreamInput = {
  /** @deprecated(reason: "ignored") */
  fandomId?: InputMaybe<Scalars['String']>;
  livestreamId: Scalars['String'];
  /** @deprecated(reason: "ignored") */
  userId?: InputMaybe<Scalars['String']>;
};

/** WATCHER */
export type JoinLivestreamPayload = {
  __typename?: 'JoinLivestreamPayload';
  message?: Maybe<Scalars['String']>;
  status: LivestreamMutationStatus;
};

export type JoinPublicFandomInput = {
  fandomId: Scalars['String'];
};

export type JoinPublicFandomPayload = {
  __typename?: 'JoinPublicFandomPayload';
  member?: Maybe<FandomMember>;
};

export type LeaveFandomInput = {
  fandomId: Scalars['String'];
};

export type LeaveFandomPayload = {
  __typename?: 'LeaveFandomPayload';
  fandomId?: Maybe<Scalars['String']>;
  roles?: Maybe<Array<FandomMemberRole>>;
  status?: Maybe<FandomMemberStatus>;
  user?: Maybe<User>;
};

export type LeaveLivestreamInput = {
  /** @deprecated(reason: "ignored") */
  fandomId?: InputMaybe<Scalars['String']>;
  livestreamId: Scalars['String'];
  /** @deprecated(reason: "ignored") */
  userId?: InputMaybe<Scalars['String']>;
};

export type LeaveLivestreamPayload = {
  __typename?: 'LeaveLivestreamPayload';
  message?: Maybe<Scalars['String']>;
  status: LivestreamMutationStatus;
};

export type LikeInformation = {
  __typename?: 'LikeInformation';
  likedAt?: Maybe<Scalars['DateTime']>;
};

export type LikeNotification = InboxNotification & {
  __typename?: 'LikeNotification';
  acknowledged: Scalars['Boolean'];
  composition?: Maybe<InboxComposition>;
  fandom?: Maybe<Fandom>;
  feedItem?: Maybe<InboxFeedItem>;
  id: Scalars['String'];
  inReplyTo?: Maybe<InboxComposition>;
  lastLikers: Array<Maybe<User>>;
  likeCount: Scalars['BigInteger'];
  read: Scalars['Boolean'];
  time: Scalars['String'];
};

/**
 * Summary of like reactions (totalCount) and info about the reaction
 * of the authenticated user (hasLike, likedAt and reactionId where likedAt and
 * reactionId are set to null when hasLike is false).
 */
export type LikeReaction = {
  __typename?: 'LikeReaction';
  hasLike: Scalars['Boolean'];
  likedAt?: Maybe<Scalars['DateTime']>;
  reactionId?: Maybe<Scalars['String']>;
  totalCount: Scalars['Long'];
};

/** The Livestream schema */
export type Livestream = {
  __typename?: 'Livestream';
  chat?: Maybe<LivestreamChat>;
  description?: Maybe<Scalars['String']>;
  fandom?: Maybe<Fandom>;
  id: Scalars['String'];
  playbackUrl?: Maybe<Scalars['String']>;
  startDateTime?: Maybe<Scalars['String']>;
  state?: Maybe<LivestreamState>;
  thumbnailImage?: Maybe<Image>;
  title?: Maybe<Scalars['String']>;
  user?: Maybe<User>;
  viewers?: Maybe<Viewers>;
  websocketChannel?: Maybe<WebsocketChannel>;
};

export type LivestreamByAuthenticatedUser = {
  __typename?: 'LivestreamByAuthenticatedUser';
  ingestServer?: Maybe<IngestServer>;
  livestream?: Maybe<Livestream>;
};

export type LivestreamChat = {
  __typename?: 'LivestreamChat';
  channel: Scalars['String'];
  id: Scalars['String'];
  status: ChatStatus;
  title: Scalars['String'];
};

export type LivestreamConnection = {
  __typename?: 'LivestreamConnection';
  edges: Array<Maybe<LivestreamEdge>>;
  pageInfo: PageInfo;
};

export type LivestreamEdge = {
  __typename?: 'LivestreamEdge';
  cursor: Scalars['String'];
  node: Livestream;
};

export enum LivestreamHealth {
  Healthy = 'HEALTHY',
  Starving = 'STARVING',
  Unknown = 'UNKNOWN'
}

export enum LivestreamMutationStatus {
  Fail = 'FAIL',
  Success = 'SUCCESS'
}

export type LivestreamQuestion = {
  __typename?: 'LivestreamQuestion';
  answeredDateTime?: Maybe<Scalars['String']>;
  archived?: Maybe<Scalars['Boolean']>;
  createdDateTime: Scalars['String'];
  id: Scalars['String'];
  likes: LivestreamQuestionLikes;
  questionText: Scalars['String'];
  user?: Maybe<User>;
  visibility: Scalars['Boolean'];
};

export type LivestreamQuestionEdge = {
  __typename?: 'LivestreamQuestionEdge';
  cursor: Scalars['String'];
  node: LivestreamQuestion;
};

export type LivestreamQuestionInput = {
  livestreamId: Scalars['String'];
  questionText: Scalars['String'];
  /** @deprecated(reason: "ignored") */
  userId?: InputMaybe<Scalars['String']>;
};

export type LivestreamQuestionLike = {
  __typename?: 'LivestreamQuestionLike';
  likeDateTime: Scalars['String'];
  user?: Maybe<User>;
};

export type LivestreamQuestionLikeInput = {
  /** @deprecated(reason: "use questionId") */
  livestreamId?: InputMaybe<Scalars['String']>;
  questionId: Scalars['String'];
  /** @deprecated(reason: "ignored") */
  userId?: InputMaybe<Scalars['String']>;
};

export type LivestreamQuestionLikes = {
  __typename?: 'LivestreamQuestionLikes';
  likeCount?: Maybe<Scalars['Int']>;
  likes?: Maybe<Array<Maybe<LivestreamQuestionLike>>>;
};

export type LivestreamQuestionPayload = {
  __typename?: 'LivestreamQuestionPayload';
  likesCount?: Maybe<Scalars['Int']>;
  message?: Maybe<Scalars['String']>;
  status: LivestreamMutationStatus;
};

export type LivestreamQuestions = {
  __typename?: 'LivestreamQuestions';
  pageInfo?: Maybe<PageInfo>;
  questions: Array<Maybe<LivestreamQuestion>>;
};

export type LivestreamQuestionsConnection = {
  __typename?: 'LivestreamQuestionsConnection';
  edges: Array<Maybe<LivestreamQuestionEdge>>;
  pageInfo: PageInfo;
};

export enum LivestreamState {
  Created = 'CREATED',
  Interrupted = 'INTERRUPTED',
  Live = 'LIVE',
  Stopped = 'STOPPED'
}

export type LivestreamTestDataInput = {
  fandomId?: InputMaybe<Scalars['String']>;
  livestreamId?: InputMaybe<Scalars['String']>;
  size?: InputMaybe<Scalars['Int']>;
};

export type LivestreamTestDataPayload = {
  __typename?: 'LivestreamTestDataPayload';
  livestreamId?: Maybe<Scalars['String']>;
  message?: Maybe<Scalars['String']>;
};

export type LivestreamViewer = {
  __typename?: 'LivestreamViewer';
  joinDateTime: Scalars['String'];
  user?: Maybe<User>;
};

export type LivestreamViewerConnection = {
  __typename?: 'LivestreamViewerConnection';
  edges: Array<Maybe<LivestreamViewerEdge>>;
  pageInfo: PageInfo;
};

export type LivestreamViewerEdge = {
  __typename?: 'LivestreamViewerEdge';
  cursor: Scalars['String'];
  node: LivestreamViewer;
};

export type MarkInboxNotificationsAsReadInput = {
  readMark: Scalars['String'];
};

export type MarkInboxNotificationsAsReadResult = {
  __typename?: 'MarkInboxNotificationsAsReadResult';
  readMark: Scalars['String'];
};

export type MarkInboxNotificationsAsSeenInput = {
  seenMark: Scalars['String'];
};

export type MarkInboxNotificationsAsSeenPayload = {
  __typename?: 'MarkInboxNotificationsAsSeenPayload';
  seenMark: Scalars['String'];
};

export type MeaningfulInteractions = {
  __typename?: 'MeaningfulInteractions';
  communityBuilding: Scalars['String'];
  dailyChange: Scalars['String'];
  discovery: Scalars['String'];
  score: Scalars['String'];
  sustainedLoyalty: Scalars['String'];
};

export type MemberInviteLink = {
  __typename?: 'MemberInviteLink';
  numberOfSeats: Scalars['Int'];
  url: Scalars['String'];
};

export type MemberInvitesAllocatedNotification = InboxNotification & {
  __typename?: 'MemberInvitesAllocatedNotification';
  acknowledged: Scalars['Boolean'];
  amountAllocated?: Maybe<Scalars['BigInteger']>;
  id: Scalars['String'];
  read: Scalars['Boolean'];
  time: Scalars['String'];
};

export type MemberReportByIdInput = {
  entityId: Scalars['String'];
  memberId: Scalars['String'];
};

export type MemberReportPayload = {
  __typename?: 'MemberReportPayload';
  /** Some text to provided by the appelant as a reasoning to the appeal. */
  appealNote?: Maybe<Scalars['String']>;
  appealStatus: AppealStatus;
  moderationJob: ModerationJob;
  reportReason: Scalars['String'];
};

export type ModerationAppealInfo = {
  __typename?: 'ModerationAppealInfo';
  appealStatus: AppealStatus;
  entityId: Scalars['String'];
  fandom?: Maybe<Fandom>;
  visibility?: Maybe<EntityVisibility>;
};

export type ModerationAppealInfoInput = {
  entityId: Scalars['String'];
};

export type ModerationCountersFilter = {
  fandomId: Scalars['String'];
};

export type ModerationCountersPayload = {
  __typename?: 'ModerationCountersPayload';
  pendingJobsCount: Scalars['String'];
};

export enum ModerationDecision {
  ContentHidden = 'CONTENT_HIDDEN',
  ContentKept = 'CONTENT_KEPT'
}

/** Unions */
export type ModerationEntity = CommentModerationInfo | EventModerationInfo | PollModerationInfo | PostModerationInfo | UserModerationInfo;

export type ModerationJob = {
  __typename?: 'ModerationJob';
  /** Information about appeals */
  appealInfo?: Maybe<AppealInfo>;
  /** When the entity was last changed to PENDING - entered the job queue */
  changedToPendingTimestamp?: Maybe<Scalars['String']>;
  /** Entity this job relates to */
  entity?: Maybe<ModerationEntity>;
  /** ID of the entity this job relates to (needed in case moderation entity doesn't resolve by federation) */
  entityId?: Maybe<Scalars['String']>;
  /** The list of changes made to the moderation job. */
  history?: Maybe<Array<ModerationJobEvent>>;
  /** ID of the job */
  id: Scalars['String'];
  moderationStatus?: Maybe<ModerationStatus>;
  /**
   * To which moderation queue the job belongs in case of PENDING job.
   * Possible values are 'AAQUA', 'ESCALATIONS', 'COMMUNITY'
   */
  queues: Array<Scalars['String']>;
  /** Information about reports (by members and AI) */
  reportInfo?: Maybe<ReportInfo>;
  /** Violation identified by moderator when deciding to take content down */
  violationType?: Maybe<Scalars['String']>;
};

/** Represent in the ModerationJob history the fact that a job decision has been appealed by either the creator or one of the reporter. */
export type ModerationJobAppealedEvent = {
  __typename?: 'ModerationJobAppealedEvent';
  /** id of the related moderation job (this is not the entity id) */
  jobId?: Maybe<Scalars['String']>;
  /** The time at which the job decision has been appealed for the first time. */
  timestamp: Scalars['String'];
};

/** An event in the history of a ModerationJob that represent the fact that the job was escalated automatically wthout a moderator intervention. */
export type ModerationJobAutoEscalatedEvent = {
  __typename?: 'ModerationJobAutoEscalatedEvent';
  /** The queue to which the ModerationJob was automatically escalated. */
  escalationTarget?: Maybe<EscalationTarget>;
  /** Id of the related moderation job (this is not the entity id). */
  jobId?: Maybe<Scalars['String']>;
  /** The time at which the ModerationJob was automatically escalated. */
  timestamp: Scalars['String'];
};

/** Represent in the ModerationJob history the fact that a content of the moderated entity was updated. */
export type ModerationJobContentUpdatedEvent = {
  __typename?: 'ModerationJobContentUpdatedEvent';
  /** id of the related moderation job (this is not the entity id) */
  jobId?: Maybe<Scalars['String']>;
  /** The time at which the content of the moderated entity has been updated for the last time. */
  timestamp: Scalars['String'];
};

export type ModerationJobEdge = {
  __typename?: 'ModerationJobEdge';
  cursor?: Maybe<Scalars['String']>;
  node?: Maybe<ModerationJob>;
};

/** Represent in the ModerationJob history the fact that it was escalated. */
export type ModerationJobEscalatedEvent = {
  __typename?: 'ModerationJobEscalatedEvent';
  /** The queue to which the ModerationJob was escalated. */
  escalationTarget?: Maybe<EscalationTarget>;
  /** id of the related moderation job (this is not the entity id) */
  jobId?: Maybe<Scalars['String']>;
  /** The moderator making the decision to escalate the ModerationJob. */
  moderator?: Maybe<User>;
  /** The time at which the ModerationJob was escalated. */
  timestamp: Scalars['String'];
};

/** Represent an event in the ModerationJob history */
export type ModerationJobEvent = ModerationJobAppealedEvent | ModerationJobAutoEscalatedEvent | ModerationJobContentUpdatedEvent | ModerationJobEscalatedEvent | ModerationJobHiddenEvent | ModerationJobKeptEvent | ModerationJobReportedEvent | ModerationJobUserProfileResetEvent | ModerationJobUserReviewedEvent | ModerationJobUserSuspendedEvent | ModerationJobUserUnsuspendedEvent;

/** Represent in the ModerationJob history the fact that some content has been hidden. */
export type ModerationJobHiddenEvent = {
  __typename?: 'ModerationJobHiddenEvent';
  /** Information about appeals of the job, action on which resulted in this event. */
  appealInfo?: Maybe<AppealInfo>;
  /** id of the related moderation job (this is not the entity id) */
  jobId?: Maybe<Scalars['String']>;
  /** The moderator making the decision to hide the content. */
  moderator?: Maybe<User>;
  /** The moderator internal note to provide more details on why the content was hidden. */
  moderatorInternalNote?: Maybe<Scalars['String']>;
  /** Information about reports of the job, action on which resulted in this event. */
  reportInfo?: Maybe<ReportInfo>;
  /** The time at which the content has been hidden. */
  timestamp: Scalars['String'];
  /** Violation type identified by the moderator who hid the content. */
  violationType?: Maybe<Scalars['String']>;
};

/** Represent in the ModerationJob history the fact that some content has been kept visible. */
export type ModerationJobKeptEvent = {
  __typename?: 'ModerationJobKeptEvent';
  /** Information about appeals of the job, action on which resulted in this event. */
  appealInfo?: Maybe<AppealInfo>;
  /** id of the related moderation job (this is not the entity id) */
  jobId?: Maybe<Scalars['String']>;
  /** The moderator making the decision to keep the content visible. */
  moderator?: Maybe<User>;
  /** The moderator internal note to provide more details on why the content was kept visible.. */
  moderatorInternalNote?: Maybe<Scalars['String']>;
  /** Information about reports of the job, action on which resulted in this event. */
  reportInfo?: Maybe<ReportInfo>;
  /** The time at which the content was kept visible. */
  timestamp: Scalars['String'];
};

/** Represent in the ModerationJob history the fact that the content was reported. */
export type ModerationJobReportedEvent = {
  __typename?: 'ModerationJobReportedEvent';
  /** id of the related moderation job (this is not the entity id) */
  jobId?: Maybe<Scalars['String']>;
  /** The last time at which the job was reported. */
  timestamp: Scalars['String'];
};

/** Represent in the ModerationJob history the fact the profile of a user was reset. */
export type ModerationJobUserProfileResetEvent = {
  __typename?: 'ModerationJobUserProfileResetEvent';
  /** Information about appeals of the job, action on which resulted in this event. */
  appealInfo?: Maybe<AppealInfo>;
  /** id of the related moderation job (this is not the user id) */
  jobId?: Maybe<Scalars['String']>;
  /** The moderator making the decision to reset the profile of the user. */
  moderator?: Maybe<User>;
  /** The moderator internal note to provide more details on why the profile of the user was reset. */
  moderatorInternalNote?: Maybe<Scalars['String']>;
  /** Information about reports of the job, action on which resulted in this event. */
  reportInfo?: Maybe<ReportInfo>;
  /** The time at which the profile of the user was reset. */
  timestamp: Scalars['String'];
  /** Violation type identified by the moderator who reset the profile of the user. */
  violationType?: Maybe<Scalars['String']>;
};

/** Represent in the ModerationJob history the fact that a reported user has been reviewed and no action was taken against them. */
export type ModerationJobUserReviewedEvent = {
  __typename?: 'ModerationJobUserReviewedEvent';
  /** Information about appeals of the job, action on which resulted in this event. */
  appealInfo?: Maybe<AppealInfo>;
  /** id of the related moderation job (this is not the user id). */
  jobId?: Maybe<Scalars['String']>;
  /** The moderator that reviewed the user moderation job. */
  moderator?: Maybe<User>;
  /** The moderator internal note to provide more details the review. */
  moderatorInternalNote?: Maybe<Scalars['String']>;
  /** Information about reports of the job, action on which resulted in this event. */
  reportInfo?: Maybe<ReportInfo>;
  /** The time at which the user moderation job was reviewed. */
  timestamp: Scalars['String'];
};

/** Represent in the ModerationJob history the fact that a user was suspended for a period of time. */
export type ModerationJobUserSuspendedEvent = {
  __typename?: 'ModerationJobUserSuspendedEvent';
  /** Information about appeals of the job, action on which resulted in this event. */
  appealInfo?: Maybe<AppealInfo>;
  /** The duration (in hours) during which the user is suspended. */
  durationInHours: Scalars['Int'];
  /** id of the related moderation job (this is not the user id). */
  jobId?: Maybe<Scalars['String']>;
  /** The moderator making the decision to suspend the user. */
  moderator?: Maybe<User>;
  /** The moderator internal note to provide more details on why the user was suspended. */
  moderatorInternalNote?: Maybe<Scalars['String']>;
  /** Information about reports of the job, action on which resulted in this event. */
  reportInfo?: Maybe<ReportInfo>;
  /** The time at which the user was suspended. */
  timestamp: Scalars['String'];
  /** Violation type identified by the moderator who suspended the user. */
  violationType?: Maybe<Scalars['String']>;
};

/** Represent in the ModerationJob history the fact that a user previously suspended was unsuspended. */
export type ModerationJobUserUnsuspendedEvent = {
  __typename?: 'ModerationJobUserUnsuspendedEvent';
  /** id of the related moderation job (this is not the user id). */
  jobId?: Maybe<Scalars['String']>;
  /** The time at which the user was unsuspended. */
  timestamp: Scalars['String'];
};

export type ModerationJobsConnection = {
  __typename?: 'ModerationJobsConnection';
  edges: Array<Maybe<ModerationJobEdge>>;
  pageInfo: PageInfo;
};

export type ModerationJobsCountersPayload = {
  __typename?: 'ModerationJobsCountersPayload';
  pendingJobsCount: Scalars['Int'];
  reviewedJobsCount: Scalars['Int'];
};

export type ModerationJobsFilter = {
  entityType?: InputMaybe<EntityType>;
  /** The id of the fandom of the jobs we want to retrieve. Only displays community level jobs if the user is not a aaqua level moderator. */
  fandomId?: InputMaybe<Scalars['String']>;
  /** The moderation de decision of the jobs we want to retrieve. */
  moderationDecision?: InputMaybe<ModerationDecision>;
  moderationStatus?: InputMaybe<ModerationStatus>;
  /**
   * The queues from which we want to fetch the moderation jobs.
   * Values can be:
   * - AAQUA for the Aaqua level moderation jobs. Requires INTERNAL_MODERATOR or EXTERNAL_MODERATOR platform roles.
   * - COMMUNITY for the community level moderation jobs. Requires INTERNAL_MODERATOR or EXTERNAL_MODERATOR platform roles when
   * fandomId is not set or ADMIN community role when fandomId is set.
   * - ESCALATIONS for the Escalation level moderation jobs. Requires INTERNAL_MODERATOR platform role.
   *
   * If you want jobs from multiple queues the only valid queue combination is: [AAQUA, COMMUNITY] for job listings
   * and [AAQUA, ESCALATIONS] for counters. We DO NOT allow arbitrary combinations to avoid proliferation of
   * indexes caused by these combinations
   */
  queues?: InputMaybe<Array<Scalars['String']>>;
  /** Reason indicated by members when reporting content, should match [A-Z_]{1,40} */
  reportReason?: InputMaybe<Scalars['String']>;
  /** Violation identified by moderator when deciding to take content down, should match [A-Z_]{1,40} */
  violationType?: InputMaybe<Scalars['String']>;
};

export type ModerationNotification = InboxNotification & {
  __typename?: 'ModerationNotification';
  acknowledged: Scalars['Boolean'];
  composition?: Maybe<InboxComposition>;
  fandom?: Maybe<Fandom>;
  feedItem?: Maybe<InboxFeedItem>;
  id: Scalars['String'];
  inReplyTo?: Maybe<InboxComposition>;
  moderatedByAaqua: Scalars['Boolean'];
  read: Scalars['Boolean'];
  time: Scalars['String'];
};

export enum ModerationStatus {
  /** The moderation job doesn't exist yet but will be created if a moderator reviews it. */
  None = 'NONE',
  /** The moderation job is waiting to be reviewed by a moderator. The moderation job is in one of the moderation queues. */
  Pending = 'PENDING',
  /** The moderation job has been reviewed by a moderator. The moderation job is in the history. */
  Reviewed = 'REVIEWED'
}

export type ModerationStatusPayload = {
  __typename?: 'ModerationStatusPayload';
  moderationStatus?: Maybe<ModerationStatus>;
  visibility?: Maybe<EntityVisibility>;
};

export enum ModeratorType {
  /** The Aaqua moderators trained to deal with all types of content. */
  Aaqua = 'AAQUA',
  /** The community moderators. */
  Community = 'COMMUNITY'
}

export type Mutation = {
  __typename?: 'Mutation';
  acceptFriendRequest?: Maybe<AcceptFriendRequestPayload>;
  acceptJoinHiddenFandom?: Maybe<AcceptJoinHiddenFandomPayload>;
  acknowledgeInboxNotifications: AcknowledgeInboxNotificationsPayload;
  addFandomAdmin?: Maybe<AddFandomAdminPayload>;
  addPlatformMemberRole?: Maybe<AddPlatformMemberRolePayload>;
  /**
   * Lets a user appeal a decision made by a moderator regarding some content.
   * The user can be one of the one having reported this content to moderation or he can be the creator of said content.
   */
  appealModerationJob?: Maybe<AppealModerationJobPayload>;
  approveJoinPrivateFandom?: Maybe<ApproveJoinPrivateFandomPayload>;
  archiveQuestion?: Maybe<LivestreamQuestionPayload>;
  /** Livestream Questions */
  askQuestion?: Maybe<LivestreamQuestionPayload>;
  cancelJoinHiddenFandom?: Maybe<CancelJoinHiddenFandomPayload>;
  cancelJoinPrivateFandom?: Maybe<CancelJoinPrivateFandomPayload>;
  castVote: CastVotePayload;
  /** Change the moderation status of the moderation job associated to an entity (Post, Poll, Event, Comment). */
  changeModerationStatus?: Maybe<ModerationStatusPayload>;
  connectEventChat: ConnectEventChatPayload;
  /** @deprecated Field no longer supported */
  connectFandomChat: ConnectFandomChatPayload;
  /** Create campaign */
  createCampaign?: Maybe<CreateCampaignPayload>;
  createComment: CreateCommentPayload;
  createEvent: CreateEventPayload;
  createFandom?: Maybe<CreateFandomPayload>;
  createFriendRequest?: Maybe<CreateFriendRequestPayload>;
  createLikeReaction: CreateLikeReactionPayload;
  createPoll: CreatePollPayload;
  createPost: CreatePostPayload;
  /**
   * Creates a new product. Products come in two types:
   * - SINGLE: A product with a single variant
   * - MULTI: A product with multiple variants
   *
   * see `CreateProductInput` for more info
   */
  createProduct: CreateProductPayload;
  createStore: CreateStorePayload;
  createVariant: CreateVariantPayload;
  /** Delete campaign */
  deleteCampaign?: Maybe<DeleteCampaignPayload>;
  deleteComment: DeleteCommentPayload;
  deleteEvent: DeleteEventPayload;
  deleteFriendship?: Maybe<DeleteFriendshipPayload>;
  /** @deprecated use unlikeReaction instead */
  deleteLikeReaction: DeleteLikeReactionPayload;
  deletePoll: DeletePollPayload;
  deletePost: DeletePostPayload;
  deleteProduct: DeleteProductPayload;
  deleteUser?: Maybe<DeleteUserPayload>;
  deleteVariant: DeleteVariantPayload;
  /** @deprecated Field no longer supported */
  endFandomChat: EndFandomChatPayload;
  /** Escalate moderation job to a higher level moderator */
  escalateModerationJob?: Maybe<EscalateModerationJobPayload>;
  generateFandomLink: GenerateFandomLinkPayload;
  generateInviteLink: GenerateInviteLinkPayload;
  inviteJoinHiddenFandom?: Maybe<InviteJoinHiddenFandomPayload>;
  joinChat: JoinChatPayload;
  /** WATCHER */
  joinLivestream?: Maybe<JoinLivestreamPayload>;
  joinPublicFandom?: Maybe<JoinPublicFandomPayload>;
  leaveFandom?: Maybe<LeaveFandomPayload>;
  leaveLivestream?: Maybe<LeaveLivestreamPayload>;
  likeQuestion?: Maybe<LivestreamQuestionPayload>;
  loadTestLivestreamQuestions?: Maybe<LivestreamTestDataPayload>;
  /** test data mutations */
  loadTestLivestreamViewers?: Maybe<LivestreamTestDataPayload>;
  /** @deprecated Field no longer supported */
  markInboxNotificationsAsRead: MarkInboxNotificationsAsReadResult;
  markInboxNotificationsAsSeen: MarkInboxNotificationsAsSeenPayload;
  pinContent: PinContentPayload;
  registerPushNotificationToken: RegisterPushNotificationTokenPayload;
  rejectFriendRequest?: Maybe<RejectFriendRequestPayload>;
  rejectJoinHiddenFandom?: Maybe<RejectJoinHiddenFandomPayload>;
  rejectJoinPrivateFandom?: Maybe<RejectJoinPrivateFandomPayload>;
  removeFandomAdmin?: Maybe<RemoveFandomAdminPayload>;
  removeFandomMember?: Maybe<RemoveFandomMemberPayload>;
  removePlatformMemberRole?: Maybe<RemovePlatformMemberRolePayload>;
  removeQuestion?: Maybe<LivestreamQuestionPayload>;
  replyEvent: UserEventResponsePayload;
  /** Report a user created content (post, comment,...) to be reviewed by the moderators when some threshold is reached. */
  reportEntityByMember?: Maybe<ReportEntityByMemberPayload>;
  /** Report a user to be displayed to an Aaqua admin for review. */
  reportUser?: Maybe<ReportUserPayload>;
  requestJoinPrivateFandom?: Maybe<RequestJoinPrivateFandomPayload>;
  /** Reset a user's profile. The action can't be undone. Transition the associated moderation job to the reviewed moderation status. */
  resetUserProfile?: Maybe<ResetUserProfilePayload>;
  /** Provide feedback for AI-detected labels for content units (individual media or texts) */
  reviewAiLabels?: Maybe<ReviewAiLabelsPayload>;
  /**
   * Review a moderation job associated to a user without taking any action.
   * Transition the associated moderation job to the reviewed moderation status.
   */
  reviewUserModerationJob?: Maybe<ReviewUserModerationJobPayload>;
  setInboxConfiguration: InboxConfiguration;
  shareFandom: ShareFandomPayload;
  /** @deprecated Field no longer supported */
  startFandomChat: StartFandomChatPayload;
  /**
   * HOST
   * returns the data necessary to start a livestream
   */
  startLivestream?: Maybe<StartLivestreamPayload>;
  /** @deprecated not needed anymore to start livestreamChat */
  startLivestreamChat?: Maybe<StartLivestreamChatPayload>;
  startPrivateChat: StartPrivateChatPayload;
  /** stops a user's livestream */
  stopLivestream?: Maybe<StopLivestreamPayload>;
  /**
   * Suspend a user for a period of time. The user is automatically unsuspended after the period of time.
   * Transition the associated moderation job to the reviewed moderation status.
   */
  suspendUser?: Maybe<SuspendUserPayload>;
  undoFriendRequest?: Maybe<UndoFriendshipRequestPayload>;
  unlikeQuestion?: Maybe<LivestreamQuestionPayload>;
  unlikeReaction: UnlikeReactionPayload;
  unpinContent: UnpinContentPayload;
  unregisterPushNotificationToken: UnregisterPushNotificationTokenPayload;
  /** Update campaign */
  updateCampaign?: Maybe<UpdateCampaignPayload>;
  updateComment: UpdateCommentPayload;
  updateEvent: UpdateEventPayload;
  updateEventPartial: UpdateEventPartialPayload;
  updateFandom?: Maybe<UpdateFandomPayload>;
  updatePost: UpdatePostPayload;
  updateProduct: UpdateProductPayload;
  updateProductStatus: UpdateProductPayload;
  updateStore: UpdateStorePayload;
  updateUserProfile?: Maybe<UpdateUserProfilePayload>;
  updateVariant: UpdateVariantPayload;
  updateVariantLabel: UpdateVariantPayload;
  uploadImage: UploadImage;
  uploadVideo: UploadVideoPayload;
  /** @deprecated use uploadVideo instead */
  videoPreSignedUploadUrl?: Maybe<PreSignedUrl>;
};


export type MutationAcceptFriendRequestArgs = {
  input: AcceptFriendRequestInput;
};


export type MutationAcceptJoinHiddenFandomArgs = {
  input: AcceptJoinHiddenFandomInput;
};


export type MutationAcknowledgeInboxNotificationsArgs = {
  input: AcknowledgeInboxNotificationsInput;
};


export type MutationAddFandomAdminArgs = {
  input: AddFandomAdminInput;
};


export type MutationAddPlatformMemberRoleArgs = {
  input: AddPlatformMemberRoleInput;
};


export type MutationAppealModerationJobArgs = {
  input: AppealModerationJobInput;
};


export type MutationApproveJoinPrivateFandomArgs = {
  input: ApproveJoinPrivateFandomInput;
};


export type MutationArchiveQuestionArgs = {
  input: QuestionIdInput;
};


export type MutationAskQuestionArgs = {
  input: LivestreamQuestionInput;
};


export type MutationCancelJoinHiddenFandomArgs = {
  input: CancelJoinHiddenFandomInput;
};


export type MutationCancelJoinPrivateFandomArgs = {
  input: CancelJoinPrivateFandomInput;
};


export type MutationCastVoteArgs = {
  input: CastVoteInput;
};


export type MutationChangeModerationStatusArgs = {
  input: ChangeModerationStatusInput;
};


export type MutationConnectEventChatArgs = {
  input: ConnectEventChatInput;
};


export type MutationCreateCampaignArgs = {
  input: CreateCampaignInput;
};


export type MutationCreateCommentArgs = {
  input: CreateCommentInput;
};


export type MutationCreateEventArgs = {
  input: CreateEventInput;
};


export type MutationCreateFandomArgs = {
  input: CreateFandomInput;
};


export type MutationCreateFriendRequestArgs = {
  input: CreateFriendRequestInput;
};


export type MutationCreateLikeReactionArgs = {
  input: CreateLikeReactionInput;
};


export type MutationCreatePollArgs = {
  input: CreatePollInput;
};


export type MutationCreatePostArgs = {
  input: CreatePostInput;
};


export type MutationCreateProductArgs = {
  input: CreateProductInput;
};


export type MutationCreateStoreArgs = {
  input: CreateStoreInput;
};


export type MutationCreateVariantArgs = {
  input: CreateVariantInput;
};


export type MutationDeleteCampaignArgs = {
  input: DeleteCampaignInput;
};


export type MutationDeleteCommentArgs = {
  input: DeleteCommentInput;
};


export type MutationDeleteEventArgs = {
  input: DeleteEventInput;
};


export type MutationDeleteFriendshipArgs = {
  input: DeleteFriendshipInput;
};


export type MutationDeleteLikeReactionArgs = {
  input: DeleteLikeReactionInput;
};


export type MutationDeletePollArgs = {
  input: DeletePollInput;
};


export type MutationDeletePostArgs = {
  input: DeletePostInput;
};


export type MutationDeleteProductArgs = {
  input: DeleteProductInput;
};


export type MutationDeleteUserArgs = {
  input: DeleteUserInput;
};


export type MutationDeleteVariantArgs = {
  input: DeleteVariantInput;
};


export type MutationEndFandomChatArgs = {
  input: EndFandomChatInput;
};


export type MutationEscalateModerationJobArgs = {
  input: EscalateModerationJobInput;
};


export type MutationGenerateFandomLinkArgs = {
  input: GenerateFandomLinkInput;
};


export type MutationGenerateInviteLinkArgs = {
  input: GenerateInviteLinkInput;
};


export type MutationInviteJoinHiddenFandomArgs = {
  input: InviteJoinHiddenFandomInput;
};


export type MutationJoinChatArgs = {
  input: JoinChatInput;
};


export type MutationJoinLivestreamArgs = {
  input: JoinLivestreamInput;
};


export type MutationJoinPublicFandomArgs = {
  input: JoinPublicFandomInput;
};


export type MutationLeaveFandomArgs = {
  input: LeaveFandomInput;
};


export type MutationLeaveLivestreamArgs = {
  input: LeaveLivestreamInput;
};


export type MutationLikeQuestionArgs = {
  input: LivestreamQuestionLikeInput;
};


export type MutationLoadTestLivestreamQuestionsArgs = {
  input: LivestreamTestDataInput;
};


export type MutationLoadTestLivestreamViewersArgs = {
  input: LivestreamTestDataInput;
};


export type MutationMarkInboxNotificationsAsReadArgs = {
  input: MarkInboxNotificationsAsReadInput;
};


export type MutationMarkInboxNotificationsAsSeenArgs = {
  input: MarkInboxNotificationsAsSeenInput;
};


export type MutationPinContentArgs = {
  input: PinContentInput;
};


export type MutationRegisterPushNotificationTokenArgs = {
  input: RegisterPushNotificationTokenInput;
};


export type MutationRejectFriendRequestArgs = {
  input: RejectFriendRequestInput;
};


export type MutationRejectJoinHiddenFandomArgs = {
  input: RejectJoinHiddenFandomInput;
};


export type MutationRejectJoinPrivateFandomArgs = {
  input: RejectJoinPrivateFandomInput;
};


export type MutationRemoveFandomAdminArgs = {
  input: RemoveFandomAdminInput;
};


export type MutationRemoveFandomMemberArgs = {
  input: RemoveFandomMemberInput;
};


export type MutationRemovePlatformMemberRoleArgs = {
  input: RemovePlatformMemberRoleInput;
};


export type MutationRemoveQuestionArgs = {
  input: QuestionIdInput;
};


export type MutationReplyEventArgs = {
  input: UserEventResponseInput;
};


export type MutationReportEntityByMemberArgs = {
  input: ReportEntityByMemberInput;
};


export type MutationReportUserArgs = {
  input: ReportUserInput;
};


export type MutationRequestJoinPrivateFandomArgs = {
  input: RequestJoinPrivateFandomInput;
};


export type MutationResetUserProfileArgs = {
  input: ResetUserProfileInput;
};


export type MutationReviewAiLabelsArgs = {
  input: ReviewAiLabelsInput;
};


export type MutationReviewUserModerationJobArgs = {
  input: ReviewUserModerationJobInput;
};


export type MutationSetInboxConfigurationArgs = {
  input: InboxConfigurationInput;
};


export type MutationShareFandomArgs = {
  input: ShareFandomInput;
};


export type MutationStartFandomChatArgs = {
  input: StartFandomChatInput;
};


export type MutationStartLivestreamArgs = {
  input: StartLivestreamInput;
};


export type MutationStartLivestreamChatArgs = {
  input: StartLivestreamChatInput;
};


export type MutationStartPrivateChatArgs = {
  input: StartPrivateChatInput;
};


export type MutationStopLivestreamArgs = {
  input: StopLivestreamInput;
};


export type MutationSuspendUserArgs = {
  input: SuspendUserInput;
};


export type MutationUndoFriendRequestArgs = {
  input: UndoFriendshipRequestInput;
};


export type MutationUnlikeQuestionArgs = {
  input: LivestreamQuestionLikeInput;
};


export type MutationUnlikeReactionArgs = {
  input: UnlikeReactionInput;
};


export type MutationUnpinContentArgs = {
  input: UnpinContentInput;
};


export type MutationUnregisterPushNotificationTokenArgs = {
  input: UnregisterPushNotificationTokenInput;
};


export type MutationUpdateCampaignArgs = {
  input: UpdateCampaignInput;
};


export type MutationUpdateCommentArgs = {
  input: UpdateCommentInput;
};


export type MutationUpdateEventArgs = {
  input: UpdateEventInput;
};


export type MutationUpdateEventPartialArgs = {
  input: UpdateEventPartialInput;
};


export type MutationUpdateFandomArgs = {
  input: UpdateFandomInput;
};


export type MutationUpdatePostArgs = {
  input: UpdatePostInput;
};


export type MutationUpdateProductArgs = {
  input: UpdateProductInput;
};


export type MutationUpdateProductStatusArgs = {
  input: UpdateProductStatusInput;
};


export type MutationUpdateStoreArgs = {
  input: UpdateStoreInput;
};


export type MutationUpdateUserProfileArgs = {
  input: UpdateUserProfileInput;
};


export type MutationUpdateVariantArgs = {
  input: UpdateVariantInput;
};


export type MutationUpdateVariantLabelArgs = {
  input: UpdateVariantLabelInput;
};


export type MutationUploadImageArgs = {
  input: UploadImageInput;
};


export type MutationUploadVideoArgs = {
  input: VideoUploadInput;
};


export type MutationVideoPreSignedUploadUrlArgs = {
  input?: InputMaybe<UploadVideoInput>;
};

export type MutedFandoms = {
  __typename?: 'MutedFandoms';
  mutedFandomIds: Array<Maybe<Scalars['String']>>;
};

export type MutedFandomsInput = {
  mutedFandomIds: Array<InputMaybe<Scalars['String']>>;
};

export type MyFandomSearchConnection = {
  __typename?: 'MyFandomSearchConnection';
  edges: Array<MyFandomSearchEdge>;
  pageInfo: PageInfo;
};

export type MyFandomSearchEdge = {
  __typename?: 'MyFandomSearchEdge';
  cursor: Scalars['String'];
  node?: Maybe<Fandom>;
};

export type NewFriendNotification = InboxNotification & {
  __typename?: 'NewFriendNotification';
  acknowledged: Scalars['Boolean'];
  friend?: Maybe<User>;
  id: Scalars['String'];
  read: Scalars['Boolean'];
  time: Scalars['String'];
};

export type NotifyOn = {
  __typename?: 'NotifyOn';
  administrator: Administrator;
  mutedFandoms: MutedFandoms;
  personal: Personal;
};

export type NotifyOnInput = {
  administrator: AdministratorInput;
  mutedFandoms: MutedFandomsInput;
  personal: PersonalInput;
};

/** ONLINE SEGMENTS */
export enum OnlineSegment {
  DieHardFan = 'DIE_HARD_FAN',
  Explorer = 'EXPLORER',
  FakeFan = 'FAKE_FAN',
  Lurker = 'LURKER',
  Newbie = 'NEWBIE',
  RegularFan = 'REGULAR_FAN',
  SocialFan = 'SOCIAL_FAN',
  Soloist = 'SOLOIST',
  SuperFan = 'SUPER_FAN',
  TagAlong = 'TAG_ALONG'
}

export type OnlineSegmentAudienceFilter = {
  __typename?: 'OnlineSegmentAudienceFilter';
  onlineSegments: Array<Maybe<OnlineSegment>>;
};

export type OnlineSegmentAudienceFilterInput = {
  onlineSegments: Array<InputMaybe<OnlineSegment>>;
};

export type PageInfo = {
  __typename?: 'PageInfo';
  endCursor: Scalars['String'];
  hasNextPage: Scalars['Boolean'];
  hasPreviousPage: Scalars['Boolean'];
  startCursor: Scalars['String'];
};

/** # Shared types - Must match other services. */
export type PaginationInput = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
};

export type ParentInput = {
  id: Scalars['String'];
  parentType: ParentType;
};

export enum ParentType {
  Comment = 'COMMENT',
  Event = 'EVENT',
  Poll = 'POLL',
  Post = 'POST'
}

export type Personal = {
  __typename?: 'Personal';
  comments: Scalars['Boolean'];
  friends: Scalars['Boolean'];
  likes: Scalars['Boolean'];
  mentions: Scalars['Boolean'];
  shares: Scalars['Boolean'];
};

export type PersonalInput = {
  comments: Scalars['Boolean'];
  friends: Scalars['Boolean'];
  likes: Scalars['Boolean'];
  mentions: Scalars['Boolean'];
  shares: Scalars['Boolean'];
};

export type PinContentInput = {
  contentId: Scalars['String'];
};

export type PinContentPayload = {
  __typename?: 'PinContentPayload';
  content?: Maybe<PinnedContent>;
};

export type PinnedContent = Event | Poll | Post;

export type PinnedFeedItemInformation = {
  __typename?: 'PinnedFeedItemInformation';
  source?: Maybe<FeedItemSourceType>;
};

export enum PlatformMemberRole {
  Administrator = 'ADMINISTRATOR',
  ExternalModerator = 'EXTERNAL_MODERATOR',
  InternalModerator = 'INTERNAL_MODERATOR',
  Member = 'MEMBER'
}

export type Poll = {
  __typename?: 'Poll';
  aiLabels?: Maybe<Array<AiLabel>>;
  closed?: Maybe<Scalars['Boolean']>;
  comments?: Maybe<CommentConnection>;
  createdAt: Scalars['DateTime'];
  endTime: Scalars['DateTime'];
  fandom?: Maybe<Fandom>;
  fandomMembership?: Maybe<FandomMember>;
  hasVoted: Scalars['Boolean'];
  id: Scalars['String'];
  initialDuration: Scalars['Duration'];
  interactions: PollInteractions;
  isPinned?: Maybe<Scalars['Boolean']>;
  likeReaction?: Maybe<LikeReaction>;
  options: Array<PollOption>;
  question: Scalars['String'];
  remainingDuration: Scalars['Duration'];
  user?: Maybe<User>;
  visibleAt: Scalars['DateTime'];
};


export type PollCommentsArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  filter?: InputMaybe<CommentFilterType>;
  first?: InputMaybe<Scalars['Int']>;
  inclusive?: InputMaybe<Scalars['Boolean']>;
  last?: InputMaybe<Scalars['Int']>;
};

export type PollInteractions = {
  __typename?: 'PollInteractions';
  totalVotes: Scalars['Int'];
};

export type PollModerationInfo = {
  __typename?: 'PollModerationInfo';
  poll?: Maybe<Poll>;
  visibility?: Maybe<EntityVisibility>;
};

export type PollOption = {
  __typename?: 'PollOption';
  id: Scalars['String'];
  optionName: Scalars['String'];
  percentage: Scalars['Int'];
  votedFor: Scalars['Boolean'];
  votes: Scalars['Int'];
};

export type Post = {
  __typename?: 'Post';
  aiLabels?: Maybe<Array<AiLabel>>;
  attachments: Array<Maybe<PostAttachment>>;
  comments?: Maybe<CommentConnection>;
  content?: Maybe<Scalars['String']>;
  createdAt: Scalars['DateTime'];
  fandom?: Maybe<Fandom>;
  fandomMembership?: Maybe<FandomMember>;
  id: Scalars['String'];
  isPinned?: Maybe<Scalars['Boolean']>;
  likeReaction?: Maybe<LikeReaction>;
  status: PostStatus;
  title?: Maybe<Scalars['String']>;
  type: PostType;
  updatedAt?: Maybe<Scalars['DateTime']>;
  user?: Maybe<User>;
  visibleAt: Scalars['DateTime'];
};


export type PostCommentsArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  filter?: InputMaybe<CommentFilterType>;
  first?: InputMaybe<Scalars['Int']>;
  inclusive?: InputMaybe<Scalars['Boolean']>;
  last?: InputMaybe<Scalars['Int']>;
};

export type PostAttachment = Image | Video;

export type PostModerationInfo = {
  __typename?: 'PostModerationInfo';
  post?: Maybe<Post>;
  visibility?: Maybe<EntityVisibility>;
};

export type PostSearchConnection = {
  __typename?: 'PostSearchConnection';
  edges: Array<PostSearchEdge>;
  pageInfo: PageInfo;
};

export type PostSearchEdge = {
  __typename?: 'PostSearchEdge';
  cursor: Scalars['String'];
  node?: Maybe<Post>;
};

export type PostSearchWithFilterConnection = {
  __typename?: 'PostSearchWithFilterConnection';
  edges: Array<PostSearchWithFilterEdge>;
  pageInfo: PageInfo;
};

export type PostSearchWithFilterEdge = {
  __typename?: 'PostSearchWithFilterEdge';
  cursor: Scalars['String'];
  node?: Maybe<Post>;
};

export enum PostStatus {
  Failed = 'FAILED',
  Online = 'ONLINE',
  Processing = 'PROCESSING'
}

export enum PostType {
  Freemium = 'FREEMIUM',
  Targeted = 'TARGETED'
}

export type PreSignedUrl = {
  __typename?: 'PreSignedUrl';
  id: Scalars['String'];
  url: Scalars['String'];
};

export type PrivateChat = {
  __typename?: 'PrivateChat';
  channel: ChatChannel;
  status: ChatStatus;
  title: Scalars['String'];
};

export type Product = {
  __typename?: 'Product';
  createdAt: Scalars['DateTime'];
  creator?: Maybe<User>;
  description: Scalars['String'];
  id: Scalars['String'];
  image?: Maybe<Image>;
  name: Scalars['String'];
  productType: ProductType;
  status: ProductStatus;
  updatedAt: Scalars['DateTime'];
  updater?: Maybe<User>;
  variantAttributeSummary: Array<AttributeSummaryItem>;
  variants: Array<Variant>;
};

export type ProductConnection = {
  __typename?: 'ProductConnection';
  edges: Array<Maybe<ProductEdge>>;
  pageInfo: PageInfo;
};

export type ProductEdge = {
  __typename?: 'ProductEdge';
  cursor?: Maybe<Scalars['String']>;
  node: Product;
};

export enum ProductStatus {
  Published = 'PUBLISHED',
  Unpublished = 'UNPUBLISHED'
}

export enum ProductType {
  Multi = 'MULTI',
  Single = 'SINGLE'
}

export enum ProfileVisibility {
  Friends = 'FRIENDS',
  Private = 'PRIVATE',
  Public = 'PUBLIC'
}

export type QualityContent = {
  __typename?: 'QualityContent';
  catalyst: Scalars['String'];
  dailyChange: Scalars['String'];
  score: Scalars['String'];
  temporality: Scalars['String'];
  thumbStopping: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  /** Get reputation scores for each of user's fandoms. @since v2 */
  allFandomMemberReputations: FandomMemberReputationConnectionV2;
  /**
   * Get badges collected and uncollected by user.
   *
   * If `badgeType` is not specified, retrieves all badges
   * If `badgeType` is COMMUNITY, `fandomId` should be specified
   * If `badgeType` is GLOBAL, `fandomId` will be ignored
   */
  badges: BadgeConnection;
  /** Get Campaign for id */
  campaign?: Maybe<Campaign>;
  /** Get Campaigns for fandom */
  campaignsForFandom?: Maybe<CampaignConnection>;
  chatByEventId?: Maybe<EventChat>;
  chatByFandomId?: Maybe<FandomChat>;
  chatByLivestreamId?: Maybe<LivestreamChat>;
  chatToken?: Maybe<ChatToken>;
  comment?: Maybe<Comment>;
  /** Get community admin feeds */
  communityAdminFeed?: Maybe<FeedItemConnection>;
  /** Get community feeds */
  communityFeed?: Maybe<FeedItemConnection>;
  event?: Maybe<Event>;
  /** Get event feed */
  eventFeed?: Maybe<FeedItemConnection>;
  /** Get explore feed */
  exploreFeed?: Maybe<HighlightsFromCommunityConnection>;
  fandom?: Maybe<Fandom>;
  fandomByHandle?: Maybe<Fandom>;
  /**
   * Get member reputation score for a fandom member on a specific date
   * @deprecated use v2 queries
   */
  fandomMemberReputation?: Maybe<FandomMemberReputation>;
  /**
   * Get historical fandom member reputation score
   * @deprecated use v2 queries
   */
  fandomMemberReputationHistory?: Maybe<FandomMemberReputationConnection>;
  /** Get reputation for a user and fandom at a specific date. @since v2 */
  fandomMemberReputationV2?: Maybe<FandomMemberReputationV2>;
  /**
   * Get fandom reputation score on a specific date
   * @deprecated use v2 queries
   */
  fandomReputation?: Maybe<FandomReputation>;
  /**
   * Get historical fandom reputation score
   * @deprecated use v2 queries
   */
  fandomReputationHistory?: Maybe<FandomReputationConnection>;
  /** @deprecated Deprecated from api v7. Theme functionality removed in app build 1.31.0 */
  fandomThemesList: Array<FandomTheme>;
  /**
   *  This directive should be moved to the PaginationInput argument and uncommented when this isn't supported in the spec.
   *  cf. https://github.com/graphql/graphql-spec/pull/805
   * @deprecated(reason: "deprecated argument PaginationInput from v6, use unpacked arguments instead")
   */
  fandoms?: Maybe<FandomConnection>;
  friendsOfUser: UserConnection;
  /** Get home feed */
  homeFeedHighlights?: Maybe<HighlightsFromCommunityConnection>;
  homeFeedSections?: Maybe<HomeFeedSectionConnection>;
  image?: Maybe<Image>;
  inbox: InboxNotificationConnection;
  inboxConfiguration: InboxConfiguration;
  livestreamByAuthenticatedUser?: Maybe<LivestreamByAuthenticatedUser>;
  livestreamByFandomId?: Maybe<Livestream>;
  livestreamById?: Maybe<Livestream>;
  livestreamByUserId?: Maybe<Livestream>;
  /** @deprecated there was no connection layer; use livestreamQuestionsPaged */
  livestreamQuestions?: Maybe<LivestreamQuestions>;
  livestreamQuestionsConnection?: Maybe<LivestreamQuestionsConnection>;
  livestreamTopQuestions?: Maybe<LivestreamQuestions>;
  livestreamViewers?: Maybe<LivestreamViewerConnection>;
  livestreams?: Maybe<LivestreamConnection>;
  memberInviteLink?: Maybe<MemberInviteLink>;
  /** Get appeal info of the entity */
  moderationAppealInfo?: Maybe<ModerationAppealInfo>;
  /** Get number of pending moderation jobs */
  moderationCounters?: Maybe<ModerationCountersPayload>;
  /** Get latest moderation job for the given entity */
  moderationJobByEntityId?: Maybe<ModerationJob>;
  /** Get the list of reported entities to moderate by Aaqua */
  moderationJobs?: Maybe<ModerationJobsConnection>;
  /**
   * Get the number of moderation job corresponding to a filter
   * If the count is greater than 99 returns '99+'
   */
  moderationJobsCount: Scalars['String'];
  /** Get approximate number of pending and reviewed moderation jobs */
  moderationJobsCounters?: Maybe<ModerationJobsCountersPayload>;
  poll?: Maybe<Poll>;
  post?: Maybe<Post>;
  /** Get a product by id */
  product?: Maybe<Product>;
  /** Get all product variants of a store */
  productVariants?: Maybe<VariantConnection>;
  /** Get all products of a store */
  products: ProductConnection;
  profile?: Maybe<User>;
  /** Get profile/user feeds */
  profileFeed?: Maybe<FeedItemConnection>;
  reactableLikeReactions?: Maybe<ReactionConnection>;
  /** For a given job: Additional text notes that were provided by users when reporting the entity */
  reportNotes?: Maybe<ReportNoteConnection>;
  /** For a given job: Get the list of reporters appeal notes */
  reporterAppealNotes?: Maybe<AppealNoteConnection>;
  searchContent: ContentSearchConnection;
  searchFandoms: FandomSearchConnection;
  searchMyFandoms: MyFandomSearchConnection;
  searchPosts: PostSearchConnection;
  searchPostsWithFilter: PostSearchWithFilterConnection;
  searchUsers: UserSearchConnection;
  /** Get a store by fandomId */
  storeByFandom?: Maybe<StorePayload>;
  suggestFandoms: FandomSuggestionConnection;
  suggestUsers: UserSuggestionConnection;
  userByHandle?: Maybe<User>;
  userLikeReactions?: Maybe<ReactionConnection>;
  video?: Maybe<Video>;
  wallet?: Maybe<Wallet>;
  walletByDate?: Maybe<WalletByDate>;
  walletByDates?: Maybe<WalletByDateConnection>;
  walletByFandoms?: Maybe<WalletByFandomConnection>;
  walletTransactions?: Maybe<WalletTransactionConnection>;
};


export type QueryAllFandomMemberReputationsArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  input: AllFandomMemberReputationsInput;
  last?: InputMaybe<Scalars['Int']>;
};


export type QueryBadgesArgs = {
  after?: InputMaybe<Scalars['String']>;
  badgeAwardStatus?: InputMaybe<BadgeAwardStatus>;
  badgeType?: InputMaybe<BadgeType>;
  before?: InputMaybe<Scalars['String']>;
  fandomId?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  userId: Scalars['String'];
};


export type QueryCampaignArgs = {
  id: Scalars['String'];
};


export type QueryCampaignsForFandomArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  fandomId: Scalars['String'];
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  type?: InputMaybe<CampaignType>;
};


export type QueryChatByEventIdArgs = {
  eventId: Scalars['String'];
};


export type QueryChatByFandomIdArgs = {
  fandomId: Scalars['String'];
};


export type QueryChatByLivestreamIdArgs = {
  livestreamId: Scalars['String'];
};


export type QueryCommentArgs = {
  commentId: Scalars['String'];
};


export type QueryCommunityAdminFeedArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  fandomId: Scalars['String'];
  filter: FeedFilter;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
};


export type QueryCommunityFeedArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  fandomId: Scalars['String'];
  filter: FeedFilter;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
};


export type QueryEventArgs = {
  id: Scalars['String'];
};


export type QueryEventFeedArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  fandomId: Scalars['String'];
  filter: FeedFilter;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
};


export type QueryExploreFeedArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  filter: FeedFilter;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
};


export type QueryFandomArgs = {
  fandomId: Scalars['String'];
};


export type QueryFandomByHandleArgs = {
  handle: Scalars['String'];
};


export type QueryFandomMemberReputationArgs = {
  input: FandomMemberReputationInput;
};


export type QueryFandomMemberReputationHistoryArgs = {
  input: FandomMemberReputationHistoryInput;
};


export type QueryFandomMemberReputationV2Args = {
  input: FandomMemberReputationInput;
};


export type QueryFandomReputationArgs = {
  input: FandomReputationInput;
};


export type QueryFandomReputationHistoryArgs = {
  input: FandomReputationHistoryInput;
};


export type QueryFandomsArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  pagination?: InputMaybe<PaginationInput>;
};


export type QueryFriendsOfUserArgs = {
  after?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  userId: Scalars['String'];
};


export type QueryHomeFeedHighlightsArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  filter: FeedFilter;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
};


export type QueryHomeFeedSectionsArgs = {
  filter: HomeFeedSectionsFilter;
};


export type QueryImageArgs = {
  id: Scalars['String'];
};


export type QueryInboxArgs = {
  after?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
};


export type QueryLivestreamByFandomIdArgs = {
  fandomId?: InputMaybe<Scalars['String']>;
};


export type QueryLivestreamByIdArgs = {
  id?: InputMaybe<Scalars['String']>;
};


export type QueryLivestreamByUserIdArgs = {
  userId?: InputMaybe<Scalars['String']>;
};


export type QueryLivestreamQuestionsArgs = {
  after?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  livestreamId: Scalars['String'];
};


export type QueryLivestreamQuestionsConnectionArgs = {
  after?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  livestreamId: Scalars['String'];
};


export type QueryLivestreamTopQuestionsArgs = {
  livestreamId: Scalars['String'];
};


export type QueryLivestreamViewersArgs = {
  after?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  livestreamId?: InputMaybe<Scalars['String']>;
};


export type QueryLivestreamsArgs = {
  after?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
};


export type QueryMemberInviteLinkArgs = {
  source?: InputMaybe<Scalars['String']>;
};


export type QueryModerationAppealInfoArgs = {
  input: ModerationAppealInfoInput;
};


export type QueryModerationCountersArgs = {
  filter: ModerationCountersFilter;
};


export type QueryModerationJobByEntityIdArgs = {
  entityId: Scalars['String'];
};


export type QueryModerationJobsArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  filter?: InputMaybe<ModerationJobsFilter>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
};


export type QueryModerationJobsCountArgs = {
  filter?: InputMaybe<ModerationJobsFilter>;
};


export type QueryPollArgs = {
  id: Scalars['String'];
};


export type QueryPostArgs = {
  id: Scalars['String'];
};


export type QueryProductArgs = {
  id: Scalars['String'];
};


export type QueryProductVariantsArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  storeId: Scalars['String'];
};


export type QueryProductsArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  storeId: Scalars['String'];
};


export type QueryProfileArgs = {
  userId?: InputMaybe<Scalars['String']>;
};


export type QueryProfileFeedArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  filter: FeedFilter;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  userId: Scalars['String'];
};


export type QueryReactableLikeReactionsArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  reactableId: Scalars['String'];
  reactableType: ReactableType;
};


export type QueryReportNotesArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  jobId: Scalars['String'];
  last?: InputMaybe<Scalars['Int']>;
};


export type QueryReporterAppealNotesArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  jobId: Scalars['String'];
  last?: InputMaybe<Scalars['Int']>;
};


export type QuerySearchContentArgs = {
  after?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  term: Scalars['String'];
};


export type QuerySearchFandomsArgs = {
  after?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  term: Scalars['String'];
};


export type QuerySearchMyFandomsArgs = {
  admin_only?: InputMaybe<Scalars['Boolean']>;
  after?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  term?: InputMaybe<Scalars['String']>;
};


export type QuerySearchPostsArgs = {
  after?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  term: Scalars['String'];
};


export type QuerySearchPostsWithFilterArgs = {
  after?: InputMaybe<Scalars['String']>;
  endDate: Scalars['String'];
  fandomId: Scalars['String'];
  first?: InputMaybe<Scalars['Int']>;
  startDate: Scalars['String'];
};


export type QuerySearchUsersArgs = {
  after?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  term: Scalars['String'];
};


export type QueryStoreByFandomArgs = {
  fandomId: Scalars['String'];
};


export type QuerySuggestFandomsArgs = {
  after?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  term: Scalars['String'];
};


export type QuerySuggestUsersArgs = {
  after?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  term: Scalars['String'];
};


export type QueryUserByHandleArgs = {
  handle: Scalars['String'];
};


export type QueryUserLikeReactionsArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
};


export type QueryVideoArgs = {
  id: Scalars['String'];
};


export type QueryWalletArgs = {
  walletId: Scalars['String'];
};


export type QueryWalletByDateArgs = {
  date: Scalars['Date'];
  walletId: Scalars['String'];
};


export type QueryWalletByDatesArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  walletId: Scalars['String'];
};


export type QueryWalletByFandomsArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  walletId: Scalars['String'];
};


export type QueryWalletTransactionsArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  walletId: Scalars['String'];
};

export type QuestionIdInput = {
  questionId: Scalars['String'];
};

export type Reactable = Comment | Event | Poll | Post;

export enum ReactableType {
  Comment = 'COMMENT',
  Event = 'EVENT',
  Poll = 'POLL',
  Post = 'POST'
}

export type Reaction = {
  __typename?: 'Reaction';
  id: Scalars['String'];
  likeInfo?: Maybe<LikeInformation>;
  reactable?: Maybe<Reactable>;
  user?: Maybe<User>;
};

export type ReactionConnection = {
  __typename?: 'ReactionConnection';
  edges: Array<Maybe<ReactionEdge>>;
  pageInfo: PageInfo;
};

export type ReactionEdge = {
  __typename?: 'ReactionEdge';
  cursor: Scalars['String'];
  node: Reaction;
};

export type RecommendedFeedItemInformation = {
  __typename?: 'RecommendedFeedItemInformation';
  source?: Maybe<FeedItemSourceType>;
};

export type RegisterPushNotificationTokenInput = {
  /** app bundle id */
  deviceInstanceId: Scalars['String'];
  pushNotificationToken: Scalars['String'];
  source: Scalars['String'];
};

export type RegisterPushNotificationTokenPayload = {
  __typename?: 'RegisterPushNotificationTokenPayload';
  /** app bundle id */
  deviceInstanceId: Scalars['String'];
  pushNotificationToken: Scalars['String'];
  source: Scalars['String'];
};

export type RegularFeedItemInformation = {
  __typename?: 'RegularFeedItemInformation';
  source?: Maybe<FeedItemSourceType>;
};

export type RejectFriendRequestInput = {
  userId: Scalars['String'];
};

export type RejectFriendRequestPayload = {
  __typename?: 'RejectFriendRequestPayload';
  user?: Maybe<User>;
};

export type RejectJoinHiddenFandomInput = {
  fandomId: Scalars['String'];
};

export type RejectJoinHiddenFandomPayload = {
  __typename?: 'RejectJoinHiddenFandomPayload';
  fandomId?: Maybe<Scalars['String']>;
  roles?: Maybe<Array<FandomMemberRole>>;
  status?: Maybe<FandomMemberStatus>;
  user?: Maybe<User>;
};

export type RejectJoinPrivateFandomInput = {
  fandomId: Scalars['String'];
  userId: Scalars['String'];
};

export type RejectJoinPrivateFandomPayload = {
  __typename?: 'RejectJoinPrivateFandomPayload';
  member: FandomMember;
};

export type RemoveFandomAdminInput = {
  fandomId: Scalars['String'];
  userId: Scalars['String'];
};

export type RemoveFandomAdminPayload = {
  __typename?: 'RemoveFandomAdminPayload';
  member: FandomMember;
};

export type RemoveFandomMemberInput = {
  fandomId: Scalars['String'];
  userId: Scalars['String'];
};

export type RemoveFandomMemberPayload = {
  __typename?: 'RemoveFandomMemberPayload';
  member: FandomMember;
};

export type RemovePlatformMemberRoleInput = {
  roles: Array<PlatformMemberRole>;
  userId: Scalars['String'];
};

export type RemovePlatformMemberRolePayload = {
  __typename?: 'RemovePlatformMemberRolePayload';
  user?: Maybe<User>;
};

/** The counters associated to the violation reasons for reporting an entity. */
export type ReportCount = {
  __typename?: 'ReportCount';
  /** The number of violation reports made for the associated reason since the entity creation. */
  count: Scalars['Int'];
  /** The report reason the counters are associated with */
  reportReason?: Maybe<Scalars['String']>;
};

export type ReportEntityByMemberInput = {
  /** The additional notes the reporter can provide the moderators to assist in their review. */
  additionalNote?: InputMaybe<Scalars['String']>;
  /** The id of the reported user created content. */
  entityId: Scalars['String'];
  /** The type of moderator the reporter wants the content to be reviewed by. */
  moderatorType?: InputMaybe<ModeratorType>;
  /** The reason for the report to assist the moderators in their review. Must match: [A-Z_]{1,40} */
  reportReason?: InputMaybe<Scalars['String']>;
};

export type ReportEntityByMemberPayload = {
  __typename?: 'ReportEntityByMemberPayload';
  entityId?: Maybe<Scalars['String']>;
};

export type ReportInfo = {
  __typename?: 'ReportInfo';
  /** List of reports provided by AI content analysis */
  aiReports: Array<AiReport>;
  /** The number of reports per violation reason. */
  reportCounts: Array<ReportCount>;
  /** Counter of total text notes that members provided when they reported this job */
  reportNotesCount?: Maybe<Scalars['Int']>;
  /** The number of reports made by unique members (excluding reports for other jobs linked to the same entity) */
  totalReportCount: Scalars['Int'];
};

export type ReportNote = {
  __typename?: 'ReportNote';
  date: Scalars['String'];
  reportReason?: Maybe<Scalars['String']>;
  text: Scalars['String'];
  user?: Maybe<User>;
};

export type ReportNoteConnection = {
  __typename?: 'ReportNoteConnection';
  edges: Array<Maybe<ReportNoteEdge>>;
  pageInfo: PageInfo;
};

export type ReportNoteEdge = {
  __typename?: 'ReportNoteEdge';
  cursor?: Maybe<Scalars['String']>;
  node?: Maybe<ReportNote>;
};

export type ReportResponseNotification = InboxNotification & {
  __typename?: 'ReportResponseNotification';
  acknowledged: Scalars['Boolean'];
  composition?: Maybe<InboxComposition>;
  confirmed: Scalars['Boolean'];
  fandom?: Maybe<Fandom>;
  feedItem?: Maybe<InboxFeedItem>;
  id: Scalars['String'];
  inReplyTo?: Maybe<InboxComposition>;
  moderatedByAaqua: Scalars['Boolean'];
  read: Scalars['Boolean'];
  time: Scalars['String'];
};

export type ReportUserInput = {
  /** Some additional notes to provide the Aaqua admin with when reviewing the user. */
  additionalNote?: InputMaybe<Scalars['String']>;
  /** Report reason, should match [A-Z_]{1,40} */
  reportReason?: InputMaybe<Scalars['String']>;
  /** The reported user. */
  userId: Scalars['String'];
};

export type ReportUserPayload = {
  __typename?: 'ReportUserPayload';
  /** The reported user. */
  user?: Maybe<User>;
};

export type ReportersAppealInfo = {
  __typename?: 'ReportersAppealInfo';
  /** Counter of total appeals made by reporters */
  count: Scalars['Int'];
};

export type ReputationScoreAudienceFilter = {
  __typename?: 'ReputationScoreAudienceFilter';
  maxReputationScore?: Maybe<Scalars['Int']>;
  minReputationScore?: Maybe<Scalars['Int']>;
};

export type ReputationScoreAudienceFilterInput = {
  maxReputationScore?: InputMaybe<Scalars['Int']>;
  minReputationScore?: InputMaybe<Scalars['Int']>;
};

export type RequestJoinPrivateFandomInput = {
  fandomId: Scalars['String'];
};

export type RequestJoinPrivateFandomPayload = {
  __typename?: 'RequestJoinPrivateFandomPayload';
  member?: Maybe<FandomMember>;
};

export type ResetUserProfileInput = {
  /** Internal note provided by moderator to explain the decision made. */
  internalNote?: InputMaybe<Scalars['String']>;
  /** The id of the user for which the profile needs to be reset. */
  userId: Scalars['String'];
  /** Violation identified by the moderator when deciding to reset the user's profile, should match [A-Z_]{1,40} */
  violationType?: InputMaybe<Scalars['String']>;
};

/** Payload returned when a user's profile is reset. */
export type ResetUserProfilePayload = {
  __typename?: 'ResetUserProfilePayload';
  /** The reviewed moderation job associated to the user. */
  moderationJob: ModerationJob;
};

export type ReviewAiLabelsInput = {
  aiLabelsInput: Array<AiLabelsInput>;
  /** ID of the moderate-able entity (post, comment, poll, event) */
  entityId: Scalars['String'];
};

export type ReviewAiLabelsPayload = {
  __typename?: 'ReviewAiLabelsPayload';
  entityId: Scalars['String'];
};

export type ReviewUserModerationJobInput = {
  /** Internal note provided by moderator to explain the decision made. */
  internalNote?: InputMaybe<Scalars['String']>;
  /** The id of the user for which the moderation job needs to be reviewed without any action. */
  userId: Scalars['String'];
};

/** Payload returned when a moderation job associated to a user is reviewed without taking any action. */
export type ReviewUserModerationJobPayload = {
  __typename?: 'ReviewUserModerationJobPayload';
  /** The reviewed moderation job associated to the user. */
  moderationJob: ModerationJob;
};

export type RuleInput = {
  description: Scalars['String'];
  name: Scalars['String'];
};

export type ScoreComponents = {
  __typename?: 'ScoreComponents';
  mi: MeaningfulInteractions;
  qc: QualityContent;
};

export type ShareFandomInput = {
  content?: InputMaybe<Scalars['String']>;
  fandom: Scalars['String'];
  recipients: Array<Scalars['String']>;
};

export type ShareFandomPayload = {
  __typename?: 'ShareFandomPayload';
  content?: Maybe<Scalars['String']>;
  fandom?: Maybe<Fandom>;
  id: Scalars['String'];
  recipients: Array<Maybe<User>>;
};

/**
 * scalar _FieldSet
 * directive @external on FIELD_DEFINITION
 * directive @key(fields: _FieldSet!) on OBJECT | INTERFACE
 * directive @extends on OBJECT | INTERFACE
 *  FandomChat
 *  Start FandomChat
 */
export type StartFandomChatInput = {
  fandomId: Scalars['String'];
  title: Scalars['String'];
};

export type StartFandomChatPayload = {
  __typename?: 'StartFandomChatPayload';
  chat: FandomChat;
};

export type StartLivestreamChatInput = {
  fandomId: Scalars['String'];
  livestreamId: Scalars['String'];
};

export type StartLivestreamChatPayload = {
  __typename?: 'StartLivestreamChatPayload';
  chat: LivestreamChat;
};

/**
 * INPUTS
 * HOST
 */
export type StartLivestreamInput = {
  description?: InputMaybe<Scalars['String']>;
  fandomId: Scalars['String'];
  notificationsEnabled?: InputMaybe<Scalars['Boolean']>;
  thumbnailImageId: Scalars['String'];
  title: Scalars['String'];
  /** @deprecated(reason: "ignored") */
  userId?: InputMaybe<Scalars['String']>;
};

/**
 * OUTPUTS
 * HOST
 */
export type StartLivestreamPayload = {
  __typename?: 'StartLivestreamPayload';
  ingestServer?: Maybe<IngestServer>;
  livestream?: Maybe<Livestream>;
  message?: Maybe<Scalars['String']>;
  status: LivestreamMutationStatus;
};

/**
 * PrivateChat
 * Start PrivateChat
 */
export type StartPrivateChatInput = {
  context?: InputMaybe<ChatContext>;
  with: Scalars['String'];
};

export type StartPrivateChatPayload = {
  __typename?: 'StartPrivateChatPayload';
  chat: PrivateChat;
};

export type StopLivestreamInput = {
  livestreamId: Scalars['String'];
  reason?: InputMaybe<StopLivestreamReason>;
  /** @deprecated(reason: "ignored") */
  userId?: InputMaybe<Scalars['String']>;
};

export type StopLivestreamPayload = {
  __typename?: 'StopLivestreamPayload';
  message?: Maybe<Scalars['String']>;
  status: LivestreamMutationStatus;
};

export enum StopLivestreamReason {
  Other = 'OTHER',
  StreamEndedByUser = 'STREAM_ENDED_BY_USER'
}

/**
 * Store - Represents a fandom store/shop
 *
 * Not all fields are mandatory now due to backwards compatibility
 * Once shop v1 is deprecated, the following fields should be made mandatory for both `type` and `input`
 * - storeUrlTitle
 * - email
 * - contactCountryCode
 * - contactNumber
 * - currency
 */
export type Store = {
  __typename?: 'Store';
  active: Scalars['Boolean'];
  contactCountryCode?: Maybe<Scalars['String']>;
  contactNumber?: Maybe<Scalars['String']>;
  content: Scalars['String'];
  createdAt: Scalars['DateTime'];
  creator?: Maybe<User>;
  ctaImg?: Maybe<Image>;
  currency?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  fandom?: Maybe<Fandom>;
  id: Scalars['String'];
  storeUrl: Scalars['String'];
  storeUrlTitle?: Maybe<Scalars['String']>;
  tags?: Maybe<Array<Scalars['String']>>;
  title: Scalars['String'];
  updatedAt?: Maybe<Scalars['DateTime']>;
  updater?: Maybe<User>;
};

export enum StoreMutationStatus {
  Fail = 'FAIL',
  Success = 'SUCCESS'
}

export type StorePayload = {
  __typename?: 'StorePayload';
  status: StoreStatus;
  store?: Maybe<Store>;
};

export enum StoreStatus {
  Active = 'ACTIVE',
  Disabled = 'DISABLED',
  Inactive = 'INACTIVE'
}

export enum SupportedFileTypes {
  Bmp = 'BMP',
  Gif = 'GIF',
  Jfi = 'JFI',
  Jfif = 'JFIF',
  Jif = 'JIF',
  Jpe = 'JPE',
  Jpeg = 'JPEG',
  Jpg = 'JPG',
  Png = 'PNG',
  Svg = 'SVG',
  Tif = 'TIF',
  Tiff = 'TIFF'
}

export enum SupportedVideoFileTypes {
  M4A = 'M4A',
  M4B = 'M4B',
  M4P = 'M4P',
  M4R = 'M4R',
  M4V = 'M4V',
  Mov = 'MOV',
  Mp4 = 'MP4',
  Qt = 'QT'
}

export type SuspendUserInput = {
  /** The duration of the suspension (in hours). User will be automatically unsuspended after that duration. */
  durationInHours: Scalars['Int'];
  /** Internal note provided by moderator to explain the decision made. */
  internalNote?: InputMaybe<Scalars['String']>;
  /** The id of the user to suspend. */
  userId: Scalars['String'];
  /** Violation identified by the moderator when deciding to suspend the user, should match [A-Z_]{1,40} */
  violationType?: InputMaybe<Scalars['String']>;
};

/** Payload returned when a user is suspended. */
export type SuspendUserPayload = {
  __typename?: 'SuspendUserPayload';
  /** The reviewed moderation job associated to the user. */
  moderationJob: ModerationJob;
};

export type TargetedFeedItemInformation = {
  __typename?: 'TargetedFeedItemInformation';
  source?: Maybe<FeedItemSourceType>;
};

export type TopParentEntity = Event | Poll | Post;

/** Note: VOUCHER is being used for testing purpose only (for now) */
export enum TransactionType {
  Burn = 'BURN',
  Contribution = 'CONTRIBUTION',
  Mint = 'MINT',
  Voucher = 'VOUCHER'
}

export type TriggerSpecification = {
  __typename?: 'TriggerSpecification';
  fandomJoinedSinceTriggerFilter?: Maybe<FandomJoinedSinceTriggerFilter>;
  fandomJoinedTriggerFilter?: Maybe<FandomJoinedTriggerFilter>;
  fandomVisitedTriggerFilter?: Maybe<FandomVisitedTriggerFilter>;
};

export type TriggerSpecificationInput = {
  fandomJoinedSinceTriggerFilter?: InputMaybe<FandomJoinedSinceTriggerFilterInput>;
  fandomJoinedTriggerFilter?: InputMaybe<FandomJoinedTriggerFilterInput>;
  fandomVisitedTriggerFilter?: InputMaybe<FandomVisitedTriggerFilterInput>;
};

export type UndoFriendshipRequestInput = {
  userId: Scalars['String'];
};

export type UndoFriendshipRequestPayload = {
  __typename?: 'UndoFriendshipRequestPayload';
  user?: Maybe<User>;
};

export type UnlikeReactionInput = {
  reactableId: Scalars['String'];
  reactableType: ReactableType;
};

export type UnlikeReactionPayload = {
  __typename?: 'UnlikeReactionPayload';
  reaction: LikeReaction;
};

export type UnpinContentInput = {
  contentId: Scalars['String'];
};

export type UnpinContentPayload = {
  __typename?: 'UnpinContentPayload';
  content?: Maybe<PinnedContent>;
};

export type UnregisterPushNotificationTokenInput = {
  /** app bundle id */
  deviceInstanceId: Scalars['String'];
  source: Scalars['String'];
};

export type UnregisterPushNotificationTokenPayload = {
  __typename?: 'UnregisterPushNotificationTokenPayload';
  /** app bundle id */
  deviceInstanceId: Scalars['String'];
  pushNotificationToken?: Maybe<Scalars['String']>;
  source: Scalars['String'];
};

export type UpdateCampaignInput = {
  /** CampaignId */
  campaignId: Scalars['String'];
  /**
   * New endTime (null if no endtime shoudl be used)
   *  ISO-8601
   */
  endTime?: InputMaybe<Scalars['DateTime']>;
  /** New campaignItem (if null original item will be used) */
  item?: InputMaybe<CampaignItemInput>;
  /** All active campaign specifications */
  specifications: Array<CampaignSpecificationInput>;
  /**
   * New startTime (null if no starttime should be used)
   *  ISO-8601
   */
  startTime?: InputMaybe<Scalars['DateTime']>;
  /** New campaignType (if null original type will be used) */
  type?: InputMaybe<CampaignType>;
};

export type UpdateCampaignPayload = {
  __typename?: 'UpdateCampaignPayload';
  campaign?: Maybe<Campaign>;
};

export type UpdateCommentInput = {
  content: Scalars['String'];
  id: Scalars['String'];
};

export type UpdateCommentPayload = {
  __typename?: 'UpdateCommentPayload';
  comment: Comment;
};

/**
 * Important: Temporarily remove these two properties:
 *   - addAttachments: [EventAttachmentInput]!
 *   - removeAttachments: [EventAttachmentInput]!
 *
 * To support edit event action without complicated about attachments updates
 */
export type UpdateEventInput = {
  content: Scalars['String'];
  endTime: Scalars['ZonedDateTime'];
  eventId: Scalars['String'];
  location: EventLocationInput;
  startTime: Scalars['ZonedDateTime'];
  ticketUrl?: InputMaybe<Scalars['String']>;
  title: Scalars['String'];
  visibleAt?: InputMaybe<Scalars['DateTime']>;
};

export type UpdateEventPartialInput = {
  content?: InputMaybe<EventPartialContentInput>;
  endTime?: InputMaybe<EventPartialEndTimeInput>;
  eventId: Scalars['String'];
  location?: InputMaybe<EventPartialLocationInput>;
  startTime?: InputMaybe<EventPartialStartTimeInput>;
  ticketUrl?: InputMaybe<EventPartialTicketUrlInput>;
  title?: InputMaybe<EventPartialTitleInput>;
  visibleAt?: InputMaybe<EventPartialVisibleAtInput>;
};

export type UpdateEventPartialPayload = {
  __typename?: 'UpdateEventPartialPayload';
  event: Event;
};

export type UpdateEventPayload = {
  __typename?: 'UpdateEventPayload';
  event: Event;
};

export type UpdateFandomInput = {
  fandomId: Scalars['String'];
  handle?: InputMaybe<Scalars['String']>;
  hashtags?: InputMaybe<Array<Scalars['String']>>;
  logoImageId?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  /** @deprecated(reason: "Deprecated from api v7. Theme functionality removed in app build 1.31.0") */
  rules?: InputMaybe<Array<RuleInput>>;
  summary?: InputMaybe<Scalars['String']>;
  /**
   * This directive should be uncommented when it is supported in the spec.
   * cf. https://github.com/graphql/graphql-spec/pull/805
   */
  themeId?: InputMaybe<Scalars['String']>;
};

export type UpdateFandomPayload = {
  __typename?: 'UpdateFandomPayload';
  fandom: Fandom;
};

export type UpdatePostInput = {
  addAttachments: Array<InputMaybe<AttachmentInput>>;
  content?: InputMaybe<Scalars['String']>;
  postId: Scalars['String'];
  removeAttachments: Array<InputMaybe<AttachmentInput>>;
  title?: InputMaybe<Scalars['String']>;
  visibleAt?: InputMaybe<Scalars['DateTime']>;
};

export type UpdatePostPayload = {
  __typename?: 'UpdatePostPayload';
  post: Post;
};

/**
 * Updating the `productType` is not supported at the moment.
 * `variants` field will be validated to have exactly 1 item for SINGLE
 */
export type UpdateProductInput = {
  description: Scalars['String'];
  id: Scalars['String'];
  name: Scalars['String'];
  productType?: InputMaybe<ProductType>;
  status: ProductStatus;
  variants?: InputMaybe<Array<UpdateVariantInput>>;
};

export type UpdateProductPayload = {
  __typename?: 'UpdateProductPayload';
  error?: Maybe<EntityError>;
  /** @deprecated Use `error` field instead */
  message?: Maybe<Scalars['String']>;
  product?: Maybe<Product>;
  /** @deprecated Use `error` field instead */
  status: StoreMutationStatus;
};

export type UpdateProductStatusInput = {
  id: Scalars['String'];
  status: ProductStatus;
};

export type UpdateStoreInput = {
  active: Scalars['Boolean'];
  contactCountryCode?: InputMaybe<Scalars['String']>;
  contactNumber?: InputMaybe<Scalars['String']>;
  content: Scalars['String'];
  ctaImgId: Scalars['String'];
  currency?: InputMaybe<Scalars['String']>;
  email?: InputMaybe<Scalars['String']>;
  fandomId: Scalars['String'];
  storeUrl: Scalars['String'];
  storeUrlTitle?: InputMaybe<Scalars['String']>;
  tags?: InputMaybe<Array<Scalars['String']>>;
  title: Scalars['String'];
};

export type UpdateStorePayload = {
  __typename?: 'UpdateStorePayload';
  error?: Maybe<EntityError>;
  /** @deprecated Use `error` field instead */
  message?: Maybe<Scalars['String']>;
  /** @deprecated Use `error` field instead */
  status: StoreMutationStatus;
  store?: Maybe<Store>;
};

export type UpdateUserProfileInput = {
  bio?: InputMaybe<Scalars['String']>;
  coverImageId?: InputMaybe<Scalars['String']>;
  coverImageUrl?: InputMaybe<Scalars['String']>;
  dateOfBirth?: InputMaybe<Scalars['String']>;
  handle?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  profilePictureId?: InputMaybe<Scalars['String']>;
  profilePictureUrl?: InputMaybe<Scalars['String']>;
  realName?: InputMaybe<Scalars['String']>;
  tags?: InputMaybe<Array<Scalars['String']>>;
  visibility?: InputMaybe<ProfileVisibility>;
};

export type UpdateUserProfilePayload = {
  __typename?: 'UpdateUserProfilePayload';
  user?: Maybe<User>;
};

export type UpdateVariantInput = {
  attributes?: InputMaybe<Array<VariantAttributeInput>>;
  externalUrl: Scalars['String'];
  id: Scalars['String'];
  imageIds: Array<Scalars['String']>;
  label: VariantLabel;
  price: Scalars['Float'];
  productId: Scalars['String'];
  salePrice?: InputMaybe<Scalars['Float']>;
  saleValidFrom?: InputMaybe<Scalars['DateTime']>;
  saleValidTo?: InputMaybe<Scalars['DateTime']>;
  sku?: InputMaybe<Scalars['String']>;
};

export type UpdateVariantLabelInput = {
  label: VariantLabel;
  productId: Scalars['String'];
  variantId: Scalars['String'];
};

export type UpdateVariantPayload = {
  __typename?: 'UpdateVariantPayload';
  error?: Maybe<EntityError>;
  /** @deprecated Use `error` field instead */
  message?: Maybe<Scalars['String']>;
  /** @deprecated Use `error` field instead */
  status: StoreMutationStatus;
  variant?: Maybe<Variant>;
};

export type UploadImage = {
  __typename?: 'UploadImage';
  /** @deprecated use image instead */
  cdnUrl: Scalars['String'];
  /** @deprecated use image instead */
  contentType: Scalars['String'];
  /** @deprecated use image instead */
  id: Scalars['String'];
  image: Image;
  url: Scalars['String'];
};

export type UploadImageInput = {
  fileType: SupportedFileTypes;
};

export type UploadVideoInput = {
  fileName?: InputMaybe<Scalars['String']>;
  /** deprecated(reason: "Use `fileType`.") */
  fileType?: InputMaybe<SupportedVideoFileTypes>;
};

export type UploadVideoPayload = {
  __typename?: 'UploadVideoPayload';
  url: Scalars['String'];
  video: Video;
};

export type User = {
  __typename?: 'User';
  /**
   * Fetch badges of this user. By default it gets the global awarded badges.
   * Does not support pagination at the moment
   */
  badges?: Maybe<BadgeConnection>;
  bio?: Maybe<Scalars['String']>;
  coverImage?: Maybe<Image>;
  /** @deprecated Field no longer supported */
  coverImageUrl?: Maybe<Scalars['String']>;
  /** ISO-8601 */
  dateOfBirth?: Maybe<Scalars['Date']>;
  deleted: Scalars['Boolean'];
  email?: Maybe<Scalars['String']>;
  /** @deprecated(reason: "deprecated argument PaginationInput from v6, use unpacked arguments instead") */
  fandomsAdminOf?: Maybe<FandomConnection>;
  /** @deprecated(reason: "deprecated argument PaginationInput from v6, use unpacked arguments instead") */
  fandomsMemberOf?: Maybe<FandomConnection>;
  fandomsMemberOfCount?: Maybe<Scalars['Int']>;
  friendCount?: Maybe<Scalars['Int']>;
  friendshipStatus?: Maybe<FriendshipStatus>;
  handle: Scalars['String'];
  id: Scalars['String'];
  identified: Scalars['Boolean'];
  livestream?: Maybe<Livestream>;
  membershipOfFandom?: Maybe<FandomMember>;
  name?: Maybe<Scalars['String']>;
  /** @deprecated from: v6 */
  pendingVerification: Scalars['Boolean'];
  phone?: Maybe<Scalars['String']>;
  platformMemberRoles?: Maybe<Array<PlatformMemberRole>>;
  profilePicture?: Maybe<Image>;
  /** @deprecated Field no longer supported */
  profilePictureUrl?: Maybe<Scalars['String']>;
  realName?: Maybe<Scalars['String']>;
  /** Included in v2+ api, but Image only resolvable in v3+ so don't use it in v2. */
  tagsList?: Maybe<Array<Scalars['String']>>;
  visibility?: Maybe<ProfileVisibility>;
};


export type UserBadgesArgs = {
  after?: InputMaybe<Scalars['String']>;
  badgeAwardStatus?: InputMaybe<BadgeAwardStatus>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
};


export type UserFandomsAdminOfArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  pagination?: InputMaybe<PaginationInput>;
};


export type UserFandomsMemberOfArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  pagination?: InputMaybe<PaginationInput>;
};


export type UserMembershipOfFandomArgs = {
  fandomId: Scalars['String'];
};

export type UserConnection = {
  __typename?: 'UserConnection';
  edges: Array<UserEdge>;
  pageInfo: PageInfo;
};

export type UserEdge = {
  __typename?: 'UserEdge';
  cursor: Scalars['String'];
  node: User;
};

export enum UserEventReply {
  Going = 'GOING',
  Maybe = 'MAYBE',
  NotGoing = 'NOT_GOING'
}

export type UserEventResponseInput = {
  eventId: Scalars['String'];
  userReply: UserEventReply;
};

export type UserEventResponsePayload = {
  __typename?: 'UserEventResponsePayload';
  event: Event;
};

export type UserMentionNotification = InboxNotification & {
  __typename?: 'UserMentionNotification';
  acknowledged: Scalars['Boolean'];
  composition?: Maybe<InboxComposition>;
  fandom?: Maybe<Fandom>;
  feedItem?: Maybe<InboxFeedItem>;
  id: Scalars['String'];
  inReplyTo?: Maybe<InboxComposition>;
  mention?: Maybe<User>;
  mentioner?: Maybe<User>;
  read: Scalars['Boolean'];
  time: Scalars['String'];
};

export type UserModerationInfo = {
  __typename?: 'UserModerationInfo';
  user?: Maybe<User>;
};

export type UserSearchConnection = {
  __typename?: 'UserSearchConnection';
  edges: Array<UserSearchEdge>;
  pageInfo: PageInfo;
};

export type UserSearchEdge = {
  __typename?: 'UserSearchEdge';
  cursor: Scalars['String'];
  node?: Maybe<User>;
};

export type UserSuggestionConnection = {
  __typename?: 'UserSuggestionConnection';
  edges: Array<UserSuggestionEdge>;
  pageInfo: PageInfo;
};

export type UserSuggestionEdge = {
  __typename?: 'UserSuggestionEdge';
  cursor: Scalars['String'];
  node?: Maybe<User>;
};

export type Variant = {
  __typename?: 'Variant';
  attributes: Array<VariantAttribute>;
  createdAt: Scalars['DateTime'];
  creator?: Maybe<User>;
  externalUrl?: Maybe<Scalars['String']>;
  id: Scalars['String'];
  images: Array<Maybe<Image>>;
  label: VariantLabel;
  name?: Maybe<Scalars['String']>;
  price?: Maybe<Scalars['Float']>;
  product: Product;
  salePrice?: Maybe<Scalars['Float']>;
  saleValidFrom?: Maybe<Scalars['DateTime']>;
  saleValidTo?: Maybe<Scalars['DateTime']>;
  sku?: Maybe<Scalars['String']>;
  updatedAt: Scalars['DateTime'];
  updater?: Maybe<User>;
};

export type VariantAttribute = {
  __typename?: 'VariantAttribute';
  name: Scalars['String'];
  value: Scalars['String'];
};

export type VariantAttributeInput = {
  name: Scalars['String'];
  value: Scalars['String'];
};

export type VariantConnection = {
  __typename?: 'VariantConnection';
  edges: Array<Maybe<VariantEdge>>;
  pageInfo: PageInfo;
};

export type VariantEdge = {
  __typename?: 'VariantEdge';
  cursor?: Maybe<Scalars['String']>;
  node: Variant;
};

export enum VariantLabel {
  New = 'NEW',
  None = 'NONE',
  Sale = 'SALE',
  Unavailable = 'UNAVAILABLE'
}

export type Video = {
  __typename?: 'Video';
  aiLabels?: Maybe<Array<AiLabel>>;
  coverImageUrl?: Maybe<Scalars['String']>;
  height?: Maybe<Scalars['Int']>;
  /** @deprecated field has typo */
  heigth?: Maybe<Scalars['Int']>;
  id: Scalars['String'];
  /** @deprecated use status instead */
  online: Scalars['Boolean'];
  ratio?: Maybe<Scalars['String']>;
  status: VideoStatus;
  statusRemarks?: Maybe<Scalars['String']>;
  videoUrl?: Maybe<Scalars['String']>;
  width?: Maybe<Scalars['Int']>;
};

export enum VideoStatus {
  NormalisationFailed = 'NORMALISATION_FAILED',
  Online = 'ONLINE',
  Pending = 'PENDING',
  ProcessingFailed = 'PROCESSING_FAILED',
  ValidationFailed = 'VALIDATION_FAILED'
}

export type VideoUploadInput = {
  fileType: SupportedVideoFileTypes;
};

export type Viewers = {
  __typename?: 'Viewers';
  list?: Maybe<Array<Maybe<User>>>;
  viewerCount?: Maybe<Scalars['Int']>;
};

/** Wallet */
export type Wallet = {
  __typename?: 'Wallet';
  balance: Scalars['Float'];
  fandom?: Maybe<Fandom>;
  id: Scalars['String'];
  lastUpdate: Scalars['DateTime'];
  user?: Maybe<User>;
};

/** Wallet latest state by Date */
export type WalletByDate = {
  __typename?: 'WalletByDate';
  balance: Scalars['Float'];
  date: Scalars['Date'];
  lastUpdate: Scalars['DateTime'];
  transactions: Array<TransactionType>;
  wallet: Wallet;
};

export type WalletByDateConnection = {
  __typename?: 'WalletByDateConnection';
  edges?: Maybe<Array<Maybe<WalletByDateEdge>>>;
  pageInfo: PageInfo;
};

export type WalletByDateEdge = {
  __typename?: 'WalletByDateEdge';
  cursor?: Maybe<Scalars['String']>;
  node?: Maybe<WalletByDate>;
};

/** Wallet total credit by Fandom */
export type WalletByFandom = {
  __typename?: 'WalletByFandom';
  fandom?: Maybe<Fandom>;
  lastUpdate: Scalars['DateTime'];
  totalCredit: Scalars['Float'];
  wallet: Wallet;
};

export type WalletByFandomConnection = {
  __typename?: 'WalletByFandomConnection';
  edges?: Maybe<Array<Maybe<WalletByFandomEdge>>>;
  pageInfo: PageInfo;
};

export type WalletByFandomEdge = {
  __typename?: 'WalletByFandomEdge';
  cursor?: Maybe<Scalars['String']>;
  node?: Maybe<WalletByFandom>;
};

export type WalletMetadata = {
  __typename?: 'WalletMetadata';
  key: Scalars['String'];
  value: Scalars['String'];
};

/** Wallet Transaction */
export type WalletTransaction = {
  __typename?: 'WalletTransaction';
  amount: Scalars['Float'];
  balance: Scalars['Float'];
  dateTime: Scalars['DateTime'];
  entryType: EntryType;
  fandom?: Maybe<Fandom>;
  metadata: Array<WalletMetadata>;
  transactionType: TransactionType;
  wallet: Wallet;
};

export type WalletTransactionConnection = {
  __typename?: 'WalletTransactionConnection';
  edges?: Maybe<Array<Maybe<WalletTransactionEdge>>>;
  pageInfo: PageInfo;
};

export type WalletTransactionEdge = {
  __typename?: 'WalletTransactionEdge';
  cursor?: Maybe<Scalars['String']>;
  node?: Maybe<WalletTransaction>;
};

export type WebsocketChannel = {
  __typename?: 'WebsocketChannel';
  cipherKey: Scalars['String'];
  id: Scalars['String'];
};

export enum WebsocketChannelMessageType {
  Entity = 'ENTITY',
  Presence = 'PRESENCE'
}

export enum WebsocketEntityType {
  Comment = 'COMMENT',
  Fandom = 'FANDOM',
  Inbox = 'INBOX',
  InboxNotification = 'INBOX_NOTIFICATION',
  Livestream = 'LIVESTREAM',
  Post = 'POST'
}

export type WebsocketEvent = {
  __typename?: 'WebsocketEvent';
  entityType: WebsocketEntityType;
  eventType: WebsocketEventType;
  id: Scalars['String'];
};

export enum WebsocketEventType {
  Create = 'CREATE',
  Delete = 'DELETE',
  Update = 'UPDATE'
}

export type WebsocketPresence = {
  __typename?: 'WebsocketPresence';
  presenceCount: Scalars['Int'];
};



export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  AcceptFriendRequestInput: AcceptFriendRequestInput;
  AcceptFriendRequestPayload: ResolverTypeWrapper<AcceptFriendRequestPayload>;
  AcceptJoinHiddenFandomInput: AcceptJoinHiddenFandomInput;
  AcceptJoinHiddenFandomPayload: ResolverTypeWrapper<AcceptJoinHiddenFandomPayload>;
  AcknowledgeInboxNotificationsInput: AcknowledgeInboxNotificationsInput;
  AcknowledgeInboxNotificationsPayload: ResolverTypeWrapper<AcknowledgeInboxNotificationsPayload>;
  AddFandomAdminInput: AddFandomAdminInput;
  AddFandomAdminPayload: ResolverTypeWrapper<AddFandomAdminPayload>;
  AddPlatformMemberRoleInput: AddPlatformMemberRoleInput;
  AddPlatformMemberRolePayload: ResolverTypeWrapper<AddPlatformMemberRolePayload>;
  Administrator: ResolverTypeWrapper<Administrator>;
  AdministratorInput: AdministratorInput;
  AiLabel: ResolverTypeWrapper<AiLabel>;
  AiLabelStatus: AiLabelStatus;
  AiLabelsInput: AiLabelsInput;
  AiReport: ResolverTypeWrapper<AiReport>;
  AiReportScore: AiReportScore;
  AllFandomMemberReputationsInput: AllFandomMemberReputationsInput;
  AppealInfo: ResolversTypes['CreatorAppealInfo'] | ResolversTypes['ReportersAppealInfo'];
  AppealModerationJobInput: AppealModerationJobInput;
  AppealModerationJobPayload: ResolverTypeWrapper<AppealModerationJobPayload>;
  AppealNote: ResolverTypeWrapper<AppealNote>;
  AppealNoteConnection: ResolverTypeWrapper<AppealNoteConnection>;
  AppealNoteEdge: ResolverTypeWrapper<AppealNoteEdge>;
  AppealStatus: AppealStatus;
  ApproveJoinPrivateFandomInput: ApproveJoinPrivateFandomInput;
  ApproveJoinPrivateFandomPayload: ResolverTypeWrapper<ApproveJoinPrivateFandomPayload>;
  AttachmentInput: AttachmentInput;
  AttachmentType: AttachmentType;
  AttributeSummaryItem: ResolverTypeWrapper<AttributeSummaryItem>;
  AttributeSummaryItemInput: AttributeSummaryItemInput;
  AudienceSpecification: ResolverTypeWrapper<AudienceSpecification>;
  AudienceSpecificationInput: AudienceSpecificationInput;
  Badge: ResolverTypeWrapper<Badge>;
  BadgeAwardStatus: BadgeAwardStatus;
  BadgeCollectedNotification: ResolverTypeWrapper<BadgeCollectedNotification>;
  BadgeConnection: ResolverTypeWrapper<BadgeConnection>;
  BadgeEdge: ResolverTypeWrapper<BadgeEdge>;
  BadgeStatus: BadgeStatus;
  BadgeType: BadgeType;
  BigInteger: ResolverTypeWrapper<Scalars['BigInteger']>;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
  Campaign: ResolverTypeWrapper<Omit<Campaign, 'item'> & { item?: Maybe<ResolversTypes['CampaignItemContent']> }>;
  CampaignConnection: ResolverTypeWrapper<CampaignConnection>;
  CampaignEdge: ResolverTypeWrapper<CampaignEdge>;
  CampaignItemContent: ResolversTypes['Event'] | ResolversTypes['Poll'] | ResolversTypes['Post'];
  CampaignItemInput: CampaignItemInput;
  CampaignItemType: CampaignItemType;
  CampaignSpecification: ResolverTypeWrapper<CampaignSpecification>;
  CampaignSpecificationInput: CampaignSpecificationInput;
  CampaignType: CampaignType;
  CancelJoinHiddenFandomInput: CancelJoinHiddenFandomInput;
  CancelJoinHiddenFandomPayload: ResolverTypeWrapper<CancelJoinHiddenFandomPayload>;
  CancelJoinPrivateFandomInput: CancelJoinPrivateFandomInput;
  CancelJoinPrivateFandomPayload: ResolverTypeWrapper<CancelJoinPrivateFandomPayload>;
  CastVoteInput: CastVoteInput;
  CastVotePayload: ResolverTypeWrapper<CastVotePayload>;
  ChangeModerationStatusInput: ChangeModerationStatusInput;
  Chat: ResolverTypeWrapper<Chat>;
  ChatChannel: ResolverTypeWrapper<ChatChannel>;
  ChatContext: ChatContext;
  ChatStatus: ChatStatus;
  ChatToken: ResolverTypeWrapper<ChatToken>;
  ChatType: ChatType;
  Comment: ResolverTypeWrapper<Omit<Comment, 'attachment' | 'parent'> & { attachment?: Maybe<ResolversTypes['CommentAttachment']>, parent?: Maybe<ResolversTypes['CommentParent']> }>;
  CommentAttachment: ResolversTypes['Image'] | ResolversTypes['Video'];
  CommentAttachmentInput: CommentAttachmentInput;
  CommentAttachmentType: CommentAttachmentType;
  CommentConnection: ResolverTypeWrapper<CommentConnection>;
  CommentEdge: ResolverTypeWrapper<CommentEdge>;
  CommentFilterType: CommentFilterType;
  CommentModerationInfo: ResolverTypeWrapper<Omit<CommentModerationInfo, 'topParent'> & { topParent?: Maybe<ResolversTypes['TopParentEntity']> }>;
  CommentNotification: ResolverTypeWrapper<Omit<CommentNotification, 'feedItem' | 'inReplyTo'> & { feedItem?: Maybe<ResolversTypes['InboxFeedItem']>, inReplyTo?: Maybe<ResolversTypes['InboxComposition']> }>;
  CommentParent: ResolversTypes['Comment'] | ResolversTypes['Event'] | ResolversTypes['Poll'] | ResolversTypes['Post'];
  CommentStatus: CommentStatus;
  CommunityRecommendedHighlights: ResolverTypeWrapper<CommunityRecommendedHighlights>;
  CommunityRecommendedHighlightsType: CommunityRecommendedHighlightsType;
  ConnectEventChatInput: ConnectEventChatInput;
  ConnectEventChatPayload: ResolverTypeWrapper<ConnectEventChatPayload>;
  ConnectFandomChatPayload: ResolverTypeWrapper<ConnectFandomChatPayload>;
  ContentSearchConnection: ResolverTypeWrapper<ContentSearchConnection>;
  ContentSearchEdge: ResolverTypeWrapper<Omit<ContentSearchEdge, 'node'> & { node?: Maybe<ResolversTypes['ContentSearchNode']> }>;
  ContentSearchNode: ResolversTypes['Event'] | ResolversTypes['Poll'] | ResolversTypes['Post'];
  CreateCampaignInput: CreateCampaignInput;
  CreateCampaignPayload: ResolverTypeWrapper<CreateCampaignPayload>;
  CreateCommentInput: CreateCommentInput;
  CreateCommentPayload: ResolverTypeWrapper<CreateCommentPayload>;
  CreateEventInput: CreateEventInput;
  CreateEventPayload: ResolverTypeWrapper<CreateEventPayload>;
  CreateFandomInput: CreateFandomInput;
  CreateFandomPayload: ResolverTypeWrapper<CreateFandomPayload>;
  CreateFriendRequestInput: CreateFriendRequestInput;
  CreateFriendRequestPayload: ResolverTypeWrapper<CreateFriendRequestPayload>;
  CreateLikeReactionInput: CreateLikeReactionInput;
  CreateLikeReactionPayload: ResolverTypeWrapper<CreateLikeReactionPayload>;
  CreatePollInput: CreatePollInput;
  CreatePollPayload: ResolverTypeWrapper<CreatePollPayload>;
  CreatePostInput: CreatePostInput;
  CreatePostPayload: ResolverTypeWrapper<CreatePostPayload>;
  CreateProductInput: CreateProductInput;
  CreateProductPayload: ResolverTypeWrapper<CreateProductPayload>;
  CreateStoreInput: CreateStoreInput;
  CreateStorePayload: ResolverTypeWrapper<CreateStorePayload>;
  CreateVariantInput: CreateVariantInput;
  CreateVariantPayload: ResolverTypeWrapper<CreateVariantPayload>;
  CreatorAppealInfo: ResolverTypeWrapper<CreatorAppealInfo>;
  Date: ResolverTypeWrapper<Scalars['Date']>;
  DateTime: ResolverTypeWrapper<Scalars['DateTime']>;
  DeleteCampaignInput: DeleteCampaignInput;
  DeleteCampaignPayload: ResolverTypeWrapper<DeleteCampaignPayload>;
  DeleteCommentInput: DeleteCommentInput;
  DeleteCommentPayload: ResolverTypeWrapper<DeleteCommentPayload>;
  DeleteEventInput: DeleteEventInput;
  DeleteEventPayload: ResolverTypeWrapper<DeleteEventPayload>;
  DeleteFriendshipInput: DeleteFriendshipInput;
  DeleteFriendshipPayload: ResolverTypeWrapper<DeleteFriendshipPayload>;
  DeleteLikeReactionInput: DeleteLikeReactionInput;
  DeleteLikeReactionPayload: ResolverTypeWrapper<DeleteLikeReactionPayload>;
  DeletePollInput: DeletePollInput;
  DeletePollPayload: ResolverTypeWrapper<DeletePollPayload>;
  DeletePostInput: DeletePostInput;
  DeletePostPayload: ResolverTypeWrapper<DeletePostPayload>;
  DeleteProductInput: DeleteProductInput;
  DeleteProductPayload: ResolverTypeWrapper<DeleteProductPayload>;
  DeleteUserInput: DeleteUserInput;
  DeleteUserPayload: ResolverTypeWrapper<DeleteUserPayload>;
  DeleteVariantInput: DeleteVariantInput;
  DeleteVariantPayload: ResolverTypeWrapper<DeleteVariantPayload>;
  DeliveryMechanismType: DeliveryMechanismType;
  DeliverySpecification: ResolverTypeWrapper<DeliverySpecification>;
  DeliverySpecificationInput: DeliverySpecificationInput;
  Duration: ResolverTypeWrapper<Scalars['Duration']>;
  EndFandomChatInput: EndFandomChatInput;
  EndFandomChatPayload: ResolverTypeWrapper<EndFandomChatPayload>;
  EntityError: ResolverTypeWrapper<EntityError>;
  EntityType: EntityType;
  EntityVisibility: EntityVisibility;
  EntryType: EntryType;
  ErrorCode: ErrorCode;
  ErrorDetail: ErrorDetail;
  ErrorItem: ResolverTypeWrapper<ErrorItem>;
  ErrorType: ErrorType;
  EscalateModerationJobInput: EscalateModerationJobInput;
  EscalateModerationJobPayload: ResolverTypeWrapper<EscalateModerationJobPayload>;
  EscalationTarget: EscalationTarget;
  Event: ResolverTypeWrapper<Omit<Event, 'attachments'> & { attachments: Array<Maybe<ResolversTypes['EventAttachment']>> }>;
  EventAttachment: ResolversTypes['Image'] | ResolversTypes['Video'];
  EventAttachmentInput: EventAttachmentInput;
  EventAttachmentType: EventAttachmentType;
  EventChat: ResolverTypeWrapper<EventChat>;
  EventInteractions: ResolverTypeWrapper<EventInteractions>;
  EventLocation: ResolverTypeWrapper<EventLocation>;
  EventLocationInput: EventLocationInput;
  EventModerationInfo: ResolverTypeWrapper<EventModerationInfo>;
  EventPartialContentInput: EventPartialContentInput;
  EventPartialDisplayNameInput: EventPartialDisplayNameInput;
  EventPartialEndTimeInput: EventPartialEndTimeInput;
  EventPartialLocationInput: EventPartialLocationInput;
  EventPartialStartTimeInput: EventPartialStartTimeInput;
  EventPartialTicketUrlInput: EventPartialTicketUrlInput;
  EventPartialTitleInput: EventPartialTitleInput;
  EventPartialVisibleAtInput: EventPartialVisibleAtInput;
  EventStatus: EventStatus;
  Fandom: ResolverTypeWrapper<Fandom>;
  FandomAddedAsAdminNotification: ResolverTypeWrapper<FandomAddedAsAdminNotification>;
  FandomChat: ResolverTypeWrapper<FandomChat>;
  FandomConnection: ResolverTypeWrapper<FandomConnection>;
  FandomEdge: ResolverTypeWrapper<FandomEdge>;
  FandomInviteAcceptionNotification: ResolverTypeWrapper<FandomInviteAcceptionNotification>;
  FandomInviteNotification: ResolverTypeWrapper<FandomInviteNotification>;
  FandomInviteRejectionNotification: ResolverTypeWrapper<FandomInviteRejectionNotification>;
  FandomInviteResponseNotification: ResolverTypeWrapper<FandomInviteResponseNotification>;
  FandomJoinRequestAcceptionNotification: ResolverTypeWrapper<FandomJoinRequestAcceptionNotification>;
  FandomJoinRequestNotification: ResolverTypeWrapper<FandomJoinRequestNotification>;
  FandomJoinRequestRejectionNotification: ResolverTypeWrapper<FandomJoinRequestRejectionNotification>;
  FandomJoinRequestResponseNotification: ResolverTypeWrapper<FandomJoinRequestResponseNotification>;
  FandomJoinedNotification: ResolverTypeWrapper<FandomJoinedNotification>;
  FandomJoinedSinceTriggerFilter: ResolverTypeWrapper<FandomJoinedSinceTriggerFilter>;
  FandomJoinedSinceTriggerFilterInput: FandomJoinedSinceTriggerFilterInput;
  FandomJoinedTriggerFilter: ResolverTypeWrapper<FandomJoinedTriggerFilter>;
  FandomJoinedTriggerFilterInput: FandomJoinedTriggerFilterInput;
  FandomMember: ResolverTypeWrapper<FandomMember>;
  FandomMemberConnection: ResolverTypeWrapper<FandomMemberConnection>;
  FandomMemberEdge: ResolverTypeWrapper<FandomMemberEdge>;
  FandomMemberReputation: ResolverTypeWrapper<FandomMemberReputation>;
  FandomMemberReputationConnection: ResolverTypeWrapper<FandomMemberReputationConnection>;
  FandomMemberReputationConnectionV2: ResolverTypeWrapper<FandomMemberReputationConnectionV2>;
  FandomMemberReputationEdge: ResolverTypeWrapper<FandomMemberReputationEdge>;
  FandomMemberReputationEdgeV2: ResolverTypeWrapper<FandomMemberReputationEdgeV2>;
  FandomMemberReputationHistoryInput: FandomMemberReputationHistoryInput;
  FandomMemberReputationInput: FandomMemberReputationInput;
  FandomMemberReputationV2: ResolverTypeWrapper<FandomMemberReputationV2>;
  FandomMemberRole: FandomMemberRole;
  FandomMemberStatus: FandomMemberStatus;
  FandomMentionNotification: ResolverTypeWrapper<Omit<FandomMentionNotification, 'composition' | 'feedItem' | 'inReplyTo'> & { composition?: Maybe<ResolversTypes['InboxComposition']>, feedItem?: Maybe<ResolversTypes['InboxFeedItem']>, inReplyTo?: Maybe<ResolversTypes['InboxComposition']> }>;
  FandomRemovedFromAdminNotification: ResolverTypeWrapper<FandomRemovedFromAdminNotification>;
  FandomReputation: ResolverTypeWrapper<FandomReputation>;
  FandomReputationConnection: ResolverTypeWrapper<FandomReputationConnection>;
  FandomReputationEdge: ResolverTypeWrapper<FandomReputationEdge>;
  FandomReputationHistoryInput: FandomReputationHistoryInput;
  FandomReputationInput: FandomReputationInput;
  FandomRule: ResolverTypeWrapper<FandomRule>;
  FandomSearchConnection: ResolverTypeWrapper<FandomSearchConnection>;
  FandomSearchEdge: ResolverTypeWrapper<FandomSearchEdge>;
  FandomShareNotification: ResolverTypeWrapper<FandomShareNotification>;
  FandomSuggestionConnection: ResolverTypeWrapper<FandomSuggestionConnection>;
  FandomSuggestionEdge: ResolverTypeWrapper<FandomSuggestionEdge>;
  FandomTheme: ResolverTypeWrapper<FandomTheme>;
  FandomVisibility: FandomVisibility;
  FandomVisitedTriggerFilter: ResolverTypeWrapper<FandomVisitedTriggerFilter>;
  FandomVisitedTriggerFilterInput: FandomVisitedTriggerFilterInput;
  FeedFilter: FeedFilter;
  FeedItem: ResolverTypeWrapper<Omit<FeedItem, 'content' | 'sourceInformation'> & { content?: Maybe<ResolversTypes['FeedItemContent']>, sourceInformation: ResolversTypes['FeedItemSourceInformation'] }>;
  FeedItemConnection: ResolverTypeWrapper<FeedItemConnection>;
  FeedItemContent: ResolversTypes['Event'] | ResolversTypes['Livestream'] | ResolversTypes['Poll'] | ResolversTypes['Post'];
  FeedItemEdge: ResolverTypeWrapper<FeedItemEdge>;
  FeedItemSourceInformation: ResolversTypes['PinnedFeedItemInformation'] | ResolversTypes['RecommendedFeedItemInformation'] | ResolversTypes['RegularFeedItemInformation'] | ResolversTypes['TargetedFeedItemInformation'];
  FeedItemSourceType: FeedItemSourceType;
  FeedItemType: FeedItemType;
  Float: ResolverTypeWrapper<Scalars['Float']>;
  FriendRequestNotification: ResolverTypeWrapper<FriendRequestNotification>;
  FriendRequestResponseNotification: ResolverTypeWrapper<FriendRequestResponseNotification>;
  FriendshipStatus: FriendshipStatus;
  GenerateFandomLinkInput: GenerateFandomLinkInput;
  GenerateFandomLinkPayload: ResolverTypeWrapper<GenerateFandomLinkPayload>;
  GenerateInviteLinkInput: GenerateInviteLinkInput;
  GenerateInviteLinkPayload: ResolverTypeWrapper<GenerateInviteLinkPayload>;
  HighlightsFromCommunityConnection: ResolverTypeWrapper<HighlightsFromCommunityConnection>;
  HighlightsFromCommunityEdge: ResolverTypeWrapper<HighlightsFromCommunityEdge>;
  HomeFeedFandomTile: ResolverTypeWrapper<HomeFeedFandomTile>;
  HomeFeedHighlightedUpdatesSection: ResolverTypeWrapper<Omit<HomeFeedHighlightedUpdatesSection, 'updateTiles'> & { updateTiles: Array<ResolversTypes['HomeFeedTile']> }>;
  HomeFeedPersonalRecommendationSection: ResolverTypeWrapper<HomeFeedPersonalRecommendationSection>;
  HomeFeedSection: ResolversTypes['HomeFeedHighlightedUpdatesSection'] | ResolversTypes['HomeFeedPersonalRecommendationSection'];
  HomeFeedSectionConnection: ResolverTypeWrapper<HomeFeedSectionConnection>;
  HomeFeedSectionEdge: ResolverTypeWrapper<Omit<HomeFeedSectionEdge, 'node'> & { node: ResolversTypes['HomeFeedSection'] }>;
  HomeFeedSectionType: HomeFeedSectionType;
  HomeFeedSectionsFilter: HomeFeedSectionsFilter;
  HomeFeedTile: ResolversTypes['HomeFeedFandomTile'];
  HomeFeedTileBadge: ResolverTypeWrapper<HomeFeedTileBadge>;
  HomeFeedTilesType: HomeFeedTilesType;
  Image: ResolverTypeWrapper<Image>;
  ImageStatus: ImageStatus;
  InboxComposition: ResolversTypes['Comment'] | ResolversTypes['Event'] | ResolversTypes['Poll'] | ResolversTypes['Post'];
  InboxConfiguration: ResolverTypeWrapper<InboxConfiguration>;
  InboxConfigurationInput: InboxConfigurationInput;
  InboxFeedItem: ResolversTypes['Event'] | ResolversTypes['Poll'] | ResolversTypes['Post'];
  InboxNotification: ResolversTypes['BadgeCollectedNotification'] | ResolversTypes['CommentNotification'] | ResolversTypes['FandomAddedAsAdminNotification'] | ResolversTypes['FandomInviteAcceptionNotification'] | ResolversTypes['FandomInviteNotification'] | ResolversTypes['FandomInviteRejectionNotification'] | ResolversTypes['FandomInviteResponseNotification'] | ResolversTypes['FandomJoinRequestAcceptionNotification'] | ResolversTypes['FandomJoinRequestNotification'] | ResolversTypes['FandomJoinRequestRejectionNotification'] | ResolversTypes['FandomJoinRequestResponseNotification'] | ResolversTypes['FandomJoinedNotification'] | ResolversTypes['FandomMentionNotification'] | ResolversTypes['FandomRemovedFromAdminNotification'] | ResolversTypes['FandomShareNotification'] | ResolversTypes['FriendRequestNotification'] | ResolversTypes['FriendRequestResponseNotification'] | ResolversTypes['LikeNotification'] | ResolversTypes['MemberInvitesAllocatedNotification'] | ResolversTypes['ModerationNotification'] | ResolversTypes['NewFriendNotification'] | ResolversTypes['ReportResponseNotification'] | ResolversTypes['UserMentionNotification'];
  InboxNotificationConnection: ResolverTypeWrapper<InboxNotificationConnection>;
  InboxNotificationEdge: ResolverTypeWrapper<InboxNotificationEdge>;
  IngestServer: ResolverTypeWrapper<IngestServer>;
  Int: ResolverTypeWrapper<Scalars['Int']>;
  InviteJoinHiddenFandomInput: InviteJoinHiddenFandomInput;
  InviteJoinHiddenFandomPayload: ResolverTypeWrapper<InviteJoinHiddenFandomPayload>;
  JoinChatInput: JoinChatInput;
  JoinChatPayload: ResolverTypeWrapper<JoinChatPayload>;
  JoinLivestreamInput: JoinLivestreamInput;
  JoinLivestreamPayload: ResolverTypeWrapper<JoinLivestreamPayload>;
  JoinPublicFandomInput: JoinPublicFandomInput;
  JoinPublicFandomPayload: ResolverTypeWrapper<JoinPublicFandomPayload>;
  LeaveFandomInput: LeaveFandomInput;
  LeaveFandomPayload: ResolverTypeWrapper<LeaveFandomPayload>;
  LeaveLivestreamInput: LeaveLivestreamInput;
  LeaveLivestreamPayload: ResolverTypeWrapper<LeaveLivestreamPayload>;
  LikeInformation: ResolverTypeWrapper<LikeInformation>;
  LikeNotification: ResolverTypeWrapper<Omit<LikeNotification, 'composition' | 'feedItem' | 'inReplyTo'> & { composition?: Maybe<ResolversTypes['InboxComposition']>, feedItem?: Maybe<ResolversTypes['InboxFeedItem']>, inReplyTo?: Maybe<ResolversTypes['InboxComposition']> }>;
  LikeReaction: ResolverTypeWrapper<LikeReaction>;
  Livestream: ResolverTypeWrapper<Livestream>;
  LivestreamByAuthenticatedUser: ResolverTypeWrapper<LivestreamByAuthenticatedUser>;
  LivestreamChat: ResolverTypeWrapper<LivestreamChat>;
  LivestreamConnection: ResolverTypeWrapper<LivestreamConnection>;
  LivestreamEdge: ResolverTypeWrapper<LivestreamEdge>;
  LivestreamHealth: LivestreamHealth;
  LivestreamMutationStatus: LivestreamMutationStatus;
  LivestreamQuestion: ResolverTypeWrapper<LivestreamQuestion>;
  LivestreamQuestionEdge: ResolverTypeWrapper<LivestreamQuestionEdge>;
  LivestreamQuestionInput: LivestreamQuestionInput;
  LivestreamQuestionLike: ResolverTypeWrapper<LivestreamQuestionLike>;
  LivestreamQuestionLikeInput: LivestreamQuestionLikeInput;
  LivestreamQuestionLikes: ResolverTypeWrapper<LivestreamQuestionLikes>;
  LivestreamQuestionPayload: ResolverTypeWrapper<LivestreamQuestionPayload>;
  LivestreamQuestions: ResolverTypeWrapper<LivestreamQuestions>;
  LivestreamQuestionsConnection: ResolverTypeWrapper<LivestreamQuestionsConnection>;
  LivestreamState: LivestreamState;
  LivestreamTestDataInput: LivestreamTestDataInput;
  LivestreamTestDataPayload: ResolverTypeWrapper<LivestreamTestDataPayload>;
  LivestreamViewer: ResolverTypeWrapper<LivestreamViewer>;
  LivestreamViewerConnection: ResolverTypeWrapper<LivestreamViewerConnection>;
  LivestreamViewerEdge: ResolverTypeWrapper<LivestreamViewerEdge>;
  Long: ResolverTypeWrapper<Scalars['Long']>;
  MarkInboxNotificationsAsReadInput: MarkInboxNotificationsAsReadInput;
  MarkInboxNotificationsAsReadResult: ResolverTypeWrapper<MarkInboxNotificationsAsReadResult>;
  MarkInboxNotificationsAsSeenInput: MarkInboxNotificationsAsSeenInput;
  MarkInboxNotificationsAsSeenPayload: ResolverTypeWrapper<MarkInboxNotificationsAsSeenPayload>;
  MeaningfulInteractions: ResolverTypeWrapper<MeaningfulInteractions>;
  MemberInviteLink: ResolverTypeWrapper<MemberInviteLink>;
  MemberInvitesAllocatedNotification: ResolverTypeWrapper<MemberInvitesAllocatedNotification>;
  MemberReportByIdInput: MemberReportByIdInput;
  MemberReportPayload: ResolverTypeWrapper<MemberReportPayload>;
  ModerationAppealInfo: ResolverTypeWrapper<ModerationAppealInfo>;
  ModerationAppealInfoInput: ModerationAppealInfoInput;
  ModerationCountersFilter: ModerationCountersFilter;
  ModerationCountersPayload: ResolverTypeWrapper<ModerationCountersPayload>;
  ModerationDecision: ModerationDecision;
  ModerationEntity: ResolversTypes['CommentModerationInfo'] | ResolversTypes['EventModerationInfo'] | ResolversTypes['PollModerationInfo'] | ResolversTypes['PostModerationInfo'] | ResolversTypes['UserModerationInfo'];
  ModerationJob: ResolverTypeWrapper<Omit<ModerationJob, 'appealInfo' | 'entity' | 'history'> & { appealInfo?: Maybe<ResolversTypes['AppealInfo']>, entity?: Maybe<ResolversTypes['ModerationEntity']>, history?: Maybe<Array<ResolversTypes['ModerationJobEvent']>> }>;
  ModerationJobAppealedEvent: ResolverTypeWrapper<ModerationJobAppealedEvent>;
  ModerationJobAutoEscalatedEvent: ResolverTypeWrapper<ModerationJobAutoEscalatedEvent>;
  ModerationJobContentUpdatedEvent: ResolverTypeWrapper<ModerationJobContentUpdatedEvent>;
  ModerationJobEdge: ResolverTypeWrapper<ModerationJobEdge>;
  ModerationJobEscalatedEvent: ResolverTypeWrapper<ModerationJobEscalatedEvent>;
  ModerationJobEvent: ResolversTypes['ModerationJobAppealedEvent'] | ResolversTypes['ModerationJobAutoEscalatedEvent'] | ResolversTypes['ModerationJobContentUpdatedEvent'] | ResolversTypes['ModerationJobEscalatedEvent'] | ResolversTypes['ModerationJobHiddenEvent'] | ResolversTypes['ModerationJobKeptEvent'] | ResolversTypes['ModerationJobReportedEvent'] | ResolversTypes['ModerationJobUserProfileResetEvent'] | ResolversTypes['ModerationJobUserReviewedEvent'] | ResolversTypes['ModerationJobUserSuspendedEvent'] | ResolversTypes['ModerationJobUserUnsuspendedEvent'];
  ModerationJobHiddenEvent: ResolverTypeWrapper<Omit<ModerationJobHiddenEvent, 'appealInfo'> & { appealInfo?: Maybe<ResolversTypes['AppealInfo']> }>;
  ModerationJobKeptEvent: ResolverTypeWrapper<Omit<ModerationJobKeptEvent, 'appealInfo'> & { appealInfo?: Maybe<ResolversTypes['AppealInfo']> }>;
  ModerationJobReportedEvent: ResolverTypeWrapper<ModerationJobReportedEvent>;
  ModerationJobUserProfileResetEvent: ResolverTypeWrapper<Omit<ModerationJobUserProfileResetEvent, 'appealInfo'> & { appealInfo?: Maybe<ResolversTypes['AppealInfo']> }>;
  ModerationJobUserReviewedEvent: ResolverTypeWrapper<Omit<ModerationJobUserReviewedEvent, 'appealInfo'> & { appealInfo?: Maybe<ResolversTypes['AppealInfo']> }>;
  ModerationJobUserSuspendedEvent: ResolverTypeWrapper<Omit<ModerationJobUserSuspendedEvent, 'appealInfo'> & { appealInfo?: Maybe<ResolversTypes['AppealInfo']> }>;
  ModerationJobUserUnsuspendedEvent: ResolverTypeWrapper<ModerationJobUserUnsuspendedEvent>;
  ModerationJobsConnection: ResolverTypeWrapper<ModerationJobsConnection>;
  ModerationJobsCountersPayload: ResolverTypeWrapper<ModerationJobsCountersPayload>;
  ModerationJobsFilter: ModerationJobsFilter;
  ModerationNotification: ResolverTypeWrapper<Omit<ModerationNotification, 'composition' | 'feedItem' | 'inReplyTo'> & { composition?: Maybe<ResolversTypes['InboxComposition']>, feedItem?: Maybe<ResolversTypes['InboxFeedItem']>, inReplyTo?: Maybe<ResolversTypes['InboxComposition']> }>;
  ModerationStatus: ModerationStatus;
  ModerationStatusPayload: ResolverTypeWrapper<ModerationStatusPayload>;
  ModeratorType: ModeratorType;
  Mutation: ResolverTypeWrapper<{}>;
  MutedFandoms: ResolverTypeWrapper<MutedFandoms>;
  MutedFandomsInput: MutedFandomsInput;
  MyFandomSearchConnection: ResolverTypeWrapper<MyFandomSearchConnection>;
  MyFandomSearchEdge: ResolverTypeWrapper<MyFandomSearchEdge>;
  NewFriendNotification: ResolverTypeWrapper<NewFriendNotification>;
  NotifyOn: ResolverTypeWrapper<NotifyOn>;
  NotifyOnInput: NotifyOnInput;
  OnlineSegment: OnlineSegment;
  OnlineSegmentAudienceFilter: ResolverTypeWrapper<OnlineSegmentAudienceFilter>;
  OnlineSegmentAudienceFilterInput: OnlineSegmentAudienceFilterInput;
  PageInfo: ResolverTypeWrapper<PageInfo>;
  PaginationInput: PaginationInput;
  ParentInput: ParentInput;
  ParentType: ParentType;
  Personal: ResolverTypeWrapper<Personal>;
  PersonalInput: PersonalInput;
  PinContentInput: PinContentInput;
  PinContentPayload: ResolverTypeWrapper<Omit<PinContentPayload, 'content'> & { content?: Maybe<ResolversTypes['PinnedContent']> }>;
  PinnedContent: ResolversTypes['Event'] | ResolversTypes['Poll'] | ResolversTypes['Post'];
  PinnedFeedItemInformation: ResolverTypeWrapper<PinnedFeedItemInformation>;
  PlatformMemberRole: PlatformMemberRole;
  Poll: ResolverTypeWrapper<Poll>;
  PollInteractions: ResolverTypeWrapper<PollInteractions>;
  PollModerationInfo: ResolverTypeWrapper<PollModerationInfo>;
  PollOption: ResolverTypeWrapper<PollOption>;
  Post: ResolverTypeWrapper<Omit<Post, 'attachments'> & { attachments: Array<Maybe<ResolversTypes['PostAttachment']>> }>;
  PostAttachment: ResolversTypes['Image'] | ResolversTypes['Video'];
  PostModerationInfo: ResolverTypeWrapper<PostModerationInfo>;
  PostSearchConnection: ResolverTypeWrapper<PostSearchConnection>;
  PostSearchEdge: ResolverTypeWrapper<PostSearchEdge>;
  PostSearchWithFilterConnection: ResolverTypeWrapper<PostSearchWithFilterConnection>;
  PostSearchWithFilterEdge: ResolverTypeWrapper<PostSearchWithFilterEdge>;
  PostStatus: PostStatus;
  PostType: PostType;
  PreSignedUrl: ResolverTypeWrapper<PreSignedUrl>;
  PrivateChat: ResolverTypeWrapper<PrivateChat>;
  Product: ResolverTypeWrapper<Product>;
  ProductConnection: ResolverTypeWrapper<ProductConnection>;
  ProductEdge: ResolverTypeWrapper<ProductEdge>;
  ProductStatus: ProductStatus;
  ProductType: ProductType;
  ProfileVisibility: ProfileVisibility;
  QualityContent: ResolverTypeWrapper<QualityContent>;
  Query: ResolverTypeWrapper<{}>;
  QuestionIdInput: QuestionIdInput;
  Reactable: ResolversTypes['Comment'] | ResolversTypes['Event'] | ResolversTypes['Poll'] | ResolversTypes['Post'];
  ReactableType: ReactableType;
  Reaction: ResolverTypeWrapper<Omit<Reaction, 'reactable'> & { reactable?: Maybe<ResolversTypes['Reactable']> }>;
  ReactionConnection: ResolverTypeWrapper<ReactionConnection>;
  ReactionEdge: ResolverTypeWrapper<ReactionEdge>;
  RecommendedFeedItemInformation: ResolverTypeWrapper<RecommendedFeedItemInformation>;
  RegisterPushNotificationTokenInput: RegisterPushNotificationTokenInput;
  RegisterPushNotificationTokenPayload: ResolverTypeWrapper<RegisterPushNotificationTokenPayload>;
  RegularFeedItemInformation: ResolverTypeWrapper<RegularFeedItemInformation>;
  RejectFriendRequestInput: RejectFriendRequestInput;
  RejectFriendRequestPayload: ResolverTypeWrapper<RejectFriendRequestPayload>;
  RejectJoinHiddenFandomInput: RejectJoinHiddenFandomInput;
  RejectJoinHiddenFandomPayload: ResolverTypeWrapper<RejectJoinHiddenFandomPayload>;
  RejectJoinPrivateFandomInput: RejectJoinPrivateFandomInput;
  RejectJoinPrivateFandomPayload: ResolverTypeWrapper<RejectJoinPrivateFandomPayload>;
  RemoveFandomAdminInput: RemoveFandomAdminInput;
  RemoveFandomAdminPayload: ResolverTypeWrapper<RemoveFandomAdminPayload>;
  RemoveFandomMemberInput: RemoveFandomMemberInput;
  RemoveFandomMemberPayload: ResolverTypeWrapper<RemoveFandomMemberPayload>;
  RemovePlatformMemberRoleInput: RemovePlatformMemberRoleInput;
  RemovePlatformMemberRolePayload: ResolverTypeWrapper<RemovePlatformMemberRolePayload>;
  ReportCount: ResolverTypeWrapper<ReportCount>;
  ReportEntityByMemberInput: ReportEntityByMemberInput;
  ReportEntityByMemberPayload: ResolverTypeWrapper<ReportEntityByMemberPayload>;
  ReportInfo: ResolverTypeWrapper<ReportInfo>;
  ReportNote: ResolverTypeWrapper<ReportNote>;
  ReportNoteConnection: ResolverTypeWrapper<ReportNoteConnection>;
  ReportNoteEdge: ResolverTypeWrapper<ReportNoteEdge>;
  ReportResponseNotification: ResolverTypeWrapper<Omit<ReportResponseNotification, 'composition' | 'feedItem' | 'inReplyTo'> & { composition?: Maybe<ResolversTypes['InboxComposition']>, feedItem?: Maybe<ResolversTypes['InboxFeedItem']>, inReplyTo?: Maybe<ResolversTypes['InboxComposition']> }>;
  ReportUserInput: ReportUserInput;
  ReportUserPayload: ResolverTypeWrapper<ReportUserPayload>;
  ReportersAppealInfo: ResolverTypeWrapper<ReportersAppealInfo>;
  ReputationScoreAudienceFilter: ResolverTypeWrapper<ReputationScoreAudienceFilter>;
  ReputationScoreAudienceFilterInput: ReputationScoreAudienceFilterInput;
  RequestJoinPrivateFandomInput: RequestJoinPrivateFandomInput;
  RequestJoinPrivateFandomPayload: ResolverTypeWrapper<RequestJoinPrivateFandomPayload>;
  ResetUserProfileInput: ResetUserProfileInput;
  ResetUserProfilePayload: ResolverTypeWrapper<ResetUserProfilePayload>;
  ReviewAiLabelsInput: ReviewAiLabelsInput;
  ReviewAiLabelsPayload: ResolverTypeWrapper<ReviewAiLabelsPayload>;
  ReviewUserModerationJobInput: ReviewUserModerationJobInput;
  ReviewUserModerationJobPayload: ResolverTypeWrapper<ReviewUserModerationJobPayload>;
  RuleInput: RuleInput;
  ScoreComponents: ResolverTypeWrapper<ScoreComponents>;
  ShareFandomInput: ShareFandomInput;
  ShareFandomPayload: ResolverTypeWrapper<ShareFandomPayload>;
  StartFandomChatInput: StartFandomChatInput;
  StartFandomChatPayload: ResolverTypeWrapper<StartFandomChatPayload>;
  StartLivestreamChatInput: StartLivestreamChatInput;
  StartLivestreamChatPayload: ResolverTypeWrapper<StartLivestreamChatPayload>;
  StartLivestreamInput: StartLivestreamInput;
  StartLivestreamPayload: ResolverTypeWrapper<StartLivestreamPayload>;
  StartPrivateChatInput: StartPrivateChatInput;
  StartPrivateChatPayload: ResolverTypeWrapper<StartPrivateChatPayload>;
  StopLivestreamInput: StopLivestreamInput;
  StopLivestreamPayload: ResolverTypeWrapper<StopLivestreamPayload>;
  StopLivestreamReason: StopLivestreamReason;
  Store: ResolverTypeWrapper<Store>;
  StoreMutationStatus: StoreMutationStatus;
  StorePayload: ResolverTypeWrapper<StorePayload>;
  StoreStatus: StoreStatus;
  String: ResolverTypeWrapper<Scalars['String']>;
  SupportedFileTypes: SupportedFileTypes;
  SupportedVideoFileTypes: SupportedVideoFileTypes;
  SuspendUserInput: SuspendUserInput;
  SuspendUserPayload: ResolverTypeWrapper<SuspendUserPayload>;
  TargetedFeedItemInformation: ResolverTypeWrapper<TargetedFeedItemInformation>;
  TopParentEntity: ResolversTypes['Event'] | ResolversTypes['Poll'] | ResolversTypes['Post'];
  TransactionType: TransactionType;
  TriggerSpecification: ResolverTypeWrapper<TriggerSpecification>;
  TriggerSpecificationInput: TriggerSpecificationInput;
  UndoFriendshipRequestInput: UndoFriendshipRequestInput;
  UndoFriendshipRequestPayload: ResolverTypeWrapper<UndoFriendshipRequestPayload>;
  UnlikeReactionInput: UnlikeReactionInput;
  UnlikeReactionPayload: ResolverTypeWrapper<UnlikeReactionPayload>;
  UnpinContentInput: UnpinContentInput;
  UnpinContentPayload: ResolverTypeWrapper<Omit<UnpinContentPayload, 'content'> & { content?: Maybe<ResolversTypes['PinnedContent']> }>;
  UnregisterPushNotificationTokenInput: UnregisterPushNotificationTokenInput;
  UnregisterPushNotificationTokenPayload: ResolverTypeWrapper<UnregisterPushNotificationTokenPayload>;
  UpdateCampaignInput: UpdateCampaignInput;
  UpdateCampaignPayload: ResolverTypeWrapper<UpdateCampaignPayload>;
  UpdateCommentInput: UpdateCommentInput;
  UpdateCommentPayload: ResolverTypeWrapper<UpdateCommentPayload>;
  UpdateEventInput: UpdateEventInput;
  UpdateEventPartialInput: UpdateEventPartialInput;
  UpdateEventPartialPayload: ResolverTypeWrapper<UpdateEventPartialPayload>;
  UpdateEventPayload: ResolverTypeWrapper<UpdateEventPayload>;
  UpdateFandomInput: UpdateFandomInput;
  UpdateFandomPayload: ResolverTypeWrapper<UpdateFandomPayload>;
  UpdatePostInput: UpdatePostInput;
  UpdatePostPayload: ResolverTypeWrapper<UpdatePostPayload>;
  UpdateProductInput: UpdateProductInput;
  UpdateProductPayload: ResolverTypeWrapper<UpdateProductPayload>;
  UpdateProductStatusInput: UpdateProductStatusInput;
  UpdateStoreInput: UpdateStoreInput;
  UpdateStorePayload: ResolverTypeWrapper<UpdateStorePayload>;
  UpdateUserProfileInput: UpdateUserProfileInput;
  UpdateUserProfilePayload: ResolverTypeWrapper<UpdateUserProfilePayload>;
  UpdateVariantInput: UpdateVariantInput;
  UpdateVariantLabelInput: UpdateVariantLabelInput;
  UpdateVariantPayload: ResolverTypeWrapper<UpdateVariantPayload>;
  UploadImage: ResolverTypeWrapper<UploadImage>;
  UploadImageInput: UploadImageInput;
  UploadVideoInput: UploadVideoInput;
  UploadVideoPayload: ResolverTypeWrapper<UploadVideoPayload>;
  User: ResolverTypeWrapper<User>;
  UserConnection: ResolverTypeWrapper<UserConnection>;
  UserEdge: ResolverTypeWrapper<UserEdge>;
  UserEventReply: UserEventReply;
  UserEventResponseInput: UserEventResponseInput;
  UserEventResponsePayload: ResolverTypeWrapper<UserEventResponsePayload>;
  UserMentionNotification: ResolverTypeWrapper<Omit<UserMentionNotification, 'composition' | 'feedItem' | 'inReplyTo'> & { composition?: Maybe<ResolversTypes['InboxComposition']>, feedItem?: Maybe<ResolversTypes['InboxFeedItem']>, inReplyTo?: Maybe<ResolversTypes['InboxComposition']> }>;
  UserModerationInfo: ResolverTypeWrapper<UserModerationInfo>;
  UserSearchConnection: ResolverTypeWrapper<UserSearchConnection>;
  UserSearchEdge: ResolverTypeWrapper<UserSearchEdge>;
  UserSuggestionConnection: ResolverTypeWrapper<UserSuggestionConnection>;
  UserSuggestionEdge: ResolverTypeWrapper<UserSuggestionEdge>;
  Variant: ResolverTypeWrapper<Variant>;
  VariantAttribute: ResolverTypeWrapper<VariantAttribute>;
  VariantAttributeInput: VariantAttributeInput;
  VariantConnection: ResolverTypeWrapper<VariantConnection>;
  VariantEdge: ResolverTypeWrapper<VariantEdge>;
  VariantLabel: VariantLabel;
  Video: ResolverTypeWrapper<Video>;
  VideoStatus: VideoStatus;
  VideoUploadInput: VideoUploadInput;
  Viewers: ResolverTypeWrapper<Viewers>;
  Wallet: ResolverTypeWrapper<Wallet>;
  WalletByDate: ResolverTypeWrapper<WalletByDate>;
  WalletByDateConnection: ResolverTypeWrapper<WalletByDateConnection>;
  WalletByDateEdge: ResolverTypeWrapper<WalletByDateEdge>;
  WalletByFandom: ResolverTypeWrapper<WalletByFandom>;
  WalletByFandomConnection: ResolverTypeWrapper<WalletByFandomConnection>;
  WalletByFandomEdge: ResolverTypeWrapper<WalletByFandomEdge>;
  WalletMetadata: ResolverTypeWrapper<WalletMetadata>;
  WalletTransaction: ResolverTypeWrapper<WalletTransaction>;
  WalletTransactionConnection: ResolverTypeWrapper<WalletTransactionConnection>;
  WalletTransactionEdge: ResolverTypeWrapper<WalletTransactionEdge>;
  WebsocketChannel: ResolverTypeWrapper<WebsocketChannel>;
  WebsocketChannelMessageType: WebsocketChannelMessageType;
  WebsocketEntityType: WebsocketEntityType;
  WebsocketEvent: ResolverTypeWrapper<WebsocketEvent>;
  WebsocketEventType: WebsocketEventType;
  WebsocketPresence: ResolverTypeWrapper<WebsocketPresence>;
  ZonedDateTime: ResolverTypeWrapper<Scalars['ZonedDateTime']>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  AcceptFriendRequestInput: AcceptFriendRequestInput;
  AcceptFriendRequestPayload: AcceptFriendRequestPayload;
  AcceptJoinHiddenFandomInput: AcceptJoinHiddenFandomInput;
  AcceptJoinHiddenFandomPayload: AcceptJoinHiddenFandomPayload;
  AcknowledgeInboxNotificationsInput: AcknowledgeInboxNotificationsInput;
  AcknowledgeInboxNotificationsPayload: AcknowledgeInboxNotificationsPayload;
  AddFandomAdminInput: AddFandomAdminInput;
  AddFandomAdminPayload: AddFandomAdminPayload;
  AddPlatformMemberRoleInput: AddPlatformMemberRoleInput;
  AddPlatformMemberRolePayload: AddPlatformMemberRolePayload;
  Administrator: Administrator;
  AdministratorInput: AdministratorInput;
  AiLabel: AiLabel;
  AiLabelsInput: AiLabelsInput;
  AiReport: AiReport;
  AllFandomMemberReputationsInput: AllFandomMemberReputationsInput;
  AppealInfo: ResolversParentTypes['CreatorAppealInfo'] | ResolversParentTypes['ReportersAppealInfo'];
  AppealModerationJobInput: AppealModerationJobInput;
  AppealModerationJobPayload: AppealModerationJobPayload;
  AppealNote: AppealNote;
  AppealNoteConnection: AppealNoteConnection;
  AppealNoteEdge: AppealNoteEdge;
  ApproveJoinPrivateFandomInput: ApproveJoinPrivateFandomInput;
  ApproveJoinPrivateFandomPayload: ApproveJoinPrivateFandomPayload;
  AttachmentInput: AttachmentInput;
  AttributeSummaryItem: AttributeSummaryItem;
  AttributeSummaryItemInput: AttributeSummaryItemInput;
  AudienceSpecification: AudienceSpecification;
  AudienceSpecificationInput: AudienceSpecificationInput;
  Badge: Badge;
  BadgeCollectedNotification: BadgeCollectedNotification;
  BadgeConnection: BadgeConnection;
  BadgeEdge: BadgeEdge;
  BigInteger: Scalars['BigInteger'];
  Boolean: Scalars['Boolean'];
  Campaign: Omit<Campaign, 'item'> & { item?: Maybe<ResolversParentTypes['CampaignItemContent']> };
  CampaignConnection: CampaignConnection;
  CampaignEdge: CampaignEdge;
  CampaignItemContent: ResolversParentTypes['Event'] | ResolversParentTypes['Poll'] | ResolversParentTypes['Post'];
  CampaignItemInput: CampaignItemInput;
  CampaignSpecification: CampaignSpecification;
  CampaignSpecificationInput: CampaignSpecificationInput;
  CancelJoinHiddenFandomInput: CancelJoinHiddenFandomInput;
  CancelJoinHiddenFandomPayload: CancelJoinHiddenFandomPayload;
  CancelJoinPrivateFandomInput: CancelJoinPrivateFandomInput;
  CancelJoinPrivateFandomPayload: CancelJoinPrivateFandomPayload;
  CastVoteInput: CastVoteInput;
  CastVotePayload: CastVotePayload;
  ChangeModerationStatusInput: ChangeModerationStatusInput;
  Chat: Chat;
  ChatChannel: ChatChannel;
  ChatContext: ChatContext;
  ChatToken: ChatToken;
  Comment: Omit<Comment, 'attachment' | 'parent'> & { attachment?: Maybe<ResolversParentTypes['CommentAttachment']>, parent?: Maybe<ResolversParentTypes['CommentParent']> };
  CommentAttachment: ResolversParentTypes['Image'] | ResolversParentTypes['Video'];
  CommentAttachmentInput: CommentAttachmentInput;
  CommentConnection: CommentConnection;
  CommentEdge: CommentEdge;
  CommentModerationInfo: Omit<CommentModerationInfo, 'topParent'> & { topParent?: Maybe<ResolversParentTypes['TopParentEntity']> };
  CommentNotification: Omit<CommentNotification, 'feedItem' | 'inReplyTo'> & { feedItem?: Maybe<ResolversParentTypes['InboxFeedItem']>, inReplyTo?: Maybe<ResolversParentTypes['InboxComposition']> };
  CommentParent: ResolversParentTypes['Comment'] | ResolversParentTypes['Event'] | ResolversParentTypes['Poll'] | ResolversParentTypes['Post'];
  CommunityRecommendedHighlights: CommunityRecommendedHighlights;
  ConnectEventChatInput: ConnectEventChatInput;
  ConnectEventChatPayload: ConnectEventChatPayload;
  ConnectFandomChatPayload: ConnectFandomChatPayload;
  ContentSearchConnection: ContentSearchConnection;
  ContentSearchEdge: Omit<ContentSearchEdge, 'node'> & { node?: Maybe<ResolversParentTypes['ContentSearchNode']> };
  ContentSearchNode: ResolversParentTypes['Event'] | ResolversParentTypes['Poll'] | ResolversParentTypes['Post'];
  CreateCampaignInput: CreateCampaignInput;
  CreateCampaignPayload: CreateCampaignPayload;
  CreateCommentInput: CreateCommentInput;
  CreateCommentPayload: CreateCommentPayload;
  CreateEventInput: CreateEventInput;
  CreateEventPayload: CreateEventPayload;
  CreateFandomInput: CreateFandomInput;
  CreateFandomPayload: CreateFandomPayload;
  CreateFriendRequestInput: CreateFriendRequestInput;
  CreateFriendRequestPayload: CreateFriendRequestPayload;
  CreateLikeReactionInput: CreateLikeReactionInput;
  CreateLikeReactionPayload: CreateLikeReactionPayload;
  CreatePollInput: CreatePollInput;
  CreatePollPayload: CreatePollPayload;
  CreatePostInput: CreatePostInput;
  CreatePostPayload: CreatePostPayload;
  CreateProductInput: CreateProductInput;
  CreateProductPayload: CreateProductPayload;
  CreateStoreInput: CreateStoreInput;
  CreateStorePayload: CreateStorePayload;
  CreateVariantInput: CreateVariantInput;
  CreateVariantPayload: CreateVariantPayload;
  CreatorAppealInfo: CreatorAppealInfo;
  Date: Scalars['Date'];
  DateTime: Scalars['DateTime'];
  DeleteCampaignInput: DeleteCampaignInput;
  DeleteCampaignPayload: DeleteCampaignPayload;
  DeleteCommentInput: DeleteCommentInput;
  DeleteCommentPayload: DeleteCommentPayload;
  DeleteEventInput: DeleteEventInput;
  DeleteEventPayload: DeleteEventPayload;
  DeleteFriendshipInput: DeleteFriendshipInput;
  DeleteFriendshipPayload: DeleteFriendshipPayload;
  DeleteLikeReactionInput: DeleteLikeReactionInput;
  DeleteLikeReactionPayload: DeleteLikeReactionPayload;
  DeletePollInput: DeletePollInput;
  DeletePollPayload: DeletePollPayload;
  DeletePostInput: DeletePostInput;
  DeletePostPayload: DeletePostPayload;
  DeleteProductInput: DeleteProductInput;
  DeleteProductPayload: DeleteProductPayload;
  DeleteUserInput: DeleteUserInput;
  DeleteUserPayload: DeleteUserPayload;
  DeleteVariantInput: DeleteVariantInput;
  DeleteVariantPayload: DeleteVariantPayload;
  DeliverySpecification: DeliverySpecification;
  DeliverySpecificationInput: DeliverySpecificationInput;
  Duration: Scalars['Duration'];
  EndFandomChatInput: EndFandomChatInput;
  EndFandomChatPayload: EndFandomChatPayload;
  EntityError: EntityError;
  ErrorItem: ErrorItem;
  EscalateModerationJobInput: EscalateModerationJobInput;
  EscalateModerationJobPayload: EscalateModerationJobPayload;
  Event: Omit<Event, 'attachments'> & { attachments: Array<Maybe<ResolversParentTypes['EventAttachment']>> };
  EventAttachment: ResolversParentTypes['Image'] | ResolversParentTypes['Video'];
  EventAttachmentInput: EventAttachmentInput;
  EventChat: EventChat;
  EventInteractions: EventInteractions;
  EventLocation: EventLocation;
  EventLocationInput: EventLocationInput;
  EventModerationInfo: EventModerationInfo;
  EventPartialContentInput: EventPartialContentInput;
  EventPartialDisplayNameInput: EventPartialDisplayNameInput;
  EventPartialEndTimeInput: EventPartialEndTimeInput;
  EventPartialLocationInput: EventPartialLocationInput;
  EventPartialStartTimeInput: EventPartialStartTimeInput;
  EventPartialTicketUrlInput: EventPartialTicketUrlInput;
  EventPartialTitleInput: EventPartialTitleInput;
  EventPartialVisibleAtInput: EventPartialVisibleAtInput;
  Fandom: Fandom;
  FandomAddedAsAdminNotification: FandomAddedAsAdminNotification;
  FandomChat: FandomChat;
  FandomConnection: FandomConnection;
  FandomEdge: FandomEdge;
  FandomInviteAcceptionNotification: FandomInviteAcceptionNotification;
  FandomInviteNotification: FandomInviteNotification;
  FandomInviteRejectionNotification: FandomInviteRejectionNotification;
  FandomInviteResponseNotification: FandomInviteResponseNotification;
  FandomJoinRequestAcceptionNotification: FandomJoinRequestAcceptionNotification;
  FandomJoinRequestNotification: FandomJoinRequestNotification;
  FandomJoinRequestRejectionNotification: FandomJoinRequestRejectionNotification;
  FandomJoinRequestResponseNotification: FandomJoinRequestResponseNotification;
  FandomJoinedNotification: FandomJoinedNotification;
  FandomJoinedSinceTriggerFilter: FandomJoinedSinceTriggerFilter;
  FandomJoinedSinceTriggerFilterInput: FandomJoinedSinceTriggerFilterInput;
  FandomJoinedTriggerFilter: FandomJoinedTriggerFilter;
  FandomJoinedTriggerFilterInput: FandomJoinedTriggerFilterInput;
  FandomMember: FandomMember;
  FandomMemberConnection: FandomMemberConnection;
  FandomMemberEdge: FandomMemberEdge;
  FandomMemberReputation: FandomMemberReputation;
  FandomMemberReputationConnection: FandomMemberReputationConnection;
  FandomMemberReputationConnectionV2: FandomMemberReputationConnectionV2;
  FandomMemberReputationEdge: FandomMemberReputationEdge;
  FandomMemberReputationEdgeV2: FandomMemberReputationEdgeV2;
  FandomMemberReputationHistoryInput: FandomMemberReputationHistoryInput;
  FandomMemberReputationInput: FandomMemberReputationInput;
  FandomMemberReputationV2: FandomMemberReputationV2;
  FandomMentionNotification: Omit<FandomMentionNotification, 'composition' | 'feedItem' | 'inReplyTo'> & { composition?: Maybe<ResolversParentTypes['InboxComposition']>, feedItem?: Maybe<ResolversParentTypes['InboxFeedItem']>, inReplyTo?: Maybe<ResolversParentTypes['InboxComposition']> };
  FandomRemovedFromAdminNotification: FandomRemovedFromAdminNotification;
  FandomReputation: FandomReputation;
  FandomReputationConnection: FandomReputationConnection;
  FandomReputationEdge: FandomReputationEdge;
  FandomReputationHistoryInput: FandomReputationHistoryInput;
  FandomReputationInput: FandomReputationInput;
  FandomRule: FandomRule;
  FandomSearchConnection: FandomSearchConnection;
  FandomSearchEdge: FandomSearchEdge;
  FandomShareNotification: FandomShareNotification;
  FandomSuggestionConnection: FandomSuggestionConnection;
  FandomSuggestionEdge: FandomSuggestionEdge;
  FandomTheme: FandomTheme;
  FandomVisitedTriggerFilter: FandomVisitedTriggerFilter;
  FandomVisitedTriggerFilterInput: FandomVisitedTriggerFilterInput;
  FeedFilter: FeedFilter;
  FeedItem: Omit<FeedItem, 'content' | 'sourceInformation'> & { content?: Maybe<ResolversParentTypes['FeedItemContent']>, sourceInformation: ResolversParentTypes['FeedItemSourceInformation'] };
  FeedItemConnection: FeedItemConnection;
  FeedItemContent: ResolversParentTypes['Event'] | ResolversParentTypes['Livestream'] | ResolversParentTypes['Poll'] | ResolversParentTypes['Post'];
  FeedItemEdge: FeedItemEdge;
  FeedItemSourceInformation: ResolversParentTypes['PinnedFeedItemInformation'] | ResolversParentTypes['RecommendedFeedItemInformation'] | ResolversParentTypes['RegularFeedItemInformation'] | ResolversParentTypes['TargetedFeedItemInformation'];
  Float: Scalars['Float'];
  FriendRequestNotification: FriendRequestNotification;
  FriendRequestResponseNotification: FriendRequestResponseNotification;
  GenerateFandomLinkInput: GenerateFandomLinkInput;
  GenerateFandomLinkPayload: GenerateFandomLinkPayload;
  GenerateInviteLinkInput: GenerateInviteLinkInput;
  GenerateInviteLinkPayload: GenerateInviteLinkPayload;
  HighlightsFromCommunityConnection: HighlightsFromCommunityConnection;
  HighlightsFromCommunityEdge: HighlightsFromCommunityEdge;
  HomeFeedFandomTile: HomeFeedFandomTile;
  HomeFeedHighlightedUpdatesSection: Omit<HomeFeedHighlightedUpdatesSection, 'updateTiles'> & { updateTiles: Array<ResolversParentTypes['HomeFeedTile']> };
  HomeFeedPersonalRecommendationSection: HomeFeedPersonalRecommendationSection;
  HomeFeedSection: ResolversParentTypes['HomeFeedHighlightedUpdatesSection'] | ResolversParentTypes['HomeFeedPersonalRecommendationSection'];
  HomeFeedSectionConnection: HomeFeedSectionConnection;
  HomeFeedSectionEdge: Omit<HomeFeedSectionEdge, 'node'> & { node: ResolversParentTypes['HomeFeedSection'] };
  HomeFeedSectionsFilter: HomeFeedSectionsFilter;
  HomeFeedTile: ResolversParentTypes['HomeFeedFandomTile'];
  HomeFeedTileBadge: HomeFeedTileBadge;
  Image: Image;
  InboxComposition: ResolversParentTypes['Comment'] | ResolversParentTypes['Event'] | ResolversParentTypes['Poll'] | ResolversParentTypes['Post'];
  InboxConfiguration: InboxConfiguration;
  InboxConfigurationInput: InboxConfigurationInput;
  InboxFeedItem: ResolversParentTypes['Event'] | ResolversParentTypes['Poll'] | ResolversParentTypes['Post'];
  InboxNotification: ResolversParentTypes['BadgeCollectedNotification'] | ResolversParentTypes['CommentNotification'] | ResolversParentTypes['FandomAddedAsAdminNotification'] | ResolversParentTypes['FandomInviteAcceptionNotification'] | ResolversParentTypes['FandomInviteNotification'] | ResolversParentTypes['FandomInviteRejectionNotification'] | ResolversParentTypes['FandomInviteResponseNotification'] | ResolversParentTypes['FandomJoinRequestAcceptionNotification'] | ResolversParentTypes['FandomJoinRequestNotification'] | ResolversParentTypes['FandomJoinRequestRejectionNotification'] | ResolversParentTypes['FandomJoinRequestResponseNotification'] | ResolversParentTypes['FandomJoinedNotification'] | ResolversParentTypes['FandomMentionNotification'] | ResolversParentTypes['FandomRemovedFromAdminNotification'] | ResolversParentTypes['FandomShareNotification'] | ResolversParentTypes['FriendRequestNotification'] | ResolversParentTypes['FriendRequestResponseNotification'] | ResolversParentTypes['LikeNotification'] | ResolversParentTypes['MemberInvitesAllocatedNotification'] | ResolversParentTypes['ModerationNotification'] | ResolversParentTypes['NewFriendNotification'] | ResolversParentTypes['ReportResponseNotification'] | ResolversParentTypes['UserMentionNotification'];
  InboxNotificationConnection: InboxNotificationConnection;
  InboxNotificationEdge: InboxNotificationEdge;
  IngestServer: IngestServer;
  Int: Scalars['Int'];
  InviteJoinHiddenFandomInput: InviteJoinHiddenFandomInput;
  InviteJoinHiddenFandomPayload: InviteJoinHiddenFandomPayload;
  JoinChatInput: JoinChatInput;
  JoinChatPayload: JoinChatPayload;
  JoinLivestreamInput: JoinLivestreamInput;
  JoinLivestreamPayload: JoinLivestreamPayload;
  JoinPublicFandomInput: JoinPublicFandomInput;
  JoinPublicFandomPayload: JoinPublicFandomPayload;
  LeaveFandomInput: LeaveFandomInput;
  LeaveFandomPayload: LeaveFandomPayload;
  LeaveLivestreamInput: LeaveLivestreamInput;
  LeaveLivestreamPayload: LeaveLivestreamPayload;
  LikeInformation: LikeInformation;
  LikeNotification: Omit<LikeNotification, 'composition' | 'feedItem' | 'inReplyTo'> & { composition?: Maybe<ResolversParentTypes['InboxComposition']>, feedItem?: Maybe<ResolversParentTypes['InboxFeedItem']>, inReplyTo?: Maybe<ResolversParentTypes['InboxComposition']> };
  LikeReaction: LikeReaction;
  Livestream: Livestream;
  LivestreamByAuthenticatedUser: LivestreamByAuthenticatedUser;
  LivestreamChat: LivestreamChat;
  LivestreamConnection: LivestreamConnection;
  LivestreamEdge: LivestreamEdge;
  LivestreamQuestion: LivestreamQuestion;
  LivestreamQuestionEdge: LivestreamQuestionEdge;
  LivestreamQuestionInput: LivestreamQuestionInput;
  LivestreamQuestionLike: LivestreamQuestionLike;
  LivestreamQuestionLikeInput: LivestreamQuestionLikeInput;
  LivestreamQuestionLikes: LivestreamQuestionLikes;
  LivestreamQuestionPayload: LivestreamQuestionPayload;
  LivestreamQuestions: LivestreamQuestions;
  LivestreamQuestionsConnection: LivestreamQuestionsConnection;
  LivestreamTestDataInput: LivestreamTestDataInput;
  LivestreamTestDataPayload: LivestreamTestDataPayload;
  LivestreamViewer: LivestreamViewer;
  LivestreamViewerConnection: LivestreamViewerConnection;
  LivestreamViewerEdge: LivestreamViewerEdge;
  Long: Scalars['Long'];
  MarkInboxNotificationsAsReadInput: MarkInboxNotificationsAsReadInput;
  MarkInboxNotificationsAsReadResult: MarkInboxNotificationsAsReadResult;
  MarkInboxNotificationsAsSeenInput: MarkInboxNotificationsAsSeenInput;
  MarkInboxNotificationsAsSeenPayload: MarkInboxNotificationsAsSeenPayload;
  MeaningfulInteractions: MeaningfulInteractions;
  MemberInviteLink: MemberInviteLink;
  MemberInvitesAllocatedNotification: MemberInvitesAllocatedNotification;
  MemberReportByIdInput: MemberReportByIdInput;
  MemberReportPayload: MemberReportPayload;
  ModerationAppealInfo: ModerationAppealInfo;
  ModerationAppealInfoInput: ModerationAppealInfoInput;
  ModerationCountersFilter: ModerationCountersFilter;
  ModerationCountersPayload: ModerationCountersPayload;
  ModerationEntity: ResolversParentTypes['CommentModerationInfo'] | ResolversParentTypes['EventModerationInfo'] | ResolversParentTypes['PollModerationInfo'] | ResolversParentTypes['PostModerationInfo'] | ResolversParentTypes['UserModerationInfo'];
  ModerationJob: Omit<ModerationJob, 'appealInfo' | 'entity' | 'history'> & { appealInfo?: Maybe<ResolversParentTypes['AppealInfo']>, entity?: Maybe<ResolversParentTypes['ModerationEntity']>, history?: Maybe<Array<ResolversParentTypes['ModerationJobEvent']>> };
  ModerationJobAppealedEvent: ModerationJobAppealedEvent;
  ModerationJobAutoEscalatedEvent: ModerationJobAutoEscalatedEvent;
  ModerationJobContentUpdatedEvent: ModerationJobContentUpdatedEvent;
  ModerationJobEdge: ModerationJobEdge;
  ModerationJobEscalatedEvent: ModerationJobEscalatedEvent;
  ModerationJobEvent: ResolversParentTypes['ModerationJobAppealedEvent'] | ResolversParentTypes['ModerationJobAutoEscalatedEvent'] | ResolversParentTypes['ModerationJobContentUpdatedEvent'] | ResolversParentTypes['ModerationJobEscalatedEvent'] | ResolversParentTypes['ModerationJobHiddenEvent'] | ResolversParentTypes['ModerationJobKeptEvent'] | ResolversParentTypes['ModerationJobReportedEvent'] | ResolversParentTypes['ModerationJobUserProfileResetEvent'] | ResolversParentTypes['ModerationJobUserReviewedEvent'] | ResolversParentTypes['ModerationJobUserSuspendedEvent'] | ResolversParentTypes['ModerationJobUserUnsuspendedEvent'];
  ModerationJobHiddenEvent: Omit<ModerationJobHiddenEvent, 'appealInfo'> & { appealInfo?: Maybe<ResolversParentTypes['AppealInfo']> };
  ModerationJobKeptEvent: Omit<ModerationJobKeptEvent, 'appealInfo'> & { appealInfo?: Maybe<ResolversParentTypes['AppealInfo']> };
  ModerationJobReportedEvent: ModerationJobReportedEvent;
  ModerationJobUserProfileResetEvent: Omit<ModerationJobUserProfileResetEvent, 'appealInfo'> & { appealInfo?: Maybe<ResolversParentTypes['AppealInfo']> };
  ModerationJobUserReviewedEvent: Omit<ModerationJobUserReviewedEvent, 'appealInfo'> & { appealInfo?: Maybe<ResolversParentTypes['AppealInfo']> };
  ModerationJobUserSuspendedEvent: Omit<ModerationJobUserSuspendedEvent, 'appealInfo'> & { appealInfo?: Maybe<ResolversParentTypes['AppealInfo']> };
  ModerationJobUserUnsuspendedEvent: ModerationJobUserUnsuspendedEvent;
  ModerationJobsConnection: ModerationJobsConnection;
  ModerationJobsCountersPayload: ModerationJobsCountersPayload;
  ModerationJobsFilter: ModerationJobsFilter;
  ModerationNotification: Omit<ModerationNotification, 'composition' | 'feedItem' | 'inReplyTo'> & { composition?: Maybe<ResolversParentTypes['InboxComposition']>, feedItem?: Maybe<ResolversParentTypes['InboxFeedItem']>, inReplyTo?: Maybe<ResolversParentTypes['InboxComposition']> };
  ModerationStatusPayload: ModerationStatusPayload;
  Mutation: {};
  MutedFandoms: MutedFandoms;
  MutedFandomsInput: MutedFandomsInput;
  MyFandomSearchConnection: MyFandomSearchConnection;
  MyFandomSearchEdge: MyFandomSearchEdge;
  NewFriendNotification: NewFriendNotification;
  NotifyOn: NotifyOn;
  NotifyOnInput: NotifyOnInput;
  OnlineSegmentAudienceFilter: OnlineSegmentAudienceFilter;
  OnlineSegmentAudienceFilterInput: OnlineSegmentAudienceFilterInput;
  PageInfo: PageInfo;
  PaginationInput: PaginationInput;
  ParentInput: ParentInput;
  Personal: Personal;
  PersonalInput: PersonalInput;
  PinContentInput: PinContentInput;
  PinContentPayload: Omit<PinContentPayload, 'content'> & { content?: Maybe<ResolversParentTypes['PinnedContent']> };
  PinnedContent: ResolversParentTypes['Event'] | ResolversParentTypes['Poll'] | ResolversParentTypes['Post'];
  PinnedFeedItemInformation: PinnedFeedItemInformation;
  Poll: Poll;
  PollInteractions: PollInteractions;
  PollModerationInfo: PollModerationInfo;
  PollOption: PollOption;
  Post: Omit<Post, 'attachments'> & { attachments: Array<Maybe<ResolversParentTypes['PostAttachment']>> };
  PostAttachment: ResolversParentTypes['Image'] | ResolversParentTypes['Video'];
  PostModerationInfo: PostModerationInfo;
  PostSearchConnection: PostSearchConnection;
  PostSearchEdge: PostSearchEdge;
  PostSearchWithFilterConnection: PostSearchWithFilterConnection;
  PostSearchWithFilterEdge: PostSearchWithFilterEdge;
  PreSignedUrl: PreSignedUrl;
  PrivateChat: PrivateChat;
  Product: Product;
  ProductConnection: ProductConnection;
  ProductEdge: ProductEdge;
  QualityContent: QualityContent;
  Query: {};
  QuestionIdInput: QuestionIdInput;
  Reactable: ResolversParentTypes['Comment'] | ResolversParentTypes['Event'] | ResolversParentTypes['Poll'] | ResolversParentTypes['Post'];
  Reaction: Omit<Reaction, 'reactable'> & { reactable?: Maybe<ResolversParentTypes['Reactable']> };
  ReactionConnection: ReactionConnection;
  ReactionEdge: ReactionEdge;
  RecommendedFeedItemInformation: RecommendedFeedItemInformation;
  RegisterPushNotificationTokenInput: RegisterPushNotificationTokenInput;
  RegisterPushNotificationTokenPayload: RegisterPushNotificationTokenPayload;
  RegularFeedItemInformation: RegularFeedItemInformation;
  RejectFriendRequestInput: RejectFriendRequestInput;
  RejectFriendRequestPayload: RejectFriendRequestPayload;
  RejectJoinHiddenFandomInput: RejectJoinHiddenFandomInput;
  RejectJoinHiddenFandomPayload: RejectJoinHiddenFandomPayload;
  RejectJoinPrivateFandomInput: RejectJoinPrivateFandomInput;
  RejectJoinPrivateFandomPayload: RejectJoinPrivateFandomPayload;
  RemoveFandomAdminInput: RemoveFandomAdminInput;
  RemoveFandomAdminPayload: RemoveFandomAdminPayload;
  RemoveFandomMemberInput: RemoveFandomMemberInput;
  RemoveFandomMemberPayload: RemoveFandomMemberPayload;
  RemovePlatformMemberRoleInput: RemovePlatformMemberRoleInput;
  RemovePlatformMemberRolePayload: RemovePlatformMemberRolePayload;
  ReportCount: ReportCount;
  ReportEntityByMemberInput: ReportEntityByMemberInput;
  ReportEntityByMemberPayload: ReportEntityByMemberPayload;
  ReportInfo: ReportInfo;
  ReportNote: ReportNote;
  ReportNoteConnection: ReportNoteConnection;
  ReportNoteEdge: ReportNoteEdge;
  ReportResponseNotification: Omit<ReportResponseNotification, 'composition' | 'feedItem' | 'inReplyTo'> & { composition?: Maybe<ResolversParentTypes['InboxComposition']>, feedItem?: Maybe<ResolversParentTypes['InboxFeedItem']>, inReplyTo?: Maybe<ResolversParentTypes['InboxComposition']> };
  ReportUserInput: ReportUserInput;
  ReportUserPayload: ReportUserPayload;
  ReportersAppealInfo: ReportersAppealInfo;
  ReputationScoreAudienceFilter: ReputationScoreAudienceFilter;
  ReputationScoreAudienceFilterInput: ReputationScoreAudienceFilterInput;
  RequestJoinPrivateFandomInput: RequestJoinPrivateFandomInput;
  RequestJoinPrivateFandomPayload: RequestJoinPrivateFandomPayload;
  ResetUserProfileInput: ResetUserProfileInput;
  ResetUserProfilePayload: ResetUserProfilePayload;
  ReviewAiLabelsInput: ReviewAiLabelsInput;
  ReviewAiLabelsPayload: ReviewAiLabelsPayload;
  ReviewUserModerationJobInput: ReviewUserModerationJobInput;
  ReviewUserModerationJobPayload: ReviewUserModerationJobPayload;
  RuleInput: RuleInput;
  ScoreComponents: ScoreComponents;
  ShareFandomInput: ShareFandomInput;
  ShareFandomPayload: ShareFandomPayload;
  StartFandomChatInput: StartFandomChatInput;
  StartFandomChatPayload: StartFandomChatPayload;
  StartLivestreamChatInput: StartLivestreamChatInput;
  StartLivestreamChatPayload: StartLivestreamChatPayload;
  StartLivestreamInput: StartLivestreamInput;
  StartLivestreamPayload: StartLivestreamPayload;
  StartPrivateChatInput: StartPrivateChatInput;
  StartPrivateChatPayload: StartPrivateChatPayload;
  StopLivestreamInput: StopLivestreamInput;
  StopLivestreamPayload: StopLivestreamPayload;
  Store: Store;
  StorePayload: StorePayload;
  String: Scalars['String'];
  SuspendUserInput: SuspendUserInput;
  SuspendUserPayload: SuspendUserPayload;
  TargetedFeedItemInformation: TargetedFeedItemInformation;
  TopParentEntity: ResolversParentTypes['Event'] | ResolversParentTypes['Poll'] | ResolversParentTypes['Post'];
  TriggerSpecification: TriggerSpecification;
  TriggerSpecificationInput: TriggerSpecificationInput;
  UndoFriendshipRequestInput: UndoFriendshipRequestInput;
  UndoFriendshipRequestPayload: UndoFriendshipRequestPayload;
  UnlikeReactionInput: UnlikeReactionInput;
  UnlikeReactionPayload: UnlikeReactionPayload;
  UnpinContentInput: UnpinContentInput;
  UnpinContentPayload: Omit<UnpinContentPayload, 'content'> & { content?: Maybe<ResolversParentTypes['PinnedContent']> };
  UnregisterPushNotificationTokenInput: UnregisterPushNotificationTokenInput;
  UnregisterPushNotificationTokenPayload: UnregisterPushNotificationTokenPayload;
  UpdateCampaignInput: UpdateCampaignInput;
  UpdateCampaignPayload: UpdateCampaignPayload;
  UpdateCommentInput: UpdateCommentInput;
  UpdateCommentPayload: UpdateCommentPayload;
  UpdateEventInput: UpdateEventInput;
  UpdateEventPartialInput: UpdateEventPartialInput;
  UpdateEventPartialPayload: UpdateEventPartialPayload;
  UpdateEventPayload: UpdateEventPayload;
  UpdateFandomInput: UpdateFandomInput;
  UpdateFandomPayload: UpdateFandomPayload;
  UpdatePostInput: UpdatePostInput;
  UpdatePostPayload: UpdatePostPayload;
  UpdateProductInput: UpdateProductInput;
  UpdateProductPayload: UpdateProductPayload;
  UpdateProductStatusInput: UpdateProductStatusInput;
  UpdateStoreInput: UpdateStoreInput;
  UpdateStorePayload: UpdateStorePayload;
  UpdateUserProfileInput: UpdateUserProfileInput;
  UpdateUserProfilePayload: UpdateUserProfilePayload;
  UpdateVariantInput: UpdateVariantInput;
  UpdateVariantLabelInput: UpdateVariantLabelInput;
  UpdateVariantPayload: UpdateVariantPayload;
  UploadImage: UploadImage;
  UploadImageInput: UploadImageInput;
  UploadVideoInput: UploadVideoInput;
  UploadVideoPayload: UploadVideoPayload;
  User: User;
  UserConnection: UserConnection;
  UserEdge: UserEdge;
  UserEventResponseInput: UserEventResponseInput;
  UserEventResponsePayload: UserEventResponsePayload;
  UserMentionNotification: Omit<UserMentionNotification, 'composition' | 'feedItem' | 'inReplyTo'> & { composition?: Maybe<ResolversParentTypes['InboxComposition']>, feedItem?: Maybe<ResolversParentTypes['InboxFeedItem']>, inReplyTo?: Maybe<ResolversParentTypes['InboxComposition']> };
  UserModerationInfo: UserModerationInfo;
  UserSearchConnection: UserSearchConnection;
  UserSearchEdge: UserSearchEdge;
  UserSuggestionConnection: UserSuggestionConnection;
  UserSuggestionEdge: UserSuggestionEdge;
  Variant: Variant;
  VariantAttribute: VariantAttribute;
  VariantAttributeInput: VariantAttributeInput;
  VariantConnection: VariantConnection;
  VariantEdge: VariantEdge;
  Video: Video;
  VideoUploadInput: VideoUploadInput;
  Viewers: Viewers;
  Wallet: Wallet;
  WalletByDate: WalletByDate;
  WalletByDateConnection: WalletByDateConnection;
  WalletByDateEdge: WalletByDateEdge;
  WalletByFandom: WalletByFandom;
  WalletByFandomConnection: WalletByFandomConnection;
  WalletByFandomEdge: WalletByFandomEdge;
  WalletMetadata: WalletMetadata;
  WalletTransaction: WalletTransaction;
  WalletTransactionConnection: WalletTransactionConnection;
  WalletTransactionEdge: WalletTransactionEdge;
  WebsocketChannel: WebsocketChannel;
  WebsocketEvent: WebsocketEvent;
  WebsocketPresence: WebsocketPresence;
  ZonedDateTime: Scalars['ZonedDateTime'];
};

export type Apollo_Studio_MetadataDirectiveArgs = {
  buildId?: Maybe<Scalars['String']>;
  checkId?: Maybe<Scalars['String']>;
  launchId?: Maybe<Scalars['String']>;
};

export type Apollo_Studio_MetadataDirectiveResolver<Result, Parent, ContextType = any, Args = Apollo_Studio_MetadataDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type AcceptFriendRequestPayloadResolvers<ContextType = any, ParentType extends ResolversParentTypes['AcceptFriendRequestPayload'] = ResolversParentTypes['AcceptFriendRequestPayload']> = {
  user?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type AcceptJoinHiddenFandomPayloadResolvers<ContextType = any, ParentType extends ResolversParentTypes['AcceptJoinHiddenFandomPayload'] = ResolversParentTypes['AcceptJoinHiddenFandomPayload']> = {
  member?: Resolver<Maybe<ResolversTypes['FandomMember']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type AcknowledgeInboxNotificationsPayloadResolvers<ContextType = any, ParentType extends ResolversParentTypes['AcknowledgeInboxNotificationsPayload'] = ResolversParentTypes['AcknowledgeInboxNotificationsPayload']> = {
  notifications?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type AddFandomAdminPayloadResolvers<ContextType = any, ParentType extends ResolversParentTypes['AddFandomAdminPayload'] = ResolversParentTypes['AddFandomAdminPayload']> = {
  member?: Resolver<ResolversTypes['FandomMember'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type AddPlatformMemberRolePayloadResolvers<ContextType = any, ParentType extends ResolversParentTypes['AddPlatformMemberRolePayload'] = ResolversParentTypes['AddPlatformMemberRolePayload']> = {
  user?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type AdministratorResolvers<ContextType = any, ParentType extends ResolversParentTypes['Administrator'] = ResolversParentTypes['Administrator']> = {
  joins?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  mentions?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  reports?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type AiLabelResolvers<ContextType = any, ParentType extends ResolversParentTypes['AiLabel'] = ResolversParentTypes['AiLabel']> = {
  status?: Resolver<ResolversTypes['AiLabelStatus'], ParentType, ContextType>;
  value?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type AiReportResolvers<ContextType = any, ParentType extends ResolversParentTypes['AiReport'] = ResolversParentTypes['AiReport']> = {
  reportReason?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  score?: Resolver<ResolversTypes['AiReportScore'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type AppealInfoResolvers<ContextType = any, ParentType extends ResolversParentTypes['AppealInfo'] = ResolversParentTypes['AppealInfo']> = {
  __resolveType: TypeResolveFn<'CreatorAppealInfo' | 'ReportersAppealInfo', ParentType, ContextType>;
};

export type AppealModerationJobPayloadResolvers<ContextType = any, ParentType extends ResolversParentTypes['AppealModerationJobPayload'] = ResolversParentTypes['AppealModerationJobPayload']> = {
  entityId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type AppealNoteResolvers<ContextType = any, ParentType extends ResolversParentTypes['AppealNote'] = ResolversParentTypes['AppealNote']> = {
  date?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  text?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  user?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type AppealNoteConnectionResolvers<ContextType = any, ParentType extends ResolversParentTypes['AppealNoteConnection'] = ResolversParentTypes['AppealNoteConnection']> = {
  edges?: Resolver<Array<Maybe<ResolversTypes['AppealNoteEdge']>>, ParentType, ContextType>;
  pageInfo?: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type AppealNoteEdgeResolvers<ContextType = any, ParentType extends ResolversParentTypes['AppealNoteEdge'] = ResolversParentTypes['AppealNoteEdge']> = {
  cursor?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  node?: Resolver<Maybe<ResolversTypes['AppealNote']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ApproveJoinPrivateFandomPayloadResolvers<ContextType = any, ParentType extends ResolversParentTypes['ApproveJoinPrivateFandomPayload'] = ResolversParentTypes['ApproveJoinPrivateFandomPayload']> = {
  member?: Resolver<Maybe<ResolversTypes['FandomMember']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type AttributeSummaryItemResolvers<ContextType = any, ParentType extends ResolversParentTypes['AttributeSummaryItem'] = ResolversParentTypes['AttributeSummaryItem']> = {
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  values?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type AudienceSpecificationResolvers<ContextType = any, ParentType extends ResolversParentTypes['AudienceSpecification'] = ResolversParentTypes['AudienceSpecification']> = {
  onlineSegmentsAudienceFilter?: Resolver<Maybe<ResolversTypes['OnlineSegmentAudienceFilter']>, ParentType, ContextType>;
  reputationScoreAudienceFilter?: Resolver<Maybe<ResolversTypes['ReputationScoreAudienceFilter']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type BadgeResolvers<ContextType = any, ParentType extends ResolversParentTypes['Badge'] = ResolversParentTypes['Badge']> = {
  collectedAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  description?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  fandom?: Resolver<Maybe<ResolversTypes['Fandom']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  image?: Resolver<Maybe<ResolversTypes['Image']>, ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  status?: Resolver<ResolversTypes['BadgeStatus'], ParentType, ContextType>;
  type?: Resolver<ResolversTypes['BadgeType'], ParentType, ContextType>;
  user?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type BadgeCollectedNotificationResolvers<ContextType = any, ParentType extends ResolversParentTypes['BadgeCollectedNotification'] = ResolversParentTypes['BadgeCollectedNotification']> = {
  acknowledged?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  badge?: Resolver<Maybe<ResolversTypes['Badge']>, ParentType, ContextType>;
  collectedBy?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  read?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  time?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type BadgeConnectionResolvers<ContextType = any, ParentType extends ResolversParentTypes['BadgeConnection'] = ResolversParentTypes['BadgeConnection']> = {
  edges?: Resolver<Array<Maybe<ResolversTypes['BadgeEdge']>>, ParentType, ContextType>;
  pageInfo?: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type BadgeEdgeResolvers<ContextType = any, ParentType extends ResolversParentTypes['BadgeEdge'] = ResolversParentTypes['BadgeEdge']> = {
  cursor?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  node?: Resolver<ResolversTypes['Badge'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export interface BigIntegerScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['BigInteger'], any> {
  name: 'BigInteger';
}

export type CampaignResolvers<ContextType = any, ParentType extends ResolversParentTypes['Campaign'] = ResolversParentTypes['Campaign']> = {
  creator?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  endTime?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  fandom?: Resolver<Maybe<ResolversTypes['Fandom']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  item?: Resolver<Maybe<ResolversTypes['CampaignItemContent']>, ParentType, ContextType>;
  specifications?: Resolver<Array<ResolversTypes['CampaignSpecification']>, ParentType, ContextType>;
  startTime?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  type?: Resolver<Maybe<ResolversTypes['CampaignType']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CampaignConnectionResolvers<ContextType = any, ParentType extends ResolversParentTypes['CampaignConnection'] = ResolversParentTypes['CampaignConnection']> = {
  edges?: Resolver<Array<Maybe<ResolversTypes['CampaignEdge']>>, ParentType, ContextType>;
  pageInfo?: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CampaignEdgeResolvers<ContextType = any, ParentType extends ResolversParentTypes['CampaignEdge'] = ResolversParentTypes['CampaignEdge']> = {
  cursor?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  node?: Resolver<ResolversTypes['Campaign'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CampaignItemContentResolvers<ContextType = any, ParentType extends ResolversParentTypes['CampaignItemContent'] = ResolversParentTypes['CampaignItemContent']> = {
  __resolveType: TypeResolveFn<'Event' | 'Poll' | 'Post', ParentType, ContextType>;
};

export type CampaignSpecificationResolvers<ContextType = any, ParentType extends ResolversParentTypes['CampaignSpecification'] = ResolversParentTypes['CampaignSpecification']> = {
  audienceSpecification?: Resolver<ResolversTypes['AudienceSpecification'], ParentType, ContextType>;
  deliverySpecification?: Resolver<ResolversTypes['DeliverySpecification'], ParentType, ContextType>;
  triggerSpecification?: Resolver<ResolversTypes['TriggerSpecification'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CancelJoinHiddenFandomPayloadResolvers<ContextType = any, ParentType extends ResolversParentTypes['CancelJoinHiddenFandomPayload'] = ResolversParentTypes['CancelJoinHiddenFandomPayload']> = {
  member?: Resolver<Maybe<ResolversTypes['FandomMember']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CancelJoinPrivateFandomPayloadResolvers<ContextType = any, ParentType extends ResolversParentTypes['CancelJoinPrivateFandomPayload'] = ResolversParentTypes['CancelJoinPrivateFandomPayload']> = {
  fandomId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  roles?: Resolver<Maybe<Array<ResolversTypes['FandomMemberRole']>>, ParentType, ContextType>;
  status?: Resolver<Maybe<ResolversTypes['FandomMemberStatus']>, ParentType, ContextType>;
  user?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CastVotePayloadResolvers<ContextType = any, ParentType extends ResolversParentTypes['CastVotePayload'] = ResolversParentTypes['CastVotePayload']> = {
  poll?: Resolver<ResolversTypes['Poll'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ChatResolvers<ContextType = any, ParentType extends ResolversParentTypes['Chat'] = ResolversParentTypes['Chat']> = {
  channel?: Resolver<ResolversTypes['ChatChannel'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  status?: Resolver<ResolversTypes['ChatStatus'], ParentType, ContextType>;
  title?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  type?: Resolver<ResolversTypes['ChatType'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ChatChannelResolvers<ContextType = any, ParentType extends ResolversParentTypes['ChatChannel'] = ResolversParentTypes['ChatChannel']> = {
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  type?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ChatTokenResolvers<ContextType = any, ParentType extends ResolversParentTypes['ChatToken'] = ResolversParentTypes['ChatToken']> = {
  value?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CommentResolvers<ContextType = any, ParentType extends ResolversParentTypes['Comment'] = ResolversParentTypes['Comment']> = {
  aiLabels?: Resolver<Maybe<Array<ResolversTypes['AiLabel']>>, ParentType, ContextType>;
  attachment?: Resolver<Maybe<ResolversTypes['CommentAttachment']>, ParentType, ContextType>;
  author?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  content?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  cursor?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  fandom?: Resolver<Maybe<ResolversTypes['Fandom']>, ParentType, ContextType>;
  fandomMembership?: Resolver<Maybe<ResolversTypes['FandomMember']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  likeReaction?: Resolver<Maybe<ResolversTypes['LikeReaction']>, ParentType, ContextType>;
  parent?: Resolver<Maybe<ResolversTypes['CommentParent']>, ParentType, ContextType>;
  replies?: Resolver<Maybe<ResolversTypes['CommentConnection']>, ParentType, ContextType, RequireFields<CommentRepliesArgs, 'filter' | 'first' | 'last'>>;
  status?: Resolver<ResolversTypes['CommentStatus'], ParentType, ContextType>;
  updatedAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CommentAttachmentResolvers<ContextType = any, ParentType extends ResolversParentTypes['CommentAttachment'] = ResolversParentTypes['CommentAttachment']> = {
  __resolveType: TypeResolveFn<'Image' | 'Video', ParentType, ContextType>;
};

export type CommentConnectionResolvers<ContextType = any, ParentType extends ResolversParentTypes['CommentConnection'] = ResolversParentTypes['CommentConnection']> = {
  edges?: Resolver<Array<Maybe<ResolversTypes['CommentEdge']>>, ParentType, ContextType>;
  pageInfo?: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>;
  totalCount?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CommentEdgeResolvers<ContextType = any, ParentType extends ResolversParentTypes['CommentEdge'] = ResolversParentTypes['CommentEdge']> = {
  cursor?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  node?: Resolver<ResolversTypes['Comment'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CommentModerationInfoResolvers<ContextType = any, ParentType extends ResolversParentTypes['CommentModerationInfo'] = ResolversParentTypes['CommentModerationInfo']> = {
  comment?: Resolver<Maybe<ResolversTypes['Comment']>, ParentType, ContextType>;
  topParent?: Resolver<Maybe<ResolversTypes['TopParentEntity']>, ParentType, ContextType>;
  visibility?: Resolver<Maybe<ResolversTypes['EntityVisibility']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CommentNotificationResolvers<ContextType = any, ParentType extends ResolversParentTypes['CommentNotification'] = ResolversParentTypes['CommentNotification']> = {
  acknowledged?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  commentCount?: Resolver<ResolversTypes['BigInteger'], ParentType, ContextType>;
  fandom?: Resolver<Maybe<ResolversTypes['Fandom']>, ParentType, ContextType>;
  feedItem?: Resolver<Maybe<ResolversTypes['InboxFeedItem']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  inReplyTo?: Resolver<Maybe<ResolversTypes['InboxComposition']>, ParentType, ContextType>;
  lastComments?: Resolver<Array<Maybe<ResolversTypes['Comment']>>, ParentType, ContextType>;
  read?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  time?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CommentParentResolvers<ContextType = any, ParentType extends ResolversParentTypes['CommentParent'] = ResolversParentTypes['CommentParent']> = {
  __resolveType: TypeResolveFn<'Comment' | 'Event' | 'Poll' | 'Post', ParentType, ContextType>;
};

export type CommunityRecommendedHighlightsResolvers<ContextType = any, ParentType extends ResolversParentTypes['CommunityRecommendedHighlights'] = ResolversParentTypes['CommunityRecommendedHighlights']> = {
  fandom?: Resolver<Maybe<ResolversTypes['Fandom']>, ParentType, ContextType>;
  highlights?: Resolver<Array<Maybe<ResolversTypes['FeedItem']>>, ParentType, ContextType>;
  highlightsType?: Resolver<Maybe<ResolversTypes['CommunityRecommendedHighlightsType']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ConnectEventChatPayloadResolvers<ContextType = any, ParentType extends ResolversParentTypes['ConnectEventChatPayload'] = ResolversParentTypes['ConnectEventChatPayload']> = {
  token?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ConnectFandomChatPayloadResolvers<ContextType = any, ParentType extends ResolversParentTypes['ConnectFandomChatPayload'] = ResolversParentTypes['ConnectFandomChatPayload']> = {
  token?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ContentSearchConnectionResolvers<ContextType = any, ParentType extends ResolversParentTypes['ContentSearchConnection'] = ResolversParentTypes['ContentSearchConnection']> = {
  edges?: Resolver<Array<ResolversTypes['ContentSearchEdge']>, ParentType, ContextType>;
  pageInfo?: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ContentSearchEdgeResolvers<ContextType = any, ParentType extends ResolversParentTypes['ContentSearchEdge'] = ResolversParentTypes['ContentSearchEdge']> = {
  cursor?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  node?: Resolver<Maybe<ResolversTypes['ContentSearchNode']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ContentSearchNodeResolvers<ContextType = any, ParentType extends ResolversParentTypes['ContentSearchNode'] = ResolversParentTypes['ContentSearchNode']> = {
  __resolveType: TypeResolveFn<'Event' | 'Poll' | 'Post', ParentType, ContextType>;
};

export type CreateCampaignPayloadResolvers<ContextType = any, ParentType extends ResolversParentTypes['CreateCampaignPayload'] = ResolversParentTypes['CreateCampaignPayload']> = {
  campaign?: Resolver<Maybe<ResolversTypes['Campaign']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CreateCommentPayloadResolvers<ContextType = any, ParentType extends ResolversParentTypes['CreateCommentPayload'] = ResolversParentTypes['CreateCommentPayload']> = {
  comment?: Resolver<ResolversTypes['Comment'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CreateEventPayloadResolvers<ContextType = any, ParentType extends ResolversParentTypes['CreateEventPayload'] = ResolversParentTypes['CreateEventPayload']> = {
  event?: Resolver<ResolversTypes['Event'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CreateFandomPayloadResolvers<ContextType = any, ParentType extends ResolversParentTypes['CreateFandomPayload'] = ResolversParentTypes['CreateFandomPayload']> = {
  fandom?: Resolver<ResolversTypes['Fandom'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CreateFriendRequestPayloadResolvers<ContextType = any, ParentType extends ResolversParentTypes['CreateFriendRequestPayload'] = ResolversParentTypes['CreateFriendRequestPayload']> = {
  user?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CreateLikeReactionPayloadResolvers<ContextType = any, ParentType extends ResolversParentTypes['CreateLikeReactionPayload'] = ResolversParentTypes['CreateLikeReactionPayload']> = {
  reaction?: Resolver<ResolversTypes['LikeReaction'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CreatePollPayloadResolvers<ContextType = any, ParentType extends ResolversParentTypes['CreatePollPayload'] = ResolversParentTypes['CreatePollPayload']> = {
  poll?: Resolver<ResolversTypes['Poll'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CreatePostPayloadResolvers<ContextType = any, ParentType extends ResolversParentTypes['CreatePostPayload'] = ResolversParentTypes['CreatePostPayload']> = {
  post?: Resolver<ResolversTypes['Post'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CreateProductPayloadResolvers<ContextType = any, ParentType extends ResolversParentTypes['CreateProductPayload'] = ResolversParentTypes['CreateProductPayload']> = {
  error?: Resolver<Maybe<ResolversTypes['EntityError']>, ParentType, ContextType>;
  message?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  product?: Resolver<Maybe<ResolversTypes['Product']>, ParentType, ContextType>;
  status?: Resolver<ResolversTypes['StoreMutationStatus'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CreateStorePayloadResolvers<ContextType = any, ParentType extends ResolversParentTypes['CreateStorePayload'] = ResolversParentTypes['CreateStorePayload']> = {
  error?: Resolver<Maybe<ResolversTypes['EntityError']>, ParentType, ContextType>;
  message?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  status?: Resolver<ResolversTypes['StoreMutationStatus'], ParentType, ContextType>;
  store?: Resolver<Maybe<ResolversTypes['Store']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CreateVariantPayloadResolvers<ContextType = any, ParentType extends ResolversParentTypes['CreateVariantPayload'] = ResolversParentTypes['CreateVariantPayload']> = {
  error?: Resolver<Maybe<ResolversTypes['EntityError']>, ParentType, ContextType>;
  message?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  status?: Resolver<ResolversTypes['StoreMutationStatus'], ParentType, ContextType>;
  variant?: Resolver<Maybe<ResolversTypes['Variant']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CreatorAppealInfoResolvers<ContextType = any, ParentType extends ResolversParentTypes['CreatorAppealInfo'] = ResolversParentTypes['CreatorAppealInfo']> = {
  creator?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  note?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export interface DateScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Date'], any> {
  name: 'Date';
}

export interface DateTimeScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['DateTime'], any> {
  name: 'DateTime';
}

export type DeleteCampaignPayloadResolvers<ContextType = any, ParentType extends ResolversParentTypes['DeleteCampaignPayload'] = ResolversParentTypes['DeleteCampaignPayload']> = {
  campaignId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type DeleteCommentPayloadResolvers<ContextType = any, ParentType extends ResolversParentTypes['DeleteCommentPayload'] = ResolversParentTypes['DeleteCommentPayload']> = {
  comment?: Resolver<ResolversTypes['Comment'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type DeleteEventPayloadResolvers<ContextType = any, ParentType extends ResolversParentTypes['DeleteEventPayload'] = ResolversParentTypes['DeleteEventPayload']> = {
  eventId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type DeleteFriendshipPayloadResolvers<ContextType = any, ParentType extends ResolversParentTypes['DeleteFriendshipPayload'] = ResolversParentTypes['DeleteFriendshipPayload']> = {
  user?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type DeleteLikeReactionPayloadResolvers<ContextType = any, ParentType extends ResolversParentTypes['DeleteLikeReactionPayload'] = ResolversParentTypes['DeleteLikeReactionPayload']> = {
  reaction?: Resolver<ResolversTypes['LikeReaction'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type DeletePollPayloadResolvers<ContextType = any, ParentType extends ResolversParentTypes['DeletePollPayload'] = ResolversParentTypes['DeletePollPayload']> = {
  pollId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type DeletePostPayloadResolvers<ContextType = any, ParentType extends ResolversParentTypes['DeletePostPayload'] = ResolversParentTypes['DeletePostPayload']> = {
  postId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type DeleteProductPayloadResolvers<ContextType = any, ParentType extends ResolversParentTypes['DeleteProductPayload'] = ResolversParentTypes['DeleteProductPayload']> = {
  error?: Resolver<Maybe<ResolversTypes['EntityError']>, ParentType, ContextType>;
  message?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  product?: Resolver<Maybe<ResolversTypes['Product']>, ParentType, ContextType>;
  status?: Resolver<ResolversTypes['StoreMutationStatus'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type DeleteUserPayloadResolvers<ContextType = any, ParentType extends ResolversParentTypes['DeleteUserPayload'] = ResolversParentTypes['DeleteUserPayload']> = {
  user?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type DeleteVariantPayloadResolvers<ContextType = any, ParentType extends ResolversParentTypes['DeleteVariantPayload'] = ResolversParentTypes['DeleteVariantPayload']> = {
  error?: Resolver<Maybe<ResolversTypes['EntityError']>, ParentType, ContextType>;
  message?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  status?: Resolver<ResolversTypes['StoreMutationStatus'], ParentType, ContextType>;
  variant?: Resolver<Maybe<ResolversTypes['Variant']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type DeliverySpecificationResolvers<ContextType = any, ParentType extends ResolversParentTypes['DeliverySpecification'] = ResolversParentTypes['DeliverySpecification']> = {
  deliveryMechanisms?: Resolver<Array<ResolversTypes['DeliveryMechanismType']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export interface DurationScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Duration'], any> {
  name: 'Duration';
}

export type EndFandomChatPayloadResolvers<ContextType = any, ParentType extends ResolversParentTypes['EndFandomChatPayload'] = ResolversParentTypes['EndFandomChatPayload']> = {
  chat?: Resolver<ResolversTypes['FandomChat'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type EntityErrorResolvers<ContextType = any, ParentType extends ResolversParentTypes['EntityError'] = ResolversParentTypes['EntityError']> = {
  code?: Resolver<ResolversTypes['ErrorCode'], ParentType, ContextType>;
  details?: Resolver<Maybe<Array<ResolversTypes['ErrorItem']>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ErrorItemResolvers<ContextType = any, ParentType extends ResolversParentTypes['ErrorItem'] = ResolversParentTypes['ErrorItem']> = {
  key?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type EscalateModerationJobPayloadResolvers<ContextType = any, ParentType extends ResolversParentTypes['EscalateModerationJobPayload'] = ResolversParentTypes['EscalateModerationJobPayload']> = {
  moderationJob?: Resolver<ResolversTypes['ModerationJob'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type EventResolvers<ContextType = any, ParentType extends ResolversParentTypes['Event'] = ResolversParentTypes['Event']> = {
  aiLabels?: Resolver<Maybe<Array<ResolversTypes['AiLabel']>>, ParentType, ContextType>;
  attachments?: Resolver<Array<Maybe<ResolversTypes['EventAttachment']>>, ParentType, ContextType>;
  chat?: Resolver<Maybe<ResolversTypes['EventChat']>, ParentType, ContextType>;
  comments?: Resolver<Maybe<ResolversTypes['CommentConnection']>, ParentType, ContextType, RequireFields<EventCommentsArgs, 'filter' | 'first' | 'last'>>;
  content?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  endTime?: Resolver<ResolversTypes['ZonedDateTime'], ParentType, ContextType>;
  fandom?: Resolver<Maybe<ResolversTypes['Fandom']>, ParentType, ContextType>;
  fandomMembership?: Resolver<Maybe<ResolversTypes['FandomMember']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  interactions?: Resolver<ResolversTypes['EventInteractions'], ParentType, ContextType>;
  isPinned?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  likeReaction?: Resolver<Maybe<ResolversTypes['LikeReaction']>, ParentType, ContextType>;
  location?: Resolver<ResolversTypes['EventLocation'], ParentType, ContextType>;
  startTime?: Resolver<ResolversTypes['ZonedDateTime'], ParentType, ContextType>;
  status?: Resolver<ResolversTypes['EventStatus'], ParentType, ContextType>;
  ticketUrl?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  title?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  updatedAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  user?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  userReply?: Resolver<Maybe<ResolversTypes['UserEventReply']>, ParentType, ContextType>;
  visibleAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type EventAttachmentResolvers<ContextType = any, ParentType extends ResolversParentTypes['EventAttachment'] = ResolversParentTypes['EventAttachment']> = {
  __resolveType: TypeResolveFn<'Image' | 'Video', ParentType, ContextType>;
};

export type EventChatResolvers<ContextType = any, ParentType extends ResolversParentTypes['EventChat'] = ResolversParentTypes['EventChat']> = {
  channel?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  status?: Resolver<ResolversTypes['ChatStatus'], ParentType, ContextType>;
  title?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type EventInteractionsResolvers<ContextType = any, ParentType extends ResolversParentTypes['EventInteractions'] = ResolversParentTypes['EventInteractions']> = {
  going?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  maybe?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  notGoing?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type EventLocationResolvers<ContextType = any, ParentType extends ResolversParentTypes['EventLocation'] = ResolversParentTypes['EventLocation']> = {
  displayName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type EventModerationInfoResolvers<ContextType = any, ParentType extends ResolversParentTypes['EventModerationInfo'] = ResolversParentTypes['EventModerationInfo']> = {
  event?: Resolver<Maybe<ResolversTypes['Event']>, ParentType, ContextType>;
  visibility?: Resolver<Maybe<ResolversTypes['EntityVisibility']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type FandomResolvers<ContextType = any, ParentType extends ResolversParentTypes['Fandom'] = ResolversParentTypes['Fandom']> = {
  admins?: Resolver<Maybe<ResolversTypes['FandomMemberConnection']>, ParentType, ContextType, Partial<FandomAdminsArgs>>;
  chat?: Resolver<Maybe<ResolversTypes['FandomChat']>, ParentType, ContextType>;
  createdAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  createdBy?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  handle?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  hashtags?: Resolver<Maybe<Array<ResolversTypes['String']>>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  livestream?: Resolver<Maybe<ResolversTypes['Livestream']>, ParentType, ContextType>;
  logoImage?: Resolver<Maybe<ResolversTypes['Image']>, ParentType, ContextType>;
  memberCount?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  members?: Resolver<Maybe<ResolversTypes['FandomMemberConnection']>, ParentType, ContextType, Partial<FandomMembersArgs>>;
  myMembership?: Resolver<Maybe<ResolversTypes['FandomMember']>, ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  rules?: Resolver<Maybe<Array<ResolversTypes['FandomRule']>>, ParentType, ContextType>;
  rulesLastUpdatedAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  summary?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  theme?: Resolver<Maybe<ResolversTypes['FandomTheme']>, ParentType, ContextType>;
  visibility?: Resolver<Maybe<ResolversTypes['FandomVisibility']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type FandomAddedAsAdminNotificationResolvers<ContextType = any, ParentType extends ResolversParentTypes['FandomAddedAsAdminNotification'] = ResolversParentTypes['FandomAddedAsAdminNotification']> = {
  acknowledged?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  assigner?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  fandom?: Resolver<Maybe<ResolversTypes['Fandom']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  read?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  time?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type FandomChatResolvers<ContextType = any, ParentType extends ResolversParentTypes['FandomChat'] = ResolversParentTypes['FandomChat']> = {
  channel?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  participantCount?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  status?: Resolver<ResolversTypes['ChatStatus'], ParentType, ContextType>;
  title?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type FandomConnectionResolvers<ContextType = any, ParentType extends ResolversParentTypes['FandomConnection'] = ResolversParentTypes['FandomConnection']> = {
  edges?: Resolver<Array<Maybe<ResolversTypes['FandomEdge']>>, ParentType, ContextType>;
  pageInfo?: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type FandomEdgeResolvers<ContextType = any, ParentType extends ResolversParentTypes['FandomEdge'] = ResolversParentTypes['FandomEdge']> = {
  cursor?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  node?: Resolver<Maybe<ResolversTypes['Fandom']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type FandomInviteAcceptionNotificationResolvers<ContextType = any, ParentType extends ResolversParentTypes['FandomInviteAcceptionNotification'] = ResolversParentTypes['FandomInviteAcceptionNotification']> = {
  acceptCount?: Resolver<ResolversTypes['BigInteger'], ParentType, ContextType>;
  acknowledged?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  fandom?: Resolver<Maybe<ResolversTypes['Fandom']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  lastAcceptions?: Resolver<Array<Maybe<ResolversTypes['User']>>, ParentType, ContextType>;
  read?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  time?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type FandomInviteNotificationResolvers<ContextType = any, ParentType extends ResolversParentTypes['FandomInviteNotification'] = ResolversParentTypes['FandomInviteNotification']> = {
  acknowledged?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  fandom?: Resolver<Maybe<ResolversTypes['Fandom']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  invitor?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  read?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  time?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type FandomInviteRejectionNotificationResolvers<ContextType = any, ParentType extends ResolversParentTypes['FandomInviteRejectionNotification'] = ResolversParentTypes['FandomInviteRejectionNotification']> = {
  acknowledged?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  fandom?: Resolver<Maybe<ResolversTypes['Fandom']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  lastRejections?: Resolver<Array<Maybe<ResolversTypes['User']>>, ParentType, ContextType>;
  read?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  rejectCount?: Resolver<ResolversTypes['BigInteger'], ParentType, ContextType>;
  time?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type FandomInviteResponseNotificationResolvers<ContextType = any, ParentType extends ResolversParentTypes['FandomInviteResponseNotification'] = ResolversParentTypes['FandomInviteResponseNotification']> = {
  accepted?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  acknowledged?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  fandom?: Resolver<Maybe<ResolversTypes['Fandom']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  read?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  time?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type FandomJoinRequestAcceptionNotificationResolvers<ContextType = any, ParentType extends ResolversParentTypes['FandomJoinRequestAcceptionNotification'] = ResolversParentTypes['FandomJoinRequestAcceptionNotification']> = {
  acceptCount?: Resolver<ResolversTypes['BigInteger'], ParentType, ContextType>;
  acknowledged?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  fandom?: Resolver<Maybe<ResolversTypes['Fandom']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  lastAcceptions?: Resolver<Array<Maybe<ResolversTypes['User']>>, ParentType, ContextType>;
  read?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  time?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type FandomJoinRequestNotificationResolvers<ContextType = any, ParentType extends ResolversParentTypes['FandomJoinRequestNotification'] = ResolversParentTypes['FandomJoinRequestNotification']> = {
  acknowledged?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  fandom?: Resolver<Maybe<ResolversTypes['Fandom']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  read?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  requestor?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  time?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type FandomJoinRequestRejectionNotificationResolvers<ContextType = any, ParentType extends ResolversParentTypes['FandomJoinRequestRejectionNotification'] = ResolversParentTypes['FandomJoinRequestRejectionNotification']> = {
  acknowledged?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  fandom?: Resolver<Maybe<ResolversTypes['Fandom']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  lastRejections?: Resolver<Array<Maybe<ResolversTypes['User']>>, ParentType, ContextType>;
  read?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  rejectCount?: Resolver<ResolversTypes['BigInteger'], ParentType, ContextType>;
  time?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type FandomJoinRequestResponseNotificationResolvers<ContextType = any, ParentType extends ResolversParentTypes['FandomJoinRequestResponseNotification'] = ResolversParentTypes['FandomJoinRequestResponseNotification']> = {
  accepted?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  acknowledged?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  fandom?: Resolver<Maybe<ResolversTypes['Fandom']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  read?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  time?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type FandomJoinedNotificationResolvers<ContextType = any, ParentType extends ResolversParentTypes['FandomJoinedNotification'] = ResolversParentTypes['FandomJoinedNotification']> = {
  acknowledged?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  fandom?: Resolver<Maybe<ResolversTypes['Fandom']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  joinCount?: Resolver<ResolversTypes['BigInteger'], ParentType, ContextType>;
  lastJoiners?: Resolver<Array<Maybe<ResolversTypes['User']>>, ParentType, ContextType>;
  read?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  time?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type FandomJoinedSinceTriggerFilterResolvers<ContextType = any, ParentType extends ResolversParentTypes['FandomJoinedSinceTriggerFilter'] = ResolversParentTypes['FandomJoinedSinceTriggerFilter']> = {
  joinedAfter?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type FandomJoinedTriggerFilterResolvers<ContextType = any, ParentType extends ResolversParentTypes['FandomJoinedTriggerFilter'] = ResolversParentTypes['FandomJoinedTriggerFilter']> = {
  maxDaysAfterJoining?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  minDaysAfterJoining?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type FandomMemberResolvers<ContextType = any, ParentType extends ResolversParentTypes['FandomMember'] = ResolversParentTypes['FandomMember']> = {
  fandom?: Resolver<Maybe<ResolversTypes['Fandom']>, ParentType, ContextType>;
  roles?: Resolver<Maybe<Array<ResolversTypes['FandomMemberRole']>>, ParentType, ContextType>;
  status?: Resolver<Maybe<ResolversTypes['FandomMemberStatus']>, ParentType, ContextType>;
  user?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type FandomMemberConnectionResolvers<ContextType = any, ParentType extends ResolversParentTypes['FandomMemberConnection'] = ResolversParentTypes['FandomMemberConnection']> = {
  edges?: Resolver<Array<Maybe<ResolversTypes['FandomMemberEdge']>>, ParentType, ContextType>;
  pageInfo?: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type FandomMemberEdgeResolvers<ContextType = any, ParentType extends ResolversParentTypes['FandomMemberEdge'] = ResolversParentTypes['FandomMemberEdge']> = {
  cursor?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  node?: Resolver<Maybe<ResolversTypes['FandomMember']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type FandomMemberReputationResolvers<ContextType = any, ParentType extends ResolversParentTypes['FandomMemberReputation'] = ResolversParentTypes['FandomMemberReputation']> = {
  aesActivityScore?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  aesEngagementScore?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  aesStickinessScore?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  behaviourScore?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  contributionScore?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  dataCompletenessScore?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  date?: Resolver<ResolversTypes['Date'], ParentType, ContextType>;
  engagementScore?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  fandom?: Resolver<Maybe<ResolversTypes['Fandom']>, ParentType, ContextType>;
  friendlinessScore?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  member?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  promotorScore?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  reputationScore?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type FandomMemberReputationConnectionResolvers<ContextType = any, ParentType extends ResolversParentTypes['FandomMemberReputationConnection'] = ResolversParentTypes['FandomMemberReputationConnection']> = {
  edges?: Resolver<Maybe<Array<Maybe<ResolversTypes['FandomMemberReputationEdge']>>>, ParentType, ContextType>;
  pageInfo?: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type FandomMemberReputationConnectionV2Resolvers<ContextType = any, ParentType extends ResolversParentTypes['FandomMemberReputationConnectionV2'] = ResolversParentTypes['FandomMemberReputationConnectionV2']> = {
  edges?: Resolver<Array<Maybe<ResolversTypes['FandomMemberReputationEdgeV2']>>, ParentType, ContextType>;
  pageInfo?: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type FandomMemberReputationEdgeResolvers<ContextType = any, ParentType extends ResolversParentTypes['FandomMemberReputationEdge'] = ResolversParentTypes['FandomMemberReputationEdge']> = {
  cursor?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  node?: Resolver<Maybe<ResolversTypes['FandomMemberReputation']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type FandomMemberReputationEdgeV2Resolvers<ContextType = any, ParentType extends ResolversParentTypes['FandomMemberReputationEdgeV2'] = ResolversParentTypes['FandomMemberReputationEdgeV2']> = {
  cursor?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  node?: Resolver<Maybe<ResolversTypes['FandomMemberReputationV2']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type FandomMemberReputationV2Resolvers<ContextType = any, ParentType extends ResolversParentTypes['FandomMemberReputationV2'] = ResolversParentTypes['FandomMemberReputationV2']> = {
  components?: Resolver<ResolversTypes['ScoreComponents'], ParentType, ContextType>;
  dailyChange?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  date?: Resolver<ResolversTypes['Date'], ParentType, ContextType>;
  fandom?: Resolver<Maybe<ResolversTypes['Fandom']>, ParentType, ContextType>;
  member?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  reputationScore?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type FandomMentionNotificationResolvers<ContextType = any, ParentType extends ResolversParentTypes['FandomMentionNotification'] = ResolversParentTypes['FandomMentionNotification']> = {
  acknowledged?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  composition?: Resolver<Maybe<ResolversTypes['InboxComposition']>, ParentType, ContextType>;
  fandom?: Resolver<Maybe<ResolversTypes['Fandom']>, ParentType, ContextType>;
  feedItem?: Resolver<Maybe<ResolversTypes['InboxFeedItem']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  inReplyTo?: Resolver<Maybe<ResolversTypes['InboxComposition']>, ParentType, ContextType>;
  mention?: Resolver<Maybe<ResolversTypes['Fandom']>, ParentType, ContextType>;
  mentioner?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  read?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  time?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type FandomRemovedFromAdminNotificationResolvers<ContextType = any, ParentType extends ResolversParentTypes['FandomRemovedFromAdminNotification'] = ResolversParentTypes['FandomRemovedFromAdminNotification']> = {
  acknowledged?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  assigner?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  fandom?: Resolver<Maybe<ResolversTypes['Fandom']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  read?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  time?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type FandomReputationResolvers<ContextType = any, ParentType extends ResolversParentTypes['FandomReputation'] = ResolversParentTypes['FandomReputation']> = {
  date?: Resolver<ResolversTypes['Date'], ParentType, ContextType>;
  fandom?: Resolver<Maybe<ResolversTypes['Fandom']>, ParentType, ContextType>;
  reputationScore?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type FandomReputationConnectionResolvers<ContextType = any, ParentType extends ResolversParentTypes['FandomReputationConnection'] = ResolversParentTypes['FandomReputationConnection']> = {
  edges?: Resolver<Maybe<Array<Maybe<ResolversTypes['FandomReputationEdge']>>>, ParentType, ContextType>;
  pageInfo?: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type FandomReputationEdgeResolvers<ContextType = any, ParentType extends ResolversParentTypes['FandomReputationEdge'] = ResolversParentTypes['FandomReputationEdge']> = {
  cursor?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  node?: Resolver<Maybe<ResolversTypes['FandomReputation']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type FandomRuleResolvers<ContextType = any, ParentType extends ResolversParentTypes['FandomRule'] = ResolversParentTypes['FandomRule']> = {
  description?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type FandomSearchConnectionResolvers<ContextType = any, ParentType extends ResolversParentTypes['FandomSearchConnection'] = ResolversParentTypes['FandomSearchConnection']> = {
  edges?: Resolver<Array<ResolversTypes['FandomSearchEdge']>, ParentType, ContextType>;
  pageInfo?: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type FandomSearchEdgeResolvers<ContextType = any, ParentType extends ResolversParentTypes['FandomSearchEdge'] = ResolversParentTypes['FandomSearchEdge']> = {
  cursor?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  node?: Resolver<Maybe<ResolversTypes['Fandom']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type FandomShareNotificationResolvers<ContextType = any, ParentType extends ResolversParentTypes['FandomShareNotification'] = ResolversParentTypes['FandomShareNotification']> = {
  acknowledged?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  content?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  fandom?: Resolver<Maybe<ResolversTypes['Fandom']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  read?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  sharer?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  sharers?: Resolver<Array<ResolversTypes['User']>, ParentType, ContextType>;
  time?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type FandomSuggestionConnectionResolvers<ContextType = any, ParentType extends ResolversParentTypes['FandomSuggestionConnection'] = ResolversParentTypes['FandomSuggestionConnection']> = {
  edges?: Resolver<Array<ResolversTypes['FandomSuggestionEdge']>, ParentType, ContextType>;
  pageInfo?: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type FandomSuggestionEdgeResolvers<ContextType = any, ParentType extends ResolversParentTypes['FandomSuggestionEdge'] = ResolversParentTypes['FandomSuggestionEdge']> = {
  cursor?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  node?: Resolver<Maybe<ResolversTypes['Fandom']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type FandomThemeResolvers<ContextType = any, ParentType extends ResolversParentTypes['FandomTheme'] = ResolversParentTypes['FandomTheme']> = {
  hex?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type FandomVisitedTriggerFilterResolvers<ContextType = any, ParentType extends ResolversParentTypes['FandomVisitedTriggerFilter'] = ResolversParentTypes['FandomVisitedTriggerFilter']> = {
  maxDaysSinceLastVisited?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  minDaysSinceLastVisited?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type FeedItemResolvers<ContextType = any, ParentType extends ResolversParentTypes['FeedItem'] = ResolversParentTypes['FeedItem']> = {
  content?: Resolver<Maybe<ResolversTypes['FeedItemContent']>, ParentType, ContextType>;
  sourceInformation?: Resolver<ResolversTypes['FeedItemSourceInformation'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type FeedItemConnectionResolvers<ContextType = any, ParentType extends ResolversParentTypes['FeedItemConnection'] = ResolversParentTypes['FeedItemConnection']> = {
  edges?: Resolver<Array<ResolversTypes['FeedItemEdge']>, ParentType, ContextType>;
  pageInfo?: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type FeedItemContentResolvers<ContextType = any, ParentType extends ResolversParentTypes['FeedItemContent'] = ResolversParentTypes['FeedItemContent']> = {
  __resolveType: TypeResolveFn<'Event' | 'Livestream' | 'Poll' | 'Post', ParentType, ContextType>;
};

export type FeedItemEdgeResolvers<ContextType = any, ParentType extends ResolversParentTypes['FeedItemEdge'] = ResolversParentTypes['FeedItemEdge']> = {
  cursor?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  node?: Resolver<ResolversTypes['FeedItem'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type FeedItemSourceInformationResolvers<ContextType = any, ParentType extends ResolversParentTypes['FeedItemSourceInformation'] = ResolversParentTypes['FeedItemSourceInformation']> = {
  __resolveType: TypeResolveFn<'PinnedFeedItemInformation' | 'RecommendedFeedItemInformation' | 'RegularFeedItemInformation' | 'TargetedFeedItemInformation', ParentType, ContextType>;
};

export type FriendRequestNotificationResolvers<ContextType = any, ParentType extends ResolversParentTypes['FriendRequestNotification'] = ResolversParentTypes['FriendRequestNotification']> = {
  acknowledged?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  friend?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  read?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  time?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type FriendRequestResponseNotificationResolvers<ContextType = any, ParentType extends ResolversParentTypes['FriendRequestResponseNotification'] = ResolversParentTypes['FriendRequestResponseNotification']> = {
  accepted?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  acknowledged?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  friend?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  read?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  time?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GenerateFandomLinkPayloadResolvers<ContextType = any, ParentType extends ResolversParentTypes['GenerateFandomLinkPayload'] = ResolversParentTypes['GenerateFandomLinkPayload']> = {
  link?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GenerateInviteLinkPayloadResolvers<ContextType = any, ParentType extends ResolversParentTypes['GenerateInviteLinkPayload'] = ResolversParentTypes['GenerateInviteLinkPayload']> = {
  link?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type HighlightsFromCommunityConnectionResolvers<ContextType = any, ParentType extends ResolversParentTypes['HighlightsFromCommunityConnection'] = ResolversParentTypes['HighlightsFromCommunityConnection']> = {
  edges?: Resolver<Array<ResolversTypes['HighlightsFromCommunityEdge']>, ParentType, ContextType>;
  pageInfo?: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type HighlightsFromCommunityEdgeResolvers<ContextType = any, ParentType extends ResolversParentTypes['HighlightsFromCommunityEdge'] = ResolversParentTypes['HighlightsFromCommunityEdge']> = {
  cursor?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  node?: Resolver<ResolversTypes['CommunityRecommendedHighlights'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type HomeFeedFandomTileResolvers<ContextType = any, ParentType extends ResolversParentTypes['HomeFeedFandomTile'] = ResolversParentTypes['HomeFeedFandomTile']> = {
  badge?: Resolver<Maybe<ResolversTypes['HomeFeedTileBadge']>, ParentType, ContextType>;
  fandom?: Resolver<Maybe<ResolversTypes['Fandom']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type HomeFeedHighlightedUpdatesSectionResolvers<ContextType = any, ParentType extends ResolversParentTypes['HomeFeedHighlightedUpdatesSection'] = ResolversParentTypes['HomeFeedHighlightedUpdatesSection']> = {
  updateTiles?: Resolver<Array<ResolversTypes['HomeFeedTile']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type HomeFeedPersonalRecommendationSectionResolvers<ContextType = any, ParentType extends ResolversParentTypes['HomeFeedPersonalRecommendationSection'] = ResolversParentTypes['HomeFeedPersonalRecommendationSection']> = {
  personalRecommendationTiles?: Resolver<Array<Maybe<ResolversTypes['Fandom']>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type HomeFeedSectionResolvers<ContextType = any, ParentType extends ResolversParentTypes['HomeFeedSection'] = ResolversParentTypes['HomeFeedSection']> = {
  __resolveType: TypeResolveFn<'HomeFeedHighlightedUpdatesSection' | 'HomeFeedPersonalRecommendationSection', ParentType, ContextType>;
};

export type HomeFeedSectionConnectionResolvers<ContextType = any, ParentType extends ResolversParentTypes['HomeFeedSectionConnection'] = ResolversParentTypes['HomeFeedSectionConnection']> = {
  edges?: Resolver<Array<ResolversTypes['HomeFeedSectionEdge']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type HomeFeedSectionEdgeResolvers<ContextType = any, ParentType extends ResolversParentTypes['HomeFeedSectionEdge'] = ResolversParentTypes['HomeFeedSectionEdge']> = {
  node?: Resolver<ResolversTypes['HomeFeedSection'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type HomeFeedTileResolvers<ContextType = any, ParentType extends ResolversParentTypes['HomeFeedTile'] = ResolversParentTypes['HomeFeedTile']> = {
  __resolveType: TypeResolveFn<'HomeFeedFandomTile', ParentType, ContextType>;
};

export type HomeFeedTileBadgeResolvers<ContextType = any, ParentType extends ResolversParentTypes['HomeFeedTileBadge'] = ResolversParentTypes['HomeFeedTileBadge']> = {
  newPosts?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ImageResolvers<ContextType = any, ParentType extends ResolversParentTypes['Image'] = ResolversParentTypes['Image']> = {
  aiLabels?: Resolver<Maybe<Array<ResolversTypes['AiLabel']>>, ParentType, ContextType>;
  contentType?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  height?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  online?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  ratio?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  status?: Resolver<ResolversTypes['ImageStatus'], ParentType, ContextType>;
  statusRemarks?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  url?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  width?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type InboxCompositionResolvers<ContextType = any, ParentType extends ResolversParentTypes['InboxComposition'] = ResolversParentTypes['InboxComposition']> = {
  __resolveType: TypeResolveFn<'Comment' | 'Event' | 'Poll' | 'Post', ParentType, ContextType>;
};

export type InboxConfigurationResolvers<ContextType = any, ParentType extends ResolversParentTypes['InboxConfiguration'] = ResolversParentTypes['InboxConfiguration']> = {
  notifyOn?: Resolver<ResolversTypes['NotifyOn'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type InboxFeedItemResolvers<ContextType = any, ParentType extends ResolversParentTypes['InboxFeedItem'] = ResolversParentTypes['InboxFeedItem']> = {
  __resolveType: TypeResolveFn<'Event' | 'Poll' | 'Post', ParentType, ContextType>;
};

export type InboxNotificationResolvers<ContextType = any, ParentType extends ResolversParentTypes['InboxNotification'] = ResolversParentTypes['InboxNotification']> = {
  __resolveType: TypeResolveFn<'BadgeCollectedNotification' | 'CommentNotification' | 'FandomAddedAsAdminNotification' | 'FandomInviteAcceptionNotification' | 'FandomInviteNotification' | 'FandomInviteRejectionNotification' | 'FandomInviteResponseNotification' | 'FandomJoinRequestAcceptionNotification' | 'FandomJoinRequestNotification' | 'FandomJoinRequestRejectionNotification' | 'FandomJoinRequestResponseNotification' | 'FandomJoinedNotification' | 'FandomMentionNotification' | 'FandomRemovedFromAdminNotification' | 'FandomShareNotification' | 'FriendRequestNotification' | 'FriendRequestResponseNotification' | 'LikeNotification' | 'MemberInvitesAllocatedNotification' | 'ModerationNotification' | 'NewFriendNotification' | 'ReportResponseNotification' | 'UserMentionNotification', ParentType, ContextType>;
  acknowledged?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  read?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  time?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
};

export type InboxNotificationConnectionResolvers<ContextType = any, ParentType extends ResolversParentTypes['InboxNotificationConnection'] = ResolversParentTypes['InboxNotificationConnection']> = {
  edges?: Resolver<Array<Maybe<ResolversTypes['InboxNotificationEdge']>>, ParentType, ContextType>;
  pageInfo?: Resolver<Maybe<ResolversTypes['PageInfo']>, ParentType, ContextType>;
  readMark?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  seenMark?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  unseenCount?: Resolver<ResolversTypes['BigInteger'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type InboxNotificationEdgeResolvers<ContextType = any, ParentType extends ResolversParentTypes['InboxNotificationEdge'] = ResolversParentTypes['InboxNotificationEdge']> = {
  cursor?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  node?: Resolver<ResolversTypes['InboxNotification'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type IngestServerResolvers<ContextType = any, ParentType extends ResolversParentTypes['IngestServer'] = ResolversParentTypes['IngestServer']> = {
  endpoint?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  streamKey?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type InviteJoinHiddenFandomPayloadResolvers<ContextType = any, ParentType extends ResolversParentTypes['InviteJoinHiddenFandomPayload'] = ResolversParentTypes['InviteJoinHiddenFandomPayload']> = {
  member?: Resolver<Maybe<ResolversTypes['FandomMember']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type JoinChatPayloadResolvers<ContextType = any, ParentType extends ResolversParentTypes['JoinChatPayload'] = ResolversParentTypes['JoinChatPayload']> = {
  chat?: Resolver<ResolversTypes['Chat'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type JoinLivestreamPayloadResolvers<ContextType = any, ParentType extends ResolversParentTypes['JoinLivestreamPayload'] = ResolversParentTypes['JoinLivestreamPayload']> = {
  message?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  status?: Resolver<ResolversTypes['LivestreamMutationStatus'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type JoinPublicFandomPayloadResolvers<ContextType = any, ParentType extends ResolversParentTypes['JoinPublicFandomPayload'] = ResolversParentTypes['JoinPublicFandomPayload']> = {
  member?: Resolver<Maybe<ResolversTypes['FandomMember']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type LeaveFandomPayloadResolvers<ContextType = any, ParentType extends ResolversParentTypes['LeaveFandomPayload'] = ResolversParentTypes['LeaveFandomPayload']> = {
  fandomId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  roles?: Resolver<Maybe<Array<ResolversTypes['FandomMemberRole']>>, ParentType, ContextType>;
  status?: Resolver<Maybe<ResolversTypes['FandomMemberStatus']>, ParentType, ContextType>;
  user?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type LeaveLivestreamPayloadResolvers<ContextType = any, ParentType extends ResolversParentTypes['LeaveLivestreamPayload'] = ResolversParentTypes['LeaveLivestreamPayload']> = {
  message?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  status?: Resolver<ResolversTypes['LivestreamMutationStatus'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type LikeInformationResolvers<ContextType = any, ParentType extends ResolversParentTypes['LikeInformation'] = ResolversParentTypes['LikeInformation']> = {
  likedAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type LikeNotificationResolvers<ContextType = any, ParentType extends ResolversParentTypes['LikeNotification'] = ResolversParentTypes['LikeNotification']> = {
  acknowledged?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  composition?: Resolver<Maybe<ResolversTypes['InboxComposition']>, ParentType, ContextType>;
  fandom?: Resolver<Maybe<ResolversTypes['Fandom']>, ParentType, ContextType>;
  feedItem?: Resolver<Maybe<ResolversTypes['InboxFeedItem']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  inReplyTo?: Resolver<Maybe<ResolversTypes['InboxComposition']>, ParentType, ContextType>;
  lastLikers?: Resolver<Array<Maybe<ResolversTypes['User']>>, ParentType, ContextType>;
  likeCount?: Resolver<ResolversTypes['BigInteger'], ParentType, ContextType>;
  read?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  time?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type LikeReactionResolvers<ContextType = any, ParentType extends ResolversParentTypes['LikeReaction'] = ResolversParentTypes['LikeReaction']> = {
  hasLike?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  likedAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  reactionId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  totalCount?: Resolver<ResolversTypes['Long'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type LivestreamResolvers<ContextType = any, ParentType extends ResolversParentTypes['Livestream'] = ResolversParentTypes['Livestream']> = {
  chat?: Resolver<Maybe<ResolversTypes['LivestreamChat']>, ParentType, ContextType>;
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  fandom?: Resolver<Maybe<ResolversTypes['Fandom']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  playbackUrl?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  startDateTime?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  state?: Resolver<Maybe<ResolversTypes['LivestreamState']>, ParentType, ContextType>;
  thumbnailImage?: Resolver<Maybe<ResolversTypes['Image']>, ParentType, ContextType>;
  title?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  user?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  viewers?: Resolver<Maybe<ResolversTypes['Viewers']>, ParentType, ContextType>;
  websocketChannel?: Resolver<Maybe<ResolversTypes['WebsocketChannel']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type LivestreamByAuthenticatedUserResolvers<ContextType = any, ParentType extends ResolversParentTypes['LivestreamByAuthenticatedUser'] = ResolversParentTypes['LivestreamByAuthenticatedUser']> = {
  ingestServer?: Resolver<Maybe<ResolversTypes['IngestServer']>, ParentType, ContextType>;
  livestream?: Resolver<Maybe<ResolversTypes['Livestream']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type LivestreamChatResolvers<ContextType = any, ParentType extends ResolversParentTypes['LivestreamChat'] = ResolversParentTypes['LivestreamChat']> = {
  channel?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  status?: Resolver<ResolversTypes['ChatStatus'], ParentType, ContextType>;
  title?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type LivestreamConnectionResolvers<ContextType = any, ParentType extends ResolversParentTypes['LivestreamConnection'] = ResolversParentTypes['LivestreamConnection']> = {
  edges?: Resolver<Array<Maybe<ResolversTypes['LivestreamEdge']>>, ParentType, ContextType>;
  pageInfo?: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type LivestreamEdgeResolvers<ContextType = any, ParentType extends ResolversParentTypes['LivestreamEdge'] = ResolversParentTypes['LivestreamEdge']> = {
  cursor?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  node?: Resolver<ResolversTypes['Livestream'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type LivestreamQuestionResolvers<ContextType = any, ParentType extends ResolversParentTypes['LivestreamQuestion'] = ResolversParentTypes['LivestreamQuestion']> = {
  answeredDateTime?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  archived?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  createdDateTime?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  likes?: Resolver<ResolversTypes['LivestreamQuestionLikes'], ParentType, ContextType>;
  questionText?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  user?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  visibility?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type LivestreamQuestionEdgeResolvers<ContextType = any, ParentType extends ResolversParentTypes['LivestreamQuestionEdge'] = ResolversParentTypes['LivestreamQuestionEdge']> = {
  cursor?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  node?: Resolver<ResolversTypes['LivestreamQuestion'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type LivestreamQuestionLikeResolvers<ContextType = any, ParentType extends ResolversParentTypes['LivestreamQuestionLike'] = ResolversParentTypes['LivestreamQuestionLike']> = {
  likeDateTime?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  user?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type LivestreamQuestionLikesResolvers<ContextType = any, ParentType extends ResolversParentTypes['LivestreamQuestionLikes'] = ResolversParentTypes['LivestreamQuestionLikes']> = {
  likeCount?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  likes?: Resolver<Maybe<Array<Maybe<ResolversTypes['LivestreamQuestionLike']>>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type LivestreamQuestionPayloadResolvers<ContextType = any, ParentType extends ResolversParentTypes['LivestreamQuestionPayload'] = ResolversParentTypes['LivestreamQuestionPayload']> = {
  likesCount?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  message?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  status?: Resolver<ResolversTypes['LivestreamMutationStatus'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type LivestreamQuestionsResolvers<ContextType = any, ParentType extends ResolversParentTypes['LivestreamQuestions'] = ResolversParentTypes['LivestreamQuestions']> = {
  pageInfo?: Resolver<Maybe<ResolversTypes['PageInfo']>, ParentType, ContextType>;
  questions?: Resolver<Array<Maybe<ResolversTypes['LivestreamQuestion']>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type LivestreamQuestionsConnectionResolvers<ContextType = any, ParentType extends ResolversParentTypes['LivestreamQuestionsConnection'] = ResolversParentTypes['LivestreamQuestionsConnection']> = {
  edges?: Resolver<Array<Maybe<ResolversTypes['LivestreamQuestionEdge']>>, ParentType, ContextType>;
  pageInfo?: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type LivestreamTestDataPayloadResolvers<ContextType = any, ParentType extends ResolversParentTypes['LivestreamTestDataPayload'] = ResolversParentTypes['LivestreamTestDataPayload']> = {
  livestreamId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  message?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type LivestreamViewerResolvers<ContextType = any, ParentType extends ResolversParentTypes['LivestreamViewer'] = ResolversParentTypes['LivestreamViewer']> = {
  joinDateTime?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  user?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type LivestreamViewerConnectionResolvers<ContextType = any, ParentType extends ResolversParentTypes['LivestreamViewerConnection'] = ResolversParentTypes['LivestreamViewerConnection']> = {
  edges?: Resolver<Array<Maybe<ResolversTypes['LivestreamViewerEdge']>>, ParentType, ContextType>;
  pageInfo?: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type LivestreamViewerEdgeResolvers<ContextType = any, ParentType extends ResolversParentTypes['LivestreamViewerEdge'] = ResolversParentTypes['LivestreamViewerEdge']> = {
  cursor?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  node?: Resolver<ResolversTypes['LivestreamViewer'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export interface LongScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Long'], any> {
  name: 'Long';
}

export type MarkInboxNotificationsAsReadResultResolvers<ContextType = any, ParentType extends ResolversParentTypes['MarkInboxNotificationsAsReadResult'] = ResolversParentTypes['MarkInboxNotificationsAsReadResult']> = {
  readMark?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MarkInboxNotificationsAsSeenPayloadResolvers<ContextType = any, ParentType extends ResolversParentTypes['MarkInboxNotificationsAsSeenPayload'] = ResolversParentTypes['MarkInboxNotificationsAsSeenPayload']> = {
  seenMark?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MeaningfulInteractionsResolvers<ContextType = any, ParentType extends ResolversParentTypes['MeaningfulInteractions'] = ResolversParentTypes['MeaningfulInteractions']> = {
  communityBuilding?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  dailyChange?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  discovery?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  score?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  sustainedLoyalty?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MemberInviteLinkResolvers<ContextType = any, ParentType extends ResolversParentTypes['MemberInviteLink'] = ResolversParentTypes['MemberInviteLink']> = {
  numberOfSeats?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  url?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MemberInvitesAllocatedNotificationResolvers<ContextType = any, ParentType extends ResolversParentTypes['MemberInvitesAllocatedNotification'] = ResolversParentTypes['MemberInvitesAllocatedNotification']> = {
  acknowledged?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  amountAllocated?: Resolver<Maybe<ResolversTypes['BigInteger']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  read?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  time?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MemberReportPayloadResolvers<ContextType = any, ParentType extends ResolversParentTypes['MemberReportPayload'] = ResolversParentTypes['MemberReportPayload']> = {
  appealNote?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  appealStatus?: Resolver<ResolversTypes['AppealStatus'], ParentType, ContextType>;
  moderationJob?: Resolver<ResolversTypes['ModerationJob'], ParentType, ContextType>;
  reportReason?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ModerationAppealInfoResolvers<ContextType = any, ParentType extends ResolversParentTypes['ModerationAppealInfo'] = ResolversParentTypes['ModerationAppealInfo']> = {
  appealStatus?: Resolver<ResolversTypes['AppealStatus'], ParentType, ContextType>;
  entityId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  fandom?: Resolver<Maybe<ResolversTypes['Fandom']>, ParentType, ContextType>;
  visibility?: Resolver<Maybe<ResolversTypes['EntityVisibility']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ModerationCountersPayloadResolvers<ContextType = any, ParentType extends ResolversParentTypes['ModerationCountersPayload'] = ResolversParentTypes['ModerationCountersPayload']> = {
  pendingJobsCount?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ModerationEntityResolvers<ContextType = any, ParentType extends ResolversParentTypes['ModerationEntity'] = ResolversParentTypes['ModerationEntity']> = {
  __resolveType: TypeResolveFn<'CommentModerationInfo' | 'EventModerationInfo' | 'PollModerationInfo' | 'PostModerationInfo' | 'UserModerationInfo', ParentType, ContextType>;
};

export type ModerationJobResolvers<ContextType = any, ParentType extends ResolversParentTypes['ModerationJob'] = ResolversParentTypes['ModerationJob']> = {
  appealInfo?: Resolver<Maybe<ResolversTypes['AppealInfo']>, ParentType, ContextType>;
  changedToPendingTimestamp?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  entity?: Resolver<Maybe<ResolversTypes['ModerationEntity']>, ParentType, ContextType>;
  entityId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  history?: Resolver<Maybe<Array<ResolversTypes['ModerationJobEvent']>>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  moderationStatus?: Resolver<Maybe<ResolversTypes['ModerationStatus']>, ParentType, ContextType>;
  queues?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>;
  reportInfo?: Resolver<Maybe<ResolversTypes['ReportInfo']>, ParentType, ContextType>;
  violationType?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ModerationJobAppealedEventResolvers<ContextType = any, ParentType extends ResolversParentTypes['ModerationJobAppealedEvent'] = ResolversParentTypes['ModerationJobAppealedEvent']> = {
  jobId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  timestamp?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ModerationJobAutoEscalatedEventResolvers<ContextType = any, ParentType extends ResolversParentTypes['ModerationJobAutoEscalatedEvent'] = ResolversParentTypes['ModerationJobAutoEscalatedEvent']> = {
  escalationTarget?: Resolver<Maybe<ResolversTypes['EscalationTarget']>, ParentType, ContextType>;
  jobId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  timestamp?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ModerationJobContentUpdatedEventResolvers<ContextType = any, ParentType extends ResolversParentTypes['ModerationJobContentUpdatedEvent'] = ResolversParentTypes['ModerationJobContentUpdatedEvent']> = {
  jobId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  timestamp?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ModerationJobEdgeResolvers<ContextType = any, ParentType extends ResolversParentTypes['ModerationJobEdge'] = ResolversParentTypes['ModerationJobEdge']> = {
  cursor?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  node?: Resolver<Maybe<ResolversTypes['ModerationJob']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ModerationJobEscalatedEventResolvers<ContextType = any, ParentType extends ResolversParentTypes['ModerationJobEscalatedEvent'] = ResolversParentTypes['ModerationJobEscalatedEvent']> = {
  escalationTarget?: Resolver<Maybe<ResolversTypes['EscalationTarget']>, ParentType, ContextType>;
  jobId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  moderator?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  timestamp?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ModerationJobEventResolvers<ContextType = any, ParentType extends ResolversParentTypes['ModerationJobEvent'] = ResolversParentTypes['ModerationJobEvent']> = {
  __resolveType: TypeResolveFn<'ModerationJobAppealedEvent' | 'ModerationJobAutoEscalatedEvent' | 'ModerationJobContentUpdatedEvent' | 'ModerationJobEscalatedEvent' | 'ModerationJobHiddenEvent' | 'ModerationJobKeptEvent' | 'ModerationJobReportedEvent' | 'ModerationJobUserProfileResetEvent' | 'ModerationJobUserReviewedEvent' | 'ModerationJobUserSuspendedEvent' | 'ModerationJobUserUnsuspendedEvent', ParentType, ContextType>;
};

export type ModerationJobHiddenEventResolvers<ContextType = any, ParentType extends ResolversParentTypes['ModerationJobHiddenEvent'] = ResolversParentTypes['ModerationJobHiddenEvent']> = {
  appealInfo?: Resolver<Maybe<ResolversTypes['AppealInfo']>, ParentType, ContextType>;
  jobId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  moderator?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  moderatorInternalNote?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  reportInfo?: Resolver<Maybe<ResolversTypes['ReportInfo']>, ParentType, ContextType>;
  timestamp?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  violationType?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ModerationJobKeptEventResolvers<ContextType = any, ParentType extends ResolversParentTypes['ModerationJobKeptEvent'] = ResolversParentTypes['ModerationJobKeptEvent']> = {
  appealInfo?: Resolver<Maybe<ResolversTypes['AppealInfo']>, ParentType, ContextType>;
  jobId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  moderator?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  moderatorInternalNote?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  reportInfo?: Resolver<Maybe<ResolversTypes['ReportInfo']>, ParentType, ContextType>;
  timestamp?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ModerationJobReportedEventResolvers<ContextType = any, ParentType extends ResolversParentTypes['ModerationJobReportedEvent'] = ResolversParentTypes['ModerationJobReportedEvent']> = {
  jobId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  timestamp?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ModerationJobUserProfileResetEventResolvers<ContextType = any, ParentType extends ResolversParentTypes['ModerationJobUserProfileResetEvent'] = ResolversParentTypes['ModerationJobUserProfileResetEvent']> = {
  appealInfo?: Resolver<Maybe<ResolversTypes['AppealInfo']>, ParentType, ContextType>;
  jobId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  moderator?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  moderatorInternalNote?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  reportInfo?: Resolver<Maybe<ResolversTypes['ReportInfo']>, ParentType, ContextType>;
  timestamp?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  violationType?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ModerationJobUserReviewedEventResolvers<ContextType = any, ParentType extends ResolversParentTypes['ModerationJobUserReviewedEvent'] = ResolversParentTypes['ModerationJobUserReviewedEvent']> = {
  appealInfo?: Resolver<Maybe<ResolversTypes['AppealInfo']>, ParentType, ContextType>;
  jobId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  moderator?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  moderatorInternalNote?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  reportInfo?: Resolver<Maybe<ResolversTypes['ReportInfo']>, ParentType, ContextType>;
  timestamp?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ModerationJobUserSuspendedEventResolvers<ContextType = any, ParentType extends ResolversParentTypes['ModerationJobUserSuspendedEvent'] = ResolversParentTypes['ModerationJobUserSuspendedEvent']> = {
  appealInfo?: Resolver<Maybe<ResolversTypes['AppealInfo']>, ParentType, ContextType>;
  durationInHours?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  jobId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  moderator?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  moderatorInternalNote?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  reportInfo?: Resolver<Maybe<ResolversTypes['ReportInfo']>, ParentType, ContextType>;
  timestamp?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  violationType?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ModerationJobUserUnsuspendedEventResolvers<ContextType = any, ParentType extends ResolversParentTypes['ModerationJobUserUnsuspendedEvent'] = ResolversParentTypes['ModerationJobUserUnsuspendedEvent']> = {
  jobId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  timestamp?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ModerationJobsConnectionResolvers<ContextType = any, ParentType extends ResolversParentTypes['ModerationJobsConnection'] = ResolversParentTypes['ModerationJobsConnection']> = {
  edges?: Resolver<Array<Maybe<ResolversTypes['ModerationJobEdge']>>, ParentType, ContextType>;
  pageInfo?: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ModerationJobsCountersPayloadResolvers<ContextType = any, ParentType extends ResolversParentTypes['ModerationJobsCountersPayload'] = ResolversParentTypes['ModerationJobsCountersPayload']> = {
  pendingJobsCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  reviewedJobsCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ModerationNotificationResolvers<ContextType = any, ParentType extends ResolversParentTypes['ModerationNotification'] = ResolversParentTypes['ModerationNotification']> = {
  acknowledged?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  composition?: Resolver<Maybe<ResolversTypes['InboxComposition']>, ParentType, ContextType>;
  fandom?: Resolver<Maybe<ResolversTypes['Fandom']>, ParentType, ContextType>;
  feedItem?: Resolver<Maybe<ResolversTypes['InboxFeedItem']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  inReplyTo?: Resolver<Maybe<ResolversTypes['InboxComposition']>, ParentType, ContextType>;
  moderatedByAaqua?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  read?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  time?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ModerationStatusPayloadResolvers<ContextType = any, ParentType extends ResolversParentTypes['ModerationStatusPayload'] = ResolversParentTypes['ModerationStatusPayload']> = {
  moderationStatus?: Resolver<Maybe<ResolversTypes['ModerationStatus']>, ParentType, ContextType>;
  visibility?: Resolver<Maybe<ResolversTypes['EntityVisibility']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  acceptFriendRequest?: Resolver<Maybe<ResolversTypes['AcceptFriendRequestPayload']>, ParentType, ContextType, RequireFields<MutationAcceptFriendRequestArgs, 'input'>>;
  acceptJoinHiddenFandom?: Resolver<Maybe<ResolversTypes['AcceptJoinHiddenFandomPayload']>, ParentType, ContextType, RequireFields<MutationAcceptJoinHiddenFandomArgs, 'input'>>;
  acknowledgeInboxNotifications?: Resolver<ResolversTypes['AcknowledgeInboxNotificationsPayload'], ParentType, ContextType, RequireFields<MutationAcknowledgeInboxNotificationsArgs, 'input'>>;
  addFandomAdmin?: Resolver<Maybe<ResolversTypes['AddFandomAdminPayload']>, ParentType, ContextType, RequireFields<MutationAddFandomAdminArgs, 'input'>>;
  addPlatformMemberRole?: Resolver<Maybe<ResolversTypes['AddPlatformMemberRolePayload']>, ParentType, ContextType, RequireFields<MutationAddPlatformMemberRoleArgs, 'input'>>;
  appealModerationJob?: Resolver<Maybe<ResolversTypes['AppealModerationJobPayload']>, ParentType, ContextType, RequireFields<MutationAppealModerationJobArgs, 'input'>>;
  approveJoinPrivateFandom?: Resolver<Maybe<ResolversTypes['ApproveJoinPrivateFandomPayload']>, ParentType, ContextType, RequireFields<MutationApproveJoinPrivateFandomArgs, 'input'>>;
  archiveQuestion?: Resolver<Maybe<ResolversTypes['LivestreamQuestionPayload']>, ParentType, ContextType, RequireFields<MutationArchiveQuestionArgs, 'input'>>;
  askQuestion?: Resolver<Maybe<ResolversTypes['LivestreamQuestionPayload']>, ParentType, ContextType, RequireFields<MutationAskQuestionArgs, 'input'>>;
  cancelJoinHiddenFandom?: Resolver<Maybe<ResolversTypes['CancelJoinHiddenFandomPayload']>, ParentType, ContextType, RequireFields<MutationCancelJoinHiddenFandomArgs, 'input'>>;
  cancelJoinPrivateFandom?: Resolver<Maybe<ResolversTypes['CancelJoinPrivateFandomPayload']>, ParentType, ContextType, RequireFields<MutationCancelJoinPrivateFandomArgs, 'input'>>;
  castVote?: Resolver<ResolversTypes['CastVotePayload'], ParentType, ContextType, RequireFields<MutationCastVoteArgs, 'input'>>;
  changeModerationStatus?: Resolver<Maybe<ResolversTypes['ModerationStatusPayload']>, ParentType, ContextType, RequireFields<MutationChangeModerationStatusArgs, 'input'>>;
  connectEventChat?: Resolver<ResolversTypes['ConnectEventChatPayload'], ParentType, ContextType, RequireFields<MutationConnectEventChatArgs, 'input'>>;
  connectFandomChat?: Resolver<ResolversTypes['ConnectFandomChatPayload'], ParentType, ContextType>;
  createCampaign?: Resolver<Maybe<ResolversTypes['CreateCampaignPayload']>, ParentType, ContextType, RequireFields<MutationCreateCampaignArgs, 'input'>>;
  createComment?: Resolver<ResolversTypes['CreateCommentPayload'], ParentType, ContextType, RequireFields<MutationCreateCommentArgs, 'input'>>;
  createEvent?: Resolver<ResolversTypes['CreateEventPayload'], ParentType, ContextType, RequireFields<MutationCreateEventArgs, 'input'>>;
  createFandom?: Resolver<Maybe<ResolversTypes['CreateFandomPayload']>, ParentType, ContextType, RequireFields<MutationCreateFandomArgs, 'input'>>;
  createFriendRequest?: Resolver<Maybe<ResolversTypes['CreateFriendRequestPayload']>, ParentType, ContextType, RequireFields<MutationCreateFriendRequestArgs, 'input'>>;
  createLikeReaction?: Resolver<ResolversTypes['CreateLikeReactionPayload'], ParentType, ContextType, RequireFields<MutationCreateLikeReactionArgs, 'input'>>;
  createPoll?: Resolver<ResolversTypes['CreatePollPayload'], ParentType, ContextType, RequireFields<MutationCreatePollArgs, 'input'>>;
  createPost?: Resolver<ResolversTypes['CreatePostPayload'], ParentType, ContextType, RequireFields<MutationCreatePostArgs, 'input'>>;
  createProduct?: Resolver<ResolversTypes['CreateProductPayload'], ParentType, ContextType, RequireFields<MutationCreateProductArgs, 'input'>>;
  createStore?: Resolver<ResolversTypes['CreateStorePayload'], ParentType, ContextType, RequireFields<MutationCreateStoreArgs, 'input'>>;
  createVariant?: Resolver<ResolversTypes['CreateVariantPayload'], ParentType, ContextType, RequireFields<MutationCreateVariantArgs, 'input'>>;
  deleteCampaign?: Resolver<Maybe<ResolversTypes['DeleteCampaignPayload']>, ParentType, ContextType, RequireFields<MutationDeleteCampaignArgs, 'input'>>;
  deleteComment?: Resolver<ResolversTypes['DeleteCommentPayload'], ParentType, ContextType, RequireFields<MutationDeleteCommentArgs, 'input'>>;
  deleteEvent?: Resolver<ResolversTypes['DeleteEventPayload'], ParentType, ContextType, RequireFields<MutationDeleteEventArgs, 'input'>>;
  deleteFriendship?: Resolver<Maybe<ResolversTypes['DeleteFriendshipPayload']>, ParentType, ContextType, RequireFields<MutationDeleteFriendshipArgs, 'input'>>;
  deleteLikeReaction?: Resolver<ResolversTypes['DeleteLikeReactionPayload'], ParentType, ContextType, RequireFields<MutationDeleteLikeReactionArgs, 'input'>>;
  deletePoll?: Resolver<ResolversTypes['DeletePollPayload'], ParentType, ContextType, RequireFields<MutationDeletePollArgs, 'input'>>;
  deletePost?: Resolver<ResolversTypes['DeletePostPayload'], ParentType, ContextType, RequireFields<MutationDeletePostArgs, 'input'>>;
  deleteProduct?: Resolver<ResolversTypes['DeleteProductPayload'], ParentType, ContextType, RequireFields<MutationDeleteProductArgs, 'input'>>;
  deleteUser?: Resolver<Maybe<ResolversTypes['DeleteUserPayload']>, ParentType, ContextType, RequireFields<MutationDeleteUserArgs, 'input'>>;
  deleteVariant?: Resolver<ResolversTypes['DeleteVariantPayload'], ParentType, ContextType, RequireFields<MutationDeleteVariantArgs, 'input'>>;
  endFandomChat?: Resolver<ResolversTypes['EndFandomChatPayload'], ParentType, ContextType, RequireFields<MutationEndFandomChatArgs, 'input'>>;
  escalateModerationJob?: Resolver<Maybe<ResolversTypes['EscalateModerationJobPayload']>, ParentType, ContextType, RequireFields<MutationEscalateModerationJobArgs, 'input'>>;
  generateFandomLink?: Resolver<ResolversTypes['GenerateFandomLinkPayload'], ParentType, ContextType, RequireFields<MutationGenerateFandomLinkArgs, 'input'>>;
  generateInviteLink?: Resolver<ResolversTypes['GenerateInviteLinkPayload'], ParentType, ContextType, RequireFields<MutationGenerateInviteLinkArgs, 'input'>>;
  inviteJoinHiddenFandom?: Resolver<Maybe<ResolversTypes['InviteJoinHiddenFandomPayload']>, ParentType, ContextType, RequireFields<MutationInviteJoinHiddenFandomArgs, 'input'>>;
  joinChat?: Resolver<ResolversTypes['JoinChatPayload'], ParentType, ContextType, RequireFields<MutationJoinChatArgs, 'input'>>;
  joinLivestream?: Resolver<Maybe<ResolversTypes['JoinLivestreamPayload']>, ParentType, ContextType, RequireFields<MutationJoinLivestreamArgs, 'input'>>;
  joinPublicFandom?: Resolver<Maybe<ResolversTypes['JoinPublicFandomPayload']>, ParentType, ContextType, RequireFields<MutationJoinPublicFandomArgs, 'input'>>;
  leaveFandom?: Resolver<Maybe<ResolversTypes['LeaveFandomPayload']>, ParentType, ContextType, RequireFields<MutationLeaveFandomArgs, 'input'>>;
  leaveLivestream?: Resolver<Maybe<ResolversTypes['LeaveLivestreamPayload']>, ParentType, ContextType, RequireFields<MutationLeaveLivestreamArgs, 'input'>>;
  likeQuestion?: Resolver<Maybe<ResolversTypes['LivestreamQuestionPayload']>, ParentType, ContextType, RequireFields<MutationLikeQuestionArgs, 'input'>>;
  loadTestLivestreamQuestions?: Resolver<Maybe<ResolversTypes['LivestreamTestDataPayload']>, ParentType, ContextType, RequireFields<MutationLoadTestLivestreamQuestionsArgs, 'input'>>;
  loadTestLivestreamViewers?: Resolver<Maybe<ResolversTypes['LivestreamTestDataPayload']>, ParentType, ContextType, RequireFields<MutationLoadTestLivestreamViewersArgs, 'input'>>;
  markInboxNotificationsAsRead?: Resolver<ResolversTypes['MarkInboxNotificationsAsReadResult'], ParentType, ContextType, RequireFields<MutationMarkInboxNotificationsAsReadArgs, 'input'>>;
  markInboxNotificationsAsSeen?: Resolver<ResolversTypes['MarkInboxNotificationsAsSeenPayload'], ParentType, ContextType, RequireFields<MutationMarkInboxNotificationsAsSeenArgs, 'input'>>;
  pinContent?: Resolver<ResolversTypes['PinContentPayload'], ParentType, ContextType, RequireFields<MutationPinContentArgs, 'input'>>;
  registerPushNotificationToken?: Resolver<ResolversTypes['RegisterPushNotificationTokenPayload'], ParentType, ContextType, RequireFields<MutationRegisterPushNotificationTokenArgs, 'input'>>;
  rejectFriendRequest?: Resolver<Maybe<ResolversTypes['RejectFriendRequestPayload']>, ParentType, ContextType, RequireFields<MutationRejectFriendRequestArgs, 'input'>>;
  rejectJoinHiddenFandom?: Resolver<Maybe<ResolversTypes['RejectJoinHiddenFandomPayload']>, ParentType, ContextType, RequireFields<MutationRejectJoinHiddenFandomArgs, 'input'>>;
  rejectJoinPrivateFandom?: Resolver<Maybe<ResolversTypes['RejectJoinPrivateFandomPayload']>, ParentType, ContextType, RequireFields<MutationRejectJoinPrivateFandomArgs, 'input'>>;
  removeFandomAdmin?: Resolver<Maybe<ResolversTypes['RemoveFandomAdminPayload']>, ParentType, ContextType, RequireFields<MutationRemoveFandomAdminArgs, 'input'>>;
  removeFandomMember?: Resolver<Maybe<ResolversTypes['RemoveFandomMemberPayload']>, ParentType, ContextType, RequireFields<MutationRemoveFandomMemberArgs, 'input'>>;
  removePlatformMemberRole?: Resolver<Maybe<ResolversTypes['RemovePlatformMemberRolePayload']>, ParentType, ContextType, RequireFields<MutationRemovePlatformMemberRoleArgs, 'input'>>;
  removeQuestion?: Resolver<Maybe<ResolversTypes['LivestreamQuestionPayload']>, ParentType, ContextType, RequireFields<MutationRemoveQuestionArgs, 'input'>>;
  replyEvent?: Resolver<ResolversTypes['UserEventResponsePayload'], ParentType, ContextType, RequireFields<MutationReplyEventArgs, 'input'>>;
  reportEntityByMember?: Resolver<Maybe<ResolversTypes['ReportEntityByMemberPayload']>, ParentType, ContextType, RequireFields<MutationReportEntityByMemberArgs, 'input'>>;
  reportUser?: Resolver<Maybe<ResolversTypes['ReportUserPayload']>, ParentType, ContextType, RequireFields<MutationReportUserArgs, 'input'>>;
  requestJoinPrivateFandom?: Resolver<Maybe<ResolversTypes['RequestJoinPrivateFandomPayload']>, ParentType, ContextType, RequireFields<MutationRequestJoinPrivateFandomArgs, 'input'>>;
  resetUserProfile?: Resolver<Maybe<ResolversTypes['ResetUserProfilePayload']>, ParentType, ContextType, RequireFields<MutationResetUserProfileArgs, 'input'>>;
  reviewAiLabels?: Resolver<Maybe<ResolversTypes['ReviewAiLabelsPayload']>, ParentType, ContextType, RequireFields<MutationReviewAiLabelsArgs, 'input'>>;
  reviewUserModerationJob?: Resolver<Maybe<ResolversTypes['ReviewUserModerationJobPayload']>, ParentType, ContextType, RequireFields<MutationReviewUserModerationJobArgs, 'input'>>;
  setInboxConfiguration?: Resolver<ResolversTypes['InboxConfiguration'], ParentType, ContextType, RequireFields<MutationSetInboxConfigurationArgs, 'input'>>;
  shareFandom?: Resolver<ResolversTypes['ShareFandomPayload'], ParentType, ContextType, RequireFields<MutationShareFandomArgs, 'input'>>;
  startFandomChat?: Resolver<ResolversTypes['StartFandomChatPayload'], ParentType, ContextType, RequireFields<MutationStartFandomChatArgs, 'input'>>;
  startLivestream?: Resolver<Maybe<ResolversTypes['StartLivestreamPayload']>, ParentType, ContextType, RequireFields<MutationStartLivestreamArgs, 'input'>>;
  startLivestreamChat?: Resolver<Maybe<ResolversTypes['StartLivestreamChatPayload']>, ParentType, ContextType, RequireFields<MutationStartLivestreamChatArgs, 'input'>>;
  startPrivateChat?: Resolver<ResolversTypes['StartPrivateChatPayload'], ParentType, ContextType, RequireFields<MutationStartPrivateChatArgs, 'input'>>;
  stopLivestream?: Resolver<Maybe<ResolversTypes['StopLivestreamPayload']>, ParentType, ContextType, RequireFields<MutationStopLivestreamArgs, 'input'>>;
  suspendUser?: Resolver<Maybe<ResolversTypes['SuspendUserPayload']>, ParentType, ContextType, RequireFields<MutationSuspendUserArgs, 'input'>>;
  undoFriendRequest?: Resolver<Maybe<ResolversTypes['UndoFriendshipRequestPayload']>, ParentType, ContextType, RequireFields<MutationUndoFriendRequestArgs, 'input'>>;
  unlikeQuestion?: Resolver<Maybe<ResolversTypes['LivestreamQuestionPayload']>, ParentType, ContextType, RequireFields<MutationUnlikeQuestionArgs, 'input'>>;
  unlikeReaction?: Resolver<ResolversTypes['UnlikeReactionPayload'], ParentType, ContextType, RequireFields<MutationUnlikeReactionArgs, 'input'>>;
  unpinContent?: Resolver<ResolversTypes['UnpinContentPayload'], ParentType, ContextType, RequireFields<MutationUnpinContentArgs, 'input'>>;
  unregisterPushNotificationToken?: Resolver<ResolversTypes['UnregisterPushNotificationTokenPayload'], ParentType, ContextType, RequireFields<MutationUnregisterPushNotificationTokenArgs, 'input'>>;
  updateCampaign?: Resolver<Maybe<ResolversTypes['UpdateCampaignPayload']>, ParentType, ContextType, RequireFields<MutationUpdateCampaignArgs, 'input'>>;
  updateComment?: Resolver<ResolversTypes['UpdateCommentPayload'], ParentType, ContextType, RequireFields<MutationUpdateCommentArgs, 'input'>>;
  updateEvent?: Resolver<ResolversTypes['UpdateEventPayload'], ParentType, ContextType, RequireFields<MutationUpdateEventArgs, 'input'>>;
  updateEventPartial?: Resolver<ResolversTypes['UpdateEventPartialPayload'], ParentType, ContextType, RequireFields<MutationUpdateEventPartialArgs, 'input'>>;
  updateFandom?: Resolver<Maybe<ResolversTypes['UpdateFandomPayload']>, ParentType, ContextType, RequireFields<MutationUpdateFandomArgs, 'input'>>;
  updatePost?: Resolver<ResolversTypes['UpdatePostPayload'], ParentType, ContextType, RequireFields<MutationUpdatePostArgs, 'input'>>;
  updateProduct?: Resolver<ResolversTypes['UpdateProductPayload'], ParentType, ContextType, RequireFields<MutationUpdateProductArgs, 'input'>>;
  updateProductStatus?: Resolver<ResolversTypes['UpdateProductPayload'], ParentType, ContextType, RequireFields<MutationUpdateProductStatusArgs, 'input'>>;
  updateStore?: Resolver<ResolversTypes['UpdateStorePayload'], ParentType, ContextType, RequireFields<MutationUpdateStoreArgs, 'input'>>;
  updateUserProfile?: Resolver<Maybe<ResolversTypes['UpdateUserProfilePayload']>, ParentType, ContextType, RequireFields<MutationUpdateUserProfileArgs, 'input'>>;
  updateVariant?: Resolver<ResolversTypes['UpdateVariantPayload'], ParentType, ContextType, RequireFields<MutationUpdateVariantArgs, 'input'>>;
  updateVariantLabel?: Resolver<ResolversTypes['UpdateVariantPayload'], ParentType, ContextType, RequireFields<MutationUpdateVariantLabelArgs, 'input'>>;
  uploadImage?: Resolver<ResolversTypes['UploadImage'], ParentType, ContextType, RequireFields<MutationUploadImageArgs, 'input'>>;
  uploadVideo?: Resolver<ResolversTypes['UploadVideoPayload'], ParentType, ContextType, RequireFields<MutationUploadVideoArgs, 'input'>>;
  videoPreSignedUploadUrl?: Resolver<Maybe<ResolversTypes['PreSignedUrl']>, ParentType, ContextType, Partial<MutationVideoPreSignedUploadUrlArgs>>;
};

export type MutedFandomsResolvers<ContextType = any, ParentType extends ResolversParentTypes['MutedFandoms'] = ResolversParentTypes['MutedFandoms']> = {
  mutedFandomIds?: Resolver<Array<Maybe<ResolversTypes['String']>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MyFandomSearchConnectionResolvers<ContextType = any, ParentType extends ResolversParentTypes['MyFandomSearchConnection'] = ResolversParentTypes['MyFandomSearchConnection']> = {
  edges?: Resolver<Array<ResolversTypes['MyFandomSearchEdge']>, ParentType, ContextType>;
  pageInfo?: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MyFandomSearchEdgeResolvers<ContextType = any, ParentType extends ResolversParentTypes['MyFandomSearchEdge'] = ResolversParentTypes['MyFandomSearchEdge']> = {
  cursor?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  node?: Resolver<Maybe<ResolversTypes['Fandom']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type NewFriendNotificationResolvers<ContextType = any, ParentType extends ResolversParentTypes['NewFriendNotification'] = ResolversParentTypes['NewFriendNotification']> = {
  acknowledged?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  friend?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  read?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  time?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type NotifyOnResolvers<ContextType = any, ParentType extends ResolversParentTypes['NotifyOn'] = ResolversParentTypes['NotifyOn']> = {
  administrator?: Resolver<ResolversTypes['Administrator'], ParentType, ContextType>;
  mutedFandoms?: Resolver<ResolversTypes['MutedFandoms'], ParentType, ContextType>;
  personal?: Resolver<ResolversTypes['Personal'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type OnlineSegmentAudienceFilterResolvers<ContextType = any, ParentType extends ResolversParentTypes['OnlineSegmentAudienceFilter'] = ResolversParentTypes['OnlineSegmentAudienceFilter']> = {
  onlineSegments?: Resolver<Array<Maybe<ResolversTypes['OnlineSegment']>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PageInfoResolvers<ContextType = any, ParentType extends ResolversParentTypes['PageInfo'] = ResolversParentTypes['PageInfo']> = {
  endCursor?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  hasNextPage?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  hasPreviousPage?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  startCursor?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PersonalResolvers<ContextType = any, ParentType extends ResolversParentTypes['Personal'] = ResolversParentTypes['Personal']> = {
  comments?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  friends?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  likes?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  mentions?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  shares?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PinContentPayloadResolvers<ContextType = any, ParentType extends ResolversParentTypes['PinContentPayload'] = ResolversParentTypes['PinContentPayload']> = {
  content?: Resolver<Maybe<ResolversTypes['PinnedContent']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PinnedContentResolvers<ContextType = any, ParentType extends ResolversParentTypes['PinnedContent'] = ResolversParentTypes['PinnedContent']> = {
  __resolveType: TypeResolveFn<'Event' | 'Poll' | 'Post', ParentType, ContextType>;
};

export type PinnedFeedItemInformationResolvers<ContextType = any, ParentType extends ResolversParentTypes['PinnedFeedItemInformation'] = ResolversParentTypes['PinnedFeedItemInformation']> = {
  source?: Resolver<Maybe<ResolversTypes['FeedItemSourceType']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PollResolvers<ContextType = any, ParentType extends ResolversParentTypes['Poll'] = ResolversParentTypes['Poll']> = {
  aiLabels?: Resolver<Maybe<Array<ResolversTypes['AiLabel']>>, ParentType, ContextType>;
  closed?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  comments?: Resolver<Maybe<ResolversTypes['CommentConnection']>, ParentType, ContextType, RequireFields<PollCommentsArgs, 'filter' | 'first' | 'last'>>;
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  endTime?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  fandom?: Resolver<Maybe<ResolversTypes['Fandom']>, ParentType, ContextType>;
  fandomMembership?: Resolver<Maybe<ResolversTypes['FandomMember']>, ParentType, ContextType>;
  hasVoted?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  initialDuration?: Resolver<ResolversTypes['Duration'], ParentType, ContextType>;
  interactions?: Resolver<ResolversTypes['PollInteractions'], ParentType, ContextType>;
  isPinned?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  likeReaction?: Resolver<Maybe<ResolversTypes['LikeReaction']>, ParentType, ContextType>;
  options?: Resolver<Array<ResolversTypes['PollOption']>, ParentType, ContextType>;
  question?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  remainingDuration?: Resolver<ResolversTypes['Duration'], ParentType, ContextType>;
  user?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  visibleAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PollInteractionsResolvers<ContextType = any, ParentType extends ResolversParentTypes['PollInteractions'] = ResolversParentTypes['PollInteractions']> = {
  totalVotes?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PollModerationInfoResolvers<ContextType = any, ParentType extends ResolversParentTypes['PollModerationInfo'] = ResolversParentTypes['PollModerationInfo']> = {
  poll?: Resolver<Maybe<ResolversTypes['Poll']>, ParentType, ContextType>;
  visibility?: Resolver<Maybe<ResolversTypes['EntityVisibility']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PollOptionResolvers<ContextType = any, ParentType extends ResolversParentTypes['PollOption'] = ResolversParentTypes['PollOption']> = {
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  optionName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  percentage?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  votedFor?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  votes?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PostResolvers<ContextType = any, ParentType extends ResolversParentTypes['Post'] = ResolversParentTypes['Post']> = {
  aiLabels?: Resolver<Maybe<Array<ResolversTypes['AiLabel']>>, ParentType, ContextType>;
  attachments?: Resolver<Array<Maybe<ResolversTypes['PostAttachment']>>, ParentType, ContextType>;
  comments?: Resolver<Maybe<ResolversTypes['CommentConnection']>, ParentType, ContextType, RequireFields<PostCommentsArgs, 'filter' | 'first' | 'last'>>;
  content?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  fandom?: Resolver<Maybe<ResolversTypes['Fandom']>, ParentType, ContextType>;
  fandomMembership?: Resolver<Maybe<ResolversTypes['FandomMember']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  isPinned?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  likeReaction?: Resolver<Maybe<ResolversTypes['LikeReaction']>, ParentType, ContextType>;
  status?: Resolver<ResolversTypes['PostStatus'], ParentType, ContextType>;
  title?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  type?: Resolver<ResolversTypes['PostType'], ParentType, ContextType>;
  updatedAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  user?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  visibleAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PostAttachmentResolvers<ContextType = any, ParentType extends ResolversParentTypes['PostAttachment'] = ResolversParentTypes['PostAttachment']> = {
  __resolveType: TypeResolveFn<'Image' | 'Video', ParentType, ContextType>;
};

export type PostModerationInfoResolvers<ContextType = any, ParentType extends ResolversParentTypes['PostModerationInfo'] = ResolversParentTypes['PostModerationInfo']> = {
  post?: Resolver<Maybe<ResolversTypes['Post']>, ParentType, ContextType>;
  visibility?: Resolver<Maybe<ResolversTypes['EntityVisibility']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PostSearchConnectionResolvers<ContextType = any, ParentType extends ResolversParentTypes['PostSearchConnection'] = ResolversParentTypes['PostSearchConnection']> = {
  edges?: Resolver<Array<ResolversTypes['PostSearchEdge']>, ParentType, ContextType>;
  pageInfo?: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PostSearchEdgeResolvers<ContextType = any, ParentType extends ResolversParentTypes['PostSearchEdge'] = ResolversParentTypes['PostSearchEdge']> = {
  cursor?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  node?: Resolver<Maybe<ResolversTypes['Post']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PostSearchWithFilterConnectionResolvers<ContextType = any, ParentType extends ResolversParentTypes['PostSearchWithFilterConnection'] = ResolversParentTypes['PostSearchWithFilterConnection']> = {
  edges?: Resolver<Array<ResolversTypes['PostSearchWithFilterEdge']>, ParentType, ContextType>;
  pageInfo?: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PostSearchWithFilterEdgeResolvers<ContextType = any, ParentType extends ResolversParentTypes['PostSearchWithFilterEdge'] = ResolversParentTypes['PostSearchWithFilterEdge']> = {
  cursor?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  node?: Resolver<Maybe<ResolversTypes['Post']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PreSignedUrlResolvers<ContextType = any, ParentType extends ResolversParentTypes['PreSignedUrl'] = ResolversParentTypes['PreSignedUrl']> = {
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  url?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PrivateChatResolvers<ContextType = any, ParentType extends ResolversParentTypes['PrivateChat'] = ResolversParentTypes['PrivateChat']> = {
  channel?: Resolver<ResolversTypes['ChatChannel'], ParentType, ContextType>;
  status?: Resolver<ResolversTypes['ChatStatus'], ParentType, ContextType>;
  title?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ProductResolvers<ContextType = any, ParentType extends ResolversParentTypes['Product'] = ResolversParentTypes['Product']> = {
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  creator?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  description?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  image?: Resolver<Maybe<ResolversTypes['Image']>, ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  productType?: Resolver<ResolversTypes['ProductType'], ParentType, ContextType>;
  status?: Resolver<ResolversTypes['ProductStatus'], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  updater?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  variantAttributeSummary?: Resolver<Array<ResolversTypes['AttributeSummaryItem']>, ParentType, ContextType>;
  variants?: Resolver<Array<ResolversTypes['Variant']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ProductConnectionResolvers<ContextType = any, ParentType extends ResolversParentTypes['ProductConnection'] = ResolversParentTypes['ProductConnection']> = {
  edges?: Resolver<Array<Maybe<ResolversTypes['ProductEdge']>>, ParentType, ContextType>;
  pageInfo?: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ProductEdgeResolvers<ContextType = any, ParentType extends ResolversParentTypes['ProductEdge'] = ResolversParentTypes['ProductEdge']> = {
  cursor?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  node?: Resolver<ResolversTypes['Product'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type QualityContentResolvers<ContextType = any, ParentType extends ResolversParentTypes['QualityContent'] = ResolversParentTypes['QualityContent']> = {
  catalyst?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  dailyChange?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  score?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  temporality?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  thumbStopping?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  allFandomMemberReputations?: Resolver<ResolversTypes['FandomMemberReputationConnectionV2'], ParentType, ContextType, RequireFields<QueryAllFandomMemberReputationsArgs, 'first' | 'input'>>;
  badges?: Resolver<ResolversTypes['BadgeConnection'], ParentType, ContextType, RequireFields<QueryBadgesArgs, 'badgeAwardStatus' | 'first' | 'userId'>>;
  campaign?: Resolver<Maybe<ResolversTypes['Campaign']>, ParentType, ContextType, RequireFields<QueryCampaignArgs, 'id'>>;
  campaignsForFandom?: Resolver<Maybe<ResolversTypes['CampaignConnection']>, ParentType, ContextType, RequireFields<QueryCampaignsForFandomArgs, 'fandomId' | 'first'>>;
  chatByEventId?: Resolver<Maybe<ResolversTypes['EventChat']>, ParentType, ContextType, RequireFields<QueryChatByEventIdArgs, 'eventId'>>;
  chatByFandomId?: Resolver<Maybe<ResolversTypes['FandomChat']>, ParentType, ContextType, RequireFields<QueryChatByFandomIdArgs, 'fandomId'>>;
  chatByLivestreamId?: Resolver<Maybe<ResolversTypes['LivestreamChat']>, ParentType, ContextType, RequireFields<QueryChatByLivestreamIdArgs, 'livestreamId'>>;
  chatToken?: Resolver<Maybe<ResolversTypes['ChatToken']>, ParentType, ContextType>;
  comment?: Resolver<Maybe<ResolversTypes['Comment']>, ParentType, ContextType, RequireFields<QueryCommentArgs, 'commentId'>>;
  communityAdminFeed?: Resolver<Maybe<ResolversTypes['FeedItemConnection']>, ParentType, ContextType, RequireFields<QueryCommunityAdminFeedArgs, 'fandomId' | 'filter' | 'first'>>;
  communityFeed?: Resolver<Maybe<ResolversTypes['FeedItemConnection']>, ParentType, ContextType, RequireFields<QueryCommunityFeedArgs, 'fandomId' | 'filter' | 'first'>>;
  event?: Resolver<Maybe<ResolversTypes['Event']>, ParentType, ContextType, RequireFields<QueryEventArgs, 'id'>>;
  eventFeed?: Resolver<Maybe<ResolversTypes['FeedItemConnection']>, ParentType, ContextType, RequireFields<QueryEventFeedArgs, 'fandomId' | 'filter' | 'first'>>;
  exploreFeed?: Resolver<Maybe<ResolversTypes['HighlightsFromCommunityConnection']>, ParentType, ContextType, RequireFields<QueryExploreFeedArgs, 'filter' | 'first'>>;
  fandom?: Resolver<Maybe<ResolversTypes['Fandom']>, ParentType, ContextType, RequireFields<QueryFandomArgs, 'fandomId'>>;
  fandomByHandle?: Resolver<Maybe<ResolversTypes['Fandom']>, ParentType, ContextType, RequireFields<QueryFandomByHandleArgs, 'handle'>>;
  fandomMemberReputation?: Resolver<Maybe<ResolversTypes['FandomMemberReputation']>, ParentType, ContextType, RequireFields<QueryFandomMemberReputationArgs, 'input'>>;
  fandomMemberReputationHistory?: Resolver<Maybe<ResolversTypes['FandomMemberReputationConnection']>, ParentType, ContextType, RequireFields<QueryFandomMemberReputationHistoryArgs, 'input'>>;
  fandomMemberReputationV2?: Resolver<Maybe<ResolversTypes['FandomMemberReputationV2']>, ParentType, ContextType, RequireFields<QueryFandomMemberReputationV2Args, 'input'>>;
  fandomReputation?: Resolver<Maybe<ResolversTypes['FandomReputation']>, ParentType, ContextType, RequireFields<QueryFandomReputationArgs, 'input'>>;
  fandomReputationHistory?: Resolver<Maybe<ResolversTypes['FandomReputationConnection']>, ParentType, ContextType, RequireFields<QueryFandomReputationHistoryArgs, 'input'>>;
  fandomThemesList?: Resolver<Array<ResolversTypes['FandomTheme']>, ParentType, ContextType>;
  fandoms?: Resolver<Maybe<ResolversTypes['FandomConnection']>, ParentType, ContextType, Partial<QueryFandomsArgs>>;
  friendsOfUser?: Resolver<ResolversTypes['UserConnection'], ParentType, ContextType, RequireFields<QueryFriendsOfUserArgs, 'first' | 'userId'>>;
  homeFeedHighlights?: Resolver<Maybe<ResolversTypes['HighlightsFromCommunityConnection']>, ParentType, ContextType, RequireFields<QueryHomeFeedHighlightsArgs, 'filter' | 'first'>>;
  homeFeedSections?: Resolver<Maybe<ResolversTypes['HomeFeedSectionConnection']>, ParentType, ContextType, RequireFields<QueryHomeFeedSectionsArgs, 'filter'>>;
  image?: Resolver<Maybe<ResolversTypes['Image']>, ParentType, ContextType, RequireFields<QueryImageArgs, 'id'>>;
  inbox?: Resolver<ResolversTypes['InboxNotificationConnection'], ParentType, ContextType, RequireFields<QueryInboxArgs, 'first'>>;
  inboxConfiguration?: Resolver<ResolversTypes['InboxConfiguration'], ParentType, ContextType>;
  livestreamByAuthenticatedUser?: Resolver<Maybe<ResolversTypes['LivestreamByAuthenticatedUser']>, ParentType, ContextType>;
  livestreamByFandomId?: Resolver<Maybe<ResolversTypes['Livestream']>, ParentType, ContextType, Partial<QueryLivestreamByFandomIdArgs>>;
  livestreamById?: Resolver<Maybe<ResolversTypes['Livestream']>, ParentType, ContextType, Partial<QueryLivestreamByIdArgs>>;
  livestreamByUserId?: Resolver<Maybe<ResolversTypes['Livestream']>, ParentType, ContextType, Partial<QueryLivestreamByUserIdArgs>>;
  livestreamQuestions?: Resolver<Maybe<ResolversTypes['LivestreamQuestions']>, ParentType, ContextType, RequireFields<QueryLivestreamQuestionsArgs, 'livestreamId'>>;
  livestreamQuestionsConnection?: Resolver<Maybe<ResolversTypes['LivestreamQuestionsConnection']>, ParentType, ContextType, RequireFields<QueryLivestreamQuestionsConnectionArgs, 'livestreamId'>>;
  livestreamTopQuestions?: Resolver<Maybe<ResolversTypes['LivestreamQuestions']>, ParentType, ContextType, RequireFields<QueryLivestreamTopQuestionsArgs, 'livestreamId'>>;
  livestreamViewers?: Resolver<Maybe<ResolversTypes['LivestreamViewerConnection']>, ParentType, ContextType, Partial<QueryLivestreamViewersArgs>>;
  livestreams?: Resolver<Maybe<ResolversTypes['LivestreamConnection']>, ParentType, ContextType, Partial<QueryLivestreamsArgs>>;
  memberInviteLink?: Resolver<Maybe<ResolversTypes['MemberInviteLink']>, ParentType, ContextType, Partial<QueryMemberInviteLinkArgs>>;
  moderationAppealInfo?: Resolver<Maybe<ResolversTypes['ModerationAppealInfo']>, ParentType, ContextType, RequireFields<QueryModerationAppealInfoArgs, 'input'>>;
  moderationCounters?: Resolver<Maybe<ResolversTypes['ModerationCountersPayload']>, ParentType, ContextType, RequireFields<QueryModerationCountersArgs, 'filter'>>;
  moderationJobByEntityId?: Resolver<Maybe<ResolversTypes['ModerationJob']>, ParentType, ContextType, RequireFields<QueryModerationJobByEntityIdArgs, 'entityId'>>;
  moderationJobs?: Resolver<Maybe<ResolversTypes['ModerationJobsConnection']>, ParentType, ContextType, Partial<QueryModerationJobsArgs>>;
  moderationJobsCount?: Resolver<ResolversTypes['String'], ParentType, ContextType, Partial<QueryModerationJobsCountArgs>>;
  moderationJobsCounters?: Resolver<Maybe<ResolversTypes['ModerationJobsCountersPayload']>, ParentType, ContextType>;
  poll?: Resolver<Maybe<ResolversTypes['Poll']>, ParentType, ContextType, RequireFields<QueryPollArgs, 'id'>>;
  post?: Resolver<Maybe<ResolversTypes['Post']>, ParentType, ContextType, RequireFields<QueryPostArgs, 'id'>>;
  product?: Resolver<Maybe<ResolversTypes['Product']>, ParentType, ContextType, RequireFields<QueryProductArgs, 'id'>>;
  productVariants?: Resolver<Maybe<ResolversTypes['VariantConnection']>, ParentType, ContextType, RequireFields<QueryProductVariantsArgs, 'first' | 'storeId'>>;
  products?: Resolver<ResolversTypes['ProductConnection'], ParentType, ContextType, RequireFields<QueryProductsArgs, 'first' | 'storeId'>>;
  profile?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType, Partial<QueryProfileArgs>>;
  profileFeed?: Resolver<Maybe<ResolversTypes['FeedItemConnection']>, ParentType, ContextType, RequireFields<QueryProfileFeedArgs, 'filter' | 'first' | 'userId'>>;
  reactableLikeReactions?: Resolver<Maybe<ResolversTypes['ReactionConnection']>, ParentType, ContextType, RequireFields<QueryReactableLikeReactionsArgs, 'first' | 'reactableId' | 'reactableType'>>;
  reportNotes?: Resolver<Maybe<ResolversTypes['ReportNoteConnection']>, ParentType, ContextType, RequireFields<QueryReportNotesArgs, 'jobId'>>;
  reporterAppealNotes?: Resolver<Maybe<ResolversTypes['AppealNoteConnection']>, ParentType, ContextType, RequireFields<QueryReporterAppealNotesArgs, 'jobId'>>;
  searchContent?: Resolver<ResolversTypes['ContentSearchConnection'], ParentType, ContextType, RequireFields<QuerySearchContentArgs, 'first' | 'term'>>;
  searchFandoms?: Resolver<ResolversTypes['FandomSearchConnection'], ParentType, ContextType, RequireFields<QuerySearchFandomsArgs, 'first' | 'term'>>;
  searchMyFandoms?: Resolver<ResolversTypes['MyFandomSearchConnection'], ParentType, ContextType, RequireFields<QuerySearchMyFandomsArgs, 'admin_only' | 'first'>>;
  searchPosts?: Resolver<ResolversTypes['PostSearchConnection'], ParentType, ContextType, RequireFields<QuerySearchPostsArgs, 'first' | 'term'>>;
  searchPostsWithFilter?: Resolver<ResolversTypes['PostSearchWithFilterConnection'], ParentType, ContextType, RequireFields<QuerySearchPostsWithFilterArgs, 'endDate' | 'fandomId' | 'first' | 'startDate'>>;
  searchUsers?: Resolver<ResolversTypes['UserSearchConnection'], ParentType, ContextType, RequireFields<QuerySearchUsersArgs, 'first' | 'term'>>;
  storeByFandom?: Resolver<Maybe<ResolversTypes['StorePayload']>, ParentType, ContextType, RequireFields<QueryStoreByFandomArgs, 'fandomId'>>;
  suggestFandoms?: Resolver<ResolversTypes['FandomSuggestionConnection'], ParentType, ContextType, RequireFields<QuerySuggestFandomsArgs, 'first' | 'term'>>;
  suggestUsers?: Resolver<ResolversTypes['UserSuggestionConnection'], ParentType, ContextType, RequireFields<QuerySuggestUsersArgs, 'first' | 'term'>>;
  userByHandle?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType, RequireFields<QueryUserByHandleArgs, 'handle'>>;
  userLikeReactions?: Resolver<Maybe<ResolversTypes['ReactionConnection']>, ParentType, ContextType, RequireFields<QueryUserLikeReactionsArgs, 'first'>>;
  video?: Resolver<Maybe<ResolversTypes['Video']>, ParentType, ContextType, RequireFields<QueryVideoArgs, 'id'>>;
  wallet?: Resolver<Maybe<ResolversTypes['Wallet']>, ParentType, ContextType, RequireFields<QueryWalletArgs, 'walletId'>>;
  walletByDate?: Resolver<Maybe<ResolversTypes['WalletByDate']>, ParentType, ContextType, RequireFields<QueryWalletByDateArgs, 'date' | 'walletId'>>;
  walletByDates?: Resolver<Maybe<ResolversTypes['WalletByDateConnection']>, ParentType, ContextType, RequireFields<QueryWalletByDatesArgs, 'first' | 'walletId'>>;
  walletByFandoms?: Resolver<Maybe<ResolversTypes['WalletByFandomConnection']>, ParentType, ContextType, RequireFields<QueryWalletByFandomsArgs, 'first' | 'walletId'>>;
  walletTransactions?: Resolver<Maybe<ResolversTypes['WalletTransactionConnection']>, ParentType, ContextType, RequireFields<QueryWalletTransactionsArgs, 'first' | 'walletId'>>;
};

export type ReactableResolvers<ContextType = any, ParentType extends ResolversParentTypes['Reactable'] = ResolversParentTypes['Reactable']> = {
  __resolveType: TypeResolveFn<'Comment' | 'Event' | 'Poll' | 'Post', ParentType, ContextType>;
};

export type ReactionResolvers<ContextType = any, ParentType extends ResolversParentTypes['Reaction'] = ResolversParentTypes['Reaction']> = {
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  likeInfo?: Resolver<Maybe<ResolversTypes['LikeInformation']>, ParentType, ContextType>;
  reactable?: Resolver<Maybe<ResolversTypes['Reactable']>, ParentType, ContextType>;
  user?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ReactionConnectionResolvers<ContextType = any, ParentType extends ResolversParentTypes['ReactionConnection'] = ResolversParentTypes['ReactionConnection']> = {
  edges?: Resolver<Array<Maybe<ResolversTypes['ReactionEdge']>>, ParentType, ContextType>;
  pageInfo?: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ReactionEdgeResolvers<ContextType = any, ParentType extends ResolversParentTypes['ReactionEdge'] = ResolversParentTypes['ReactionEdge']> = {
  cursor?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  node?: Resolver<ResolversTypes['Reaction'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type RecommendedFeedItemInformationResolvers<ContextType = any, ParentType extends ResolversParentTypes['RecommendedFeedItemInformation'] = ResolversParentTypes['RecommendedFeedItemInformation']> = {
  source?: Resolver<Maybe<ResolversTypes['FeedItemSourceType']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type RegisterPushNotificationTokenPayloadResolvers<ContextType = any, ParentType extends ResolversParentTypes['RegisterPushNotificationTokenPayload'] = ResolversParentTypes['RegisterPushNotificationTokenPayload']> = {
  deviceInstanceId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  pushNotificationToken?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  source?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type RegularFeedItemInformationResolvers<ContextType = any, ParentType extends ResolversParentTypes['RegularFeedItemInformation'] = ResolversParentTypes['RegularFeedItemInformation']> = {
  source?: Resolver<Maybe<ResolversTypes['FeedItemSourceType']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type RejectFriendRequestPayloadResolvers<ContextType = any, ParentType extends ResolversParentTypes['RejectFriendRequestPayload'] = ResolversParentTypes['RejectFriendRequestPayload']> = {
  user?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type RejectJoinHiddenFandomPayloadResolvers<ContextType = any, ParentType extends ResolversParentTypes['RejectJoinHiddenFandomPayload'] = ResolversParentTypes['RejectJoinHiddenFandomPayload']> = {
  fandomId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  roles?: Resolver<Maybe<Array<ResolversTypes['FandomMemberRole']>>, ParentType, ContextType>;
  status?: Resolver<Maybe<ResolversTypes['FandomMemberStatus']>, ParentType, ContextType>;
  user?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type RejectJoinPrivateFandomPayloadResolvers<ContextType = any, ParentType extends ResolversParentTypes['RejectJoinPrivateFandomPayload'] = ResolversParentTypes['RejectJoinPrivateFandomPayload']> = {
  member?: Resolver<ResolversTypes['FandomMember'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type RemoveFandomAdminPayloadResolvers<ContextType = any, ParentType extends ResolversParentTypes['RemoveFandomAdminPayload'] = ResolversParentTypes['RemoveFandomAdminPayload']> = {
  member?: Resolver<ResolversTypes['FandomMember'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type RemoveFandomMemberPayloadResolvers<ContextType = any, ParentType extends ResolversParentTypes['RemoveFandomMemberPayload'] = ResolversParentTypes['RemoveFandomMemberPayload']> = {
  member?: Resolver<ResolversTypes['FandomMember'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type RemovePlatformMemberRolePayloadResolvers<ContextType = any, ParentType extends ResolversParentTypes['RemovePlatformMemberRolePayload'] = ResolversParentTypes['RemovePlatformMemberRolePayload']> = {
  user?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ReportCountResolvers<ContextType = any, ParentType extends ResolversParentTypes['ReportCount'] = ResolversParentTypes['ReportCount']> = {
  count?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  reportReason?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ReportEntityByMemberPayloadResolvers<ContextType = any, ParentType extends ResolversParentTypes['ReportEntityByMemberPayload'] = ResolversParentTypes['ReportEntityByMemberPayload']> = {
  entityId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ReportInfoResolvers<ContextType = any, ParentType extends ResolversParentTypes['ReportInfo'] = ResolversParentTypes['ReportInfo']> = {
  aiReports?: Resolver<Array<ResolversTypes['AiReport']>, ParentType, ContextType>;
  reportCounts?: Resolver<Array<ResolversTypes['ReportCount']>, ParentType, ContextType>;
  reportNotesCount?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  totalReportCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ReportNoteResolvers<ContextType = any, ParentType extends ResolversParentTypes['ReportNote'] = ResolversParentTypes['ReportNote']> = {
  date?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  reportReason?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  text?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  user?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ReportNoteConnectionResolvers<ContextType = any, ParentType extends ResolversParentTypes['ReportNoteConnection'] = ResolversParentTypes['ReportNoteConnection']> = {
  edges?: Resolver<Array<Maybe<ResolversTypes['ReportNoteEdge']>>, ParentType, ContextType>;
  pageInfo?: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ReportNoteEdgeResolvers<ContextType = any, ParentType extends ResolversParentTypes['ReportNoteEdge'] = ResolversParentTypes['ReportNoteEdge']> = {
  cursor?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  node?: Resolver<Maybe<ResolversTypes['ReportNote']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ReportResponseNotificationResolvers<ContextType = any, ParentType extends ResolversParentTypes['ReportResponseNotification'] = ResolversParentTypes['ReportResponseNotification']> = {
  acknowledged?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  composition?: Resolver<Maybe<ResolversTypes['InboxComposition']>, ParentType, ContextType>;
  confirmed?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  fandom?: Resolver<Maybe<ResolversTypes['Fandom']>, ParentType, ContextType>;
  feedItem?: Resolver<Maybe<ResolversTypes['InboxFeedItem']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  inReplyTo?: Resolver<Maybe<ResolversTypes['InboxComposition']>, ParentType, ContextType>;
  moderatedByAaqua?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  read?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  time?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ReportUserPayloadResolvers<ContextType = any, ParentType extends ResolversParentTypes['ReportUserPayload'] = ResolversParentTypes['ReportUserPayload']> = {
  user?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ReportersAppealInfoResolvers<ContextType = any, ParentType extends ResolversParentTypes['ReportersAppealInfo'] = ResolversParentTypes['ReportersAppealInfo']> = {
  count?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ReputationScoreAudienceFilterResolvers<ContextType = any, ParentType extends ResolversParentTypes['ReputationScoreAudienceFilter'] = ResolversParentTypes['ReputationScoreAudienceFilter']> = {
  maxReputationScore?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  minReputationScore?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type RequestJoinPrivateFandomPayloadResolvers<ContextType = any, ParentType extends ResolversParentTypes['RequestJoinPrivateFandomPayload'] = ResolversParentTypes['RequestJoinPrivateFandomPayload']> = {
  member?: Resolver<Maybe<ResolversTypes['FandomMember']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ResetUserProfilePayloadResolvers<ContextType = any, ParentType extends ResolversParentTypes['ResetUserProfilePayload'] = ResolversParentTypes['ResetUserProfilePayload']> = {
  moderationJob?: Resolver<ResolversTypes['ModerationJob'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ReviewAiLabelsPayloadResolvers<ContextType = any, ParentType extends ResolversParentTypes['ReviewAiLabelsPayload'] = ResolversParentTypes['ReviewAiLabelsPayload']> = {
  entityId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ReviewUserModerationJobPayloadResolvers<ContextType = any, ParentType extends ResolversParentTypes['ReviewUserModerationJobPayload'] = ResolversParentTypes['ReviewUserModerationJobPayload']> = {
  moderationJob?: Resolver<ResolversTypes['ModerationJob'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ScoreComponentsResolvers<ContextType = any, ParentType extends ResolversParentTypes['ScoreComponents'] = ResolversParentTypes['ScoreComponents']> = {
  mi?: Resolver<ResolversTypes['MeaningfulInteractions'], ParentType, ContextType>;
  qc?: Resolver<ResolversTypes['QualityContent'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ShareFandomPayloadResolvers<ContextType = any, ParentType extends ResolversParentTypes['ShareFandomPayload'] = ResolversParentTypes['ShareFandomPayload']> = {
  content?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  fandom?: Resolver<Maybe<ResolversTypes['Fandom']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  recipients?: Resolver<Array<Maybe<ResolversTypes['User']>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type StartFandomChatPayloadResolvers<ContextType = any, ParentType extends ResolversParentTypes['StartFandomChatPayload'] = ResolversParentTypes['StartFandomChatPayload']> = {
  chat?: Resolver<ResolversTypes['FandomChat'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type StartLivestreamChatPayloadResolvers<ContextType = any, ParentType extends ResolversParentTypes['StartLivestreamChatPayload'] = ResolversParentTypes['StartLivestreamChatPayload']> = {
  chat?: Resolver<ResolversTypes['LivestreamChat'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type StartLivestreamPayloadResolvers<ContextType = any, ParentType extends ResolversParentTypes['StartLivestreamPayload'] = ResolversParentTypes['StartLivestreamPayload']> = {
  ingestServer?: Resolver<Maybe<ResolversTypes['IngestServer']>, ParentType, ContextType>;
  livestream?: Resolver<Maybe<ResolversTypes['Livestream']>, ParentType, ContextType>;
  message?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  status?: Resolver<ResolversTypes['LivestreamMutationStatus'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type StartPrivateChatPayloadResolvers<ContextType = any, ParentType extends ResolversParentTypes['StartPrivateChatPayload'] = ResolversParentTypes['StartPrivateChatPayload']> = {
  chat?: Resolver<ResolversTypes['PrivateChat'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type StopLivestreamPayloadResolvers<ContextType = any, ParentType extends ResolversParentTypes['StopLivestreamPayload'] = ResolversParentTypes['StopLivestreamPayload']> = {
  message?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  status?: Resolver<ResolversTypes['LivestreamMutationStatus'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type StoreResolvers<ContextType = any, ParentType extends ResolversParentTypes['Store'] = ResolversParentTypes['Store']> = {
  active?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  contactCountryCode?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  contactNumber?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  content?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  creator?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  ctaImg?: Resolver<Maybe<ResolversTypes['Image']>, ParentType, ContextType>;
  currency?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  email?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  fandom?: Resolver<Maybe<ResolversTypes['Fandom']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  storeUrl?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  storeUrlTitle?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  tags?: Resolver<Maybe<Array<ResolversTypes['String']>>, ParentType, ContextType>;
  title?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  updatedAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  updater?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type StorePayloadResolvers<ContextType = any, ParentType extends ResolversParentTypes['StorePayload'] = ResolversParentTypes['StorePayload']> = {
  status?: Resolver<ResolversTypes['StoreStatus'], ParentType, ContextType>;
  store?: Resolver<Maybe<ResolversTypes['Store']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SuspendUserPayloadResolvers<ContextType = any, ParentType extends ResolversParentTypes['SuspendUserPayload'] = ResolversParentTypes['SuspendUserPayload']> = {
  moderationJob?: Resolver<ResolversTypes['ModerationJob'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type TargetedFeedItemInformationResolvers<ContextType = any, ParentType extends ResolversParentTypes['TargetedFeedItemInformation'] = ResolversParentTypes['TargetedFeedItemInformation']> = {
  source?: Resolver<Maybe<ResolversTypes['FeedItemSourceType']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type TopParentEntityResolvers<ContextType = any, ParentType extends ResolversParentTypes['TopParentEntity'] = ResolversParentTypes['TopParentEntity']> = {
  __resolveType: TypeResolveFn<'Event' | 'Poll' | 'Post', ParentType, ContextType>;
};

export type TriggerSpecificationResolvers<ContextType = any, ParentType extends ResolversParentTypes['TriggerSpecification'] = ResolversParentTypes['TriggerSpecification']> = {
  fandomJoinedSinceTriggerFilter?: Resolver<Maybe<ResolversTypes['FandomJoinedSinceTriggerFilter']>, ParentType, ContextType>;
  fandomJoinedTriggerFilter?: Resolver<Maybe<ResolversTypes['FandomJoinedTriggerFilter']>, ParentType, ContextType>;
  fandomVisitedTriggerFilter?: Resolver<Maybe<ResolversTypes['FandomVisitedTriggerFilter']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UndoFriendshipRequestPayloadResolvers<ContextType = any, ParentType extends ResolversParentTypes['UndoFriendshipRequestPayload'] = ResolversParentTypes['UndoFriendshipRequestPayload']> = {
  user?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UnlikeReactionPayloadResolvers<ContextType = any, ParentType extends ResolversParentTypes['UnlikeReactionPayload'] = ResolversParentTypes['UnlikeReactionPayload']> = {
  reaction?: Resolver<ResolversTypes['LikeReaction'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UnpinContentPayloadResolvers<ContextType = any, ParentType extends ResolversParentTypes['UnpinContentPayload'] = ResolversParentTypes['UnpinContentPayload']> = {
  content?: Resolver<Maybe<ResolversTypes['PinnedContent']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UnregisterPushNotificationTokenPayloadResolvers<ContextType = any, ParentType extends ResolversParentTypes['UnregisterPushNotificationTokenPayload'] = ResolversParentTypes['UnregisterPushNotificationTokenPayload']> = {
  deviceInstanceId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  pushNotificationToken?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  source?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UpdateCampaignPayloadResolvers<ContextType = any, ParentType extends ResolversParentTypes['UpdateCampaignPayload'] = ResolversParentTypes['UpdateCampaignPayload']> = {
  campaign?: Resolver<Maybe<ResolversTypes['Campaign']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UpdateCommentPayloadResolvers<ContextType = any, ParentType extends ResolversParentTypes['UpdateCommentPayload'] = ResolversParentTypes['UpdateCommentPayload']> = {
  comment?: Resolver<ResolversTypes['Comment'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UpdateEventPartialPayloadResolvers<ContextType = any, ParentType extends ResolversParentTypes['UpdateEventPartialPayload'] = ResolversParentTypes['UpdateEventPartialPayload']> = {
  event?: Resolver<ResolversTypes['Event'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UpdateEventPayloadResolvers<ContextType = any, ParentType extends ResolversParentTypes['UpdateEventPayload'] = ResolversParentTypes['UpdateEventPayload']> = {
  event?: Resolver<ResolversTypes['Event'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UpdateFandomPayloadResolvers<ContextType = any, ParentType extends ResolversParentTypes['UpdateFandomPayload'] = ResolversParentTypes['UpdateFandomPayload']> = {
  fandom?: Resolver<ResolversTypes['Fandom'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UpdatePostPayloadResolvers<ContextType = any, ParentType extends ResolversParentTypes['UpdatePostPayload'] = ResolversParentTypes['UpdatePostPayload']> = {
  post?: Resolver<ResolversTypes['Post'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UpdateProductPayloadResolvers<ContextType = any, ParentType extends ResolversParentTypes['UpdateProductPayload'] = ResolversParentTypes['UpdateProductPayload']> = {
  error?: Resolver<Maybe<ResolversTypes['EntityError']>, ParentType, ContextType>;
  message?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  product?: Resolver<Maybe<ResolversTypes['Product']>, ParentType, ContextType>;
  status?: Resolver<ResolversTypes['StoreMutationStatus'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UpdateStorePayloadResolvers<ContextType = any, ParentType extends ResolversParentTypes['UpdateStorePayload'] = ResolversParentTypes['UpdateStorePayload']> = {
  error?: Resolver<Maybe<ResolversTypes['EntityError']>, ParentType, ContextType>;
  message?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  status?: Resolver<ResolversTypes['StoreMutationStatus'], ParentType, ContextType>;
  store?: Resolver<Maybe<ResolversTypes['Store']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UpdateUserProfilePayloadResolvers<ContextType = any, ParentType extends ResolversParentTypes['UpdateUserProfilePayload'] = ResolversParentTypes['UpdateUserProfilePayload']> = {
  user?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UpdateVariantPayloadResolvers<ContextType = any, ParentType extends ResolversParentTypes['UpdateVariantPayload'] = ResolversParentTypes['UpdateVariantPayload']> = {
  error?: Resolver<Maybe<ResolversTypes['EntityError']>, ParentType, ContextType>;
  message?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  status?: Resolver<ResolversTypes['StoreMutationStatus'], ParentType, ContextType>;
  variant?: Resolver<Maybe<ResolversTypes['Variant']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UploadImageResolvers<ContextType = any, ParentType extends ResolversParentTypes['UploadImage'] = ResolversParentTypes['UploadImage']> = {
  cdnUrl?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  contentType?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  image?: Resolver<ResolversTypes['Image'], ParentType, ContextType>;
  url?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UploadVideoPayloadResolvers<ContextType = any, ParentType extends ResolversParentTypes['UploadVideoPayload'] = ResolversParentTypes['UploadVideoPayload']> = {
  url?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  video?: Resolver<ResolversTypes['Video'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UserResolvers<ContextType = any, ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']> = {
  badges?: Resolver<Maybe<ResolversTypes['BadgeConnection']>, ParentType, ContextType, RequireFields<UserBadgesArgs, 'badgeAwardStatus' | 'first'>>;
  bio?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  coverImage?: Resolver<Maybe<ResolversTypes['Image']>, ParentType, ContextType>;
  coverImageUrl?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  dateOfBirth?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
  deleted?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  email?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  fandomsAdminOf?: Resolver<Maybe<ResolversTypes['FandomConnection']>, ParentType, ContextType, Partial<UserFandomsAdminOfArgs>>;
  fandomsMemberOf?: Resolver<Maybe<ResolversTypes['FandomConnection']>, ParentType, ContextType, Partial<UserFandomsMemberOfArgs>>;
  fandomsMemberOfCount?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  friendCount?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  friendshipStatus?: Resolver<Maybe<ResolversTypes['FriendshipStatus']>, ParentType, ContextType>;
  handle?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  identified?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  livestream?: Resolver<Maybe<ResolversTypes['Livestream']>, ParentType, ContextType>;
  membershipOfFandom?: Resolver<Maybe<ResolversTypes['FandomMember']>, ParentType, ContextType, RequireFields<UserMembershipOfFandomArgs, 'fandomId'>>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  pendingVerification?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  phone?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  platformMemberRoles?: Resolver<Maybe<Array<ResolversTypes['PlatformMemberRole']>>, ParentType, ContextType>;
  profilePicture?: Resolver<Maybe<ResolversTypes['Image']>, ParentType, ContextType>;
  profilePictureUrl?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  realName?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  tagsList?: Resolver<Maybe<Array<ResolversTypes['String']>>, ParentType, ContextType>;
  visibility?: Resolver<Maybe<ResolversTypes['ProfileVisibility']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UserConnectionResolvers<ContextType = any, ParentType extends ResolversParentTypes['UserConnection'] = ResolversParentTypes['UserConnection']> = {
  edges?: Resolver<Array<ResolversTypes['UserEdge']>, ParentType, ContextType>;
  pageInfo?: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UserEdgeResolvers<ContextType = any, ParentType extends ResolversParentTypes['UserEdge'] = ResolversParentTypes['UserEdge']> = {
  cursor?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  node?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UserEventResponsePayloadResolvers<ContextType = any, ParentType extends ResolversParentTypes['UserEventResponsePayload'] = ResolversParentTypes['UserEventResponsePayload']> = {
  event?: Resolver<ResolversTypes['Event'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UserMentionNotificationResolvers<ContextType = any, ParentType extends ResolversParentTypes['UserMentionNotification'] = ResolversParentTypes['UserMentionNotification']> = {
  acknowledged?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  composition?: Resolver<Maybe<ResolversTypes['InboxComposition']>, ParentType, ContextType>;
  fandom?: Resolver<Maybe<ResolversTypes['Fandom']>, ParentType, ContextType>;
  feedItem?: Resolver<Maybe<ResolversTypes['InboxFeedItem']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  inReplyTo?: Resolver<Maybe<ResolversTypes['InboxComposition']>, ParentType, ContextType>;
  mention?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  mentioner?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  read?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  time?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UserModerationInfoResolvers<ContextType = any, ParentType extends ResolversParentTypes['UserModerationInfo'] = ResolversParentTypes['UserModerationInfo']> = {
  user?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UserSearchConnectionResolvers<ContextType = any, ParentType extends ResolversParentTypes['UserSearchConnection'] = ResolversParentTypes['UserSearchConnection']> = {
  edges?: Resolver<Array<ResolversTypes['UserSearchEdge']>, ParentType, ContextType>;
  pageInfo?: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UserSearchEdgeResolvers<ContextType = any, ParentType extends ResolversParentTypes['UserSearchEdge'] = ResolversParentTypes['UserSearchEdge']> = {
  cursor?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  node?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UserSuggestionConnectionResolvers<ContextType = any, ParentType extends ResolversParentTypes['UserSuggestionConnection'] = ResolversParentTypes['UserSuggestionConnection']> = {
  edges?: Resolver<Array<ResolversTypes['UserSuggestionEdge']>, ParentType, ContextType>;
  pageInfo?: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UserSuggestionEdgeResolvers<ContextType = any, ParentType extends ResolversParentTypes['UserSuggestionEdge'] = ResolversParentTypes['UserSuggestionEdge']> = {
  cursor?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  node?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type VariantResolvers<ContextType = any, ParentType extends ResolversParentTypes['Variant'] = ResolversParentTypes['Variant']> = {
  attributes?: Resolver<Array<ResolversTypes['VariantAttribute']>, ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  creator?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  externalUrl?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  images?: Resolver<Array<Maybe<ResolversTypes['Image']>>, ParentType, ContextType>;
  label?: Resolver<ResolversTypes['VariantLabel'], ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  price?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  product?: Resolver<ResolversTypes['Product'], ParentType, ContextType>;
  salePrice?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  saleValidFrom?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  saleValidTo?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  sku?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  updater?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type VariantAttributeResolvers<ContextType = any, ParentType extends ResolversParentTypes['VariantAttribute'] = ResolversParentTypes['VariantAttribute']> = {
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  value?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type VariantConnectionResolvers<ContextType = any, ParentType extends ResolversParentTypes['VariantConnection'] = ResolversParentTypes['VariantConnection']> = {
  edges?: Resolver<Array<Maybe<ResolversTypes['VariantEdge']>>, ParentType, ContextType>;
  pageInfo?: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type VariantEdgeResolvers<ContextType = any, ParentType extends ResolversParentTypes['VariantEdge'] = ResolversParentTypes['VariantEdge']> = {
  cursor?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  node?: Resolver<ResolversTypes['Variant'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type VideoResolvers<ContextType = any, ParentType extends ResolversParentTypes['Video'] = ResolversParentTypes['Video']> = {
  aiLabels?: Resolver<Maybe<Array<ResolversTypes['AiLabel']>>, ParentType, ContextType>;
  coverImageUrl?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  height?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  heigth?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  online?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  ratio?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  status?: Resolver<ResolversTypes['VideoStatus'], ParentType, ContextType>;
  statusRemarks?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  videoUrl?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  width?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ViewersResolvers<ContextType = any, ParentType extends ResolversParentTypes['Viewers'] = ResolversParentTypes['Viewers']> = {
  list?: Resolver<Maybe<Array<Maybe<ResolversTypes['User']>>>, ParentType, ContextType>;
  viewerCount?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type WalletResolvers<ContextType = any, ParentType extends ResolversParentTypes['Wallet'] = ResolversParentTypes['Wallet']> = {
  balance?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  fandom?: Resolver<Maybe<ResolversTypes['Fandom']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  lastUpdate?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  user?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type WalletByDateResolvers<ContextType = any, ParentType extends ResolversParentTypes['WalletByDate'] = ResolversParentTypes['WalletByDate']> = {
  balance?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  date?: Resolver<ResolversTypes['Date'], ParentType, ContextType>;
  lastUpdate?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  transactions?: Resolver<Array<ResolversTypes['TransactionType']>, ParentType, ContextType>;
  wallet?: Resolver<ResolversTypes['Wallet'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type WalletByDateConnectionResolvers<ContextType = any, ParentType extends ResolversParentTypes['WalletByDateConnection'] = ResolversParentTypes['WalletByDateConnection']> = {
  edges?: Resolver<Maybe<Array<Maybe<ResolversTypes['WalletByDateEdge']>>>, ParentType, ContextType>;
  pageInfo?: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type WalletByDateEdgeResolvers<ContextType = any, ParentType extends ResolversParentTypes['WalletByDateEdge'] = ResolversParentTypes['WalletByDateEdge']> = {
  cursor?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  node?: Resolver<Maybe<ResolversTypes['WalletByDate']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type WalletByFandomResolvers<ContextType = any, ParentType extends ResolversParentTypes['WalletByFandom'] = ResolversParentTypes['WalletByFandom']> = {
  fandom?: Resolver<Maybe<ResolversTypes['Fandom']>, ParentType, ContextType>;
  lastUpdate?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  totalCredit?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  wallet?: Resolver<ResolversTypes['Wallet'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type WalletByFandomConnectionResolvers<ContextType = any, ParentType extends ResolversParentTypes['WalletByFandomConnection'] = ResolversParentTypes['WalletByFandomConnection']> = {
  edges?: Resolver<Maybe<Array<Maybe<ResolversTypes['WalletByFandomEdge']>>>, ParentType, ContextType>;
  pageInfo?: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type WalletByFandomEdgeResolvers<ContextType = any, ParentType extends ResolversParentTypes['WalletByFandomEdge'] = ResolversParentTypes['WalletByFandomEdge']> = {
  cursor?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  node?: Resolver<Maybe<ResolversTypes['WalletByFandom']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type WalletMetadataResolvers<ContextType = any, ParentType extends ResolversParentTypes['WalletMetadata'] = ResolversParentTypes['WalletMetadata']> = {
  key?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  value?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type WalletTransactionResolvers<ContextType = any, ParentType extends ResolversParentTypes['WalletTransaction'] = ResolversParentTypes['WalletTransaction']> = {
  amount?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  balance?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  dateTime?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  entryType?: Resolver<ResolversTypes['EntryType'], ParentType, ContextType>;
  fandom?: Resolver<Maybe<ResolversTypes['Fandom']>, ParentType, ContextType>;
  metadata?: Resolver<Array<ResolversTypes['WalletMetadata']>, ParentType, ContextType>;
  transactionType?: Resolver<ResolversTypes['TransactionType'], ParentType, ContextType>;
  wallet?: Resolver<ResolversTypes['Wallet'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type WalletTransactionConnectionResolvers<ContextType = any, ParentType extends ResolversParentTypes['WalletTransactionConnection'] = ResolversParentTypes['WalletTransactionConnection']> = {
  edges?: Resolver<Maybe<Array<Maybe<ResolversTypes['WalletTransactionEdge']>>>, ParentType, ContextType>;
  pageInfo?: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type WalletTransactionEdgeResolvers<ContextType = any, ParentType extends ResolversParentTypes['WalletTransactionEdge'] = ResolversParentTypes['WalletTransactionEdge']> = {
  cursor?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  node?: Resolver<Maybe<ResolversTypes['WalletTransaction']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type WebsocketChannelResolvers<ContextType = any, ParentType extends ResolversParentTypes['WebsocketChannel'] = ResolversParentTypes['WebsocketChannel']> = {
  cipherKey?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type WebsocketEventResolvers<ContextType = any, ParentType extends ResolversParentTypes['WebsocketEvent'] = ResolversParentTypes['WebsocketEvent']> = {
  entityType?: Resolver<ResolversTypes['WebsocketEntityType'], ParentType, ContextType>;
  eventType?: Resolver<ResolversTypes['WebsocketEventType'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type WebsocketPresenceResolvers<ContextType = any, ParentType extends ResolversParentTypes['WebsocketPresence'] = ResolversParentTypes['WebsocketPresence']> = {
  presenceCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export interface ZonedDateTimeScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['ZonedDateTime'], any> {
  name: 'ZonedDateTime';
}

export type Resolvers<ContextType = any> = {
  AcceptFriendRequestPayload?: AcceptFriendRequestPayloadResolvers<ContextType>;
  AcceptJoinHiddenFandomPayload?: AcceptJoinHiddenFandomPayloadResolvers<ContextType>;
  AcknowledgeInboxNotificationsPayload?: AcknowledgeInboxNotificationsPayloadResolvers<ContextType>;
  AddFandomAdminPayload?: AddFandomAdminPayloadResolvers<ContextType>;
  AddPlatformMemberRolePayload?: AddPlatformMemberRolePayloadResolvers<ContextType>;
  Administrator?: AdministratorResolvers<ContextType>;
  AiLabel?: AiLabelResolvers<ContextType>;
  AiReport?: AiReportResolvers<ContextType>;
  AppealInfo?: AppealInfoResolvers<ContextType>;
  AppealModerationJobPayload?: AppealModerationJobPayloadResolvers<ContextType>;
  AppealNote?: AppealNoteResolvers<ContextType>;
  AppealNoteConnection?: AppealNoteConnectionResolvers<ContextType>;
  AppealNoteEdge?: AppealNoteEdgeResolvers<ContextType>;
  ApproveJoinPrivateFandomPayload?: ApproveJoinPrivateFandomPayloadResolvers<ContextType>;
  AttributeSummaryItem?: AttributeSummaryItemResolvers<ContextType>;
  AudienceSpecification?: AudienceSpecificationResolvers<ContextType>;
  Badge?: BadgeResolvers<ContextType>;
  BadgeCollectedNotification?: BadgeCollectedNotificationResolvers<ContextType>;
  BadgeConnection?: BadgeConnectionResolvers<ContextType>;
  BadgeEdge?: BadgeEdgeResolvers<ContextType>;
  BigInteger?: GraphQLScalarType;
  Campaign?: CampaignResolvers<ContextType>;
  CampaignConnection?: CampaignConnectionResolvers<ContextType>;
  CampaignEdge?: CampaignEdgeResolvers<ContextType>;
  CampaignItemContent?: CampaignItemContentResolvers<ContextType>;
  CampaignSpecification?: CampaignSpecificationResolvers<ContextType>;
  CancelJoinHiddenFandomPayload?: CancelJoinHiddenFandomPayloadResolvers<ContextType>;
  CancelJoinPrivateFandomPayload?: CancelJoinPrivateFandomPayloadResolvers<ContextType>;
  CastVotePayload?: CastVotePayloadResolvers<ContextType>;
  Chat?: ChatResolvers<ContextType>;
  ChatChannel?: ChatChannelResolvers<ContextType>;
  ChatToken?: ChatTokenResolvers<ContextType>;
  Comment?: CommentResolvers<ContextType>;
  CommentAttachment?: CommentAttachmentResolvers<ContextType>;
  CommentConnection?: CommentConnectionResolvers<ContextType>;
  CommentEdge?: CommentEdgeResolvers<ContextType>;
  CommentModerationInfo?: CommentModerationInfoResolvers<ContextType>;
  CommentNotification?: CommentNotificationResolvers<ContextType>;
  CommentParent?: CommentParentResolvers<ContextType>;
  CommunityRecommendedHighlights?: CommunityRecommendedHighlightsResolvers<ContextType>;
  ConnectEventChatPayload?: ConnectEventChatPayloadResolvers<ContextType>;
  ConnectFandomChatPayload?: ConnectFandomChatPayloadResolvers<ContextType>;
  ContentSearchConnection?: ContentSearchConnectionResolvers<ContextType>;
  ContentSearchEdge?: ContentSearchEdgeResolvers<ContextType>;
  ContentSearchNode?: ContentSearchNodeResolvers<ContextType>;
  CreateCampaignPayload?: CreateCampaignPayloadResolvers<ContextType>;
  CreateCommentPayload?: CreateCommentPayloadResolvers<ContextType>;
  CreateEventPayload?: CreateEventPayloadResolvers<ContextType>;
  CreateFandomPayload?: CreateFandomPayloadResolvers<ContextType>;
  CreateFriendRequestPayload?: CreateFriendRequestPayloadResolvers<ContextType>;
  CreateLikeReactionPayload?: CreateLikeReactionPayloadResolvers<ContextType>;
  CreatePollPayload?: CreatePollPayloadResolvers<ContextType>;
  CreatePostPayload?: CreatePostPayloadResolvers<ContextType>;
  CreateProductPayload?: CreateProductPayloadResolvers<ContextType>;
  CreateStorePayload?: CreateStorePayloadResolvers<ContextType>;
  CreateVariantPayload?: CreateVariantPayloadResolvers<ContextType>;
  CreatorAppealInfo?: CreatorAppealInfoResolvers<ContextType>;
  Date?: GraphQLScalarType;
  DateTime?: GraphQLScalarType;
  DeleteCampaignPayload?: DeleteCampaignPayloadResolvers<ContextType>;
  DeleteCommentPayload?: DeleteCommentPayloadResolvers<ContextType>;
  DeleteEventPayload?: DeleteEventPayloadResolvers<ContextType>;
  DeleteFriendshipPayload?: DeleteFriendshipPayloadResolvers<ContextType>;
  DeleteLikeReactionPayload?: DeleteLikeReactionPayloadResolvers<ContextType>;
  DeletePollPayload?: DeletePollPayloadResolvers<ContextType>;
  DeletePostPayload?: DeletePostPayloadResolvers<ContextType>;
  DeleteProductPayload?: DeleteProductPayloadResolvers<ContextType>;
  DeleteUserPayload?: DeleteUserPayloadResolvers<ContextType>;
  DeleteVariantPayload?: DeleteVariantPayloadResolvers<ContextType>;
  DeliverySpecification?: DeliverySpecificationResolvers<ContextType>;
  Duration?: GraphQLScalarType;
  EndFandomChatPayload?: EndFandomChatPayloadResolvers<ContextType>;
  EntityError?: EntityErrorResolvers<ContextType>;
  ErrorItem?: ErrorItemResolvers<ContextType>;
  EscalateModerationJobPayload?: EscalateModerationJobPayloadResolvers<ContextType>;
  Event?: EventResolvers<ContextType>;
  EventAttachment?: EventAttachmentResolvers<ContextType>;
  EventChat?: EventChatResolvers<ContextType>;
  EventInteractions?: EventInteractionsResolvers<ContextType>;
  EventLocation?: EventLocationResolvers<ContextType>;
  EventModerationInfo?: EventModerationInfoResolvers<ContextType>;
  Fandom?: FandomResolvers<ContextType>;
  FandomAddedAsAdminNotification?: FandomAddedAsAdminNotificationResolvers<ContextType>;
  FandomChat?: FandomChatResolvers<ContextType>;
  FandomConnection?: FandomConnectionResolvers<ContextType>;
  FandomEdge?: FandomEdgeResolvers<ContextType>;
  FandomInviteAcceptionNotification?: FandomInviteAcceptionNotificationResolvers<ContextType>;
  FandomInviteNotification?: FandomInviteNotificationResolvers<ContextType>;
  FandomInviteRejectionNotification?: FandomInviteRejectionNotificationResolvers<ContextType>;
  FandomInviteResponseNotification?: FandomInviteResponseNotificationResolvers<ContextType>;
  FandomJoinRequestAcceptionNotification?: FandomJoinRequestAcceptionNotificationResolvers<ContextType>;
  FandomJoinRequestNotification?: FandomJoinRequestNotificationResolvers<ContextType>;
  FandomJoinRequestRejectionNotification?: FandomJoinRequestRejectionNotificationResolvers<ContextType>;
  FandomJoinRequestResponseNotification?: FandomJoinRequestResponseNotificationResolvers<ContextType>;
  FandomJoinedNotification?: FandomJoinedNotificationResolvers<ContextType>;
  FandomJoinedSinceTriggerFilter?: FandomJoinedSinceTriggerFilterResolvers<ContextType>;
  FandomJoinedTriggerFilter?: FandomJoinedTriggerFilterResolvers<ContextType>;
  FandomMember?: FandomMemberResolvers<ContextType>;
  FandomMemberConnection?: FandomMemberConnectionResolvers<ContextType>;
  FandomMemberEdge?: FandomMemberEdgeResolvers<ContextType>;
  FandomMemberReputation?: FandomMemberReputationResolvers<ContextType>;
  FandomMemberReputationConnection?: FandomMemberReputationConnectionResolvers<ContextType>;
  FandomMemberReputationConnectionV2?: FandomMemberReputationConnectionV2Resolvers<ContextType>;
  FandomMemberReputationEdge?: FandomMemberReputationEdgeResolvers<ContextType>;
  FandomMemberReputationEdgeV2?: FandomMemberReputationEdgeV2Resolvers<ContextType>;
  FandomMemberReputationV2?: FandomMemberReputationV2Resolvers<ContextType>;
  FandomMentionNotification?: FandomMentionNotificationResolvers<ContextType>;
  FandomRemovedFromAdminNotification?: FandomRemovedFromAdminNotificationResolvers<ContextType>;
  FandomReputation?: FandomReputationResolvers<ContextType>;
  FandomReputationConnection?: FandomReputationConnectionResolvers<ContextType>;
  FandomReputationEdge?: FandomReputationEdgeResolvers<ContextType>;
  FandomRule?: FandomRuleResolvers<ContextType>;
  FandomSearchConnection?: FandomSearchConnectionResolvers<ContextType>;
  FandomSearchEdge?: FandomSearchEdgeResolvers<ContextType>;
  FandomShareNotification?: FandomShareNotificationResolvers<ContextType>;
  FandomSuggestionConnection?: FandomSuggestionConnectionResolvers<ContextType>;
  FandomSuggestionEdge?: FandomSuggestionEdgeResolvers<ContextType>;
  FandomTheme?: FandomThemeResolvers<ContextType>;
  FandomVisitedTriggerFilter?: FandomVisitedTriggerFilterResolvers<ContextType>;
  FeedItem?: FeedItemResolvers<ContextType>;
  FeedItemConnection?: FeedItemConnectionResolvers<ContextType>;
  FeedItemContent?: FeedItemContentResolvers<ContextType>;
  FeedItemEdge?: FeedItemEdgeResolvers<ContextType>;
  FeedItemSourceInformation?: FeedItemSourceInformationResolvers<ContextType>;
  FriendRequestNotification?: FriendRequestNotificationResolvers<ContextType>;
  FriendRequestResponseNotification?: FriendRequestResponseNotificationResolvers<ContextType>;
  GenerateFandomLinkPayload?: GenerateFandomLinkPayloadResolvers<ContextType>;
  GenerateInviteLinkPayload?: GenerateInviteLinkPayloadResolvers<ContextType>;
  HighlightsFromCommunityConnection?: HighlightsFromCommunityConnectionResolvers<ContextType>;
  HighlightsFromCommunityEdge?: HighlightsFromCommunityEdgeResolvers<ContextType>;
  HomeFeedFandomTile?: HomeFeedFandomTileResolvers<ContextType>;
  HomeFeedHighlightedUpdatesSection?: HomeFeedHighlightedUpdatesSectionResolvers<ContextType>;
  HomeFeedPersonalRecommendationSection?: HomeFeedPersonalRecommendationSectionResolvers<ContextType>;
  HomeFeedSection?: HomeFeedSectionResolvers<ContextType>;
  HomeFeedSectionConnection?: HomeFeedSectionConnectionResolvers<ContextType>;
  HomeFeedSectionEdge?: HomeFeedSectionEdgeResolvers<ContextType>;
  HomeFeedTile?: HomeFeedTileResolvers<ContextType>;
  HomeFeedTileBadge?: HomeFeedTileBadgeResolvers<ContextType>;
  Image?: ImageResolvers<ContextType>;
  InboxComposition?: InboxCompositionResolvers<ContextType>;
  InboxConfiguration?: InboxConfigurationResolvers<ContextType>;
  InboxFeedItem?: InboxFeedItemResolvers<ContextType>;
  InboxNotification?: InboxNotificationResolvers<ContextType>;
  InboxNotificationConnection?: InboxNotificationConnectionResolvers<ContextType>;
  InboxNotificationEdge?: InboxNotificationEdgeResolvers<ContextType>;
  IngestServer?: IngestServerResolvers<ContextType>;
  InviteJoinHiddenFandomPayload?: InviteJoinHiddenFandomPayloadResolvers<ContextType>;
  JoinChatPayload?: JoinChatPayloadResolvers<ContextType>;
  JoinLivestreamPayload?: JoinLivestreamPayloadResolvers<ContextType>;
  JoinPublicFandomPayload?: JoinPublicFandomPayloadResolvers<ContextType>;
  LeaveFandomPayload?: LeaveFandomPayloadResolvers<ContextType>;
  LeaveLivestreamPayload?: LeaveLivestreamPayloadResolvers<ContextType>;
  LikeInformation?: LikeInformationResolvers<ContextType>;
  LikeNotification?: LikeNotificationResolvers<ContextType>;
  LikeReaction?: LikeReactionResolvers<ContextType>;
  Livestream?: LivestreamResolvers<ContextType>;
  LivestreamByAuthenticatedUser?: LivestreamByAuthenticatedUserResolvers<ContextType>;
  LivestreamChat?: LivestreamChatResolvers<ContextType>;
  LivestreamConnection?: LivestreamConnectionResolvers<ContextType>;
  LivestreamEdge?: LivestreamEdgeResolvers<ContextType>;
  LivestreamQuestion?: LivestreamQuestionResolvers<ContextType>;
  LivestreamQuestionEdge?: LivestreamQuestionEdgeResolvers<ContextType>;
  LivestreamQuestionLike?: LivestreamQuestionLikeResolvers<ContextType>;
  LivestreamQuestionLikes?: LivestreamQuestionLikesResolvers<ContextType>;
  LivestreamQuestionPayload?: LivestreamQuestionPayloadResolvers<ContextType>;
  LivestreamQuestions?: LivestreamQuestionsResolvers<ContextType>;
  LivestreamQuestionsConnection?: LivestreamQuestionsConnectionResolvers<ContextType>;
  LivestreamTestDataPayload?: LivestreamTestDataPayloadResolvers<ContextType>;
  LivestreamViewer?: LivestreamViewerResolvers<ContextType>;
  LivestreamViewerConnection?: LivestreamViewerConnectionResolvers<ContextType>;
  LivestreamViewerEdge?: LivestreamViewerEdgeResolvers<ContextType>;
  Long?: GraphQLScalarType;
  MarkInboxNotificationsAsReadResult?: MarkInboxNotificationsAsReadResultResolvers<ContextType>;
  MarkInboxNotificationsAsSeenPayload?: MarkInboxNotificationsAsSeenPayloadResolvers<ContextType>;
  MeaningfulInteractions?: MeaningfulInteractionsResolvers<ContextType>;
  MemberInviteLink?: MemberInviteLinkResolvers<ContextType>;
  MemberInvitesAllocatedNotification?: MemberInvitesAllocatedNotificationResolvers<ContextType>;
  MemberReportPayload?: MemberReportPayloadResolvers<ContextType>;
  ModerationAppealInfo?: ModerationAppealInfoResolvers<ContextType>;
  ModerationCountersPayload?: ModerationCountersPayloadResolvers<ContextType>;
  ModerationEntity?: ModerationEntityResolvers<ContextType>;
  ModerationJob?: ModerationJobResolvers<ContextType>;
  ModerationJobAppealedEvent?: ModerationJobAppealedEventResolvers<ContextType>;
  ModerationJobAutoEscalatedEvent?: ModerationJobAutoEscalatedEventResolvers<ContextType>;
  ModerationJobContentUpdatedEvent?: ModerationJobContentUpdatedEventResolvers<ContextType>;
  ModerationJobEdge?: ModerationJobEdgeResolvers<ContextType>;
  ModerationJobEscalatedEvent?: ModerationJobEscalatedEventResolvers<ContextType>;
  ModerationJobEvent?: ModerationJobEventResolvers<ContextType>;
  ModerationJobHiddenEvent?: ModerationJobHiddenEventResolvers<ContextType>;
  ModerationJobKeptEvent?: ModerationJobKeptEventResolvers<ContextType>;
  ModerationJobReportedEvent?: ModerationJobReportedEventResolvers<ContextType>;
  ModerationJobUserProfileResetEvent?: ModerationJobUserProfileResetEventResolvers<ContextType>;
  ModerationJobUserReviewedEvent?: ModerationJobUserReviewedEventResolvers<ContextType>;
  ModerationJobUserSuspendedEvent?: ModerationJobUserSuspendedEventResolvers<ContextType>;
  ModerationJobUserUnsuspendedEvent?: ModerationJobUserUnsuspendedEventResolvers<ContextType>;
  ModerationJobsConnection?: ModerationJobsConnectionResolvers<ContextType>;
  ModerationJobsCountersPayload?: ModerationJobsCountersPayloadResolvers<ContextType>;
  ModerationNotification?: ModerationNotificationResolvers<ContextType>;
  ModerationStatusPayload?: ModerationStatusPayloadResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  MutedFandoms?: MutedFandomsResolvers<ContextType>;
  MyFandomSearchConnection?: MyFandomSearchConnectionResolvers<ContextType>;
  MyFandomSearchEdge?: MyFandomSearchEdgeResolvers<ContextType>;
  NewFriendNotification?: NewFriendNotificationResolvers<ContextType>;
  NotifyOn?: NotifyOnResolvers<ContextType>;
  OnlineSegmentAudienceFilter?: OnlineSegmentAudienceFilterResolvers<ContextType>;
  PageInfo?: PageInfoResolvers<ContextType>;
  Personal?: PersonalResolvers<ContextType>;
  PinContentPayload?: PinContentPayloadResolvers<ContextType>;
  PinnedContent?: PinnedContentResolvers<ContextType>;
  PinnedFeedItemInformation?: PinnedFeedItemInformationResolvers<ContextType>;
  Poll?: PollResolvers<ContextType>;
  PollInteractions?: PollInteractionsResolvers<ContextType>;
  PollModerationInfo?: PollModerationInfoResolvers<ContextType>;
  PollOption?: PollOptionResolvers<ContextType>;
  Post?: PostResolvers<ContextType>;
  PostAttachment?: PostAttachmentResolvers<ContextType>;
  PostModerationInfo?: PostModerationInfoResolvers<ContextType>;
  PostSearchConnection?: PostSearchConnectionResolvers<ContextType>;
  PostSearchEdge?: PostSearchEdgeResolvers<ContextType>;
  PostSearchWithFilterConnection?: PostSearchWithFilterConnectionResolvers<ContextType>;
  PostSearchWithFilterEdge?: PostSearchWithFilterEdgeResolvers<ContextType>;
  PreSignedUrl?: PreSignedUrlResolvers<ContextType>;
  PrivateChat?: PrivateChatResolvers<ContextType>;
  Product?: ProductResolvers<ContextType>;
  ProductConnection?: ProductConnectionResolvers<ContextType>;
  ProductEdge?: ProductEdgeResolvers<ContextType>;
  QualityContent?: QualityContentResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  Reactable?: ReactableResolvers<ContextType>;
  Reaction?: ReactionResolvers<ContextType>;
  ReactionConnection?: ReactionConnectionResolvers<ContextType>;
  ReactionEdge?: ReactionEdgeResolvers<ContextType>;
  RecommendedFeedItemInformation?: RecommendedFeedItemInformationResolvers<ContextType>;
  RegisterPushNotificationTokenPayload?: RegisterPushNotificationTokenPayloadResolvers<ContextType>;
  RegularFeedItemInformation?: RegularFeedItemInformationResolvers<ContextType>;
  RejectFriendRequestPayload?: RejectFriendRequestPayloadResolvers<ContextType>;
  RejectJoinHiddenFandomPayload?: RejectJoinHiddenFandomPayloadResolvers<ContextType>;
  RejectJoinPrivateFandomPayload?: RejectJoinPrivateFandomPayloadResolvers<ContextType>;
  RemoveFandomAdminPayload?: RemoveFandomAdminPayloadResolvers<ContextType>;
  RemoveFandomMemberPayload?: RemoveFandomMemberPayloadResolvers<ContextType>;
  RemovePlatformMemberRolePayload?: RemovePlatformMemberRolePayloadResolvers<ContextType>;
  ReportCount?: ReportCountResolvers<ContextType>;
  ReportEntityByMemberPayload?: ReportEntityByMemberPayloadResolvers<ContextType>;
  ReportInfo?: ReportInfoResolvers<ContextType>;
  ReportNote?: ReportNoteResolvers<ContextType>;
  ReportNoteConnection?: ReportNoteConnectionResolvers<ContextType>;
  ReportNoteEdge?: ReportNoteEdgeResolvers<ContextType>;
  ReportResponseNotification?: ReportResponseNotificationResolvers<ContextType>;
  ReportUserPayload?: ReportUserPayloadResolvers<ContextType>;
  ReportersAppealInfo?: ReportersAppealInfoResolvers<ContextType>;
  ReputationScoreAudienceFilter?: ReputationScoreAudienceFilterResolvers<ContextType>;
  RequestJoinPrivateFandomPayload?: RequestJoinPrivateFandomPayloadResolvers<ContextType>;
  ResetUserProfilePayload?: ResetUserProfilePayloadResolvers<ContextType>;
  ReviewAiLabelsPayload?: ReviewAiLabelsPayloadResolvers<ContextType>;
  ReviewUserModerationJobPayload?: ReviewUserModerationJobPayloadResolvers<ContextType>;
  ScoreComponents?: ScoreComponentsResolvers<ContextType>;
  ShareFandomPayload?: ShareFandomPayloadResolvers<ContextType>;
  StartFandomChatPayload?: StartFandomChatPayloadResolvers<ContextType>;
  StartLivestreamChatPayload?: StartLivestreamChatPayloadResolvers<ContextType>;
  StartLivestreamPayload?: StartLivestreamPayloadResolvers<ContextType>;
  StartPrivateChatPayload?: StartPrivateChatPayloadResolvers<ContextType>;
  StopLivestreamPayload?: StopLivestreamPayloadResolvers<ContextType>;
  Store?: StoreResolvers<ContextType>;
  StorePayload?: StorePayloadResolvers<ContextType>;
  SuspendUserPayload?: SuspendUserPayloadResolvers<ContextType>;
  TargetedFeedItemInformation?: TargetedFeedItemInformationResolvers<ContextType>;
  TopParentEntity?: TopParentEntityResolvers<ContextType>;
  TriggerSpecification?: TriggerSpecificationResolvers<ContextType>;
  UndoFriendshipRequestPayload?: UndoFriendshipRequestPayloadResolvers<ContextType>;
  UnlikeReactionPayload?: UnlikeReactionPayloadResolvers<ContextType>;
  UnpinContentPayload?: UnpinContentPayloadResolvers<ContextType>;
  UnregisterPushNotificationTokenPayload?: UnregisterPushNotificationTokenPayloadResolvers<ContextType>;
  UpdateCampaignPayload?: UpdateCampaignPayloadResolvers<ContextType>;
  UpdateCommentPayload?: UpdateCommentPayloadResolvers<ContextType>;
  UpdateEventPartialPayload?: UpdateEventPartialPayloadResolvers<ContextType>;
  UpdateEventPayload?: UpdateEventPayloadResolvers<ContextType>;
  UpdateFandomPayload?: UpdateFandomPayloadResolvers<ContextType>;
  UpdatePostPayload?: UpdatePostPayloadResolvers<ContextType>;
  UpdateProductPayload?: UpdateProductPayloadResolvers<ContextType>;
  UpdateStorePayload?: UpdateStorePayloadResolvers<ContextType>;
  UpdateUserProfilePayload?: UpdateUserProfilePayloadResolvers<ContextType>;
  UpdateVariantPayload?: UpdateVariantPayloadResolvers<ContextType>;
  UploadImage?: UploadImageResolvers<ContextType>;
  UploadVideoPayload?: UploadVideoPayloadResolvers<ContextType>;
  User?: UserResolvers<ContextType>;
  UserConnection?: UserConnectionResolvers<ContextType>;
  UserEdge?: UserEdgeResolvers<ContextType>;
  UserEventResponsePayload?: UserEventResponsePayloadResolvers<ContextType>;
  UserMentionNotification?: UserMentionNotificationResolvers<ContextType>;
  UserModerationInfo?: UserModerationInfoResolvers<ContextType>;
  UserSearchConnection?: UserSearchConnectionResolvers<ContextType>;
  UserSearchEdge?: UserSearchEdgeResolvers<ContextType>;
  UserSuggestionConnection?: UserSuggestionConnectionResolvers<ContextType>;
  UserSuggestionEdge?: UserSuggestionEdgeResolvers<ContextType>;
  Variant?: VariantResolvers<ContextType>;
  VariantAttribute?: VariantAttributeResolvers<ContextType>;
  VariantConnection?: VariantConnectionResolvers<ContextType>;
  VariantEdge?: VariantEdgeResolvers<ContextType>;
  Video?: VideoResolvers<ContextType>;
  Viewers?: ViewersResolvers<ContextType>;
  Wallet?: WalletResolvers<ContextType>;
  WalletByDate?: WalletByDateResolvers<ContextType>;
  WalletByDateConnection?: WalletByDateConnectionResolvers<ContextType>;
  WalletByDateEdge?: WalletByDateEdgeResolvers<ContextType>;
  WalletByFandom?: WalletByFandomResolvers<ContextType>;
  WalletByFandomConnection?: WalletByFandomConnectionResolvers<ContextType>;
  WalletByFandomEdge?: WalletByFandomEdgeResolvers<ContextType>;
  WalletMetadata?: WalletMetadataResolvers<ContextType>;
  WalletTransaction?: WalletTransactionResolvers<ContextType>;
  WalletTransactionConnection?: WalletTransactionConnectionResolvers<ContextType>;
  WalletTransactionEdge?: WalletTransactionEdgeResolvers<ContextType>;
  WebsocketChannel?: WebsocketChannelResolvers<ContextType>;
  WebsocketEvent?: WebsocketEventResolvers<ContextType>;
  WebsocketPresence?: WebsocketPresenceResolvers<ContextType>;
  ZonedDateTime?: GraphQLScalarType;
};

export type DirectiveResolvers<ContextType = any> = {
  apollo_studio_metadata?: Apollo_Studio_MetadataDirectiveResolver<any, any, ContextType>;
};

export type AppealModerationJobMutationMutationVariables = Exact<{
  input: AppealModerationJobInput;
}>;


export type AppealModerationJobMutationMutation = { __typename?: 'Mutation', appealModerationJob?: { __typename?: 'AppealModerationJobPayload', entityId: string } | null };

export type CreateCommentMutationVariables = Exact<{
  input: CreateCommentInput;
}>;


export type CreateCommentMutation = { __typename?: 'Mutation', createComment: { __typename?: 'CreateCommentPayload', comment: { __typename?: 'Comment', id: string } } };

export type DeleteCommentMutationVariables = Exact<{
  input: DeleteCommentInput;
}>;


export type DeleteCommentMutation = { __typename?: 'Mutation', deleteComment: { __typename?: 'DeleteCommentPayload', comment: { __typename?: 'Comment', id: string } } };

export type FindCommentByIdQueryVariables = Exact<{
  commentId: Scalars['String'];
}>;


export type FindCommentByIdQuery = { __typename?: 'Query', comment?: { __typename?: 'Comment', id: string, status: CommentStatus } | null };

export type ReportEntityMutationMutationVariables = Exact<{
  input: ReportEntityByMemberInput;
}>;


export type ReportEntityMutationMutation = { __typename?: 'Mutation', reportEntityByMember?: { __typename?: 'ReportEntityByMemberPayload', entityId?: string | null } | null };

export type ChangeEntityModerationStatusMutationVariables = Exact<{
  entityId: Scalars['String'];
  visibility?: InputMaybe<EntityVisibility>;
  violationType?: InputMaybe<Scalars['String']>;
  internalNote?: InputMaybe<Scalars['String']>;
}>;


export type ChangeEntityModerationStatusMutation = { __typename?: 'Mutation', changeModerationStatus?: { __typename?: 'ModerationStatusPayload', moderationStatus?: ModerationStatus | null } | null };

export type EventCommentsQueryVariables = Exact<{
  eventId: Scalars['String'];
}>;


export type EventCommentsQuery = { __typename?: 'Query', event?: { __typename?: 'Event', comments?: { __typename?: 'CommentConnection', edges: Array<{ __typename?: 'CommentEdge', node: { __typename?: 'Comment', id: string, status: CommentStatus } } | null> } | null } | null };

export type CreateEventMutationMutationVariables = Exact<{
  input: CreateEventInput;
}>;


export type CreateEventMutationMutation = { __typename?: 'Mutation', createEvent: { __typename?: 'CreateEventPayload', event: { __typename?: 'Event', id: string } } };

export type DeleteEventMutationVariables = Exact<{
  input: DeleteEventInput;
}>;


export type DeleteEventMutation = { __typename?: 'Mutation', deleteEvent: { __typename?: 'DeleteEventPayload', eventId: string } };

export type FindEventByIdQueryVariables = Exact<{
  eventId: Scalars['String'];
}>;


export type FindEventByIdQuery = { __typename?: 'Query', event?: { __typename?: 'Event', id: string, status: EventStatus } | null };

export type CommunityFeedQueryQueryVariables = Exact<{
  fandomId: Scalars['String'];
  filter: FeedFilter;
  first?: InputMaybe<Scalars['Int']>;
  after?: InputMaybe<Scalars['String']>;
}>;


export type CommunityFeedQueryQuery = { __typename?: 'Query', communityFeed?: { __typename?: 'FeedItemConnection', edges: Array<{ __typename?: 'FeedItemEdge', node: { __typename?: 'FeedItem', content?: { __typename?: 'Event', id: string } | { __typename?: 'Livestream', id: string } | { __typename?: 'Poll', id: string } | { __typename?: 'Post', id: string } | null } }>, pageInfo: { __typename?: 'PageInfo', endCursor: string, hasNextPage: boolean } } | null };

export type EventFeedQueryQueryVariables = Exact<{
  fandomId: Scalars['String'];
  filter: FeedFilter;
  first?: InputMaybe<Scalars['Int']>;
  after?: InputMaybe<Scalars['String']>;
}>;


export type EventFeedQueryQuery = { __typename?: 'Query', eventFeed?: { __typename?: 'FeedItemConnection', edges: Array<{ __typename?: 'FeedItemEdge', node: { __typename?: 'FeedItem', content?: { __typename?: 'Event', id: string } | { __typename?: 'Livestream', id: string } | { __typename?: 'Poll', id: string } | { __typename?: 'Post', id: string } | null } }>, pageInfo: { __typename?: 'PageInfo', endCursor: string, hasNextPage: boolean } } | null };

export type HomeFeedHighlightsQueryQueryVariables = Exact<{
  filter: FeedFilter;
  first?: InputMaybe<Scalars['Int']>;
  after?: InputMaybe<Scalars['String']>;
}>;


export type HomeFeedHighlightsQueryQuery = { __typename?: 'Query', homeFeedHighlights?: { __typename?: 'HighlightsFromCommunityConnection', edges: Array<{ __typename?: 'HighlightsFromCommunityEdge', node: { __typename?: 'CommunityRecommendedHighlights', fandom?: { __typename?: 'Fandom', id: string } | null, highlights: Array<{ __typename?: 'FeedItem', content?: { __typename?: 'Event', id: string } | { __typename?: 'Livestream', id: string } | { __typename?: 'Poll', id: string } | { __typename?: 'Post', id: string } | null } | null> } }>, pageInfo: { __typename?: 'PageInfo', endCursor: string, hasNextPage: boolean } } | null };

export type ProfileFeedQueryQueryVariables = Exact<{
  filter: FeedFilter;
  userId: Scalars['String'];
  first?: InputMaybe<Scalars['Int']>;
  after?: InputMaybe<Scalars['String']>;
}>;


export type ProfileFeedQueryQuery = { __typename?: 'Query', profileFeed?: { __typename?: 'FeedItemConnection', edges: Array<{ __typename?: 'FeedItemEdge', node: { __typename?: 'FeedItem', content?: { __typename?: 'Event', id: string, fandom?: { __typename?: 'Fandom', id: string } | null } | { __typename?: 'Livestream', id: string, fandom?: { __typename?: 'Fandom', id: string } | null } | { __typename?: 'Poll', id: string, fandom?: { __typename?: 'Fandom', id: string } | null } | { __typename?: 'Post', id: string, fandom?: { __typename?: 'Fandom', id: string } | null } | null } }>, pageInfo: { __typename?: 'PageInfo', endCursor: string, hasNextPage: boolean } } | null };

export type ModerationJobByEntityIdQueryVariables = Exact<{
  entityId: Scalars['String'];
}>;


export type ModerationJobByEntityIdQuery = { __typename?: 'Query', moderationJobByEntityId?: { __typename?: 'ModerationJob', moderationStatus?: ModerationStatus | null, reportInfo?: { __typename?: 'ReportInfo', aiReports: Array<{ __typename?: 'AiReport', reportReason?: string | null }> } | null } | null };

export type ModerationJobsQueryVariables = Exact<{
  filter?: InputMaybe<ModerationJobsFilter>;
  after?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
}>;


export type ModerationJobsQuery = { __typename?: 'Query', moderationJobs?: { __typename?: 'ModerationJobsConnection', edges: Array<{ __typename?: 'ModerationJobEdge', node?: { __typename?: 'ModerationJob', entity?: { __typename: 'CommentModerationInfo', visibility?: EntityVisibility | null, comment?: { __typename?: 'Comment', id: string } | null } | { __typename: 'EventModerationInfo', visibility?: EntityVisibility | null, event?: { __typename?: 'Event', id: string } | null } | { __typename: 'PollModerationInfo', visibility?: EntityVisibility | null, poll?: { __typename?: 'Poll', id: string } | null } | { __typename: 'PostModerationInfo', visibility?: EntityVisibility | null, post?: { __typename?: 'Post', id: string } | null } | { __typename: 'UserModerationInfo' } | null } | null } | null>, pageInfo: { __typename?: 'PageInfo', endCursor: string, hasNextPage: boolean } } | null };

export type PollCommentsQueryVariables = Exact<{
  pollId: Scalars['String'];
}>;


export type PollCommentsQuery = { __typename?: 'Query', poll?: { __typename?: 'Poll', comments?: { __typename?: 'CommentConnection', edges: Array<{ __typename?: 'CommentEdge', node: { __typename?: 'Comment', id: string, status: CommentStatus } } | null> } | null } | null };

export type CreatePollMutationMutationVariables = Exact<{
  input: CreatePollInput;
}>;


export type CreatePollMutationMutation = { __typename?: 'Mutation', createPoll: { __typename?: 'CreatePollPayload', poll: { __typename?: 'Poll', id: string } } };

export type DeletePollMutationVariables = Exact<{
  input: DeletePollInput;
}>;


export type DeletePollMutation = { __typename?: 'Mutation', deletePoll: { __typename?: 'DeletePollPayload', pollId: string } };

export type FindPollByIdQueryVariables = Exact<{
  pollId: Scalars['String'];
}>;


export type FindPollByIdQuery = { __typename?: 'Query', poll?: { __typename?: 'Poll', id: string } | null };

export type PostCommentsQueryVariables = Exact<{
  postId: Scalars['String'];
}>;


export type PostCommentsQuery = { __typename?: 'Query', post?: { __typename?: 'Post', comments?: { __typename?: 'CommentConnection', edges: Array<{ __typename?: 'CommentEdge', node: { __typename?: 'Comment', id: string, status: CommentStatus } } | null> } | null } | null };

export type CreatePostMutationMutationVariables = Exact<{
  input: CreatePostInput;
}>;


export type CreatePostMutationMutation = { __typename?: 'Mutation', createPost: { __typename?: 'CreatePostPayload', post: { __typename?: 'Post', id: string } } };

export type DeletePostMutationVariables = Exact<{
  input: DeletePostInput;
}>;


export type DeletePostMutation = { __typename?: 'Mutation', deletePost: { __typename?: 'DeletePostPayload', postId: string } };

export type FindPostByIdQueryVariables = Exact<{
  postId: Scalars['String'];
}>;


export type FindPostByIdQuery = { __typename?: 'Query', post?: { __typename?: 'Post', id: string, status: PostStatus } | null };

export type UploadImageMutationMutationVariables = Exact<{
  input: UploadImageInput;
}>;


export type UploadImageMutationMutation = { __typename?: 'Mutation', uploadImage: { __typename: 'UploadImage', id: string, url: string } };


export const AppealModerationJobMutationDocument = gql`
    mutation appealModerationJobMutation($input: AppealModerationJobInput!) {
  appealModerationJob(input: $input) {
    entityId
  }
}
    `;
export const CreateCommentDocument = gql`
    mutation CreateComment($input: CreateCommentInput!) {
  createComment(input: $input) {
    comment {
      id
    }
  }
}
    `;
export const DeleteCommentDocument = gql`
    mutation DeleteComment($input: DeleteCommentInput!) {
  deleteComment(input: $input) {
    comment {
      id
    }
  }
}
    `;
export const FindCommentByIdDocument = gql`
    query FindCommentById($commentId: String!) {
  comment(commentId: $commentId) {
    id
    status
  }
}
    `;
export const ReportEntityMutationDocument = gql`
    mutation ReportEntityMutation($input: ReportEntityByMemberInput!) {
  reportEntityByMember(input: $input) {
    entityId
  }
}
    `;
export const ChangeEntityModerationStatusDocument = gql`
    mutation ChangeEntityModerationStatus($entityId: String!, $visibility: EntityVisibility, $violationType: String, $internalNote: String) {
  changeModerationStatus(
    input: {entityId: $entityId, visibility: $visibility, violationType: $violationType, internalNote: $internalNote}
  ) {
    moderationStatus
  }
}
    `;
export const EventCommentsDocument = gql`
    query EventComments($eventId: String!) {
  event(id: $eventId) {
    comments(first: 50) {
      edges {
        node {
          id
          status
        }
      }
    }
  }
}
    `;
export const CreateEventMutationDocument = gql`
    mutation createEventMutation($input: CreateEventInput!) {
  createEvent(input: $input) {
    event {
      id
    }
  }
}
    `;
export const DeleteEventDocument = gql`
    mutation DeleteEvent($input: DeleteEventInput!) {
  deleteEvent(input: $input) {
    eventId
  }
}
    `;
export const FindEventByIdDocument = gql`
    query FindEventById($eventId: String!) {
  event(id: $eventId) {
    id
    status
  }
}
    `;
export const CommunityFeedQueryDocument = gql`
    query communityFeedQuery($fandomId: String!, $filter: FeedFilter!, $first: Int, $after: String) {
  communityFeed(
    fandomId: $fandomId
    filter: $filter
    first: $first
    after: $after
  ) {
    edges {
      node {
        content {
          ... on Event {
            id
          }
          ... on Livestream {
            id
          }
          ... on Post {
            id
          }
          ... on Poll {
            id
          }
        }
      }
    }
    pageInfo {
      endCursor
      hasNextPage
    }
  }
}
    `;
export const EventFeedQueryDocument = gql`
    query EventFeedQuery($fandomId: String!, $filter: FeedFilter!, $first: Int, $after: String) {
  eventFeed(fandomId: $fandomId, filter: $filter, first: $first, after: $after) {
    edges {
      node {
        content {
          ... on Event {
            id
          }
          ... on Livestream {
            id
          }
          ... on Poll {
            id
          }
          ... on Post {
            id
          }
        }
      }
    }
    pageInfo {
      endCursor
      hasNextPage
    }
  }
}
    `;
export const HomeFeedHighlightsQueryDocument = gql`
    query homeFeedHighlightsQuery($filter: FeedFilter!, $first: Int, $after: String) {
  homeFeedHighlights(filter: $filter, first: $first, after: $after) {
    edges {
      node {
        fandom {
          id
        }
        highlights {
          content {
            ... on Event {
              id
            }
            ... on Livestream {
              id
            }
            ... on Poll {
              id
            }
            ... on Post {
              id
            }
          }
        }
      }
    }
    pageInfo {
      endCursor
      hasNextPage
    }
  }
}
    `;
export const ProfileFeedQueryDocument = gql`
    query profileFeedQuery($filter: FeedFilter!, $userId: String!, $first: Int, $after: String) {
  profileFeed(filter: $filter, userId: $userId, first: $first, after: $after) {
    edges {
      node {
        content {
          ... on Event {
            id
            fandom {
              id
            }
          }
          ... on Livestream {
            id
            fandom {
              id
            }
          }
          ... on Poll {
            id
            fandom {
              id
            }
          }
          ... on Post {
            id
            fandom {
              id
            }
          }
        }
      }
    }
    pageInfo {
      endCursor
      hasNextPage
    }
  }
}
    `;
export const ModerationJobByEntityIdDocument = gql`
    query ModerationJobByEntityId($entityId: String!) {
  moderationJobByEntityId(entityId: $entityId) {
    moderationStatus
    reportInfo {
      aiReports {
        reportReason
      }
    }
  }
}
    `;
export const ModerationJobsDocument = gql`
    query ModerationJobs($filter: ModerationJobsFilter, $after: String, $first: Int) {
  moderationJobs(filter: $filter, after: $after, first: $first) {
    edges {
      node {
        entity {
          __typename
          ... on PollModerationInfo {
            poll {
              id
            }
            visibility
          }
          ... on PostModerationInfo {
            post {
              id
            }
            visibility
          }
          ... on EventModerationInfo {
            event {
              id
            }
            visibility
          }
          ... on CommentModerationInfo {
            comment {
              id
            }
            visibility
          }
        }
      }
    }
    pageInfo {
      endCursor
      hasNextPage
    }
  }
}
    `;
export const PollCommentsDocument = gql`
    query PollComments($pollId: String!) {
  poll(id: $pollId) {
    comments(first: 50) {
      edges {
        node {
          id
          status
        }
      }
    }
  }
}
    `;
export const CreatePollMutationDocument = gql`
    mutation createPollMutation($input: CreatePollInput!) {
  createPoll(input: $input) {
    poll {
      id
    }
  }
}
    `;
export const DeletePollDocument = gql`
    mutation DeletePoll($input: DeletePollInput!) {
  deletePoll(input: $input) {
    pollId
  }
}
    `;
export const FindPollByIdDocument = gql`
    query FindPollById($pollId: String!) {
  poll(id: $pollId) {
    id
  }
}
    `;
export const PostCommentsDocument = gql`
    query PostComments($postId: String!) {
  post(id: $postId) {
    comments(first: 50) {
      edges {
        node {
          id
          status
        }
      }
    }
  }
}
    `;
export const CreatePostMutationDocument = gql`
    mutation createPostMutation($input: CreatePostInput!) {
  createPost(input: $input) {
    post {
      id
    }
  }
}
    `;
export const DeletePostDocument = gql`
    mutation DeletePost($input: DeletePostInput!) {
  deletePost(input: $input) {
    postId
  }
}
    `;
export const FindPostByIdDocument = gql`
    query FindPostById($postId: String!) {
  post(id: $postId) {
    id
    status
  }
}
    `;
export const UploadImageMutationDocument = gql`
    mutation UploadImageMutation($input: UploadImageInput!) {
  uploadImage(input: $input) {
    id
    url
    __typename
  }
}
    `;

export type SdkFunctionWrapper = <T>(action: (requestHeaders?:Record<string, string>) => Promise<T>, operationName: string, operationType?: string) => Promise<T>;


const defaultWrapper: SdkFunctionWrapper = (action, _operationName, _operationType) => action();
const AppealModerationJobMutationDocumentString = print(AppealModerationJobMutationDocument);
const CreateCommentDocumentString = print(CreateCommentDocument);
const DeleteCommentDocumentString = print(DeleteCommentDocument);
const FindCommentByIdDocumentString = print(FindCommentByIdDocument);
const ReportEntityMutationDocumentString = print(ReportEntityMutationDocument);
const ChangeEntityModerationStatusDocumentString = print(ChangeEntityModerationStatusDocument);
const EventCommentsDocumentString = print(EventCommentsDocument);
const CreateEventMutationDocumentString = print(CreateEventMutationDocument);
const DeleteEventDocumentString = print(DeleteEventDocument);
const FindEventByIdDocumentString = print(FindEventByIdDocument);
const CommunityFeedQueryDocumentString = print(CommunityFeedQueryDocument);
const EventFeedQueryDocumentString = print(EventFeedQueryDocument);
const HomeFeedHighlightsQueryDocumentString = print(HomeFeedHighlightsQueryDocument);
const ProfileFeedQueryDocumentString = print(ProfileFeedQueryDocument);
const ModerationJobByEntityIdDocumentString = print(ModerationJobByEntityIdDocument);
const ModerationJobsDocumentString = print(ModerationJobsDocument);
const PollCommentsDocumentString = print(PollCommentsDocument);
const CreatePollMutationDocumentString = print(CreatePollMutationDocument);
const DeletePollDocumentString = print(DeletePollDocument);
const FindPollByIdDocumentString = print(FindPollByIdDocument);
const PostCommentsDocumentString = print(PostCommentsDocument);
const CreatePostMutationDocumentString = print(CreatePostMutationDocument);
const DeletePostDocumentString = print(DeletePostDocument);
const FindPostByIdDocumentString = print(FindPostByIdDocument);
const UploadImageMutationDocumentString = print(UploadImageMutationDocument);
export function getSdk(client: GraphQLClient, withWrapper: SdkFunctionWrapper = defaultWrapper) {
  return {
    appealModerationJobMutation(variables: AppealModerationJobMutationMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<{ data?: AppealModerationJobMutationMutation | undefined; extensions?: any; headers: Dom.Headers; status: number; errors?: GraphQLError[] | undefined; }> {
        return withWrapper((wrappedRequestHeaders) => client.rawRequest<AppealModerationJobMutationMutation>(AppealModerationJobMutationDocumentString, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'appealModerationJobMutation', 'mutation');
    },
    CreateComment(variables: CreateCommentMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<{ data?: CreateCommentMutation | undefined; extensions?: any; headers: Dom.Headers; status: number; errors?: GraphQLError[] | undefined; }> {
        return withWrapper((wrappedRequestHeaders) => client.rawRequest<CreateCommentMutation>(CreateCommentDocumentString, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'CreateComment', 'mutation');
    },
    DeleteComment(variables: DeleteCommentMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<{ data?: DeleteCommentMutation | undefined; extensions?: any; headers: Dom.Headers; status: number; errors?: GraphQLError[] | undefined; }> {
        return withWrapper((wrappedRequestHeaders) => client.rawRequest<DeleteCommentMutation>(DeleteCommentDocumentString, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'DeleteComment', 'mutation');
    },
    FindCommentById(variables: FindCommentByIdQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<{ data?: FindCommentByIdQuery | undefined; extensions?: any; headers: Dom.Headers; status: number; errors?: GraphQLError[] | undefined; }> {
        return withWrapper((wrappedRequestHeaders) => client.rawRequest<FindCommentByIdQuery>(FindCommentByIdDocumentString, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'FindCommentById', 'query');
    },
    ReportEntityMutation(variables: ReportEntityMutationMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<{ data?: ReportEntityMutationMutation | undefined; extensions?: any; headers: Dom.Headers; status: number; errors?: GraphQLError[] | undefined; }> {
        return withWrapper((wrappedRequestHeaders) => client.rawRequest<ReportEntityMutationMutation>(ReportEntityMutationDocumentString, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'ReportEntityMutation', 'mutation');
    },
    ChangeEntityModerationStatus(variables: ChangeEntityModerationStatusMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<{ data?: ChangeEntityModerationStatusMutation | undefined; extensions?: any; headers: Dom.Headers; status: number; errors?: GraphQLError[] | undefined; }> {
        return withWrapper((wrappedRequestHeaders) => client.rawRequest<ChangeEntityModerationStatusMutation>(ChangeEntityModerationStatusDocumentString, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'ChangeEntityModerationStatus', 'mutation');
    },
    EventComments(variables: EventCommentsQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<{ data?: EventCommentsQuery | undefined; extensions?: any; headers: Dom.Headers; status: number; errors?: GraphQLError[] | undefined; }> {
        return withWrapper((wrappedRequestHeaders) => client.rawRequest<EventCommentsQuery>(EventCommentsDocumentString, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'EventComments', 'query');
    },
    createEventMutation(variables: CreateEventMutationMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<{ data?: CreateEventMutationMutation | undefined; extensions?: any; headers: Dom.Headers; status: number; errors?: GraphQLError[] | undefined; }> {
        return withWrapper((wrappedRequestHeaders) => client.rawRequest<CreateEventMutationMutation>(CreateEventMutationDocumentString, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'createEventMutation', 'mutation');
    },
    DeleteEvent(variables: DeleteEventMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<{ data?: DeleteEventMutation | undefined; extensions?: any; headers: Dom.Headers; status: number; errors?: GraphQLError[] | undefined; }> {
        return withWrapper((wrappedRequestHeaders) => client.rawRequest<DeleteEventMutation>(DeleteEventDocumentString, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'DeleteEvent', 'mutation');
    },
    FindEventById(variables: FindEventByIdQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<{ data?: FindEventByIdQuery | undefined; extensions?: any; headers: Dom.Headers; status: number; errors?: GraphQLError[] | undefined; }> {
        return withWrapper((wrappedRequestHeaders) => client.rawRequest<FindEventByIdQuery>(FindEventByIdDocumentString, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'FindEventById', 'query');
    },
    communityFeedQuery(variables: CommunityFeedQueryQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<{ data?: CommunityFeedQueryQuery | undefined; extensions?: any; headers: Dom.Headers; status: number; errors?: GraphQLError[] | undefined; }> {
        return withWrapper((wrappedRequestHeaders) => client.rawRequest<CommunityFeedQueryQuery>(CommunityFeedQueryDocumentString, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'communityFeedQuery', 'query');
    },
    EventFeedQuery(variables: EventFeedQueryQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<{ data?: EventFeedQueryQuery | undefined; extensions?: any; headers: Dom.Headers; status: number; errors?: GraphQLError[] | undefined; }> {
        return withWrapper((wrappedRequestHeaders) => client.rawRequest<EventFeedQueryQuery>(EventFeedQueryDocumentString, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'EventFeedQuery', 'query');
    },
    homeFeedHighlightsQuery(variables: HomeFeedHighlightsQueryQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<{ data?: HomeFeedHighlightsQueryQuery | undefined; extensions?: any; headers: Dom.Headers; status: number; errors?: GraphQLError[] | undefined; }> {
        return withWrapper((wrappedRequestHeaders) => client.rawRequest<HomeFeedHighlightsQueryQuery>(HomeFeedHighlightsQueryDocumentString, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'homeFeedHighlightsQuery', 'query');
    },
    profileFeedQuery(variables: ProfileFeedQueryQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<{ data?: ProfileFeedQueryQuery | undefined; extensions?: any; headers: Dom.Headers; status: number; errors?: GraphQLError[] | undefined; }> {
        return withWrapper((wrappedRequestHeaders) => client.rawRequest<ProfileFeedQueryQuery>(ProfileFeedQueryDocumentString, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'profileFeedQuery', 'query');
    },
    ModerationJobByEntityId(variables: ModerationJobByEntityIdQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<{ data?: ModerationJobByEntityIdQuery | undefined; extensions?: any; headers: Dom.Headers; status: number; errors?: GraphQLError[] | undefined; }> {
        return withWrapper((wrappedRequestHeaders) => client.rawRequest<ModerationJobByEntityIdQuery>(ModerationJobByEntityIdDocumentString, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'ModerationJobByEntityId', 'query');
    },
    ModerationJobs(variables?: ModerationJobsQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<{ data?: ModerationJobsQuery | undefined; extensions?: any; headers: Dom.Headers; status: number; errors?: GraphQLError[] | undefined; }> {
        return withWrapper((wrappedRequestHeaders) => client.rawRequest<ModerationJobsQuery>(ModerationJobsDocumentString, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'ModerationJobs', 'query');
    },
    PollComments(variables: PollCommentsQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<{ data?: PollCommentsQuery | undefined; extensions?: any; headers: Dom.Headers; status: number; errors?: GraphQLError[] | undefined; }> {
        return withWrapper((wrappedRequestHeaders) => client.rawRequest<PollCommentsQuery>(PollCommentsDocumentString, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'PollComments', 'query');
    },
    createPollMutation(variables: CreatePollMutationMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<{ data?: CreatePollMutationMutation | undefined; extensions?: any; headers: Dom.Headers; status: number; errors?: GraphQLError[] | undefined; }> {
        return withWrapper((wrappedRequestHeaders) => client.rawRequest<CreatePollMutationMutation>(CreatePollMutationDocumentString, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'createPollMutation', 'mutation');
    },
    DeletePoll(variables: DeletePollMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<{ data?: DeletePollMutation | undefined; extensions?: any; headers: Dom.Headers; status: number; errors?: GraphQLError[] | undefined; }> {
        return withWrapper((wrappedRequestHeaders) => client.rawRequest<DeletePollMutation>(DeletePollDocumentString, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'DeletePoll', 'mutation');
    },
    FindPollById(variables: FindPollByIdQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<{ data?: FindPollByIdQuery | undefined; extensions?: any; headers: Dom.Headers; status: number; errors?: GraphQLError[] | undefined; }> {
        return withWrapper((wrappedRequestHeaders) => client.rawRequest<FindPollByIdQuery>(FindPollByIdDocumentString, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'FindPollById', 'query');
    },
    PostComments(variables: PostCommentsQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<{ data?: PostCommentsQuery | undefined; extensions?: any; headers: Dom.Headers; status: number; errors?: GraphQLError[] | undefined; }> {
        return withWrapper((wrappedRequestHeaders) => client.rawRequest<PostCommentsQuery>(PostCommentsDocumentString, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'PostComments', 'query');
    },
    createPostMutation(variables: CreatePostMutationMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<{ data?: CreatePostMutationMutation | undefined; extensions?: any; headers: Dom.Headers; status: number; errors?: GraphQLError[] | undefined; }> {
        return withWrapper((wrappedRequestHeaders) => client.rawRequest<CreatePostMutationMutation>(CreatePostMutationDocumentString, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'createPostMutation', 'mutation');
    },
    DeletePost(variables: DeletePostMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<{ data?: DeletePostMutation | undefined; extensions?: any; headers: Dom.Headers; status: number; errors?: GraphQLError[] | undefined; }> {
        return withWrapper((wrappedRequestHeaders) => client.rawRequest<DeletePostMutation>(DeletePostDocumentString, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'DeletePost', 'mutation');
    },
    FindPostById(variables: FindPostByIdQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<{ data?: FindPostByIdQuery | undefined; extensions?: any; headers: Dom.Headers; status: number; errors?: GraphQLError[] | undefined; }> {
        return withWrapper((wrappedRequestHeaders) => client.rawRequest<FindPostByIdQuery>(FindPostByIdDocumentString, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'FindPostById', 'query');
    },
    UploadImageMutation(variables: UploadImageMutationMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<{ data?: UploadImageMutationMutation | undefined; extensions?: any; headers: Dom.Headers; status: number; errors?: GraphQLError[] | undefined; }> {
        return withWrapper((wrappedRequestHeaders) => client.rawRequest<UploadImageMutationMutation>(UploadImageMutationDocumentString, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'UploadImageMutation', 'mutation');
    }
  };
}
export type Sdk = ReturnType<typeof getSdk>;