/* eslint-disable @typescript-eslint/explicit-module-boundary-types */

import type { Page } from 'playwright';

export class CommunitiesPage {
  readonly page: Page;

  readonly analyticsButton = "//p[normalize-space()='Analytics']";
  readonly aaquaLogo = '[aria-label="Aaqua"]';
  readonly communityOverview = '//h1[normalize-space()="Community Overview"]';

  constructor(page: Page) {
    this.page = page;
  }

  async clickOnCommunity(communityName: string) {
    await this.page.waitForSelector(`text="${communityName}"`);
    await Promise.all([
      this.page.waitForNavigation(),
      this.page.click(`text="${communityName}"`),
    ]);
  }

  async waitForCommunity() {
    await this.page.waitForSelector(this.communityOverview);
  }

  async clickOnAnalytics() {
    // Check if Activities is shown, it means that Analytics dropdown is not collapsed
    const isChildPageVisible = await this.page.isVisible(`text=Activities`, {
      timeout: 5000,
    });
    if (isChildPageVisible === false) {
      await this.page.locator(this.analyticsButton).click();
    }
  }
  async clickOnParentPage(parentPage: string) {
    const parent = await this.page.locator(
      `//p[normalize-space()='${parentPage}']`
    );
    await parent.click({ force: true });
  }

  async clickOnChildPage(childPage: string) {
    await this.page.click(`text='${childPage}'`);
  }

  async verifyHeader(header: string) {
    await this.page.locator(`h1:has-text("${header}")`);
  }
  async verifyCommunity(community: string) {
    await this.page.locator(`text=${community} >> p`);
  }
  async clickAaquaLogo() {
    await this.page.locator(this.aaquaLogo).click();
  }
}
