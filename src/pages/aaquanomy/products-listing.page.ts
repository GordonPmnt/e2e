import { expect } from '@playwright/test';
import type { Page } from 'playwright';

export class ProductsListingPage {
  readonly page: Page;

  private readonly addProductButton = "[aria-label='Add product']";

  private readonly deleteProductMenuButton = 'text = Delete product';

  private readonly viewStylesMenuButton = 'text = View styles';

  private readonly deleteProductDialogButton =
    '//button[normalize-space()="Delete"]';

  private readonly productHeader = '//h1[contains(text(),"Products")]';

  private readonly productStylesButton =
    '//button[contains(text(),"Product styles")]';

  constructor(page: Page) {
    this.page = page;
  }

  async waitForPageLoad() {
    await this.page.waitForSelector(this.productHeader);
  }

  async clickAddProductButton() {
    await this.page.click(this.addProductButton);
  }

  async clickProduct(productName: string) {
    await this.page.waitForSelector(`text = ${productName}`);
    await this.page.click(`text = ${productName}`);
  }

  async clickProductStylesButton() {
    await this.page.click(this.productStylesButton);
  }

  async clickViewStylesFromMenu(productName: string) {
    await this.page.waitForSelector(
      `tr:has-text("${productName}") >> ${this.viewStylesMenuButton}`
    );
    await this.page.click(
      `tr:has-text("${productName}") >> ${this.viewStylesMenuButton}`
    );
  }

  async clickDeleteProductFromMenu(productName: string) {
    await this.page.waitForSelector(
      `tr:has-text("${productName}") >> ${this.deleteProductMenuButton}`
    );
    await this.page.click(
      `tr:has-text("${productName}") >> ${this.deleteProductMenuButton}`
    );
  }

  async clickDeleteProductFromDialog() {
    await this.page.click(this.deleteProductDialogButton);
  }

  async deleteProduct(productName: string) {
    const productRow = await this.page.locator(`tr:has-text("${productName}")`);
    const productRowMoreButton = await productRow.locator(
      '[aria-haspopup="menu"]'
    );
    await productRowMoreButton.click();
    await this.clickDeleteProductFromMenu(productName);
    await this.clickDeleteProductFromDialog();
  }

  async viewStyles(productName: string) {
    await this.clickProduct(productName);
    await this.clickProductStylesButton();
  }

  async checkProductNotVisible(productName: string) {
    const isProductVisible = await this.page.waitForSelector(
      `text=${productName}`,
      {
        state: 'hidden',
      }
    );

    expect(isProductVisible).toBeNull();
  }
}
