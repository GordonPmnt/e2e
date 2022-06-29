import { Then } from '@cucumber/cucumber';
import type { Page } from 'playwright';

import { SharesPage } from '../../../../pages/analytics/shares.page';
import type { ICustomWorld } from '../../../../support/custom-world';

Then(
  'I can see the community shares status details and graphs',
  async function (this: ICustomWorld) {
    const { page } = this;
    const sharesPage = new SharesPage(<Page>page);

    await sharesPage.waitForSharesStatusLabelSelector();
    await sharesPage.waitForSharesExplanationLabelSelector();
    await sharesPage.waitForTotalSharesLabelSelector();
    // TODO: Add total shares API call and check if the numbers is correct with what is shown on the FE
    // await sharesPage.waitForTotalSharesValueSelector(totalShares);
    await sharesPage.waitForSharesDeltaLabelSelector();
    await sharesPage.waitForSharesDetailsForSelectedPeriodLabelSelector();
    // TODO: Add total shares API call and check if the numbers is correct with what is shown on the FE
    // await sharesPage.waitForSharesDeltaValueSelector(totalShares);
    await sharesPage.waitForSharesEvolutionGraphLabelSelector();
  }
);
