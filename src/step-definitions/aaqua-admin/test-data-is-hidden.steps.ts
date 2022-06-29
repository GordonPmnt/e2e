import { Given, Then } from '@cucumber/cucumber';
import type { Page } from 'playwright';

import { ensureExistsModerationJob } from '../../graphql-schema/jobs/find-job';
import { JobsPage } from '../../pages/jobs.page';
import type { ICustomWorld } from '../../support/custom-world';

Given(
  'the created moderation job is visible to {string}',
  async function (this: ICustomWorld, user: string) {
    await ensureExistsModerationJob(
      this.moderation.reportedEntity.entityId,
      user
    );
  }
);

Then('I can not see the reported job', async function (this: ICustomWorld) {
  const { page } = this;
  const jobsPage = new JobsPage(<Page>page, this.site);
  const { entityContent } = this.moderation.reportedEntity;

  await ensureExistsModerationJob(
    this.moderation.reportedEntity.entityId,
    this.loggedUser!
  );

  let found = false;
  if ((await jobsPage.hasNoData()) == false) {
    let finished = false;
    do {
      try {
        await jobsPage.validateJobWithReason(
          entityContent,
          this.moderation.reportedReason
        );
        found = true;
        finished = true;
      } catch {
        // expected, as the job should be invisible
      }
      if (await jobsPage.canLoadMore()) {
        await jobsPage.loadMore();
      } else {
        finished = true;
      }
    } while (found == false && finished == false);
  }
  if (found) {
    throw new Error(
      `Could find the moderation job with content: ${entityContent}`
    );
  }
});
