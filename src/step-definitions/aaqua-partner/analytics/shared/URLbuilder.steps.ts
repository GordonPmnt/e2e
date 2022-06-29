import { When } from '@cucumber/cucumber';

import type { ICustomWorld } from '../../../../support/custom-world';

When(
  'I apply a custom period of {string} days starting from {string}',
  async function (this: ICustomWorld, day: number, periodStart: string) {
    const { page } = this;
    const periodStartDate = new Date(periodStart);
    const startEpoch = periodStartDate.getTime();
    const endEpoch = periodStartDate.setDate(
      periodStartDate.getDate() + (day - 1)
    );
    const currentURL = page?.url();
    await page?.goto(
      `${currentURL}?period=custom&from=${startEpoch}&to=${endEpoch}`
    );
  }
);
