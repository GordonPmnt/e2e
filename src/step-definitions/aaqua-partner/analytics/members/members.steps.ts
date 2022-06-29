import { Then } from '@cucumber/cucumber';
import type { Page } from 'playwright';

import { MembersPage } from '../../../../pages/analytics/members.page';
import type { ICustomWorld } from '../../../../support/custom-world';

Then(
  'I can see the community members status details and graphs',
  async function (this: ICustomWorld) {
    const { page } = this;
    const membersPage = new MembersPage(<Page>page);

    await membersPage.verifyMembersStatusLabelIsVisible();
    await membersPage.verifyMembersExplanationLabelIsVisible();
    // await membersPage.verifyTotalMembersLabelIsVisible();

    await membersPage.totalMembersLabel.isVisible();

    // TODO: Add total members API call and check if the numbers is correct with what is shown on the FE
    await membersPage.verifyReputationScoreDistributionGraphLabelIsVisible();
    await membersPage.verifyMembersDetailsLabelIsVisible();

    await membersPage.verifyJoinersLabelIsVisible();
    // TODO: Add joiners API call and check if the numbers is correct with what is shown on the FE
    await membersPage.verifyLeaversLabelIsVisible();
    // TODO: Add leavers API call and check if the numbers is correct with what is shown on the FE

    await membersPage.verifyMembersEvolutionGraphLabelIsVisible();
    await membersPage.verifyJoinersVsLeaversGraphLabelIsVisible();
  }
);

Then(
  'I can see a user guide banner on the page',
  async function (this: ICustomWorld) {
    const { page } = this;
    const membersPage = new MembersPage(<Page>page);
    await membersPage.verifyUserGuideBanner(
      'Invite friends to grow your community.'
    );
  }
);
