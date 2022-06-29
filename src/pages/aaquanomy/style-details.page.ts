import type { Page } from 'playwright';

import {
  scrollToBottomOfPage,
  scrollToTopOfPage,
} from '../../utils/scroll-helper';

export class StyleDetailsPage {
  readonly page: Page;

  private readonly editStyleButton = 'text = Edit style';

  private readonly stylesListingBreadCrumbLink =
    '//a[contains(text(),"Styles")]';

  constructor(page: Page) {
    this.page = page;
  }

  async waitForPageLoad() {
    await this.page.waitForNavigation();
    await this.page.isVisible(this.editStyleButton);
  }

  async clickEditStyle() {
    await this.page.click(this.editStyleButton);
  }

  async clickStyleBreadCrumb() {
    await scrollToTopOfPage(this.page);
    await this.page.click(this.stylesListingBreadCrumbLink);
  }

  async verifyStyleDetails(
    styleName: string,
    styleSku: string,
    styleLabel: string,
    stylePrice: string,
    styleUrl: string
  ) {
    await this.page.isVisible(`text = ${styleName}`);
    await this.page.isVisible(`text = ${styleSku}`);
    await this.page.isVisible(`text = ${styleLabel.toUpperCase()}`);
    await scrollToBottomOfPage(this.page);
    await this.page.isVisible(`text = ${stylePrice}`);
    await this.page.isVisible(`text = ${styleUrl}`);
  }
}
