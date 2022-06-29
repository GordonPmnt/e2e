import { faker } from '@faker-js/faker';
import type { Page } from 'playwright';

import { createPoll, deletePoll } from '../../api/community/polls';
import type { DefineStepFunction } from '../../gherkin-utils';
import { defineFeature, loadFeature } from '../../gherkin-utils';
import type { Poll } from '../../graphql-schema/generated/graphql-request';
import { ActivitiesListPage } from '../../pages/contentManagement/activities';
import { PollDetailPage } from '../../pages/contentManagement/polls';
import { navigateToCommunity } from '../../step-definitions/aaqua-partner/communities/communities.spec';
import { login } from '../../step-definitions/login/login.spec';
import { getEmail, getPassword } from '../../utils/credentials';

let pollId: Poll['id'];
const comment = faker.random.words(2);

const feature = loadFeature('src/tests/content/add-comment-to-poll.feature');

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
    /^I created a poll without comments as user "(?<user>\w+)"$/,
    async (_, { user }) => {
      pollId = await createPoll({
        user: { email: getEmail(user), password: getPassword(user) },
      });
    }
  );

  when("I visit the poll's detail page", async ({ page }) => {
    const activitiesListPage = new ActivitiesListPage(<Page>page);

    await activitiesListPage.visitDetailPage(pollId);
  });

  when('I add a comment to the poll', async ({ page }) => {
    const pollDetailPage = new PollDetailPage(<Page>page);

    await pollDetailPage.fillInCommentField(comment);
    await page?.waitForLoadState();
    await pollDetailPage.clickSubmitComment();
  });

  then(
    "I should see the comment in the poll's detail page",
    async ({ page }) => {
      const pollDetailPage = new PollDetailPage(<Page>page);

      await pollDetailPage.verifyCommentAdded(comment);

      await deletePoll({
        pollId,
        user: {
          email: getEmail('CAT_ADMIN'),
          password: getPassword('CAT_ADMIN'),
        },
      });
    }
  );
});
