import { Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import type { Page } from 'playwright';

import { ModerationJobDetailsPage } from '../../pages/moderation/moderation-job-details.page';

Then(
  'I see the ai label {string} close to the inadequate content',
  async function (label: string) {
    const { page } = this;
    const moderationDetailsPage = new ModerationJobDetailsPage(<Page>page);

    const aiLabels = await moderationDetailsPage.getAiLabelsFromMedia(
      label,
      'Pending'
    );

    expect(aiLabels).toHaveLength(1);
  }
);
