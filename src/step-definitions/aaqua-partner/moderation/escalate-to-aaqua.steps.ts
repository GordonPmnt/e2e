import { Then, When } from '@cucumber/cucumber';
import { expect } from '@playwright/test';

import { canFindReportedModerationJob } from '../../../graphql-schema/jobs/list-jobs';
import type { ICustomWorld } from '../../../support/custom-world';
import { AaquaPartnerApp } from '../../../utils/url-builder';

When(
  'I escalate the reported entity moderation job to AAQUA',
  async function (this: ICustomWorld) {
    const { page } = this;
    const { entityId, entityType } = this.moderation.reportedEntity;

    const jobDetails = AaquaPartnerApp.contentModerationJobEntityDetailUrl(
      entityId,
      entityType
    );
    await page?.goto(jobDetails);
    await page?.click(`text="Escalate to Aaqua"`);
  }
);

Then(
  'the reported entity should be visible in the AAQUA queue',
  async function (this: ICustomWorld) {
    const { page } = this;
    expect(
      await page?.waitForSelector(`text="Escalated to Aaqua"`)
    ).toBeTruthy();
    expect(
      await canFindReportedModerationJob(
        this.moderation,
        'MOD_INTERNAL_MODERATOR_1',
        'AAQUA'
      )
    ).toBeTruthy();
  }
);
