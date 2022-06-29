import { Then, When } from '@cucumber/cucumber';
import { expect } from '@playwright/test';

import type { ICustomWorld } from '../../support/custom-world';

Then('user can view the list of Jobs', async function (this: ICustomWorld) {
  const { page } = this;
  const title = await page?.waitForSelector('h1 >> text="Jobs"');

  expect(title).toBeTruthy();
});

Then('user cannot view the list of Jobs', async function (this: ICustomWorld) {
  const { page } = this;
  const error = await page?.waitForSelector(
    '.chakra-alert:has-text("Access denied")'
  );

  expect(error).toBeTruthy();
});

When('I log out', async function (this: ICustomWorld) {
  await this.page?.click('[aria-label="Logout"]');
  // TODO replace with something smarter, but for now need to wait otherwise it can't immediately go to the login page
  await new Promise((resolve) => setTimeout(resolve, 1000));
});
