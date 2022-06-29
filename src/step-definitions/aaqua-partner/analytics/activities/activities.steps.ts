import { Then } from '@cucumber/cucumber';
import type { Page } from 'playwright';

import { ActivitiesPage } from '../../../../pages/analytics/activities.page';
import type { ICustomWorld } from '../../../../support/custom-world';

Then(
  'I can see the community activities status details and graphs',
  async function (this: ICustomWorld) {
    const { page } = this;
    const activitiesPage = new ActivitiesPage(<Page>page);

    await activitiesPage.waitForActivitiesStatusLabelSelector();
    await activitiesPage.waitForActivitiesExplanationLabelSelector();
    await activitiesPage.waitForTotalEventsOrganisedLabelSelector();
    // TODO: Add API that will verify the total polls delta and then use verifyTotalEventsOrganisedValueIsVisible
    await activitiesPage.waitForTotalPollsCreatedDeltaLabelSelector();
    // TODO: Add API that will verify the total polls delta and then use verifyTotalPostsOrganisedDeltaValueIsVisible
    await activitiesPage.waitForActivitiesDetailsForSelectedPeriodLabelSelector();
    await activitiesPage.waitForEventsDeltaLabelSelector();
    await activitiesPage.waitForEventsEvolutionGraphLabelSelector();
    await activitiesPage.waitForAmountOfEventResponsesByTypeGraphLabelSelector();
    await activitiesPage.waitForPollsDeltaLabelSelector();
    await activitiesPage.waitForPollsEvolutionGraphLabelSelector();
    await activitiesPage.waitForPollsVotesGraphLabelSelector();
  }
);
