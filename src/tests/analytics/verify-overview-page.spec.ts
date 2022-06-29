import type { Page } from 'playwright';

import { defineFeature, loadFeature } from '../../gherkin-utils';
import type { DefineStepFunction } from '../../gherkin-utils/define-feature.util';
import { Chart } from '../../pages/analytics/components/chart';
import { DeltaCard } from '../../pages/analytics/components/deltaCard';
import { DatePicker } from '../../pages/analytics/datePicker';
import { OverviewPage } from '../../pages/analytics/overview.page';
import { navigateToUrlWithCustomPeriod } from '../../utils/url-builder';

import {
  selectDaysOfPeriod,
  selectPeriod,
} from './../../step-definitions/aaqua-partner/analytics/shared/datePicker.spec';
import { navigateToCommunity } from './../../step-definitions/aaqua-partner/communities/communities.spec';
import { login } from './../../step-definitions/login/login.spec';

const feature = loadFeature('src/tests/analytics/verify-overview-page.feature');

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
    'I can see the community overview status details and graphs',
    async ({ page }) => {
      const overviewPage = new OverviewPage(<Page>page);

      await overviewPage.verifyCommunityStatusLabelIsVisible();
      await overviewPage.verifyCommunityExplanationLabelIsVisible();
      await overviewPage.verifyTotalMembersLabelIsVisible();
      await overviewPage.verifyTotalPostsLabelIsVisible();
      await overviewPage.verifyCommunityDetailsForSelectedPeriodLabelIsVisible();
      await overviewPage.verifyJoinersLabelIsVisible();
      await overviewPage.verifyPostsLabelIsVisible();
      await overviewPage.verifyMembersEvolutionGraphLabelIsVisible();
      await overviewPage.verifyPostsEvolutionGraphLabelIsVisible();
    }
  );

  then(
    'I can see that Total Members and Total Posts metrics have correct values',
    async ({ page }) => {
      const overviewPage = new OverviewPage(<Page>page);

      await overviewPage.verifyTotalMembersValueIsVisible(20);
      await overviewPage.verifyTotalPostsValueIsVisible(1);
    }
  );

  (when as DefineStepFunction<{ period: string }>)(
    /^I select "(?<period>[<>\s\w]+)" period from the period dropdown$/,
    async ({ page }, { period }) => {
      await selectPeriod({ page }, period);
    }
  );

  (then as DefineStepFunction<{ label: string }>)(
    /^the label on the graphs have the correct period "(?<label>[<>\s\w]+)"$/,
    async ({ page }, { label }) => {
      const overviewPage = new OverviewPage(<Page>page);
      await overviewPage.verifyMembersEvolutionChartPeriodLabel(label);
      await overviewPage.verifyPostsEvolutionChartPeriodLabel(label);
    }
  );

  (when as DefineStepFunction<{ firstDay: string; lastDay: string }>)(
    /^I select "(?<firstDay>[\s\w]+)" and "(?<lastDay>[\s\w]+)" days from the calendar$/,
    async ({ page }, { firstDay, lastDay }) => {
      await selectDaysOfPeriod({ page }, firstDay, lastDay);
    }
  );

  then('the datepicker pop-up is displayed', async ({ page }) => {
    const datePicker = new DatePicker(<Page>page);
    await datePicker.datePickerPopUpIsisible();
  });

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
