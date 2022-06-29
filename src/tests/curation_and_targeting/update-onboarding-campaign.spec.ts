import faker from '@faker-js/faker';
import { test } from '@playwright/test';
import type { Page } from 'playwright';

import { createCampaign, deleteCampaign } from '../../api/community/campaigns';
import { ApiOnboardingCampaignHelpers } from '../../api/community/campaigns/api-onboarding-campaign-helper';
import { defineFeature, loadFeature } from '../../gherkin-utils';
import type { DefineStepFunction } from '../../gherkin-utils/define-feature.util';
import { CampaignsListPage, EditCampaignPage } from '../../pages/campaigns';
import { navigateToCommunity } from '../../step-definitions/aaqua-partner/communities/communities.spec';
import { login } from '../../step-definitions/login/login.spec';
import { getEmail, getPassword } from '../../utils/credentials';
import type { CampaignType } from '../../utils/typings';

const feature = loadFeature(
  'src/tests/curation_and_targeting/update-onboarding-campaign.feature'
);

let campaignId: string;
const newTitle = faker.random.words(2);
const title = faker.random.words(2);

defineFeature(feature, ({ given, and, then, when }) => {
  test.beforeAll(async () => {
    campaignId =
      await ApiOnboardingCampaignHelpers.createOnboardingCampaignAsAdmin(
        'CAT_ADMIN',
        '58e244cd-a253-4309-be2c-19cff1db3ae3',
        title
      );
  });
  (
    given as DefineStepFunction<{
      campaignType: CampaignType;
      userName: string;
    }>
  )(
    /^I created an "(?<campaignType>[\s\w]+)" campaign as user "(?<userName>[\s\w]+)"$/,
    // eslint-disable-next-line no-empty-pattern
    async ({}, { campaignType, userName }) => {
      campaignId = await createCampaign({
        campaignType,
        user: {
          email: getEmail(userName),
          password: getPassword(userName),
        },
      });
    }
  );
  (given as DefineStepFunction<{ app: string; user: string }>)(
    /^I am logged in the "(?<app>\w+)" app as user "(?<user>\w+)"$/,
    async ({ page }, { app, user }) => {
      await login({ page }, app, user);
    }
  );

  (
    and as DefineStepFunction<{
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

  when('I update the description of the campaign', async ({ page }) => {
    const campaignsListPage = new CampaignsListPage(<Page>page);
    const editCampaignPage = new EditCampaignPage(<Page>page);

    await campaignsListPage.clickMoreMenu(campaignId);
    await campaignsListPage.clickEditButton();
    await editCampaignPage.changeTitle(newTitle);
    await editCampaignPage.clickSubmit();
  });

  then('the campaign is updated', async ({ page }) => {
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
});
