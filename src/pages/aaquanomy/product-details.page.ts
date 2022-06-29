import type { Page } from 'playwright';

import { scrollToBottomOfPage } from '../../utils/scroll-helper';

export class ProductDetailsPage {
  readonly page: Page;

  private readonly editProductButton = 'text = Edit product';

  constructor(page: Page) {
    this.page = page;
  }

  async waitForPageLoad() {
    await this.page.waitForNavigation();
    await this.page.isVisible(this.editProductButton);
  }

  async clickEditProduct() {
    await this.page.click(this.editProductButton);
  }

  async verifyProductDetails(
    productName: string,
    productSku: string,
    productDescription: string,
    productLabel: string,
    productPrice: string,
    productUrl: string
  ) {
    await this.page.isVisible(`text = ${productName}`);
    await this.page.isVisible(`text = ${productSku}`);
    await this.page.isVisible(`text = ${productDescription}`);
    await this.page.isVisible(`text = ${productLabel.toUpperCase()}`);
    await scrollToBottomOfPage(this.page);
    await this.page.isVisible(`text = ${productPrice}`);
    await this.page.isVisible(`text = ${productUrl}`);
  }
}
