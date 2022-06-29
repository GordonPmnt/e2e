import type { Page } from 'playwright';

import { defineFeature, loadFeature } from '../../gherkin-utils';
import type { DefineStepFunction } from '../../gherkin-utils/define-feature.util';
import { SharesPage } from '../../pages/analytics/shares.page';
import { navigateToCommunity } from '../../step-definitions/aaqua-partner/communities/communities.spec';
import { login } from '../../step-definitions/login/login.spec';

const feature = loadFeature('src/tests/analytics/verify-shares-page.feature');

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
    'I can see the community shares status details and graphs',
    async ({ page }) => {
      const sharesPage = new SharesPage(<Page>page);

      await sharesPage.waitForSharesStatusLabelSelector();
      await sharesPage.waitForSharesExplanationLabelSelector();
      await sharesPage.waitForTotalSharesLabelSelector();
      await sharesPage.waitForSharesDeltaLabelSelector();
      await sharesPage.waitForSharesDetailsForSelectedPeriodLabelSelector();
      await sharesPage.waitForSharesEvolutionGraphLabelSelector();
    }
  );
});
