import { faker } from '@faker-js/faker';
import type { Page } from 'playwright';

import { createPost, deletePost } from '../../api/community/posts';
import type { DefineStepFunction } from '../../gherkin-utils';
import { defineFeature, loadFeature } from '../../gherkin-utils';
import type { Post } from '../../graphql-schema/generated/graphql-request';
import {
  PostDetailPage,
  PostsListPage,
} from '../../pages/contentManagement/posts';
import { navigateToCommunity } from '../../step-definitions/aaqua-partner/communities/communities.spec';
import { login } from '../../step-definitions/login/login.spec';
import { getEmail, getPassword } from '../../utils/credentials';

let postId: Post['id'];
const comment = faker.random.words(2);

const feature = loadFeature('src/tests/content/add-comment-to-post.feature');

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
    /^I created a post without comments as user "(?<user>\w+)"$/,
    async (_, { user }) => {
      postId = await createPost({
        user: {
          email: getEmail(user),
          password: getPassword(user),
        },
      });
    }
  );

  when("I visit the post's detail page", async ({ page }) => {
    const postsListPage = new PostsListPage(<Page>page);

    await postsListPage.visitDetailPage(postId);
  });

  when('I add a comment to the post', async ({ page }) => {
    const postDetailPage = new PostDetailPage(<Page>page);

    await postDetailPage.fillInCommentField(comment);
    await page?.waitForLoadState();
    await postDetailPage.clickSubmitComment();
  });

  then(
    "I should see the comment in the post's detail page",
    async ({ page }) => {
      const postDetailPage = new PostDetailPage(<Page>page);

      await postDetailPage.verifyCommentAdded(comment);

      await deletePost({
        postId,
        user: {
          email: getEmail('CAT_ADMIN'),
          password: getPassword('CAT_ADMIN'),
        },
      });
    }
  );
});
