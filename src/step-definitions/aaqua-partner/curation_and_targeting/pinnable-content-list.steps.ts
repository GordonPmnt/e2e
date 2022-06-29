import { Given, Then, When } from '@cucumber/cucumber';
import { faker } from '@faker-js/faker';
import type { Page } from 'playwright';

import { createEvent, deleteEvent } from '../../../api/community/events';
import { pinContent } from '../../../api/community/pinnable-content';
import { createPoll, deletePoll } from '../../../api/community/polls';
import { createPost, deletePost } from '../../../api/community/posts';
import type {
  Event,
  Poll,
  Post,
} from '../../../graphql-schema/generated/graphql-request';
import { PinnableContentListPage } from '../../../pages/contentManagement/pinnable-content';
import type { ICustomWorld } from '../../../support/custom-world';
import { getEmail, getPassword } from '../../../utils/credentials';

enum ContentType {
  Event = 'event',
  Poll = 'poll',
  Post = 'post',
}

type CreateContentFunction = (args: {
  user: { email: string; password: string };
  title: string;
}) => Promise<Event['id'] | Poll['id'] | Post['id']>;
const createContentFunctionByContentType: Record<
  ContentType,
  CreateContentFunction
> = {
  [ContentType.Event]: createEvent,
  [ContentType.Poll]: createPoll,
  [ContentType.Post]: createPost,
};

type DeleteContentFunction = (args: {
  contentId: Event['id'] | Poll['id'] | Post['id'];
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
  [ContentType.Post]: ({ contentId, user }) =>
    deletePost({ postId: contentId, user }),
};

const getUser = (userName: string) => ({
  email: getEmail(userName),
  password: getPassword(userName),
});

let contentId: Event['id'] | Poll['id'] | Post['id'];

Given(
  'I created a pinned {string} as user {string}',
  async function (
    this: ICustomWorld,
    contentType: ContentType,
    userName: string
  ) {
    const createContentFunction =
      createContentFunctionByContentType[contentType];

    const title = faker.random.words(2);
    contentId = await createContentFunction({ user: getUser(userName), title });

    await pinContent({ contentId, user: getUser(userName) });

    const { page } = this;
    const pinnableContentListPage = new PinnableContentListPage(<Page>page);
    await pinnableContentListPage.verifyContentCreated(title);
  }
);

Given(
  'I created an unpinned {string} as user {string}',
  async function (
    this: ICustomWorld,
    contentType: ContentType,
    userName: string
  ) {
    const createContentFunction =
      createContentFunctionByContentType[contentType];

    const title = faker.random.words(2);
    contentId = await createContentFunction({ user: getUser(userName), title });

    const { page } = this;
    const pinnableContentListPage = new PinnableContentListPage(<Page>page);
    await pinnableContentListPage.verifyContentCreated(title);
  }
);

When(
  'I pin the {string}',
  async function (this: ICustomWorld, contentType: ContentType) {
    const { page } = this;
    const pinnableContentListPage = new PinnableContentListPage(<Page>page);

    console.log(`Pinning ${contentType} with id ${contentId}...`);
    await pinnableContentListPage.clickMoreMenu(contentId);
    await pinnableContentListPage.clickPinButton();
    await pinnableContentListPage.clickConfirmPinButton();
  }
);

When(
  'I unpin the {string}',
  async function (this: ICustomWorld, contentType: ContentType) {
    const { page } = this;
    const pinnableContentListPage = new PinnableContentListPage(<Page>page);

    console.log(`Unpinning ${contentType} with id ${contentId}...`);
    await pinnableContentListPage.clickMoreMenu(contentId);
    await pinnableContentListPage.clickUnpinButton();
  }
);

Then(
  'the {string} is pinned',
  async function (this: ICustomWorld, contentType: ContentType) {
    const { page } = this;
    const pinnableContentListPage = new PinnableContentListPage(<Page>page);
    const deleteContentFunction =
      deleteContentFunctionByContentType[contentType];

    await pinnableContentListPage.verifyContentPinned();

    await deleteContentFunction({ contentId, user: getUser('CAT_ADMIN') });
  }
);

Then(
  'the {string} is unpinned',
  async function (this: ICustomWorld, contentType: ContentType) {
    const { page } = this;
    const pinnableContentListPage = new PinnableContentListPage(<Page>page);
    const deleteContentFunction =
      deleteContentFunctionByContentType[contentType];

    await pinnableContentListPage.verifyContentUnpinned();

    await deleteContentFunction({ contentId, user: getUser('CAT_ADMIN') });
  }
);
