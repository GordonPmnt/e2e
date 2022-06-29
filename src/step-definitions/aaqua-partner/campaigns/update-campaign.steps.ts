import { Given, Then, When } from '@cucumber/cucumber';
import { faker } from '@faker-js/faker';
import type { Page } from 'playwright';

import {
  createCampaign,
  deleteCampaign,
} from '../../../api/community/campaigns';
import { CampaignsListPage, EditCampaignPage } from '../../../pages/campaigns';
import type { ICustomWorld } from '../../../support/custom-world';
import { getEmail, getPassword } from '../../../utils/credentials';
import type { CampaignType } from '../../../utils/typings';

let campaignId: string;
const newTitle = faker.random.words(2);

Given(
  'I created an {string} campaign as user {string}',
  async function (
    this: ICustomWorld,
    campaignType: CampaignType,
    userName: string
  ) {
    campaignId = await createCampaign({
      campaignType,
      user: {
        email: getEmail(userName),
        password: getPassword(userName),
      },
    });
  }
);

When(
  'I update the description of the campaign',
  async function (this: ICustomWorld) {
    const { page } = this;
    const campaignsListPage = new CampaignsListPage(<Page>page);
    const editCampaignPage = new EditCampaignPage(<Page>page);

    await campaignsListPage.clickMoreMenu(campaignId);
    await campaignsListPage.clickEditButton();
    await editCampaignPage.changeTitle(newTitle);
    await editCampaignPage.clickSubmit();
  }
);

Then('the campaign is updated', async function (this: ICustomWorld) {
  const { page } = this;
  const campaignsListPage = new CampaignsListPage(<Page>page);

  await campaignsListPage.verifyCampaignUpdated(newTitle);

  await deleteCampaign({
    campaignId,
    user: {
      email: getEmail('CAT_ADMIN'),
      password: getPassword('CAT_ADMIN'),
    },
  });
});
