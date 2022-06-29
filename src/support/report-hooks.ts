import { AfterStep, BeforeStep } from '@cucumber/cucumber';

BeforeStep(async function () {
  const currentDate = new Date();
  await this.attach(`Step Start Time: ${currentDate.toUTCString()}`);
});

AfterStep(async function () {
  const currentDate = new Date();
  await this.attach(`Step End Time: ${currentDate.toUTCString()}`);
});
