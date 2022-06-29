import { When } from '@cucumber/cucumber';
import type { Page } from 'playwright';

import { CommunitiesPage } from '../../../pages/home/communities.page';
import type { ICustomWorld } from '../../../support/custom-world';
import { AaquaPartnerApp } from '../../../utils/url-builder';

When(
  'I navigate to {string} community',
  async function (this: ICustomWorld, communityName: string) {
    const { page } = this;
    const communitiesPage = new CommunitiesPage(<Page>page);
    await communitiesPage.clickOnCommunity(communityName);
    await page?.waitForSelector('//h1[normalize-space()="Community Overview"]');
  }
);

// When(
//   'Navigate to the {string} - {string} page',
//   async function (this: ICustomWorld, parentPage: string, childPage: string) {
//     const { page } = this;
//     const communitiesPage = new CommunitiesPage(<Page>page);
//     if (!parentPage.match('Analytics')) {
//       await communitiesPage.clickOnParentPage(parentPage);
//     }
//     await communitiesPage.clickOnChildPage(childPage);
//   },
// );

When(
  'I am on the {string} {string} {string} page',
  async function (
    this: ICustomWorld,
    communityName: string,
    parentPage: string,
    childPage: string
  ) {
    const { page } = this;

    let communityId = '';

    // TODO: We can add additional logic here in order to accept other communities if needed
    switch (communityName) {
      case 'Aaquatopia':
        communityId = '91170c98-2cc5-4935-9ea6-12b72d32fb3c';
        break;
      case 'Analytics Squad':
        communityId = '61d7a870-41ce-4598-8147-41a592c81634';
        break;
      case 'E2E Web CAT':
        communityId = '58e244cd-a253-4309-be2c-19cff1db3ae3';
        break;
      case 'E2E Web Moderation 3':
        communityId = 'f6a5feaf-040e-4bbc-8535-23fa7fe69093';
        break;
      case 'FNU_HIDDEN_WEB_1':
        communityId = '96c0666a-e3ab-4667-8787-211962577f95';
        break;
      case 'Internal Shop Fandom':
        communityId = '6062878a-05c0-4208-ab7a-d76e79607a08';
        break;
      default:
        return;
    }

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
            AaquaPartnerApp.communityCommunitySettingsInformationUrl(
              communityId
            )
          );
        } else if (childPage.toLowerCase() == 'community rules') {
          await page?.goto(
            AaquaPartnerApp.communityCommunitySettingsRulesUrl(communityId)
          );
        }
        break;
      default:
        return;
    }
  }
);
