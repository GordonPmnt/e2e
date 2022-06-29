import type { Page } from 'playwright';

import { defineFeature, loadFeature } from '../../gherkin-utils';
import type { DefineStepFunction } from '../../gherkin-utils/define-feature.util';
import { PostsPage } from '../../pages/analytics/posts.page';
import { navigateToCommunity } from '../../step-definitions/aaqua-partner/communities/communities.spec';
import { login } from '../../step-definitions/login/login.spec';

const feature = loadFeature('src/tests/analytics/verify-posts-page.feature');

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

  then(
    'I can see the community posts status details and graphs',
    async ({ page }) => {
      const postsPage = new PostsPage(<Page>page);

      await postsPage.verifyPostsStatusLabelIsVisible();
      await postsPage.verifyPostsExplanationLabelIsVisible();
      await postsPage.verifyTotalPostsLabelIsVisible();
      await postsPage.verifyPostsDeltaLabelIsVisible();
      await postsPage.verifyPostsDetailsForSelectedPeriodLabelIsVisible();
      await postsPage.verifyPostsEvolutionGraphLabelIsVisible();
      await postsPage.verifyCommentsGraphLabelIsVisible();
      await postsPage.verifyLikesGraphLabelIsVisible();
    }
  );
});
