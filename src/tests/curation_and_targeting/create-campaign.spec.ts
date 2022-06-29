import faker from '@faker-js/faker';
import type { Page } from 'playwright';

import { defineFeature, loadFeature } from '../../gherkin-utils';
import type { DefineStepFunction } from '../../gherkin-utils/define-feature.util';
import { CreateCampaignPage } from '../../pages/campaigns';
import { navigateToCommunity } from '../../step-definitions/aaqua-partner/communities/communities.spec';
import { login } from '../../step-definitions/login/login.spec';
import type { CampaignType } from '../../utils/typings';

const title = faker.random.words(2);
const feature = loadFeature(
  'src/tests/curation_and_targeting/create-campaign.feature'
);

defineFeature(feature, ({ given, then, when }) => {
  (given as DefineStepFunction<{ app: string; user: string }>)(
    /^I am logged in the "(?<app>\w+)" app as user "(?<user>\w+)"$/,
    async ({ page }, { app, user }) => {
      await login({ page }, app, user);
    }
  );

  (
    when as DefineStepFunction<{
      communityName: string;
      parentPage: string;
      childPage: string;
    }>
  )(
    /^I am on the "(?<communityName>[\s\w]+)" "(?<parentPage>[\s\w]+)" "(?<childPage>[\s\w]+)" page$/,
    async ({ page }, { communityName, parentPage, childPage }) => {
      await navigateToCommunity({ page }, communityName, parentPage, childPage);
    }
  );

  (
    when as DefineStepFunction<{
      campaignType: CampaignType;
    }>
  )(
    /^I fill in the "(?<campaignType>[\s\w]+)" campaign creation form$/,
    async ({ page }, { campaignType }) => {
      const createCampaignPage = new CreateCampaignPage(<Page>page);

      await createCampaignPage.waitForCreateCampaignHeader();
      await createCampaignPage.selectCreateCampaignOption(campaignType);
      await createCampaignPage.fillInCampaignForm({ campaignType, title });
      await page?.waitForLoadState();
      await createCampaignPage.clickSubmitCreateForm();
    }
  );

  then('the campaign is created', async ({ page }) => {
    const createCampaignPage = new CreateCampaignPage(<Page>page);

    await createCampaignPage.verifyCampaignCreated(title);
  });
});
