import type { Page } from 'playwright';

import { scrollToTopOfPage } from '../../utils/scroll-helper';

interface StyleDetails {
  styleName: string;
  styleSku: string;
  styleLabel: string;
  stylePhoto: string;
  stylePrice: string;
  styleUrl: string;
}
export class AddStyleDetailsPage {
  readonly page: Page;
  private readonly styleName = 'input[name="variant.name"]';
  private readonly styleSku = 'input[name="variant.sku"]';
  private readonly stylePhoto = "input[type='file']";
  private readonly stylePrice = 'input[name="variant.price"]';
  private readonly styleUrl = 'input[name="variant.externalUrl"]';
  private readonly saveStyleButton = 'text=Save style';
  private readonly saveEditedProduct = 'text=Save changes';
  private readonly selectProductDropdown =
    '[data-testid="combo-box_variant.label"] [data-testid="combo-box-dropdown-indicator"]';
  constructor(page: Page) {
    this.page = page;
  }
  async fillStyleName(styleName: string) {
    await this.page.fill(this.styleName, styleName);
  }
  async fillStyleSku(styleSku: string) {
    await this.page.fill(this.styleSku, styleSku);
  }
  async selectStyleLabel(styleLabel: string) {
    await this.page.click(this.selectProductDropdown);
    await this.page.click(`p:has-text("${styleLabel}")`);
  }

  async addStylePhoto(stylePhoto: string) {
    await this.page.setInputFiles(this.stylePhoto, stylePhoto);
    await this.page.waitForSelector('img');
  }
  async fillStylePrice(stylePrice: string) {
    await this.page.fill(this.stylePrice, stylePrice);
  }
  async fillStyleUrl(styleUrl: string) {
    await this.page.fill(this.styleUrl, styleUrl);
  }

  async clickSaveStyle() {
    await scrollToTopOfPage(this.page);
    await this.page.click(this.saveStyleButton);
  }

  async clickSaveEditedProduct() {
    await scrollToTopOfPage(this.page);
    await this.page.click(this.saveEditedProduct);
  }

  async fillStyleDetails({
    styleName,
    styleSku,
    styleLabel,
    stylePhoto,
    stylePrice,
    styleUrl,
  }: StyleDetails) {
    await this.fillStyleName(styleName);
    await this.fillStyleSku(styleSku);
    await this.selectStyleLabel(styleLabel);
    await this.addStylePhoto(stylePhoto);
    await this.fillStylePrice(stylePrice);
    await this.fillStyleUrl(styleUrl);
  }
  async editStyleDetails(
    styleName: string,
    styleSku: string,
    styleLabel: string,
    stylePrice: string,
    styleUrl: string
  ) {
    await this.fillStyleName(styleName);
    await this.fillStyleSku(styleSku);
    await this.selectStyleLabel(styleLabel);
    await this.fillStylePrice(stylePrice);
    await this.fillStyleUrl(styleUrl);
  }
}
