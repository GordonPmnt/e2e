import { Then, When } from '@cucumber/cucumber';
import { expect } from '@playwright/test';

import { canFindReportedModerationJob } from '../../graphql-schema/jobs/list-jobs';
import type { ICustomWorld } from '../../support/custom-world';
import { AaquaAdminApp } from '../../utils/url-builder';

When(
  'I escalate the reported entity to ESCALATIONS',
  async function (this: ICustomWorld) {
    const { page } = this;
    const { entityId, entityType } = this.moderation.reportedEntity;

    const jobDetails = AaquaAdminApp.moderationJobEntityDetailUrl(
      entityId,
      entityType
    );
    await page?.goto(jobDetails);

    await page?.click(`text="Escalate"`);
  }
);

Then(
  'the reported entity should be visible in the ESCALATIONS queue',
  async function (this: ICustomWorld) {
    const { page } = this;
    expect(await page?.waitForSelector(`text="Escalated"`)).toBeTruthy();
    expect(
      await canFindReportedModerationJob(
        this.moderation,
        'MOD_INTERNAL_MODERATOR_1',
        'ESCALATIONS'
      )
    ).toBeTruthy();
  }
);
