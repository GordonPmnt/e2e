import faker from '@faker-js/faker';
import type { Page } from 'playwright';

import type { DefineStepFunction } from '../../gherkin-utils';
import { defineFeature, loadFeature } from '../../gherkin-utils';
import {
  CreatePostPage,
  PostsListPage,
} from '../../pages/contentManagement/posts';
import { navigateToCommunity } from '../../step-definitions/aaqua-partner/communities/communities.spec';
import { login } from '../../step-definitions/login/login.spec';

const feature = loadFeature('src/tests/content/create-post.feature');

const description = faker.random.words(5);

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

  when('I fill in the post creation form', async ({ page }) => {
    const createPostPage = new CreatePostPage(<Page>page);
    await createPostPage.fillInPostForm(description);
    await page?.waitForLoadState();
    await createPostPage.clickSubmitCreateForm();
  });

  then('the post is created', async ({ page }) => {
    const postsListPage = new PostsListPage(<Page>page);
    await postsListPage.verifyPostCreated(description);
  });
});
