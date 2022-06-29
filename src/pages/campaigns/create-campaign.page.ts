import { faker } from '@faker-js/faker';
import type { Page } from 'playwright';

import { scrollToTopOfPage } from '../../utils/scroll-helper';
import type { CampaignType } from '../../utils/typings';

export class CreateCampaignPage {
  readonly page: Page;

  readonly createAnnouncementCampaignOption =
    '//div[normalize-space()="Make an announcement"]';
  readonly createOnboardingCampaignOption =
    '//div[normalize-space()="Onboard new members"]';
  readonly descriptionField = 'textarea[name="content"]';
  readonly header = 'h1 >> text="Create Campaign"';
  readonly submitButton = 'button[type="submit"]';
  readonly titleField = 'input[name="title"]';

  readonly dataEndInputField = '#endTime';
  readonly dataEndPicker = '[aria-label="toggle end picker"]';
  readonly okButton = 'text=OK';

  constructor(page: Page) {
    this.page = page;
  }

  async clickSubmit() {
    await this.page.click(this.submitButton);
  }

  async clickSubmitCreateForm() {
    await scrollToTopOfPage(this.page);
    await this.clickSubmit();
  }

  async fillInAnnouncementCampaignForm(title: string) {
    await this.page.fill(this.titleField, title);
    await this.page.fill(this.descriptionField, faker.random.words(5));
    await this.fillInEndDate();
  }

  async fillInCampaignForm({
    campaignType,
    title,
  }: {
    campaignType: CampaignType;
    title: string;
  }) {
    return campaignType === 'announcement'
      ? this.fillInAnnouncementCampaignForm(title)
      : this.fillInOnboardingCampaignForm(title);
  }

  async fillInEndDate() {
    await this.page.locator(this.dataEndInputField).scrollIntoViewIfNeeded();
    await this.page.click(this.dataEndPicker);
    await this.page.press(this.okButton, 'Enter');
  }

  async fillInOnboardingCampaignForm(title: string) {
    await this.page.fill(this.titleField, title);
    await this.page.fill(this.descriptionField, faker.random.words(5));
  }

  async selectCreateCampaignOption(campaignType: CampaignType) {
    const campaignOption =
      campaignType === 'announcement'
        ? this.createAnnouncementCampaignOption
        : this.createOnboardingCampaignOption;

    await this.page.click(campaignOption);
    await this.clickSubmit();
  }

  async verifyCampaignCreated(title: string) {
    let campaign = await this.page.$(
      `td[role="cell"] div:has-text("${title}")`
    );

    while (campaign !== null) {
      this.page.reload();

      campaign = await this.page.$(`td[role="cell"] div:has-text("${title}")`);
    }
  }

  async waitForCreateCampaignHeader() {
    await this.page.waitForSelector(this.header);
  }
}
