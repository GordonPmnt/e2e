import { Then, When } from '@cucumber/cucumber';
import { faker } from '@faker-js/faker';
import type { Page } from 'playwright';

import {
  ActivitiesListPage,
  CreateActivityPage,
} from '../../../pages/contentManagement/activities';
import { CreateEventPage } from '../../../pages/contentManagement/events';
import type { ICustomWorld } from '../../../support/custom-world';

const title = faker.random.words(2);

When('I fill in the event creation form', async function (this: ICustomWorld) {
  const { page } = this;
  const createActivityPage = new CreateActivityPage(<Page>page);
  const createEventPage = new CreateEventPage(<Page>page);

  await createActivityPage.waitForCreateActivityHeader();
  await createActivityPage.selectCreateEventOption();
  await createEventPage.fillInEventForm(title);
  await page?.waitForLoadState();
  await createEventPage.clickSubmitCreateForm();
});

Then('the event is created', async function (this: ICustomWorld) {
  const { page } = this;
  const activitiesListPage = new ActivitiesListPage(<Page>page);

  await activitiesListPage.verifyEventCreated(title);
});
