import type { Page } from 'playwright';

import { DatePicker } from '../../../../pages/analytics/datePicker';

export async function selectPeriod({ page }: { page: any }, period: string) {
  const datePicker = new DatePicker(<Page>page);
  await datePicker.clickDatePickerDropdown();
  await datePicker.clickPeriodSelector(period);
}
export async function selectDaysOfPeriod(
  { page }: { page: any },
  firstDay: string,
  lastDay: string
) {
  const datePicker = new DatePicker(<Page>page);
  await datePicker.selectDate(`${firstDay}`);
  await datePicker.selectDate(`${lastDay}`);
  await datePicker.clickConfirmationButton();
}
