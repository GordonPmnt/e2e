import { Then, When } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import type { Page } from 'playwright';

import { sleep } from '../../graphql-schema/AaquaApolloClient.class';
import { JobFilter, JobsPage } from '../../pages/jobs.page';
import type { EntityType, ReportReason } from '../../pages/jobs.page';
import type { ICustomWorld } from '../../support/custom-world';

When(
  'I filter jobs by {string} type',
  async function (this: ICustomWorld, entityType: string) {
    const { page } = this;

    const jobsPage = new JobsPage(<Page>page, this.site);
    await jobsPage.filterJobs(JobFilter.EntityType, entityType);
  }
);

When(
  'I filter jobs by {string} reason',
  async function (this: ICustomWorld, reportReason: string) {
    const { page } = this;

    const jobsPage = new JobsPage(<Page>page, this.site);
    await jobsPage.filterJobs(JobFilter.ReportReason, reportReason);
  }
);

Then(
  'I should see only {string} entities',
  async function (this: ICustomWorld, entityType: EntityType) {
    const { page } = this;
    const jobsPage = new JobsPage(<Page>page, this.site);

    expect(await jobsPage.validateEntityTypes(entityType)).toBeTruthy();
  }
);

Then(
  'I should see only entities with {string} reason',
  async function (this: ICustomWorld, reportReason: ReportReason) {
    const { page } = this;
    const jobsPage = new JobsPage(<Page>page, this.site);

    let retry = 1;
    while (await jobsPage.hasNoData()) {
      await page?.reload();
      console.log('Reloading the page...');
      await sleep(1000);
      retry++;
      if (retry > 5) {
        throw new Error('No data appeared after 5 retries');
      }
    }
    expect(await jobsPage.validateReportReason(reportReason)).toBeTruthy();
  }
);
