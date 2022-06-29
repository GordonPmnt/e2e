import { Then } from '@cucumber/cucumber';
import type { Page } from 'playwright';

import { PostsPage } from '../../../../pages/analytics/posts.page';
import type { ICustomWorld } from '../../../../support/custom-world';

Then(
  'I can see the community posts status details and graphs',
  async function (this: ICustomWorld) {
    const { page } = this;
    const postsPage = new PostsPage(<Page>page);

    await postsPage.verifyPostsStatusLabelIsVisible();
    await postsPage.verifyPostsExplanationLabelIsVisible();
    await postsPage.verifyTotalPostsLabelIsVisible();
    // TODO: Add total posts API call and check if the numbers is correct with what is shown on the FE
    // await postsPage.verifyTotalPostsValueIsVisible(totalPosts);
    await postsPage.verifyPostsDeltaLabelIsVisible();
    // TODO: Add API that will verify the total posts delta
    // await postsPage.verifyPostsDeltaValueIsVisible(postsDelta);
    await postsPage.verifyPostsDetailsForSelectedPeriodLabelIsVisible();
    await postsPage.verifyPostsEvolutionGraphLabelIsVisible();
    await postsPage.verifyCommentsGraphLabelIsVisible();
    await postsPage.verifyLikesGraphLabelIsVisible();
  }
);
