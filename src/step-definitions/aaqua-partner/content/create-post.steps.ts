import { Then, When } from '@cucumber/cucumber';
import { faker } from '@faker-js/faker';
import type { Page } from 'playwright';

import {
  CreatePostPage,
  PostsListPage,
} from '../../../pages/contentManagement/posts';
import type { ICustomWorld } from '../../../support/custom-world';

const description = faker.random.words(5);

When('I fill in the post creation form', async function (this: ICustomWorld) {
  const { page } = this;
  const createPostPage = new CreatePostPage(<Page>page);

  await createPostPage.fillInPostForm(description);
  await page?.waitForLoadState();
  await createPostPage.clickSubmitCreateForm();
});

Then('the post is created', async function (this: ICustomWorld) {
  const { page } = this;
  const postsListPage = new PostsListPage(<Page>page);

  await postsListPage.verifyPostCreated(description);
});
