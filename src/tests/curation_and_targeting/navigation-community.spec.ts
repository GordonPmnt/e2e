import type { Page } from 'playwright';

import { defineFeature, loadFeature } from '../../gherkin-utils';
import type { DefineStepFunction } from '../../gherkin-utils/define-feature.util';
import { CommunitiesPage } from '../../pages/home/communities.page';
import { login } from '../../step-definitions/login/login.spec';

const feature = loadFeature(
  'src/tests/curation_and_targeting/navigation-community.feature'
);

defineFeature(feature, ({ given, then, when }) => {
  (given as DefineStepFunction<{ app: string; user: string }>)(
    /^I am logged in the "(?<app>\w+)" app as user "(?<user>\w+)"$/,
    async ({ page }, { app, user }) => {
      await login({ page }, app, user);
    }
  );
  (
    given as DefineStepFunction<{
      communityName: string;
    }>
  )(
    /^I navigate to "(?<communityName>[\s\w]+)" community$/,
    async ({ page }, { communityName }) => {
      const communitiesPage = new CommunitiesPage(<Page>page);
      await communitiesPage.clickOnCommunity(communityName);
      await communitiesPage.waitForCommunity();
    }
  );
  when('I click on Aaqua logo in the header', async ({ page }) => {
    const communitiesPage = new CommunitiesPage(<Page>page);
    await communitiesPage.clickAaquaLogo();
  });
  (
    then as DefineStepFunction<{
      header: string;
    }>
  )(
    /^I am redirected to the "(?<header>\w+)" page$/,
    async ({ page }, { header }) => {
      const communitiesPage = new CommunitiesPage(<Page>page);
      await communitiesPage.verifyHeader(header);
    }
  );

  (
    when as DefineStepFunction<{
      parentPage: string;
      childPage: string;
    }>
  )(
    /^I navigate to the "(?<parentPage>[\s\w]+)" - "(?<childPage>[\s\w]+)" page$/,
    async ({ page }, { parentPage, childPage }) => {
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

  (
    then as DefineStepFunction<{
      header: string;
    }>
  )(
    /^I am redirected to the "(?<header>\w+)" page$/,
    async ({ page }, { header }) => {
      const communitiesPage = new CommunitiesPage(<Page>page);
      await communitiesPage.verifyHeader(header);
    }
  );
});
