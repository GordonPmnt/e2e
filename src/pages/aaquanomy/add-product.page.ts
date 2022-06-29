import type { Page } from 'playwright';

interface MultiStyleProductDetails {
  productName: string;
  productDescription: string;
  productStyles: string[];
}
export class AddProductPage {
  readonly page: Page;
  private readonly addSingleProductButton =
    "//button[contains(text(),'Add single product')]";
  private readonly addMultiStyleProductButton =
    "//button[contains(text(),'Add multi-style product')]";

  private readonly productName = 'input[name="name"]';
  private readonly productDescription = 'input[name="description"]';
  private readonly productStyles = '[data-testid="combo-box-input"]';
  private readonly enteredProductStyle = '//div[contains(text(),"styleName")]';
  private readonly saveProductButton =
    "//button[contains(text(),'Save product')]";
  constructor(page: Page) {
    this.page = page;
  }
  async clickAddSingleProductButton() {
    await this.page.click(this.addSingleProductButton);
  }
  async clickAddMultiStyleProductButton() {
    await this.page.click(this.addMultiStyleProductButton);
  }
  async clickSaveProductButton() {
    await this.page.click(this.saveProductButton);
  }
  async fillProductName(productName: string) {
    await this.page.fill(this.productName, productName);
  }
  async fillProductDescription(productDescription: string) {
    await this.page.fill(this.productDescription, productDescription);
  }
  async fillProductStyles(productStyles: string[]) {
    for (const style of productStyles) {
      await this.page.type(this.productStyles, style);
      await this.page.keyboard.press('Enter');
      await this.page.waitForSelector(
        this.enteredProductStyle.replace('styleName', style)
      );
    }
  }

  async setupMultiStyleProductInformation({
    productName,
    productDescription,
    productStyles,
  }: MultiStyleProductDetails) {
    await this.fillProductName(productName);
    await this.fillProductDescription(productDescription);
    await this.fillProductStyles(productStyles);
  }
}
