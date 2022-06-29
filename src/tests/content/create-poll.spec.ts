import faker from '@faker-js/faker';
import type { Page } from 'playwright';

import { defineFeature, loadFeature } from '../../gherkin-utils';
import type { DefineStepFunction } from '../../gherkin-utils/define-feature.util';
import {
  ActivitiesListPage,
  CreateActivityPage,
} from '../../pages/contentManagement/activities';
import { CreatePollPage } from '../../pages/contentManagement/polls';
import { navigateToCommunity } from '../../step-definitions/aaqua-partner/communities/communities.spec';
import { login } from '../../step-definitions/login/login.spec';

const feature = loadFeature('src/tests/content/create-poll.feature');

const question = faker.random.words(2);

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

  when('I fill in the poll creation form', async ({ page }) => {
    const createActivityPage = new CreateActivityPage(<Page>page);
    const createPollPage = new CreatePollPage(<Page>page);

    await createActivityPage.waitForCreateActivityHeader();
    await createActivityPage.selectCreatePollOption();
    await createPollPage.fillInPollForm(question);
    await page?.waitForLoadState();
    await createPollPage.clickSubmitCreateForm();
  });

  then('the poll is created', async ({ page }) => {
    const activitiesListPage = new ActivitiesListPage(<Page>page);
    await activitiesListPage.verifyPollCreated(question);
  });
});
