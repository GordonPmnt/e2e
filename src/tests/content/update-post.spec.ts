import faker from '@faker-js/faker';
import type { Page } from 'playwright';

import { createPost, deletePost } from '../../api/community/posts';
import type { DefineStepFunction } from '../../gherkin-utils';
import { defineFeature, loadFeature } from '../../gherkin-utils';
import type { Post } from '../../graphql-schema/generated/graphql-request';
import {
  EditPostPage,
  PostsListPage,
} from '../../pages/contentManagement/posts';
import { navigateToCommunity } from '../../step-definitions/aaqua-partner/communities/communities.spec';
import { login } from '../../step-definitions/login/login.spec';
import { getEmail, getPassword } from '../../utils/credentials';

const feature = loadFeature('src/tests/content/update-post.feature');

let postId: Post['id'];
const newDescription = faker.random.words(5);

defineFeature(feature, ({ given, then, when }) => {
  (given as DefineStepFunction<{ app: string; user: string }>)(
    /^I am logged in the "(?<app>\w+)" app as user "(?<user>\w+)"$/,
    async ({ page }, { app, user }) => {
      postId = await createPost({
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
  )('I update the title of the post', async ({ page }) => {
    const postsListPage = new PostsListPage(<Page>page);
    const editPostPage = new EditPostPage(<Page>page);

    await postsListPage.clickMoreMenu(postId);
    await postsListPage.clickEditButton();
    await editPostPage.changeDescription(newDescription);
    await editPostPage.clickSubmit();
  });

  then('the post is updated', async ({ page }) => {
    const postsListPage = new PostsListPage(<Page>page);

    await postsListPage.verifyPostUpdated(newDescription);

    await deletePost({
      postId,
      user: {
        email: getEmail('CAT_ADMIN'),
        password: getPassword('CAT_ADMIN'),
      },
    });
  });
});
