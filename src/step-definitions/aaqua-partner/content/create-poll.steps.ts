import { Then, When } from '@cucumber/cucumber';
import { faker } from '@faker-js/faker';
import type { Page } from 'playwright';

import {
  ActivitiesListPage,
  CreateActivityPage,
} from '../../../pages/contentManagement/activities';
import { CreatePollPage } from '../../../pages/contentManagement/polls';
import type { ICustomWorld } from '../../../support/custom-world';

const question = faker.random.words(2);

When('I fill in the poll creation form', async function (this: ICustomWorld) {
  const { page } = this;
  const createActivityPage = new CreateActivityPage(<Page>page);
  const createPollPage = new CreatePollPage(<Page>page);

  await createActivityPage.waitForCreateActivityHeader();
  await createActivityPage.selectCreatePollOption();
  await createPollPage.fillInPollForm(question);
  await page?.waitForLoadState();
  await createPollPage.clickSubmitCreateForm();
});

Then('the poll is created', async function (this: ICustomWorld) {
  const { page } = this;
  const activitiesListPage = new ActivitiesListPage(<Page>page);

  await activitiesListPage.verifyPollCreated(question);
});
