import { faker } from '@faker-js/faker';
import type { Page } from 'playwright';

import { defineFeature, loadFeature } from '../../gherkin-utils';
import type { DefineStepFunction } from '../../gherkin-utils/define-feature.util';
import {
  ActivitiesListPage,
  CreateActivityPage,
} from '../../pages/contentManagement/activities';
import { CreateEventPage } from '../../pages/contentManagement/events';
import { navigateToCommunity } from '../../step-definitions/aaqua-partner/communities/communities.spec';
import { login } from '../../step-definitions/login/login.spec';

const title = faker.random.words(2);
const feature = loadFeature('src/tests/content/create-event.feature');

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
  when('I fill in the event creation form', async ({ page }) => {
    const createActivityPage = new CreateActivityPage(<Page>page);
    const createEventPage = new CreateEventPage(<Page>page);
    await createActivityPage.waitForCreateActivityHeader();
    await createActivityPage.selectCreateEventOption();
    await createEventPage.fillInEventForm(title);
    await page?.waitForLoadState();
    await createEventPage.clickSubmitCreateForm();
  });

  then('the event is created', async ({ page }) => {
    const activitiesListPage = new ActivitiesListPage(<Page>page);
    await activitiesListPage.verifyEventCreated(title);
  });
});
