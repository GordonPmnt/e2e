import { Given, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import type { Page } from 'playwright';

import { appealJob } from '../../graphql-schema/appeal/appeal-job';
import { ModerationJobDetailsPage } from '../../pages/moderation/moderation-job-details.page';
import type { ICustomWorld } from '../../support/custom-world';
import { AaquaAdminApp } from '../../utils/url-builder';

Given(
  'entity is appealed by {string}',
  async function (this: ICustomWorld, user: string) {
    const { entityId } = this.moderation.reportedEntity;
    await appealJob(entityId, user);
  }
);

Then(
  'I should see that {string} is appealed by {string}',
  async function (
    this: ICustomWorld,
    entityType,
    role: 'CREATOR' | 'REPORTER'
  ) {
    const { page } = this;

    const detailsPage = new ModerationJobDetailsPage(<Page>page);

    const { entityId } = this.moderation.reportedEntity;

    const jobDetails = AaquaAdminApp.moderationJobEntityDetailUrl(
      entityId,
      entityType
    );

    await page?.goto(jobDetails);

    const appealCardSelector =
      role === 'CREATOR'
        ? detailsPage.appealByCreatorCard
        : detailsPage.appealByReporterCard;
    expect(await page?.waitForSelector(appealCardSelector)).toBeTruthy();
  }
);

Then(
  'I should see that the {string} appeal notes are present',
  async function (this: ICustomWorld, role: 'CREATOR' | 'REPORTER') {
    const { page } = this;
    const detailsPage = new ModerationJobDetailsPage(<Page>page);

    if (role === 'CREATOR') {
      expect(
        await page?.waitForSelector(detailsPage.creatorAppealNoteSelector)
      ).toBeTruthy();
    } else {
      await page?.click(detailsPage.appealNoteButtonSelector);
      expect(
        await page?.waitForSelector(detailsPage.reporterAppealNoteSelector)
      ).toBeTruthy();
    }
  }
);
