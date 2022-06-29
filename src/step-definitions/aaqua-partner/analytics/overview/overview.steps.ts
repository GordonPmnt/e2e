import { Then, When } from '@cucumber/cucumber';
import type { Page } from 'playwright';

import { Chart } from '../../../../pages/analytics/components/chart';
import { DeltaCard } from '../../../../pages/analytics/components/deltaCard';
import { OverviewPage } from '../../../../pages/analytics/overview.page';
import type { ICustomWorld } from '../../../../support/custom-world';

When(
  'I hover on the {string} chart',
  async function (this: ICustomWorld, chartName: string) {
    const { page } = this;
    const chart = new Chart(<Page>page);
    await chart.hoverOnChart(chartName);
  }
);

Then(
  'I can see the community overview status details and graphs',
  async function (this: ICustomWorld) {
    const { page } = this;
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

Then(
  'I can see that Total Members and Total Posts metrics have correct values',
  async function (this: ICustomWorld) {
    const { page } = this;
    const overviewPage = new OverviewPage(<Page>page);
    await overviewPage.verifyTotalMembersValueIsVisible(20);
    await overviewPage.verifyTotalPostsValueIsVisible(1);
  }
);

Then(
  'the label on the graphs have the correct period {string}',
  async function (this: ICustomWorld, label: string) {
    const { page } = this;
    const overviewPage = new OverviewPage(<Page>page);
    await overviewPage.verifyMembersEvolutionChartPeriodLabel(label);
    await overviewPage.verifyPostsEvolutionChartPeriodLabel(label);
  }
);
Then(
  'I see a tooltip displayed on the {string} chart',
  async function (this: ICustomWorld, chartName: string) {
    const { page } = this;
    const chart = new Chart(<Page>page);
    await chart.verifyTooltipIsVisible(chartName);
  }
);

Then(
  'the {string} delta card has {string} title, {string} value and {string} {string} comparison',
  async function (
    this: ICustomWorld,
    name: string,
    title: string,
    value: string,
    comparison_value: string,
    comparison: string
  ) {
    const { page } = this;
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
