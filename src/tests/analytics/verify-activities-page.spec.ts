import type { Page } from 'playwright';

import { defineFeature, loadFeature } from '../../gherkin-utils';
import type { DefineStepFunction } from '../../gherkin-utils/define-feature.util';
import { ActivitiesPage } from '../../pages/analytics/activities.page';
import { navigateToCommunity } from '../../step-definitions/aaqua-partner/communities/communities.spec';
import { login } from '../../step-definitions/login/login.spec';

const feature = loadFeature(
  'src/tests/analytics/verify-activities-page.feature'
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

  then(
    'I can see the community activities status details and graphs',
    async ({ page }) => {
      const activitiesPage = new ActivitiesPage(<Page>page);

      await activitiesPage.waitForActivitiesStatusLabelSelector();
      await activitiesPage.waitForActivitiesExplanationLabelSelector();
      await activitiesPage.waitForTotalEventsOrganisedLabelSelector();
      await activitiesPage.waitForTotalPollsCreatedDeltaLabelSelector();
      await activitiesPage.waitForActivitiesDetailsForSelectedPeriodLabelSelector();
      await activitiesPage.waitForEventsDeltaLabelSelector();
      await activitiesPage.waitForEventsEvolutionGraphLabelSelector();
      await activitiesPage.waitForAmountOfEventResponsesByTypeGraphLabelSelector();
      await activitiesPage.waitForPollsDeltaLabelSelector();
      await activitiesPage.waitForPollsEvolutionGraphLabelSelector();
      await activitiesPage.waitForPollsVotesGraphLabelSelector();
    }
  );
});
