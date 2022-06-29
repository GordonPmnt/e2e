import type { Page } from 'playwright';

import { scrollToTopOfPage } from '../../utils/scroll-helper';

interface ProductDetails {
  productName: string;
  productSku: string;
  productDescription: string;
  productLabel: string;
  productPhoto: string;
  productPrice: string;
  productUrl: string;
}
export class AddSingleProductDetailsPage {
  readonly page: Page;

  private readonly productName = 'input[name="name"]';

  private readonly productSku = 'input[name="variant.sku"]';

  private readonly productDescription = 'input[name="description"]';

  private readonly productPhoto = "input[type='file']";

  private readonly productPrice = 'input[name="variant.price"]';

  private readonly productUrl = 'input[name="variant.externalUrl"]';

  private readonly saveProduct = 'text=Save product';

  private readonly saveEditedProduct = 'text=Save changes';

  private readonly selectProductDropdown =
    '[data-testid="combo-box_variant.label"] [data-testid="combo-box-dropdown-indicator"]';

  constructor(page: Page) {
    this.page = page;
  }

  async fillProductName(productName: string) {
    await this.page.fill(this.productName, productName);
  }

  async fillProductSku(productSku: string) {
    await this.page.fill(this.productSku, productSku);
  }

  async fillProductDescription(productDescription: string) {
    await this.page.fill(this.productDescription, productDescription);
  }

  async selectProductLabel(productLabel: string) {
    await this.page.click(this.selectProductDropdown);
    await this.page.click(`p:has-text("${productLabel}")`);
  }

  async addProductPhoto(productPhoto: string) {
    await this.page.setInputFiles(this.productPhoto, productPhoto);
    await this.page.waitForSelector('img');
  }

  async fillProductPrice(productPrice: string) {
    await this.page.fill(this.productPrice, productPrice);
  }

  async fillProductUrl(productUrl: string) {
    await this.page.fill(this.productUrl, productUrl);
  }

  async clickSaveProduct() {
    await scrollToTopOfPage(this.page);
    await this.page.click(this.saveProduct);
  }

  async clickSaveEditedProduct() {
    await scrollToTopOfPage(this.page);
    await this.page.click(this.saveEditedProduct);
  }

  async fillProductDetails({
    productName,
    productSku,
    productDescription,
    productLabel,
    productPhoto,
    productPrice,
    productUrl,
  }: ProductDetails) {
    await this.fillProductName(productName);
    await this.fillProductSku(productSku);
    await this.fillProductDescription(productDescription);
    await this.selectProductLabel(productLabel);
    await this.addProductPhoto(productPhoto);
    await this.fillProductPrice(productPrice);
    await this.fillProductUrl(productUrl);
  }

  async editProductDetails(
    productName: string,
    productSku: string,
    productDescription: string,
    productLabel: string,
    productPrice: string,
    productUrl: string
  ) {
    await this.fillProductName(productName);
    await this.fillProductSku(productSku);
    await this.fillProductDescription(productDescription);
    await this.selectProductLabel(productLabel);
    await this.fillProductPrice(productPrice);
    await this.fillProductUrl(productUrl);
  }
}
