import { faker } from '@faker-js/faker';
import type { Page } from 'playwright';

import { pinContent } from '../../api/community/pinnable-content';
import { createPost, deletePost } from '../../api/community/posts';
import { defineFeature, loadFeature } from '../../gherkin-utils';
import type { DefineStepFunction } from '../../gherkin-utils/define-feature.util';
import type { Post } from '../../graphql-schema/generated/graphql-request';
import { PinnableContentListPage } from '../../pages/contentManagement/pinnable-content';
import { PostsListPage } from '../../pages/contentManagement/posts';
import { navigateToCommunity } from '../../step-definitions/aaqua-partner/communities/communities.spec';
import { login } from '../../step-definitions/login/login.spec';
import { getEmail, getPassword } from '../../utils/credentials';

enum ContentType {
  Post = 'post',
}

type CreateContentFunction = (args: {
  user: { email: string; password: string };
  title: string;
}) => Promise<Post['id']>;
const createContentFunctionByContentType: Record<
  ContentType,
  CreateContentFunction
> = {
  [ContentType.Post]: createPost,
};

type DeleteContentFunction = (args: {
  contentId: Post['id'];
  user: { email: string; password: string };
}) => Promise<unknown>;
const deleteContentFunctionByContentType: Record<
  ContentType,
  DeleteContentFunction
> = {
  [ContentType.Post]: ({ contentId, user }) =>
    deletePost({ postId: contentId, user }),
};

let contentId: Post['id'];

const getUser = (userName: string) => ({
  email: getEmail(userName),
  password: getPassword(userName),
});

const feature = loadFeature(
  'src/tests/curation_and_targeting/posts-list.feature'
);

defineFeature(feature, ({ given, when, then, and }) => {
  (given as DefineStepFunction<{ app: string; user: string }>)(
    /^I am logged in the "(?<app>\w+)" app as user "(?<user>\w+)"$/,
    async ({ page }, { app, user }) => {
      await login({ page }, app, user);
    }
  );

  (
    and as DefineStepFunction<{
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

  given('I see posts on the page', async ({ page }) => {
    const postsListPage = new PostsListPage(<Page>page);

    await postsListPage.checkPostCount(1);
  });

  (
    given as DefineStepFunction<{
      contentType: ContentType;
      userName: string;
    }>
  )(
    /^I created a pinned "(?<contentType>[\s\w]+)" as user "(?<userName>[\s\w]+)"$/,
    async ({ page }, { contentType, userName }) => {
      const createContentFunction =
        createContentFunctionByContentType[contentType];

      const title = faker.random.words(2);
      contentId = await createContentFunction({
        user: getUser(userName),
        title,
      });

      await pinContent({ contentId, user: getUser(userName) });
      const pinnableContentListPage = new PinnableContentListPage(<Page>page);
      await pinnableContentListPage.verifyContentCreated(title);
    }
  );

  (
    given as DefineStepFunction<{
      contentType: ContentType;
      userName: string;
    }>
  )(
    /^I created an unpinned "(?<contentType>[\s\w]+)" as user "(?<userName>[\s\w]+)"$/,
    async ({ page }, { contentType, userName }) => {
      const createContentFunction =
        createContentFunctionByContentType[contentType];

      const title = faker.random.words(2);
      contentId = await createContentFunction({
        user: getUser(userName),
        title,
      });

      const pinnableContentListPage = new PinnableContentListPage(<Page>page);
      await pinnableContentListPage.verifyContentCreated(title);
    }
  );

  (
    when as DefineStepFunction<{
      contentType: ContentType;
    }>
  )(
    /^I pin the "(?<contentType>[\s\w]+)"$/,
    async ({ page }, { contentType }) => {
      const pinnableContentListPage = new PinnableContentListPage(<Page>page);

      console.log(`Pinning ${contentType} with id ${contentId}...`);
      await pinnableContentListPage.clickMoreMenu(contentId);
      await pinnableContentListPage.clickPinButton();
      await pinnableContentListPage.clickConfirmPinButton();
    }
  );

  (
    when as DefineStepFunction<{
      contentType: ContentType;
    }>
  )(
    /^I unpin the "(?<contentType>[\s\w]+)"$/,
    async ({ page }, { contentType }) => {
      const pinnableContentListPage = new PinnableContentListPage(<Page>page);

      console.log(`Unpinning ${contentType} with id ${contentId}...`);
      await pinnableContentListPage.clickMoreMenu(contentId);
      await pinnableContentListPage.clickUnpinButton();
    }
  );

  (
    then as DefineStepFunction<{
      contentType: ContentType;
    }>
  )(
    /^the "(?<contentType>[\s\w]+)" is unpinned$/,
    async ({ page }, { contentType }) => {
      const pinnableContentListPage = new PinnableContentListPage(<Page>page);
      const deleteContentFunction =
        deleteContentFunctionByContentType[contentType];

      await pinnableContentListPage.verifyContentUnpinned();

      await deleteContentFunction({ contentId, user: getUser('CAT_ADMIN') });
    }
  );

  (
    then as DefineStepFunction<{
      contentType: ContentType;
    }>
  )(
    /^the "(?<contentType>[\s\w]+)" is pinned$/,
    async ({ page }, { contentType }) => {
      const pinnableContentListPage = new PinnableContentListPage(<Page>page);
      const deleteContentFunction =
        deleteContentFunctionByContentType[contentType];

      await pinnableContentListPage.verifyContentPinned();

      await deleteContentFunction({ contentId, user: getUser('CAT_ADMIN') });
    }
  );
});
