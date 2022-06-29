/* eslint-disable import/namespace */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Then, When } from '@cucumber/cucumber';
import { expect } from '@playwright/test';

import type { ICustomWorld } from '../../support/custom-world';
import { AaquaAdminApp } from '../../utils/url-builder';
Then('I see an alert message', async function (this: ICustomWorld) {
  const { page } = this;

  const expectedMessage =
    'This job has already been reviewed, we recommend you to skip this job.';

  expect(await page?.waitForSelector(`text=${expectedMessage}`)).toBeTruthy();
});

When(
  'I navigate to the reported entity detail',
  async function (this: ICustomWorld) {
    const { entityId, entityType } = this.moderation.reportedEntity;
    const { page } = this;
    await page?.goto(
      AaquaAdminApp.moderationJobEntityDetailUrl(entityId, entityType)
    );
  }
);
