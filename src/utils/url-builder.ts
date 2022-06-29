import type { Page } from 'playwright';

import { getAdminBaseUrl, getPartnerBaseUrl } from '../utils/utils';

import { getModerationTestCommunityId } from './credentials';
import type { AaquaEntityType } from './typings';

/* eslint-disable @typescript-eslint/no-var-requires */
require('dotenv').config();

/** Aaqua Partner App endpoints */
const AAQUA_PARTNER_URL = getPartnerBaseUrl();
const COMMUNITIES = '/communities';
const ANALYTICS = '/insights';
const CONTENT_MANAGEMENT = '/content-management';
const CONTENT_MODERATION = '/content-moderation';
const CAMPAIGNS = '/campaigns';
const SHOP = '/shop';
const COMMUNITY_SETTINGS = '/settings';
const INFORMATION = '/information';
const PARTNER_LOGIN = '/login/email';
const RULES = '/rules';

/** Aaqua Admin App endpoints */
const AAQUA_ADMIN_URL = getAdminBaseUrl();
const MODERATION = '/moderation';
const ADMIN_LOGIN = '/login/email';

export class AaquaPartnerApp {
  static communityAnalyticsUrl(
    communityId: string,
    analyticsPage: string
  ): string {
    return (
      AAQUA_PARTNER_URL +
      COMMUNITIES +
      '/' +
      communityId +
      ANALYTICS +
      '/' +
      analyticsPage
    );
  }

  static communityContentManagementUrl(
    communityId: string,
    contentManagementPage: string
  ): string {
    return (
      AAQUA_PARTNER_URL +
      COMMUNITIES +
      '/' +
      communityId +
      CONTENT_MANAGEMENT +
      '/' +
      contentManagementPage
    );
  }

  static communityContentModerationUrl(
    communityId: string,
    contentModerationPage: string
  ): string {
    return (
      AAQUA_PARTNER_URL +
      COMMUNITIES +
      '/' +
      communityId +
      CONTENT_MODERATION +
      '/' +
      contentModerationPage
    );
  }

  static communityCampaignsUrl(
    communityId: string,
    campaignsPage: string
  ): string {
    return (
      AAQUA_PARTNER_URL +
      COMMUNITIES +
      '/' +
      communityId +
      CAMPAIGNS +
      '/' +
      campaignsPage
    );
  }

  static communityShopUrl(communityId: string, shopPage: string): string {
    switch (shopPage) {
      case 'shop information':
        return (
          AAQUA_PARTNER_URL +
          COMMUNITIES +
          '/' +
          communityId +
          SHOP +
          INFORMATION
        );
      case 'products':
        return (
          AAQUA_PARTNER_URL +
          COMMUNITIES +
          '/' +
          communityId +
          SHOP +
          '/' +
          shopPage
        );
    }
    return (
      AAQUA_PARTNER_URL + COMMUNITIES + '/' + communityId + SHOP + INFORMATION
    );
  }

  static communityCommunitySettingsInformationUrl(communityId: string): string {
    return (
      AAQUA_PARTNER_URL +
      COMMUNITIES +
      '/' +
      communityId +
      COMMUNITY_SETTINGS +
      INFORMATION
    );
  }

  static communityCommunitySettingsRulesUrl(communityId: string): string {
    return (
      AAQUA_PARTNER_URL +
      COMMUNITIES +
      '/' +
      communityId +
      COMMUNITY_SETTINGS +
      RULES
    );
  }

  static contentModerationJobEntityDetailUrl(
    entityId: string,
    entityType: AaquaEntityType
  ): string {
    return `${AAQUA_PARTNER_URL}${COMMUNITIES}/${getModerationTestCommunityId()}${CONTENT_MODERATION}/${entityId}/jobs/${entityType.toLowerCase()}/details`;
  }

  static contentModerationHistoryEntityDetailUrl(
    entityId: string,
    entityType: AaquaEntityType
  ): string {
    return `${AAQUA_PARTNER_URL}${COMMUNITIES}/${getModerationTestCommunityId()}${CONTENT_MODERATION}/${entityId}/history/${entityType.toLowerCase()}/details`;
  }

  static loginUrl(): string {
    return AAQUA_PARTNER_URL + PARTNER_LOGIN;
  }
}

export class AaquaAdminApp {
  static moderationJobEntityDetailUrl(
    entityId: string,
    entityType: AaquaEntityType
  ): string {
    return `${AAQUA_ADMIN_URL}${MODERATION}/${entityId}/jobs/${entityType.toLowerCase()}/details`;
  }

  static moderationHistoryEntityDetailUrl(
    entityId: string,
    entityType: AaquaEntityType
  ): string {
    return `${AAQUA_ADMIN_URL}${MODERATION}/${entityId}/history/${entityType.toLowerCase()}/details`;
  }

  static loginUrl(): string {
    return AAQUA_ADMIN_URL + ADMIN_LOGIN;
  }
}
export async function navigateToUrlWithCustomPeriod(
  { page }: { page: Page },
  day: number,
  periodStart: string
) {
  const periodStartDate = new Date(periodStart);
  const startEpoch = periodStartDate.getTime();
  const endEpoch = periodStartDate.setTime(
    periodStartDate.getTime() + (24 * day * 60 * 60 * 1000 - 0.017)
  );
  const currentURL = page?.url();
  await page?.goto(
    `${currentURL}?period=custom&from=${startEpoch}&to=${endEpoch}`
  );
}
