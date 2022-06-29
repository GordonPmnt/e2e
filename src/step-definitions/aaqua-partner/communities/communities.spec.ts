import type { Page } from 'playwright';

import { AaquaPartnerApp } from '../../../utils/url-builder';

// TODO: Let's find better way to do this
export const COMMUNITIES: Record<string, string> = {
  Aaquatomia: '91170c98-2cc5-4935-9ea6-12b72d32fb3c',
  'Analytics Squad': '61d7a870-41ce-4598-8147-41a592c81634',
  'E2E Web CAT': '58e244cd-a253-4309-be2c-19cff1db3ae3',
  'E2E Web Moderation 3': 'f6a5feaf-040e-4bbc-8535-23fa7fe69093',
  'Internal Shop Fandom': '6062878a-05c0-4208-ab7a-d76e79607a08',
  FNU_HIDDEN_WEB_1: '96c0666a-e3ab-4667-8787-211962577f95',
};

export async function navigateToCommunity(
  { page }: { page: Page },
  communityName: string,
  parentPage: string,
  childPage: string
) {
  const communityId = COMMUNITIES[communityName];

  switch (parentPage.toLowerCase()) {
    case 'analytics':
      await page?.goto(
        AaquaPartnerApp.communityAnalyticsUrl(
          communityId,
          childPage.toLowerCase()
        )
      );
      break;
    case 'content management':
      if (childPage.toLowerCase() == 'create post') {
        childPage = 'posts/new';
      } else if (childPage.toLowerCase() == 'create activity') {
        childPage = 'activities/new';
      }
      await page?.goto(
        AaquaPartnerApp.communityContentManagementUrl(
          communityId,
          childPage.toLowerCase()
        )
      );
      break;
    case 'content moderation':
      if (childPage.toLowerCase() == 'moderation guidelines') {
        childPage = 'guidelines';
      }
      await page?.goto(
        AaquaPartnerApp.communityContentModerationUrl(
          communityId,
          childPage.toLowerCase()
        )
      );
      break;
    case 'campaigns':
      if (childPage.toLowerCase() == 'create campaign') {
        childPage = 'new';
      }
      await page?.goto(
        AaquaPartnerApp.communityCampaignsUrl(
          communityId,
          childPage.toLowerCase()
        )
      );
      break;
    case 'shop':
      await page?.goto(
        AaquaPartnerApp.communityShopUrl(communityId, childPage.toLowerCase())
      );
      break;
    case 'community settings':
      if (childPage.toLowerCase() == 'community information') {
        await page?.goto(
          AaquaPartnerApp.communityCommunitySettingsInformationUrl(communityId)
        );
      } else if (childPage.toLowerCase() == 'community rules') {
        await page?.goto(
          AaquaPartnerApp.communityCommunitySettingsRulesUrl(communityId)
        );
      }
      break;

      break;
    default:
      return;
  }
}
