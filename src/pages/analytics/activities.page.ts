/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import type { Page } from 'playwright';

export class ActivitiesPage {
  readonly page: Page;

  /* Element selectors */
  readonly activitiesStatusLabelSelector = 'h2:has-text("Activities status")';

  readonly activitiesExplanationLabelSelector =
    'p:has-text("The metrics below represent the current status of the community")';

  // TODO: Typo in the data-testid - report ticket
  readonly totalEventsOrganisedLabelSelector =
    '//h3[@data-testid="dashbord-gauge__title" and text()="Total Events Organised"]';

  readonly totalEventsOrganisedValueSelector =
    'data-testid=dashbord-gauge__value';

  readonly totalPoolsCreatedLabelSelector =
    '//h3[@data-testid="dashbord-gauge__title" and text()="Total Polls Created"]';

  readonly totalPoolsCreatedValueSelector = 'data-testid=dashbord-gauge__value';

  readonly activitiesDetailsLabelSelector =
    'h2:has-text("Activities details for selected period")';

  readonly eventsDeltaLabelSelector = '[data-testid="events-delta__title"]';

  readonly eventsDeltaValueSelector = 'data-testid=posts-delta__value';

  readonly eventsEvolutionGraphLabelSelector =
    'h3:has-text("Events Evolution")';

  readonly ammountOfEventResponsesByTypeGraphLabelSelector =
    'h3:has-text("Amount of Event Responses by Type")';

  readonly pollsDeltaLabelSelector = '[data-testid="polls-delta__title"]';

  readonly pollsDeltaValueSelector = 'data-testid=posts-delta__value';

  readonly pollsEvolutionGraphLabelSelector = 'h3:has-text("Polls Evolution")';

  readonly pollsVotesGraphLabelSelector = 'h3:has-text("Poll Votes")';

  constructor(page: Page) {
    this.page = page;
  }

  async waitForActivitiesStatusLabelSelector() {
    await this.page.waitForSelector(this.activitiesStatusLabelSelector);
  }

  async waitForActivitiesExplanationLabelSelector() {
    await this.page.waitForSelector(this.activitiesExplanationLabelSelector);
  }

  async waitForTotalEventsOrganisedLabelSelector() {
    await this.page.waitForSelector(this.totalEventsOrganisedLabelSelector);
  }

  // TODO: Use this with API call that will get the correct number (API & WEB cross-validation)
  // async verifyTotalEventsOrganisedValueIsVisible(totalEventsOrganised: string) {}

  async waitForTotalPollsCreatedDeltaLabelSelector() {
    await this.page.waitForSelector(this.totalPoolsCreatedLabelSelector);
  }

  // TODO: Use this with API call that will get the correct number (API & WEB cross-validation)
  // async verifyTotalPostsOrganisedDeltaValueIsVisible(totalPostsOrganised: string) {}

  async waitForActivitiesDetailsForSelectedPeriodLabelSelector() {
    await this.page.waitForSelector(this.activitiesDetailsLabelSelector);
  }

  async waitForEventsDeltaLabelSelector() {
    await this.page.waitForSelector(this.eventsDeltaLabelSelector);
  }

  async waitForEventsEvolutionGraphLabelSelector() {
    await this.page.waitForSelector(this.eventsEvolutionGraphLabelSelector);
  }

  async waitForAmountOfEventResponsesByTypeGraphLabelSelector() {
    await this.page.waitForSelector(
      this.ammountOfEventResponsesByTypeGraphLabelSelector
    );
  }

  async waitForPollsDeltaLabelSelector() {
    await this.page.waitForSelector(this.pollsDeltaLabelSelector);
  }

  async waitForPollsEvolutionGraphLabelSelector() {
    await this.page.waitForSelector(this.pollsEvolutionGraphLabelSelector);
  }

  async waitForPollsVotesGraphLabelSelector() {
    await this.page.waitForSelector(this.pollsVotesGraphLabelSelector);
  }
}
