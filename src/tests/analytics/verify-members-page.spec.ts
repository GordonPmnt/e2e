import { expect } from '@playwright/test';
import type { Page } from 'playwright';

import { defineFeature, loadFeature } from '../../gherkin-utils';
import type { DefineStepFunction } from '../../gherkin-utils/define-feature.util';
import { Chart } from '../../pages/analytics/components/chart';
import { DeltaCard } from '../../pages/analytics/components/deltaCard';
import { MembersPage } from '../../pages/analytics/members.page';
import { navigateToCommunity } from '../../step-definitions/aaqua-partner/communities/communities.spec';
import { login } from '../../step-definitions/login/login.spec';
import { navigateToUrlWithCustomPeriod } from '../../utils/url-builder';

const feature = loadFeature('src/tests/analytics/verify-members-page.feature');

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

  then(
    'I can see the community members status details and graphs',
    async ({ page }) => {
      const membersPage = new MembersPage(<Page>page);

      expect(await membersPage.totalMembersLabel.isVisible()).toBeTruthy();

      await membersPage.verifyMembersStatusLabelIsVisible();
      await membersPage.verifyMembersExplanationLabelIsVisible();
      await membersPage.verifyReputationScoreDistributionGraphLabelIsVisible();
      await membersPage.verifyMembersDetailsLabelIsVisible();
      await membersPage.verifyJoinersLabelIsVisible();
      await membersPage.verifyLeaversLabelIsVisible();
      await membersPage.verifyMembersEvolutionGraphLabelIsVisible();
      await membersPage.verifyJoinersVsLeaversGraphLabelIsVisible();
    }
  );

  then('I can see a user guide banner on the page', async ({ page }) => {
    const membersPage = new MembersPage(<Page>page);
    await membersPage.verifyUserGuideBanner(
      'Invite friends to grow your community.'
    );
  });

  then(
    'I can see the reputation score distribution chart with data',
    async ({ page }) => {
      const membersPage = new MembersPage(<Page>page);
      await membersPage.verifyReputationScoreChartIsVisible();
    }
  );

  then(
    'I can see that Total Members metric has correct value',
    async ({ page }) => {
      const membersPage = new MembersPage(<Page>page);

      await membersPage.verifyTotalMembersValue(20);
    }
  );

  (when as DefineStepFunction<{ day: number; periodStart: string }>)(
    /^I apply a custom period of "(?<day>[<>\s\w]+)" days starting from "(?<periodStart>[<>/\s\w]+)"$/,
    async ({ page }, { day, periodStart }) => {
      await navigateToUrlWithCustomPeriod({ page }, day, periodStart);
    }
  );
  (
    then as DefineStepFunction<{
      name: string;
      title: string;
      value: string;
      comparison_value: string;
      comparison: string;
    }>
  )(
    /^the "(?<name>[\w]+)" delta card has "(?<title>[<>\s\w]+)" title, "(?<value>[<>\s\w]+)" value and "(?<comparison_value>[<>\s\w]+)" "(?<comparison>[<>\s\w]+)" comparison$/,
    async ({ page }, { name, title, value, comparison_value, comparison }) => {
      const deltaCard = new DeltaCard(<Page>page);
      await deltaCard.verifyDeltaCardTitle(name, title);
      await deltaCard.verifyDeltaCardValue(name, value);
      await deltaCard.verifyDeltaCardComparisonMetrics(
        name,
        comparison_value,
        comparison
      );
    }
  );

  (when as DefineStepFunction<{ chartName: string }>)(
    /^I hover on the "(?<chartName>[<>-\s\w]+)" chart$/,
    async ({ page }, { chartName }) => {
      const chart = new Chart(<Page>page);
      await chart.hoverOnChart(chartName);
    }
  );

  (then as DefineStepFunction<{ chartName: string }>)(
    /^I see a tooltip displayed on the "(?<chartName>[<>-\s\w]+)" chart$/,
    async ({ page }, { chartName }) => {
      const chart = new Chart(<Page>page);
      await chart.verifyTooltipIsVisible(chartName);
    }
  );
});
