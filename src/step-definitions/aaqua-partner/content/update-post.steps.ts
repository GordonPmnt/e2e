import { Given, Then, When } from '@cucumber/cucumber';
import { faker } from '@faker-js/faker';
import type { Page } from 'playwright';

import { createPost, deletePost } from '../../../api/community/posts';
import type { Post } from '../../../graphql-schema/generated/graphql-request';
import {
  EditPostPage,
  PostsListPage,
} from '../../../pages/contentManagement/posts';
import type { ICustomWorld } from '../../../support/custom-world';
import { getEmail, getPassword } from '../../../utils/credentials';

let postId: Post['id'];
const newDescription = faker.random.words(5);

Given(
  'I created a post as user {string}',
  async function (this: ICustomWorld, userName: string) {
    postId = await createPost({
      user: {
        email: getEmail(userName),
        password: getPassword(userName),
      },
    });
  }
);

When('I update the title of the post', async function (this: ICustomWorld) {
  const { page } = this;
  const postsListPage = new PostsListPage(<Page>page);
  const editPostPage = new EditPostPage(<Page>page);

  await postsListPage.clickMoreMenu(postId);
  await postsListPage.clickEditButton();
  await editPostPage.changeDescription(newDescription);
  await editPostPage.clickSubmit();
});

Then('the post is updated', async function (this: ICustomWorld) {
  const { page } = this;
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
