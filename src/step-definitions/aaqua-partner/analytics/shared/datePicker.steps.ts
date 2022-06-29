import { Then, When } from '@cucumber/cucumber';
import type { Page } from 'playwright';

import { DatePicker } from '../../../../pages/analytics/datePicker';
import type { ICustomWorld } from '../../../../support/custom-world';

When(
  'I select {string} period from the period dropdown',
  async function (this: ICustomWorld, period: string) {
    const { page } = this;
    const datePicker = new DatePicker(<Page>page);
    await datePicker.clickDatePickerDropdown();
    await datePicker.clickPeriodSelector(period);
  }
);

Then('the datepicker pop-up is displayed', async function (this: ICustomWorld) {
  const { page } = this;
  const datePicker = new DatePicker(<Page>page);
  await datePicker.datePickerPopUpIsisible();
});

When(
  'I select {string} and {string} days from the calendar',
  async function (this: ICustomWorld, firstDay: string, lastDay: string) {
    const { page } = this;
    const datePicker = new DatePicker(<Page>page);
    await datePicker.selectDate(`${firstDay}`);
    await datePicker.selectDate(`${lastDay}`);
    await datePicker.clickConfirmationButton();
  }
);
