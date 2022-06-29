import faker from '@faker-js/faker';
import type { Page } from 'playwright';

import { createEvent, deleteEvent } from '../../api/community/events';
import { defineFeature, loadFeature } from '../../gherkin-utils';
import type { DefineStepFunction } from '../../gherkin-utils/define-feature.util';
import type { Event } from '../../graphql-schema/generated/graphql-request';
import { ActivitiesListPage } from '../../pages/contentManagement/activities';
import { EditEventPage } from '../../pages/contentManagement/events';
import { navigateToCommunity } from '../../step-definitions/aaqua-partner/communities/communities.spec';
import { login } from '../../step-definitions/login/login.spec';
import { getEmail, getPassword } from '../../utils/credentials';

const feature = loadFeature('src/tests/content/update-event.feature');

let eventId: Event['id'];
const newTitle = faker.random.words(2);

defineFeature(feature, ({ given, then, when }) => {
  (given as DefineStepFunction<{ app: string; user: string }>)(
    /^I am logged in the "(?<app>\w+)" app as user "(?<user>\w+)"$/,
    async ({ page }, { app, user }) => {
      eventId = await createEvent({
        user: {
          email: getEmail('CAT_ADMIN'),
          password: getPassword('CAT_ADMIN'),
        },
      });
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

  (
    when as DefineStepFunction<{
      userName: string;
    }>
  )('I update the title of the event', async ({ page }) => {
    const activitiesListPage = new ActivitiesListPage(<Page>page);
    const editEventPage = new EditEventPage(<Page>page);
    await activitiesListPage.clickMoreMenu(eventId);
    await activitiesListPage.clickEditButton();
    await editEventPage.changeTitle(newTitle);
    await editEventPage.clickSubmit();
  });

  then('the event is updated', async ({ page }) => {
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
});
