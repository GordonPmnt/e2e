import { Then, When } from '@cucumber/cucumber';
import { faker } from '@faker-js/faker';
import type { Page } from 'playwright';

import { CreateCampaignPage } from '../../../pages/campaigns';
import type { ICustomWorld } from '../../../support/custom-world';
import type { CampaignType } from '../../../utils/typings';

const title = faker.random.words(2);

When(
  'I fill in the {string} campaign creation form',
  async function (this: ICustomWorld, campaignType: CampaignType) {
    const { page } = this;
    const createCampaignPage = new CreateCampaignPage(<Page>page);

    await createCampaignPage.waitForCreateCampaignHeader();
    await createCampaignPage.selectCreateCampaignOption(campaignType);
    await createCampaignPage.fillInCampaignForm({ campaignType, title });
    await page?.waitForLoadState();
    await createCampaignPage.clickSubmitCreateForm();
  }
);

Then('the campaign is created', async function (this: ICustomWorld) {
  const { page } = this;
  const createCampaignPage = new CreateCampaignPage(<Page>page);

  await createCampaignPage.verifyCampaignCreated(title);
});
