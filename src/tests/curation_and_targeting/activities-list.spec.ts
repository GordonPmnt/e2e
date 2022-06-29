import { faker } from '@faker-js/faker';
import type { Page } from 'playwright';

import { createEvent, deleteEvent } from '../../api/community/events';
import { pinContent } from '../../api/community/pinnable-content';
import { createPoll, deletePoll } from '../../api/community/polls';
import { defineFeature, loadFeature } from '../../gherkin-utils';
import type { DefineStepFunction } from '../../gherkin-utils/define-feature.util';
import type {
  Event,
  Poll,
} from '../../graphql-schema/generated/graphql-request';
import { ActivitiesPage } from '../../pages/contentManagement/activities.page';
import { PinnableContentListPage } from '../../pages/contentManagement/pinnable-content';
import { navigateToCommunity } from '../../step-definitions/aaqua-partner/communities/communities.spec';
import { login } from '../../step-definitions/login/login.spec';
import { getEmail, getPassword } from '../../utils/credentials';

const feature = loadFeature(
  'src/tests/curation_and_targeting/activities-list.feature'
);
enum ContentType {
  Event = 'event',
  Poll = 'poll',
}

type CreateContentFunction = (args: {
  user: { email: string; password: string };
  title: string;
}) => Promise<Event['id'] | Poll['id']>;
const createContentFunctionByContentType: Record<
  ContentType,
  CreateContentFunction
> = {
  [ContentType.Event]: createEvent,
  [ContentType.Poll]: createPoll,
};

type DeleteContentFunction = (args: {
  contentId: Event['id'] | Poll['id'];
  user: { email: string; password: string };
}) => Promise<unknown>;
const deleteContentFunctionByContentType: Record<
  ContentType,
  DeleteContentFunction
> = {
  [ContentType.Event]: ({ contentId, user }) =>
    deleteEvent({ eventId: contentId, user }),
  [ContentType.Poll]: ({ contentId, user }) =>
    deletePoll({ pollId: contentId, user }),
};

let contentId: Event['id'] | Poll['id'];

const getUser = (userName: string) => ({
  email: getEmail(userName),
  password: getPassword(userName),
});
defineFeature(feature, ({ given, then, when, and }) => {
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

  then('I see events and polls on the page', async ({ page }) => {
    const activitiesPage = new ActivitiesPage(<Page>page);
    await activitiesPage.checkEventCount(1);
    await activitiesPage.checkPollCount(1);
  });

  given(
    'I see the pagination buttons in the bottom of the page',
    async ({ page }) => {
      const activitiesPage = new ActivitiesPage(<Page>page);
      await activitiesPage.checkPaginationSection('Page 1');
    }
  );

  then('I can navigate to the next page', async ({ page }) => {
    const activitiesPage = new ActivitiesPage(<Page>page);
    await activitiesPage.clickNextPageButton();
    await activitiesPage.checkPaginationSection('Page 2');
    await activitiesPage.checkEventCount(1);
    await activitiesPage.checkPollCount(1);
  });

  and('I can navigate to the previous page', async ({ page }) => {
    const activitiesPage = new ActivitiesPage(<Page>page);
    await activitiesPage.clickPreviousPageButton();
    await activitiesPage.checkPaginationSection('Page 1');
    await activitiesPage.checkEventCount(1);
    await activitiesPage.checkPollCount(1);
  });

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
});
