import { Given } from '@cucumber/cucumber';
import type { Page } from 'playwright';

import { PostsListPage } from '../../../pages/contentManagement/posts';
import type { ICustomWorld } from '../../../support/custom-world';

Given('I see posts on the page', async function (this: ICustomWorld) {
  const { page } = this;
  const postsListPage = new PostsListPage(<Page>page);

  await postsListPage.checkPostCount(1);
});
