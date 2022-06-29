import { Then, When } from '@cucumber/cucumber';
import type { Page } from 'playwright';
import type { ICustomWorld } from 'support/custom-world';

import { ensureExistsEntityInModerationService } from '../../graphql-schema/jobs/find-job';
import { ModerationJobDetailsPage } from '../../pages/moderation/moderation-job-details.page';
import { SharedPage } from '../../pages/shared.page';
import type { ViolationType } from '../../tests/moderation/utils/moderation-i18n-helper';

When('I look for the non reported entity', async function (this: ICustomWorld) {
  const { page } = this;
  const sharedPage = new SharedPage(<Page>page);

  const entityId = this.moderation.mainContent?.entityId as string;

  if (!this.loggedUser) {
    throw new Error('User must be logged in');
  }

  await ensureExistsEntityInModerationService(entityId, this.loggedUser, 240);

  await sharedPage.lookForEntityById(entityId);
});

Then(
  'I proactively review the job and hide it with the violationType {string}',
  async function (this: ICustomWorld, violationType: ViolationType) {
    const { page } = this;

    const detailsPage = new ModerationJobDetailsPage(<Page>page);

    await detailsPage.hideContent(violationType);

    this.moderation.reportContentWithoutReason();

    await page?.waitForNavigation();
  }
);
