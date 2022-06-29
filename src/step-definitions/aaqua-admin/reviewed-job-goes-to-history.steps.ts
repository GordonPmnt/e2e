/* eslint-disable import/namespace */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Then } from '@cucumber/cucumber';
import type { Page } from 'playwright';

import { HistoryPage } from '../../pages/moderation/history.page';
import type { ICustomWorld } from '../../support/custom-world';

Then(
  'I see the reviewed entity with {string}',
  async function (this: ICustomWorld, violation: string) {
    const { page } = this;
    const historyPage = new HistoryPage(<Page>page);
    const { entityContent } = this.moderation.reportedEntity;

    let retries = 1;
    do {
      try {
        await historyPage.validateJobWithViolation(entityContent, violation);
        return;
      } catch (error) {
        retries++;
        await page?.reload();
      }
    } while (retries < 5);
    throw new Error(
      `Could not find the moderation job with content: ${entityContent}`
    );
  }
);
