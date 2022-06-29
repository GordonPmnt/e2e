import { faker } from '@faker-js/faker';
import type { Page } from 'playwright';

import { createEvent, deleteEvent } from '../../api/community/events';
import type { DefineStepFunction } from '../../gherkin-utils';
import { defineFeature, loadFeature } from '../../gherkin-utils';
import type { Event } from '../../graphql-schema/generated/graphql-request';
import { ActivitiesListPage } from '../../pages/contentManagement/activities';
import { EventDetailPage } from '../../pages/contentManagement/events';
import { navigateToCommunity } from '../../step-definitions/aaqua-partner/communities/communities.spec';
import { login } from '../../step-definitions/login/login.spec';
import { getEmail, getPassword } from '../../utils/credentials';

let eventId: Event['id'];
const comment = faker.random.words(2);

const feature = loadFeature('src/tests/content/add-comment-to-event.feature');

defineFeature(feature, ({ given, then, when }) => {
  (given as DefineStepFunction<{ app: string; user: string }>)(
    /^I am logged in the "(?<app>\w+)" app as user "(?<user>\w+)"$/,
    async ({ page }, { app, user }) => {
      await login({ page }, app, user);
    }
  );

  (
    given as DefineStepFunction<{
      childPage: string;
      communityName: string;
      parentPage: string;
    }>
  )(
    /^I am on the "(?<communityName>[\s\w]+)" "(?<parentPage>[\s\w]+)" "(?<childPage>[\s\w]+)" page$/,
    async ({ page }, { childPage, communityName, parentPage }) => {
      await navigateToCommunity({ page }, communityName, parentPage, childPage);
    }
  );

  (given as DefineStepFunction<{ user: string }>)(
    /^I created an event without comments as user "(?<user>\w+)"$/,
    async (_, { user }) => {
      eventId = await createEvent({
        user: { email: getEmail(user), password: getPassword(user) },
      });
    }
  );

  when("I visit the event's detail page", async ({ page }) => {
    const activitiesListPage = new ActivitiesListPage(<Page>page);

    await activitiesListPage.visitDetailPage(eventId);
  });

  when('I add a comment to the event', async ({ page }) => {
    const eventDetailPage = new EventDetailPage(<Page>page);

    await eventDetailPage.fillInCommentField(comment);
    await page?.waitForLoadState();
    await eventDetailPage.clickSubmitComment();
  });

  then(
    "I should see the comment in the event's detail page",
    async ({ page }) => {
      const eventDetailPage = new EventDetailPage(<Page>page);

      await eventDetailPage.verifyCommentAdded(comment);

      await deleteEvent({
        eventId,
        user: {
          email: getEmail('CAT_ADMIN'),
          password: getPassword('CAT_ADMIN'),
        },
      });
    }
  );
});
