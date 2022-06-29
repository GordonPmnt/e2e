import { Then, When } from '@cucumber/cucumber';
import type { Page } from 'playwright';

import { CommunitiesPage } from '../../../pages/home/communities.page';
import type { ICustomWorld } from '../../../support/custom-world';

When(
  'I navigate to the {string} - {string} page',
  async function (this: ICustomWorld, parentPage: string, childPage: string) {
    const { page } = this;
    const communitiesPage = new CommunitiesPage(<Page>page);
    const isChildPageVisible = await page?.isVisible(`text=${childPage}`, {
      timeout: 5000,
    });
    await communitiesPage.clickOnAnalytics();

    // Click only if the Parent is collapsed
    if (isChildPageVisible === false) {
      await communitiesPage.clickOnParentPage(parentPage);
    }
    await communitiesPage.clickOnChildPage(childPage);
  }
);

Then(
  'I see {string} information in the main area',
  async function (this: ICustomWorld, community: string) {
    const { page } = this;
    const communitiesPage = new CommunitiesPage(<Page>page);
    await communitiesPage.verifyCommunity(community);
  }
);

When(
  'I click on Aaqua logo in the header',
  async function (this: ICustomWorld) {
    const { page } = this;
    const communitiesPage = new CommunitiesPage(<Page>page);
    await communitiesPage.clickAaquaLogo();
  }
);

Then(
  'I am redirected to the {string} page',
  async function (this: ICustomWorld, header: string) {
    const { page } = this;
    const communitiesPage = new CommunitiesPage(<Page>page);
    await communitiesPage.verifyHeader(header);
  }
);
