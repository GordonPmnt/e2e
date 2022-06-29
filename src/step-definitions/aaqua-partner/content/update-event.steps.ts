import { Given, Then, When } from '@cucumber/cucumber';
import { faker } from '@faker-js/faker';
import type { Page } from 'playwright';

import { createEvent, deleteEvent } from '../../../api/community/events';
import type { Event } from '../../../graphql-schema/generated/graphql-request';
import { ActivitiesListPage } from '../../../pages/contentManagement/activities';
import { EditEventPage } from '../../../pages/contentManagement/events';
import type { ICustomWorld } from '../../../support/custom-world';
import { getEmail, getPassword } from '../../../utils/credentials';

let eventId: Event['id'];
const newTitle = faker.random.words(2);

Given(
  'I created an event as user {string}',
  async function (this: ICustomWorld, userName: string) {
    eventId = await createEvent({
      user: {
        email: getEmail(userName),
        password: getPassword(userName),
      },
    });
  }
);

When('I update the title of the event', async function (this: ICustomWorld) {
  const { page } = this;
  const activitiesListPage = new ActivitiesListPage(<Page>page);
  const editEventPage = new EditEventPage(<Page>page);

  await activitiesListPage.clickMoreMenu(eventId);
  await activitiesListPage.clickEditButton();
  await editEventPage.changeTitle(newTitle);
  await editEventPage.clickSubmit();
});

Then('the event is updated', async function (this: ICustomWorld) {
  const { page } = this;
  const activitiesListPage = new ActivitiesListPage(<Page>page);

  await activitiesListPage.verifyEventUpdated(newTitle);

  await deleteEvent({
    eventId,
    user: {
      email: getEmail('CAT_ADMIN'),
      password: getPassword('CAT_ADMIN'),
    },
  });
});
