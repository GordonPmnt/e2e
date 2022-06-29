import type { Page } from 'playwright';

export class StylesListingPage {
  readonly page: Page;

  private readonly deleteStyleMenuButton = 'text = Delete style';

  private readonly editStyleMenuButton = 'text = Edit style';

  private readonly viewStyleMenuButton = 'text = View style';

  private readonly deleteStyleDialogButton =
    '//button[normalize-space()="Delete"]';

  private readonly editStyleButton = '//button[contains(text(),"Edit style")]';

  constructor(page: Page) {
    this.page = page;
  }

  async clickStyle(styleName: string) {
    await this.page.waitForSelector(`//span[contains(text(),'${styleName}')]`);
    await this.page.click(`//span[contains(text(),'${styleName}')]`);
    await this.page.waitForSelector(
      `//h1[contains(text(),'Style: ${styleName}')]`
    );
  }

  async clickEditStyleButton() {
    await this.page.click(this.editStyleButton);
  }

  async clickEditStyleFromMenu(styleName: string) {
    await this.page.waitForSelector(
      `tr:has-text("${styleName}") >> ${this.editStyleMenuButton}`
    );
    await this.page.click(
      `tr:has-text("${styleName}") >> ${this.editStyleMenuButton}`
    );
  }

  async clickViewStyleFromMenu(styleName: string) {
    await this.page.waitForSelector(
      `tr:has-text("${styleName}") >> ${this.viewStyleMenuButton}`
    );
    await this.page.click(
      `tr:has-text("${styleName}") >> ${this.viewStyleMenuButton}`
    );
  }

  async clickDeleteStyleFromMenu(styleName: string) {
    await this.page.waitForSelector(
      `tr:has-text("${styleName}") >> ${this.deleteStyleMenuButton}`
    );
    await this.page.click(
      `tr:has-text("${styleName}") >> ${this.deleteStyleMenuButton}`
    );
  }

  async clickDeleteStyleFromDialog() {
    await this.page.click(this.deleteStyleDialogButton);
  }

  async deleteStyle(styleName: string) {
    const productRow = await this.page.locator(`tr:has-text("${styleName}")`);
    const productRowMoreButton = await productRow.locator(
      '[aria-haspopup="menu"]'
    );
    await productRowMoreButton.click();
    await this.clickDeleteStyleFromMenu(styleName);
    await this.clickDeleteStyleFromDialog();
  }

  async editStyle(styleName: string) {
    await this.clickStyle(styleName);
    await this.clickEditStyleButton();
  }

  async viewStyle(styleName: string) {
    await this.clickStyle(styleName);
  }
}
