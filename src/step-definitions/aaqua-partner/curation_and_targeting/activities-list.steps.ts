import { Given, Then } from '@cucumber/cucumber';
import type { Page } from 'playwright';

import { ActivitiesPage } from '../../../pages/contentManagement/activities.page';
import type { ICustomWorld } from '../../../support/custom-world';

Given(
  'I see events and polls on the page',
  async function (this: ICustomWorld) {
    const { page } = this;
    const activitiesPage = new ActivitiesPage(<Page>page);
    await activitiesPage.checkEventCount(1);
    await activitiesPage.checkPollCount(1);
  }
);

Given(
  'I see the pagination buttons in the bottom of the page',
  async function (this: ICustomWorld) {
    const { page } = this;
    const activitiesPage = new ActivitiesPage(<Page>page);
    await activitiesPage.checkPaginationSection('Page 1');
  }
);

Then('I can navigate to the next page', async function (this: ICustomWorld) {
  const { page } = this;
  const activitiesPage = new ActivitiesPage(<Page>page);
  await activitiesPage.clickNextPageButton();
  await activitiesPage.checkPaginationSection('Page 2');
  await activitiesPage.checkEventCount(1);
  await activitiesPage.checkPollCount(1);
});

Then(
  'I can navigate to the previous page',
  async function (this: ICustomWorld) {
    const { page } = this;
    const activitiesPage = new ActivitiesPage(<Page>page);
    await activitiesPage.clickPreviousPageButton();
    await activitiesPage.checkPaginationSection('Page 1');
    await activitiesPage.checkEventCount(1);
    await activitiesPage.checkPollCount(1);
  }
);
